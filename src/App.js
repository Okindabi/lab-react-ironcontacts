import React from "react";
import "./App.css";
import allContacts from "./contacts.json";

function App() {
  let fiveArr = allContacts.slice(0, 5);
  let remainingArr = allContacts.slice(5, allContacts.length);

  const [contact, setContact] = React.useState(fiveArr);
  const [remainingContact, setRemainingContact] = React.useState(remainingArr);
  const [ascending, setAscending] = React.useState(true);

  const addRandomContact = () => {
    let newRandomContact =
      remainingContact[Math.floor(Math.random() * setRemainingContact.length)];

    if (!newRandomContact) {
      return;
    }
    setContact(contact.concat(newRandomContact));
    let newRemainingContact = remainingContact.filter((contact) => {
      return contact.name !== newRandomContact.name;
    });
    setRemainingContact(newRemainingContact);
  };

  const orderAlphabetically = () => {
    let arrayCopy = [...contact];
    if (ascending) {
      //ascending
      arrayCopy.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      //descending
      arrayCopy.sort((a, b) => (a.name < b.name ? 1 : -1));
    }
    setContact(arrayCopy);
    setAscending(!ascending);
  };

  const orderByPopularity = () => {
    let arrayCopy = [...contact];
    if (ascending) {
      //ascending
      arrayCopy.sort((a, b) => a.popularity - b.popularity);
    } else {
      //descending
      arrayCopy.sort((a, b) => b.popularity - a.popularity);
    }
    setContact(arrayCopy);
    setAscending(!ascending);
  };

  const removeContact = (contactToRemove) => {
    let filteredArray = contact.filter((celeb) => {
      return celeb !== contactToRemove;
    });
    setContact(filteredArray);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={orderAlphabetically}>
        Order Alphabetically ({ascending ? "ascending" : "descending"})
      </button>
      <button onClick={orderByPopularity}>
        Order By Popularity ({ascending ? "ascending" : "descending"})
      </button>
      <table style={{ border: "1px solid black" }}>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
        </tr>
        {contact.map((props) => {
          return (
            <tr>
              <td>
                <img
                  src={props.pictureUrl}
                  alt="contact"
                  style={{ height: 100 }}
                />
              </td>
              <td>{props.name}</td>
              <td>{Math.round(props.popularity * 100) / 100}</td>
              <td>{props.wonOscar ? "🏆" : ""}</td>
              <td>{props.wonEmmy ? "🏆" : ""}</td>
              <td>
                <button onClick={() => removeContact(props)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
