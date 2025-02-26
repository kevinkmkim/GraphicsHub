import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Adjust path as needed

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/barrel-distortion"
          element={<div>Barrel Distortion</div>}
        />
        <Route path="/boids-simulation" element={<div>Boids Simulation</div>} />
        <Route path="/ray-marching" element={<div>Ray Marching</div>} />
        <Route path="/ray-tracing" element={<div>Ray Tracing</div>} />
        <Route path="/volumetric-cloud" element={<div>Volumetric Cloud</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
