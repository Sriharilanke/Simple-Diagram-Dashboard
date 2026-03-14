# Diagram Dashboard

A React dashboard where users can upload a diagram image (PNG/JPG) and view a list of circuit components with zoom controls and selection highlighting.

## Setup Instructions

**Prerequisites:** Node.js (v18 or later recommended) and npm.

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fileUploadProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app** in your browser at [http://localhost:5173](http://localhost:5173).

---

## Build for production

```bash
npm run build
```

Output is in the `dist` folder. To preview the production build locally:

```bash
npm run preview
```

---

## Features

- **Upload diagram**: Drag & drop or click to upload PNG/JPG. Preview, file name, and replace support.
- **Diagram viewer**: Zoom in, zoom out, reset view (react-zoom-pan-pinch).
- **Components list**: Sidebar with mock components (Resistor, Capacitor, Diode, Transistor); selection highlight.
- **Bonus**: Clicking a component in the sidebar highlights the diagram (border + glow and “Highlighting: [name]” badge in the viewer).
- **Responsive**: Two-column layout on desktop/tablet; stacks vertically on smaller screens.

## Tech Stack

- React 18 (functional components, hooks)
- Vite, Tailwind CSS
- react-dropzone, react-zoom-pan-pinch

## Project Structure

```
src/
├── components/
│   ├── UploadBox.jsx
│   ├── DiagramViewer.jsx
│   └── ComponentList.jsx
├── pages/
│   └── Dashboard.jsx
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
```
