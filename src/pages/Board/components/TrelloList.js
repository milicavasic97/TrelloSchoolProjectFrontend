import React, { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { TrelloCard } from "./TrelloCard";
import { Input } from "@material-ui/core";
import listService from "../../../services/list.service";
import {
  handleDeleteError,
  handleEditError,
  handleInsertError,
} from "../../../util/errorHandlers";
import { toast } from "react-toastify";
import { AreYouSureModal } from "../../../global/components/AreYouSureModal";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../../../redux/slices/boardSlice";
import cardService from "../../../services/card.service";
import { Droppable } from "react-beautiful-dnd";

export const TrelloList = (props) => {
  let [listData, setListData] = useState({
    id: props.data.id,
    name: props.data.name,
    pos: props.data.pos,
    idBoard: props.data.idBoard,
    cards: props.data.cards,
  });
  const [changeName, setChangeName] = useState(false);
  const [trelloCards, setTrelloCards] = useState([]);
  const dispatch = useDispatch();
  const [cardAdded, setCardAdded] = useState(false);
  const { reloadLists } = useSelector((state) => state.boards);

  useEffect(() => {
    listService
      .getAllCards(props.data.id)
      .then((response) => setTrelloCards(response.data));

    // console.log(listData);
  }, [, cardAdded, reloadLists]);

  var changeNameHandler = function (e, changeFunc) {
    if (e.key === "Enter") {
      changeFunc(false);
      listData.name = e.target.value;
      listService
        .updateList(listData)
        .then((response) => setListData(response.data))
        .catch((err) => handleEditError(err));
    } else if (e.key === "Escape") {
      // cardRef.current.focus(false);
      changeFunc(false);
    }
  };

  var addCardHandler = function (e) {
    if (e.key === "Enter") {
      const newCard = {
        name: e.target.value,
        idTrellolist: props.data.id,
      };
      cardService
        .insertCard(newCard)
        .then((response) => {
          toast.success("Added successfully");
          setCardAdded(!cardAdded);
          e.target.value = "";
        })
        .catch((err) => handleInsertError(err));
    }
  };

  const [showModal, setShowModal] = useState(false);
  const toggle = () => {
    setShowModal(!showModal);
  };

  var deleteList = function () {
    listService
      .deleteList(props.data.id)
      .then((response) => {
        toast.success("Successfully deleted!");
        dispatch(getLists(props.data.idBoard));
      })
      .catch((err) => handleDeleteError(err));
    toggle();
  };

  return (
    <div>
      <div className="trello-list-container">
        <div className="trello-list-header">
          <div className="trello-list-settings">
            <AiFillEdit
              className="edit-icon"
              onClick={() => setChangeName(true)}
            />
            <FaTrash className="trash-icon" onClick={toggle} />
          </div>
          <div className="trello-list-name">
            {changeName ? (
              <Input
                defaultValue={listData.name}
                onKeyDown={(e) =>
                  changeNameHandler(e, (value) => setChangeName(value))
                }
                onBlur={(e) => setChangeName(false)}
              />
            ) : (
              <>{listData.name}</>
            )}
          </div>
        </div>
        <hr />
        <div className="trello-list-cards">
          <Droppable
            droppableId={props.data.id}
            type="CARDS"
            index={props.index}
          >
            {(provided) => (
              <div
                className="droppable-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {trelloCards.map((data, index) => {
                  return <TrelloCard key={data.id} data={data} id={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="trello-card-container">
            <Input
              placeholder="+ Add new card..."
              className="add-new-card-input"
              onKeyDown={(e) => addCardHandler(e)}
            />
          </div>
        </div>
      </div>
      <AreYouSureModal
        show={showModal}
        toggle={toggle}
        handleYes={deleteList}
      />
    </div>
  );
};
