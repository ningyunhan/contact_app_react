import React, {Component} from 'react'
//const imgUrl="http://coding-robin.de/images/pictures/opencv_positive_cropped_scaled_01.jpg"
import PropTypes from  'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'

class ListContacts extends Component{

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({query: query.trim()})
	}

	clearQuery = () => {
		this.setState({query: ''})
	}

	render(){
		//console.log(typeof(this.props.contacts[0].avatarURL))
		const {contacts, onDeleteContact} = this.props
		const {query} = this.state
		let showingContacts;

		if(query){
			const match = new RegExp(escapeRegExp(query), 'i');
			showingContacts = contacts.filter((contact) => match.test(contact.name));
		}
		else{
			showingContacts = contacts;
		}

		showingContacts.sort(sortBy('name'))
		return(
			<div className='list-contacts'>
				<div className='list-contacts-top'>
					<input
						className='search-contacts'
						type='text'
						placeholder='Search contacts'
						value={this.state.query}
						onChange={(event) => this.updateQuery(event.target.value)}
					/>
					<Link
						to="/Create"
						className='add-contact'
					>Add Contact
					</Link>
				</div>

				{showingContacts.length !== contacts.length && <div className='showing-contacts'>
						<span>Now showing {showingContacts.length} of {contacts.length} total</span>
						<button onClick={this.clearQuery}>Show all</button>
					</div>
				}

				<ol className='contact-list'>
					{showingContacts.map((contact) => (
						<li key={contact.id} className='contact-list-item'>
							<div className='contact-avatar' style={{
								backgroundImage: 'url('+ contact.avatarURL +')'
							}}></div>
							<div className='contact-details'>
								<p>{contact.name}</p>
								<p>{contact.email}</p>
							</div>
							<button onClick={() => (onDeleteContact(contact))} className='contact-remove'>
								Remove
							</button>
						</li>
					))}
				</ol>			
			</div>
		)
	}
}


ListContacts.propTypes = {
	contacts: PropTypes.array.isRequired,
	onDeleteContact: PropTypes.func.isRequired
}
export default ListContacts