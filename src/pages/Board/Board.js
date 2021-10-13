import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "./Board.css";
import { TrelloList } from "./components/TrelloList";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Form,
  Label,
  Col,
  Input,
  FormGroup,
} from "reactstrap";
import { AiFillEdit } from "react-icons/ai";
import { Input as InputMUI } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoardById,
  getLists,
  setReloadLists,
  updateBoard,
} from "../../redux/slices/boardSlice";
import listService from "../../services/list.service";
import { DragDropContext } from "react-beautiful-dnd";
import { handleInsertError } from "../../util/errorHandlers";
import cardService from "../../services/card.service";

export const Board = (props) => {
  const { trelloLists, board, reloadLists } = useSelector(
    (state) => state.boards
  );
  const [addModal, setAddModal] = useState(false);
  const toggle = () => setAddModal(!addModal);
  const [trelloListsState, setTrelloListsState] = useState(trelloLists);
  const dispatch = useDispatch();
  const [changeName, setChangeName] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(board === null ? "" : board.name);
  }, [board]);

  useEffect(() => {
    setTrelloListsState([...trelloLists]);
    // console.log(trelloLists);
  }, [trelloLists]);

  useEffect(() => {
    dispatch(getBoardById(props.boardId));
    dispatch(getLists(props.boardId));
  }, [, reloadLists]);

  var addTrelloList = function (e) {
    if (e.key === "Enter") {
      const newList = {
        name: e.target.value,
        idBoard: props.boardId,
      };
      listService
        .insertList(newList)
        .then(() => {
          dispatch(getLists(props.boardId));
        })
        .catch((error) => handleInsertError(error));
    }
  };

  var changeValueHandler = function (e, changeFunc) {
    if (e.key === "Enter") {
      changeFunc(false);
      let boardUpdate = {
        id: board.id,
        name: e.target.value,
        desc: board.desc,
        idOrganisation: board.idOrganisation,
      };

      dispatch(updateBoard(boardUpdate));
    } else if (e.key === "Escape") changeFunc(false);
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    // if (source.droppableId !== destination.droppableId) {
    //   const sourceColumn = columns[source.droppableId];
    //   const destColumn = columns[destination.droppableId];
    //   const sourceItems = [...sourceColumn.cards];
    //   const destItems = [...destColumn.cards];
    //   const [removed] = sourceItems.splice(source.index, 1);
    //   destItems.splice(destination.index, 0, removed);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...sourceColumn,
    //       cards: sourceItems,
    //     },
    //     [destination.droppableId]: {
    //       ...destColumn,
    //       cards: destItems,
    //     },
    //   });
    // } else {
    //   const column = columns[source.droppableId];
    //   const copiedItems = [...column.items];
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...column,
    //       items: copiedItems,
    //     },
    //   });
    // }

    // console.log(result);

    let cardUpdate = {
      id: result.draggableId,
      pos: result.destination.index,
      idTrellolist: result.destination.droppableId,
    };

    cardService
      .updateCard(cardUpdate)
      .then((response) => dispatch(setReloadLists()));
  };

  return (
    <div className="home-background">
      <div className="page-padding-top">
        <span className="trello-list-board-name">
          {changeName ? (
            <InputMUI
              defaultValue={name}
              className="board-input-name"
              onKeyDown={(e) =>
                changeValueHandler(e, (value) => setChangeName(value))
              }
              onBlur={(e) => setChangeName(false)}
            />
          ) : (
            <label className="abril-fatface-font ">
              {board !== null && board.name}
              <AiFillEdit
                className="edit-icon"
                onClick={() => setChangeName(true)}
              />
            </label>
          )}
        </span>
        <div className="trello-lists-scroll-menu">
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(result, trelloListsState, (state) =>
                setTrelloListsState()
              )
            }
          >
            <ScrollMenu>
              {trelloListsState.map((data, index) => {
                return <TrelloList key={data.id} data={data} index={index} />;
              })}
              <div className="trello-list-container ">
                <InputMUI
                  className="add-new-list-input"
                  placeholder="+ Add new list..."
                  onKeyDown={(e) => addTrelloList(e)}
                />
              </div>
            </ScrollMenu>
          </DragDropContext>
        </div>
      </div>

      <Modal isOpen={addModal} toggle={toggle} className="trello-modal">
        <ModalHeader>Dodaj trello listu</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="org-name" sm={2}>
                Naziv
              </Label>
              <Col sm={10}>
                <Input id="org-name" type="text" placeholder="Input name..." />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label for="org-description" sm={2}>
                Opis
              </Label>
              <Col sm={10}>
                <Input
                  id="org-description"
                  type="textarea"
                  placeholder="Input description..."
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Save</Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
