import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="text-center max-w-3xl">
      <div className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
        <span className="mr-2 font-mono text-xs">&lt;/&gt;</span>
        FREE TOOL
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tighter">
        JSON to TOON
      </h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Optimize your LLM prompts by converting JSON to the token-efficient TOON format. Less fluff, more data. Free, fast, and entirely in your browser.
      </p>
    </div>
  );
};

export default Hero;