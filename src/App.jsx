import "./App.css";
import React, { Component } from "react";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      searchQuery: "",
      isDataLoaded: false,
    };
  }

  handleInputChange = (e) => {
    const searchQuery = e.target.value.toLocaleLowerCase();
    this.setState({ searchQuery });
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((users) => this.setState({ users, isDataLoaded: true }))
      .catch((err) => console.log(`Problem communicating with API, ${err}`));
  }

  render() {
    const { users, searchQuery, isDataLoaded } = this.state;
    const { handleInputChange } = this;

    const filteredUsers = users.filter((user) =>
      user.name.toLocaleLowerCase().includes(searchQuery)
    );

    return (
      <div className="App">
        <h1>Company Directory</h1>
        <input
          type="search"
          placeholder="Search Directory..."
          onChange={handleInputChange}
        />
        <div className="CardsContainer">
          {/* Display Data */}
          {isDataLoaded ? (
            filteredUsers.length === 0 ? (
              <p>No Results</p>
            ) : (
              filteredUsers.map((user) => {
                return (
                  <div className="Card" key={user.id}>
                    <p>{user.name}</p>
                  </div>
                );
              })
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
