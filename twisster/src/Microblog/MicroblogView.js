import React from "react";
import MicroblogBox from "../MicroblogBox";
import "./Landing.css";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import { func } from "prop-types";

const StyledBadge1 = withStyles(theme => ({
  badge: {
    right: -3,
    border: `0px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);

const Image = ({ image, theid }) => {
  console.log(theid);

  return <img id={theid} alt="Logo" className="picture"></img>;
};

const Handle = props => {
  return <div className="handle">{props.handle}</div>;
};

const Name = props => {
  return <div className="name">{props.name}</div>;
};

const Tweet = props => {
  return <div className="tweet">{props.tweet}</div>;
};

const Topics = props => {
  return <div className="topics">{props.topics}</div>;
};
const ListedTopics = withStyles(theme => ({
  root: {
    // color: theme.palette.getContrastText(blue[500]),
    margin: "0px 12px 20px"
  },
  input: {
    color: "white"
  }
}))(Input);

function GetIcon(isLiked) {
  if (isLiked) {
    return <FavoriteIcon color="secondary" fontSize="large" />;
  } else {
    return <FavoriteBorderIcon color="secondary" fontSize="large" />;
  }
}

const MicroblogView = props => {
  return (
    <MicroblogBox>
      <div className="inner-body" style={{ height: "100%" }}>
        <Image image={props.image} theid={props.unitid} />
        <div className="body" style={{ width: "80%" }}>
          <div className="inner-body" style={{ height: "60px" }}>
            <Name name={props.name} />
            <Handle handle={props.handle} />
          </div>
          <div className="body">
            <Tweet tweet={props.tweet} />
            <div className="inner-body">
              <Topics topics={props.topics} />
              <IconButton aria-label="cart" onClick={props.likeButtonClicked}>
                <StyledBadge1 badgeContent={props.numLikes} color="primary">
                  {GetIcon(props.likeButtonText)}
                </StyledBadge1>
              </IconButton>
              {/* <div class="likes">
                <button class="like-button" onClick={props.likeButtonClicked}>
                  {props.likeButtonText}
                </button>
                <label class="num-likes">{}</label>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </MicroblogBox>
  );
};

export { MicroblogView };
