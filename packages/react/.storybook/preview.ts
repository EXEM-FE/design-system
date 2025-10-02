import type { Preview } from '@storybook/react';
import './tailwind.css';

if (typeof document !== 'undefined') {
  const ensureStorybookScroll = () => {
    document.body.classList.add('storybook-scrollable');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureStorybookScroll, {
      once: true,
    });
  } else {
    ensureStorybookScroll();
  }
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export default preview;
