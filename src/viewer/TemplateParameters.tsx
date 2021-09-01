import React from 'react'
import { Form } from 'react-bootstrap';
import { ParamValues, TemplateParam } from '@resoc/core';
import ParamInput from './ParamInput';

export type TemplateParametersProps = {
  parameters: TemplateParam[];
  values: ParamValues;
  onChange: (newValues: ParamValues) => void;
};

const TemplateParameters = (props: TemplateParametersProps) => {
  return (
    <Form>
      {props.parameters.map(param => (
        <div className="mb-3">
          <ParamInput
            key={param.name}
            param={param}
            value={props.values[param.name]}
            onChange={(v) => {
              const newValues = Object.assign({}, props.values);
              newValues[param.name] = v;
              props.onChange(newValues);
            }}
          />
        </div>
      ))}
    </Form>
  );
}

export default TemplateParameters;
