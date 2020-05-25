import React from 'react'
import header from "./Header.module.css"


export default function HeaderStats( { lvl, name, image, champBg, rankedSolo }) {

    
    
    return (
        <div className={header.background} style={{background:`url("../assets/splash/${champBg}_0.jpg")`}}>
            <div className={header.image__name}>
                <div>
                      <img className={header.icon}alt="pic" src={`../assets/profileicon/${image}.png`} />
                      <h2>{name}</h2>
                      <p>level:{lvl}</p>
                </div>
            </div>
        </div>    
    )
}
