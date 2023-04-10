import React, { useState } from "react";

const AddComment = ({ onCommentAdded }) => {
  const [commentContent, setCommentContent] = useState("");

  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (commentContent.trim()) {
      onCommentAdded(commentContent);
      setCommentContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          placeholder="Type your comment here"
          value={commentContent}
          onChange={handleCommentChange}
        />
      </div>
      <div>
        <button type="submit">Add Comment</button>
      </div>
    </form>
  );
};
