import React from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";
import { getInvitations } from "../../../redux/slices/memberSlice";
import { getAllOrganisationsForMe } from "../../../redux/slices/organisationSlice";
import memberService from "../../../services/member.service";

export const SingleInvitation = (props) => {
  const dispatch = useDispatch();

  const handleAccept = () => {
    memberService.acceptInvitation(props.data.id).then((response) => {
      dispatch(getInvitations(props.data.idMember));
      dispatch(getAllOrganisationsForMe(props.data.idMember));
    });
  };

  const handleReject = () => {
    memberService
      .rejectInvitation(props.data.id)
      .then((response) => dispatch(getInvitations(props.data.idMember)));
  };

  return (
    <div>
      <Row className="single-invitation">
        <Col>{props.data.organisation.displayName} </Col>
        <Col>
          <button
            className="invitation-button invtation-button-accept"
            onClick={() => handleAccept()}
          >
            Accept
          </button>
        </Col>
        <Col>
          <button
            className="invitation-button invtation-button-reject"
            onClick={() => handleReject()}
          >
            Reject
          </button>
        </Col>
      </Row>
      <hr />
    </div>
  );
};
