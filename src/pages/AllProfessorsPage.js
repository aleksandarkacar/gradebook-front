import { useDispatch, useSelector } from "react-redux";
import { allTeachersSelector } from "../store/teachers/selectors";
import { useEffect } from "react";
import { performGetAllTeachers } from "../store/teachers/slice";
import { TeacherCard } from "../components/TeacherCard";

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
      <h1>AllProfessorsPage:</h1>
      <div className="card-container">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};
