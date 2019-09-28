// import React from 'react'
// import { NewTweetBox } from './DataObjects/Microblog.js'
// import { NewTweet } from './DataObjects/Microblog.js'
// import './Landing.css'

// class EssayForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 'Please write an essay about your favorite DOM element.'
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('An essay was submitted: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <NewTweetBox>
//       <div className="inner-body">
//         <Image image={props.image}/>
//       </div>
//       </NewTweetBox>
//     );
//   }
// }

// export { EssayForm }