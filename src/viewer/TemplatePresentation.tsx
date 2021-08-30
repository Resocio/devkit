import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { demoParamValues, ImageTemplate, ParamValues } from '@resoc/core';
import ParamInput from './ParamInput';
import TemplatePreview from './TemplatePreview';

export type TemplatePresentationProps = {
  template: ImageTemplate;
};

const RATIO_FACEBOOK = 1.91;
const RATIO_TWTTER = 2.0;

const WIDTH = 470;

type PreviewProps = {
  title: string;
  template: ImageTemplate;
  parameters: ParamValues;
  ratio: number;
};

const Preview = (props: PreviewProps) => (
  <div className="mb-3">
    <h2>{props.title}</h2>
    <TemplatePreview
      template={props.template}
      parameters={props.parameters}
      width={WIDTH}
      height={WIDTH / props.ratio}
    />
  </div>
);

const TemplatePresentation = (props: TemplatePresentationProps) => {
  const [parameters, setParameters] = useState<ParamValues>(demoParamValues(props.template.parameters));

  return (
    <div>
      <Row>
        <Col md={6}>
          <Preview
            title="Facebook"
            template={props.template}
            parameters={parameters}
            ratio={RATIO_FACEBOOK}
          />

          <Preview
            title="Twitter Card"
            template={props.template}
            parameters={parameters}
            ratio={RATIO_TWTTER}
          />
        </Col>

        <Col md={6}>
          <h2>Parameters</h2>

          {props.template.parameters.map(param => (
            <ParamInput
              key={param.name}
              param={param}
              value={parameters[param.name]}
              onChange={(v) => {
                const newValues = Object.assign({}, parameters);
                newValues[param.name] = v;
                setParameters(newValues);
              }}
            />
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default TemplatePresentation;
