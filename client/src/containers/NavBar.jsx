import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {logout} from "../store/actions";

const NavBar = ({auth, logout}) => {
  const {username} = auth.user;
  return (
  <div>
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/test">Test</Link>
      </li>
      <li>
        {/*<a>Logout</a>*/}
        {/*<a href="" onClick={logout}>Logout</a>*/}
        <Link to="" onClick={logout}>Logout</Link>
      </li>
    </ul>
      { auth.isAuthenticated && (<p>Logged in as {username}</p>) }
  </div>
)};

export default connect(
  (store) => ({auth: store.auth}),
  {logout}
)(NavBar);
