import { useEffect, useState } from 'react';

// import { loader } from '../../public/lottie';

export const AppLoader = () => {
  const [LottieComponent, setLottieComponent] = useState<any>(null);

  useEffect(() => {
    import('lottie-react').then((mod) => {
      setLottieComponent(() => mod.default);
    });
  }, []);

  if (!LottieComponent) return null;

  return (
    <div className="bg-white dark:bg-black w-full h-full z-50 absolute">
      <div
        className="w-8 h-8 absolute left-1/2 top-1/2"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {/*<LottieComponent animationData={} loop={true} />*/}
      </div>
    </div>
  );
};
