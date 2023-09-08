import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [],
  jobs: [],
  jobFavorites: [],
  jobApply: [],
  initialized: false,
  isError: false,
};
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.mainJobs = action.payload;
      state.initialized = true;
      state.isError = false;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    setError: (state) => {
      state.initialized = true;
      state.isError = true;
    },
    setFavorites: (state, action) => {
      state.jobFavorites = action.payload;
    },
    addFavorite: (state, action) => {
      const newJob = action.payload;
      const existingJob = state.jobFavorites.find(
        (job) => job.id === newJob.id
      );
      if (!existingJob) {
        state.jobFavorites.push(newJob);
      }
    },
    setApply: (state, action) => {
      state.jobApply = action.payload;
    },
    addApply: (state, action) => {
      const newApply = action.payload;
      const existingApply = state.jobApply.find(
        (job) => job.id === newApply.id
      );
      if (!existingApply) {
        state.jobApply.push(newApply);
      }
    },
    favoriteDelete: (state, action) => {
      console.log(action.payload);
      state.jobFavorites.splice(state.jobFavorites.indexOf(action.payload), 1);
    },
    applyDelete: (state, action) => {
      state.jobApply.splice(state.jobApply.indexOf(action.payload), 1);
    },
    filterArea: (state, action) => {
      const query = action.payload.toLowerCase();
      const filter = state.mainJobs.filter((job) =>
        job.title.toLowerCase().includes(query)
      );
      state.jobs = filter;
    },
    filterTime: (state, action) => {
      const filtered = state.mainJobs.filter(
        (job) => job.contract_time === action.payload
      );
      state.jobs = filtered;
    },
    filterType: (state, action) => {
      const filtered = state.mainJobs.filter(
        (job) => job.contract_type === action.payload
      );
      state.jobs = filtered;
    },
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "Company A-Z":
          state.jobs.sort((a, b) =>
            a.company.display_name.localeCompare(b.company.display_name)
          );
          break;
        case "Company Z-A":
          state.jobs.sort((a, b) =>
            b.company.display_name.localeCompare(a.company.display_name)
          );
          break;
        case "Oldest to Newest":
          state.jobs.sort((a, b) => new Date(a.created) - new Date(b.created));
          break;
        case "Newest to Oldest":
          state.jobs.sort(
            (a, b) => new Date(b.created) - new Date(a.created)
          );
          break;
        case "Pay Low to High":
          state.jobs.sort((a, b) => a.salary_min - b.salary_min);
          break;
        case "Pay High to Low":
          state.jobs.sort((a, b) => b.salary_min - a.salary_min);
          break;
        default:
          return state;
      }
    },
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
  },
});

export const {
  setJobs,
  addJob,
  setError,
  addFavorite,
  setFavorites,
  addApply,
  setApply,
  favoriteDelete,
  applyDelete,
  filterArea,
  filterTime,
  filterType,
  sortJobs,
  clearFilters,
} = jobSlice.actions;

export default jobSlice.reducer;
