import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import ProjectList from "./composents/ProjectList.jsx";
import AddProjectForm from "./Pages1/AddProjectForm/AddProjectForm.jsx";
import Index from "./Pages/Home/HomePage/Index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add_projects" element={<AddProjectForm />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-50">
              <main>
                <Index />
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
