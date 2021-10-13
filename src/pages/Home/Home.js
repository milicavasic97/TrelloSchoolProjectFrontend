import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "./Home.css";
import { Boards } from "./components/Boards";
import { Organisations } from "./components/Organisations";
import { Input } from "@material-ui/core";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrganisationsForMe,
  update,
} from "../../redux/slices/organisationSlice";
import { Members } from "./components/Members";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { handleEditError } from "../../util/errorHandlers";

export const Home = () => {
  const { t } = useTranslation();
  const { organisation, showBoards, showMembers } = useSelector(
    (state) => state.organisations
  );

  const { member } = useSelector((state) => state.members);
  const [name, setName] = useState("");
  const [changeName, setChangeName] = useState(false);
  const [description, setDescription] = useState("");
  const [changeDescription, setChangeDescription] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(organisation === null ? "" : organisation.displayName);
    setDescription(organisation === null ? "" : organisation.desc);
  }, [organisation]);

  useEffect(() => {
    dispatch(getAllOrganisationsForMe(member.id));
  }, []);

  var changeValueHandler = function (e, changeFunc, select) {
    if (e.key === "Enter") {
      changeFunc(false);
      let updateOrg = {
        id: organisation.id,
        name: organisation.name,
        displayName:
          select === "name" && e.target.target !== ""
            ? e.target.value
            : organisation.displayName,
        desc: select === "desc" ? e.target.value : organisation.desc,
      };

      dispatch(update(updateOrg))
        .then(unwrapResult)
        .then(() => {
          toast.success("Edited successfully!");
        })
        .catch((err) => handleEditError(err));
    } else if (e.key === "Escape") changeFunc(false);
  };

  return (
    <div className="home-background">
      <div className="page-padding-top trello-layout-overflow">
        <Container className=" trello-layout-overflow">
          <Row>
            <Col sm="12" md="6" lg="4">
              <Organisations />
            </Col>
            <Col sm="12" md="6" lg="8">
              {organisation === null ? (
                <div className="no-workspace-selected open-sans-font">
                  No workspace selected...
                </div>
              ) : (
                <div>
                  {changeName ? (
                    <Input
                      defaultValue={name}
                      className="organisation-input-org-name"
                      onKeyDown={(e) =>
                        changeValueHandler(
                          e,
                          (value) => setChangeName(value),
                          "name"
                        )
                      }
                      onBlur={(e) => setChangeName(false)}
                    />
                  ) : (
                    <h2>
                      {name}
                      <AiFillEdit
                        onClick={() => setChangeName(true)}
                        className="edit-icon"
                      />
                    </h2>
                  )}
                  {changeDescription ? (
                    <Input
                      defaultValue={description}
                      className="organisation-input-org-descr"
                      onKeyDown={(e) =>
                        changeValueHandler(
                          e,
                          (value) => setChangeDescription(value),
                          "desc"
                        )
                      }
                      onBlur={(e) => setChangeDescription(false)}
                    />
                  ) : (
                    <h3>
                      {description}
                      <AiFillEdit
                        onClick={() => setChangeDescription(true)}
                        className="edit-icon"
                      />
                    </h3>
                  )}
                </div>
              )}
              <div className="trello-org-info-container">
                {showBoards && <Boards />}
                {showMembers && <Members />}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
