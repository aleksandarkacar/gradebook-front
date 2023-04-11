import React from "react";

export const StudentCard = ({ student }) => {
  return (
    <div className="card" style={{ width: "150px", height: "150px" }}>
      <div className="card-body">
        <h5 className="card-title">
          {student.first_name} {student.last_name}
        </h5>
      </div>
    </div>
  );
};
