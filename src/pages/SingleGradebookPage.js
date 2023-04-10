import { useDispatch, useSelector } from "react-redux";
import { singleGradebookSelector } from "../store/gradebooks/selectors";
import { useEffect } from "react";
import { performGetSingleGradebook } from "../store/gradebooks/slice";
import { DetailedGradebookCard } from "../components/DetailedGradebookCard";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const SingleGradebookPage = () => {
  const params = useParams();
  console.log(params);
  const gradebook = useSelector(singleGradebookSelector);
  console.log(gradebook);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetMyGradebook();
  }, []);

  const handleGetMyGradebook = () => {
    dispatch(performGetSingleGradebook(params.id));
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Single Gradebook Page:</h1>
      <DetailedGradebookCard gradebook={gradebook} />
    </div>
  );
};
