import React from 'react';

const About: React.FC = () => {
  const jsonExample = `{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" }
  ]
}`;

  const toonExample = `users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`;

  const CodeBlock: React.FC<{ title: string; code: string; lang: string }> = ({ title, code, lang }) => (
    <div className="mt-4">
      <h4 className="font-semibold text-gray-700 dark:text-gray-300">{title}</h4>
      <pre className="bg-gray-900 text-white rounded-lg p-4 mt-2 text-sm font-mono overflow-x-auto">
        <code className={`language-${lang}`}>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">What is TOON?</h3>
        <p>
          Token-Oriented Object Notation is a compact, human-readable serialization format designed for passing structured data to Large Language Models with significantly reduced token usage. It's intended for LLM input, not output.
        </p>
        <p>
          TOON's sweet spot is uniform arrays of objects – multiple fields per row, same structure across items. It borrows YAML's indentation-based structure for nested objects and CSV's tabular format for uniform data rows, then optimizes both for token efficiency in LLM contexts. For deeply nested or non-uniform data, JSON may be more efficient.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Key Features</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>💸 Token-efficient:</strong> typically 30–60% fewer tokens than JSON
          </li>
          <li>
            <strong>🤿 LLM-friendly guardrails:</strong> explicit lengths and fields enable validation
          </li>
          <li>
            <strong>🍱 Minimal syntax:</strong> removes redundant punctuation (braces, brackets, most quotes)
          </li>
          <li>
            <strong>📐 Indentation-based structure:</strong> like YAML, uses whitespace instead of braces
          </li>
          <li>
            <strong>🧺 Tabular arrays:</strong> declare keys once, stream data as rows
          </li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Quick Example</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CodeBlock title="JSON" code={jsonExample} lang="json" />
          <CodeBlock title="TOON" code={toonExample} lang="yaml" />
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
             <p>
                Learn more from the official sources:
             </p>
            <ul className="list-disc pl-5">
                <li><a href="https://github.com/toon-format/spec" target="_blank" rel="noopener noreferrer">Official TOON Specification</a></li>
                <li><a href="https://github.com/toon-format/toon" target="_blank" rel="noopener noreferrer">TOON on GitHub</a></li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default About;