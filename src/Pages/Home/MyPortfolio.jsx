import Headling from "../../composents/Headling/Headling";
import React, { useEffect, useState } from "react";
import PublicProjectCard from "../../composents/PublicProjectCard/PublicProjectCard";
import { GitHub, ArrowRight, FilterList, Star } from "@mui/icons-material";
import { BACKEND_URL } from "../../config";
export default function MyPortfolio() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTech, setSelectedTech] = useState("all");
  const [displayCount, setDisplayCount] = useState(3);
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Invalid projects format:", data);
          setProjects([]);
          setFilteredProjects([]);
          return;
        }

        const sortedProjects = [...data].sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setProjects(sortedProjects);
        setFilteredProjects(sortedProjects);
      })
      .catch((err) => {
        console.error("Fetch projects failed:", err);
        setProjects([]);
        setFilteredProjects([]);
      });
  }, []);

  // Toutes les technologies uniques
  const allTechnologies = [
    ...new Set(projects.flatMap((p) => p.technologies || [])),
  ];

  // Filtrer par technologie
  useEffect(() => {
    if (selectedTech === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => p.technologies?.includes(selectedTech))
      );
    }
  }, [selectedTech, projects]);

  const visibleProjects = filteredProjects.slice(0, displayCount);

  return (
    <section className="portfolio py-4 md:py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="container  px-2 md:px-4 lg:px-8">
        {/* Header avec titre et stats */}
        <div className="text-center mb-12">
          <Headling hightlight="Mon Portfolio" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Une sélection de mes projets les plus significatifs, alliant design
            moderne et technologies de pointe.
          </p>
        </div>

        {/* Stats et filtres */}
        <div className="flex  items-center mb-10 gap-6">
          {/* Stats */}
          {/* <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {projects.length}
              </div>
              <div className="text-sm text-gray-600">Projets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {projects.filter((p) => p.featured).length}
              </div>
              <div className="text-sm text-gray-600">En vedette</div>
            </div>
          </div> */}

          {/* Filtres */}
          {/* <div className="flex flex-wrap gap-3 items-center">
            <FilterList className="text-gray-500" />

            <button
              onClick={() => setSelectedTech("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedTech === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tous
            </button>

            {allTechnologies.slice(0, 5).map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedTech === tech
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tech}
              </button>
            ))}
          </div> */}

          {/* Lien GitHub */}
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <PublicProjectCard
              key={project.id}
              project={project}
              featured={project.featured}
            />
          ))}
        </div>

        {/* Message si aucun projet */}
        {visibleProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucun projet trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos filtres de recherche
            </p>
          </div>
        )}

        {/* Lien vers tous les projets */}
        <div className="flex flex-wrap gap-2 items-center justify-between mt-5">
          {displayCount < filteredProjects.length && (
            <div className="text-center ">
              <button
                onClick={() =>
                  setDisplayCount((prev) => prev + filteredProjects.length)
                }
                className="group px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium inline-flex items-center gap-3"
              >
                Voir {filteredProjects.length - displayCount} projets
                supplémentaires
                <ArrowRight className="group-hover:translate-x-1 transition" />
              </button>
            </div>
          )}

          <a
            href="https://github.com/geek-Konate"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-lg hover:bg-black transition font-medium "
          >
            <GitHub />
            Voir mon GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
