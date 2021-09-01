import React from 'react';
import { Story, Meta } from '@storybook/react';

import TemplatePresentation, { TemplatePresentationProps } from './TemplatePresentation';
import { DefaultManifestName, loadRemoteTemplate } from '@resoc/core';

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
    template: await loadRemoteTemplate(`/${DefaultManifestName}`)
  }),
];
Default.args = {};
