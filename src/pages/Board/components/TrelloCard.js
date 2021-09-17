import React from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';


export const TrelloCard = (props) => {

    return (
        <div className="trello-card-container">
            <div className="trello-card-settings">
                <AiFillEdit className="edit-icon" /> <FaTrash className="trash-icon" />
            </div>
            <div className="trello-card-name">
                {props.data.name}
            </div>
        </div>
    )
}
