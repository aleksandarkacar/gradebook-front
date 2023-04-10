import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  performAddComment,
  performDele,
  performDeleteComment,
} from "../store/gradebooks/slice";
import { useDispatch } from "react-redux";

export const DetailedGradebookCard = ({ gradebook }) => {
  const [comment, setComment] = useState({
    body: "",
  });
  console.log(gradebook.id, comment);
  const [commentLength, setCommentLength] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  if (gradebook.length === 0) {
    return <p>Loading...</p>;
  }

  const userId = localStorage.getItem("userId");

  const createdAt = new Date(gradebook.created_at).toLocaleDateString("en-US", {
    hour: "2-digit",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const updatedAt = new Date(gradebook.updated_at).toLocaleDateString("en-US", {
    hour: "2-digit",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const goToAddStudents = () => {
    history.push(`/gradebooks/${gradebook.id}/students/create`, {
      from: history.location.pathname,
    });
  };

  const handleAddComment = () => {
    dispatch(performAddComment({ ...comment, gradebook_id: gradebook.id }));
    setComment({ body: "", gradebook_id: gradebook.id });
    setCommentLength(0);
  };

  const handleDeleteComment = (id) => {
    dispatch(performDeleteComment(id));
  };

  console.log(gradebook);

  return (
    <div>
      <div>
        {gradebook.user.id == userId ? (
          <button class="button-link" onClick={() => goToAddStudents()}>
            Add Students
          </button>
        ) : null}
      </div>

      <div>
        <h2>Gradebook Details</h2>
        <p>
          <strong>Name:</strong> {gradebook.name}
        </p>

        {/* <p>
        <strong>Created At:</strong> {createdAt}
      </p>
      <p>
        <strong>Updated At:</strong> {updatedAt}
      </p> */}

        <hr />
        <h2>Teacher Details</h2>
        {gradebook.user.first_name.length > 0 ? (
          <p>
            <strong>Name:</strong>{" "}
            {`${gradebook.user.first_name} ${gradebook.user.last_name}`}
          </p>
        ) : (
          <p>No Teacher Found.</p>
        )}

        {/* <p>
        <strong>Email:</strong> {gradebook.user.email}
      </p>
      <img
        className="card-img-top"
        src={gradebook.user.img_url}
        alt="Teacher"
        style={{ width: "150px", height: "150px" }}
      /> */}

        <hr />
        <h3>Students</h3>
        {gradebook.students.length > 0 ? (
          <ul style={{ listStyleType: "none" }}>
            {gradebook.students.map((student) => (
              <li key={student.id}>
                {student.first_name} {student.last_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No students found.</p>
        )}
        <hr />
        <h3>Comments</h3>
        {gradebook.comments.length > 0 ? (
          <div className="card-container">
            {gradebook.comments.map((comment) => (
              <div className="card" key={comment.id}>
                <h5 className="card-title">
                  {comment.user?.first_name} {comment.user?.last_name} says:{" "}
                  {comment.body}
                </h5>
                <button
                  className="button-link"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete Comment
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No comments found.</p>
        )}
        <div>
          <textarea
            placeholder="Type your comment here"
            value={comment.body}
            onChange={(e) => {
              setComment({ ...comment, body: e.target.value });
              setCommentLength(e.target.value.length);
            }}
          />
        </div>
        {commentLength > -1 ? (
          <button onClick={handleAddComment}>Submit</button>
        ) : null}
      </div>
    </div>
  );
};
