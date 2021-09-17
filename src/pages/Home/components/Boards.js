import React, { useState } from 'react'
import { Card, CardTitle, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, 
    Label, Input, Button } from 'reactstrap';
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
    const [addModal, setAddModal] = useState(false);
    const toggle = () => setAddModal(!addModal);

    return (
        <div className="trello-org-info-container">
            <Row>
                {array.map((data, index) => {
                    return (
                        <Col key={index} md="3" sm="4">
                            <BoardCard  data={data} id={'1'} />
                        </Col>
                    )
                })}
                <Col md="3" sm="4">
                    <Card body inverse className="home-board-card add-board-card-color"
                        onClick={toggle}>
                        <CardTitle tag="h5"><FiPlus/> Dodaj novi board...</CardTitle>
                    </Card>
                </Col>
            </Row>
            
            <Modal isOpen={addModal} toggle={toggle} className="trello-modal">
                <ModalHeader>
                    Dodaj novi board
                </ModalHeader>
                <ModalBody>
                    <FormGroup row>
                        <Label for="board-name-id" sm={2}>Naziv</Label>
                        <Col sm={10}>
                            <Input id="board-name-id" type="text"
                                placeholder="Unseite naziv boarda..." />
                        </Col>
                    </FormGroup>
                    <br />
                    <FormGroup row>
                        <Label for="board-desc-id" sm={2}>Opis</Label>
                        <Col sm={10}>
                            <Input id="board-desc-id" type="textarea"
                                placeholder="Unesite opis boarda..." />
                        </Col>
                    </FormGroup>
                    <br />
                    <FormGroup row>
                        <Label for="members-select-id" sm={2}>Dodaj clanove</Label>
                        <Col sm={10}>
                            <Input type="select" id="members-select-id">
                                <option>Nista</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>5</option>
                                <option>5</option>
                                <option>5</option>
                                <option>5</option>
                                <option>5</option>

                            </Input>
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">Sacuvaj</Button>
                    <Button color="secondary" onClick={toggle}>Odustani</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
