import { HeroUIProvider } from '@heroui/system';

export function HeroProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <main>{children}</main>
    </HeroUIProvider>
  );
}
