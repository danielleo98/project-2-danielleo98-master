const express = require('express');
const router = express.Router();

const users = [];
var currDate = new Date();
users.push({username: "smitty", name: "John Smith", bio: "Student at Lehigh", date: currDate.toDateString()});
users.push({username: "abc123", name: "John Weiss", bio: "Student at Laf", date: currDate.toDateString()});
console.log(users);

/*
* GET - users
* Return a JSON listing of all users in memory.
* GET - /users?search=[search_Query]
* Return a JSON listing of all users that have [search_Query] in their name or bio.
*/
router.get('/', function(req, res, next) {
    if (req.query.search) { //check for search query
        var query = req.query.search.toLowerCase();
        console.log("Search query: " + query);
        var searchedUsers = [];
        for (var i = 0; i < users.length; i++) { //iterate through current array of users
            let name = users[i].name;
            let bio = users[i].bio;
            //check if name or bio includes search values
            if (name.toLowerCase().includes(query) || bio.toLowerCase().includes(query)) {
                searchedUsers.push({username: users[i].username, name: name,
                    bio: bio, date: users[i].date});
            }
        }
        res.send(searchedUsers); //return JSON list of users that were found
    } else { //if no search query, just return JSON list of all users in memory
        console.log(users);
        res.send(users);
    }
});

/** POST - users
 *  This should accept a JSON body and create a new user element in the users collection.
 *  Should return 404 is any JSON body does not follow this schema.
 */
router.post('/', function(req, res, next) {
    if (req.body.username === undefined || req.body.name === undefined
        || req.body.bio === undefined || req.body.date === undefined) { //check schema of user
        res.status(404).send("User not properly defined. Must include username, name, and bio.");
        return;
    }
    for (var i = 0; i < users.length; i++) { //iterate through entire array of users
        if (users[i].username === req.body.username) { //check for duplicate username
            res.status(404).send("Username must be unique. Username '" + req.body.username + "' already exists.");
            return;
        }
    }
    users.push({username: req.body.username, name: req.body.name, bio: req.body.bio, date: req.body.date}); //push new user
    res.status(201).send(); //201 --> created
});

/** GET - username
 * This should return in JSON the contents on this user.
 * If no such user exists, it should return a 404.
 */
router.get('/:username', function(req, res, next) {
    var username = req.params.username; // username from url parameter
    var user = null;
    for (var i = 0; i < users.length; i++) { //iterate through users
        if (users[i].username === username) { //check for username match (username is unique)
            user = users[i]; //store user
            break; //break out of for loop
        }
    }
    if (user != null) {
        res.send(user);
    } else {
        res.status(404).send("User with username '" + username + "' does not exist.");
    }
});

/** PUT - username
 * This should accept a JSON body and update the user identified by [username].
 * If this user does not exist, it should create it
 * Should return 404 is any JSON body does not follow this schema
 *
 */
router.put('/:username', function(req, res, next) {
    var username = req.params.username; //username from url parameter
    if (req.body.username === undefined || req.body.name === undefined
        || req.body.bio === undefined || req.body.date === undefined) { //check schema
        res.status(404).send("User not properly defined. Must include username, name, and bio.");
        return;
    }
    var userIndex = -1;
    for (var i = 0; i < users.length; i++) { //go through array of users
        if (users[i].username === username) { //check to see if a user with given username exists
            userIndex = i; //store index of existing user
            break;
        }
    }
    if (userIndex === -1) { //if username was not found, it doesn't exist
        users.push({username: req.body.username, name: req.body.name, bio: req.body.bio, date: req.body.date}); //create user
        res.status(201).send();
    } else { //update existing user with given username
        users[userIndex].name = req.body.name;
        users[userIndex].bio = req.body.bio;
        users[userIndex].date = req.body.date;
        res.status(200).send();
    }
});

/** DELETE - username
 *
 */
router.delete('/:username', function(req, res, next) {
    var username = req.params.username;
    var userIndex = -1;
    for (var i = 0; i < users.length; i++) { //go through array of users
        if (users[i].username === username) { //check to see if a user with given username exists
            userIndex = i; //store index of existing user
            break;
        }
    }
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(200).send();
    } else {
        res.status(404).send("User with username '" + username + "' does not exist.");
    }
});


module.exports = router;
