import React from 'react';
import Card from './card';

function Home(){
  return (
    <Card
      hbgcolor="primary"
      htxtcolor="white"
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<img src="bank.png" className="img-fluid" alt="bad bank logo"/>)}
    />    
  );  
}

export default Home;
