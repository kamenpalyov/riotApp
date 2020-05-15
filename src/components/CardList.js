import React from 'react';
import Card from "./Card"

const CardList = ({ data,champions,dataHandler }) => {
    
    return (
        <div>
            {
               data.stats.map((user, i ) =>{     
                    
                    return (
                        <Card 
                            key={i} 
                            tier={user.tier}
                            rank={user.rank} 
                            name={user.summonerName}
                            image={data.profileIconId}
                            lvl={data.summonerLevel}
                            wins={user.wins}
                            losses={user.losses}
                            points={user.leaguePoints}
                            matches={data.matchStats}
                            games={data.games}
                            champions={champions.data}
                            region={data.region}
                            dataHandler={dataHandler}
                        />
                    );
                })
            }
                 
        </div>
    )
}

export default CardList;