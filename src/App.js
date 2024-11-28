import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CustomRoutes from "./components/Routes";

function App() {
  return (
    <div className="h-full w-full">
      <Router>
        <Routes>
          <Route path="/*" element={<CustomRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
