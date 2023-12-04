const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// 01 创建一个窗口
// 02 让窗口加载了一个界面，这个界面就是用 web 技术实现，这个界面是运行在渲染进程中的
const createWindow = () => {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    x: '100',
    y: '100',// 设置窗体打开在屏幕的位置
    show: true,
    // show: false, // 默认情况下创建一个窗口对象之后就会显示，设置为 false 就不会显示了
    width: 800,
    height: 600,
    maxWidth: 1000,
    maxHeight: 800,
    minWidth: 600,
    minHeight: 400,
    resizable: true, //是否允许缩放
    title: 'electron demo 2', //html没有设置title则这里的设置会生效
    icon: path.join(__dirname, 'assets/icon.png'), //不支持svg？
    frame: true, // 默认 true || false会导致一般的工具栏 && title 被隐藏
    autoHideMenuBar: false,// false  || true 会导致 工具栏 被隐藏
    webPreferences: {
      nodeIntegration: true, // 允许渲染进程调用node环境API
      enableRemoteModule: true, // 允许渲染进程使用remote工具在渲染进程中映射主进程中的方法，从而使用主进程的功能
      preload: path.join(__dirname, 'preload.js'), // 这个js文件会自动注入到html里面被调用
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  console.log('11111 -> dom ready triggered')
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // // 这个对应的时 show => 为 false 的时候
  // mainWindow.on('ready-to-show', ()=>{
  //   mainWindow.show()
  // })

  // 导航完成时触发
  mainWindow.webContents.on('did-finish-load', ()=>{
    console.log('33333 ->  did-finish-load')
  })

  // 一个窗口中的文本加载完成
  mainWindow.webContents.on('dom-ready', ()=>{
    console.log('22222 ->  dom-ready')
  })

  mainWindow.on('close', ()=>{
    console.log('88888 -> this window is closed')
    mainWindow = null // 释放内存
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app初始化完成
app.on('ready', ()=>{
  console.log('00000 -> app.on ready')
  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// 所有窗口都被关闭时触发 - 如果不见听，那就会自动退出，如果监听了就需要执行后续程序去决定是否退出
app.on('window-all-closed', () => {
  console.log('44444 -> window-all-closed')
  if (process.platform !== 'darwin') {
    app.quit(); // 这里如果不执行则没有 5 6 7 的执行
  }
});

// 在关闭窗口之前触发
app.on('before-quit', ()=>{
  console.log('55555 -> before-quit')
})

// 在窗口关闭并且应用退出时触发
app.on('will-quit', ()=>{
  console.log('66666 -> will-quit')
})

// 当所有窗口被关闭时触发
app.on('quit', ()=>{
  console.log('77777 -> quit')
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
