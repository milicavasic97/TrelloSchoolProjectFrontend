import React from 'react';
import { InputGroup, Button, Input } from 'reactstrap';
import './Login.css';
import { FiTrello } from "react-icons/fi";
import { useHistory } from 'react-router-dom';

export const Login = () => {
    const history = useHistory();

    function handleClick() {
        //  handle login and add validations
        history.push("/");
      }

    return (
        <div className="login-page">
            <h1 className="trello-heading abril-fatface-font">
                <FiTrello />
                Trello
            </h1>
            <div className="trello-login-container">
                <InputGroup>
                    <Input type='email' placeholder="Username..." className="login-input" />
                </InputGroup>
                <br/>
                <InputGroup>
                    <Input type='password' placeholder="Password..." className="login-input" />
                </InputGroup>
                <br/>
                <Button color="secondary" className="login-button" onClick={handleClick}>
                    LOGIN
                </Button>
            </div>
        </div>
    )
}
