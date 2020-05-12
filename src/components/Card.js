import React from 'react';
import "./Card.css"
import {ListGroup,ListGroupItem} from "react-bootstrap"

const Card =({rank,name,image,tier,lvl,wins,losses,points,matches})=>{
    const top10= matches.matches.slice(0,10)
    console.log(top10)
    const renderTop10=(top10,games)=>{
        let result= []
        top10.forEach(match=>{
            games.forEach(game=>{
                if(match.gameID === game.matchId){

                }
            })
        })
    }
    return(
        
        <div>
            
            <div>
                <header className="center">
                    <div className="background">
                        <div className="image-name">
                            <img className="icon" src={`../assets/profileicon/${image}.png`} style={{borderRadius:"50%", border: "4px solid #DC9202 ", width: "100px"}}/>
                            <h2>{name}</h2>
                            <p>level:{lvl}</p>
                        </div>
                    </div>
                    <div className="card">
                        
                        <img className="emblem" src={`../assets/emblems/Emblem_${tier}.png`}  />
                        <h3>Rank: {tier}-{rank}</h3>
                        <p>Wins/Losses: {wins}/{losses}</p>
                        <p>League Points: {points}</p>

                    </div>
                    <div className="mh-container">
                        <ListGroup>
                            {}
                        </ListGroup>
                    </div>
                </header>
                
            </div>
        </div>
    )    
}

export default Card ;