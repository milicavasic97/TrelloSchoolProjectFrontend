import React from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';

export const BoardCard = (props) => {
    return (
        <Card body inverse className="home-board-card home-board-card-color">
            <CardTitle tag="h5">{props.data.name}</CardTitle>
            <CardText>{props.data.desc}</CardText>
        </Card>
    )
}
