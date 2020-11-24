import React, { Component } from "react";
import queryString from 'query-string';
import {Redirect } from "react-router-dom";
import auth from "../../services/authService";


class LoginMiddleware extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoading:true
        }
    }

    async componentDidMount(){
        try{
            await auth.login(queryString.parse(this.props.location.search).token);
            this.setState({isLoading:false});
        }
        catch(error){
            console.log("error:", error);
        }
    }

    render() {
        if(!this.state.isLoading)
            return <Redirect to="/pointList" />
        else return null;
    }
}

export default LoginMiddleware;