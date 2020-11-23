import React, { Component } from "react";
import queryString from 'query-string';
import {Redirect } from "react-router-dom";


class LoginMiddleware extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoading:true
        }
    }
    setItem = (key, value) =>{
        return Promise.resolve().then(()=> {
            localStorage.setItem(key, value);
        });
    }

    componentDidMount(){
        this.setItem("token", queryString.parse(this.props.location.search).token).then(()=>{
            this.setState({isLoading:false})
        });
    }

    render() {
        console.log("loading", this.state.isLoading)
        if(!this.state.isLoading)
            return <Redirect to="/pointList" />
        else return null;
    }
}

export default LoginMiddleware;