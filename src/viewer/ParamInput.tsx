import React, { ReactFragment } from 'react'
import { Form } from 'react-bootstrap';
import { paramLabel, TemplateParam } from '@resoc/core';
import { ParamType } from '@resoc/core';

export type ParamInputProps = {
  param: TemplateParam;
  value: string;
  onChange: (value: string) => void;
};

const ParamInput = (props: ParamInputProps) => {
  let field: ReactFragment;

  switch(props.param.type) {
    case(ParamType.Choice):
      field = (
        <Form.Select
          aria-label={paramLabel(props.param)}
          onSelect={(e) => {
            // Although e.target is not a FormControlElement, value field *does* exist
            const target: any = e.target;
            props.onChange(target.value);
          }}
        >
          {props.param.values?.map(v =>
            <option value={v.value}>{v.label || v.value}</option>
          )}
        </Form.Select>
      );
      break;
    case(ParamType.ImageUrl):
    case(ParamType.Color):
    case(ParamType.String):
    default:
      field = (
        <Form.Control
          type={toHtmlType(props.param.type)}
          placeholder={props.param.defaultValue}
          onChange={(e) => props.onChange(e.target.value)}
          value={props.value}
        />
      );
  }

  return (
    <Form.Group>
      <Form.Label>{paramLabel(props.param)}</Form.Label>
      {field}
    </Form.Group>
  );
};

const toHtmlType = (type: ParamType): string => {
  switch(type) {
    case(ParamType.ImageUrl):
      return 'url';
    case(ParamType.Color):
      return 'color';
    case(ParamType.String):
    case(ParamType.Choice):
    default:
      return 'text';
  }
};

export default ParamInput;
