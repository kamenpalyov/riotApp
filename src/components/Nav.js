import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './Nav.css'

export default class Nav extends Component {
    constructor(props){
        super(props);

    }

    toggleClass=() => {
        const menu = document.querySelector(".mainMenu");
        
        const burger = document.querySelectorAll("h1")
        const ham = document.querySelector(".hamIcon")
        menu.classList.toggle("toggleCls")
        if(burger[0].style.animationName === "hamAnim1" && burger[2].style.animationName ==="hamAnim2"){
           burger[0].style.animationName="hamAnim12"
           burger[2].style.animationName="hamAnim32"
           burger[1].style.animationName="hamAnim22"
           ham.style.background="#e84418"
           ham.style.borderRadius="0"
           menu.style.left="-432px"
        //    menu.style.transform="translateX(-500px)"
           
           
        }else{
          burger[0].style.animationName="hamAnim1"
          burger[2].style.animationName="hamAnim2"
          burger[1].style.animationName="hamAnim3"
          ham.style.background="black"
          ham.style.borderRadius="30px"
          menu.style.left="0px"
        //   menu.style.transform="translateX(0px)"
        }
        
      }


    componentDidMount(){
        const menu = document.querySelector(".mainMenu");
        const burger = document.querySelectorAll("h1")
        const ham = document.querySelector(".hamIcon")

    }


    render() {
        return (
            <nav>
                <div className="hamIcon" onClick={()=>this.toggleClass()}>
                    <div>
                        <h1></h1>
                        <h1></h1>
                        <h1></h1>
                    </div>
                </div>

                <div className="mainMenu">
                    <NavLink activeClassName="active" exact className="link"to="/">Home</NavLink>
                    <NavLink activeClassName="active" exact className="link"to="/stats" >Stats</NavLink>
                </div>
                
                
            </nav>
        )
    }
}
