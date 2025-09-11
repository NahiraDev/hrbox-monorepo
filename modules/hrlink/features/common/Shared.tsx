import { Button } from '@heroui/button';
import { Add, Share } from 'iconsax-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { InstagramIcon, LinkedinIcon, TelegramIcon , WhatsAppIcon} from '../../icons';

export const Shared = () =>{
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentUrl = encodeURIComponent(window.location.href);
  const shareTo = (platform: string) => {
    const text = encodeURIComponent('بیا این صفحه رو ببین!');

    let url = '';

    switch (platform) {
      case 'telegram':
        url = `https://t.me/share/url?url=${currentUrl}&text=${text}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${text}%20${currentUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${text}`;
        break;
      case 'instagram':
        alert('اشتراک‌گذاری مستقیم در اینستاگرام از وب ممکن نیست. لینک کپی شد.');
        navigator.clipboard.writeText(window.location.href);
        return;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        alert('لینک کپی شد!');
        return;
      default:
        return;
    }

    window.open(url, '_blank');
  };

  return(
    <div className="flex items-center gap-2 relative">
      {!isOpen && (
        <Button
          className="!rounded-md shadow-shadow-light-tight/1 bg-white min-w-fit p-2 flex gap-2 border-1 hover:border-secondary-400 transition "
          color="default"
          variant="light"
          onPress={() => setIsOpen(true)}
        >
          <Share className="text-secondary-1000" />
        </Button>
      )}

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
            <Button
              isIconOnly
              className="!rounded-md shadow-shadow-light-tight/1 min-w-fit p-2 bg-secondary-400"
              color="default"
              variant="light"
              onPress={() => setIsOpen(false)}
            >
              <Share className="text-white" />
            </Button>

            <div className="flex gap-1.5">
              <Button
                className="!rounded-md shadow-shadow-light-tight/1 bg-white min-w-fit p-2"
                onClick={() => shareTo('telegram')}
              >
                <TelegramIcon />
              </Button>
              <Button
                className="!rounded-md shadow-shadow-light-tight/1 bg-white min-w-fit p-2"
                onClick={() => shareTo('linkedin')}
              >
                <LinkedinIcon />
              </Button>
              <Button
                className="!rounded-md shadow-shadow-light-tight/1 bg-white min-w-fit p-2"
                onClick={() => shareTo('instagram')}
              >
                <InstagramIcon />
              </Button>
              <Button
                className="!rounded-md shadow-shadow-light-tight/1 bg-white min-w-fit p-2"
                onClick={() => shareTo('whatsapp')}
              >
                <WhatsAppIcon />
              </Button>
              <Button
                className="!rounded-md shadow-shadow-light-tight/1 bg-white min-w-fit p-2"
                onClick={() => shareTo('copy')}
              >
                <Add
                  size="22"
                />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
