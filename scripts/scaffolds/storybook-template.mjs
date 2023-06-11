// @ts-check

/**
 * @param {string} componentName
 */
export const createStorybookFile = (componentName) => `import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ${componentName} } from './${componentName}';

const meta = {
  title: '${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Hello I am  ${componentName}',
  },
};
`;
