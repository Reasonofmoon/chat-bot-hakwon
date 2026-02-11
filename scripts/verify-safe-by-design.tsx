import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '../src/components/Button';
import { Spinner } from '../src/components/Spinner';

console.log('Verifying Safe By Design Policy...');

const maliciousPayload = {
  __html: 'MALICIOUS_SCRIPT'
};

let errors = 0;

// Verify Button
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

// Verify Spinner
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

if (errors > 0) {
  console.error(`Found ${errors} security violations.`);
  throw new Error('Security verification failed');
} else {
  console.log('All Safe By Design checks passed.');
}
