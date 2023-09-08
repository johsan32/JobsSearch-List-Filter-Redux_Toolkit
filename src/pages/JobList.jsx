import { useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { setJobs, setError } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter";

const JobList = () => {
  const state = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3050/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err)));
  }, []);

  return (
    <div className="main">
      <Filter />
      <h3>
      Viewing <p>{state.jobs.length} </p> of <p>{state.mainJobs.length}</p>jobs.</h3>
      <section className="list-sec">
        {!state.initialized && <p>Loading</p>}
        {state.initialized && !state.isError ? (
          <>
            {state.jobs.map((job) => (
              <Card key={job.id} job={job} />
            ))}
          </>
        ) : (
          <p>Serverda hata oluştu...</p>
        )}
      </section>
    </div>
  );
};

export default JobList;
