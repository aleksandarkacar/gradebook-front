import { useEffect, useState } from "react";
import { performAddStudent } from "../store/gradebooks/slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { singleGradebookSelector } from "../store/gradebooks/selectors";
import { performGetSingleGradebook } from "../store/gradebooks/slice";

export const AddStudentPage = () => {
  const params = useParams();
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    gradebook_id: params.id,
  });

  const singleGradebook = useSelector(singleGradebookSelector);

  const dispatch = useDispatch();
  const history = useHistory();
  const lastPage = history.location.state.from;
  console.log("history", lastPage);
  useEffect(() => {
    handleGetMyGradebook();
  }, []);

  const handleGetMyGradebook = () => {
    dispatch(performGetSingleGradebook(params.id));
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    dispatch(
      performAddStudent({
        data: newStudent,
        redirect: () => {
          history.goBack();
        },
      })
    );
    // history.goBack();
    // if (lastPage) {
    //   history.push(lastPage);
    // } else {
    //   history.push(`/gradebooks/${params.id}`); //TODO history ponekad ne pushuje ne znam zasto, samo ga vrati na istu AddStudentsPage stranu
    // }
  };

  console.log(history.location.state);

  return (
    <div>
      <h1>AddStudentPage:</h1>
      <div className="card-container">
        {localStorage.getItem("userId") == singleGradebook.user_id ? (
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Add Student:</h1>
              <form onSubmit={handleStudentSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={newStudent.first_name}
                    onChange={({ target }) =>
                      setNewStudent({ ...newStudent, first_name: target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={newStudent.last_name}
                    placeholder="Last Name"
                    onChange={({ target }) =>
                      setNewStudent({ ...newStudent, last_name: target.value })
                    }
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Student
                </button>
              </form>
            </div>
          </div>
        ) : (
          <p>You can only add Students to your own page.</p>
        )}
      </div>
    </div>
  );
};
