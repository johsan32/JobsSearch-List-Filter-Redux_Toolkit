import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../redux/jobSlice";
import CardFavorite from "../components/CardFavorite";
import { Link } from "react-router-dom";

const Favorite = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  useEffect(() => {
    axios
      .get("http://localhost:3050/jobFavorites")
      .then((res) => dispatch(setFavorites(res.data)));
  }, []);
  return (
    <div className="main">
      {state.jobFavorites.length > 0 ? (
        <>
          <h2>Favorite job list</h2>
          <div className="fav-sec">
            {state.jobFavorites.map((job) => (
              <>
                <CardFavorite key={job.id} job={job} />
              </>
            ))}
          </div>
        </>
      ) : (
        <div className="empty">
          <h5>Favorite List Empty.</h5>
          <Link to="/">
          <img src="/picture/empty.gif" alt="" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorite;
