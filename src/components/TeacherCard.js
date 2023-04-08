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
          {teacher.first_name} {teacher.last_name}
        </h5>
        <p className="card-text">{teacher.email}</p>
      </div>
    </div>
  );
};
