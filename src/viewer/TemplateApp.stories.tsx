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
  manifestUrl: '/templates/template01/image-template-manifest.json'
};

export const Broken01 = Template.bind({});
Broken01.args = {
  manifestUrl: '/templates/broken01/unexisting-manifest.json'
};
