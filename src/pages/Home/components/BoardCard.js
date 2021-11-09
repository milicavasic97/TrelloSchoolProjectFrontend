import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AreYouSureModal } from "../../../global/components/AreYouSureModal";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getBoards } from "../../../redux/slices/organisationSlice";
import { handleDeleteError } from "../../../util/errorHandlers";
import { removeBoard } from "../../../redux/slices/boardSlice";
import boardService from "../../../services/board.service";

export const BoardCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => {
    setShowModal(!showModal);
  };

  var deleteBoard = function () {
    boardService
      .deleteBoard(props.data.id)
      .then((response) => {
        toast.success("Successfully deleted!");
        dispatch(getBoards(props.data.idOrganisation));
      })
      .catch((err) => handleDeleteError(err));
    toggle();
  };

  return (
    <>
      <div className="home-board-card home-board-card-color">
        <div className="board-card-settings">
          <FaTrash className="trash-icon" onClick={toggle} />
        </div>
        <Link to={`/board/${props.id}`}>
          <div className="home-board-content">
            <h5>{props.data.name}</h5>
            <p>{props.data.desc}</p>
          </div>
        </Link>
      </div>

      <AreYouSureModal
        show={showModal}
        toggle={toggle}
        handleYes={deleteBoard}
      />
    </>
  );
};
