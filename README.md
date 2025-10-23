# Codex of Dracania - Development Repository

> **Note:** This is the development repository. Official releases are published in a separate repository.

A comprehensive desktop application providing utilities and tools to enhance Drakensang Online (DSO) gameplay experience.

## Features

### 📋 Bonus Code Management

- Track and manage bonus codes with progress indicators
- Color-coded progress bars showing time until expiration
- Paginated history view with search and sorting
- Visual status badges (Active, Upcoming, Expired)
- Detailed reward displays

### ⚙️ Macro System

- Create and manage custom macros
- Default macros for common tasks (sell inventory, melt gems, etc.)
- Keybinding support with global hotkeys
- Import/export macro configurations
- Dynamic macro execution with target window detection

### 🎮 Inventory Management

- Configurable inventory presets
- Automatic inventory calculations
- Item categorization and filtering
- Smart sell and melt operations

### 🔔 System Integration

- System tray support
- Auto-update functionality
- Window state persistence
- Global keyboard shortcuts

## Tech Stack

### Frontend

- **React 19** - Modern React with hooks
- **TypeScript** - Full type safety
- **Vite** - Fast build tooling and HMR
- **DaisyUI** - TailwindCSS component library
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend

- **Electron** - Cross-platform desktop framework
- **Node.js** - Runtime environment
- **Axios** - HTTP client for API calls
- **electron-updater** - Auto-update support
- **win32-api** - Windows API integration for macros

## Development

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Windows OS (for macro functionality)

### Setup

```bash
# Clone the repository
git clone https://github.com/Lucifer0885/Codex-of-Dracania-dev.git
cd dracania-codex

# Install dependencies
npm install

# Rebuild native modules for Electron
npm run electron-rebuild # if needed
```

### Running in Development

```bash
# Start both React dev server and Electron
npm run dev

# Or run them separately:
npm run dev:react      # Start Vite dev server (http://localhost:3055)
npm run dev:electron   # Start Electron app
```

### Building for Production

```bash
# Build for Windows
npm run dist:win

# Output will be in the dist/ directory
```

### Project Structure

```
src/
├── electron/              # Electron main process
│   ├── main.ts           # Application entry point
│   ├── preload.cts       # Preload script for IPC
│   ├── api/              # API integration layer
│   ├── constants/        # constants used in the app
│   ├── installer/        # nsis installer init
│   ├── macros/           # Macro system implementation
│   ├── utils/            # Utility functions
│   └── interfaces/       # TypeScript interfaces
│
├── react/                # React frontend
│   ├── main.tsx         # React entry point
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── context/         # React context providers
│   ├── layouts/         # Layout components
│   └── utils/           # Frontend utilities
│
└── assets/              # Static assets (images, icons)
```

## Scripts

- `npm run dev` - Start development mode (React + Electron)
- `npm run build` - Build React app for production
- `npm run transpile:electron` - Compile TypeScript for Electron
- `npm run dist:win` - Build Windows installer

## Contributing

This is a development repository. Contributions, bug reports, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built for the Drakensang Online community
- Uses DaisyUI for beautiful UI components
- Powered by Electron and React

## Contact

**Author:** lucifer0885
**Discord:** lucifer0885.

## Disclaimer

This application is a third-party tool and is not affiliated with or endorsed by Bigpoint GmbH or Drakensang Online. Use at your own discretion.
