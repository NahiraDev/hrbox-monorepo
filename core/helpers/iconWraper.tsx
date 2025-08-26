import type { ComponentType } from 'react';
import type { SVGProps } from 'react';

export const createIconWrapper = <T extends Record<string, any>>(
  IconComponent: ComponentType<{ props: T }>,
): ComponentType<T> => {
  return function WrappedIcon(props: T) {
    return <IconComponent props={props} />;
  };
};

export const createColorableIcon = <T extends { color?: string }>(
  IconComponent: ComponentType<{ props: T }>,
): ComponentType<SVGProps<SVGSVGElement> & { color?: string }> => {
  return function ColorableIcon({ color, ...props }) {
    return <IconComponent props={{ color, ...props } as T} />;
  };
};

export const wrapIcons = <
  T extends Record<string, ComponentType<{ props: any }>>,
>(
  icons: T,
): { [K in keyof T]: ComponentType<any> } => {
  const wrapped: Record<string, ComponentType<any>> = {};

  for (const [key, Icon] of Object.entries(icons)) {
    wrapped[key] = createColorableIcon(Icon);
    wrapped[key].displayName = `${key.charAt(0).toUpperCase() + key.slice(1)}Icon`;
  }

  return wrapped as { [K in keyof T]: ComponentType<any> };
};
