import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact.js'



class App extends Component {
  state = {
    screen:'list',
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
        {this.state.screen === 'list' && 
          (<ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}/>)
        }
        {this.state.screen === 'create' && 
          <CreateContact/>
        }
      </div>
    )
  }
}

export default App;
