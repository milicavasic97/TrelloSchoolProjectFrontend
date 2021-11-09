import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "./Login.css";
import { FiTrello } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/memberSlice";
import memberService from "../../services/member.service";
import { toast } from "react-toastify";

export const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.members);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [initials, setInitials] = useState("");

  const toggle = () => {
    setShowSignUp(!showSignUp);
  };

  function handleLogin() {
    dispatch(login({ username, password }));
  }

  function handleSignUp() {
    memberService
      .signUp({
        username: signUpUsername,
        fullName: fullName,
        password: signUpPassword,
        initials: initials,
        email: email,
      })
      .then((response) => {
        toast.success("Successfully signed up!");
        setSignUpUsername("");
        setFullName("");
        setSignUpPassword("");
        setEmail("");
        setInitials("");
        toggle();
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log();
      });
  }

  return (
    <div className="login-page">
      <Button className="sign-up-button" onClick={toggle}>
        SIGN UP
      </Button>
      <h1 className="trello-heading abril-fatface-font">
        <FiTrello />
        Trello
      </h1>
      <Form className="trello-login-container" onSubmit={handleLogin}>
        <FormGroup>
          <Input
            name={username}
            type="text"
            placeholder="Username..."
            className="login-input"
            onChange={(e) => setUsername(`${e.target.value}`)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Input
            name={password}
            type="password"
            placeholder="Password..."
            className="login-input"
            onChange={(e) => setPassword(`${e.target.value}`)}
          />
        </FormGroup>
        <br />
        <Button type="submit" color="secondary" className="login-button">
          LOGIN
        </Button>
        {/* <Label className="forgot-password">Zaboravili ste lozinku?</Label> */}
      </Form>
      <Modal
        isOpen={showSignUp}
        toggle={toggle}
        className="trello-modal"
        size="lg"
      >
        <ModalHeader>Sign up</ModalHeader>
        <ModalBody>
          <Form className="sign-up-form">
            <FormGroup className="sign-up-form-group">
              <Label>Full name *</Label>
              <Input
                value={fullName}
                placeholder="Input full name..."
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="sign-up-form-group">
              <Label>Username *</Label>
              <Input
                value={signUpUsername}
                placeholder="Input username..."
                onChange={(e) => setSignUpUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="sign-up-form-group">
              <Label>Initials *</Label>
              <Input
                value={initials}
                placeholder="Input initials..."
                onChange={(e) => setInitials(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="sign-up-form-group">
              <Label>Email *</Label>
              <Input
                value={email}
                type="email"
                placeholder="Input email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="sign-up-form-group">
              <Label>Password *</Label>
              <Input
                type="password"
                value={signUpPassword}
                placeholder="Input password..."
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
            </FormGroup>
            <br />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSignUp}>
            SIGN UP
          </Button>
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
