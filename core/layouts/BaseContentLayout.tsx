import React, { useState, useEffect, type ReactNode } from 'react';

import { BaseLayout } from './BaseLayout';

function containsPageHeader(children: ReactNode): boolean {
  const childArray = React.Children.toArray(children);

  for (const child of childArray) {
    if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
      if (child.type === React.Fragment) {
        return containsPageHeader(child.props.children);
      }
    }
  }

  return false;
}

export const BaseContentLayout = ({ props }: { props: any }) => {
  const { children } = props;

  const [hasPageHeader, setHasPageHeader] = useState<boolean>(false);

  useEffect(() => {
    const headerExists = containsPageHeader(children);

    setHasPageHeader(headerExists);
  }, [children]);

  const dynamicHeight = `calc(100vh - ${hasPageHeader ? '310px' : '270px'})`;

  return (
    <div className="w-full" style={{ height: dynamicHeight }}>
      <BaseLayout
        props={{
          children: { children },
        }}
      />
    </div>
  );
};
