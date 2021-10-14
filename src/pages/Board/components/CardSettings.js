import React, { useState } from "react";
import {
  Input,
  FormGroup,
  Form,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";

export const CardSettings = (props) => {
  const [cardName, setCardName] = useState(props.data.name);
  const [cardDescription, setDescription] = useState(props.data.desc);
  const [hide, setHide] = useState("hide-validation");

  var updateCardHandler = function () {
    console.log(props.data);
    console.log(props.data.id);
    if (cardName !== "" || cardName !== null || cardName !== undefined) {
      setHide("hide-validation");
      console.log(cardName + " " + cardDescription);
      if (cardName !== "") {
        const card = {
          id: props.data.id,
          name: cardName,
          desc: cardDescription,
          pos: props.data.pos,
          idTrellolist: props.data.idTrellolist,
          url: props.data.url,
          due: props.data.due,
          dueComplete: props.data.dueComplete,
          dateLastActivity: props.data.dateLastActivity,
          closed: props.data.closed,
          shortLink: props.data.shortLink,
          shortUrl: props.data.shortUrl,
          subscribed: props.data.subscribed,
        };
        props.updateFunc(card);
      } else setHide("validation");
    }
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            defaultValue={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <Label className={hide}>Cannot be empty</Label>
        </FormGroup>

        <br />
        <FormGroup>
          <Label>Description</Label>
          <Input
            type="textarea"
            defaultValue={cardDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>

        <br />
        <FormGroup>
          <Button className="card-settings-button" onClick={updateCardHandler}>
            Save changes
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};
