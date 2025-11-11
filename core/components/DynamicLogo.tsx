import { useMemo } from 'react';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import { getDomainConfig } from '@hrbox/core/config/theme/domains';

interface DynamicLogoProps {
  variant?: 'default' | 'mobile';
  className?: string;
}

export function DynamicLogo({ variant = 'default', className = '' }: DynamicLogoProps) {
  const currentPanel = useAppSelector((state: any) => state.auth.currentPanel);
  const { logoSrc, alt } = useMemo(() => {
    if (!currentPanel) {
      return { logoSrc: '', alt: '' };
    }
    const config = getDomainConfig(currentPanel);
    return {
      logoSrc: variant === 'mobile' ? config.logoMobile : config.logo,
      alt: config.title,
    };
  }, [currentPanel, variant]);

  if (!logoSrc) return null;

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}
