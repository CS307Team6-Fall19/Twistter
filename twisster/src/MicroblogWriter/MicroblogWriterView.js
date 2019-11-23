import React from "react";
import MicroblogBox from '../MicroblogBox'
import './Landing.css'

const MicroblogWriterView = (props) => {
    return(
      <NewTweetBox>
        <div className="inner-body">
          <Image image={props.image}/>
          <div className="body">
            <div className="inner-body">
              <Name 
              name={props.name}
              id='name'
              />
              <Handle handle={props.handle}/>
            </div>
            <div >
              <textarea id='content' className='new-tweet' placeholder="Hello"/>
              <textarea disabled id='showTopics' className='new-topic' placeholder="Topics Listed Here"/>
              <textarea id='addTopics' className='new-topic' placeholder="Add Topics Here"/>
              <button type="submit" onClick={props.submitMicroblog}>Post</button>
              <button type="submit" onClick={props.addTopic}>Add New Topics</button>
            </div> 
          </div>
        </div>
      </NewTweetBox>
    )
} 

  

  const NewTweetBox = (props) => {
    return(
      <div className='new-tweet-body'>
      {props.children}
      </div>
    )
  }

  const Image = (image) => {
    return(
      <img id = "img3" alt="Logo" height="50" width="100">
      </img>
    )
  }
  
  const Handle = (props) => {
    return(
      <div className="handle">
        {props.handle}
      </div>
    )
  }
  
  const Name = (props) => {
    return(
      <div className="name">
        {props.name}
      </div>
    )
  }
  export {MicroblogWriterView};