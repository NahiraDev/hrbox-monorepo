import { AppButton } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import {BeHappy, Frown, Happy, Sad} from "~/UIKit/icons";

interface HowAreYouTodayModalProps {
  onMoodSelect: (mood: string) => void;
}

interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  [key: string]: any;
}

const HowAreYouTodayModal: React.FC<HowAreYouTodayModalProps> = ({ onMoodSelect }) => {
  const { closeModal } = useModalContext();

  const handleMoodSelect = (mood: string): void => {
    onMoodSelect(mood);
    closeModal(undefined, undefined);
  };

  const IconWrapper: React.FC<{ iconComponent: React.FC<SvgIconProps> | React.ComponentType<SvgIconProps> }> = ({ iconComponent: Icon }) => (
    <Icon width={80} height={80} />
  );

  const moods = [
    { icon: <IconWrapper iconComponent={BeHappy} />, value: 'very-happy' },
    { icon: <IconWrapper iconComponent={Happy} />, value: 'happy' },
    { icon: <IconWrapper iconComponent={Frown} />, value: 'neutral' },
    { icon: <IconWrapper iconComponent={Sad} />, value: 'sad' },
  ];

  return (
    <div className="px-12 py-3 bg-blue-50 rounded-3xl flex flex-col items-center justify-center gap-1 w-full max-w-lg mx-auto">
      <div>
        <span className="!text-[28px] text-secondary-400 !font-semibold">How are you today?</span>
      </div>
      <div className="flex items-center justify-center">
        {moods.map((mood) => (
          <AppButton
            key={mood.value}
            props={{
              size: 'lg',
              radius: 'full',
              variant: 'light',
              color: 'white',
              content: mood.icon,
              onPress: () => handleMoodSelect(mood.value),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HowAreYouTodayModal;
