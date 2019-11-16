import React, { PureComponent } from 'react'
import Microblog from "../Microblog"

class Microblogs extends React.Component{

    constructor(props){
        super(props);

        this.microblogs = props.microblogs;
        this.username = props.username;
    }

    createMicroblogs = (microblogsArray, username) =>{
        var microblogs = [];
        for (var i = 0; i < microblogsArray.length; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            var liked = false;
            if(microblogsArray[i].userLikes !== undefined && microblogsArray[i].userLikes.includes(username))
            {
              liked = true;
            }
            microblogs.push(<Microblog key={i} data={microblogsArray[i]} username={microblogsArray[i].user} id={microblogsArray[i].id} liked={liked} numLikes={microblogsArray[i].numLikes}/>);
        }
        return <div>{microblogs}</div>;
    }

    render() {
      if(this.props.microblogs != null){
        return(
          <div>
            {this.createMicroblogs(this.props.microblogs, this.username)}
          </div>
        )
      }
      else{
        return null;
      }
    }
}
export default Microblogs;