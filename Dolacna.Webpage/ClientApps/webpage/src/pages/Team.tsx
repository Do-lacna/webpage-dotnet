import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type TeamMember = {
  name: string;
  role: string;
  image: string;
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
    }[]
  )?.map((member, idx) => ({
    name: member.name,
    role: member.role,
    image: images[idx] || '',
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
          className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
          id="about"
        >
          <div className="section-container max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16 reveal-animation">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
                {t('team.aboutUs.header')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-accent to-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="reveal-animation">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-accent to-blue-500 rounded-full flex items-center justify-center">
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
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
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
        <section className="py-20 bg-white" id="team">
          <div className="section-container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 reveal-animation">
              <div className="text-center mb-16 reveal-animation">
                <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
                  {t('team.header')}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-brand-accent to-blue-500 mx-auto rounded-full"></div>
              </div>
              <p className="text-lg text-muted-foreground">
                {t('team.subheader')}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {members.map((member, idx) => (
                <div
                  key={member.name}
                  className="glass-panel p-6 flex flex-col items-center reveal-animation transition-transform duration-300 ease-in-out hover:scale-105 w-64 h-64"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mb-4 shadow"
                  />
                  <h3 className="text-xl font-bold mb-1 text-brand-dark text-center">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {member.role}
                  </p>
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
