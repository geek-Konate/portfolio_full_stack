import React from 'react';
import Headling from '../../composents/Headling/Headling';
import { Code, School, Work, Rocket } from '@mui/icons-material';

export default function AboutMe() {
  return (
    <section className="about w-full py-8 md:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container  md:px-4 lg:px-8">
        <div className="text-center mb-12">
          <Headling hightlight="À Propos" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Passionné par la conception de solutions web fiables et sécurisées, je développe des
            applications modernes en alliant performance, expérience utilisateur et bonnes pratiques
            de sécurité.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Photo / Illustration */}
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-1 shadow-2xl transform hover:scale-[1.02] transition duration-300">
              <img
                src="/img/20250505_153458.jpg"
                alt="Kira - Développeur Full-Stack"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            {/* Décoration */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
          </div>

          {/* Contenu */}
          <div className="space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              Passionné par la création d'applications web et mobile modernes. Je combine{' '}
              <strong className="text-blue-600">React & Flutter</strong> pour le frontend et
              <strong className="text-green-600"> Python/FastAPI</strong> pour le backend afin de
              construire des solutions robustes et évolutives.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Mon parcours m’a permis de couvrir l’ensemble du cycle de développement, de la
              conception à la mise en production. Je m’intéresse particulièrement à la qualité du
              code, à l’optimisation des performances et à la sécurisation des applications face aux
              vulnérabilités courantes.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600">2+</div>
                <div className="text-sm text-gray-600">Années d'XP</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600">10+</div>
                <div className="text-sm text-gray-600">Projets</div>
              </div>
              {/* <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-gray-600">Technologies</div>
              </div> */}
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>

            {/* Philosophie */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mt-8">
              <div className="flex items-start gap-4">
                <Rocket className="text-blue-600 text-3xl" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Ma philosophie</h3>
                  <p className="text-gray-700">
                    "Un bon logiciel ne se limite pas à fonctionner : il doit être fiable, sécurisé
                    et maintenable. Chaque décision technique doit contribuer à la qualité et à la
                    pérennité du système."
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://github.com/geek-Konate"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Voir mon GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
