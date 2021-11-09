import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Container, Col } from "reactstrap";
import { getInvitations } from "../../redux/slices/memberSlice";
import { SingleInvitation } from "./components/SingleInvitation";
import "./Invitations.css";

export const Invitations = () => {
  const dispatch = useDispatch();
  const { member, invitations } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(getInvitations(member.id));
  }, []);

  return (
    <div className="home-background">
      <div className="page-padding-top trello-layout-overflow">
        <div className="invitations-container">
          <div>INVITATIONS</div>
          <hr />
          <Container>
            {invitations.length !== 0 ? (
              <>
                {invitations.map((data, index) => {
                  return <SingleInvitation key={data.id} data={data} />;
                })}{" "}
              </>
            ) : (
              <div>No invitations... </div>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};
