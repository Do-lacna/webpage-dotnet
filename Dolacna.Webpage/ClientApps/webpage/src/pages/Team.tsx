import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React, { useEffect } from "react";
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
        <section className="py-20 bg-white" id="team">
          <div className="section-container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 reveal-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                {t('team.header')} <span className="text-brand-accent"></span>
              </h2>
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