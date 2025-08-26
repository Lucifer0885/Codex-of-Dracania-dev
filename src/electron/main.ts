import { app, BrowserWindow } from 'electron'
import path from 'path'
import { isDev } from './util.js';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    icon: path.join(app.getAppPath(), '/assets/dso.ico'),
    title: 'Drakensang Online Utils',
    // webPreferences: {
    //   preload: '/src/electron/preload.ts',
    // },
  });

  if (isDev()) {
    mainWindow.loadURL('http://localhost:3055');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }

  mainWindow.maximize();
}

app.whenReady().then(() => {
  createWindow();
})
