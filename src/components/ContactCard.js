import React, { useState } from "react";
import user from "../image/userimg.png";

const ContactCard = (props) => {
    const { id, name, email, phone } = props.contact;
    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState({ name, email, phone });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        props.editContactHandler({ id, ...editedContact });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedContact({ name, email, phone });
        setIsEditing(false);
    };

    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="user" />
            <div className="content">
                {isEditing ? (
                    <div className="ui form">
                        <div className="field">
                            <input
                                type="text"
                                value={editedContact.name}
                                onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
                                placeholder="Name"
                            />
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                value={editedContact.email}
                                onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })}
                                placeholder="Email"
                            />
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                value={editedContact.phone}
                                onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })}
                                placeholder="Phone"
                            />
                        </div>
                        <div className="ui buttons">
                            <button className="ui positive button" onClick={handleSave}>Save</button>
                            <div className="or"></div>
                            <button className="ui button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="header">{name}</div>
                        <div className="description">
                            <div><i className="envelope icon"></i> {email}</div>
                            <div><i className="phone icon"></i> {phone}</div>
                        </div>
                        <div className="actions">
                            <i 
                                className="edit alternate outline icon" 
                                onClick={handleEdit}
                            ></i>
                            <i 
                                className="trash alternate outline icon"
                                onClick={() => props.removeContactHandler(id)}
                            ></i>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContactCard;