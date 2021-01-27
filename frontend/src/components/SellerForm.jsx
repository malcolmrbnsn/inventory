import React from 'react';

class SellerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) { 
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        let {name, email} = this.state;
        return (
            <div>
                <label>name</label>
                <input type="text" name="name" value={name} onChange={this.handleChange}/>
                <label>email</label>
                <input type="text" name="email" value={email} onChange={this.handleChange}/>
            </div>
        )
    }
}

export default SellerForm