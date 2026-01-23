import { Business, Email, Person, Phone, Send } from "@mui/icons-material";
import { useState } from "react";
import Headling from "../../composents/Headling/Headling";
import { BACKEND_URL } from "../../config";

export default function ContactMe() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
    agreeTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorDetails, setErrorDetails] = useState("");
  const handleSubmit = async (e) => {

    e.preventDefault();
    e.stopPropagation();
    console.log("🟡 Début de la soumission");

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorDetails("");

    try {
      console.log("📤 Données à envoyer:", formData);

      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          topic: formData.topic,
          message: formData.message,
          agree_terms: formData.agreeTerms,
        }),
      });

      console.log("📥 Réponse reçue - Status:", response.status);
      console.log("📥 Réponse reçue - Headers:", response.headers);

      // Essayez de lire le texte d'abord pour voir ce que retourne le serveur
      const responseText = await response.text();
      console.log("📥 Réponse texte:", responseText);

      try {
        // Essayez de parser comme JSON
        const data = JSON.parse(responseText);
        console.log("📥 Réponse JSON parsée:", data);

        if (response.ok && data.success) {
          console.log("✅ Succès:", data.message);
          setSubmitStatus("success");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            topic: "",
            message: "",
            agreeTerms: false,
          });
        } else {
          console.error("❌ Erreur serveur:", data);
          setSubmitStatus("error");
          setErrorDetails(data.message || `Erreur ${response.status}`);
        }
      } catch (jsonError) {
        console.error("❌ Erreur de parsing JSON:", jsonError);
        console.log("📥 Contenu brut:", responseText);
        setSubmitStatus("error");
        setErrorDetails("Le serveur a retourné une réponse invalide");
      }

    } catch (error) {
      console.error("❌ Erreur réseau:", error);
      setSubmitStatus("error");
      setErrorDetails(`Erreur réseau: ${error.message}`);
    } finally {
      console.log("🟣 Fin de la soumission");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section className="contact-section py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-2 md:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Headling hightlight="Contact" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Vous avez un projet ? Une question ? N'hésitez pas à me contacter.
            Je réponds généralement sous 24 heures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">
                    ✅ Message envoyé avec succès ! Je vous répondrai très
                    rapidement.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">
                    ❌ Une erreur est survenue. Veuillez réessayer ou me
                    contacter directement par email.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom et Prénom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Person
                        className="inline mr-2 text-blue-600"
                        fontSize="small"
                      />
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Person
                        className="inline mr-2 text-blue-600"
                        fontSize="small"
                      />
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                {/* Email et Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Email
                        className="inline mr-2 text-blue-600"
                        fontSize="small"
                      />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Phone
                        className="inline mr-2 text-blue-600"
                        fontSize="small"
                      />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>
                </div>

                {/* Sujet */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Business
                      className="inline mr-2 text-blue-600"
                      fontSize="small"
                    />
                    Sujet *
                  </label>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="project">Nouveau projet</option>
                    <option value="collaboration">
                      Proposition de collaboration
                    </option>
                    <option value="freelance">Mission freelance</option>
                    <option value="question">Question technique</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </div>

                {/* Conditions */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-3 text-gray-600 text-sm">
                    J'accepte que mes données soient utilisées pour traiter ma
                    demande.
                    <a
                      href="/privacy"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      Politique de confidentialité
                    </a>
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:shadow-blue-500/25"
                      }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Envoi en cours...
                      </span>
                    ) : (
                      <>
                        <Send />
                        Envoyer le message
                      </>
                    )}
                  </button>

                </div>
              </form>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="space-y-6">
            {/* Card Contact Info */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Informations de contact
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Email className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">kmma.960@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium">+223 90405200</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Response Time */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Temps de réponse
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Réponse moyenne</span>
                  <span className="font-bold text-green-600">24h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Disponibilité</span>
                  <span className="font-bold text-blue-600">Lun - Ven</span>
                </div>
              </div>
            </div>

            {/* Card Alternative */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Autres moyens de contact
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Vous préférez LinkedIn ou GitHub ?
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/feed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/geek-konate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black text-sm font-medium"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
