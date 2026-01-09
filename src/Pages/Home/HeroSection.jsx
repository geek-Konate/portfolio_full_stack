import React from "react";
import "@fontsource/roboto";
import { Download, ArrowRight, Code, Terminal } from "@mui/icons-material";

export default function HeroSection() {
  return (
    <section className="hero-section relative overflow-hidden pt-20 md:pt-20 pb-12 md:pb-24">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10"></div>

      {/* Geometric shapes - Modifié pour mobile */}
      <div className="absolute top-10 left-5 w-48 h-48 md:w-72 md:h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-10 right-5 w-48 h-48 md:w-80 md:h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-8 md:gap-12 items-center">
          {/* Left - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 md:px-4 md:py-2 rounded-full mb-4 md:mb-6 mt-3 md:mt-1">
              <Terminal className="text-blue-600" fontSize="small" />
              <span className="text-xs md:text-sm font-medium text-blue-700">
                Développeur Full-Stack Passionné
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              <span className="block text-xl sm:text-2xl md:text-3xl">
                Bonjour, je suis
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Mamadou Konaté
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-6 md:mb-8 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl lg:mx-0">
              Spécialisé dans le développement d'applications full-stack
              performantes. Je combine une expertise technique pointue avec une
              approche centrée sur l'expérience utilisateur pour créer des
              solutions digitales impactantes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3 mb-8 md:mb-10">
              <a
                href="/cv.pdf"
                className="px-4 py-2 md:px-5 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 text-sm md:text-base"
                download
              >
                <Download fontSize="small" />
                Télécharger CV
              </a>

              <a
                href="#portfolio"
                className="px-4 py-2 md:px-5 md:py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm md:text-base"
              >
                Voir mes projets
              </a>

              <a
                href="#contact"
                className="px-4 py-2 md:px-5 md:py-3 bg-gray-900 text-white rounded-lg hover:bg-black font-medium text-sm md:text-base"
              >
                Discutons
              </a>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative">
              {/* Main image */}
              <div className="relative z-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-1 sm:p-2 shadow-xl md:shadow-2xl w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] mx-auto">
                <img
                  src="/img/20250807_171450.jpg"
                  alt="Mamadou Konaté - Développeur Full-Stack"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=M.K";
                  }}
                />
              </div>

              {/* Floating elements - Modifié pour mobile */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-yellow-400 rounded-2xl rotate-12 opacity-20 animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>

              {/* Experience badge */}
              <div className="absolute -bottom-14 md:-bottom-14 left-1/2 transform -translate-x-1/2 bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg p-2 md:p-4 flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Code className="text-white text-sm md:text-base" />
                </div>
                <div>
                  <div className="text-lg md:text-2xl font-bold text-gray-900">
                    2+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Années d'XP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Masqué sur mobile */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <ArrowRight className="rotate-90 text-gray-400" />
        </div>
      </div>
    </section>
  );
}
