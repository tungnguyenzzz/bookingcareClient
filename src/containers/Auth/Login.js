import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { handleLoginApi } from '../../services/userService';

import './Login.scss';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }

    }
    handleOnChangeUsername = (event) => {

        this.setState({
            username: event.target.value
        })

    }

    handleOnChangePassword = (event) => {

        this.setState({
            password: event.target.value
        })

    }

    handleLogin = async () => {
        this.setState({
            errorMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errorMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('loggin success')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message
                    })
                }
            }


        }


    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }
    render() {



        return (

            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12  text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input type="text" className="form-control"
                                placeholder="Enter your username"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>

                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <input type="password" className="form-control"
                                placeholder="Enter your password"
                                onChange={(event) => this.handleOnChangePassword(event)}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                            />
                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => { this.handleLogin() }}>Login</button>
                        </div>

                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center">
                            <span className="" >Or login with</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
