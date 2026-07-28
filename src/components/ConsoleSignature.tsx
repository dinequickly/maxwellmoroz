'use client';

import { useEffect } from 'react';
import { profile } from '@/content/profile';

/** A note for anyone who opens DevTools. Runs once, client-side only. */
export default function ConsoleSignature() {
  useEffect(() => {
    if (sessionStorage.getItem('mm-console')) return;
    sessionStorage.setItem('mm-console', '1');

    const head = 'color:#c9a86a;font:600 15px ui-monospace,monospace';
    const soft = 'color:#a7a7ad;font:400 12px ui-monospace,monospace';
    const faint = 'color:#6b6b72;font:400 12px ui-monospace,monospace';

    /* eslint-disable no-console */
    console.log('%cWell, look who opened the console.', head);
    console.log(
      '%cIf you read source for fun, we should probably talk.\n%c' + profile.email,
      soft,
      'color:#ededef;font:600 12px ui-monospace,monospace'
    );
    console.log(
      '%cdeep cut: I built a browser agent that does my Costco runs →\n' +
        'github.com/dinequickly/costco-browser-agent',
      faint
    );
    console.log('%cpsst — press ⌘K.', faint);
    /* eslint-enable no-console */
  }, []);

  return null;
}
