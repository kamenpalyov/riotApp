const express = require("express");
const router = express.Router();
const axios = require("axios")
require("dotenv").config();
const api_key=process.env.API_KEY
const baseUrl = ".api.riotgames.com/lol/"


router.post("/", async function(req, res, next) {
    const { region, sumId} = req.body
    const riotRequest= await axios.get(`https://${region}${baseUrl}summoner/v4/summoners/by-name/${sumId}?api_key=${api_key}`)
    const {id, profileIconId,summonerLevel,accountId }=await riotRequest.data
    const stats= await axios.get(`https://${region}${baseUrl}league/v4/entries/by-summoner/${id}?api_key=${api_key}`)
    const summonerStats= await stats.data
    const matchHistory= await axios.get(`https://${region}${baseUrl}match/v4/matchlists/by-account/${accountId}?api_key=${api_key}`)
    const matchStats = await matchHistory.data
    
    const top3 = matchStats.matches.slice(0,3)
    const gameId = top3.map(id=>{
        return id.gameId
    })

    async function games(newId){
            
        const fetchGames= await axios.get(`https://${region}${baseUrl}match/v4/matches/${newId}?api_key=${api_key}`)
        const gameResp = await fetchGames.data
        return gameResp
    }

    const lastGames= gameId.map(async newId=>{
        console.log(newId)

        const result = await games(newId);
        console.log(result)
        
        return result;
    
        // return await games(newId)
    })
    console.log(lastGames)
    
    res.json(
        {
            summonerLevel:summonerLevel,
            profileIconId:profileIconId,
            stats:summonerStats,
            matchStats:matchStats
        }
    )

});

module.exports = router;

