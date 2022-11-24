const insertUserName = (username) => {
    const user = {
        username: username
    }
    return document.querySelector('#tableProducts').innerHTML = user.username
}