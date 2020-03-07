import React, {Component} from 'react';

class RegistrationForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            signUpEmail: '',
            signUpPassword: '',
            signUpName: '',
            teams: [],
            favTeam: ''
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

            fetch(`https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${leagueName}`)
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
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }
        })
        .catch(err => console.log(err))
    }
    
    
    render() {
        const { onRouteChange, leagues } = this.props;
        const { teams } = this.state;
        
        return(
            <div className="form">
               <h3>Register</h3>
               <fieldset>
                <div className="formField">
                    <label htmlFor="name">Name</label>
                    <input
                      className="inputBox"
                      type="text"
                      name="name"
                      id="name"
                      onChange={this.onNameChange}
                    />
                </div>
                <div className="formField">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
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
                <select id="first-choice" onChange={this.onLeagueChange}>
                  <option defaultValue="base">Select A League</option>
                  {
                      leagues.map((league, i) => {
                        return(
                            <option key={i} value={`${league.strLeague}`}>{`${league.strLeague}`}</option>
                        )
                    })
                  }
                </select>
                <br />
                <select id="second-choice" onChange={this.onTeamChange}>
                  <option defaultValue="base">Select Your Favourite Team</option>
                  {
                       teams.map((team, i) => {
                           return(
                                <option key={i} value={`${team}`}>{`${team}`}</option>
                           )
                       }) 
                  }
                </select>
                </fieldset>
                <div className="formNav">
                    <div className="signin">
                      <input
                        onClick={this.onSubmitSignIn}
                        className="submitButton"
                        type="submit"
                        value="Register"
                      />
                    </div>
                    <div className="register">
                      <p  onClick={() => onRouteChange('signin')} className="registerButton">Sign In</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrationForm