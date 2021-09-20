import React, { useEffect, useState } from 'react';
import { InputGroup, Button, Input, Form, FormGroup } from 'reactstrap';
import './Login.css';
import { FiTrello } from "react-icons/fi";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/memberSlice';

export const Login = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.members);
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin");
    const [credentials, setCredentials] = useState({
        username: "admin",
        password: "admin",
    });

    // useEffect(() => {
    //     const { username } =  credentials;
    //     if(!username) return;
    //     dispatch(login(credentials));
    //     setSubmit(false);
    // }, [submit]);


    function handleClick() {
        setCredentials(username, password);
        dispatch(login({username, password}));
      }

    return (
        <div className="login-page">
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
            </Form>
        </div>
    )
}
