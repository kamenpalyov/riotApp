import React from 'react';


const Card =({rank,name,image,tier})=>{
    
    return(
        
        <div>
            <header style={{ background:"url(../assets/splash/Ahri_5.jpg) no-repeat top " , height:"300px"}}>
                <img src={`../assets/profileicon/${image}.png`} style={{borderRadius:"50%", border: "4px solid #DC9202 ", width: "100px"}}/>
                <h2>{name}</h2>
            </header>
            
            <h1>{rank}</h1>
            <img src={`../assets/emblems/Emblem_${tier}.png`} style={{width: "100px"}} />
            
        </div>
    )
}

export default Card ;