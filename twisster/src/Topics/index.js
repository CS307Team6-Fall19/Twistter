import React, { PureComponent } from 'react'
import Topic from "../Topic"
import TopicsBox from "./TopicsBox.js"

class Topics extends React.Component{

    constructor(props){
        super(props);

        this.topics = props.topics;

        this.num = 0;
        //this.username = props.username;
    }

    createTopics = (topicsArray) => {
        var topics = [];
        var highlight;
        for (var i = 0; i < topicsArray.length; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            this.num++;
            topics.push(<Topic key={i} data={topicsArray[i]} highlight={this.num % 2} />);
        }
        return <div>{topics}</div>;
    }

    render() {
      if(this.props.topics != null){
        return(
          <div>
              <TopicsBox>
                {this.createTopics(this.props.topics)}
              </TopicsBox>    
          </div>
        )
      }
      else{
        return null;
      }
    }
}
export default Topics;