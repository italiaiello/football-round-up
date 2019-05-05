import React from 'react';

const displayTable = ({standings, onRouteChange, displayTeamDetails}) => {
    
    return (
        <div className="standings-container">
            <div className="App-header">
                <div>
                    <h1>League Standings</h1>
                </div>
            </div>
            <div className="navButtons">
                <button onClick={() => onRouteChange("home")}>Change League</button>
            </div>
            <table className="standings">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th></th>
                        <th>MP</th>
                        <th>W</th>
                        <th>L</th>
                        <th>D</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>Pts</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        standings.map((standing, i) => {

                            return (<tr key={i} onClick={() => displayTeamDetails({i})} >
                                        <td>{`${i+1}`}</td>
                                        <td>{`${standing.name}`}</td>
                                        <td>{standing.played}</td>
                                        <td>{standing.win}</td>
                                        <td>{standing.loss}</td>
                                        <td>{standing.draw}</td>
                                        <td>{standing.goalsfor}</td>
                                        <td>{standing.goalsagainst}</td>
                                        <td>{standing.goalsdifference}</td>
                                        <td>{standing.total}</td>
                                    </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default displayTable;