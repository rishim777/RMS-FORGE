import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../../../packages/text/src/Text';

const meta = {
  title: 'Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'h3',
    children: 'Change my props value to see difference.',
    weight: 'semibold',
    color: 'paletteFive200',
  },
};
