import { useDispatch } from "react-redux";
import { performDeleteStudent } from "../store/gradebooks/slice";

export const DeleteStudentCard = ({ student }) => {
  const dispatch = useDispatch();
  const handleDeleteStudent = () => {
    const descision = window.confirm(
      "Are you sure you want to delete the student"
    );
    if (descision) {
      dispatch(performDeleteStudent(student.id));
    }
  };
  return (
    <div className="card" style={{ width: "150px", height: "150px" }}>
      <div className="card-body">
        <h5 className="card-title">
          {student.first_name} {student.last_name}
        </h5>
        <button className="button-link" onClick={handleDeleteStudent}>
          Delete Student
        </button>
      </div>
    </div>
  );
};
