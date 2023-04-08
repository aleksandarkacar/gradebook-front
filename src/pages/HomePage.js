import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { performGetAllGradebooks } from "../store/gradebooks/slice";
import { allGradebooksSelector } from "../store/gradebooks/selectors";
import { GradebookCard } from "../components/GradebookCard";

export const HomePage = () => {
  const gradebooks = useSelector(allGradebooksSelector);
  console.log(gradebooks);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetGradebooks();
  }, []);

  const handleGetGradebooks = () => {
    dispatch(performGetAllGradebooks());
  };

  return (
    <div>
      <h1>Gradebooks HomePage:</h1>
      <div className="card-container">
        {gradebooks.map((gradebook) => (
          <GradebookCard key={gradebook.id} gradebook={gradebook} />
        ))}
      </div>
    </div>
  );
};
