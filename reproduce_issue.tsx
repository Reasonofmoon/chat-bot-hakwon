import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from './src/components/Button';

// Mock Spinner to avoid issues if needed, but it should be fine.
// actually Spinner is imported in Button, so we need to make sure module resolution works.
// Since we are running with ts-node or similar, we might need to handle imports.
// But I'll use tsc to compile and run.

const html = renderToStaticMarkup(
  <Button isLoading aria-label="Submit">
    Submit
  </Button>
);

console.log(html);
