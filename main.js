const { app, BrowserWindow, Menu, dialog } = require('electron')
const electron = require('electron')
const { autoUpdater } = require('electron-updater')
const isDev = require('electron-is-dev')
const ipc = electron.ipcMain
const path = require('path')

let mainWindow

// app.commandLine.appendSwitch('disable-web-security')

app.on('ready', async () => {
  console.log('111')
  autoUpdater.autoDownload = false
  autoUpdater.checkForUpdatesAndNotify()
  // 报错提示
  // autoUpdater.on('error', error => {
  //   dialog.showErrorBox(
  //     'Error: ',
  //     error == null ? 'unknown' : (error.stack || error).toString(),
  //   )
  // })
  // autoUpdater.on('checking-for-update', () => {
  //   console.log('Checking for update...')
  // })
  // 更新提示
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox(
      {
        type: 'info',
        title: '应用有新的版本',
        message: '发现新版本，是否现在更新?',
        buttons: ['是', '否'],
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          autoUpdater.downloadUpdate()
        }
      },
    )
  })
  // 无更新
  autoUpdater.on('update-not-available', () => {
    console.log(
      dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory', 'multiSelections'],
      }),
    )
    // dialog.showMessageBox({
    //   title: '没有新版本',
    //   message: '当前已经是最新版本',
    // })
  })
  // autoUpdater.on('download-progress', progressObj => {
  //   let log_message = 'Download speed: ' + progressObj.bytesPerSecond
  //   log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
  //   log_message =
  //     log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
  //   console.log(log_message)
  // })

  // autoUpdater.on('update-downloaded', () => {
  //   dialog.showMessageBox(
  //     {
  //       title: '安装更新',
  //       message: '更新下载完毕，应用将重启并进行安装',
  //     },
  //     () => {
  //       setImmediate(() => autoUpdater.quitAndInstall())
  //     },
  //   )
  // })
  // await require('devtron').install()
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    minWidth: 1200,
    minHeight: 700,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      // webSecurity: false,
    },
  })

  ipc.on('close-app', () => {
    // 通知关闭
    // mainWindow.close()
    mainWindow.exit()
  })
  ipc.on('max-app', () => {
    if (mainWindow.isMaximized()) {
      // 若已经是最大化了，则还原
      mainWindow.unmaximize()
    } else {
      // 最大化窗口
      mainWindow.maximize()
    }
  })
  ipc.on('min-app', () => {
    // 最小化
    mainWindow.minimize()
  })

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }
  Menu.setApplicationMenu(null)

  let urlLocation = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, './build/index.html')}`

  await mainWindow.loadURL(urlLocation)
})
