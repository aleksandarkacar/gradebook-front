import { useState } from "react";
import { errorsSelector } from "../store/errors/selectors";
import { performResetErrors } from "../store/errors/slice";
import { useDispatch, useSelector } from "react-redux";

const AddComment = ({ onCommentAdded }) => {
  const [commentContent, setCommentContent] = useState("");

  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const errors = useSelector(errorsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(performResetErrors());
  }, []);

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
        <button className="button-link" type="submit">
          Add Comment
        </button>
      </div>
    </form>
  );
};
