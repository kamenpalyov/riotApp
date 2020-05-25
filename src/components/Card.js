import React from 'react';
import "./Card.css"
import {Link} from "react-router-dom"
import HeaderStats from "./HeaderStats"
import Tabs from "./Tabs"

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
        const partStats= gameStats[arrNum][0]
        const partKIlls= allPart[arrNum].map(part=>{
            return part.stats.kills
        })
        const killSum= partKIlls.reduce((a,b)=>a + b, 0)
        const killPerc=parseInt((partStats.stats.kills / killSum) * 100)
        const newName=names[arrNum].slice(0,5)
        const newName2=names[arrNum].slice(5,10)
        return  (<div className="mh-wrapper">
                    <div className="mh-player-items-wrapper">
                        <div className="mh-player">
                            <div>
                                {partStats.stats.win ? <h4 style={{color:"green",fontWeight:"bold"}}>Victory</h4> : <h4 style={{color:"red",fontWeight:"bold"}}>Defeat</h4> }
                                <img className="player-img"  src={`../assets/champion/${playersChampName[0][partId[0]-1]}.png`} alt=""></img>
                            </div>
                            <div>
                                <p><span style={{color:"green"}}>{partStats.stats.kills}</span> / <span style={{color:"red"}}>{partStats.stats.deaths}</span> / <span style={{color:"cyan"}}>{partStats.stats.assists}</span></p>
                                <p title="Kills Participation">KP : {killPerc}%</p>
                            </div>
                            
                        </div>
                        <div className="mh-items">
                            <img  className="player-img"  src={`../assets/item/${partStats.stats.item0}.png`} alt=""></img>
                            <img  className="player-img"  src={`../assets/item/${partStats.stats.item1}.png`} alt=""></img>
                            <img  className="player-img"  src={`../assets/item/${partStats.stats.item2}.png`} alt=""></img>
                            <img  className="player-img"  src={`../assets/item/${partStats.stats.item3}.png`} alt=""></img>
                            <img  className="player-img"  src={`../assets/item/${partStats.stats.item4}.png`} alt=""></img>
                            <img  className="player-img"  src={`../assets/item/${partStats.stats.item5}.png`} alt=""></img>
                            <img  className="player-img"  src={`../assets/item/${partStats.stats.item6}.png`} alt=""></img>
                        </div>
                    </div>
                    
                    <div className="mh-teams">
                        {arr[arrNum].slice(0,5).map((img,i)=>{
                            return  <Link to="/stats" className="scroll-top" onClick={() => subForm(newName,i)} key={i}><span className="player-name" title={newName[i]}>{newName[i]}</span><img className="player-img" alt="pic" key={i} src={`../assets/champion/${img}.png`} title={`${img}`} /></Link>
                        })}
                    </div>
                    <div style={{alignSelf:"center" , margin:"0 20px"}}>VS</div>
                    <div className="mh-teams">
                        {arr[arrNum].slice(5,10).map((img,i)=>{
                            return  <Link to="/stats" onClick={() => subForm(newName2,i)} key={i}><img className="player-img" alt="pic" key={i} src={`../assets/champion/${img}.png`} title={`${img}`} /><span className="player-name" title={newName2[i]}>{newName2[i]}</span></Link>
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
    
    
    const rankedSolo= () =>{
        return(
            <div>
                <h3>Ranked Solo 5v5</h3>
                <img className="emblem" alt="pic" src={`../assets/emblems/Emblem_${tier}.png`}  />
                <h3>Rank: {tier}-{rank}</h3>
                <p>Wins/Losses: {wins}/{losses}</p>
                <p>League Points: {points}</p>
            </div>
        )
    }

    const rankedFlex = () => {
        return(
            <div>
                <h3>Ranked Flex 5v5</h3>
                <img className="emblem" src={`../assets/emblems/Emblem_${tierFlex}.png`} alt="" />
                <h3>Rank: {tierFlex}-{rankFlex}</h3>
                <p>Wins/Losses: {winsFlex}/{lossesFlex}</p>
                <p>League Points: {pointsFlex}</p>
            </div>
        )
    }
    

   
    
    return rankFlex&&rank?
        (
            
            <div>
                
                <div>
                    <header className="center">
                        
                        <HeaderStats image={image} lvl={lvl} name={name} champBg={playersChampName[0][partId[0]-1]} />
                        <Tabs partId={partId} allPart={allPart} gameStats={gameStats} playerImage={playerImage} playersChampName={playersChampName} summonerName={summonerName} rankedSolo={rankedSolo} rankedFlex={rankedFlex}/>
                        
                        
                        
                    </header>
                    
                </div>
            </div>
        ):
        (rank?
            (
            
                <div>
                    
                    <div>
                        <header className="center">

                            <HeaderStats image={image} lvl={lvl} name={name} champBg={playersChampName[0][partId[0]-1]} rankedSolo={rankedSolo} />

                            <Tabs partId={partId} allPart={allPart} gameStats={gameStats} playerImage={playerImage} playersChampName={playersChampName} summonerName={summonerName} rankedSolo={rankedSolo} />

                        </header>
                        
                    </div>
                </div>
            ):
            (
                
                <div>
                    
                    <div>
                        <header className="center">
                            
                            <HeaderStats image={image} lvl={lvl} name={name} champBg={playersChampName[0][partId[0]-1]} />
                            
                            <Tabs  partId={partId} allPart={allPart} gameStats={gameStats} playerImage={playerImage} playersChampName={playersChampName} summonerName={summonerName}  rankedFlex={rankedFlex}/>

                        </header>
                        
                    </div>
                </div>
            )
        )
        

}

export default Card ;