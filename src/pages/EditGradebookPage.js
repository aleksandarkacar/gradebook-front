import { useEffect, useState } from "react";
import {
  performEditGradebook,
  performGetSingleGradebook,
} from "../store/gradebooks/slice";
import { useDispatch, useSelector } from "react-redux";
import { performGetAvailableTeachers } from "../store/teachers/slice";
import { availableTeachersSelector } from "../store/teachers/selectors";
import { errorsSelector } from "../store/errors/selectors";
import { performResetErrors } from "../store/errors/slice";
import { useHistory, useParams } from "react-router-dom";
import { singleGradebookSelector } from "../store/gradebooks/selectors";
import { DeleteStudentCard } from "../components/DeleteStudentCard";

export const EditGradebookPage = () => {
  const params = useParams();
  const [editedGradebook, setEditedGradebook] = useState({
    name: "",
    user_id: 0,
    students: [],
    comments: [],
  });

  const availableTeachers = useSelector(availableTeachersSelector);

  const errors = useSelector(errorsSelector);
  const gradebook = useSelector(singleGradebookSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleGetAvailableTeachers = () => {
    dispatch(performGetAvailableTeachers());
    dispatch(performGetSingleGradebook(params.id));
  };

  useEffect(() => {
    handleGetAvailableTeachers();
    return () => dispatch(performResetErrors());
  }, []);

  useEffect(() => {
    setEditedGradebook(gradebook);
    return () => dispatch(performResetErrors());
  }, [gradebook]);

  const handleGradebookSubmit = (e) => {
    e.preventDefault();
    console.log(editedGradebook.user_id == localStorage.getItem("userId"));
    if (editedGradebook.user_id == localStorage.getItem("userId")) {
      const { user_id, ...editedGradebookNoUID } = editedGradebook;
      console.log(editedGradebookNoUID);
      dispatch(
        performEditGradebook({
          data: { ...editedGradebookNoUID },
          redirect: () => {
            history.goBack();
          },
        })
      );
    } else {
      dispatch(
        performEditGradebook({
          data: { ...editedGradebook },
          redirect: () => {
            history.push(`./gradebooks/`);
          },
        })
      );
    }
  };

  return (
    <div>
      <h1>Edit Gradebook Page:</h1>
      <div className="card-container">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Edit Gradebook:</h1>
            <form onSubmit={handleGradebookSubmit}>
              <div className="form-group">
                <label htmlFor="first_name">Gradebook Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={editedGradebook.name}
                  onChange={({ target }) =>
                    setEditedGradebook({
                      ...editedGradebook,
                      name: target.value,
                    })
                  }
                />
                <div>
                  {errors?.response?.data?.errors?.name && (
                    <li style={{ color: "red", listStyleType: "none" }}>
                      *{errors.response.data.errors.name[0]}*
                    </li>
                  )}
                  <label htmlFor="teacher_id">Select a teacher:</label>
                  <select
                    onChange={(e) =>
                      setEditedGradebook({
                        ...editedGradebook,
                        user_id: e.target.value,
                      })
                    }
                    name="teacher_id"
                    id="teacher_id"
                  >
                    <option value={gradebook?.user?.id}>
                      {gradebook?.user?.first_name} {gradebook?.user?.last_name}
                    </option>
                    {availableTeachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.first_name} {teacher.last_name}
                      </option>
                    ))}
                  </select>
                  {errors?.response?.data?.errors?.user_id && (
                    <li style={{ color: "red", listStyleType: "none" }}>
                      *{errors.response.data.errors.user_id[0]}*
                    </li>
                  )}
                </div>
                <label>
                  Currently selected user ID: {editedGradebook.user_id}
                </label>
              </div>
              <button type="submit" className="button-link">
                Submit Edit
              </button>
            </form>
          </div>
        </div>
      </div>

      <hr></hr>
      <h3>Students</h3>

      {gradebook?.students?.length > 0 ? (
        <div className="card-container">
          {gradebook.students.map((student) => (
            <DeleteStudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};
