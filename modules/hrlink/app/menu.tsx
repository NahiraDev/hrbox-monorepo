import { useMenu } from '../../../core';
import { JobOffersIcon } from '../icons';
import { HRLinkPaths } from './paths';
import { wrapIcons } from 'core/helpers/iconWraper.tsx';

const MenuIcons = wrapIcons({
  offers: JobOffersIcon,
  detail: JobOffersIcon,
  opportunities: JobOffersIcon,
});

export const HRLinkMenu = () => useMenu('hrlink', HRLinkPaths.routes, MenuIcons);
