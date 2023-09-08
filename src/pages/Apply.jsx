import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApply } from "../redux/jobSlice";
import CardApply from "../components/CardApply";
import { Link } from "react-router-dom";

const Apply = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  useEffect(() => {
    axios
      .get("http://localhost:3050/jobApply")
      .then((res) => dispatch(setApply(res.data)));
  }, []);

  return (
    <div className="main">
      {state.jobApply.length > 0 ? (
        <>
          <h2>Apply job list</h2>
          <div className="fav-sec">
          {state.jobApply.map((job) => (
              <>
                 <CardApply key={job.id} job={job} />
              </>
            ))}
          </div>
        </>
      ) : (
        <div className="empty">
          <h5>Apply List Empty.</h5>
          <Link to="/">
          <img src="/picture/empty.gif" alt="" />
          </Link>
        </div>
      )}
    </div>

  );
};

export default Apply;
