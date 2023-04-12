import { useEffect, useState } from "react";
import { performAddStudent } from "../store/gradebooks/slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { singleGradebookSelector } from "../store/gradebooks/selectors";
import { performGetSingleGradebook } from "../store/gradebooks/slice";
import { errorsSelector } from "../store/errors/selectors";
import { performResetErrors } from "../store/errors/slice";

export const AddStudentPage = () => {
  const params = useParams();
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    img_url: "",
    gradebook_id: params.id,
  });

  const singleGradebook = useSelector(singleGradebookSelector);

  const errors = useSelector(errorsSelector);
  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    handleGetMyGradebook();
    return () => dispatch(performResetErrors());
  }, []);

  const handleGetMyGradebook = () => {
    dispatch(performGetSingleGradebook(params.id));
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    const from = history?.location?.state?.from;
    if (from == undefined) {
      dispatch(
        performAddStudent({
          data: newStudent,
          redirect: () => {
            history.push(`/gradebooks/${params.id}`);
          },
        })
      );
    }
    dispatch(
      performAddStudent({
        data: newStudent,
        redirect: () => {
          history.push(from);
        },
      })
    );
  };

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
                  />
                  {errors?.response?.data?.errors?.first_name && (
                    <li style={{ color: "red", listStyleType: "none" }}>
                      *{errors.response.data.errors.first_name[0]}*
                    </li>
                  )}
                  <input
                    type="text"
                    className="form-control"
                    value={newStudent.last_name}
                    placeholder="Last Name"
                    onChange={({ target }) =>
                      setNewStudent({ ...newStudent, last_name: target.value })
                    }
                  />
                  {errors?.response?.data?.errors?.last_name && (
                    <li style={{ color: "red", listStyleType: "none" }}>
                      *{errors.response.data.errors.last_name[0]}*
                    </li>
                  )}

                  <input
                    type="text"
                    className="form-control"
                    value={newStudent.img_url}
                    placeholder="img url"
                    onChange={({ target }) =>
                      setNewStudent({ ...newStudent, img_url: target.value })
                    }
                  />
                  {errors?.response?.data?.errors?.img_url && (
                    <li style={{ color: "red", listStyleType: "none" }}>
                      *{errors.response.data.errors.img_url[0]}*
                    </li>
                  )}
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
