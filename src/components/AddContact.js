import React from "react";

class AddContact extends React.Component {
    state = {
        name: "",
        email: "",
        phone: "",
        errors: {}
    }

    validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[\d\s-]{10,}$/;

        if (!this.state.name.trim()) {
            errors.name = "Name is required";
        }
        if (!this.state.email.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(this.state.email)) {
            errors.email = "Please enter a valid email";
        }
        if (!this.state.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!phoneRegex.test(this.state.phone)) {
            errors.phone = "Please enter a valid phone number";
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    }

    add = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            this.props.addContactHandler(this.state);
            this.setState({
                name: "",
                email: "",
                phone: "",
                errors: {}
            });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="ui segment">
                <h2 className="ui header">Add New Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className={`field ${errors.name ? 'error' : ''}`}>
                        <label>Name</label>
                        <div className="ui left icon input">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Enter name" 
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })}
                            />
                            <i className="user icon"></i>
                        </div>
                        {errors.name && <div className="ui pointing red basic label">{errors.name}</div>}
                    </div>
                    <div className={`field ${errors.email ? 'error' : ''}`}>
                        <label>Email</label>
                        <div className="ui left icon input">
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                            />
                            <i className="envelope icon"></i>
                        </div>
                        {errors.email && <div className="ui pointing red basic label">{errors.email}</div>}
                    </div>
                    <div className={`field ${errors.phone ? 'error' : ''}`}>
                        <label>Phone Number</label>
                        <div className="ui left icon input">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter phone number"
                                value={this.state.phone}
                                onChange={(e) => this.setState({ phone: e.target.value })}
                            />
                            <i className="phone icon"></i>
                        </div>
                        {errors.phone && <div className="ui pointing red basic label">{errors.phone}</div>}
                    </div>
                    <button className="ui button primary" type="submit">
                        <i className="plus icon"></i>
                        Add Contact
                    </button>
                </form>
            </div>
        );
    }
}

export default AddContact;