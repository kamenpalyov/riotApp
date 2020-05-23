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
    
    const gameStats=[]
    matches.forEach(game=>{
        gameStats.push(game.participants.filter(part=>{
            return part.participantId === partId[0]
        }))
    })
    const allPart= matches.map(part=>{
        return part.participants
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
    // const scrollTop= () => {
    //     window.scrollTo({
    //         top: 50,
    //         behavior: 'smooth'
    //       });
    // }

    const playerImage = (arr,names,arrNum) =>{
        const partStats= gameStats[arrNum][0]
        const partKIlls= allPart[arrNum].map(part=>{
            return part.stats.kills
        })
        const killSum= partKIlls.reduce((a,b)=>a + b, 0)
        const killPerc=parseInt((partStats.stats.kills / killSum) * 100)
        const newName=names[arrNum].slice(0,5)
        const newName2=names[arrNum].slice(5,10)
        return  (<div style={{display:"flex" ,flexDirection:"row",background:"gray",width:"550px"}}>
                    <div style={{alignSelf:"center"}}>
                        {partStats.stats.win ? <h4 style={{color:"green",fontWeight:"bold"}}>Victory</h4> : <h4 style={{color:"red",fontWeight:"bold"}}>Defeat</h4> }
                        <img className="player-img"  src={`../assets/champion/${playersChampName[0][partId[0]-1]}.png`}></img>
                        <p><span style={{color:"green"}}>{partStats.stats.kills}</span> / <span style={{color:"red"}}>{partStats.stats.deaths}</span> / <span style={{color:"cyan"}}>{partStats.stats.assists}</span></p>
                        <p title="Kills Participation">KP : {killPerc}%</p>
                    </div>
                    <div style={{display:"flex", flexWrap:"wrap",maxWidth:"160px",alignSelf:"center",justifyContent:"center"}}>
                        <img className="player-img"  src={`../assets/item/${partStats.stats.item0}.png`}></img>
                        <img className="player-img"  src={`../assets/item/${partStats.stats.item1}.png`}></img>
                        <img className="player-img"  src={`../assets/item/${partStats.stats.item2}.png`}></img>
                        <img className="player-img"  src={`../assets/item/${partStats.stats.item3}.png`}></img>
                        <img className="player-img"  src={`../assets/item/${partStats.stats.item4}.png`}></img>
                        <img className="player-img"  src={`../assets/item/${partStats.stats.item5}.png`}></img>
                        <img className="player-img"  src={`../assets/item/${partStats.stats.item6}.png`}></img>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        {arr[arrNum].slice(0,5).map((img,i)=>{
                            return  <Link to="/stats" className="scroll-top" onClick={() => subForm(newName,i)} key={i}><span className="player-name" title={newName[i]}>{newName[i]}</span><img className="player-img" alt="pic" key={i} src={`../assets/champion/${img}.png`} title={`${img}`} /></Link>
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
          .then(data=>{
              
              dataHandler(data)
              
          })
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
                            <div style={{display:"flex",flexWrap:"wrap",maxWidth:"1200px"}}>
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
                                <div style={{display:"flex",flexWrap:"wrap",maxWidth:"1200px"}}>
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
                                <div style={{display:"flex",flexWrap:"wrap",maxWidth:"1200px"}}>
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