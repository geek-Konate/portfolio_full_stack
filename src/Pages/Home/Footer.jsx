import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400">
              © {currentYear} Mamadou Konaté. Tous droits réservés.
            </p>
          </div>

          {/* Liens sociaux */}
          <div className="flex gap-6">
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <i className="ri-github-fill text-xl"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/konat%C3%A9-mamadou-518b43376/?trk=opento_sprofile_topcard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <i className="ri-linkedin-fill text-xl"></i>
            </a>
            <a
              href="mailto:kmma.960@gmail.com"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Email"
            >
              <i className="ri-mail-fill text-xl"></i>
            </a>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            Fait avec <span className="text-red-400">❤</span> et passion pour le
            développement
          </p>
        </div>
      </div>
    </footer>
  );
}
