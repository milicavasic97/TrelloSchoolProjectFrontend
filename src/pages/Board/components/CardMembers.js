import React, { useEffect, useState } from "react";
import { FiTrash, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import cardService from "../../../services/card.service";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  handleDeleteError,
  handleInsertError,
} from "../../../util/errorHandlers";
import { FormGroup, Form, Label, Button } from "reactstrap";
import { getAllMembers } from "../../../redux/slices/memberSlice";
import { AreYouSureModal } from "../../../global/components/AreYouSureModal";

export const CardMembers = (props) => {
  const [memberList, setMemberList] = useState([]);
  const [selected, setSelected] = useState(null);
  const { member, membersForDropdown } = useSelector((state) => state.members);
  const [members, setMembers] = useState([]);
  const [reloadMembers, setReloadMembers] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [memberId, setMemberId] = useState("");
  const toggleDelete = () => {
    setShowModal(!showModal);
  };
  const preToggle = (memberId) => {
    setMemberId(memberId);
    toggleDelete();
  };

  const handleAddMember = () => {
    if (selected !== null)
      cardService
        .addMember(props.data.id, selected.value)
        .then((response) => {
          toast.success("Successfully added!");
          setReloadMembers(!reloadMembers);
        })
        .catch((err) => handleInsertError(err));
  };

  const handleDeleteMember = () => {
    console.log(memberId);

    cardService
      .removeMember(props.data.id, memberId)
      .then((response) => {
        toast.success("Successfully deleted!");
        setReloadMembers(!reloadMembers);
      })
      .catch((err) => handleDeleteError(err));
    toggleDelete();
    setMemberId("");
  };

  var handleSelected = function (e) {
    setSelected(e);
  };

  useEffect(() => {
    setMemberList(
      membersForDropdown.filter((item) => item.value !== member.email)
    );
  }, [membersForDropdown]);

  useEffect(() => {
    dispatch(getAllMembers());
  }, []);

  useEffect(() => {
    cardService
      .getMembers(props.data.id)
      .then((response) => setMembers(response.data));
  }, [, reloadMembers]);

  return (
    <>
      <Form>
        <table className="card-members-table">
          <tbody>
            <tr>
              <td className="card-author-td">
                <b>Author </b>
              </td>
              <td>{props.data.createdBy.fullName}</td>
            </tr>
            <tr>
              <td colSpan="2">
                <hr />
              </td>
            </tr>
            <tr>
              <td className="card-author-td">
                <b>Members </b>
              </td>
              <td>
                <div className="card-member-list">
                  {members.length === 0 ? (
                    <div className="no-members">No members...</div>
                  ) : (
                    <>
                      {members.map((data, index) => {
                        return (
                          <div key={data.id}>
                            <FiTrash2
                              className="x-icon"
                              onClick={() => preToggle(data.id)}
                            />
                            {"  "}
                            {data.fullName} {" / "} {data.username}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <hr />
              </td>
            </tr>
          </tbody>
        </table>
        <FormGroup>
          <Select
            value={selected}
            placeholder="Choose member..."
            options={memberList}
            onChange={(e) => handleSelected(e)}
          />
          <br />
          <Button className="card-settings-button" onClick={handleAddMember}>
            Add member
          </Button>
        </FormGroup>
      </Form>
      <AreYouSureModal
        show={showModal}
        toggle={toggleDelete}
        handleYes={handleDeleteMember}
      />
    </>
  );
};

// const SingleMember = (memberData) => {
//     console.log(memberData.data);
//     return (
//       <div>
//         <FiTrash2 className="x-icon" />
//         {"  "}
//         {memberData.data.fullName} {" / "} {memberData.data.username}
//       </div>
//     );
//   };
