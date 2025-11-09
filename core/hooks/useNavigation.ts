import { useNavigate as useTanStackNavigate } from '@tanstack/react-router';

type NavigateOptions = Parameters<ReturnType<typeof useTanStackNavigate>>[0];

export function useNavigation() {
  const navigate = useTanStackNavigate();

  return {
    push: (options: NavigateOptions) => navigate(options),
    replace: (options: NavigateOptions) => navigate({ ...options, replace: true }),
    back: () => window.history.back(),
    forward: () => window.history.forward(),
  };
}
