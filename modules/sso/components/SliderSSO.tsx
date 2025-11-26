import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

export const SliderSSO = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOrganizePanel] = useState(true);

  const direction = i18n.language === 'fa' ? 'rtl' : 'ltr';
  return (
    <div className="xl:flex hidden flex-col justify-between h-full">

      <div className="flex flex-col gap-3">
        <span className="text-4xl font-semibold">
          {t('welcome_back')}
        </span>
        <span className="text-4xl font-semibold">
          {!isOrganizePanel ? t('please_sign_in_to_our_hrbox_account') : t('please_sign_in_to_our_hrlink_account')}
        </span>
      </div>

      <div className="relative">
        <Swiper
          dir={direction}
          modules={[EffectCreative, Autoplay, Pagination]}
          effect="cube"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-20%', 0, -1],
              opacity: 0.5,
            },
            next: {
              translate: ['100%', 0, 0],
              opacity: 0.5,
            },
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={800}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full max-w-[550px] mx-auto"
        >
          <SwiperSlide>
            <div className="flex justify-center items-center py-8">
              <img
                alt="Welcome Image 1"
                className="w-[430px] transition-transform duration-700 hover:scale-105"
                src="/images/slide-1.webp"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex justify-center items-center py-8">
              <img
                alt="Welcome Image 2"
                className="w-[500px] transition-transform duration-700 hover:scale-105"
                src="/images/slide-2.webp"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex justify-center items-center py-8">
              <img
                alt="Welcome Image 3"
                className="w-[446px] transition-transform duration-700 hover:scale-105"
                src="/images/slide-3.webp"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              className={`relative h-3 rounded-full transition-all duration-500 ${
                activeIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-3 bg-primary-100 hover:bg-primary-200'
              }`}
            >
              {activeIndex === index && (
                <span className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-50" />
              )}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};