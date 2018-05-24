import React, { Component } from 'react';


export class LeaderBoard extends Component {
    render() {
        return (
            <div className="leaderboard">
                <header className="leaderboard-header">
                    <h2>Leaderboard</h2>
                </header>
                <div className="columns">
                    <div>#</div>
                    <div>Camper Name</div>
                    <div>
                        <button>Points In last 30 Days</button>
                    </div>
                    <div>
                        <button>All Time</button>
                    </div>
                </div>
                {this.props.leaderboard.map((user, i) => 
                    <Row key={i} id={i + 1} photo={user.img} name={user.username} points30={user.recent} allTime={user.alltime}/>
                )}
            </div>
        );
    }
}

const Row = props => {
    return (
        <div className="row">
            <div>{props.id}</div>
            <div>
                <img src={props.photo} />
                <p>{props.name}</p>
            </div>
            <div>{props.points30}</div>
            <div>{props.allTime}</div>
        </div>
    );  
};