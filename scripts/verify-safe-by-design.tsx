import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from '../src/components/Button';
import { Spinner } from '../src/components/Spinner';

console.log('🛡️ Sentinel: Verifying Safe By Design policy...');

let hasError = false;

// Helper to check for vulnerability
function checkComponent(name: string, Component: any) {
  const dangerousContent = '<img src=x onerror=alert(1)>';
  const props = {
    dangerouslySetInnerHTML: { __html: dangerousContent }
  };

  try {
    // @ts-ignore - purposefully passing dangerous prop to test rejection
    const html = renderToStaticMarkup(<Component {...props} />);

    if (html.includes(dangerousContent)) {
      console.error(`❌ [CRITICAL] ${name} accepts dangerouslySetInnerHTML!`);
      console.error(`   Output: ${html}`);
      hasError = true;
    } else {
      console.log(`✅ ${name} correctly rejects dangerouslySetInnerHTML.`);
    }
  } catch (error) {
    console.error(`⚠️ Error testing ${name}:`, error);
    hasError = true;
  }
}

checkComponent('Button', Button);
checkComponent('Spinner', Spinner);

if (hasError) {
  console.error('🚨 Security verification FAILED!');
  throw new Error('Security verification failed');
} else {
  console.log('🔒 All security checks passed.');
}
