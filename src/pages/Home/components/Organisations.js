import { Button, Tooltip } from '@material-ui/core';
import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { OrganisationCollapse } from './OrganisationCollapse'

export const Organisations = () => {
    return (
        <>
            <div className="trello-org-add-new">
                ORGANISATIONS
                <Tooltip title="Dodaj organizaciju" arrow>
                    <Button className="trello-add-org-button">
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
        </>
    )
}
