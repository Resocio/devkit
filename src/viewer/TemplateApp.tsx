import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import { ImageTemplate, loadRemoteTemplate } from '@resoc/core';
import TemplatePresentation from './TemplatePresentation';

export type TemplateAppProps = {
  manifestUrl: string;
};

const TemplateApp = (props: TemplateAppProps) => {
  const [template, setTemplate] = useState<ImageTemplate | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      if (!template) {
        try {
          setTemplate(await loadRemoteTemplate(props.manifestUrl));
        }
        catch(e) {
          setError(e);
        }
      }
    })();
  }, [props.manifestUrl]);

  return (
    <div>
      {error && (
        <Alert variant="danger">
          <p>
            <strong>{error.message}</strong>
          </p>
        </Alert>
      )}

      {template && (
        <TemplatePresentation
          template={template}
        />
      )}
    </div>
  );
};

export default TemplateApp;
