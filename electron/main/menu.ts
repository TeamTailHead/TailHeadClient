import {
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
} from "electron";

export function createMenu(win: BrowserWindow) {
  const template: MenuItemConstructorOptions[] = [
    { role: "appMenu" },
    { label: "파일", role: "fileMenu" },
    { label: "편집", role: "editMenu" },
    { label: "보기", role: "viewMenu" },
    {
      label: "창",
      role: "window",
      submenu: [{ role: "minimize" }, { role: "close" }],
    },
  ];

  const menu = Menu.buildFromTemplate(template);

  if (import.meta.env.DEV) {
    menu.append(
      new MenuItem({
        label: "디버그",
        submenu: [
          {
            label: "디버그 패널 열기",
            accelerator: isMac() ? "Cmd+Shift+D" : "Ctrl+Shift+D",
            click: () => {
              win.webContents.send("open-debug-panel");
            },
          },
        ],
      })
    );
  }

  Menu.setApplicationMenu(menu);
}

function isMac() {
  return process.platform === "darwin";
}
