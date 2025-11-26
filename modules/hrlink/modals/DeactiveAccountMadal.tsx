import { MedalStar } from 'iconsax-reactjs';
export const DeactiveAccountModal = () => {
  return (
      <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
              <MedalStar className="text-secondary-400" size="22" />
              <span className="text-secondary-400 text-xl font-normal">
                Rulls
              </span>
          </div>
          <p className="text-secondary-900 text-base font-normal">
              Considering that the HRLINK system is a job recommendation
              software, if you do not wish to receive job offers, please change
              this option to inactive.
          </p>
      </div>
  );
};
