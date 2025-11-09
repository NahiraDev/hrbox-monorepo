import { Panel } from "@core/config/theme";

export function extractPanelFromPath(path: string): Panel | null {
  const segments = path.split('/').filter(Boolean);
  const panelSegment = segments[0];

  const panelMap: Record<string, Panel> = {
    hrlink: Panel.HRLINK,
    hrbox: Panel.HRBOX,
    'super-admin': Panel.SUPER_ADMIN,
  };

  return panelMap[panelSegment] || null;
}
