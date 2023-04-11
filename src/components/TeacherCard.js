import { Link } from "react-router-dom";
import React from "react";

export const TeacherCard = ({ teacher }) => {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={teacher.img_url}
        alt="Teacher"
        style={{ width: "150px", height: "150px" }}
      />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/teachers/${teacher.id}`}>
            <button class="button-link">
              {teacher.first_name} {teacher.last_name}
            </button>
          </Link>
        </h5>
        {teacher.gradebook ? (
          <div>
            Owns Gradebook: {teacher.gradebook.name} <br></br> Has{" "}
            {teacher.gradebook.students.length} Students
          </div>
        ) : (
          <div>Teacher is available</div>
        )}
      </div>
    </div>
  );
};
