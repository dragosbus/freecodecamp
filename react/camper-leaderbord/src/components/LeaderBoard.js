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
            </div>
        );
    }
}