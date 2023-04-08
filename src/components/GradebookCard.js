import React from "react";

export const GradebookCard = ({ gradebook }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{gradebook.name}</h5>
        <p className="card-text">
          {gradebook.user.first_name && gradebook.user.last_name ? (
            <p className="card-title">
              {gradebook.user.first_name} {gradebook.user.last_name}
            </p>
          ) : null}
        </p>
      </div>
    </div>
  );
};
