import React from 'react';
import FacebookLogo from './Icons/facebook.svg';
import TwitterLogo from './Icons/twitter.svg';
import InstagramLogo from './Icons/instagram.svg';
import YouTubeLogo from './Icons/youtube.svg';

const TeamDetails = ({details, onRouteChange}) => {
    
    if (details.strManager.length === 0) {
        details.strManager = 'Not available';
    }
    
    // Adding commas to capacity number 
    details.intStadiumCapacity = details.intStadiumCapacity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    
    return (
        <div className="teamDetails-container">
            <div className="App-header">
                <div className="teamHeader-content">
                    <h1>{`About ${details.strTeam}`}</h1>
                </div>
            </div>
            <div className="navButtons">
                <button onClick={() => onRouteChange('home')}>Change League</button>
                <button onClick={() => onRouteChange('table')}>View League Standings</button>
            </div>
            <div className="details-container">
                
                    <div className="badge">
                        <figure>
                            <img src={details.strTeamBadge} width="100px" height="auto" alt="Team Badge"/>
                        </figure>
                    </div>
                <div>
                    <h3>Description</h3>
                    <p>{details.strDescriptionEN}</p>
                </div>
                <br />
            </div>
            <div className="footer">
                <div>
                    <a className="select" href={`http://${details.strFacebook}`} rel="noopener noreferrer" target="_blank"><img src={FacebookLogo} alt="Facebook Icon" /></a>
                    <a className="select" href={`http://${details.strTwitter}`} rel="noopener noreferrer" target="_blank"><img src={TwitterLogo} alt="Twitter Icon" /></a>
                    <a className="select" href={`http://${details.strInstagram}`} rel="noopener noreferrer" target="_blank"><img src={InstagramLogo} alt="Instagram Icon" /></a>
                    <a className="select" href={`http://${details.strYoutube}`} rel="noopener noreferrer" target="_blank"><img src={YouTubeLogo} alt="YouTube Icon" /></a>
                    <button className="teamWebsite select"><a href={`http://${details.strWebsite}`} rel="noopener noreferrer" target="_blank">View Team's Website</a></button>
                </div>
            </div>
        </div>
    )
}

export default TeamDetails;