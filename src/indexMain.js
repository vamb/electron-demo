const { BrowserWindow, getCurrentWindow } = require('@electron/remote')
const path = require('path');

window.addEventListener('DOMContentLoaded', ()=>{
  // console.log('11111')

  // window.onbeforeunload = function () { // 这个方法会拦截关闭操作
  //   console.log('111111')
  //   // 通过 document 找到元素，并给元素绑定 click 事件并关闭 全部
  //   // yesBtn.addEventListener('click', ()=>{
  //   //   mainWindow.destroy()
  //   // })
  //   return false
  // }

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
