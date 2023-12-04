const { BrowserWindow }=require('@electron/remote')
const path = require('path');

window.addEventListener('DOMContentLoaded', ()=>{
  // 点击按钮打开一个新窗口
  const oBtn = document.getElementById('new-win-btn')
  oBtn.addEventListener('click', ()=>{
    console.log('ddddddd')
    let indexMain = new BrowserWindow({
      width:600,
      height: 600
    })

    indexMain.loadFile(path.join(__dirname, 'indexMain.html'));

    indexMain.on('close', ()=>{
      indexMain = null
    })
  })
})
