import React from 'react'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            signupCode: ""
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        const authType = this.props.signUp ? "signup" : "login"

    }

    render() {
        const { email, password, signupCode } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email address:</label>
                    <input type="text" name="email" value={email} onChange={this.handleChange} />
                    <label>Password:</label>
                    <input type="text" name="email" value={password} onChange={this.handleChange} />

                </form>

            </div>
        )

    }
}

export default LoginForm;