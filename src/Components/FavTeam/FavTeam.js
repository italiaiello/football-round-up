import React from 'react';

const FavTeam = ({ user, favTeamDetails, onLeagueSelect }) => {
    
    const leagueID = {
        id: favTeamDetails[0].idLeague
    }
    return(
        <div className="userContainer">
            <h1>{`Hello, ${user.name}!`}</h1>
            <div className="favTeam">
                <figure onClick={() => onLeagueSelect(leagueID)}>
                    <img src={favTeamDetails[0].strTeamBadge} alt={favTeamDetails[0].strTeam} />
                </figure>
                <p>{`Favourite Team`} </p>
            </div>
        </div>
    )
}

export default FavTeam;