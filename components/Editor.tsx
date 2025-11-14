import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface EditorProps {
  title: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  readOnly?: boolean;
  error?: string;
  onRandomize?: () => void;
}

const Editor: React.FC<EditorProps> = ({
  title,
  value,
  onChange,
  placeholder,
  readOnly = false,
  error,
  onRandomize,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const borderColor = error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 focus-within:border-gray-900 dark:focus-within:border-gray-400';

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <label htmlFor={title} className="font-semibold text-gray-700 dark:text-gray-300">{title}</label>
          {onRandomize && (
            <button
              onClick={onRandomize}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
              aria-label="Load a random example"
            >
              Load Example
            </button>
          )}
        </div>
        {readOnly && value && (
          <button
            onClick={handleCopy}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            aria-label="Copy TOON output"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
      <div className={`flex-grow bg-white dark:bg-gray-800 rounded-lg border ${borderColor} transition-colors shadow-inner flex flex-col`}>
        <textarea
          id={title}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className="w-full h-full flex-grow p-4 bg-transparent text-gray-800 dark:text-gray-100 font-mono text-sm resize-none focus:outline-none min-h-[300px] lg:min-h-[450px]"
          spellCheck="false"
          aria-label={`${title} editor`}
          aria-invalid={!!error}
        />
      </div>
       {error && <p className="text-red-600 dark:text-red-500 text-sm mt-2" role="alert">{error}</p>}
    </div>
  );
};

export default Editor;