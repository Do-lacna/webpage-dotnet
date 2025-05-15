import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const contactSections = [
    {
      title: t("contact.addressTitle"),
      content: t("contact.addressValue"),
      isHtml: false,
    },
    {
      title: t("contact.emailTitle"),
      content: `<a href="mailto:${t("contact.emailValue")}" class="text-brand-accent underline">${t("contact.emailValue")}</a>`,
      isHtml: true,
    },
    {
      title: t("contact.phoneTitle"),
      content: t("contact.phoneValue"),
      isHtml: false,
    },
    {
      title: t("contact.hoursTitle"),
      content: t("contact.hoursValue"),
      isHtml: false,
    },
    {
      title: t("contact.formTitle"),
      content: `
<form class="space-y-4">
  <input type="text" placeholder="${t("contact.formName")}" class="input input-bordered w-full" disabled />
  <input type="email" placeholder="${t("contact.formEmail")}" class="input input-bordered w-full" disabled />
  <textarea placeholder="${t("contact.formMessage")}" class="textarea textarea-bordered w-full" rows="4" disabled></textarea>
  <button type="submit" class="btn btn-brand w-full" disabled>${t("contact.formButton")}</button>
</form>
      `,
      isHtml: true,
    },
  ];

  useEffect(() => {
    // Intersection observer for reveal animations
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );
    const elements = document.querySelectorAll(".reveal-animation");
    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-white" id="contact">
          <div className="section-container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 reveal-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                {t("contact.header")} <span className="text-brand-accent"></span>
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("contact.subheader")}
              </p>
            </div>
            <div className="space-y-10">
              {contactSections.map((section, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 reveal-animation"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold mb-2 text-brand-dark">
                    {section.title}
                  </h3>
                  {section.isHtml ? (
                    <div
                      className="text-muted-foreground whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  ) : (
                    <div className="text-muted-foreground whitespace-pre-line">
                      {section.content}
                    </div>
                  )}
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

export default Contact;