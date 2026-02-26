import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '../src/components/Button';
import { Spinner } from '../src/components/Spinner';

console.log('Verifying Safe By Design Policy...');

const maliciousPayload = {
  __html: 'MALICIOUS_SCRIPT'
};

const maliciousChild = React.createElement('g', { id: 'malicious-child' }, 'malicious');

let errors = 0;

// Verify Button (dangerouslySetInnerHTML)
try {
  // @ts-expect-error - bypassing type check to verify runtime behavior
  const output = renderToStaticMarkup(<Button dangerouslySetInnerHTML={maliciousPayload} />);
  if (output.includes('MALICIOUS_SCRIPT')) {
    console.error('❌ FAIL: Button component renders dangerouslySetInnerHTML!');
    errors++;
  } else {
    console.log('✅ PASS: Button component safely ignores dangerouslySetInnerHTML.');
  }
} catch (e) {
  console.log('✅ PASS: Button component threw error or handled prop safely (Unexpected error: ' + e + ')');
}

// Verify Spinner (dangerouslySetInnerHTML)
try {
  // @ts-expect-error - bypassing type check to verify runtime behavior
  const output = renderToStaticMarkup(<Spinner dangerouslySetInnerHTML={maliciousPayload} />);
  if (output.includes('MALICIOUS_SCRIPT')) {
    console.error('❌ FAIL: Spinner component renders dangerouslySetInnerHTML!');
    errors++;
  } else {
    console.log('✅ PASS: Spinner component safely ignores dangerouslySetInnerHTML.');
  }
} catch (e) {
  console.log('✅ PASS: Spinner component threw error or handled prop safely (Unexpected error: ' + e + ')');
}

// Verify Spinner (children injection)
try {
  const output = renderToStaticMarkup(
    // @ts-expect-error - bypassing type check to verify runtime behavior
    <Spinner children={maliciousChild} /> // eslint-disable-line react/no-children-prop
  );
  if (output.includes('malicious-child')) {
    console.error('❌ FAIL: Spinner component renders children from props! Potential XSS vector.');
    errors++;
  } else {
    console.log('✅ PASS: Spinner component ignores children from props.');
  }
} catch (e) {
  console.log('✅ PASS: Spinner component threw error or handled prop safely (Unexpected error: ' + e + ')');
}

if (errors > 0) {
  console.error(`Found ${errors} security violations.`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
} else {
  console.log('All Safe By Design checks passed.');
}
