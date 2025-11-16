# JSON to TOON

Optimize your LLM prompts by converting JSON into the compact, token-efficient TOON format. Less fluff, more data — free, fast, and entirely in your browser.

<img width="1572" height="930" alt="image" src="https://github.com/user-attachments/assets/b4cddfee-9644-4aad-a033-9cc49a4c6bc3" />

Table of contents
- About
- Features
- Example
- Quick start
  - Prerequisites
  - Install & run
- Usage
- Development
- Contributing
- License
- Author

About
-----
JSON to TOON is a small web tool that converts standard JSON objects into a simplified, token-efficient "TOON" representation. It's intended to help reduce token usage when sending structured data to LLMs by removing unnecessary punctuation and using a compact, human-readable key/value layout.

Features
--------
- Convert JSON into a condensed TOON format in the browser
- Fast, zero-server operation (client-side)
- Copy output to clipboard with a single click
- Example inputs and a clear editor + output UI

Example
-------
JSON Input:
{
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
}

TOON Output:
user:
  id: a1b2c3d4
  username: coder_dev
  profile:
    name: Alex Doe
    email: alex.doe@example.com
    joined: "2023-01-15T09:00:00Z"
  roles[2]: editor,contributor
  active: true
  preferences: null

Quick start
-----------
Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

Install & run (typical)
1. Clone the repo
   git clone https://github.com/akashshahade/json-to-toon-converter.git
2. Install dependencies
   npm install
   or
   yarn
3. Start the dev server
   npm run dev
   or
   yarn dev
4. Open http://localhost:3000 (or the port your dev tool reports) in your browser.

Build for production
- npm run build
- npm run preview (if using a bundler that supports preview)

Note: This repository is primarily TypeScript + HTML. If your setup uses a different bundler (Vite, webpack, etc.), check package.json scripts and adapt the commands accordingly.

Usage
-----
- Paste or type JSON into the left editor pane.
- Click "Convert" to see the TOON output on the right.
- Use "Copy" to copy the TOON output to your clipboard.
- "Load Example" will populate the input with a sample JSON to try the conversion quickly.

Development
-----------
- The project is organized in TypeScript and HTML (see the src/ or public/ folders depending on the repo layout).
- Linting, formatting, and test scripts (if any) can be found in package.json.
- When adding features, keep conversions deterministic and add unit tests for edge-case JSON values (null, nested arrays, deeply nested objects, large arrays).

Contributing
------------
Contributions are welcome! If you want to propose improvements or fixes:
1. Open an issue to discuss the change.
2. Create a descriptive pull request with tests or screenshots when relevant.
3. Follow the existing code style and add documentation for new behavior.

License
-------
This project is open source. Add your chosen license file (e.g., `LICENSE`) to the repository. If you have a preference, add it now — otherwise the repository owner should choose one.

Author
------
Developed by Akash Shahade — https://github.com/akashshahade

Acknowledgements & Links
- TOON format: a compact, token-aware representation for structured data (document or link describing the format can be added here).
- Source and issues: https://github.com/akashshahade/json-to-toon-converter
