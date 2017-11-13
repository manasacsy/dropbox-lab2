import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import RightSideMenu from "./RightSideMenu";
import Ionicon from 'react-ionicons';

class FileContent extends Component {
    constructor(props){
        super(props);
         this.state = {
            data:[],
            showModal : false,
            shareWith:'',
            dataToShare:'',
            type:'',
             currentFolder:null
        }
    }
     componentWillMount(){
        var a = this.state;
        var self = this;
         API.getImages()
                        .then((res) => {
                        a.data =  res.data;
                        self.setState(a);
                        console.log(a)
                        });
    }
    getInitialState = () => {
    return { showModal: false ,
           shareWith : ''};
};

close = () => {
    var a = this.state;
    a.showModal = false;
    this.setState(a);
};

openModalShare = (index, type) => {
    var a = this.state;
    a.showModal = true;
    a.dataToShare = a.data[index];
    a.type = type;
    this.setState(a);
}
shareRes = () =>{
    var a = this.state;
    a.showModal = false;
    this.setState(a);
    console.log(this.state);
    console.log(this.state)
    API.share(a.shareWith, a.dataToShare, a.type)
            .then((data) => {
    console.log(data);
            });
}
    
star = (index) => {
    var self = this;
        var a = this.state;
     a.data[index].star = !a.data[index].star;
    var starData = {
        "data" :a.data
    }
       API.starFile(starData)
                .then((status) => {
                self.setState(status);
                });  
}

deleteRes = (userfileid, type,fileid,filename) =>{
   this.props.deleteRes(userfileid, type,fileid,filename);
}


handleFileUpload = (event) => {
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
     
       API.uploadFile(payload,this.state.currentFolder)
            .then((res) => {
            console.log(res);
                        a.data = res.data;
                        self.setState(a);
                        console.log(a)
            });
    };
handleNewFolder = (filename) => {
    console.log(filename)
    var self = this;
    var a = this.state;
    var name = filename.shareWith;
    var inFolder = a.currentFolder;
     API.createFolder(name, inFolder)
            .then((data) => {
         console.log(data);
               a.data = data.data;
                        self.setState(a);
                        console.log(a)
            });
    
};
getFolderData= (index) =>{
     var a = this.state;
    a.currentFolder = a.data[index].folderid;
    this.setState(a);
    var self = this;
    API.getFolderData(a.currentFolder)
            .then((data) => {
         console.log(data);
               a.data = data.mongores;
                        self.setState(a);
                        console.log(a)
            });
}
    render() {
        var folders = [];
        var files = [];
        var data;
      
           data = this.state.data;
       
        
if(data && data.length !== 0){
            data.map(function(temp, index) {
                console.log(temp)
                var starimg;
            var ownerstatus;
                          if(temp.star === true){
                              starimg = <a onClick=
                                  { () => this.star(index) }>
                          
                                   <Ionicon icon="ios-star" 
                              className="pull-right cursor-pointer" fontSize="17px" color="#0070E0"/>
                          </a>; 
                            } 
                else{                  
                    starimg = <a onClick={ () => this.star(index) }>
                        <Ionicon icon="ios-star-outline" 
                              className="pull-right cursor-pointer" fontSize="17px" color="#0070E0"/>
                          </a>;
                }
            
             if(temp.owner === true){
                              ownerstatus = <span className="padding-left-20">Self</span>; 
                            } 
                else{ 
                    ownerstatus = <span className="padding-left-20">Shared</span>; 
                    var smallImg;        } 
            
            
                if(temp.filetype === 0){
                   var dataType =temp.filename.split(".")[temp.filename.split(".").length - 1];
                if(dataType ===  'jpg' || dataType ==='jpeg' || dataType ==='png'){
                    smallImg = <img className="img-dropbox" src={'http://localhost:3005/uploads/'+temp.filename}/>;
                }
                else if(dataType ==='pdf'){
                    smallImg = <img className="img-dropbox" src={'/pdf.jpg'}/>;
                }
                else{
                      smallImg = <img className="img-dropbox" src={'/file.jpg'}/>;
                }
                    files.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> {smallImg}
                         
                          <a className="padding-left-20" href={'http://localhost:3005/uploads/'+temp.filename} download>
                          {temp.filename}</a>
                          </td>
                          
                          <td>
                          {ownerstatus}
                          </td>
                          <td>
                               <a onClick=
                                  { () => this.deleteRes(index) }>
                           <Ionicon icon="ios-trash" 
                              className="pull-right cursor-pointer" fontSize="17px"  color="#0070E0"/>
                          </a>
                        {starimg}
                          <a onClick=
                                  {() => this.openModalShare(index, 'file')}>
                         <Ionicon icon="md-share" 
                              className="pull-right cursor-pointer" fontSize="17px" color="#0070E0"/>
                          </a>
                     
                     </td></tr>);
                    
                   }
                     else{
                      folders.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> 
                         <Ionicon icon="md-folder" fontSize="17px"  color="#0062ff"/>
                          <a 
                       onClick={ () => this.getFolderData(index) }
                       className="padding-left-20 cursor-pointer">
                          {temp.filename}</a>
                    </td>
                    <td>
                    {ownerstatus}
                    </td>
                    <td>
                            <a onClick=
                                  { () => this.deleteRes(index) }>
                          <Ionicon icon="ios-trash" 
                              className="pull-right cursor-pointer" fontSize="17px"  color="#0070E0"/>
                          </a>
                       {starimg}
                    <a onClick=
                                  { () => this.openModalShare(index ,'folder') }>
                          <Ionicon icon="md-share" 
                              className="pull-right cursor-pointer" fontSize="17px" color="#0070E0"/>
                          </a>
                    
                     </td></tr>);
                     }
                
                }.bind(this));
}
console.log(folders)
console.log(files)
       if(folders && files && folders.length === 0 &&  files.length === 0){
          folders = <tr><td><span className="padding-left-20">No files or folders to display</span></td></tr>; 
       }
        
            return (  
                
            <div className="pad-30">
                <div className="row">
                <div className="col-md-9">
             <table className="text-align-left width-100">
              <thead>
                <th className="table-head">Name</th>
                <th className="table-head">Owner</th>
                <th className="table-head pull-right">Options</th>
                </thead>
            <tbody>
                {folders}
                {files}
            </tbody>
          </table>
                </div>
                 <div className="col-md-3">
                <RightSideMenu handleFileUpload ={this.handleFileUpload} handleNewFolder ={this.handleNewFolder}/>
                </div>
                </div>
                
                
<div className="react-modal-custom">
            <Modal className ="react-modal-custom" show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
            <Modal.Title className="modal-head-style">Enter name or emailid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type = 'text' onChange={event=>{this.setState({shareWith:event.target.value});}}/>
            <span className="padding-left-20"><Button type='button' onClick={this.shareRes}>Done</Button></span> 
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
    </Modal>
</div>


            </div>
        );
    }
}

export default FileContent;