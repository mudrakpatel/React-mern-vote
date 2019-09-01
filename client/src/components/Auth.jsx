import React, { Component } from 'react';
import { connect } from 'react-redux';

import {authUser, logout} from "../store/actions";

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event){
    const { username, password } = this.state;
    const {authType} = this.props;
    event.preventDefault();

    this.props.authUser(authType || "login", {username, password});
  }

  render() {

    const { username, password } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username"
            value={username} onChange={this.handleChange}/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password"
            value={password} onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

}

export default connect(
  () => ({}),
  {authUser, logout}
)(Auth);
