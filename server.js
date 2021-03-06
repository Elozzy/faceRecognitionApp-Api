const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());


const db = {
    users: [
        {
            id: '123',
            name: 'john',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },

        {
            id: '124',
            name: 'sally',
            password: 'bananas',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login:[
        {
            id: '987',
            has:'',
            email: 'john@gmail.com',
        }
    ]
}

app.get('/', (req, res) => {
    res.send(db.users); 
});

// Signin Route
app.post('/signin', (req, res) => {

    if (req.body.email === db.users[0].email && 
        req.body.password === db.users[0].password){
        res.json(db.users[0]);
            
        }else{
            res.status(400).json('error logging in');
        }
    
});

// Register Route

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
 
    db.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    });
    res.json(db.users[db.users.length-1]);

});
 
//Getting the profile id
app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    db.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return  res.json(user);
        }
    })
    if(!found) {
        res.status(400).json('not found');
    }
});
 
//Image part
app.post('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    db.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++
            return  res.json(user.entries);
        }
    })
    if(!found) {
        res.status(400).json('not found');
    }
});


//bycrpt-nodejs


// // Load hash from your password DB.



//server-port
app.listen(3000, ()=> {
    console.log('app is running on port 3000'); 
});