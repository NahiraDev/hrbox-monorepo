import { DesignTokens, PanelThemes } from '@/core/design/tokens';

export default {
  title: 'Design System/Tokens',
};

export const Colors = () => (
  <div className="space-y-8 p-8">
    <h1 className="text-3xl font-bold">Color System</h1>

    {/* Primary Colors */}
    <section>
      <h2 className="text-2xl font-semibold mb-4">Primary</h2>
      <div className="grid grid-cols-5 gap-4">
        {Object.entries(DesignTokens.colors.primary).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <div
              className="h-20 rounded-lg shadow"
              style={{ backgroundColor: value }}
            />
            <p className="text-sm font-mono">{key}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Panel Themes */}
    <section>
      <h2 className="text-2xl font-semibold mb-4">Panel Themes</h2>
      {Object.entries(PanelThemes).map(([panel, modes]) => (
        <div key={panel} className="mb-6">
          <h3 className="text-xl font-semibold mb-2 capitalize">{panel}</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(modes).map(([mode, colors]) => (
              <div key={mode} className="space-y-2">
                <p className="font-semibold capitalize">{mode}</p>
                <div className="flex gap-2">
                  {Object.entries(colors).map(([name, color]) => (
                    <div key={name} className="flex-1">
                      <div
                        className="h-16 rounded shadow"
                        style={{ backgroundColor: color }}
                      />
                      <p className="text-xs mt-1">{name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  </div>
);

export const Spacing = () => (
  <div className="space-y-4 p-8">
    <h1 className="text-3xl font-bold">Spacing Scale</h1>
    {Object.entries(DesignTokens.spacing).map(([key, value]) => (
      <div key={key} className="flex items-center gap-4">
        <p className="w-20 font-mono text-sm">{key}</p>
        <div
          className="h-8 bg-primary rounded"
          style={{ width: value }}
        />
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    ))}
  </div>
);

export const Typography = () => (
  <div className="space-y-8 p-8">
    <h1 className="text-3xl font-bold">Typography</h1>

    <section>
      <h2 className="text-2xl font-semibold mb-4">Font Sizes</h2>
      {Object.entries(DesignTokens.typography.fontSize).map(([key, value]) => (
        <p key={key} style={{ fontSize: value }} className="mb-2">
          {key}: The quick brown fox jumps over the lazy dog
        </p>
      ))}
    </section>
  </div>
);