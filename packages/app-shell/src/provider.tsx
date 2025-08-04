import { HeroUIProvider } from "@heroui/system";
import { useNavigate, useHref } from "react-router-dom";
import React from "react";

export function HeroProviderWrapper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const href = useHref;

  return (
    <HeroUIProvider navigate={navigate} useHref={href}>
      {children}
    </HeroUIProvider>
  );
}
