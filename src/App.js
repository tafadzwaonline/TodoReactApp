import React, { Component } from 'react';
import './App.css'; // Import your CSS file for styling

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  API_URL = "http://localhost:7298/";

  componentDidMount() {
    this.refreshNotes();
  }

  async addClick() {
    var Newnotes = document.getElementById("Newnotes").value;
    const data = new FormData();
    data.append("Newnotes", Newnotes);

    fetch(this.API_URL + "api/TodoApp/AddNotes", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      });
  }

  async deleteClick(id) {
    try {
      const response = await fetch(this.API_URL + "api/TodoApp/DeleteNotes?id=" + id, {
        method: "DELETE",
      });
      const result = await response.json();
      alert(result);
      this.refreshNotes();
    } catch (error) {
      console.error(error);
    }
  }

  async refreshNotes() {
    fetch(this.API_URL + 'api/TodoApp/GetNotes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="App">
        <div className="header">
          <h2>My First React To-Do App</h2>
          <input id="Newnotes" />
          <button onClick={() => this.addClick()}>Add Notes</button>
        </div>
        <div className="notes">
          {notes.map((note) => (
            <div key={note.ID} className="note">
              <p>
                <b>*{note.ID}. {note.Description}</b>
              </p>
              <button onClick={() => this.deleteClick(note.ID)}>Delete Notes</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
