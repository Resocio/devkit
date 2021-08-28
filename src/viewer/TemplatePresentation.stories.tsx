import React from 'react';
import { Story, Meta } from '@storybook/react';

import TemplatePresentation, { TemplatePresentationProps } from './TemplatePresentation';
import { loadRemoteTemplate } from '@resoc/core';

export default {
  title: 'TemplatePresentation',
  component: TemplatePresentation
} as Meta;

type TemplateStory = {
  loaders?: (() => Promise<any>)[];
} & Story<TemplatePresentationProps>;

const Template: TemplateStory = (args: TemplatePresentationProps, { loaded: { template } }) => (
  <TemplatePresentation {...args} template={template} />
);

export const Default = Template.bind({});
Default.loaders = [
  async () => ({
    template: await loadRemoteTemplate('/templates/template01/image-template-manifest.json')
  }),
];
Default.args = {};