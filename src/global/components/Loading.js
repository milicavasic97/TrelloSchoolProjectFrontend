import { LinearProgress } from '@material-ui/core';
import React from 'react'
import './Loading.css';

export const Loading = () => {
    return (
        <div className="loader-container">
            <div className="loader-content abril-fatface-font">
                Trello
                <LinearProgress color="primary"/>
            </div>
        </div>
    )
}
