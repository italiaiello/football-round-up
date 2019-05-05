import React from 'react';
import LeagueButton from './LeagueButton';

const displayLeagues = ({leagues, onLeagueSelect, onRouteChange, logoURL}) => {
    console.log(leagues)
    return (
        <div className="leagues-container">
            {
                leagues.map(league => {
                    return (
                        <LeagueButton 
                                key={league.idLeague}
                                id={league.idLeague}
                                name={league.strLeague} 
                                 onLeagueSelect={onLeagueSelect}
                                logoURL={logoURL}
                        />
                    )
                })
            
            }
            
        </div>
    )
}

export default displayLeagues;