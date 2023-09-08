import { addFavorite, applyDelete } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
useSelector;

const CardApply = ({ job }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.jobFavorites);
  const isFavorite = (job) => {
    return favorites.some((favJob) => favJob.id === job.id);
  };

  const handleDelete = (job) => {
    console.log(job);

    axios
      .delete(`http://localhost:3050/jobApply/${job.id}`)
      .then((res) => {
        dispatch(applyDelete(res.data));
      })
      .catch((error) => {
        console.error("POST isteği hatası:", error);
      });
  };
  const handleFavorite = (job) => {
    console.log(job);

    axios
      .post("http://localhost:3050/jobFavorites", job)
      .then((response) => {
        dispatch(addFavorite(response.data));
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
          <p>{job.company.display_name}</p>
        </div>
      </div>
      <div className="body">
        <div className="field">
          <img src="/picture/work.png" alt="" />
          <p>{job.contract_time}</p>
        </div>
        <div className="field">
          <img src="/picture/map.png" alt="" />
          <p>{job.location.area[1]}</p>
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
          {job.salary_max} {job.salary_max ? " per year" : ""}{" "}
        </p>
      </div>
      <div className="status">
        <button className="del-btn" onClick={() => handleDelete(job)}>
          Delete
        </button>
        <button
          onClick={() => handleFavorite(job)}
          className={isFavorite(job) ? "favorite-active" : "favorite"}
        >
          {isFavorite(job) ? "Added to Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default CardApply;
