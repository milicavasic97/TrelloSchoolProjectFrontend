import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { TrelloCard } from './TrelloCard';

const trelloCards = [
    { 
        'name': 'card1 ffds fdfj fdhjfdh fdhfkd fdk fhdkf dhf dfkshfds fd kds fdnjkffdsd hdshfjsfhj fdfds fdsfsd fsfs fds',
        'decr': 'Opis prve kartice'
    },
    {
        'name': 'card2',
        'decr': 'Opis prve kartice'
    },
    {
        'name': 'card3',
        'decr': 'Opis prve kartice'
    },
    {
        'name': 'card4',
        'decr': 'Opis prve kartice'
    }
]

export const TrelloList = (props) => {


    return (
        <div className="trello-list-container">
            <div className="trello-list-header">
                <div className="trello-list-settings">
                    <AiFillEdit className="edit-icon" /> <FaTrash className="trash-icon" />
                </div>
                <div className="trello-list-name">
                    {props.data.name}
                </div>
            </div>
            <hr />
            <div className="trello-list-cards">
                {trelloCards.map((data, index) => {
                    return(
                        <TrelloCard key={index} data={data} />
                    )
                })}
            </div>
        </div>
    )
}