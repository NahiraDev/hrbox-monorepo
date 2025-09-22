import { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import SlideImage1 from '../../../../public/assets/auth/slide-1.png';
import SlideImage2 from '../../../../public/assets/auth/slide-2.png';
import SlideImage3 from '../../../../public/assets/auth/slide-3.png';

const SliderSSO = () => {
  const { t } = useTranslation();

  const direction = i18n.language === 'fa' ? 'rtl' : 'ltr';
  const options: any = useMemo(() => ({ loop: true, direction }), [direction]);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="xl:flex hidden flex-col justify-between">
      <div className="flex flex-col gap-3">
        <h2 className="text-secondary-1000 text-4xl font-semibold dark:text-white">
          {t('welcome_back')}
        </h2>
        <h2 className="text-secondary-1000 text-4xl font-semibold dark:text-white">
          {t('please_sign_in_to_our_hrlink_account')}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-secondary-1000 text-4xl font-semibold dark:text-white">
          {t('welcome_back')}
        </h2>
        <h2 className="text-secondary-1000 text-4xl font-semibold dark:text-white">
          {t('please_sign_in_to_our_hrbox_account')}
        </h2>
        <p className="text-secondary-1000 dark:text-white text-lg leading-normal font-normal mt-3">
          {t('lorem')}
        </p>
      </div>

      <div ref={emblaRef} className="embla">
        <div className="embla__container">
          <div className="embla__slide">
            <img alt="Welcome Image1" className="w-[430px]" src={SlideImage1} />
          </div>
          <div className="embla__slide">
            <img alt="Welcome Image2" className="w-[500px]" src={SlideImage2} />
          </div>
          <div className="embla__slide">
            <img alt="Welcome Image3" className="w-[446px]" src={SlideImage3} />
          </div>
        </div>
        <div className="flex justify-center gap-1.5 mt-4">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-3 h-3 rounded-full ${
                selectedIndex === index ? 'bg-primary-400' : 'bg-primary-100'
              }`}
              onClick={() => {
                if (emblaApi) emblaApi.scrollTo(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderSSO;
