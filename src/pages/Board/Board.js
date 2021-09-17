import React, { useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import './Board.css';
import { TrelloList } from './components/TrelloList';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, 
    Form, Label, Col, Input, FormGroup } from 'reactstrap';
import { AiFillEdit } from 'react-icons/ai';


const trelloList = [
    {
        'name': 'list 1 dfgfdgfdgdffd'
    },
    {
        'name': 'list 2'
    },
    {
        'name': 'list 3'
    },
    {
        'name': 'list 4'
    },
    {
        'name': 'list 4'
    },
    // {
    //     'name': 'list 4'
    // },
    // {
    //     'name': 'list 4'
    // },
    // {
    //     'name': 'list 4'
    // }
]

export const Board = (props) => {
    const [addModal, setAddModal] = useState(false);
    const toggle = () => setAddModal(!addModal);

    return (
        <div className="home-background" >
            <div className="page-padding-top" >
                <span>
                    <label className="abril-fatface-font trello-list-board-name" >
                        Board name <AiFillEdit className="edit-icon"/>
                    </label>
                    <Button className="trello-list-buttons" onClick={toggle}>+Dodaj trello list</Button>
                    <Button className="trello-list-buttons" >Upravljanje ucesnicima</Button>
                </span>
                <div className="trello-lists-scroll-menu">
                    <ScrollMenu>
                        {trelloList.map((data, index) =>{
                            return (
                                <TrelloList key={index} data={data} />
                            )
                        })}
                    </ScrollMenu>
                </div>
            </div>

            <Modal isOpen={addModal} toggle={toggle} className="trello-modal">
                <ModalHeader>
                    Dodaj trello listu
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label for="org-name" sm={2}>Naziv</Label>
                            <Col sm={10}>
                                <Input id="org-name" type="text" placeholder="Unseite naziv trello liste..." />
                            </Col>
                        </FormGroup>
                        <br />
                        <FormGroup row>
                            <Label for="org-description" sm={2}>Opis</Label>
                            <Col sm={10}>
                                <Input id="org-description" type="textarea" placeholder="Unseite opis za trello liste..." />
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">Sacuvaj</Button>
                    <Button color="secondary" onClick={toggle}>Odustani</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
