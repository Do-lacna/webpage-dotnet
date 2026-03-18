import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import { useTranslation } from 'react-i18next';

interface Founder {
  name: string;
  image: string;
  story: string;
}

const WhyUsethriWasBorn = () => {
  const { t } = useTranslation();
  useRevealAnimation();

  const founders: Founder[] = (
    t('whyUsethriWasBorn.founders', { returnObjects: true }) as Founder[]
  ) || [];

  return (
    <section className="relative mt-10 pb-10 md:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-brand-lilac/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-gray-300/20 to-gray-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="section-container relative z-10">
        {/* Section heading - single line */}
        <div className="text-center mb-10 reveal-animation" data-anim="up">
        <h2 className="text-3xl md:text-5xl font-bold text-brand-indigo mb-4">
            {t('whyUsethriWasBorn.heading')}{' '}
            <span className="text-brand-primary">{t('whyUsethriWasBorn.headingAccent')}</span>
            {' '}{t('whyUsethriWasBorn.headingEnd')}
          </h2>
          <p className="text-base md:text-lg text-brand-indigo/60 max-w-2xl mx-auto">
            {t('whyUsethriWasBorn.subheading')}
          </p>
        </div>

        {/* Founders grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 max-w-6xl mx-auto">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className="reveal-animation flex flex-col items-center"
              data-anim={idx === 0 ? 'left' : 'right'}
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {/* Avatar with border */}
              <div className="mb-4 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full blur-lg opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              {/* Speech bubble with story */}
              <div className="relative">
                {/* Bubble tail */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white" />

                {/* Bubble content */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg relative">
                  <p className="text-brand-indigo text-sm md:text-base leading-relaxed">
                    {founder.story}
                  </p>

                  {/* Name below bubble */}
                  <div className="mt-4 text-center">
                    <p className="text-lg font-bold text-brand-indigo">{founder.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsethriWasBorn;
