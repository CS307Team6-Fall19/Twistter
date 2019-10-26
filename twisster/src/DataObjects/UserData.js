class UserData{  

    constructor(username, loggedIn){
        this.username = username;
        this.loggedIn = loggedIn;
        
    }

    getUsername(){
        return this.username;
    }

    getUid(){
        return this.uid;
    }
}
export default UserData;