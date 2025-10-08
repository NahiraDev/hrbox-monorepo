import { workerInfo } from '@module/basic-info/app/mock';
import { BasicInfoLayout } from '@module/basic-info/features/common';
import PropTypes from 'prop-types';

const cardContainerClass = `grid h-full grid-cols-2 gap-5 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200 max-h-[calc(100vh-100px)]
  [&::-webkit-scrollbar]:w-3
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300`;

const cardClass = `bg-gradient-to-r from-white via-sky-100 to-white w-full border-1 border-[#DDEEFA] flex items-center justify-between p-4 rounded-2xl`;

const PersonalInformation = () => {
  return (
    <BasicInfoLayout
      content={
        <div className={cardContainerClass}>
          {workerInfo.map((user, index) => (
            <div key={`user-${index}`} className={cardClass}>
              <div className="flex items-center gap-1">
                {user.icon}
                <span className="text-sm font-medium">{user.title}</span>
              </div>
              <div>
                <span className="text-sm text-gray-700">{user.text}</span>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};
PersonalInformation.propTypes = {
  workerInfo: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

PersonalInformation.defaultProps = {
  workerInfo: [],
};

export default PersonalInformation;
