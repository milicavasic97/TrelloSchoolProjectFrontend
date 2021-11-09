import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";
import { AreYouSureModal } from "../../../global/components/AreYouSureModal";
import { toast } from "react-toastify";
import cardService from "../../../services/card.service";
import { useDispatch, useSelector } from "react-redux";
import { getComments, setReloadLists } from "../../../redux/slices/boardSlice";
import {
  handleDeleteError,
  handleEditError,
} from "../../../util/errorHandlers";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import { CardSettings } from "./CardSettings";
import { CardMembers } from "./CardMembers";
import { CardComments } from "./CardComments";

export const TrelloCard = (props) => {
  const dispatch = useDispatch();
  const { member } = useSelector((state) => state.members);
  const [cardData, setCardData] = useState(props.data);

  const [showModal, setShowModal] = useState(false);
  const toggle = () => {
    console.log(cardData);
    setShowModal(!showModal);
  };

  const [showCardModal, setShowCardModal] = useState(false);
  const toggleCardModal = () => {
    setShowCardModal(!showCardModal);
    // dispatch(getComments(cardData.id));
  };

  const updateCardHandler = (card) => {
    cardService
      .updateCard(card)
      .then((response) => {
        toast.success("Successfully updated!");
        setCardData(response.data);
      })
      .catch((err) => handleEditError(err));
  };

  var deleteCard = function () {
    cardService
      .deleteCard(cardData.id)
      .then((response) => {
        toast.success("Successfully deleted!");
        dispatch(setReloadLists());
      })
      .catch((err) => handleDeleteError(err));
    toggle();
  };

  return (
    <>
      <Draggable draggableId={cardData.id} index={props.id}>
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
            <div className="trello-card-name">{cardData.name}</div>
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
        <ModalHeader />
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <h5>Description</h5>
                <hr />
                <CardSettings data={cardData} updateFunc={updateCardHandler} />
              </Col>
              <Col className="card-members-col">
                <h5>Members</h5>
                <hr />
                <CardMembers data={cardData} />
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Comments</h5>
                <hr />
                <CardComments cardData={cardData} />
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};
