import React from 'react';
import { Story, Meta } from '@storybook/react';

import TemplatePreview, { TemplatePreviewProps } from './TemplatePreview';
import { loadRemoteTemplate } from '@resoc/core';

export default {
  title: 'TemplatePreview',
  component: TemplatePreview
} as Meta;

type TemplateStory = {
  loaders?: (() => Promise<any>)[];
} & Story<TemplatePreviewProps>;

const Template: TemplateStory = (args: TemplatePreviewProps, { loaded: { template } }) => (
  <TemplatePreview {...args} template={template} />
);

export const Default = Template.bind({});
Default.loaders = [
  async () => ({
    template: await loadRemoteTemplate('/templates/template01/image-template-manifest.json')
  }),
];
Default.args = {
  width: 500,
  height: 300,
  parameters: {
    logoUrl: '/img/logo.png',
    mainImageUrl: '/img/photo.jpg',
    textColor: '#ffffff',
    backgroundColor: '#654789',
    title: 'Some great content here',
    direction: 'ltr',
  }
};
