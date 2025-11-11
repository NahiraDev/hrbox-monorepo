import { useState } from 'react';
import { useTheme } from '@Projects/hrbox-monorepo/core/hooks/useTheme';

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('colors');

  const {
    panel,
    isDark,
    isCustomized,
    canUndo,
    canRedo,
    toggleMode,
    setPanel,
    setColor,
    getColor,
    setFont,
    getFont,
    setSpacing,
    getSpacing,
    setRadius,
    getRadius,
    setCustomCSS,
    reset,
    undo,
    redo,
    config,
  } = useTheme();

  // ============================================
  // Tab Content
  // ============================================

  const renderTabContent = () => {
    switch (activeTab) {
      case 'colors':
        return <ColorsTab getColor={getColor} setColor={setColor} />;
      case 'typography':
        return <TypographyTab getFont={getFont} setFont={setFont} />;
      case 'spacing':
        return <SpacingTab getSpacing={getSpacing} setSpacing={setSpacing} />;
      case 'radius':
        return <RadiusTab getRadius={getRadius} setRadius={setRadius} />;
      case 'custom':
        return <CustomCSSTab config={config} setCustomCSS={setCustomCSS} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* 🎨 Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-xl"
        aria-label="Open Theme Customizer"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </button>

      {/* 🎨 Sidebar Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-panel-surface shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 p-6">
              <div>
                <h2 className="text-xl font-bold text-secondary-1000 dark:text-white">
                  🎨 Theme Customizer
                </h2>
                {isCustomized && (
                  <span className="text-xs text-primary-500">
                    ● Custom Theme Active
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            {/* Quick Actions */}
            <div className="border-b border-neutral-200 dark:border-neutral-700 p-4 space-y-3">
              {/* Mode Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-secondary-900 dark:text-white">
                  Theme Mode
                </span>
                <button
                  onClick={toggleMode}
                  className="flex items-center gap-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 px-4 py-2 text-sm font-medium transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  {isDark ? '🌙 Dark' : '☀️ Light'}
                </button>
              </div>

              {/* Panel Switch */}
              <div>
                <span className="text-sm font-medium text-secondary-900 dark:text-white mb-2 block">
                  Panel
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {['hrlink', 'hrbox', 'super-admin'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPanel(p as any)}
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                        panel === p
                          ? 'bg-primary-500 text-white'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-secondary-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {p.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* History Controls */}
              <div className="flex gap-2">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className="flex-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 px-3 py-2 text-sm font-medium transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↶ Undo
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className="flex-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 px-3 py-2 text-sm font-medium transition-all hover:bg-neutral-200 dark:hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↷ Redo
                </button>
                <button
                  onClick={reset}
                  className="rounded-lg bg-danger-500 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-danger-600"
                >
                  🔄
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto">
              {[
                { id: 'colors', label: '🎨 Colors' },
                { id: 'typography', label: '📝 Fonts' },
                { id: 'spacing', label: '📏 Spacing' },
                { id: 'radius', label: '⭕ Radius' },
                { id: 'custom', label: '💻 CSS' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'border-b-2 border-primary-500 text-primary-500'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-secondary-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================
// Colors Tab
// ============================================

function ColorsTab({ getColor, setColor }: any) {
  const colorGroups = [
    { name: 'Primary', key: 'primary', shades: [500, 600, 700] },
    { name: 'Secondary', key: 'secondary', shades: [500, 600, 700] },
    { name: 'Success', key: 'success', shades: [50, 100, 900] },
    { name: 'Danger', key: 'danger', shades: [50, 100, 900] },
  ];

  return (
    <div className="space-y-6">
      {colorGroups.map((group) => (
        <div key={group.key}>
          <h3 className="mb-3 text-sm font-semibold text-secondary-900 dark:text-white">
            {group.name}
          </h3>
          <div className="space-y-2">
            {group.shades.map((shade) => {
              const path = `${group.key}.${shade}`;
              const color = getColor(path) || '#000000';
              return (
                <div key={shade} className="flex items-center gap-3">
                  <span className="w-12 text-xs text-neutral-600 dark:text-neutral-400">
                    {shade}
                  </span>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(path, e.target.value)}
                    className="h-10 w-16 cursor-pointer rounded border-2 border-neutral-200 dark:border-neutral-700"
                  />
                  <span className="flex-1 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                    {color}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// Typography Tab
// ============================================

function TypographyTab({ getFont, setFont }: any) {
  const fonts = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Yekan Bakh',
    'Vazir',
    'Fira Code',
  ];

  return (
    <div className="space-y-4">
      {['display', 'body', 'mono'].map((type) => (
        <div key={type}>
          <label className="mb-2 block text-sm font-medium text-secondary-900 dark:text-white">
            {type.charAt(0).toUpperCase() + type.slice(1)} Font
          </label>
          <select
            value={getFont(type)?.replace(/['"]/g, '') || ''}
            onChange={(e) => setFont(type as any, `'${e.target.value}'`)}
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2 text-sm"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

// ============================================
// Spacing Tab
// ============================================

function SpacingTab({ getSpacing, setSpacing }: any) {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  return (
    <div className="space-y-3">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          <label className="w-12 text-sm font-medium text-secondary-900 dark:text-white">
            {size}
          </label>
          <input
            type="text"
            value={getSpacing(size) || ''}
            onChange={(e) => setSpacing(size, e.target.value)}
            className="flex-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm"
            placeholder="e.g., 16px"
          />
        </div>
      ))}
    </div>
  );
}

// ============================================
// Radius Tab
// ============================================

function RadiusTab({ getRadius, setRadius }: any) {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];

  return (
    <div className="space-y-3">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          <label className="w-12 text-sm font-medium text-secondary-900 dark:text-white">
            {size}
          </label>
          <input
            type="text"
            value={getRadius(size) || ''}
            onChange={(e) => setRadius(size, e.target.value)}
            className="flex-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm"
            placeholder="e.g., 8px"
          />
        </div>
      ))}
    </div>
  );
}

// ============================================
// Custom CSS Tab
// ============================================

function CustomCSSTab({ config, setCustomCSS }: any) {
  const [css, setCss] = useState(config?.customCSS || '');

  const handleApply = () => {
    setCustomCSS(css);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-neutral-600 dark:text-neutral-400">
        Add custom CSS to override default styles
      </p>
      <textarea
        value={css}
        onChange={(e) => setCss(e.target.value)}
        rows={15}
        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-3 font-mono text-xs"
        placeholder=".custom-class {
  color: red;
  font-size: 16px;
}"
      />
      <button
        onClick={handleApply}
        className="w-full rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600"
      >
        Apply Custom CSS
      </button>
    </div>
  );
}