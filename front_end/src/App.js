import React, { Component } from 'react';
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact.js'
import {Route} from 'react-router-dom'


class App extends Component {
  state = {
    //screen: 'list',
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
/*
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
*/
  render() {
    return (
      <div>
        <Route exact path='/' render={() => 
          <ListContacts 
            onDeleteContact={this.removeContact} 
            contacts={this.state.contacts}/>
        }>
        </Route>

        <Route exact path='/create' render={() => <CreateContact/>}>
        </Route>
      </div>
    )
  }
}

export default App;
