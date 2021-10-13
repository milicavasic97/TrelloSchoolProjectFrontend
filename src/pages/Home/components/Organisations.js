import { Button, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button as ButtonRS,
  Form,
  Label,
  Col,
  Input,
  FormGroup,
} from "reactstrap";
import {
  getAllOrganisationsForMe,
  insert,
} from "../../../redux/slices/organisationSlice";
import { OrganisationCollapse } from "./OrganisationCollapse";

export const Organisations = () => {
  const { t } = useTranslation();
  const { organisationList, organisation } = useSelector(
    (state) => state.organisations
  );
  const { member } = useSelector((state) => state.members);
  const [orgName, setOrgName] = useState("");
  const [orgDisplayName, setOrgDisplayName] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const dispatch = useDispatch();

  var changeValueHandler = function (e, setFunc) {
    setFunc(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllOrganisationsForMe(member.id));
  }, [organisation]);

  const saveOrganisation = () => {
    dispatch(
      insert({
        displayName: orgDisplayName,
        desc: orgDescription,
      })
    );
    toggle();
  };

  const [addModal, setAddModal] = useState(false);
  const toggle = () => {
    setAddModal(!addModal);
    setOrgName("");
    setOrgDescription("");
  };

  return (
    <div className="trello-organisations-container rajdhani-font">
      <div className="trello-org-add-new">
        WORKSPACES
        <Tooltip title="Dodaj organizaciju" arrow>
          <Button onClick={toggle} className="trello-add-org-button">
            <FiPlus className="trello-org-plus" />
          </Button>
        </Tooltip>
      </div>
      <hr />
      <div className="trello-home-org-list">
        {organisationList.length === 0 ? (
          <div className="no-workspaces open-sans-font">
            No workspaces to show...
          </div>
        ) : (
          <>
            {organisationList.map((data, index) => {
              return (
                <OrganisationCollapse
                  key={data.id}
                  name={data.displayName}
                  identifier={data.id}
                  data={data}
                />
              );
            })}
          </>
        )}
      </div>

      <Modal isOpen={addModal} toggle={toggle} className="trello-modal">
        <ModalHeader>Add workspace</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="org-displayName" sm={2}>
                Naziv
              </Label>
              <Col sm={10}>
                <Input
                  id="org-name"
                  type="text"
                  defaultValue={orgDisplayName}
                  placeholder="Unseite naziv organizacije..."
                  onChange={(e) =>
                    changeValueHandler(e, (value) => setOrgDisplayName(value))
                  }
                />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label for="org-description" sm={2}>
                Opis
              </Label>
              <Col sm={10}>
                <Input
                  id="org-description"
                  type="textarea"
                  defaultValue={orgDescription}
                  placeholder="Unseite opis za organizaciju..."
                  onChange={(e) =>
                    changeValueHandler(e, (value) => setOrgDescription(value))
                  }
                />
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <ButtonRS color="primary" onClick={saveOrganisation}>
            Sacuvaj
          </ButtonRS>
          <ButtonRS color="secondary" onClick={toggle}>
            Odustani
          </ButtonRS>
        </ModalFooter>
      </Modal>
    </div>
  );
};
