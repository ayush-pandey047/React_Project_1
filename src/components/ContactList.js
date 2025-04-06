import React from "react";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard
                key={contact.id}
                contact={contact}
                removeContactHandler={props.removeContactHandler}
                editContactHandler={props.editContactHandler}
            />
        );
    });

    return (
        <div className="ui celled list" style={{ marginTop: '20px' }}>
            {props.contacts.length === 0 ? (
                <div className="ui message">
                    <div className="header">No Contacts Found</div>
                    <p>Add some contacts to get started!</p>
                </div>
            ) : (
                renderContactList
            )}
        </div>
    );
};

export default ContactList;