import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from "react-loading";
import { useFormik } from "formik";
import { useContext } from 'react';
import { UserContext } from './context';
import Card from './card';

function Withdraw(){
  const ctx = useContext(UserContext);
  const [balance, setBalance] = React.useState(ctx.user.balance);
  const [isLoading,setIsLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      withdraw: ''
    },
    onSubmit: values => {
      if (values.validation === 'yes') {
        updateBalance();
      }
    },
    validate: values => {
      let errors = {};
      if (balance <=0) {
        errors.withdraw = 'There is no more money to withdraw';
      } else if (balance - parseInt(values.withdraw) < 0) {
        errors.withdraw = 'The value entered is greater than the balance.';
      } else if (!values.withdraw) {
        errors.withdraw = 'Please enter a value to withdraw';
      } else if (values.withdraw <= 0) {
        errors.withdraw = 'Please enter a number greater than 0.';
      } else if (isNaN(values.withdraw)) {
        errors.withdraw = 'Please enter numbers only.';
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
      const amount = -parseInt(formik.values.withdraw);
      const withdrawUrl = `http://167.172.234.182:3001/account/withdraw/${ctx.user.email}/${amount}`;
      //call express to update balance in DB
      const response = await fetch(withdrawUrl);
      const userResponse = await response.json(); //extract JSON from the http response

      if (userResponse) {
        setBalance(userResponse.balance);
        ctx.user.balance = userResponse.balance;
        formik.values.withdraw = '';
        setIsLoading(false);
        toast.success('Successfully completed withdraw.', {
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
        header="Withdraw"
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
                <div>Withdraw Amount</div>
                <input className="deposit-input" name="withdraw" type="text" onChange={formik.handleChange} value={formik.values.withdraw} />
                {formik.errors.withdraw ? <div style={{color: 'red'}}>{formik.errors.withdraw}</div>:null}
                <button className='btn-secondary' type="submit" disabled={formik.errors.withdraw}>Withdraw</button>
              </form>
            </div>

          </>
        )}
      />
      {
        isLoading && <div className='row loading'>
          <ReactLoading type={'spokes'} color="#000" style={{textAlign: 'center', height: '10%', width: '10%'}} />
          <span>Saving withdraw...</span>
        </div>
      }
    </div>

  )
}

export default Withdraw;
