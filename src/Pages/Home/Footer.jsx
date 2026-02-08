import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Background avec dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>

      {/* Effets décoratifs */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Section principale */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">

            {/* Colonne 1 : À propos */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">MK</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Mamadou Konaté
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Développeur passionné créant des expériences digitales
                mémorables avec du code élégant.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Disponible pour de nouvelles opportunités</span>
              </div>
            </div>




            {/* Colonne 3 : Contact et réseaux */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Connectons-nous</h4>
              <div className="space-y-4 mb-8">
                <a
                  href="mailto:kmma.960@gmail.com"
                  className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-purple-200 group-hover:to-blue-200 transition-all">
                    <i className="ri-mail-line text-purple-600"></i>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm">kmma.960@gmail.com</p>
                  </div>
                </a>
              </div>

              {/* Réseaux sociaux avec effets */}
              <div className="flex gap-4">
                {[
                  { icon: "ri-github-fill", url: "https://github.com/your-github", color: "bg-gray-800 hover:bg-gray-900", label: "GitHub" },
                  { icon: "ri-linkedin-fill", url: "https://www.linkedin.com/in/konat%C3%A9-mamadou-518b43376", color: "bg-blue-600 hover:bg-blue-700", label: "LinkedIn" },

                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} w-12 h-12 rounded-xl flex items-center justify-center text-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                    aria-label={social.label}
                  >
                    <i className={`${social.icon} text-xl`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Séparateur */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Bas de footer */}

            {/* Copyright avec badge */}
            <div className="text- md:text-left">
              <div className="inline-flex items-center gap-3">
                <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
                  <p className="text-sm text-gray-700">
                    © {currentYear} Mamadou Konaté
                  </p>
                </div>
                <p className="text-gray-500 text-sm">
                  Tous droits réservés
                </p>
              </div>
            </div>




          {/* Message d'amour */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-400 text-sm">
              Construit avec{" "}
              <span className="relative inline-block mx-1">
                <span className="text-red-500 animate-pulse">❤</span>
                <span className="absolute inset-0 text-red-500 opacity-20 animate-ping">❤</span>
              </span>
              ,{" "}
              <span className="text-purple-600 font-medium">React</span>,{" "}
              <span className="text-blue-600 font-medium">Tailwind CSS</span> et beaucoup de café
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>


        </div>
      </div>
    </footer>
  );
}
