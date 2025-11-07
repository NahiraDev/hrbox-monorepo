import { HeroUIProvider } from '@heroui/system';
import React from "react";

export function HeroProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeroUIProvider>
      <main>{children}</main>
    </HeroUIProvider>
  );
}
