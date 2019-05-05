import React from 'react';

const Player = ({players, playerIndex, onRouteChange}) => {
    
    let playerImage = players[playerIndex].strCutout;
    
    if (playerImage === null) {
        playerImage = players[playerIndex].strThumb;
    }
    
    let dateBornArray = players[playerIndex].dateBorn.split('-')
    let dateBorn = `${dateBornArray[2]}-${dateBornArray[1]}-${dateBornArray[0]}`
    
    return (
        <div className="player-details">
            <div className="App-header">
                <div className="teamHeader-content">
                    <h1>Player Details</h1>
                </div>
            </div>
            <div className="navButtons">
                <button onClick={() => onRouteChange('home')}>Change League</button>
                <button onClick={() => onRouteChange('teamDetails')}>View Team Details</button>
            </div>
            <div className="about-player">
                <div className="player-info">
                    <figure>
                        <img src={playerImage} width="150" height="auto" alt={players[playerIndex].strPlayer}/>
                    </figure>
                    <div className="info-box">
                        <div>
                            <h4>Place of Birth</h4>
                            <p>{`${players[playerIndex].strBirthLocation}`}</p>
                        </div>
                        <div>
                            <h4>Birth Date</h4>
                            <p className="DoB">{`${dateBorn}`}</p>
                        </div>
                    </div>
                </div>
                <div className="player-description">
                    <div>
                        <h3>{`About ${players[playerIndex].strPlayer}`}</h3>
                        <p>{players[playerIndex].strDescriptionEN}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player;