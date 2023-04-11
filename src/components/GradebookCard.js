import React from "react";
import { Link } from "react-router-dom";

export const GradebookCard = ({ gradebook }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Name: {gradebook.name}</h5>
        <div className="card-text">
          {gradebook.user.first_name && gradebook.user.last_name ? (
            <p className="card-title">
              Professor: {gradebook.user.first_name} {gradebook.user.last_name}
            </p>
          ) : null}
        </div>
      </div>
      <Link to={`/gradebooks/${gradebook.id}`}>
        <button class="button-link">View Gradebook</button>
      </Link>
    </div>
  );
};
