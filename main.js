const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  dialog,
  nativeImage,
} = require('electron')
const electron = require('electron')
// const { autoUpdater } = require('electron-updater')
const isDev = require('electron-is-dev')
const ipc = electron.ipcMain
const path = require('path')

let mainWindow
let tray = null

// 多开禁止
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  // if (mainWindow) {
  //   if (mainWindow.isMinimized()) mainWindow.restore()
  //   mainWindow.focus()
  // }

  app.on('ready', async () => {
    // 更新组件
    // if (isDev) {
    //   autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml')
    // }

    // autoUpdater.autoDownload = false
    // autoUpdater.checkForUpdates()
    // // 报错提示
    // autoUpdater.on('error', error => {
    //   dialog.showErrorBox(
    //     'Error: ',
    //     error == null ? 'unknown' : (error.stack || error).toString(),
    //   )
    // })
    // autoUpdater.on('checking-for-update', () => {
    //   console.log('Checking for update...')
    // })
    // // 更新提示
    // autoUpdater.on('update-available', () => {
    //   dialog.showMessageBox(
    //     {
    //       type: 'info',
    //       title: '应用有新的版本',
    //       message: '发现新版本，是否现在更新?',
    //       buttons: ['是', '否'],
    //     },
    //     buttonIndex => {
    //       if (buttonIndex === 0) {
    //         autoUpdater.downloadUpdate()
    //       }
    //     },
    //   )
    // })
    // // 无更新
    // autoUpdater.on('update-not-available', () => {
    //   dialog.showMessageBox({
    //     title: '没有新版本',
    //     message: '当前已经是最新版本',
    //   })
    // })

    // // 下载信息
    // autoUpdater.on('download-progress', progressObj => {
    //   let log_message = 'Download speed: ' + progressObj.bytesPerSecond
    //   log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
    //   log_message =
    //     log_message +
    //     ' (' +
    //     progressObj.transferred +
    //     '/' +
    //     progressObj.total +
    //     ')'
    //   console.log(log_message)
    // })

    // // 下载完毕
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

    // 右上角关闭，不退出，做隐藏处理
    ipc.on('close-app', e => {
      // mainWindow.close()
      e.preventDefault()
      mainWindow.hide()
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

    // 托盘
    let mpath = path.join(
      path.dirname(app.getPath('exe')),
      '/resources/assets/logo.png',
    )
    let emptypath = path.join(
      path.dirname(app.getPath('exe')),
      '/resources/assets/empty.ico',
    )
    tray = new Tray(mpath)

    // 是否可以退出
    trayClose = false

    const contextMenu = Menu.buildFromTemplate([
      {
        label: '退出',
        click: function () {
          trayClose = true
          app.quit()
        },
      },
    ])
    tray.setToolTip('传慎考勤')
    tray.setContextMenu(contextMenu)
    // 点击托盘图标显示主窗口
    tray.on('click', () => {
      mainWindow.show()
    })

    // 托盘闪烁
    let count = 0
    let timer = null
    timer = setInterval(function () {
      count++
      if (count % 2 == 0) {
        tray.setImage(emptypath)
      } else {
        tray.setImage(mpath)
      }
    }, 300)
  })
}
