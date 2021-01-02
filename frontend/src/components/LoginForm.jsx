import React from 'react'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange() {

    }

    handleSubmit() {

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email address:</label>
                    <input type="text" name="email" onChange={this.handleChange} />
                </form>

            </div>
        )

    }
}

export default LoginForm;