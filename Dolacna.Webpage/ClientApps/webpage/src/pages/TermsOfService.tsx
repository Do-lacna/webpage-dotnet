import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TermsOfService = () => {
  useEffect(() => {
    // Initialize intersection observer for reveal animations
    const observer = new IntersectionObserver(
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

    // Observe all elements with the reveal-animation class
    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content:
        'By accessing or using our application, you agree to be bound by these Terms of Service. If you do not agree, please do not use the app.',
    },
    {
      title: '2. Use of the App',
      content:
        'You may use the app only for lawful purposes and in accordance with these Terms. You agree not to misuse the services or attempt to disrupt their normal operation.',
    },
    {
      title: '3. Intellectual Property',
      content:
        'All content, trademarks, and intellectual property in the app are the property of their respective owners. You may not reproduce, modify, or distribute any part without permission.',
    },
    {
      title: '4. User Accounts',
      content:
        'You are responsible for maintaining the confidentiality of your account information. You agree to notify us immediately of any unauthorized use of your account.',
    },
    {
      title: '5. Termination',
      content:
        'We reserve the right to suspend or terminate your access to the app at any time, without notice, for any reason, including violation of these terms.',
    },
    {
      title: '6. Limitation of Liability',
      content:
        'To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages resulting from your use of the app.',
    },
    {
      title: '7. Changes to Terms',
      content:
        'We may revise these Terms of Service at any time. Continued use of the app after changes means you accept the revised terms.',
    },
    {
      title: '8. Governing Law',
      content:
        'These Terms are governed by the laws of the applicable jurisdiction, without regard to conflict of law principles.',
    },
    {
      title: '9. Contact Us',
      content:
        'If you have any questions about these Terms, please reach out to us at support@example.com.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-white" id="terms-of-service">
          <div className="section-container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 reveal-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Terms of <span className="text-brand-accent">Service</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Please read these terms carefully before using our application.
              </p>
            </div>

            <div className="space-y-10">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 reveal-animation"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold mb-2 text-brand-dark">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {section.content}
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

export default TermsOfService;
