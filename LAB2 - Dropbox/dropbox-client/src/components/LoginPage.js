import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import HomePage from "./HomePage";
import Header from "./Header";
import SignUp from "./SignUp";
class LoginPage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: ''
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((res) => {
            console.log(res)
            
                if (res.mongores && res.mongores.data.userid !== undefined) { 
                    reactLocalStorage.set('userid', res.mongores.data.userid);
                    this.props.history.push("/home");
                } else {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };
    handleSignup = (userdata) => {
     API.doSignup(userdata)
                .then((res) => {
                   if (res.data.userid !== 'undefined') { 
                         reactLocalStorage.set('userid', res.data[0].userid);
                        this.props.history.push("/home");
                    } else{
                        this.setState({
                            isLoggedIn: false,
                            message: "Wrong username or password. Try again..!!"
                        });
                    }
                });
    };
    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        <Header/>
                        <Login isLoggedIn= {this.state.isLoggedIn} handleSubmit={this.handleSubmit}/>
                    </div>
                )}/>
                <Route exact path="/home" render={() => (<BrowserRouter>
                                                  
                    <HomePage username={this.state.username}/>
</BrowserRouter>
                )}/>
                <Route exact path="/signup" render={() => (
                    <SignUp handleSignup={this.handleSignup}/>
                )}/>
            </div>
        );
    }
}

export default withRouter(LoginPage);