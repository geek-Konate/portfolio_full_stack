import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../../config"; // ajuste le chemin

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Skills is not an array:", data);
          setSkills([]);
          return;
        }
        setSkills(data);
      })
      .catch((err) => {
        console.error("Fetch skills failed:", err);
        setSkills([]);
      });
  }, []);

  const categories = [
    "all",
    ...new Set(skills.map((s) => s.category).filter(Boolean)),
  ];

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section className="py-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Titre */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mes <span className="text-purple-600">Compétences</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Technologies et outils que j'utilise pour créer des solutions
            modernes
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat === "all" ? "Tout" : cat}
            </button>
          ))}
        </div>

        {/* Grille compétences */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300"
            >
              {/* Icone */}
              <div className="mb-4 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl w-16 h-16 flex items-center justify-center group-hover:scale-110 transition">
                {skill.icon_url ? (
                  <img
                    src={skill.icon_url}
                    alt={skill.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <div className="text-2xl">💻</div>
                )}
              </div>

              {/* Nom et niveau */}
              <div className="mb-2 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">{skill.name}</h3>
                <span className="text-sm text-purple-600 font-medium">
                  {skill.level}/5
                </span>
              </div>

              {/* Barre de niveau */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                />
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-2">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
