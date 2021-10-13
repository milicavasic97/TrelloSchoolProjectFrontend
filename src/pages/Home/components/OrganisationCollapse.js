import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { Collapse, CardBody, Card } from "reactstrap";
import { HiOutlineViewBoards } from "react-icons/hi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrganisationsForMe,
  getBoards,
  getById,
  getInvited,
  getMembers,
  getOrganisationById,
  resetOrganisationSlice,
  setShowBoards,
  setShowMembers,
} from "../../../redux/slices/organisationSlice";
import { AiOutlineDelete } from "react-icons/ai";
import organisationService from "../../../services/organisation.service";
import { toast } from "react-toastify";
import { handleDeleteError } from "../../../util/errorHandlers";
import { AreYouSureModal } from "../../../global/components/AreYouSureModal";

export const OrganisationCollapse = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { member } = useSelector((state) => state.members);
  const [showModal, setShowModal] = useState(false);
  const toggleDelete = () => {
    setShowModal(!showModal);
  };

  const handleBoardsClick = () => {
    dispatch(getOrganisationById(props.identifier));
    dispatch(getBoards(props.identifier));
    dispatch(setShowBoards());
  };

  const handleMembersClick = () => {
    dispatch(getOrganisationById(props.identifier));
    dispatch(getMembers(props.identifier));
    dispatch(setShowMembers());
  };

  const handleDeleteClick = () => {
    organisationService
      .deleteOrganisation(props.data.id)
      .then((response) => {
        toast.success("Successfully deleted");
        dispatch(resetOrganisationSlice());
        dispatch(getAllOrganisationsForMe(member.id));
      })
      .catch((err) => handleDeleteError(err));
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button onClick={toggle} className="button-max-width button-org-color">
        {props.name} {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <Button
              className="button-max-width"
              onClick={() => handleBoardsClick()}
            >
              <HiOutlineViewBoards /> Boards
            </Button>

            <Button
              className="button-max-width"
              onClick={() => handleMembersClick()}
            >
              <FiUsers /> Members
            </Button>

            {member.id === props.data.idCreatedBy && (
              <Button className="button-max-width" onClick={toggleDelete}>
                <AiOutlineDelete /> Delete
              </Button>
            )}
          </CardBody>
        </Card>
      </Collapse>
      <AreYouSureModal
        show={showModal}
        toggle={toggleDelete}
        handleYes={handleDeleteClick}
      />
    </div>
  );
};
