import React from 'react';
import { Story, Meta } from '@storybook/react';

import ParamInput, { ParamInputProps } from './ParamInput';
import { ParamType } from '@resoc/core';

export default {
  title: 'ParamInput',
  component: ParamInput,
  argTypes: {
    onChange: {
      action: 'clicked'
    }
  }
} as Meta;

const Template: Story<ParamInputProps> = (args, { loaded: { template } }) => (
  <ParamInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  param: {
    name: 'My parameter',
    slug: 'my_param',
    type: ParamType.ImageUrl,
    demoValue: "/img/logo.png"
  }
};
