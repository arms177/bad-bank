import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { UserContext } from './context';
import Card from './card';

function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = useContext(UserContext);
  let text = '';

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  const showToastMessage = (text) => {
    toast.success(text, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  const handleCreate = async () => {
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

    const createUrl = `/account/create/${name}/${email}/${password}`;
    //call express to set account in DB
    const response = await fetch(createUrl);
    const userResponse = await response.json(); //extract JSON from the http response

    console.log(userResponse);

    text = 'Successfully Created Account';
    setShow(false);
    showToastMessage(text);
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <div>
      <ToastContainer />
      <Card
        bgcolor="info"
        hbgcolor="black"
        header="Create Account"
        status={status}
        body={show ? (
          <>
            Name<br/>
            <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
            Email address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
            <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
          </>
        ):(
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
          </>
        )}
      />
    </div>

  )
}

export default CreateAccount;
