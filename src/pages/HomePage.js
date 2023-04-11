import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  performGetAllGradebooks,
  performGetMoreGradebooks,
} from "../store/gradebooks/slice";
import { allGradebooksSelector } from "../store/gradebooks/selectors";
import { GradebookCard } from "../components/GradebookCard";

export const HomePage = () => {
  const gradebooks = useSelector(allGradebooksSelector);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetGradebooks();
  }, []);

  const handleGetGradebooks = () => {
    dispatch(performGetAllGradebooks());
  };

  const handleLoadMore = async () => {
    setCurrentPage(currentPage + 1);
    dispatch(performGetMoreGradebooks(currentPage));
  };

  console.log(currentPage, gradebooks.last_page);

  return (
    <div style={{ marginBottom: "400px" }}>
      <h1>Gradebooks HomePage:</h1>
      <div className="card-container">
        {gradebooks?.data?.map((gradebook) => (
          <GradebookCard key={gradebook.id} gradebook={gradebook} />
        ))}
      </div>
      {currentPage + 1 <= gradebooks.last_page ? (
        <button className="button-link" onClick={() => handleLoadMore()}>
          Load More
        </button>
      ) : null}
    </div>
  );
};
