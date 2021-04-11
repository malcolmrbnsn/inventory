import React from 'react'
import apiCall from '../api'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            signupCode: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const authType = this.props.signUp ? "signup" : "login"
        apiCall("post", "/users/" + authType, this.state)
        .then(res => alert(res))

    }

    render() {
        const { email, password, signupCode } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email address:</label>
                    <input type="text" name="email" value={email} onChange={this.handleChange} />
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={this.handleChange} />
                    <button type="submit">goo</button>
                </form>

            </div>
        )

    }
}

export default Login;