import React, {Component} from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";

import {Button} from "react-bootstrap";
import * as API from '../api/API';
import RightSideMenu from "./RightSideMenu";
import Ionicon from 'react-ionicons';

class Group extends Component {
    constructor(props){
        super(props);
         this.state = {
             groups:[],
        showModal : false,
        groupname:'',
             listOfGroups:true,
             groupData :null
         }
    }   
    
componentWillMount(){
        var a = this.state;
        var self = this;
         API.getgroups()
                        .then((res) => {
                        a.groups =  res.data;
                        console.log(a);
                        self.setState(a);
                        console.log(a)
                        });
    }
    close = () => {
    var a = this.state;
    a.showModal = false;
    this.setState(a);
}
openModalShare = () => {
    var a = this.state;
    a.showModal = true;
    this.setState(a);
}
getGroupData = (index) =>{
    var a = this.state;
    a.listOfGroups = false;
    a.groupData = a.groups[index];
    this.setState(a);
    console.log(a.groupData)
}
createGroup = () =>{
    var a = this.state;
     var self = this;
    a.showModal = false;
    this.setState(a);
    console.log(a.groupname);
    API.creategroup(a.groupname)
            .then((data) => {
    console.log(data);
        API.getgroups()
                        .then((res) => {
                        a.groups =  res.data;
                        self.setState(a);
                        console.log(a)
                        });
            });
}
uploadFileGroup = (event) => {
    console.log("ooo")
        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
        var self = this;
        var a = this.state;
    
     var myobj = {
            "fileid" : 1,
            "filename" : event.target.files[0].originalname,
            "filetype" : 0,
            "owner" : true,
            "star" : false,
            "activityIndicator" : true
        }
     
       API.uploadFileGroup(payload,this.state.groupData._id)
            .then((res) => {
            console.log(res);
                        a.data = res.data;
                        self.setState(a);
                        console.log(a)
            });
    };

    render() {
        if(this.state.listOfGroups == true){
        var groups = this.state.groups;
              var groupsData = [];
if(groups && groups.length !== 0){
            groups.map(function(temp, index) {
                groupsData.push(
                    <tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> 
                         <Ionicon icon="ios-people" fontSize="25px" color="#0062ff"/>
                          <a 
                       onClick={ () => this.getGroupData(index) }
                       className="padding-left-20 cursor-pointer">
                          {temp.groupname}</a>
                    </td>
                    </tr>
                );
            }.bind(this));
        console.log(groupsData)
    }
        
        
        
             

        return (
            <div className="row  pad-30">
            <div className="col-md-9">            
            <table className="text-align-left width-100">
              <thead>
                <td className="table-head">Name</td>
                </thead>
            <tbody>
              {groupsData}
            </tbody>
          </table>
            </div>
            <div className="col-md-3">
                 <div className="file">
  <label htmlFor="file-input">Create Group</label>
  <input type="button"                                 className="pull-right"
 id="file-input" onClick={() => this.openModalShare()}/>
            </div>
            </div>
            
<div className="react-modal-custom">
            <Modal className ="react-modal-custom" show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
            <Modal.Title className="modal-head-style">Enter folder name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type = 'text' onChange={event=>{this.setState({groupname:event.target.value});}}/>
           <span className="padding-left-20"><Button type='button' onClick={this.createGroup}>Done</Button></span> 
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
    </Modal>
</div>
             </div>
        );
}
    else{
        console.log(this.state.groupData)
         var groupsFiles = [];
        var groupDataTemp = this.state.groupData;
if(groupDataTemp){
    console.log(this.state.groupData)
    groupDataTemp = this.state.groupData.data;
    groupsFiles.push(<tr className="table-border" ><td className="padding-top-20 padding-bot-20">                         
                          <Ionicon icon="md-folder" fontSize="17px"  color="#0062ff"/>
                                  <a className="padding-left-20"  >
                          Folder 1</a>
                          </td>
                          <td>
                               <a>
                           <Ionicon icon="ios-trash" 
                              className="pull-right cursor-pointer" fontSize="17px"  color="#0070E0"/>
                          </a>                     
                     </td></tr>);
    
            groupDataTemp.map(function(temp, index) {            
                var smallImg = null;
                 var dataType =temp.filename.split(".")[temp.filename.split(".").length - 1];
                if(dataType ===  'jpg' || dataType === 'jpeg' || dataType ==='png'){
                    smallImg = <img className="img-dropbox" src={'http://localhost:3005/uploads/'+temp.filename}/>;
                }
                else if(dataType ==='pdf'){
                    smallImg = <img className="img-dropbox" src={'/pdf.jpg'}/>;
                }
                else{
                      smallImg = <img className="img-dropbox" src={'/file.jpg'}/>;
                }
                 
                var deleteIcon = null;
                var currentownwer = reactLocalStorage.get('userid');
                if(temp.owner === currentownwer){
                   deleteIcon =<a onClick=
                                  { () => this.deleteRes(index) }>
                           <Ionicon icon="ios-trash" 
                              className="pull-right cursor-pointer" fontSize="17px"  color="#0070E0"/>
                          </a>;
                              }
                groupsFiles.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> {smallImg}
                         
                          <a className="padding-left-20" href={'http://localhost:3005/uploads/'+temp.filename} download>
                          {temp.filename}</a>
                          </td>
                          <td>
                               {deleteIcon}
                     </td></tr>
                );
            }.bind(this));
console.log("groupsFiles")
        console.log(groupsFiles)
        
       var groupsMembers = [];
        var groupMemTemp = this.state.groupData.members;
        groupMemTemp.map(function(temp, index) {                 
                groupsMembers.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> 
                           <Ionicon icon="ios-person" fontSize="20px"  color="#0062ff"/>
                          <a className="padding-left-20">
                          {temp.userid}</a>
                          </td>
                          <td>
                               <a onClick=
                                  { () => this.deleteRes(index) }>
                           <Ionicon icon="ios-trash" 
                              className="pull-right cursor-pointer" fontSize="17px"  color="#0070E0"/>
                          </a>                     
                     </td></tr>
                );
            }.bind(this));

    }
        return(
            
            <div className="row">
            <div className="col-md-9">   
            <table className="text-align-left width-100">
              <thead>
                <td className="table-head">Group Members</td>
                </thead>
            <tbody>
              {groupsMembers}
            </tbody>
          </table>
            <div className="padding-top-20"></div>
            <table className="text-align-left width-100">
              <thead>
                <td className="table-head">Group Data</td>
                </thead>
            <tbody>
              {groupsFiles}
            </tbody>
          </table>
            </div>
            <div className="col-md-3">
                 <div className="file">
  <label htmlFor="file-input">Upload files</label>
  <input type="file"                                 className="pull-right"
 id="file-input"  name="mypic"
                    onChange={this.uploadFileGroup}/>
            </div>
            <div className="padding-top-20">
            <a className="new-folder-style pull-none" onClick={() => this.openModalShare()}>New Folder
            </a>
</div>
<div className="padding-top-20" >
            <a className="new-folder-style pull-none padding-top-20" onClick={() => this.openModalShare()}>Add Member
            </a>
            
            </div>



            </div>
            
<div className="react-modal-custom">
            <Modal className ="react-modal-custom" show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
            <Modal.Title className="modal-head-style">Enter  name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type = 'text' onChange={event=>{this.setState({foldername:event.target.value});}}/>
           <span className="padding-left-20"><Button type='button' onClick={this.createFolder}>Done</Button></span> 
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
    </Modal>
</div>
             </div>
        )
    }
}
}
export default Group;