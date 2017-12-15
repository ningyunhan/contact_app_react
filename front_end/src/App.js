import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact.js'



class App extends Component {
  state = {
    contacts :[]
  }

  componentDidMount(){
    ContactsAPI.getAll().then((contacts) => {
      this.setState({contacts})
    });
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((cc) => cc.id !== contact.id)
    }));

    ContactsAPI.remove(contact)
  }

  render() {
    return (
      <div>
        <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}/>
        <CreateContact/>
      </div>
    )
  }
}

export default App;
