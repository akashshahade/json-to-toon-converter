import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Editor from './components/Editor';
import Footer from './components/Footer';
import About from './components/About';
import { convertJsonToToon } from './services/toonService';
import { ArrowRightIcon, TrashIcon } from './components/Icons';

const jsonSamples = [
`{
  "products": [
    {
      "id": 101,
      "name": "Laptop",
      "price": 999.99,
      "inStock": true,
      "tags": [
        "electronics",
        "computers"
      ]
    },
    {
      "id": 102,
      "name": "Mouse",
      "price": 29.99,
      "inStock": true,
      "tags": [
        "electronics",
        "accessories"
      ]
    },
    {
      "id": 103,
      "name": "Keyboard",
      "price": 79.99,
      "inStock": false,
      "tags": [
        "electronics",
        "accessories"
      ]
    }
  ],
  "metadata": {
    "totalProducts": 3,
    "lastUpdated": "2025-01-15T10:30:00Z"
  }
}`,
`{
  "user": {
    "id": "a1b2c3d4",
    "username": "coder_dev",
    "profile": {
      "name": "Alex Doe",
      "email": "alex.doe@example.com",
      "joined": "2023-01-15T09:00:00Z"
    },
    "roles": [
      "editor",
      "contributor"
    ],
    "active": true,
    "preferences": null
  }
}`,
`{
  "report": "Q4 Sales",
  "period": "2024-10-01_to_2024-12-31",
  "data": [
    {
      "region": "North",
      "sales": 45000,
      "reps": 15
    },
    {
      "region": "South",
      "sales": 52000,
      "reps": 18
    },
    {
      "region": "East",
      "sales": 48000,
      "reps": 16
    },
    {
      "region": "West",
      "sales": 61000,
      "reps": 20
    }
  ],
  "isFinal": true
}`
];


const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>(jsonSamples[0]);
  const [toonOutput, setToonOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [view, setView] = useState<'converter' | 'about'>('converter');
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTheme = window.localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleConvert = useCallback(() => {
    if (!jsonInput.trim()) {
      setError('JSON input cannot be empty.');
      setToonOutput('');
      return;
    }
    try {
      const result = convertJsonToToon(jsonInput);
      setToonOutput(result);
      setError('');
    } catch (e: any) {
      setError(e.message);
      setToonOutput('');
    }
  }, [jsonInput]);
  
  const handleClear = () => {
    setJsonInput('');
    setToonOutput('');
    setError('');
  };

  const loadRandomExample = () => {
    const nextIndex = (currentSampleIndex + 1) % jsonSamples.length;
    setJsonInput(jsonSamples[nextIndex]);
    setCurrentSampleIndex(nextIndex);
    setToonOutput('');
    setError('');
  };
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        currentView={view} 
        setView={setView} 
        currentTheme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="flex-grow w-full px-4 py-8 flex flex-col items-center">
        {view === 'converter' ? (
          <>
            <Hero />
            <div className="w-full max-w-screen-2xl mx-auto mt-8">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
                <div className="w-full h-full">
                  <Editor
                    title="JSON Input"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Paste your JSON here..."
                    error={error}
                    onRandomize={loadRandomExample}
                  />
                </div>
                
                <div className="flex flex-row md:flex-col gap-2 mx-auto my-4 md:my-0 md:mt-8">
                  <button
                    onClick={handleConvert}
                    className="bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 font-semibold rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-900 dark:focus:ring-gray-100"
                    aria-label="Convert JSON to TOON"
                  >
                    <ArrowRightIcon />
                    <span className="hidden sm:inline">Convert</span>
                  </button>
                   <button
                    onClick={handleClear}
                    className="bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200 font-semibold rounded-lg px-4 py-2 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 shadow-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-900 dark:focus:ring-gray-400"
                    aria-label="Clear editors"
                  >
                    <TrashIcon />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                </div>

                <div className="w-full h-full">
                  <Editor
                    title="TOON Output"
                    value={toonOutput}
                    readOnly
                    placeholder="TOON output will appear here..."
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <About />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;