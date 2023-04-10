import { useDispatch, useSelector } from "react-redux";
import { singleGradebookSelector } from "../store/gradebooks/selectors";
import { useEffect } from "react";
import { performGetMyGradebook } from "../store/gradebooks/slice";
import { DetailedGradebookCard } from "../components/DetailedGradebookCard";

export const MyGradebookPage = () => {
  const gradebook = useSelector(singleGradebookSelector);
  console.log(gradebook);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetMyGradebook();
  }, []);

  const handleGetMyGradebook = () => {
    dispatch(performGetMyGradebook());
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>MyGradebookPage:</h1>
      <DetailedGradebookCard lastPage="/my-gradebook" gradebook={gradebook} />
    </div>
  );
};
