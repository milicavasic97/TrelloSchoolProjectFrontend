import React, { useEffect, useState } from "react";
import {
  Card,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { FiPlus } from "react-icons/fi";
import { BoardCard } from "./BoardCard";
import { useDispatch, useSelector } from "react-redux";
import boardService from "../../../services/board.service";
import { getBoards } from "../../../redux/slices/organisationSlice";

export const Boards = () => {
  const { boards, organisation } = useSelector((state) => state.organisations);
  const [boardsList, setBoardsList] = useState(boards);
  const dispatch = useDispatch();
  const [addModal, setAddModal] = useState(false);
  const toggle = () => setAddModal(!addModal);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const saveBoard = () => {
    const newBoard = {
      name: name,
      desc: description,
      idOrganisation: organisation.id,
    };
    boardService.insertBoard(newBoard).then((result) => {
      dispatch(getBoards(organisation.id));
      return result.data;
    });

    toggle();
  };

  useEffect(() => {
    setBoardsList(boards);
  }, [boards]);

  return (
    <>
      <Row>
        {boardsList.map((data, index) => {
          return (
            <Col key={index}>
              <BoardCard data={data} id={data.id} />
            </Col>
          );
        })}
        <Col>
          <div
            className="home-board-card add-board-card-color"
            onClick={toggle}
          >
            <h5 className="home-board-content ">
              <FiPlus /> Dodaj novi board...
            </h5>
          </div>
        </Col>
        <Col></Col>
      </Row>

      <Modal isOpen={addModal} toggle={toggle} className="trello-modal">
        <ModalHeader>Dodaj novi board</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label for="board-name-id" sm={2}>
              Naziv
            </Label>
            <Col sm={10}>
              <Input
                id="board-name-id"
                type="text"
                defaultValue={name}
                placeholder="Unseite naziv boarda..."
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </FormGroup>
          <br />
          <FormGroup row>
            <Label for="board-desc-id" sm={2}>
              Opis
            </Label>
            <Col sm={10}>
              <Input
                id="board-desc-id"
                type="textarea"
                defaultValue={description}
                placeholder="Unesite opis boarda..."
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveBoard}>
            Sacuvaj
          </Button>
          <Button color="secondary" onClick={toggle}>
            Odustani
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
