# Tamil Unicode Terminal for VS Code (`vscode-tamil-terminal-graphemes`)

A VS Code webview extension that provides an **xterm.js** terminal environment with **UTF-8 grapheme cluster awareness** (`@xterm/addon-unicode-graphemes`) tailored for complex scripts like **Tamil** (`தமிழ்`).

---

## 🌟 Key Features

- **Grapheme Cluster Awareness (UAX #29)**: Implements Unicode 15 Grapheme Cluster Boundaries algorithm via `@xterm/addon-unicode-graphemes`.
- **Atomic Navigation for Tamil Script**: Treats base consonants paired with pulli (dot) or dependent vowel signs (e.g., `க்`, `கி`, `கெ`) as single, uninterruptible logical units.
- **Improved Editing Experience**: 
  - **Cursor movement**: Left/Right arrow keys jump past full Tamil clusters in a single keypress.
  - **Deletion**: Backspacing removes full combined characters seamlessly without leaving stray base characters or combining marks.
  - **Text Selection**: Click-and-drag selection highlights complete grapheme clusters atomically.
- **Custom Font Fallbacks**: Configured with `Noto Sans Tamil` and monospace fallbacks for crisp glyph rendering.

---

## 🧪 Tamil Text Test Cases

| Cluster | Code Point Breakdown | Rendered Unit | Expected Navigation / Deletion Behavior |
| :--- | :--- | :--- | :--- |
| **`க்`** | `க` (U+0B95) + `்` (U+0BCD) | Consonant + Pulli | 1 Arrow key press / 1 Backspace |
| **`கி`** | `க` (U+0B95) + `ி` (U+0BBF) | Consonant + Vowel Sign | 1 Arrow key press / 1 Backspace |
| **`தமிழ்`** | `த` + `மி` (`ம`+`ி`) + `ழ்` (`ழ`+`்`) | Full Word (3 clusters) | 3 Arrow key steps |

---

## 🚀 Getting Started & Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Visual Studio Code](https://code.visualstudio.com/) (v1.80.0+)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vscode-tamil-terminal-graphemes.git
   cd vscode-tamil-terminal-graphemes
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Compile the TypeScript code**:
   ```bash
   npm run compile
   ```

4. **Run and Debug in VS Code**:
   - Open the project folder in VS Code.
   - Press `F5` to open a new **Extension Development Host** window.
   - Click on the **Tamil Terminal** icon in the Activity Bar to launch the webview terminal.

---

## 🏗️ Project Structure

```text
.
├── package.json          # Extension manifest & dependencies (@xterm/xterm, @xterm/addon-unicode-graphemes)
├── tsconfig.json         # TypeScript configuration
├── src/
│   └── extension.ts      # Extension entry point & Webview Provider setup
└── README.md             # Project documentation
```

---

## 📜 Technical Background & References

- **Unicode Standard Annex #29**: [Unicode Text Segmentation](https://unicode.org/reports/tr29/)
- **xterm.js**: [xtermjs/xterm.js GitHub Repository](https://github.com/xtermjs/xterm.js)
- **Addon**: [`@xterm/addon-unicode-graphemes`](https://www.npmjs.com/package/@xterm/addon-unicode-graphemes)

---

## 📄 License

MIT License.
