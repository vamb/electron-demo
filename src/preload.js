// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { remote } = require('electron')
const path = require('path');

window.addEventListener('DOMContentLoaded', ()=>{ // 当dom元素加载完成后开始执行一下内容
                                                  // 点击按钮，打开新窗口
  const newWinBtn = document.getElementById('new-win-btn')
  newWinBtn.addEventListener('click', ()=>{
    console.log('sdfsdf')
    let indexMain = new remote.BrowserWindow({
      width: 200,
      height: 200,
    })

    indexMain.loadFile(path.join(__dirname, 'indexMain.html'))

    indexMain.on('close', ()=>{
      indexMain = null
    })
  })
})
