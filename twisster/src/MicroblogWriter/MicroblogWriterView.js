import React from "react";
import MicroblogBox from "../MicroblogBox";
import "./Landing.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import { green, blue, purple } from "@material-ui/core/colors";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";

import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";
import { width } from "@material-ui/system";

const styles = {
  multilineColor: {
    color: "red"
  },
  input: {
    color: "white",
    currentColor: "white"
  }
};

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: "#1F3648"
    }
  }
});

const MicroblogWriterView = props => {
  return (
    <NewTweetBox>
      <div className="inner-body" style={{ height: "80%" }}>
        <Image image={props.image} />
        <div className="body" style={{ flex: "0 0 456px" }}>
          <div className="inner-body">
            <Name name={props.name} id="name" />
            <Handle handle={props.handle} />
          </div>
          <ThemeProvider theme={theme}>
            <div className="body">
              {/* <textarea id="content" className="new-tweet" placeholder="Hello" /> */}

              <NewTweet
                id="content"
                placeholder="How are you feeling today?"
                rows="5"
                multiline
                margin="dense"
                variant="standard"
                color="primary"
              />
              <ListedTopics
                disableUnderline
                disabled
                id="showTopics"
                label="Added Topics"
                placeholder="Added Topics Show Up Here"
                onSubmit={props.addTopic}
                variant="standard"
              />

              {/* <textarea
              disabled
              id="showTopics"
              className="added-topic"
              placeholder="Topics Listed Here"
            /> */}
            </div>
          </ThemeProvider>
          <div className="body" style={{ minHeight: "48px" }}>
            <div className="inner-body">
              <AddTopics
                id="addTopics"
                style={{ width: "300px" }}
                placeholder="Add Topics Here"
                endAdornment={
                  <InputAdornment position="end">
                    <AddTopic aria-label="add" onClick={props.addTopic}>
                      <AddIcon />
                    </AddTopic>
                  </InputAdornment>
                }
              />
              <PostButton
                size="large"
                variant="extended"
                onClick={props.submitMicroblog}
                color="secondary"
              >
                Post
                <SendIcon style={{ margin: "0px 10px 0px" }} />
              </PostButton>

              {/* <button type="submit" onClick={props.addTopic}>
              Add New Topics
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </NewTweetBox>
  );
};
const ListedTopics = withStyles(theme => ({
  root: {
    // color: theme.palette.getContrastText(blue[500]),
    margin: "0px 12px 20px"
  },
  input: {
    "&::placeholder": {
      color: "gray"
    },
    color: "white"
  }
}))(Input);

const AddTopics = withStyles(theme => ({
  root: {
    // color: theme.palette.getContrastText(blue[500]),
    margin: "0px 12px 20px"
  },
  input: {
    color: "white"
  }
}))(Input);

const AddTopic = withStyles(theme => ({
  root: {
    backgroundColor: "transparent"
  }
}))(IconButton);

const PostButton = withStyles(theme => ({
  root: {
    backgroundColor: blue[800],
    top: "-20px",
    left: "2%"
  }
}))(Fab);

const NewTweet = withStyles(theme => ({
  root: {
    // color: theme.palette.getContrastText(blue[500]),
    margin: "14px 12px 4px"
  },
  "&::placeholder": {
    fontStyle: "italic"
  },
  multiline: {
    input: {
      color: "white"
    }
  }
}))(TextField);

const NewTweetBox = props => {
  return <div className="new-tweet-body">{props.children}</div>;
};

const Image = image => {
  return <img src={image} id="img3" alt="Logo" className="picture"></img>;
};

const Handle = props => {
  return <div className="handle">{props.handle}</div>;
};

const Name = props => {
  return <div className="name">{props.name}</div>;
};
export { MicroblogWriterView };
