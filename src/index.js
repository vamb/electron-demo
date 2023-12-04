const { BrowserWindow, getCurrentWindow } = require('@electron/remote')
const path = require('path');

window.addEventListener('DOMContentLoaded', ()=>{
  // console.log('11111')

  let mainWindow = getCurrentWindow()

  const midBtnDom = document.getElementById('min-btn')
  const maxBtnDom = document.getElementById('max-btn')
  const closeBtnDom = document.getElementById('close-btn')
  // console.log('midBtnDom maxBtnDom closeBtnDom', midBtnDom, maxBtnDom, closeBtnDom)

  midBtnDom?.addEventListener('click', ()=>{
    // console.log('minBtn Click')
    mainWindow.minimize()
  })

  maxBtnDom?.addEventListener('click', ()=>{
    // console.log('maxBtnDom click isMaximized', mainWindow.isMaximized())
    if(!mainWindow.isMaximized()) {
      // console.log('11111')
      mainWindow.maximize()
    }else{
      // console.log('22222')
      mainWindow.restore()
    }
  })

  closeBtnDom?.addEventListener('click', ()=>{
    // console.log('closeBtnDom click')
    mainWindow.close()
  })

  // 点击按钮打开一个新窗口
  const oBtn = document.getElementById('new-win-btn')
  oBtn.addEventListener('click', ()=>{
    let indexMain = new BrowserWindow({
      width:600,
      height: 600,
      // frame: false
    })

    indexMain.loadFile(path.join(__dirname, 'indexMain.html'));

    indexMain.on('close', ()=>{
      indexMain = null
    })
  })
})
