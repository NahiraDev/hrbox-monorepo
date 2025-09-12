import { Add, Share } from 'iconsax-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AppButton } from 'core/components';

import { InstagramIcon, LinkedinIcon, TelegramIcon } from '../../icons';

export const Shared = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentUrl = encodeURIComponent(window.location.href);
  const shareTo = (platform: string) => {

    let url = '';

    switch (platform) {
      case 'telegram':
        url = `https://t.me/share/${currentUrl}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/${currentUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&${currentUrl}`;
        break;
      case 'instagram':
        alert('');
        navigator.clipboard.writeText(window.location.href);

        return;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        alert('');

        return;
      default:
        return;
    }

    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center gap-2 relative">
      <AppButton
        props={{
          isIconOnly: true,
          size: 'xs',
          variant: 'solid',
          color: 'secondary',
          onPress: () => setIsOpen(!isOpen),
          content: <Share color="#fff" />,
        }}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="share-menu"
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className="z-10 flex gap-3 bg-[#1E33630F] dark:bg-[#1e33600f] backdrop-blur-[20px] rounded-md"
            exit={{ opacity: 0, scale: 1, x: 0 }}
            initial={{ opacity: 0, scale: 1, x: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="flex gap-1.5">
              <AppButton
                props={{
                  isIconOnly: true,
                  size: 'xs',
                  variant: 'solid',
                  color: 'default',
                  onPress: () => shareTo('telegram'),
                  content: <TelegramIcon />,
                }}
              />
              <AppButton
                props={{
                  isIconOnly: true,
                  size: 'xs',
                  variant: 'solid',
                  color: 'default',
                  onPress: () => shareTo('linkedin'),
                  content: <LinkedinIcon />,
                }}
              />
              <AppButton
                props={{
                  isIconOnly: true,
                  size: 'xs',
                  variant: 'solid',
                  color: 'default',
                  onPress: () => shareTo('instagram'),
                  content: <InstagramIcon />,
                }}
              />
              <AppButton
                props={{
                  isIconOnly: true,
                  size: 'xs',
                  variant: 'solid',
                  color: 'default',
                  onPress: () => shareTo('copy'),
                  content: <Add />,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
