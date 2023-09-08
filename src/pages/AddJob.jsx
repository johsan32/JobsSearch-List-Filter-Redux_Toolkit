import { v4 } from "uuid";
import { typeOpt, timeOpt } from "../components/helpers/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addJob } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    console.log(form);
    const newJob = Object.fromEntries(form.entries());

    if (!newJob.contract_type) {
      toast.warning("Please fill in the missing fields", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }
    if (!newJob.contract_time) {
      toast.warning("Please fill in the missing fields", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }
    newJob.id = v4();
    newJob.created = new Date().toJSON();
    newJob.company = {
      display_name: newJob.display_name,
    };
    newJob.location = {
      area: ["S", newJob.area],
    };

    axios
      .post("http://localhost:3050/jobs", newJob)
      .then((res) => dispatch(addJob(newJob)));
    navigate("/");
    toast
      .success("Successfully added", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      .catch(() => toast.error("Server error"));
  };

  return (
    <div className="add-sec">
      <h2>Add to Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Position</label>
          <input name="title" type="text" required />
        </div>
        <div>
          <label>Company</label>
          <input name="display_name" type="text" required />
        </div>
        <div>
          <label>Location</label>
          <input name="area" type="text" required />
        </div>
        <div>
          <label>Contract Time</label>
          <select name="contract_time" required>
            <option selected disabled>Choose</option>
            {timeOpt.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Contract Type</label>
          <select name="contract_type" required>
            <option selected disabled>Choose</option>
            {typeOpt.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Date</label>
          <input
            name="created"
            type="text"
            placeholder={new Date().toLocaleDateString()}
          />
        </div>
        <div>
          <label>Salary Min<span>(yearly)</span> </label>
          <input name="salary_min" type="number" required />
        </div>
        <div>
          <label>Salary Max <span>(yearly)</span> </label>

          <input name="salary_max" type="number" required />
        </div>
        <button>Add to Job List</button>
      </form>
    </div>
  );
};

export default AddJob;
