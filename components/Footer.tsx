import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>
          Developed by{' '}
          <a href="https://www.linkedin.com/in/akashshahade/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors underline">Akash Shahade</a>.
           Source on <a href="https://github.com/akashshahade" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors underline">GitHub</a>.
        </p>
        <p className="mt-2">
          Learn more about the{' '}
          <a
            href="https://github.com/toon-format/toon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors underline"
          >
            TOON format
          </a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;