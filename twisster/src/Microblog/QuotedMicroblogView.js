import React from "react";
import MicroblogBox from '../MicroblogBox'
import './Landing.css'


const Image = (image) => {
  return(
    <img src={image} alt="Logo" className="picture">
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

const Tweet = (props) => {
  return(
    <div className="tweet">
      {props.tweet}
    </div>
  )
}

const Topics = (props) => {
  return(
    <div className="topics">
      {props.topics}
    </div>
  )
}



const MicroblogView = (props) => {
  return(
    <MicroblogBox>
      <div className="inner-body">
        <Image image={props.image}/>
        <div className="body">
          <div className="inner-body">
            <Name name={props.name}/>
            <Handle handle={props.handle}/>
          </div>
          <Tweet tweet={props.tweet}/>

          <div class="likes">
            <button class="like-button" onClick={props.likeButtonClicked}>{props.likeButtonText}</button>
            <label class="num-likes">{props.numLikes}</label>
          </div>

          <div class="quote">
            <button class="quote-button" onClick={props.quoteButtonClicked}>{props.quoteButtonText}</button>
          </div>


          <Topics topics={props.topics}/>
        </div>
      </div>
    </MicroblogBox>
  )
}


export {MicroblogView};