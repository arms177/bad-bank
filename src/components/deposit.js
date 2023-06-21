import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from "react-loading";
import { useFormik } from "formik";
import { useContext } from 'react';
import { UserContext } from './context';
import Card from './card';

function Deposit(){
  const ctx = useContext(UserContext);
  console.log(ctx);
  const [balance, setBalance] = React.useState(ctx.user.balance);
  const [isLoading,setIsLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      deposit: ''
    },
    onSubmit: values => {
      if (values.validation === 'yes') {
        updateBalance();
      }
    },
    validate: values => {
      let errors = {};
      if (!values.deposit) {
        errors.deposit = 'Please enter a value to deposit';
      } else if (values.deposit <= 0) {
        errors.deposit = 'Please enter a number greater than 0.';
      } else if (isNaN(values.deposit)) {
        errors.deposit = 'Please enter numbers only.';
      }
      else {
        values.validation = 'yes';
      }

      return errors;
    }
  });

  const updateBalance = () => {
    setIsLoading(true);
    setTimeout(async () => {
      const amount = parseInt(formik.values.deposit);
      const updateUrl = `/account/deposit/${ctx.user.email}/${amount}`;
      //call express to update balance in DB
      const response = await fetch(updateUrl);
      const userResponse = await response.json(); //extract JSON from the http response

      if (userResponse) {
        setBalance(userResponse.balance);
        ctx.user.balance = userResponse.balance;
        formik.values.deposit = '';
        setIsLoading(false);
        toast.success('Deposit was successfully added.', {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        setIsLoading(false);
        toast.error('A system error occurred.', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }, 3000);
  }

  return (
    <div>
      <ToastContainer />
      <Card
        bgcolor="warning"
        txtcolor="black"
        hbgcolor="secondary"
        header="Deposit"
        body={(
          <>
            <div>
              <div className="row">
                <div className="col-lg-12">
                  <label htmlFor="total-balance">BALANCE</label>
                  <div id="total-balance">{balance}</div>
                </div>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div>Deposit Amount</div>
                <input className="deposit-input" name="deposit" type="text" onChange={formik.handleChange} value={formik.values.deposit} />
                {formik.errors.deposit ? <div style={{color: 'red'}}>{formik.errors.deposit}</div>:null}
                <button className='btn-secondary' type="submit" disabled={formik.errors.deposit}>Deposit</button>
              </form>
            </div>
          </>
        )}
      />
      {
        isLoading && <div className='row loading'>
        <ReactLoading type={'spokes'} color="#000" style={{textAlign: 'center', height: '10%', width: '10%'}} />
        <span>Saving deposit...</span>
        </div>
      }
    </div>

  )
}

export default Deposit;
