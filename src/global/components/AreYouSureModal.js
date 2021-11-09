import React from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'

export const AreYouSureModal = (props) => {
    return (
        <div>
            <Modal isOpen={props.show} toggle={props.toggle} className="trello-modal">
                <ModalBody>
                    Are you sure?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={props.handleYes}>Yes</Button>
                    <Button color="primary" onClick={props.toggle}>No</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
