import { useMemo } from 'react';
import type { ShelfConfiguration, DesignTheme } from '../../types';

interface ConfigurationPreview2DProps {
  configuration: ShelfConfiguration | null;
  theme: DesignTheme;
}

const themeColors: Record<DesignTheme, { wood: string; woodDark: string; bg: string; stroke: string }> = {
  scandinavian: {
    wood: '#D4A574',
    woodDark: '#B8956A',
    bg: '#F8F6F3',
    stroke: '#2D2D2D',
  },
  craftsman: {
    wood: '#5D4037',
    woodDark: '#4A3028',
    bg: '#E8E4D9',
    stroke: '#3D2A22',
  },
  modern: {
    wood: '#E8C79A',
    woodDark: '#D4B080',
    bg: '#F5F5F7',
    stroke: '#1D1D1F',
  },
};

export default function ConfigurationPreview2D({
  configuration,
  theme,
}: ConfigurationPreview2DProps) {
  const colors = themeColors[theme];

  const shelves = useMemo(() => {
    if (!configuration) return [];

    const items: Array<{ type: string; x: number; y: number; width: number; height: number }> = [];

    // Count components by type
    const uprights = configuration.components.filter((c) => c.component.type === 'upright');
    const shelfItems = configuration.components.filter((c) => c.component.type === 'shelf');
    const bases = configuration.components.filter((c) => c.component.type === 'base');
    const backpanels = configuration.components.filter((c) => c.component.type === 'backpanel');

    // Calculate total upright count
    const totalUprights = uprights.reduce((sum, item) => sum + item.quantity, 0);
    const uprightHeight = uprights[0]?.component.dimensions.height || 180;

    // Scale factor to fit in SVG viewBox
    const scale = 2;

    // Draw uprights
    const spacing = 60 * scale;
    for (let i = 0; i < Math.max(totalUprights, 2); i++) {
      items.push({
        type: 'upright',
        x: 20 + i * spacing,
        y: 20,
        width: 8,
        height: uprightHeight * scale,
      });
    }

    // Draw base
    if (bases.length > 0 || shelfItems.length > 0) {
      items.push({
        type: 'base',
        x: 20,
        y: 20 + uprightHeight * scale - 16,
        width: Math.max((totalUprights - 1) * spacing, spacing) + 8,
        height: 16,
      });
    }

    // Draw shelves evenly distributed
    const totalShelves = shelfItems.reduce((sum, item) => sum + item.quantity, 0);
    const shelfSpacing = (uprightHeight * scale - 32) / (totalShelves + 1);

    for (let i = 0; i < totalShelves; i++) {
      items.push({
        type: 'shelf',
        x: 28,
        y: 20 + shelfSpacing * (i + 1),
        width: Math.max((totalUprights - 1) * spacing - 16, spacing - 16),
        height: 6,
      });
    }

    // Draw back panel if exists
    if (backpanels.length > 0) {
      items.push({
        type: 'backpanel',
        x: 28,
        y: 28,
        width: Math.max((totalUprights - 1) * spacing - 16, spacing - 16),
        height: uprightHeight * scale - 48,
      });
    }

    return items;
  }, [configuration]);

  if (!configuration || configuration.components.length === 0) {
    return (
      <div
        className="w-full h-64 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: colors.bg }}
      >
        <p className="text-gray-400">No components selected</p>
      </div>
    );
  }

  const viewBoxWidth = 300;
  const viewBoxHeight = 400;

  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{ backgroundColor: colors.bg }}
    >
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-auto"
        style={{ maxHeight: '400px' }}
      >
        {/* Back panels first (behind everything) */}
        {shelves
          .filter((item) => item.type === 'backpanel')
          .map((item, index) => (
            <rect
              key={`bp-${index}`}
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
              fill={colors.wood}
              opacity={0.3}
              stroke={colors.stroke}
              strokeWidth={0.5}
            />
          ))}

        {/* Uprights */}
        {shelves
          .filter((item) => item.type === 'upright')
          .map((item, index) => (
            <rect
              key={`up-${index}`}
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
              fill={colors.woodDark}
              stroke={colors.stroke}
              strokeWidth={1}
              rx={1}
            />
          ))}

        {/* Base */}
        {shelves
          .filter((item) => item.type === 'base')
          .map((item, index) => (
            <rect
              key={`base-${index}`}
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
              fill={colors.wood}
              stroke={colors.stroke}
              strokeWidth={1}
              rx={2}
            />
          ))}

        {/* Shelves */}
        {shelves
          .filter((item) => item.type === 'shelf')
          .map((item, index) => (
            <g key={`shelf-${index}`}>
              <rect
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                fill={colors.wood}
                stroke={colors.stroke}
                strokeWidth={1}
                rx={1}
              />
              {/* Shelf shadow */}
              <rect
                x={item.x}
                y={item.y + item.height}
                width={item.width}
                height={2}
                fill={colors.stroke}
                opacity={0.1}
              />
            </g>
          ))}
      </svg>
    </div>
  );
}
