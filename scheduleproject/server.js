const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const Event = require('./models/Event');

const Team = require('./models/Team');

const League = require('./models/League');


require('./auth/passport');
const User = require('./models/User'); 
const authRoutes = require('./auth/auth');
const generateSalt = require('./auth/saltGenerator');


require('./db');

const app = express();
const PORT  = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: `${generateSalt()}`, 
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes); 


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated) {
      return next();
    }
  };
  
  const hasPermission = (requiredRole) => {
    return (req, res, next) => {
        
      if (req.body.role === requiredRole) {
        return next();
      }
      res.status(403).send('Forbidden');
    };
  };

app.get('/api/league', async (req,res) =>{
    try {
        const league = await Team.find({})
        let whatLeague = [];
        league.forEach(league => whatLeague.push(league.whatLeague));
        whatLeague = [...new Set(whatLeague)]
        res.json(whatLeague)
    } catch (error) {
        res.status(500).json({error: err.message});
    }
})


app.get('/api/league/:leaguename', async (req,res) =>{
    try {
        const teams = await Team.find({whatLeague: req.params['leaguename'].replace(/%20/g, "")})
        let teamNames = [];
        teams.forEach(team => teamNames.push(team.name))
        res.json(teamNames)
    } catch (error) {
        res.status(500).json({error: err.message});
    }
})

app.get('/api/allteams', async (req,res)=>{
    try{
        const teams = await Team.find({})
        let teamNames = []
        teams.forEach((val)=>{
            teamNames.push(val.name)
        })
        res.json(teamNames);
    }catch(err){

    }
})


app.post('/api/teams',isAuthenticated, hasPermission('admin'),  async (req,res)=>{
    try{

        const team = new Team(req.body)
        await team.save()
        res.json(team)
    }catch (err){
        res.status(500).json({error: err.message});
    }
})


app.get('/api/league/:teamname/events', async (req, res)=>{
    try{
    
        const events = await Event.find( {whatTeam: req.params['teamname']})
        console.log(req.params['teamname'])
        let eventsArr = []
        events.forEach(a =>{
            eventsArr.push({
                name: a.name, 
                description: a.description, 
                time: a.time,
                location: a.location,
                date: a.date,
                teams: a.teams,
                notes: a.notes
            })
        })
        res.json(eventsArr)
    } catch (err){
        res.status(500).json({error: err.message});
    }
})

app.get('/api/specificEvent/:team', async (req, res) =>{

    console.log(req.params['team'])
    const events = await Event.find({whatTeam: req.params['team']});
   
    let eventsArr = []
        events.forEach(a =>{
            eventsArr.push(a.name)
        })
        console.log(eventsArr)
    res.json(eventsArr)
})


app.post('/api/events', isAuthenticated, hasPermission('admin'), async (req, res) =>{
    try{     
        const event = new Event(req.body);
        await event.save();
        res.json(event)
    }catch (err){
        res.status(500).json({error: err.message});
    }
})

app.delete('/api/deleteLeague', isAuthenticated, hasPermission('admin'), async (req,res)=>{
    try {
        await Team.deleteMany({"whatLeague": req.body.whatLeague})
        res.status(200).json({ message: 'League deleted successfully' });
        
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.delete('/api/deleteTeam', isAuthenticated, hasPermission('admin'), async (req,res)=>{
    try {
        await Team.deleteOne({"name": req.body.whatTeam})
        res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.delete('/api/deleteEvent', isAuthenticated, hasPermission('admin'), async(req,res)=>{
    try {
        await Event.deleteOne({"name": req.body.whatEvent})
        res.status(200).json({ message: 'deleted' });
    } catch (error) {
        res.status(500).json({ message: 'err' });
    }
})
