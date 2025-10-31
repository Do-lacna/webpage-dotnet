import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 },
    );
    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      toast({ description: t('newsletter.invalidEmail') });
      return;
    }
    setIsSubmitting(true);
    // Simulate storing subscription locally (can be replaced with API call later)
    const key = 'newsletterSubscribers';
    const existingRaw = localStorage.getItem(key);
    let existing: string[] = [];
    if (existingRaw) {
      try { existing = JSON.parse(existingRaw); } catch { existing = []; }
    }
    if (existing.includes(email.toLowerCase())) {
      toast({ description: t('newsletter.alreadySubscribed') });
      setIsSubmitting(false);
      return;
    }
    existing.push(email.toLowerCase());
    localStorage.setItem(key, JSON.stringify(existing));
    setIsSubmitting(false);
    setEmail('');
    toast({ description: t('newsletter.success') });
  };

  const heading = t('newsletter.heading', 'Stay Updated');
  const subheading = t('newsletter.subheading', 'Full app launch planned for');
  const releaseDate = t('newsletter.releaseDate', 'December 2025');
  const description = t(
    'newsletter.description',
    'Subscribe to our newsletter and be the first to know when we launch new features, premium access and the full release.',
  );
  const emailPlaceholder = t(
    'newsletter.emailPlaceholder',
    'Enter your email address',
  );
  const subscribeButton = t('newsletter.subscribeButton', 'Subscribe');
  const privacyNote = t(
    'newsletter.privacyNote',
    'We respect your privacy. Unsubscribe at any time.',
  );

  return (
    <section id="newsletter" className="py-20 bg-brand-dark/95 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.04] pointer-events-none" />
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 reveal-animation">
          <h2 className="text-3xl md:text-4xl font-bold">
            {heading}
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent text-brand-dark font-semibold text-sm shadow-sm">
            {subheading} {releaseDate}
          </div>
          <p className="text-white/70 max-w-xl mx-auto">
            {description}
          </p>
          <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-4 justify-center reveal-animation" style={{ animationDelay: '0.15s' }}>
            <div className="flex-1 min-w-[240px]">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={emailPlaceholder}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-8 bg-brand-accent text-brand-dark font-semibold hover:bg-white button-hover-effect"
            >
              <Mail className="w-5 h-5" />
              {isSubmitting ? '...' : subscribeButton}
            </Button>
          </form>
          <div className="text-xs text-white/50 mt-2 reveal-animation" style={{ animationDelay: '0.25s' }}>
            {privacyNote}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
