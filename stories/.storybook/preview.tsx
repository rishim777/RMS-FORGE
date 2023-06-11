import '../../packages/design-tokens/base.css';
import '../../packages/design-tokens/font-loader.css';

import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Decorator, Preview } from '@storybook/react';
import { ForgeContextProvider } from '../../packages/utils';

export const customViewports: typeof INITIAL_VIEWPORTS = {
  // IMPORTANT: keep values in sync [DUPLICATE_HARDCODED_BREAKPOINTS]
  small: {
    name: 'Small',
    styles: {
      height: '720px',
      width: '400px',
    },
    type: 'mobile',
  },
  medium: {
    name: 'Medium',
    styles: {
      height: '720px',
      width: '600px',
    },
    type: 'mobile',
  },
  large: {
    name: 'Large',
    styles: {
      height: '720px',
      width: '840px',
    },
    type: 'desktop',
  },
  desktop: {
    name: 'Desktop (responsive phase 1)',
    styles: {
      height: '720px',
      width: '840px',
    },
    type: 'desktop',
  },
  xlarge: {
    name: 'XLarge',
    styles: {
      height: '720px',
      width: '960px',
    },
    type: 'desktop',
  },
  xxlarge: {
    name: 'XXLarge',
    styles: {
      height: '720px',
      width: '1280px',
    },
    type: 'desktop',
  },
  xxxlarge: {
    name: 'XXXLarge',
    styles: {
      height: '720px',
      width: '1440px',
    },
    type: 'desktop',
  },
};

// Decorate all stories with RMS/ForgeProvider that gets its value from toolbar (context.globals)
const withProvider: Decorator = (Story, context) => {
  const locale = context.globals.locale;

  return (
    <ForgeContextProvider value={{ locale }}>
      <Story {...context} />
    </ForgeContextProvider>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'Neutral',
      values: [
        {
          name: 'Neutral',
          value: '#f4f7fe',
        },
        {
          name: 'White',
          value: '#ffffff',
        },
        {
          name: 'Black',
          value: '#18191b',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: { ...customViewports, ...INITIAL_VIEWPORTS },
      defaultViewport: 'galaxys9', // the closest to the most popular mobile resolution in Indonesia, ref: https://gs.statcounter.com/screen-resolution-stats/mobile/indonesia
    },
  },
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Global locale selector for components',
      defaultValue: 'id',
      toolbar: {
        // Icons list see: https://storybook.js.org/docs/react/workflows/faq#what-icons-are-available-for-my-toolbar-or-my-addon
        icon: 'globe',
        items: [
          { value: 'id', right: '🇮🇩', title: 'Indonesian' },
          { value: 'en', right: '🇺🇸', title: 'English' },
        ],
      },
    },
  },
  decorators: [withProvider],
};

export default preview;
