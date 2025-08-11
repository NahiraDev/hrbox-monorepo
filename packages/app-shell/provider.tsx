import { HeroUIProvider } from "@heroui/react";
import { useHref, useNavigate } from "react-router-dom";

export function HeroProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      {children}
    </HeroUIProvider>
  );
}
