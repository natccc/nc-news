import React, { useEffect, useState, useContext } from "react";
import { postComment } from "../lib/api";
import { Button } from "./Button";
import SuccessUpload from "./SuccessBox";
import ErrorMsg from "./ErrorMsg";
import { UserContext } from "../contexts/User";
const NewCommentCard = (props) => {
  const { article_id, setComments } = props;
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { username } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("posting");
    postComment(article_id, { username: username, body: input })
      .then((res) => {
        setStatus(null);
        setInput("");
        setShowModal(true);
        setComments((currComments) => {
          return [res, ...currComments];
        });
      })
      .catch(() => {
        setStatus("error");
      });
  };

  if (showModal === true) {
    setTimeout(() => {
      setShowModal(false);
    }, "3000");
  }

  return (
    <div
      id="comment"
      className="rounded-xl border bg-white p-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          type="text"
          disabled={status === "posting" || username === "guest"}
          required
          rows={3}
          className=" mx-2 block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Add your comment..."
          border="hidden"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <div className="text-right">
          {" "}
          <Button
            type="button"
            className="mr-3"
            variant={"subtle"}
            disabled={status === "posting" || input === ""}
            onClick={(e) => {
              setInput("");
            }}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-800 hover:bg-red-900 "
            type="submit"
            disabled={status === "posting" || input === ""}
          >
            Post
          </Button>
          {status === "posting" && <p className="mr-2 mt-2">Posting...</p>}
        </div>
        {showModal && (
          <SuccessUpload
            message="Successfully posted"
            setShowModal={setShowModal}
          />
        )}
        {status === "error" && <ErrorMsg />}
        {username === "guest" && (
          <p className="text-sm text-red-800">
            You need to login to post a comment
          </p>
        )}
      </form>
    </div>
  );
};

export default NewCommentCard;
