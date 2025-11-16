import { useMemo } from 'react';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import { getDomainConfig } from '@hrbox/core/config/theme/domains';

interface DynamicLogoProps {
  variant?: 'default' | 'mobile';
  className?: string;
}

export function DynamicLogo({ variant = 'default', className = '' }: DynamicLogoProps) {
  const domainTheme = useAppSelector((state: any) => state.auth.domainTheme);
  const { logoSrc, alt } = useMemo(() => {
    if (!domainTheme) {
      return { logoSrc: '', alt: '' };
    }
    const config = getDomainConfig(domainTheme);
    return {
      logoSrc: variant === 'mobile' ? config.logoMobile : config.logo,
      alt: config.title,
    };
  }, [domainTheme, variant]);

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
