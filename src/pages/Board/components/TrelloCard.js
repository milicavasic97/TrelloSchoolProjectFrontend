import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";
import { AreYouSureModal } from "../../../global/components/AreYouSureModal";
import { toast } from "react-toastify";
import cardService from "../../../services/card.service";
import { useDispatch } from "react-redux";
import {
  setReloadCards,
  setReloadLists,
} from "../../../redux/slices/boardSlice";
import { handleDeleteError } from "../../../util/errorHandlers";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
} from "reactstrap";

export const TrelloCard = (props) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const toggle = () => {
    setShowModal(!showModal);
  };

  const [showCardModal, setShowCardModal] = useState(false);
  const toggleCardModal = () => {
    setShowCardModal(!showCardModal);
  };

  var deleteCard = function () {
    cardService
      .deleteCard(props.data.id)
      .then((response) => {
        toast.success("Successfully deleted!");
        dispatch(setReloadLists());
      })
      .catch((err) => handleDeleteError(err));
    toggle();
  };

  return (
    <>
      <Draggable draggableId={props.data.id} index={props.id}>
        {(provided) => (
          <div
            className="trello-card-container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style }}
            onDoubleClick={toggleCardModal}
          >
            <div className="trello-card-settings">
              <AiFillEdit className="edit-icon" onClick={toggleCardModal} />
              <FaTrash className="trash-icon" onClick={toggle} />
            </div>
            <div className="trello-card-name">{props.data.name}</div>
          </div>
        )}
      </Draggable>

      <AreYouSureModal
        show={showModal}
        toggle={toggle}
        handleYes={deleteCard}
      />

      <Modal
        isOpen={showCardModal}
        toggle={toggleCardModal}
        className="trello-modal"
        size="lg"
      >
        <ModalHeader>Card settings</ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row></Row>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};
