import React from 'react';
import "./Card.css"
import {ListGroup,ListGroupItem,Col,Row} from "react-bootstrap"
import {Link} from "react-router-dom"

const Card =({rank,name,image,tier,lvl,wins,losses,points,matches,games,champions,region,dataHandler})=>{
    const mapGames= games.map(game=>{
        return game.participants.map(ids=>{
            return ids.championId
        })
    })
    const playerName= games.map(part=>{
        return part.participantIdentities.map(name=>{
            return name.player.summonerName
        })
    })
    const playerId= games.map(part=>{
        return part.participantIdentities.map(name=>{
            return name.player.accountId
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
    
    const playerImage = (arr,names,indexes,arrNum) =>{
        const newName=names[arrNum].slice(indexes[0],indexes[1])
        return arr[arrNum].slice(indexes[0],indexes[1]).map((img,i)=>{
            return  <Link to="/stats" onClick={() => subForm(newName,i)} key={i}><span className="player-name" title={newName[i]}>{newName[i]}</span><img className="player-img" key={i} src={`../assets/champion/${img}.png`} title={`${img}`} /></Link>
        })
    }
    console.log(playerName)
    
    
    const subForm=(arrIds,index)=>{
        
        fetch("http://localhost:3001/testapi",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
            sumId:arrIds[index],
            region:region
          })
          
        }).then(res=>res.json())
          .then(data=>dataHandler(data))
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
                        <div style={{display:"flex"}}>
                            <div style={{display:"flex", flexDirection:"column"}}>{playerImage(players,playerName,[0,5],0)}</div>
                            <div style={{alignSelf:"center" , margin:"0 20px"}}>VS</div>
                            <div style={{display:"flex", flexDirection:"column"}}>{playerImage(players,playerName,[5,10],0)}</div>
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