import React, {Component} from 'react';

class LeagueButton extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            logoURL: ''
        }
    }
    
    componentDidMount() {
        this.getLogo(this.props.id)
    }
    
    getLogo = (id) => {
        fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${id}`)
            .then(response => response.json())
            .then(data => this.setState({logoURL: data.leagues[0].strBadge}))
    }
    
    render() {
        
        const {logoURL} = this.state;
        const {name, onLeagueSelect, id} = this.props;
        
        return (
            <div onClick={() => onLeagueSelect({id})} className="leagueButton select">
                <figure>
                    <img src={logoURL} width="100%" height="auto" alt="Logo" />
                </figure>
                <p><strong>{name}</strong></p>
            </div>
        )
        
    }
    
    
    
}

export default LeagueButton;