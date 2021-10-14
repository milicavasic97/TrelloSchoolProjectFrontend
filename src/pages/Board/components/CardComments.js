import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Input, FormGroup, Label, Button } from "reactstrap";
import { AreYouSureModal } from "../../../global/components/AreYouSureModal";
import cardService from "../../../services/card.service";
import { handleDeleteError } from "../../../util/errorHandlers";

export const CardComments = (props) => {
  const [reloadComments, setReloadComments] = useState(false);
  const [text, setText] = useState("");
  const { member } = useSelector((state) => state.members);
  const [showModal, setShowModal] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [comments, setComments] = useState([]);
  const toggle = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    cardService
      .getComments(props.cardData.id)
      .then((response) => setComments(response.data));
  }, [, reloadComments]);

  const addNewComment = () => {
    if (text !== "" && text !== null && text !== undefined) {
      const comment = {
        text: text,
        idCard: props.cardData.id,
        idMember: member.id,
      };
      console.log(comment);
      cardService
        .addComment(comment)
        .then((result) => {
          //   comments.splice(result.data);
          setReloadComments(!reloadComments);
          setText("");
        })
        .catch((err) => toast.error("Failed"));
    }
  };

  var deleteComment = function () {
    cardService
      .removeComment(props.cardData.id, commentId)
      .then((response) => {
        toast.success("Successfully deleted");
        setReloadComments(!reloadComments);
      })
      .catch((err) => handleDeleteError(err));
    toggle();
    setCommentId("");
  };

  var handleDeleteComment = function (id) {
    setCommentId(id);
    toggle();
  };

  return (
    <div>
      {comments.length === 0 || comments === undefined || comments === null ? (
        <div className="no-comments">No comments...</div>
      ) : (
        <>
          {comments.map((data, index) => {
            return (
              <div className="card-comment" key={data.id}>
                <div className="comment-author">
                  {data.member.fullName}{" "}
                  <FiTrash2
                    className="comment-trash-icon"
                    onClick={() => handleDeleteComment(data.id)}
                  />
                </div>
                <div className="comment-text">{data.text}</div>
              </div>
            );
          })}
        </>
      )}
      <div className="new-comment">
        <FormGroup>
          <Label>Add new comment:</Label>
          <Input
            value={text}
            type="textarea"
            placeholder="Write your comment here..."
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <Button onClick={addNewComment}>Add comment</Button>
        </FormGroup>
      </div>
      <AreYouSureModal
        show={showModal}
        toggle={toggle}
        handleYes={deleteComment}
      />
    </div>
  );
};
