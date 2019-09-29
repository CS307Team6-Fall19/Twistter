import TopBarTwisster from './TopBarView'
import React, { PureComponent } from 'react'

class TopBar extends React.Component{

    constructor(props) {
  
      super(props);
    }

    render(){
        return(
            <div className="top-bar">
                <TopBarTwisster /* onClickProfile={onClick} */ />
            </div>
          )
    }
}
export default TopBar;