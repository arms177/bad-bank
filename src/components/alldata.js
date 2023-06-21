import React, {useState, useEffect} from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import ReactLoading from 'react-loading';

function AllData(){
  const [users, setUsers] = useState([]);

  const usersUrl = `http://167.172.234.182:3001/account/all`;
  //call express to fetch accounts in DB
  const getUsers = async () => {
    const response = await fetch(usersUrl);
    const userResponse = await response.json(); //extract JSON from the http response
    console.log(userResponse);
    if (userResponse) {
      if (users.length < 1) {
        setUsers(...users, userResponse);
      }
    }
  }

  getUsers();

  function setRows(users) {
    if (users.length > 0) {
      return users.map((user,i) => {
        return <tr key={i}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
        </tr>;
      });
    } else {
      return;
    }

  }
  return (
    <>
    <h5>ALL DATA</h5>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Password</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {setRows(users)}
        </MDBTableBody>
      </MDBTable>
    </>
  );
}

export default AllData;
