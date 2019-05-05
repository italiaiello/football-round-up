import React, {Component} from 'react';

class SignInForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    
    onPasswordChange = (event) => {
        this.setState({password  : event.target.value})
    }
    
    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.id) {
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }
        })
    }
    
    
    render() {
        const { onRouteChange } = this.props;
        return(
            <div className="form">
               <h3>Sign In</h3>
               <fieldset>
                <div className="formField">
                    <label htmlFor="email-address">Email</label>
                    <input
                      className="inputBox"
                      type="email"
                      name="email-address"
                      id="email-address"
                      onChange={this.onEmailChange}
                    />
                </div>
                <div className="formField">
                    <label htmlFor="password">Password</label>
                    <input
                      className="inputBox"
                      type="password"
                      name="password"
                      id="password"
                      onChange={this.onPasswordChange}
                    />
                </div>
                </fieldset>
                <div className="formNav">
                    <div className="signin">
                      <input
                        onClick={this.onSubmitSignIn}
                        className="submitButton"
                        type="submit"
                        value="Sign in"
                      />
                    </div>
                    <div className="register">
                      <p  onClick={() => onRouteChange('register')} className="registerButton">Register</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignInForm