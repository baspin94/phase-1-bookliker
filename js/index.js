document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/books")
        .then(response => response.json())
        .then(bookData => bookData.forEach(book => listTitle(book)))
});

const listPanel = document.querySelector("#list-panel");
const showPanel = document.querySelector("#show-panel");
const userObject = {"id": 1, "username": "pouros"};
const usersHeading = document.createElement("h4");
usersHeading.textContent = "Users Who Like This Book:";
const userList = document.createElement("p");

function listTitle(book){
    const listTitle = document.createElement("li");
    listTitle.textContent = book["title"];
    listPanel.append(listTitle);
    listTitle.addEventListener("click", function(){
        clearUsers();
        return showDetails(book);
    });
    };

function showDetails(book){
    while (showPanel.firstChild) {
        showPanel.removeChild(showPanel.firstChild);
    };
    createThumbnail(book);
    detailTitle(book);
    createSubtitle(book);
    createAuthor(book);
    createDescription(book);
    appendUserSection();
    renderUsers(book);
    addLikeBtn(book);
}

function createThumbnail(book){
    const thumbnail = document.createElement("img");
    thumbnail.src = book["img_url"];
    thumbnail.alt = book["title"];
    showPanel.append(thumbnail);
}

function detailTitle(object){
    const showTitle = document.createElement("h1");
    showTitle.textContent = object["title"];
    showPanel.append(showTitle);
}

function createSubtitle(object){
    const subtitle = document.createElement("h2");
    subtitle.textContent = object["subtitle"];
    showPanel.append(subtitle);
}

function createAuthor(object){
    const author = document.createElement("h3");
    author.textContent = object["author"];
    showPanel.append(author);
}

function createDescription(object){
    const description = document.createElement("p");
    description.textContent = object["description"];
    showPanel.append(description);
}

function appendUserSection(){
    showPanel.append(usersHeading);
    showPanel.append(userList);
}

function renderUsers(object){
    const userArray = object["users"];
    userArray.forEach(user => listUser(user));
}

function listUser(object){
    const otherUser = document.createElement("li");
    otherUser.textContent = object["username"];
    userList.append(otherUser);
}

function addLikeBtn(object){
    const likeBtn = document.createElement("button");
    likeBtn.textContent = "Like 👍";
    likeBtn.id = object["id"];
    showPanel.append(likeBtn);
    likeBtn.addEventListener("click", () => {
        if (likeBtn.textContent === "Like 👍") {
            addUser(object);
            fetch(`http://localhost:3000/books/${likeBtn.id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    users: object["users"]
                })
            })
            .then(response => response.json())
            .then(userData => {
                clearUsers();
                renderUsers(userData)})
            .then(likeBtn.textContent = "Unlike 👎");
        }
    })
}

function addUser(object) {
    object.users.push(userObject)
    return object;
}

function clearUsers(){
    while (userList.firstChild) {
        userList.removeChild(userList.firstChild);
    };
}