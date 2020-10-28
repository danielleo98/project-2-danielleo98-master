/*
 * This files holds all the code to test you REST API
 */

//Run once broswer has loaded everything
window.onload = function () {



//button event for create
document.getElementById("create")
.addEventListener("click",function(e){
    console.log("create");
    //use search fields to store input
    let username = createform.querySelector('input[name="username"]').value;
    let name = createform.querySelector('input[name="name"]').value;
    let bio = createform.querySelector('input[name="bio"]').value;
    let date = new Date(); //generate date

    fetch('/users', { //post request on /users to create a new user
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ //pass JSON obj
                "username": username,
                "name": name,
                "bio": bio,
                "date": date.toDateString()
            })
    });
},false);

//button event for read - returns all users
document.getElementById("read")
.addEventListener("click",function(e){
    console.log("read");
    fetch('/users', { //get request on /users
        method: 'GET'
    })
    .then(response => response.json()
    .then(users => console.log(users))); //logs response in console
},false);

//button event for find - finds user by username
document.getElementById("find")
    .addEventListener("click",function(e){
        console.log("find");
        let username = findform.querySelector('input[name="username"]').value; //username search value from form
        fetch('/users/' + username, { //get request on /users/:username
            method: 'GET'
        })
         .then(response => response.json()
         .then(user => console.log(user))); //log user in console, backend generates 404 if not found
},false);

//button event for update - updates user based on username
document.getElementById("update")
.addEventListener("click",function(e){
    console.log("update");
    //use search fields to store input
    let username = updateform.querySelector('input[name="username"]').value;
    let name = updateform.querySelector('input[name="name"]').value;
    let bio = updateform.querySelector('input[name="bio"]').value;
    let date = new Date(); //generate current date
    fetch('/users/' + username, { //put request on /users/:username
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
                "username": username,
                "name": name,
                "bio": bio,
                "date": date.toDateString()
            })
    });
},false);

//button event for destroy - deletes user of specified username
document.getElementById("destroy")
.addEventListener("click",function(e){
    console.log("destroy");
    //uses search field to store username to delete
    let username = destroyform.querySelector('input[name="username"]').value;
    fetch('/users/' + username, { //delete request on /users/:username
        method: 'DELETE'});
},false);

//button event for search - finds users with search query in name or bio
    document.getElementById("search")
        .addEventListener("click",function(e){
            console.log("search");
            //uses search field to store query input
            let query = searchform.querySelector('input[name="search"]').value;
            fetch('/users?search=' + query, { //get request on /users with search as a query param
                method: 'GET'
            })
            .then(response => response.json())
                .then(users => {
                    if (users.length > 0) {
                        console.log(users) //logs users to console
                    } else {
                        console.log("No users found"); //if no users are found, logs to console
                    }
                });
        },false);
};