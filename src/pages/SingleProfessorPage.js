import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailedTeacherCard } from "../components/DetailedTeacherCard";
import { singleTeacherSelector } from "../store/teachers/selectors";
import { performGetSingleTeacher } from "../store/teachers/slice";

export const SingleProfessorPage = () => {
  const params = useParams();
  const teacher = useSelector(singleTeacherSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetMyTeacher();
  }, []);

  const handleGetMyTeacher = () => {
    dispatch(performGetSingleTeacher(params.id));
  };

  return (
    <div>
      <h1>Single Professor Page:</h1>
      <div className="card-container">
        <DetailedTeacherCard teacher={teacher} />
      </div>
    </div>
  );
};
