import React, { useEffect, useState } from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import './Login.css';
import { FiTrello } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/memberSlice';
import { Button as ButtonMUI } from '@material-ui/core';

export const Login = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.members);
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin");

    function handleClick() {
        dispatch(login({username, password}));
      }

    return (
        <div className="login-page">
            <Button className="sign-up-button" >SIGN UP</Button>
            <h1 className="trello-heading abril-fatface-font">
                <FiTrello />
                Trello
            </h1>
            <Form className="trello-login-container" onSubmit={handleClick}>
                <FormGroup>
                    <Input name={username} type='text' 
                        placeholder="Username..." className="login-input" 
                         onChange={(e) => setUsername(`${e.target.value}`)} 
                    />
                </FormGroup>
                <br/>
                <FormGroup>
                    <Input name={password} type='password' 
                        placeholder="Password..." className="login-input"
                         onChange={(e) => setPassword(`${e.target.value}`)} 
                    />
                </FormGroup>
                <br/>
                <Button type='submit' color="secondary" className="login-button">
                    LOGIN
                </Button>
                <Label className="forgot-password">Zaboravili ste lozinku?</Label>
            </Form>
        </div>
    )
}
