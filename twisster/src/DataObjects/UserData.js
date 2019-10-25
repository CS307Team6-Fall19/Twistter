class UserData{  

    constructor(username, loggedIn, viewingOwnProfile){
        this.username = username;
        this.viewingOwnProfile = viewingOwnProfile;
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