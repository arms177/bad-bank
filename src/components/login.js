import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { UserContext } from './context';
import Card from './card';
import { useNavigate } from "react-router-dom";

function Login({ change }){
  const ctx = useContext(UserContext);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  let text = '';
  const navigate = useNavigate();

  const handleLogin = async () => {
    let hasValidated;
    const loginUrl = `/account/login/${email}/${password}`;
    //call express to login user
    const response = await fetch(loginUrl);
    const userResponse = await response.json(); //extract JSON from the http response

    console.log(userResponse);
    hasValidated = userResponse.status === 'success' ? true : false;

    if (hasValidated) {
      ctx.isLoggedIn = true;
      ctx.user.name = userResponse.data.name;
      ctx.user.email = userResponse.data.email;
      ctx.user.balance = userResponse.data.balance;
      setTimeout(() => {
        console.log(ctx);
        text = `Welcome to Bad Bank`;
        showToastMessage(text, 'success');
        navigate("/");
        change();
      }, 3000);
    } else {
      showToastMessage(userResponse.message, 'error');
    }
  }

  const showToastMessage = (text, typeError) => {
    toast[typeError](text, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div>
      <ToastContainer />
      <Card
        bgcolor="default"
        txtcolor="black"
        hbgcolor="black"
        htxtcolor="white"
        header="Login"
        status={status}
        body={(
          <>
            Email address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
            <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
          </>
        )}
      />
    </div>
  )  
}

export default Login;
