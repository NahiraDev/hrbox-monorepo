import React, { useEffect, useState } from "react";
import { loader } from "@hrbox/shared-templates";

export const AppLoader = () => {
  const [LottieComponent, setLottieComponent] = useState<React.FC<any> | null>(null);

  useEffect(() => {
    import("lottie-react").then((mod) => {
      setLottieComponent(() => mod.default);
    });
  }, []);

  if (!LottieComponent) return null;

  return (
    <div className="bg-white dark:bg-black w-full h-full z-50 absolute">
      <div className="w-8 h-8 absolute left-1/2 top-1/2">
        <LottieComponent animationData={loader} loop={true} />
      </div>
    </div>
  );
};
