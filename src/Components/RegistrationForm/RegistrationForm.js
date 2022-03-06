import React, {Component} from 'react';

class RegistrationForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            signUpEmail: '',
            signUpPassword: '',
            signUpName: '',
            teams: [],
            favTeam: '',
            currentFormStep: 1,
        }
    }
    
    onEmailChange = (event) => {
        this.setState({signUpEmail: event.target.value});
    }
    
    onPasswordChange = (event) => {
        this.setState({signUpPassword: event.target.value});
    }
    
    onNameChange = (event) => {
        this.setState({signUpName: event.target.value});
    }
    
    onLeagueChange = (event) => {
        
        if (event.target.value === 'Please Select A League') {
            const options = document.querySelectorAll('#second-choice option')
            
            options.forEach(option => option.selected = option.defaultSelected)
        }
        
        if (event.target.value !== 'Please Select A League') {
            
            const filteredLeagues = this.props.leagues.filter(league => league.strLeague === event.target.value)

            const leagueName = filteredLeagues[0].strLeague;
            let teamsInLeague = [];

            fetch(`https://www.thesportsdb.com/api/v1/json/50130162/search_all_teams.php?l=${leagueName}`)
                .then(response => response.json())
                .then(data => {
                    data.teams.map(team => teamsInLeague.push(team.strTeam))
                    console.log(teamsInLeague)
                    this.setState({teams: teamsInLeague})
                })
                .catch(console.log)
            
        }
        
        
    }
    
    onTeamChange = (event) => {
        this.setState({favTeam: event.target.value})
    }
    
    onSubmitSignIn = () => {
        console.log(this.state.favTeam)
        fetch('https://dry-tor-61029.herokuapp.com/register', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.signUpEmail,
            password: this.state.signUpPassword,
            name: this.state.signUpName,
            team: this.state.favTeam
          })
        })
          .then(response => response.json())
          .then(data => {
            if (data.id) {
                this.setState({currentFormStep: 1})
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }
        })
        .catch(err => console.log(err))
    }

    

    onNextStep = () => {
      if (this.state.currentFormStep === 1) {
        this.setState({currentFormStep: 2})
      } else {
        this.setState({ currentFormStep: 1 })
      }

    }
    
    
    render() {
        const { onRouteChange, leagues } = this.props;
        const { teams, currentFormStep } = this.state;
        
        return(
            <div className="form">
               <h3>Register</h3>
                <p>{`Step ${this.state.currentFormStep} of 2`}</p>
               <fieldset>
                {
                  currentFormStep === 1 ?
                  <article className="regPart1">
                    <div className="formField">
                        <input
                          className="inputBox"
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Name"
                          onChange={this.onNameChange}
                        />
                    </div>
                    <div className="formField">
                        <input
                          className="inputBox"
                          type="email"
                          name="email-address"
                          id="email-address"
                          placeholder="Email"
                          onChange={this.onEmailChange}
                        />
                    </div>
                    <div className="formField">
                        <input
                          className="inputBox"
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          onChange={this.onPasswordChange}
                        />
                    </div>
                  </article>
                  :
                  <article className="regPart2 hide">
                    <div className="dropdownWrapper">
                      <select id="first-choice" className="dropdown" onChange={this.onLeagueChange}>
                        <option defaultValue="base">Select A League</option>
                        {
                            leagues.map((league, i) => {
                              return(
                                  <option key={i} value={`${league.strLeague}`}>{`${league.strLeague}`}</option>
                              )
                          })
                        }
                      </select>
                    </div>
                    <br />
                    <div className="dropdownWrapper">
                      <select id="second-choice" className="dropdown" onChange={this.onTeamChange}>
                        <option defaultValue="base">Select Your Favourite Team</option>
                        {
                            teams.map((team, i) => {
                                return(
                                      <option key={i} value={`${team}`}>{`${team}`}</option>
                                )
                            }) 
                        }
                      </select>
                    </div>
                  </article>
                }
                </fieldset>
                <div className="formNav">
                      {
                        currentFormStep === 1 ?
                        <button onClick={this.onNextStep} className="submitButton">Next Step</button>
                        :
                        <button onClick={this.onSubmitSignIn} className="submitButton" type="submit">Register</button>

                      }
                      <hr />
                    <div className="register">
                      <p  onClick={() => onRouteChange('signin')} className="registerButton">Sign In</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationForm