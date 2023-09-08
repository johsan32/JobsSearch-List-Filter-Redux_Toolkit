import { addApply, addFavorite } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = ({ job }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.jobFavorites);
  const applied = useSelector((state) => state.jobApply);

  const isFavorite = (job) => {
    return favorites.some((favJob) => favJob.id === job.id);
  };
  const isApplied = (job) => {
    return applied.some((appliedJob) => appliedJob.id === job.id);
  };

  const handleFavorite = (job) => {
    axios
      .post("http://localhost:3050/jobFavorites", job)
      .then((response) => {
        dispatch(addFavorite(response.data));
      })
      .catch((error) => {
        console.error("POST isteği hatası:", error);
      });
  };
  const handleApply = (job) => {
    axios
      .post("http://localhost:3050/jobApply", job)
      .then((response) => {
        dispatch(addApply(response.data));
      })
      .catch((error) => {
        console.error("POST isteği hatası:", error);
      });
  };

  return (
    <div className="card">
      <div className="head">
        <div className="letter">
          <p>{job.company?.display_name[0]}</p>
        </div>
        <div className="info">
          <p>{job.title}</p>
          <p>{job.company?.display_name}</p>
        </div>
      </div>
      <div className="body">
        <div className="field">
          <img src="/picture/work.png" alt="" />
          <p>{job.contract_time}</p>
        </div>

        <div className="field">
          <img src="/picture/map.png" alt="" />
          <p>{job.location?.area[1]}</p>
        </div>
        <div className="field">
          <img src="/picture/jobs.png" alt="" />
          <p>{job.contract_type}</p>
        </div>
        <div className="field">
          <img src="/picture/date.png" alt="" />
          <p>{job.created.slice(0, 10)}</p>
        </div>
      </div>
      <div className="salary">
        <img src="/picture/finans.png" alt="" />
        <p>
          £{job.salary_min} {job.salary_max ? " to " : ""}{" "}
          {job.salary_max ? "£" : ""}
          {job.salary_max} {job.salary_max ? " per year " : ""}{" "}
        </p>
      </div>
      <Link to={job.redirect_url} target="_blank">
        <div className="desc">
          {job.description && (
            <p>
              Detail: <span>{job.description?.slice(0, 200)}</span>.....
            </p>
          )}
        </div>
      </Link>
      <div className="status">
        <button
          onClick={() => handleFavorite(job)}
          className={isFavorite(job) ? "favorite-active" : "favorite"}
        >
          {isFavorite(job) ? "Added to Favorites" : "Add to Favorites"}
        </button>
        <button
          onClick={() => handleApply(job)}
          className={isApplied(job) ? "apply-active" : "apply"}
        >
          {isApplied(job) ? "Applied the Job" : "to Apply"}
        </button>
      </div>
    </div>
  );
};

export default Card;
