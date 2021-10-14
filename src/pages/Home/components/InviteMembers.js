import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormGroup, Input } from "reactstrap";
import { getAllMembers } from "../../../redux/slices/memberSlice";
import Select from "react-select";
import { unwrapResult } from "@reduxjs/toolkit";
import organisationService from "../../../services/organisation.service";
import { toast } from "react-toastify";
import { handleInsertError } from "../../../util/errorHandlers";

export const InviteMembers = () => {
  const { member, membersForDropdown } = useSelector((state) => state.members);
  const { organisation } = useSelector((state) => state.organisations);
  const dispatch = useDispatch();
  const [memberList, setMemberList] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(getAllMembers());
  }, []);

  useEffect(() => {
    setMemberList(
      membersForDropdown.filter((item) => item.value !== member.email)
    );
  }, [membersForDropdown]);

  const inviteMember = () => {
    organisationService
      .invite(organisation.id, {
        email: selected.value,
        fullName: selected.label,
      })
      .then((result) => toast.success("Invited successfully!"))
      .catch((err) => {
        if (err.response.data !== null) {
          toast.error(err.response.data);
        } else handleInsertError(err);
      });

    setSelected(null);
  };

  var handleSelected = function (e) {
    setSelected(e);
  };

  return (
    <div className="members-collapse">
      <FormGroup className="members-form-group">
        <Select
          value={selected}
          placeholder="Choose new member..."
          options={memberList}
          onChange={(e) => handleSelected(e)}
        />
        <br />
        <Button className="add-member-button" onClick={inviteMember}>
          Invite
        </Button>
      </FormGroup>
    </div>
  );
};
