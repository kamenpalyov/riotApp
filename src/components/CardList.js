import React from 'react';
import Card from "./Card"

const CardList = ({ data }) => {
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

                            
                        />
                    );
                })
            }
                 
        </div>
    )
}

export default CardList;