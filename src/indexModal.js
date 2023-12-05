const { BrowserWindow, getCurrentWindow } = require('@electron/remote')
const path = require('path');

window.addEventListener('DOMContentLoaded', ()=>{

  let modalBtnDom = document.getElementById('modalBtn')
  console.log('modalBtn', modalBtnDom)
  modalBtnDom.addEventListener('click', ()=>{
    let indexModal = new BrowserWindow({
      width: 400,
      height: 300,
      parent: getCurrentWindow(),
      modal: true
    })
    indexModal.loadFile(path.join(__dirname, 'indexModal.html'));

    indexModal.on('close', ()=>{
      indexModal = null
    })
  })
})
