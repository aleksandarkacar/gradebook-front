import { useDispatch, useSelector } from "react-redux";
import { allTeachersSelector } from "../store/teachers/selectors";
import { useEffect, useState } from "react";
import {
  performGetAllTeachers,
  performSearchTeachers,
} from "../store/teachers/slice";
import { TeacherCard } from "../components/TeacherCard";

export const AllProfessorsPage = () => {
  const teachers = useSelector(allTeachersSelector);
  const [filterFirstName, setFilterFirstName] = useState("");
  const [filterLastName, setFilterLastName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetTeachers();
  }, []);

  const handleGetTeachers = () => {
    dispatch(performGetAllTeachers());
  };

  const handleFilter = () => {
    dispatch(performSearchTeachers({ filterFirstName, filterLastName }));
  };

  return (
    <div>
      <h1>AllProfessorsPage:</h1>
      <input
        placeholder="Filter teachers first name"
        onChange={(e) => setFilterFirstName(e.target.value)}
      ></input>
      <input
        placeholder="Filter teachers by last name"
        onChange={(e) => setFilterLastName(e.target.value)}
      ></input>
      <button onClick={() => handleFilter()}>Filter</button>
      <div className="card-container">
        {teachers?.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};
