import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeContent from "./HomeContent";
import FileContent from "./FileContent";
import RightSideMenu from "./RightSideMenu";
import * as API from '../api/API';
import UserInfo from "./UserInfo";

class Content extends Component {
          constructor(props){
        super(props);
        this.state = {
            data:[],
            currentFolder:0,
            useractivity:[]
        }
    }
 static propTypes = {
        changeContent: PropTypes.string.isRequired
    };
 componentWillMount(){
      var self = this;
        var a = this.state;
     API.getImages()
                        .then((res) => {
                        console.log(res);
                        a.data =  res.mongores.data;
                        self.setState(a);
                        console.log(a)
                        });
   /*   API.getuseractivity()
                        .then((data) => {
                        console.log(data);
                        a.useractivity =  data.data;
                        self.setState(a);
                        console.log(a)
                        });*/
     
 }
getFolderData = (index) =>{
     var self = this;
        var a = this.state;
    a.currentFolder = a.folders[index].folderid;
    console.log(a.folders[index])
     API.getFolderData(a.folders[index].folderid)
                .then((data) => {
                a.imagesData =  data.files;
                        a.folders = data.folders;
                        self.setState(a);
                });
}
unstarFolder  = (index) => {
       var self = this;
        var a = this.state;
       
       API.unstarFile(a.folders[index].userfileid)
                .then((status) => {
               a.folders[index].star = 'false';
                self.setState(a);
                });  
   }
starFolder  = (index) => {
       var self = this;
        var a = this.state;
       API.starFile(a.folders[index].userfileid)
                .then((status) => {
               a.folders[index].star = 'true';
                self.setState(a);
                });  
   };
unstar  = (index) => {
       var self = this;
        var a = this.state;
       
       API.unstarFile(a.imagesData[index].userfileid)
                .then((status) => {
                    a.imagesData[index].star = 'false';
                self.setState(a);
                });  
   }
star  = (index) => {
       var self = this;
        var a = this.state;
     a.data[index].star = !a.data[index].star;
    var starData = {
        "data" :a.data
    }
       API.starFile(starData)
                .then((status) => {
                    //a.imagesData[index].star = 'true';
                self.setState(a);
                });  
   };
handleFileUpload = (event) => {
        const payload = new FormData();
        payload.append('mypic', event.target.files[0]);
        var self = this;
        var a = this.state;3
        API.uploadFile(payload,this.state.currentFolder)
            .then((res) => {
            console.log(res);
                        a.data = res.mongores;
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
               a.data = data.mongores.data;
                        //a.folders = data.folders;
                        self.setState(a);
                        console.log(a)
            });
    
};
shareRes = (userfileid, id, type) =>{
     API.share(userfileid, id, type)
            .then((data) => {
    console.log(data);
            });
}

deleteRes = (userfileid, type,fileid,filename) =>{
             API.deleteRes(userfileid, type,fileid,filename)
            .then((status) => {
    console.log(status);
                 var a=this.state;
                 var self = this;
                 if(status.data && status.data.affectedRows === 1){
                       API.getImages()
                        .then((data) => {
                        console.log(data);
                        a.imagesData =  data.files;
                        a.folders = data.folders;
                        self.setState(a);
                        console.log(a)
                        });
                    }
                 else{
                     
                 }
            });
}
   
    render(){        
        if(this.props.changeContent == 'homecontent'){
         var useracList = this.state.useractivity;
        var userac = [];
            if(useracList && useracList.length != 0){
                useracList.map(function(temp, index) {
        userac.push(<li className="activity-size">
                    <span>{temp.event}</span>
                    <span> at </span>
                    <span>{temp.eventtime}</span>
                    </li>
        );
        });
               }
       
            return(
            <div className="row">    
                <div className="col-md-9">
            <HomeContent star ={this.star} data={this.state.data} 
                shareRes={this.shareRes}
                deleteRes={this.deleteRes}
                getFolderData={this.getFolderData}/> 
                </div>
                <div className="col-md-3">
                <span  className="padding-top-50">User Activity</span>
               <ul>
                {userac}
                </ul>
                
                </div>
            </div>
        )
    }
         if(this.props.changeContent == 'filecontent'){
            return(
            <div className="row">    
                <div className="col-md-9">
            <FileContent  star ={this.star}
                data={this.state.data} 
                folders={this.state.folders}
                shareRes={this.shareRes}
                deleteRes={this.deleteRes}
                /> 
                </div>
                <div className="col-md-3">
                <RightSideMenu handleFileUpload ={this.handleFileUpload} handleNewFolder ={this.handleNewFolder}/>
                </div>
            </div>
        )
    }
     if(this.props.changeContent == 'userinfo'){
            return(
            <div>    
            <UserInfo/> 
            </div>
        )
    }
    }
}

export default withRouter(Content);