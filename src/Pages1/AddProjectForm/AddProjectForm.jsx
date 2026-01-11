import { CloudUpload, ArrowBack } from "@mui/icons-material";
import { createProject } from "../../services/api";
import {
  TextField,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { BACKEND_URL } from "../../config";
const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    newTech: "",
    github_url: "",
    live_url: "",
  });

  const [screenshots, setScreenshots] = useState([]);
  const [screenshotPreviews, setScreenshotPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fonction temporaire d'upload (à remplacer par une vraie)
  const uploadScreenshots = async (files) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(`${BACKEND_URL}/api/upload/screenshots`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Échec de l'upload");
      }

      const data = await response.json();
      return data.urls.map((url, index) => ({
        url: `${BACKEND_URL}${url}`, // IMPORTANT : ajouter l'URL complète
        name: files[index].name,
      }));
    } catch (error) {
      console.error("Erreur upload:", error);
      throw error;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload des screenshots
      const screenshotUrls = await uploadScreenshots(screenshots);

      // 2. Création du projet
      await createProject({
        ...formData,
        technologies: formData.technologies,
        screenshots: screenshotUrls.map((s) => s.url), // URLs seulement
      });

      setSuccess(true);

      // Réinitialisation après succès
      setTimeout(() => {
        resetForm();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la création du projet");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      technologies: [],
      newTech: "",
      github_url: "",
      live_url: "",
    });
    setScreenshots([]);
    setScreenshotPreviews([]);

    // Libère les URLs mémoire
    screenshotPreviews.forEach((preview) => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTech = () => {
    if (
      formData.newTech.trim() &&
      !formData.technologies.includes(formData.newTech.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, prev.newTech.trim()],
        newTech: "", // Réinitialise le champ
      }));
    }
  };

  const removeTech = (techToRemove) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tech) => tech !== techToRemove),
    }));
  };

  const handleScreenshotUpload = (e) => {
    const files = Array.from(e.target.files);

    // Validation
    const validatedFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} dépasse 5MB`);
        return false;
      }
      return true;
    });

    // Ajout aux screenshots
    setScreenshots((prev) => [...prev, ...validatedFiles]);

    // Création des prévisualisations
    validatedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreviews((prev) => [...prev, reader.result]);
      };
      reader.onerror = () => {
        console.error("Erreur de lecture:", file.name);
      };
      reader.readAsDataURL(file);
    });

    // Réinitialise l'input
    e.target.value = null;
  };

  const removeScreenshot = (index) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
    setScreenshotPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 mb-4"
        >
          <ArrowBack />
          Retour
        </button>

        {success && (
          <Alert severity="success" className="mb-6">
            Projet ajouté avec succès !
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne gauche */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations du projet */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="p-2 bg-blue-100 rounded-lg">📝</span>
                  Informations du Projet
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextField
                    fullWidth
                    label="Nom du Projet"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Lien GitHub"
                    name="github_url"
                    value={formData.github_url}
                    onChange={handleInputChange}
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Lien Live"
                    name="live_url"
                    value={formData.live_url}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </div>

                <div className="mt-6">
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    placeholder="Décrivez le projet en détail..."
                  />
                </div>
              </div>

              {/* Screenshots */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="p-2 bg-purple-100 rounded-lg">🖼️</span>
                  Screenshots du Projet
                </h2>

                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleScreenshotUpload}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  <label htmlFor="screenshot-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      fullWidth
                      startIcon={<CloudUpload />}
                      className="h-12"
                    >
                      Ajouter des screenshots
                    </Button>
                  </label>
                  <p className="mt-2 text-gray-500 text-sm">
                    Formats acceptés : JPG, PNG, WebP. Max 5MB par image.
                  </p>
                </div>

                {/* Prévisualisation */}
                {screenshotPreviews.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-700 mb-3">
                      Prévisualisation ({screenshotPreviews.length} image(s))
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {screenshotPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow"
                          />
                          <button
                            type="button"
                            onClick={() => removeScreenshot(index)} // CORRECTION ICI
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Colonne droite */}
            <div className="space-y-6">
              {/* Technologies */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Technologies
                </h2>

                <div className="mb-4">
                  <div className="flex gap-2 mb-3">
                    <TextField
                      fullWidth
                      size="small"
                      label="Ajouter une technologie"
                      value={formData.newTech}
                      onChange={(e) =>
                        setFormData({ ...formData, newTech: e.target.value })
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTech())
                      }
                    />
                    <Button
                      variant="outlined"
                      onClick={addTech}
                      className="whitespace-nowrap"
                    >
                      Ajouter
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        onDelete={() => removeTech(tech)}
                        className="bg-blue-100 text-blue-800"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-blue-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Actions
                </h2>

                <div className="space-y-3">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 h-12 text-lg font-semibold"
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <CloudUpload />
                      )
                    }
                  >
                    {loading ? "Publication..." : "Publier le Projet"}
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={resetForm}
                    className="h-12 border-gray-300"
                  >
                    Tout effacer
                  </Button>

                  <Button
                    fullWidth
                    variant="text"
                    size="large"
                    onClick={() => window.history.back()}
                    className="h-12 text-gray-600"
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;
