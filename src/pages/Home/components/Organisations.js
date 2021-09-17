import { Button, Tooltip } from '@material-ui/core';
import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button as ButtonRS, Form, Label, Col, Input, FormGroup } from 'reactstrap';
import { OrganisationCollapse } from './OrganisationCollapse'

export const Organisations = () => {
    const [addModal, setAddModal] = useState(false);
    const toggle = () => setAddModal(!addModal);

    return (
        <>
            <div className="trello-org-add-new">
                ORGANISATIONS
                <Tooltip title="Dodaj organizaciju" arrow>
                    <Button onClick={toggle} className="trello-add-org-button">
                        <FiPlus className="trello-org-plus"  />
                    </Button>
                </Tooltip>
            </div>
            <hr/>
            <div className="trello-home-org-list">
                <OrganisationCollapse name="org1" />
                <OrganisationCollapse name="org2" />
                <OrganisationCollapse name="org2" />
                <OrganisationCollapse name="org2" />
            </div>

            <Modal isOpen={addModal} toggle={toggle} className="trello-modal">
                <ModalHeader>
                    Dodaj organizaciju
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label for="org-name" sm={2}>Naziv</Label>
                            <Col sm={10}>
                                <Input id="org-name" type="text" placeholder="Unseite naziv organizacije..." />
                            </Col>
                        </FormGroup>
                        <br />
                        <FormGroup row>
                            <Label for="org-description" sm={2}>Opis</Label>
                            <Col sm={10}>
                                <Input id="org-description" type="textarea" placeholder="Unseite opis za organizaciju..." />
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <ButtonRS color="primary">Sacuvaj</ButtonRS>
                    <ButtonRS color="secondary" onClick={toggle}>Odustani</ButtonRS>
                </ModalFooter>
            </Modal>
        </>
    )
}
