import { useDispatch } from "react-redux";
import {
  clearFilters,
  filterArea,
  filterTime,
  filterType,
  sortJobs,
} from "../redux/jobSlice";
import { timeOpt, typeOpt, sortOpt } from "./helpers/constants";
import { useRef } from "react";

const Filter = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const timeRef = useRef();
  const typeRef = useRef();
  const sortRef = useRef();

  const handleClear = () => {
    dispatch(clearFilters());
    inputRef.current.value = "";
    timeRef.current.value = "Choose";
    typeRef.current.value = "Choose";
    sortRef.current.value = "Choose";
  };
  return (
    <div className="filter-sec">
      <h3>Search tips</h3>
      <form>
        <div>
          <label>Position Search</label>
          <input
            onChange={(e) => dispatch(filterArea(e.target.value))}
            type="text"
            ref={inputRef}
          />
        </div>
        <div>
          <label>Contract Time</label>
          <select
            ref={timeRef}
            name="contract_time"
            onChange={(e) => dispatch(filterTime(e.target.value))}
          >
            <option selected disabled>
            Choose
            </option>
            {timeOpt.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Contract Type</label>
          <select
            ref={typeRef}
            name="contract_type"
            onChange={(e) => dispatch(filterType(e.target.value))}
          >
            <option selected disabled>
            Choose
            </option>
            {typeOpt.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Sort</label>
          <select
            ref={sortRef}
            name="contract_type"
            onChange={(e) => dispatch(sortJobs(e.target.value))}
          >
            <option selected disabled>
            Choose
            </option>
            {sortOpt.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="btn">
          <img src="/picture/clear.png" onClick={handleClear} />
        </div>
      </form>

    </div>
  );
};

export default Filter;
