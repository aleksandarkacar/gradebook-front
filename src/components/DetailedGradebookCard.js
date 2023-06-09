import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  performAddComment,
  performDeleteComment,
  performDeleteGradebook,
} from "../store/gradebooks/slice";
import { useDispatch, useSelector } from "react-redux";
import { errorsSelector } from "../store/errors/selectors";
import { useEffect } from "react";
import { performResetErrors } from "../store/errors/slice";
import { StudentCard } from "./SingleStudentCard";

export const DetailedGradebookCard = ({ gradebook }) => {
  const [comment, setComment] = useState({
    body: "",
  });
  const [commentLength, setCommentLength] = useState(0);
  const history = useHistory();
  const errors = useSelector(errorsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(performResetErrors());
  }, []);

  useEffect(() => {}, [errors]);

  if (errors?.response?.status == 404) {
    return <h2>You do not have a gradebook</h2>;
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
    const descision = window.confirm(
      "Are you sure you want to delete the comment"
    );
    if (descision) {
      dispatch(performDeleteComment(id));
    }
  };

  const handleDeleteGradebook = () => {
    const descision = window.confirm(
      "Are you sure you want to delete the gradebook"
    );
    if (descision) {
      dispatch(
        performDeleteGradebook({
          data: gradebook.id,
          redirect: () => {
            history.push("/");
          },
        })
      );
    }
  };

  if (gradebook.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ marginBottom: "250px" }}>
      {gradebook.user.id == userId ? (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "auto" }}>
            <button className="button-link" onClick={() => goToAddStudents()}>
              Add Students
            </button>
            <button
              className="button-link"
              onClick={() => history.push(`/gradebooks/${gradebook.id}/edit`)}
            >
              Edit Gradebook
            </button>
          </div>
          <div style={{ justifyContent: "right" }}>
            <button
              className="button-link"
              onClick={() => handleDeleteGradebook()}
            >
              Delete Gradebook
            </button>
          </div>
        </div>
      ) : null}

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
        {gradebook?.students?.length > 0 ? (
          <div className="card-container">
            {gradebook.students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <p>No students found.</p>
        )}
        <hr />
        <h3>Comments</h3>
        {gradebook.comments.length > 0 ? (
          <div className="card-container">
            {gradebook.comments.map((comment) => (
              <div className="card" key={comment.id}>
                <h3>
                  {comment.user?.first_name} {comment.user?.last_name} says:
                </h3>
                <h5 style={{ margin: "20px" }} className="card-text">
                  {comment.body}
                </h5>
                {comment.user_id == localStorage.getItem("userId") ? (
                  <button
                    className="button-link"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete Comment
                  </button>
                ) : null}
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
            style={{ width: "50%", height: "150px" }}
          />
        </div>
        {errors?.response?.data?.errors?.body && (
          <li style={{ color: "red", listStyleType: "none" }}>
            *{errors.response.data.errors.body[0]}*
          </li>
        )}

        <button
          className={"button-link"}
          onClick={handleAddComment}
          style={{ marginegBottom: "300px" }}
          disabled={!commentLength}
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};
