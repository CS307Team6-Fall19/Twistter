class UserData{  

    constructor(username, loggedIn){
        this.email = username;
        this.loggedIn = loggedIn;
        
    }

    getEmail(){
        return this.email;
    }

    getUid(){
        return this.uid;
    }
}
export default UserData;