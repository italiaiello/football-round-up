import React, { Component } from 'react';
import FavTeam from './Components/FavTeam/FavTeam';
import Leagues from './Components/Leagues/Leagues';
import Standings from './Components/Leagues/Standings';
import TeamDetails from './Components/TeamDetails/TeamDetails';
import Player from './Components/Players/Player';
import SignInForm from './Components/SignInForm/SignInForm';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';

import './App.css';

const initialState = {
    leagues: [],
    searchField: '',
    logoURL: '',
    leagueID: '',
    standings: [],
    details: [],
    players: [],
    playerIndex: 0,
    isPending: true,
    route: 'signin',
    user: {
        name: '',
        favTeam: '',
    },
    favTeamDetails: []
}

class App extends Component {
    
    constructor() {
        super();
        this.state = initialState;
    }
    
    componentDidMount() {
        this.fetchLeagues()
    }
    
    loadUser = (data) => {
        this.setState({isPending: true})
        this.setState({user: {
            name: data.name,
            favTeam: data.team
        }})
        
        fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${data.team}`)
            .then(response => response.json())
            .then(data => {
                this.setState({favTeamDetails: data.teams})
                this.setState({isPending: false})
            })
    }
    
    fetchLeagues = () => {
        fetch('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data.leagues.length = 22;
                this.setState({leagues: data.leagues})
                this.setState({isPending: false})
            })
    }
    
    onSearchChange = e => {
        this.setState({searchField: e.target.value})
        
        fetch('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php')
            .then(response => response.json())
            .then(data => {
                data.leagues.length = 22;
                const filteredLeagues = data.leagues.filter(league => league.strLeague.toLowerCase().includes(this.state.searchField.toLowerCase()))
                
                this.setState({leagues: filteredLeagues})
            })
        
        
        
        
    }
    
    onLeagueSelect = (leagueID) => {
        console.log(leagueID)
        this.setState({leagueID: leagueID});
        this.setState({isPending: true})
        
        if (leagueID.id === "4336" || leagueID.id === "4358" || leagueID.id === "4359") {
            fetch(`https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueID.id}&s=1718`)
                .then(response => response.json())
                .then(data => {
                    this.setState({standings: data.table})
                    this.setState({isPending: false})
                    this.onRouteChange('table')
                })
                .catch(console.log)
            
        } else {
            fetch(`https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueID.id}&s=1819`)
                .then(response => response.json())
                .then(data => {
                    this.setState({standings: data.table})
                    this.setState({isPending: false})
                    this.onRouteChange('table')
                })
                .catch(console.log)
        }
        
    }
    
    displayTeamDetails = (row) => {
        this.setState({isPending: true})
        const {standings} = this.state;
        const team = standings[row.i].name;
        fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`)
            .then(response => response.json())
            .then(data => {
                this.setState({details: data.teams[0]})
                console.log(this.state.details)
                this.displayAllPlayers(data.teams[0].strTeam)
            })
    }
    
    displayAllPlayers = (teamName) => {
        fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=${teamName}`)
            .then(response => response.json())
            .then(data => {
                this.setState({players: data.player})
                this.setState({isPending: false})
                this.onRouteChange('teamDetails');
                
            })
    }
    
    onPlayerSelect = (row) => {
        this.setState({playerIndex: row.i})
        this.onRouteChange('playerDetails');
    }
    
    onRouteChange = (route) => {
        this.setState({route: route})
    }
    
  render() {
      const {leagues, logoURL, leagueID, standings, details, players, playerIndex, isPending, route, user} = this.state;
      
    return (
        
            isPending === true
            ? <h2>Loading</h2>
            :
              (
                  route === 'home'
                  ?
                  <div className="App">
                    <div className="App-header">
                        <div className="home-header">
                            <h1>Football Round-Up</h1>
                        </div>
                    </div>
                    <FavTeam user={user} favTeamDetails={this.state.favTeamDetails} onLeagueSelect={this.onLeagueSelect} />
                    <h2>Select A League</h2>
                    <input id="searchBar" type="text" name="leagueSearch" placeholder="Search leagues" onChange={this.onSearchChange}/>
                    <Leagues leagues={leagues} 
                             onLeagueSelect={this.onLeagueSelect}           onRouteChange={this.onRouteChange}
                             logoURL={logoURL}
                             
                    />
                  </div>
                  :
                  (
                      route === 'table'
                      ?
                      <Standings standings={standings} 
                                 onRouteChange={this.onRouteChange}
                                 details={details}
                                 displayTeamDetails={this.displayTeamDetails}
                                 leagueID={leagueID}
                                 
                      />
                      :
                      (
                        route === 'teamDetails'
                        ?
                        <TeamDetails details={details} onRouteChange={this.onRouteChange} displayAllPlayers={this.displayAllPlayers} players={players} onPlayerSelect={this.onPlayerSelect} />
                        :
                        (
                            route === 'playerDetails'
                            ?
                            <Player players={players} playerIndex={playerIndex} onRouteChange={this.onRouteChange}/>
                            :
                            (
                                route === 'signin'
                                ?
                                <SignInForm onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                                :
                                <RegistrationForm onRouteChange={this.onRouteChange} leagues={leagues} loadUser={this.loadUser}/>
                            )
                        )
                      )
                      
                      
                  )
              )
        
    );
      
  
  }
}

export default App;
