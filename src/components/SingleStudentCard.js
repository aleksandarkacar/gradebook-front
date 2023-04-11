import React from "react";

export const StudentCard = ({ student }) => {
  return (
    <div className="card" style={{ width: "150px", height: "150px" }}>
      <img
        className="card-img-top"
        src={student.img_url}
        alt="Student"
        style={{ width: "100px", height: "100px" }}
      />
      <div className="card-body">
        <h5 className="card-title">
          {student.first_name} {student.last_name}
        </h5>
      </div>
    </div>
  );
};
