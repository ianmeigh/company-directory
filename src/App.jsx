import "./App.css";
import React, { Component } from "react";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((users) => this.setState(() => ({ users })))
      .catch((err) => console.log(`Problem communicating with API, ${err}`));
  }

  render() {
    return (
      <div className="App">
        <h1>Company Directory</h1>
        <div className="CardsContainer">
          {this.state.users.length === 0 ? (
            <p>Loading...</p>
          ) : (
            this.state.users.map((user) => {
              return (
                <div className="Card" key={user.id}>
                  <p>{user.name}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default App;
