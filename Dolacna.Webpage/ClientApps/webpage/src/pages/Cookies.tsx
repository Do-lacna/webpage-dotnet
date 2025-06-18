import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Cookies = () => {
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
      title: '1. What Are Cookies?',
      content:
        'Cookies are small text files stored on your device to help websites remember information about your visit, like your preferred language or login status.',
    },
    {
      title: '2. How We Use Cookies',
      content:
        'We use cookies to enhance your user experience, analyze app traffic, and understand how users interact with our platform. This helps us improve the performance and functionality of our services.',
    },
    {
      title: '3. Types of Cookies We Use',
      content: `
- **Essential Cookies**: Required for the app to function properly.
- **Analytics Cookies**: Help us track usage and performance.
- **Preference Cookies**: Remember your preferences like language and layout.
      `,
    },
    {
      title: '4. Managing Cookies',
      content:
        'You can manage or disable cookies through your device or browser settings. However, disabling cookies may affect certain features or your user experience.',
    },
    {
      title: '5. Third-Party Cookies',
      content:
        'We may allow trusted third parties, such as analytics providers, to place cookies on our app to gather usage data or serve relevant ads.',
    },
    {
      title: '6. Updates to This Policy',
      content:
        'We may update this Cookie Policy from time to time. Changes will be posted here, and we encourage you to review the policy periodically.',
    },
    {
      title: '7. Contact Us',
      content:
        'For any questions regarding our use of cookies, you can reach us at support@example.com.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-white" id="cookies-policy">
          <div className="section-container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 reveal-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Cookie <span className="text-brand-accent">Policy</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Find out how and why we use cookies in our application.
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
                  <p
                    className="text-muted-foreground whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
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

export default Cookies;
