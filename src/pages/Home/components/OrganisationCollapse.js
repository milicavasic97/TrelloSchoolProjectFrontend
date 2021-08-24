import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { FiUsers } from 'react-icons/fi';
import { Collapse, CardBody, Card } from 'reactstrap';
import { HiOutlineViewBoards } from "react-icons/hi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";


export const OrganisationCollapse = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Button  onClick={toggle} className="button-max-width button-org-color">
                {props.name}  {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <Button className="button-max-width">
                            <HiOutlineViewBoards /> Boards
                        </Button>

                        <Button className="button-max-width">
                            <FiUsers/> Members
                        </Button>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
}
