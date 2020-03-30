import React, {Component} from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './Auth.module.css';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {connect} from 'react-redux';
import * as actions from '../../../api/index';
import "./Auth.css";
import '../Form.css';
import {Redirect} from "react-router-dom";

class Auth extends Component {

    constructor(props) {
        super(props);
    }

    state = {

        formIsValid: false,
        loading: false,
    };

    componentDidMount() {
        this.props.onSetAuthRedirectPath();
    }


    onChangeHandler = e => {
        this.setState({[e.target.id]: e.target.value});
    };


    // checkValidity(value, rules) {
    //     let isValid = true;
    //     if (!rules) {
    //         return true;
    //     }
    //
    //     if (rules.required) {
    //         isValid = value.trim() !== '' && isValid;
    //     }
    //
    //     if (rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid
    //     }
    //
    //     if (rules.maxLength) {
    //         isValid = value.length <= rules.maxLength && isValid
    //     }
    //
    //     if (rules.isEmail) {
    //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //         isValid = pattern.test(value) && isValid
    //     }
    //
    //     if (rules.isNumeric) {
    //         const pattern = /^\d+$/;
    //         isValid = pattern.test(value) && isValid
    //     }
    //
    //     return isValid;
    // }


    loginHandler = (event) => {
        event.preventDefault();

        const userData = {
            username: this.state.username,
            password: this.state.password,
        };

        this.props.onAuth(userData, this.props.history);

    };

    render() {

        let form = (
            <Form onSubmit={this.loginHandler}>
                <Form.Group className="form-content" style={{marginBottom: "0"}}>
                    <Form.Group as={Row} noGutters="true">
                        <Form.Label column sm="3">
                            نام کاربری
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control id="username" onChange={this.onChangeHandler}/>
                        </Col>

                    </Form.Group>
                    <Form.Group as={Row} noGutters="true" style={{marginBottom: "0"}}>
                        <Form.Label column sm="3">
                            گذرواژه
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" id="password" onChange={this.onChangeHandler}/>
                        </Col>

                    </Form.Group>
                </Form.Group>
                <Form.Group className={styles.CenterContent}>
                    <Button type="submit" className="center margin-top-5 submit-btn">ورود</Button>
                </Form.Group>


            </Form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {

            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (

            <div>
                {authRedirect}
                {errorMessage}
                <h4>نام کاربری و گذرواژه خود را وارد کنید </h4>
                <div className={styles.LoginForm}>
                    {form}
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user !== null,
        authRedirectPath: state.auth.authRedirectPath,
        loading: state.auth.loading,
        error: state.auth.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userData, history) => {
            dispatch(actions.auth(userData, history))
        },
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/profile"))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);