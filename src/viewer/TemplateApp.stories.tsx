import React from 'react';
import { Story, Meta } from '@storybook/react';

import TemplateApp, { TemplateAppProps } from './TemplateApp';

export default {
  title: 'TemplateApp',
  component: TemplateApp
} as Meta;

type TemplateStory = {
  loaders?: (() => Promise<any>)[];
} & Story<TemplateAppProps>;

const Template: Story<TemplateAppProps> = (args: TemplateAppProps) => (
  <TemplateApp {...args} />
);

export const Default = Template.bind({});
Default.args = {
  manifestUrl: '/image-template-manifest.json'
};

export const Broken01 = Template.bind({});
Broken01.args = {
  manifestUrl: '/no-such-manifest.json'
};
