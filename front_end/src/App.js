import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact.js'



class App extends Component {
  state = {
    screen: 'list',
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

  onNavigateTocreate = () => {
    this.setState({
      screen: 'create'
    });
  }

  onNavigateToList = () => {
    this.setState({
      screen: 'list'
    });
  }

  render() {
    return (
      <div>
        {this.state.screen === 'list' && 
          <ListContacts 
            onDeleteContact={this.removeContact} 
            contacts={this.state.contacts} 
            onNavigate={this.onNavigateTocreate}/>
        }

        {this.state.screen === 'create' &&
          <CreateContact/>
        }
        <button onClick={this.onNavigateToList}>Back to List</button>
      </div>
    )
  }
}

export default App;
