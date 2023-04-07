import { useDispatch, useSelector } from "react-redux";
import { allTeachersSelector } from "../store/teachers/selectors";
import { useEffect } from "react";
import { performGetAllTeachers } from "../store/teachers/slice";

export const AllProfessorsPage = () => {
  const teachers = useSelector(allTeachersSelector);
  console.log(teachers);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetTeachers();
  }, []);

  const handleGetTeachers = () => {
    dispatch(performGetAllTeachers());
  };

  return (
    <div>
      <h1>{JSON.stringify(teachers)}</h1>
    </div>
  );
};
