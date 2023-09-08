import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobList from "./pages/JobList";
import Favorite from "./pages/Favorite";
import Header from "./components/Header";
import Apply from "./pages/Apply";
import AddJob from "./pages/AddJob";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/add_job" element={<AddJob />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
