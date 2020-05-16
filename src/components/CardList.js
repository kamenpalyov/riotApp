import React from 'react';
import Card from "./Card"

const CardList = ({ data,champions,dataHandler }) => {
    let flexStats =data.flexStats[0]
    return (
        <div>
            {   
                data.soloStats.map((user,i ) =>{     
                    
                    return (
                        <Card 
                            key={i} 
                            tier={user.tier}
                            tierFlex={flexStats && flexStats.tier}
                            rank={user.rank}
                            rankFlex={flexStats && flexStats.rank} 
                            name={user.summonerName}
                            image={data.profileIconId}
                            lvl={data.summonerLevel}
                            wins={user.wins}
                            winsFlex={flexStats && flexStats.wins}
                            losses={user.losses}
                            lossesFlex={flexStats && flexStats.losses}
                            points={user.leaguePoints}
                            pointsFlex={flexStats && flexStats.leaguePoints}
                            matches={data.matches}
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