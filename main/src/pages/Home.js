import React from "react";
import logo from "../images/memoji_laptop.png";

const projects = [
  { name: "Barrel Distortion", path: "/barrel-distortion" },
  { name: "Boids Simulation", path: "/boids-simulation" },
  { name: "Ray Marching", path: "/ray-marching" },
  { name: "Ray Tracing", path: "/ray-tracing" },
  { name: "Volumetric Cloud", path: "/volumetric-cloud" },
];

function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="bg-white p-4 h-16">
        <div className="container mx-auto flex justify-between items-center h-full px-4">
          <div to="/" className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-6 w-auto"
              draggable="false"
            />
            <span className="text-xl font-bold font-dot-gothic-16 sm:inline ml-2">
              Kevin Kim &mdash; Graphics Hub
            </span>
          </div>
        </div>
      </nav>

      <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
        <main className="text-center">
          <p className="text-lg mb-4 text-gray-800">
            A compilation of graphics programming projects by
            <a
              href="https://kevinkmkim.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Kevin Kim
            </a>
          </p>

          {/* <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link key={project.name} to={project.path}>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
                  {project.name}
                </button>
              </Link>
            ))}
          </section> */}
        </main>
      </div>
    </div>
  );
}

export default Home;
