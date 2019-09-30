import React from 'react';

const TweetBox = (props) => {
  return(
    <div className="tweet-body">
      {props.children}
    </div>
  )
}

const NewTweetBox = (props) => {
  return(
    <div className='new-tweet-body'>
    {props.children}
    </div>
  )
}

const Image = (props) => {
  return(
    <img src={props.image} alt="Logo" className="picture">
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

const TweetBody = (props) => {
  return(
    <TweetBox>
      <div className="inner-body">
        <Image image={props.image}/>
        <div className="body">
          <div className="inner-body">
            <Name name={props.name}/>
            <Handle handle={props.handle}/>
          </div>
          <Tweet tweet={props.tweet}/>
        </div>
      </div>
    </TweetBox>
  )
}

/* New tweet feature */
// Changed tweet={...} to
// newTweet
// 
const NewTweet = (props) => {
  return(
    <form>
     <new-tweet> some text  </new-tweet>
    </form>
  )
}

const NewTweetBody = (props) => {
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
            <button className = 'post-button' type="submit" onClick={props.onClick}>Post</button>
          </div> 
        </div>
      </div>
    </NewTweetBox>
  )
}

const TopBarTwisster = (props) => {
  return (
    <div className="inner-body">
      <label className="top-bar-twisster" >Twistter</label>
      <input className="top-bar-search" placeholder="Search"/>
      <button name="search" onClick={props.onClickSearch}>Search</button>
      <button className="top-bar-button" type="button" onClick={props.onClickProfile}>Go to your profile</button>    
    </div>
  )
}

const TopBar = ({onClick}) => {
  return(
    <div className="top-bar">
        <TopBarTwisster onClickProfile={onClick} />
    </div>
  )
}
//export { EssayForm }
export { TopBar }
export { NewTweetBody }
export { TweetBody }