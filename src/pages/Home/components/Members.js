import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Button, Collapse, FormGroup, Input } from "reactstrap";
import { InviteMembers } from "./InviteMembers";
import { ListGroup, ListGroupItem } from "reactstrap";
import { FiX } from "react-icons/fi";

export const Members = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenMembers, setIsOpenMembers] = useState(false);
  const [isOpenInvited, setIsOpenInvited] = useState(false);
  const dispatch = useDispatch();
  const toggleAdd = () => setIsOpenAdd(!isOpenAdd);
  const toggleMembers = () => setIsOpenMembers(!isOpenMembers);
  const toggleInvited = () => setIsOpenInvited(!isOpenInvited);
  const { members } = useSelector((state) => state.organisations);

  return (
    <>
      <div>
        <button onClick={toggleAdd} className="button-max-width members-button">
          Invite members{" "}
          {isOpenAdd ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
        <Collapse isOpen={isOpenAdd}>
          <InviteMembers />
        </Collapse>
      </div>

      <div>
        <button
          onClick={toggleMembers}
          className="button-max-width members-button"
        >
          Members{" "}
          {isOpenMembers ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </button>
        <Collapse isOpen={isOpenMembers}>
          <div className="members-collapse">
            <ListGroup className="members-form-group">
              {members.map((data, index) => {
                return (
                  <ListGroupItem key={data.id} tag="a">
                    {data.fullName} / {data.username}
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </div>
        </Collapse>
      </div>
    </>
  );
};
