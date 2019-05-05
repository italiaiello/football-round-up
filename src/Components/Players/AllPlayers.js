import React from 'react';

const AllPlayers = ({players, playerIndex, onPlayerSelect, onRouteChange}) => {
    return (
        <table className="standings players">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Nationality</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody>
                {
                    players.map((player, i) => {
                        return (<tr key={i} onClick={() => onPlayerSelect({i})}>
                                    <td>{player.strPlayer}</td>
                                    <td>{player.strNationality}</td>
                                    <td>{player.strPosition}</td>
                                </tr>)
                    })
                }
            </tbody>
        </table>
    )
}

export default AllPlayers;