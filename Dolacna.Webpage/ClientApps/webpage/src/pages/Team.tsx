import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type TeamMember = {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
};

const images: string[] = [
  '/images/team/adam.jpg',
  '/images/team/juro.jpg',
  '/images/team/mato.jpg',
  '/images/team/robo.jpg',
];

const Team: React.FC = () => {
  const { t } = useTranslation();

  const members: TeamMember[] = (
    t('team.members', { returnObjects: true }) as {
      name: string;
      role: string;
      linkedin?: string;
    }[]
  )?.map((member, idx) => ({
    name: member.name,
    role: member.role,
    image: images[idx] || '',
    linkedin: member.linkedin,
  }));

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      },
    );
    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* About Us Section */}
        <section
          className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
          id="about"
        >
          <div className="section-container max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16 reveal-animation">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
                {t('team.aboutUs.header')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent to-green-500 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="reveal-animation">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent to-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {t('team.aboutUs.paragraph1')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {t('team.aboutUs.paragraph2')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
          id="team"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-accent/10 to-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-gray-300/20 to-gray-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="section-container max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20 reveal-animation">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6">
                {t('team.header')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-accent to-green-500 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('team.subheader')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {members.map((member, idx) => (
                <div
                  key={member.name}
                  className="group reveal-animation"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg rounded-2xl p-8 text-center transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2 hover:bg-white/90">
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-4 h-4 bg-gradient-to-r from-accent to-green-500 rounded-full"></div>
                    </div>

                    {/* Profile image with enhanced styling */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-accent to-green-500 rounded-full blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="relative w-28 h-28 rounded-full object-cover mx-auto shadow-xl ring-4 ring-white group-hover:ring-accent/20 transition-all duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-brand-dark group-hover:text-accent transition-colors duration-300">
                        {member.name}
                      </h3>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-green-500 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <p className="text-muted-foreground font-medium">
                        {member.role}
                      </p>
                    </div>

                    {/* LinkedIn Icon - appears on hover in center */}
                    {member.linkedin && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform group-hover:scale-100"
                          aria-label={`Visit ${member.name}'s LinkedIn profile`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      </div>
                    )}

                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
