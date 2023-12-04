const { BrowserWindow } = require('@electron/remote')
const path = require('path');

window.addEventListener('DOMContentLoaded', ()=>{
  console.log('11111')

  const midBtnDom = document.getElementById('min-btn')
  const maxBtnDom = document.getElementById('max-btn')
  const closeBtnDom = document.getElementById('close-btn')
  console.log('midBtnDom maxBtnDom closeBtnDom', midBtnDom, maxBtnDom, closeBtnDom)

  midBtnDom?.addEventListener('click', ()=>{
    console.log('minBtn Click')
  })

  maxBtnDom?.addEventListener('click', ()=>{
    console.log('maxBtnDom click')
  })

  closeBtnDom?.addEventListener('click', ()=>{
    console.log('closeBtnDom click')
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
