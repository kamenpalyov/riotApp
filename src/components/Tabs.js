import React, { Component } from 'react'
import "./Tabs.css"
export default class Tabs extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    tabsFunction=() =>{
        const tabButtons = document.querySelectorAll(".tabBtn");
        const tabPanels  = document.querySelectorAll(".tabPanel");

        tabPanels.forEach(panel => {
            panel.style.display="none"
        })
        tabPanels[0].style.display="block";
        tabButtons[0].classList.add("is-active")
        
    }
    showPanel = (panelIndex) => {
        
        const tabButtons = document.querySelectorAll(".tabBtn");
        const tabPanels  = document.querySelectorAll(".tabPanel");
        tabButtons.forEach(btn => {
            
            btn.classList.remove("is-active")
        })
        tabButtons[panelIndex].classList.add("is-active")
        tabPanels.forEach(panel => {
            panel.style.display="none"
        })
        tabPanels[panelIndex].style.display="block";
    }
    

    componentDidMount(){
        this.tabsFunction()
    
    }
    
    render() {
        const { partId, allPart, gameStats , rankedFlex, rankedSolo, playerImage, playersChampName, summonerName}=this.props
        
        return (
            <div className="tabContainer">
                <div className="buttonContainer">
                    <button className="tabBtn" onClick={() =>this.showPanel(0)}>Overview</button>
                    <button className="tabBtn" onClick={() =>this.showPanel(1)}>Solo</button>
                    <button className="tabBtn" onClick={() =>this.showPanel(2)}>Tab3</button>
                    <button className="tabBtn" onClick={() =>this.showPanel(3)}>Tab4</button>
                </div>
                <div className="tabPanel">
                    <div className="card-rank">
                        {rankedSolo && rankedFlex ? [rankedFlex(), rankedSolo()] :(rankedSolo? rankedSolo():rankedFlex())}
                    </div>
                </div>
                <div className="tabPanel">
                    <div className="mh-container">
                        
                        {playerImage(playersChampName,summonerName,0)}
                        
                    </div>
                </div>
                <div className="tabPanel">Tab 3</div>
                <div className="tabPanel">Tab 4</div>
            </div>
        )
    }

}
