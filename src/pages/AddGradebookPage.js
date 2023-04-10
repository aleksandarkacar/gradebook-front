import { useEffect, useState } from "react";
import { performAddGradebook } from "../store/gradebooks/slice";
import { useDispatch, useSelector } from "react-redux";
import { performGetAvailableTeachers } from "../store/teachers/slice";
import { availableTeachersSelector } from "../store/teachers/selectors";

export const AddGradebookPage = () => {
  const [newGradebook, setNewGradebook] = useState({
    name: "",
    user_id: 0,
  });

  const availableTeachers = useSelector(availableTeachersSelector);

  const dispatch = useDispatch();

  const handleGetAvailableTeachers = () => {
    dispatch(performGetAvailableTeachers());
  };

  useEffect(() => {
    handleGetAvailableTeachers();
  }, []);

  const handleGradebookSubmit = (e) => {
    e.preventDefault();

    dispatch(performAddGradebook(newGradebook));
  };



  return (
    <div>
      <h1>AddGradebookPage:</h1>
      <div className="card-container">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">Add Gradebook:</h1>
            <form onSubmit={handleGradebookSubmit}>
              <div className="form-group">
                <label htmlFor="first_name">Gradebook Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newGradebook.name}
                  onChange={({ target }) =>
                    setNewGradebook({ ...newGradebook, name: target.value })
                  }
                  required
                />
                <div>
                  <label htmlFor="teacher_id">Select a teacher:</label>
                  <select
                    onChange={(e) =>
                      setNewGradebook({
                        ...newGradebook,
                        user_id: e.target.value,
                      })
                    }
                    name="teacher_id"
                    id="teacher_id"
                  >
                    <option value="">-- Select a teacher --</option>
                    {availableTeachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.first_name} {teacher.last_name}
                      </option>
                    ))}
                  </select>
                </div>
                <label>
                  Currently selected user ID: {newGradebook.user_id}
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Add Gradebook
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
