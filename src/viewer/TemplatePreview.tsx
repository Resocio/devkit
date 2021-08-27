import React, { useEffect, useState } from 'react';
import { ImageTemplate, ParamValues, renderTemplateToHtml } from '@resoc/core';

type SingleIframeProps = {
  me: 'a' | 'b';
  current: 'a' | 'b';
  content: string | null;
  width: number;
  height: number;
  onReady: () => void;
};

const SingleIframe = (props: SingleIframeProps) => (
  <div style={{
    zIndex: props.current === props.me ? 2 : 1,
    position: 'absolute',
    left: 0,
    right: 0
  }}>
    {props.content && (
      <iframe
        scrolling="no"
        srcDoc={props.content}
        width={props.width}
        height={props.height}
        style={{
          border: 0
        }}
        onLoad={() => {
          props.onReady();
        }}
      />
    )}
  </div>
);

export type TemplatePreviewProps = {
  template: ImageTemplate;
  parameters: ParamValues;
  width: number;
  height: number;
};

const TemplatePreview = (props: TemplatePreviewProps) => {
  const [showDivA, setShowDivA] = useState<boolean>(true);
  const [templateA, setTemplateA] = useState<string | null>(null);
  const [templateB, setTemplateB] = useState<string | null>(null);

  useEffect(() => {
    const templateAsHtml = renderTemplateToHtml(
      props.template, {
        ...props.parameters,
          resoc_imageWidth: `${props.width}`,
          resoc_imageHeight: `${props.height}`
      }
    );

    if (showDivA) {
      setTemplateB(templateAsHtml);
    } else {
      setTemplateA(templateAsHtml);
    }
  }, [props.template, props.parameters, props.width, props.height]);

  return (
    <div style={{
      position: 'relative',
      width: props.width,
      height: props.height
    }}>
      <SingleIframe
        me={'a'}
        current={showDivA ? 'a' : 'b'}
        content={templateA}
        width={props.width}
        height={props.height}
        onReady={() => setShowDivA(true)}
      />
      <SingleIframe
        me={'b'}
        current={showDivA ? 'a' : 'b'}
        content={templateB}
        width={props.width}
        height={props.height}
        onReady={() => setShowDivA(false)}
      />
    </div>
  );
};

export default TemplatePreview;
