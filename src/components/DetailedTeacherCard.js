import { Link } from "react-router-dom";
import React from "react";

export const DetailedTeacherCard = ({ teacher }) => {
  console.log(teacher, "Detailed teacher card first entry");
  if (teacher.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="card">
        <img
          className="card-img-top"
          src={teacher.img_url}
          alt="Teacher"
          style={{ width: "150px", height: "150px" }}
        />
        <div className="card-body">
          <h5 className="card-title">
            {teacher.first_name} {teacher.last_name}
          </h5>
          <p className="card-text">{teacher.email}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          {teacher.gradebook ? (
            <div>
              <div style={{ marginBottom: "20px" }}>
                Gradebook name: {teacher.gradebook.name}
              </div>
              <div style={{ marginBottom: "20px" }}>
                Students: {teacher.gradebook.students.length}
              </div>
              <div className="card-text">
                <Link to={`/gradebooks/${teacher.gradebook.id}`}>
                  <button className="button-link">View Gradebook</button>
                </Link>
              </div>
            </div>
          ) : (
            <div>Teacher is available</div>
          )}
        </div>
      </div>
    </div>
  );
};
