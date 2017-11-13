import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';

class UserInfo extends Component {
state={
    userid: 1,
    firstname: 'none',
    lastname: 'none',
    emailid: 'none',
    work: 'none',
    education: 'none',
    contactinfo: 'none',
    lifeevents: 'none',
    interests: 'none',
    editMode:false,
    userInfo:null
    }
 componentWillMount(){
      var self = this;
      var a = this.state;
 
    API.getUserInfo().then((data) => {
        console.log(data);
        a.firstname = data.mongores.firstname;
        a.lastname = data.mongores.lastname;
        a.emailid = data.mongores.emailid;
        a.work = data.mongores.work;
        a.education = data.mongores.education;
        a.contactinfo = data.mongores.contactinfo;
        a.lifeevents = data.mongores.lifeevents; 
        a.interests = data.mongores.interests;
        a.userInfo = data.mongores;
        self.setState(a);                                 
      });
 }
switchToEdit = () =>{
    var a = this.state;
    a.editMode = true;
    this.setState(a);                    
}
saveInfo = () => {
    var self = this;
      var a = this.state;
    API.setUserInfo(this.state.userInfo).then((data) => {
    console.log(data);
        data =a.userInfo;
        a.editMode = false;
        a.firstname = data.firstname;
        a.lastname = data.lastname;
        a.emailid = data.emailid;
        a.work = data.work;
        a.education = data.education;
        a.contactinfo = data.contactinfo;
        a.lifeevents = data.lifeevents; 
        a.interests = data.interests;
        self.setState(a); 
});
}
    render() {
        if(this.state.editMode == false){
        return (
            <div className="text-align-left pad-30">
            <div>
            <span className="user-info-head">USER OVERVIEW</span>
            <p className="user-info-content padding-top-20">
            <span className="user-info-style">First Name</span>
            <span className="user-info-value">{this.state.firstname}</span>
            </p>
            <p>
            <span className="user-info-style">Last Name</span>
            <span className="user-info-value">{this.state.lastname}</span>
            </p>
            </div>
             <div>
            <span className="user-info-head">WORK AND EDUCATION</span>
            <p className="user-info-content padding-top-20">
            <span className="user-info-style">Work</span>
            <span className="user-info-value">{this.state.work}</span>
            </p>
            <p>
            <span className="user-info-style">Education</span>
            <span className="user-info-value">{this.state.education}</span>
            </p>
            </div>
            <div>
            <span className="user-info-head">CONTACT INFORMATION</span>
            <p className="user-info-content padding-top-20">
            <span className="user-info-style">Email Id</span>
            <span className="user-info-value">{this.state.emailid}</span>
            </p>
            <p>
            <span className="user-info-style">Phone Number</span>
            <span className="user-info-value">{this.state.contactinfo}</span>
            </p>
            </div>
            <div>
            <span className="user-info-head">INTERESTS</span>
            <p className="padding-top-20">
            <span className="user-info-style">Hobbies</span>
            <span className="user-info-value">{this.state.interests}</span>
            </p>
            </div>
             <button
                                className="btn btn-primary pull-right"
                                type="button"
                                onClick={this.switchToEdit}>
                                EDIT
                            </button>
            </div>
        );
        }
        else{
            return (
                
            <div className="text-align-left pad-30">
            <div>
            <span className="user-info-head">USER OVERVIEW</span>
            <p className="user-info-content padding-top-20">
            <span className="user-info-style">First Name</span>
            <span className="user-info-value"><input type="text" 
                placeholder="First Name"
                                
                                onChange={(event) => {
                var dataTemp = this.state.userInfo;
                dataTemp.firstname = event.target.value;
                                    this.setState({
                                        userInfo: dataTemp
                                    });
                                }}/></span>
            </p>
            <p>
            <span className="user-info-style">Last Name</span>
            <span className="user-info-value"><input type="text" 
                placeholder="Last Name"
                                
                                onChange={(event) => {
                var dataTemp = this.state.userInfo;
                dataTemp.lastname = event.target.value;
                                    this.setState({
                                        userInfo: dataTemp
                                    });
                                }}/></span>
            </p>
            </div>
             <div>
            <span className="user-info-head">WORK AND EDUCATION</span>
            <p className="user-info-content padding-top-20">
            <span className="user-info-style">Work</span>
            <span className="user-info-value"><input type="text" 
                placeholder="Work"
                                
                                onChange={(event) => {
                var dataTemp = this.state.userInfo;
                dataTemp.work = event.target.value;
                                    this.setState({
                                        userInfo: dataTemp
                                    });
                                }}/></span>
            </p>
            <p>
            <span className="user-info-style">Education</span>
            <span className="user-info-value"><input type="text" 
                placeholder="Education"
                                
                                onChange={(event) => {
                var dataTemp = this.state.userInfo;
                dataTemp.education = event.target.value;
                                    this.setState({
                                        userInfo: dataTemp
                                    });
                                }}/></span>
            </p>
            </div>
            <div>
            <span className="user-info-head">CONTACT INFORMATION</span>
            <p className="user-info-content padding-top-20">
            <span className="user-info-style">Email Id</span>
            <span className="user-info-value"><input type="text" 
                placeholder="Email Id"
                                
                                onChange={(event) => {
                var dataTemp = this.state.userInfo;
                dataTemp.emailid = event.target.value;
                                    this.setState({
                                        userInfo: dataTemp
                                    });
                                }}/></span>
            </p>
            <p>
            <span className="user-info-style">Phone Number</span>
            <span className="user-info-value"><input type="text" 
                placeholder="Phone Number"
                                
                                onChange={(event) => {
                var dataTemp = this.state.userInfo;
                dataTemp.contactinfo = event.target.value;
                                    this.setState({
                                        userInfo: dataTemp
                                    });
                                }}/></span>
            </p>
            </div>
            <div>
            <span className="user-info-head">INTERESTS</span>
            <p className="padding-top-20">
            <span className="user-info-style">Hobbies</span>
            <span className="user-info-value"><input type="text" 
                placeholder="Hobbies"
                                
                                onChange={(event) => {
                var dataTemp = this.state.userInfo;
                dataTemp.interests = event.target.value;
                                    this.setState({
                                        userInfo: dataTemp
                                    });
                                }}/></span>
            </p>
            </div>
             <button
                                className="btn btn-primary pull-right"
                                type="button"
                                onClick={this.saveInfo}>
                                SAVE
                            </button>
            </div>
                );
        }
    }
}

export default UserInfo;