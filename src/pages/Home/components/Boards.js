import React from 'react'
import { Card, CardTitle, Row, Col } from 'reactstrap';
import { FiPlus } from 'react-icons/fi';
import { BoardCard } from './BoardCard';


const array = [
    {
        'name': 'board aaa',
        'desc': 'description 1 abcs'
    },
    {
        'name': 'board bbb',
        'desc': 'description 2vfvfs dfdsabcs'
    },
    {
        'name': 'board bbb',
        'desc': 'description 2vfvfs dfdsabcs'
    },
    {
        'name': 'board bbb',
        'desc': 'description 2vfvfs dfdsabcs'
    },
    {
        'name': 'board bbb',
        'desc': 'description 2vfvfs dfdsabcs'
    }
]

export const Boards = () => {
    return (
        <div className="trello-org-info-container">
            <Row>
                {array.map((data, index) => {
                    return (
                        <Col md="3" sm="4">
                            <BoardCard key={index} data={data} />
                        </Col>
                    )
                })}
                <Col md="3" sm="4">
                    <Card body inverse className="home-board-card add-board-card-color">
                        <CardTitle tag="h5"><FiPlus/> Dodaj novi board...</CardTitle>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
