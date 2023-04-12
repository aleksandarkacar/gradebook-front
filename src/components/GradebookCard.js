import React from "react";
import { Link } from "react-router-dom";

export const GradebookCard = ({ gradebook }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Name: {gradebook.name}</h2>
        <div className="card-text">
          {gradebook.user.first_name && gradebook.user.last_name ? (
            <div>
              <h3> Teacher:</h3>
              <Link to={`/teachers/${gradebook.user.id}`}>
                <button
                  style={{ backgroundColor: "purple" }}
                  className="button-link"
                >
                  {gradebook.user.first_name} {gradebook.user.last_name}
                </button>
              </Link>
            </div>
          ) : (
            <p className="card-title">No Professor Assigned</p>
          )}
        </div>
      </div>
      <Link to={`/gradebooks/${gradebook.id}`}>
        <button style={{ margin: "20px" }} className="button-link">
          View Gradebook
        </button>
      </Link>
    </div>
  );
};
