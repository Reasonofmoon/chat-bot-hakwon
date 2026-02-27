import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from './components/Button';

declare const require: any;
const fs = require('fs');

const css = `
  body { font-family: sans-serif; padding: 20px; }
  .row { margin-bottom: 20px; }
  .label { display: inline-block; width: 200px; }
  button { padding: 8px 16px; border: 1px solid #ccc; background: #eee; border-radius: 4px; }
`;

const html = renderToStaticMarkup(
  <html>
    <head>
      <title>Button Preview</title>
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </head>
    <body>
      <h1>Button Preview</h1>
      <div className="row">
        <span className="label">Default:</span>
        <Button id="btn-default">Default Button</Button>
      </div>
      <div className="row">
        <span className="label">Loading (start):</span>
        <Button id="btn-loading" isLoading>Loading...</Button>
      </div>
      <div className="row">
        <span className="label">Disabled:</span>
        <Button id="btn-disabled" disabled>Disabled Button</Button>
      </div>
      <div className="row">
        <span className="label">Loading + Custom Cursor:</span>
        <Button id="btn-custom-cursor" isLoading style={{ cursor: 'pointer' }}>Loading...</Button>
      </div>
    </body>
  </html>
);

fs.writeFileSync('preview.html', '<!DOCTYPE html>' + html);
console.log('preview.html generated');
