import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import Ionicon from 'react-ionicons';;

class HomeContent extends Component {   
     constructor(props){
        super(props);
         this.state = {
            data:[],
             useract:null
        }
    }  
    componentWillMount(){
        var a = this.state;
        var self = this;
         API.getImages()
                        .then((res) => {
                        a.data =  res.data;
                        self.setState(a);
             API.getuseractivity()
                        .then((res) => {
             console.log(res)
                        a.useract =  res.mongores;
                        self.setState(a);
                        console.log(a)
                        });
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
                self.setState(a);
                });  
   };
   render() {
       var userac = [];
       var useracList= this.state.useract;
       if(useracList != null){        
           useracList.map(function(temp, index) {
        userac.push(<li className="activity-size">
                    <span>{temp.message}</span>
                    </li>
        );
        });
         console.log(userac)                 }
        var rowsShFold = [];  
       var rowsShFile =[];
        var rowsStFold = [];  
       var rowsStFile =[];
         var data = this.state.data;
       if(data && data.length !== 0){
        data.map(function(temp, index) {            
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
                    starimg = <a onClick={ () => this.star(index) }> <Ionicon icon="ios-star-outline" 
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
            }
            console.log(smallImg)
            if(temp.star === true && temp.filetype === 1){
               rowsStFold.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> 
                         <Ionicon icon="md-folder" fontSize="17px" color="#0062ff"/>
                          <a 
                       className="padding-left-20 cursor-pointer">
                          {temp.filename}</a>
                    </td>
                    <td>
                    {ownerstatus}
                    </td>
                    <td>
                       {starimg}
                     </td></tr>);
               }
            if(temp.star === true && temp.filetype === 0){
                rowsStFile.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> 
                         {smallImg}
                             <a className="padding-left-20" href={'http://localhost:3005/uploads/'+temp.filename} download>
                          {temp.filename}</a>
                    </td>
                    <td>
                    {ownerstatus}
                    </td>
                    <td>
                       {starimg}
                     </td></tr>);  
            }
            if(temp.owner === false && temp.filetype === 1){
                rowsShFold.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> 
                          <Ionicon icon="md-folder" fontSize="17px" color="#0062ff"/>
                          <a 
                       className="padding-left-20 cursor-pointer">
                          {temp.filename}</a>
                    </td>
                    <td>
                    {ownerstatus}
                    </td>
                    <td>
                       {starimg}
                     </td></tr>);  
            }
            if(temp.owner === false && temp.filetype === 0){
                   rowsShFile.push(<tr className="table-border" key ={index}><td className="padding-top-20 padding-bot-20"> 
                         {smallImg}
                             <a className="padding-left-20" href={'http://localhost:3005/uploads/'+temp.filename} download>
                          {temp.filename}</a>
                    </td>
                    <td>
                    {ownerstatus}
                    </td>
                    <td>
                       {starimg}
                     </td></tr>); 
            }
                    
        }.bind(this));
}
       if(rowsStFold.length === 0 && rowsStFile.length === 0){
          rowsStFold = <tr><td><span className="padding-left-20">No files or folders to display</span></td></tr>; 
       }
         if(rowsShFile.length === 0 && rowsShFold.length === 0){
          rowsShFold = <tr><td><span className="padding-left-20">No files or folders to display</span></td></tr>; 
       }
            return (  
            <div className="pad-30 row">
                 <div className="col-md-9">
             <table className="text-align-left width-100">
                <thead>
                <th className="table-head">Starred</th>
                </thead>
            <tbody>
                 {rowsStFold}
                {rowsStFile}               
            </tbody>
          </table>
                <div className="padding-top-20"></div>
              
                 <table className="text-align-left width-100">
                <thead>
                <th className="table-head">Shared with me</th>
                </thead>
            <tbody>
                 {rowsShFold}
                {rowsShFile}               
            </tbody>
          </table>
                </div>
                <div className="col-md-3">
                {userac}
                </div>
            </div>
        );
    }
}

export default HomeContent;