import React from 'react'
import { Form } from 'react-bootstrap';
import type { TemplateParam } from '@resoc/core';
import { ParamType } from '@resoc/core';

export type ParamInputProps = {
  param: TemplateParam;
  value: string;
  onChange: (value: string) => void;
};

const ParamInput = (props: ParamInputProps) => (
  <Form.Group>
    <Form.Label>{props.param.name}</Form.Label>
    <Form.Control
      type={toHtmlType(props.param.type)}
      placeholder={props.param.defaultValue}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}
    />
  </Form.Group>
);

const toHtmlType = (type: ParamType): string => {
  switch(type) {
    case(ParamType.ImageUrl):
      return 'url';
    case(ParamType.Color):
      return 'color';
    case(ParamType.String):
    case(ParamType.TextDirection):
    default:
      return 'text';
  }
};

export default ParamInput;
