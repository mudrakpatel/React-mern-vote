import React, { Component } from 'react';
import api from '../services/api';

// const App = () =>
//   <React.Fragment>
//     <div>App works!</div>
//   </React.Fragment>

class App extends Component {

  async componentDidMount() {
    //async and await to avoid returning promises
    const result = await api.call("post", "auth/login", {
      username: "username",
      password: "password"
    });

    console.log(result);
    //console.log(`Result:>>> ${result}`);
  }

  render() {
    return (
      <React.Fragment>
        <div>App works!</div>
      </React.Fragment>
    );
  }

}

export default App;
