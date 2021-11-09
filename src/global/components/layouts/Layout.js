import React from "react";
import { ToastContainer } from "react-toastify";
import { NavMenu } from "../NavMenu";
import "./Layout.css";

export const Layout = (props) => {
  return (
    <div>
      <NavMenu member={props.member} />
      <ToastContainer autoClose={3000} />
      <div>{props.children}</div>
    </div>
  );
};
