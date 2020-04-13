const { app, BrowserWindow, Tray, Menu, shell } = require("electron");
const path = require("path");

const isMac = process.platform === "darwin";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const iconPath = path.join(process.cwd(), "/favicon.io/favicon-32x32.png");
  new Tray(iconPath);
  const description = "Rive - Ultimate 2D tool for designers";
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 900,
    minHeight: 800,
    height: 900,
    width: 1300,
    title: description,
    // autoHideMenuBar: true,
    titleBarStyle: false,
    icon: iconPath,
    // darkTheme: true,
  });

  mainWindow.setOverlayIcon(iconPath, description);
  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.loadURL("https://rive.app/explore/popular/trending/all");
};
console.log(process.cwd());

app.on("ready", () => {
  createWindow();

  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "New File",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://electronjs.org");
          },
        },
        { type: "separator" },
        isMac ? { role: "close" } : { role: "quit" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: "Speech",
                submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
              },
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
      ],
    },
    {
      label: "Help",
      click: async () => {
        return await shell.openExternal("https://docs.rive.app/");
      },
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
