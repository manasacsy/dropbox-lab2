import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import SideBar from "./SideBar";
import Content from "./Content";
import TopMenu from "./TopMenu";
import HomeContent from "./HomeContent";
import FileContent from "./FileContent";
import Group from "./Group";
import UserInfo from "./UserInfo";

class HomePage extends Component {
    state = {
        changeContent : 'homecontent'
    };

    componentWillMount(){
        this.props.history.push("/home");
        
    }
    render(){
        var sideMenuBar;
        sideMenuBar = <div className="pos-fixed  text-align-left">
            <ul className="list-style-none padding-top-20">
            <li><img className="height" src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" alt=""/>
            </li>
            
            <li className="padding-top-20">
            <span className="cursor-pointer" onClick = {(event) => {
                                    this.setState({
                                        changeContent: 'homecontent'
                                    });
         this.props.history.push("/home");
                                }}>Home</span>
            </li>
            
            <li className="padding-top-20">
                                    <span className="cursor-pointer" onClick = {(event) => {
                                    this.setState({
                                        changeContent: 'fileContent'
                                    });
this.props.history.push("/fileContent");
                                }}>Files</span>
            </li>
  <li className="padding-top-20">
                                    <span className="cursor-pointer" onClick = {(event) => {
                                     this.setState({
                                        changeContent: 'groups'
                                    });
this.props.history.push("/groups");
                                }}>Groups</span>
            </li>
            <li className="padding-top-20">
                                    <span className="cursor-pointer" onClick = {(event) => {
                                    this.setState({
                                        changeContent: 'userinfo'
                                    });
this.props.history.push("/userinfo");
                                }}>User Information</span>
            </li>
            </ul>
            </div>;
        return(
            
            <div className="container-fluid pad-null">
                <Route exact path="/home" render={() => (
            <div className="row">
            <div className="col-md-2 background-gray">
          {sideMenuBar}
            </div>
            <div className="col-md-10 height-100">
                        <TopMenu changeContent={this.state.changeContent}/>
            <HomeContent star ={this.star} data={this.state.data} 
                shareRes={this.shareRes}
                deleteRes={this.deleteRes}
                getFolderData={this.getFolderData}/> 
            </div>
                    </div>
                )}/>

<Route exact path="/fileContent" render={() => (
            <div className="row">
            <div className="col-md-2 background-gray">
          {sideMenuBar}
            </div>
            <div className="col-md-10 height-100">
                <TopMenu changeContent={this.state.changeContent}/>
            <FileContent  star ={this.star}
                data={this.state.data} 
                folders={this.state.folders}
                shareRes={this.shareRes}
                deleteRes={this.deleteRes}
                /> 
               
            </div>
                    </div>
                )}/>

<Route exact path="/groups" render={() => (
            <div className="row">
            <div className="col-md-2 background-gray">
          {sideMenuBar}
            </div>
            <div className="col-md-10 height-100">
                        <TopMenu changeContent={this.state.changeContent}/>
            <Group/> 
            </div>
                    </div>
                )}/>

<Route exact path="/userinfo" render={() => (
            <div className="row">
            <div className="col-md-2 background-gray">
          {sideMenuBar}
            </div>
            <div className="col-md-10 height-100">
                        <div>
                 <TopMenu changeContent={this.state.changeContent}/>
            <UserInfo/> 
            </div>
            </div>
                    </div>
                )}/>

</div>
        )
    }
}

export default withRouter(HomePage);