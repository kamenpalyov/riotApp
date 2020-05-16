import React from 'react';
import "./Card.css"
import {Link} from "react-router-dom"

const Card =({rank,rankFlex,name,image,tier,tierFlex,lvl,wins,winsFlex,losses,lossesFlex,points,pointsFlex,matches,champions,region,dataHandler})=>{
    const champIds= matches.map(game=>{
        return game.participants.map(ids=>{
            return ids.championId
        })
    })
    const summonerName= matches.map(part=>{
        return part.participantIdentities.map(name=>{
            return name.player.summonerName
        })
    })
    
    const partId=[] 
    matches.forEach(game=>{
        game.participantIdentities.forEach(part=>{
            if(part.player.summonerName === name){
                return partId.push(part.participantId)
            }
        })
    })
    
    
    
    // const playerId= matches.map(part=>{
    //     return part.participantIdentities.map(name=>{
    //         return name.player.accountId
    //     })
    // })
    
    const playersChampName = champIds.map(game=>{
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
    const playerImage = (arr,names,arrNum) =>{
        const newName=names[arrNum].slice(0,5)
        const newName2=names[arrNum].slice(5,10)
        return  (<div style={{display:"flex" ,flexDirection:"row"}}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        {arr[arrNum].slice(0,5).map((img,i)=>{
                            return  <Link to="/stats" onClick={() => subForm(newName,i)} key={i}><span className="player-name" title={newName[i]}>{newName[i]}</span><img className="player-img" alt="pic" key={i} src={`../assets/champion/${img}.png`} title={`${img}`} /></Link>
                        })}
                    </div>
                    <div style={{alignSelf:"center" , margin:"0 20px"}}>VS</div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        {arr[arrNum].slice(5,10).map((img,i)=>{
                            return  <Link to="/stats" onClick={() => subForm(newName2,i)} key={i}><span className="player-name" title={newName2[i]}>{newName2[i]}</span><img className="player-img" alt="pic" key={i} src={`../assets/champion/${img}.png`} title={`${img}`} /></Link>
                        })}
                    </div>
                </div>
                
                )
            
    }
    
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

    return rankFlex&&rank?
        (
            
            <div>
                
                <div>
                    <header className="center">
                        <div className="background" style={{background:`url("../assets/splash/${playersChampName[0][partId[0]-1]}_0.jpg")`}}>
                            <div className="image-name">
                                <img className="icon" alt="pic" src={`../assets/profileicon/${image}.png`} style={{borderRadius:"50%", border: "4px solid #DC9202 ", width: "100px"}}/>
                                <h2>{name}</h2>
                                <p>level:{lvl}</p>
                            </div>
                        </div>
                        <div className="card">
                            
                            <div>
                                <h3>Ranked Solo 5v5</h3>
                                <img className="emblem" alt="pic" src={`../assets/emblems/Emblem_${tier}.png`}  />
                                <h3>Rank: {tier}-{rank}</h3>
                                <p>Wins/Losses: {wins}/{losses}</p>
                                <p>League Points: {points}</p>
                            </div>
                            <div>
                                <h3>Ranked Solo 5v5</h3>
                                <img className="emblem" src={`../assets/emblems/Emblem_${tierFlex}.png`}  />
                                <h3>Rank: {tierFlex}-{rankFlex}</h3>
                                <p>Wins/Losses: {winsFlex}/{lossesFlex}</p>
                                <p>League Points: {pointsFlex}</p>
                            </div>

                        </div>
                        <div className="mh-container">
                            <div style={{display:"flex"}}>
                                {playerImage(playersChampName,summonerName,0)}
                            </div>
                        </div>
                        
                    </header>
                    
                </div>
            </div>
        ):
        (rank?
            (
            
                <div>
                    
                    <div>
                        <header className="center">
                            <div className="background" style={{background:`url("../assets/splash/${playersChampName[0][partId[0]-1]}_0.jpg")`}}>
                                <div className="image-name">
                                    <img className="icon" alt="pic" src={`../assets/profileicon/${image}.png`} style={{borderRadius:"50%", border: "4px solid #DC9202 ", width: "100px"}}/>
                                    <h2>{name}</h2>
                                    <p>level:{lvl}</p>
                                </div>
                            </div>
                            <div className="card">
                                
                                <div>
                                    <h3>Ranked Solo 5v5</h3>
                                    <img className="emblem" alt="pic" src={`../assets/emblems/Emblem_${tier}.png`}  />
                                    <h3>Rank: {tier}-{rank}</h3>
                                    <p>Wins/Losses: {wins}/{losses}</p>
                                    <p>League Points: {points}</p>
                                </div>
                                {/* <div>
                                    <h3>Ranked Solo 5v5</h3>
                                    <img className="emblem" src={`../assets/emblems/Emblem_${tierFlex}.png`}  />
                                    <h3>Rank: {tierFlex}-{rankFlex}</h3>
                                    <p>Wins/Losses: {winsFlex}/{lossesFlex}</p>
                                    <p>League Points: {pointsFlex}</p>
                                </div> */}

                            </div>
                            <div className="mh-container">
                                <div style={{display:"flex"}}>
                                    {playerImage(playersChampName,summonerName,0)}
                                </div>
                            </div>
                            
                        </header>
                        
                    </div>
                </div>
            ):
            (
                
                <div>
                    
                    <div>
                        <header className="center">
                            <div className="background" style={{background:`url("../assets/splash/${playersChampName[0][partId[0]-1]}_0.jpg")`}}>
                                <div className="image-name">
                                    <img className="icon" alt="pic" src={`../assets/profileicon/${image}.png`} style={{borderRadius:"50%", border: "4px solid #DC9202 ", width: "100px"}}/>
                                    <h2>{name}</h2>
                                    <p>level:{lvl}</p>
                                </div>
                            </div>
                            <div className="card">
                                
                                {/* <div>
                                    <h3>Ranked Solo 5v5</h3>
                                    <img className="emblem" alt="pic" src={`../assets/emblems/Emblem_${tier}.png`}  />
                                    <h3>Rank: {tier}-{rank}</h3>
                                    <p>Wins/Losses: {wins}/{losses}</p>
                                    <p>League Points: {points}</p>
                                </div> */}
                                <div>
                                    <h3>Ranked Solo 5v5</h3>
                                    <img className="emblem" src={`../assets/emblems/Emblem_${tierFlex}.png`}  />
                                    <h3>Rank: {tierFlex}-{rankFlex}</h3>
                                    <p>Wins/Losses: {winsFlex}/{lossesFlex}</p>
                                    <p>League Points: {pointsFlex}</p>
                                </div>

                            </div>
                            <div className="mh-container">
                                <div style={{display:"flex"}}>
                                    {playerImage(playersChampName,summonerName,0)}
                                </div>
                            </div>
                            
                        </header>
                        
                    </div>
                </div>
            )
        )

}

export default Card ;