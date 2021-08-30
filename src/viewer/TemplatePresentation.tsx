import React, { useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { demoParamValues, ImageTemplate, ParamValues } from '@resoc/core';
import ParamInput from './ParamInput';
import TemplatePreview from './TemplatePreview';
import styled from 'styled-components';

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
  <div>
    <Card.Subtitle>{props.title}</Card.Subtitle>
    <TemplatePreview
      template={props.template}
      parameters={props.parameters}
      width={WIDTH}
      height={WIDTH / props.ratio}
    />
  </div>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ParamsContainer = styled.div`
  flex: 1;
`;

const PreviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TemplatePresentation = (props: TemplatePresentationProps) => {
  const [parameters, setParameters] = useState<ParamValues>(demoParamValues(props.template.parameters));

  return (
    <Wrapper>
      <Card>
        <Card.Body>
          <Card.Title>Previews</Card.Title>

          <PreviewsWrapper>
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
          </PreviewsWrapper>
        </Card.Body>
      </Card>

      <ParamsContainer>
        <Card>
          <Card.Body>
            <Card.Title>Parameters</Card.Title>

            <Form>
              {props.template.parameters.map(param => (
                <div className="mb-3">
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
                </div>
              ))}
            </Form>
          </Card.Body>
        </Card>
      </ParamsContainer>
    </Wrapper>
  );
};

export default TemplatePresentation;
