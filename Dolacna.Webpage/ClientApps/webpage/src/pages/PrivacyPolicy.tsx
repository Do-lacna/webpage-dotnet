import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy = () => {
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

  const privacySections = [
    {
      title: '1. Introduction',
      content:
        'This Privacy Policy outlines how our mobile application collects, uses, and protects your information when you interact with our app. By using the app, you agree to the practices described in this policy.',
    },
    {
      title: '2. Information We Collect',
      content:
        'Our app may request access to certain features on your device that are necessary for its core functionality.',
    },
    {
      title: '3. Camera Permission',
      content: `We require CAMERA permission to enable key features of the app. This includes:\n\n- Capturing photos and/or videos within the app\n- Processing image data for visual-based functionality\n\nThis access is solely for the features provided within the app and is not used beyond its intended purpose.`,
    },
    {
      title: '4. How We Use Your Information',
      content: `The camera data is used **only** within the app for functional purposes. Specifically:\n\n- Camera data is processed locally on your device\n- We do **not** collect, transmit, or store your photos or videos on our servers unless you explicitly choose to upload or share them\n- Camera data is **not** used for advertising, marketing, or analytics\n\nYour privacy is central to our app experience.`,
    },
    {
      title: '5. Data Storage and Security',
      content: `- All media (photos/videos) captured within the app are stored locally on your device\n- We implement reasonable security practices to help protect any in-app data processing\n- We do **not** sell, rent, or trade your personal information with third parties`,
    },
    {
      title: '6. Your Choices',
      content: `You have full control over your data:\n\n- You can **deny or revoke** camera permissions at any time via your device settings\n- You may **delete any media** captured through the app using your device’s file manager\n\nThe app’s functionality may be limited without camera access, but it will remain secure and respectful of your choices.`,
    },
    {
      title: '7. Updates to This Policy',
      content:
        'We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated effective date. We encourage you to review the policy regularly for any changes.',
    },
    {
      title: '8. Contact Us',
      content: `If you have any questions or concerns regarding this Privacy Policy, please contact us at:\n\nEmail: your-email@example.com\nWebsite: https://your-website.com`,
    },
    {
      title: 'Effective Date',
      content: 'This policy is effective as of April 16, 2025.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-white" id="privacy-policy">
          <div className="section-container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 reveal-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Privacy <span className="text-brand-accent">Policy</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Learn how we handle your data to keep your experience safe and
                private.
              </p>
            </div>

            <div className="space-y-10">
              {privacySections.map((section, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 reveal-animation"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold mb-2 text-brand-dark">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground">{section.content}</p>
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

export default PrivacyPolicy;
