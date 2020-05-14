import React from 'react';
import "./Card.css"
import {ListGroup,ListGroupItem,Col,Row} from "react-bootstrap"

const Card =({rank,name,image,tier,lvl,wins,losses,points,matches,games,champions})=>{
    const mapGames= games.map(game=>{
        return game.participants.map(ids=>{
            return ids.championId
        })
    })
    
    const players = mapGames.map(game=>{
        const champImage=[]
        for (let id of game){
            let names=Object.keys(champions)
            names.forEach(name=>{
                if ( parseInt(champions[name].key) === id){
                    champImage.push(name)
                    return ;
                }  
            })
        }
        return champImage
    })
    
    const playerImage=(arr,indexes)=>{
        return arr.slice(indexes[0],indexes[1]).map((img,i)=>{
            return <img className="player-img" key={i} src={`../assets/champion/${img}.png`} />
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
                        <div style={{display:"flex",}}>
                            <div style={{display:"flex", flexDirection:"column"}}>{playerImage(players[0],[0,5])}</div>
                            <div>VS</div>
                            <div style={{display:"flex", flexDirection:"column"}}>{playerImage(players[0],[5,10])}</div>
                        </div>
                        

                        {/* {playerImage(players[1],[0,5])}
                        {playerImage(players[2],[0,5])} */}
                    </div>
                    
                </header>
                
            </div>
        </div>
    )    
}

export default Card ;