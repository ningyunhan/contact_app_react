import React, {Component} from 'react'
//const imgUrl="http://coding-robin.de/images/pictures/opencv_positive_cropped_scaled_01.jpg"

class ListContacts extends Component{
	render(){
		//console.log(typeof(this.props.contacts[0].avatarURL))
		return(
			<ol className='contact-list'>
				{this.props.contacts.map((contact) => (
					<li key={contact.id} className='contact-list-item'>
						<div className='contact-avatar' style={{
							backgroundImage: 'url('+ contact.avatarURL +')'
						}}></div>
						<div className='contact-details'>
							<p>{contact.name}</p>
							<p>{contact.email}</p>
						</div>
						<button onClick={() => (this.props.onDeleteContact(contact))} className='contact-remove'>
							Remove
						</button>
					</li>
				))}
			</ol>
		)
	}
}

export default ListContacts