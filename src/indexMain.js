const {
  BrowserWindow, getCurrentWindow,
  Menu, MenuItem
} = require('@electron/remote')
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

  // 动态添加菜单 - 开始
  const addMenuBtnDom = document.getElementById('addMenuBtn')
  const addMenuInputDom = document.getElementById('addMenuInput')
  const addMenuSubmitBtnDom = document.getElementById('addMenuSubmitBtn')
  // 自定义全局变量存放菜单项
  let menuItems = new Menu()
  const newTopLevelMenu = () => {
    // * 1. 创建菜单
    let menuFile = new MenuItem({label: '自定义菜单', submenu: menuItems})
    // * 2. 将创建好的菜单添加至 menu
    let menus = Menu.getApplicationMenu()
    menus.append(menuFile)
    // * 3. 将 menu 放置于 app 中显示
    Menu.setApplicationMenu(menus)
  }
  addMenuBtnDom.addEventListener('click', ()=>{
    newTopLevelMenu()
  })
  addMenuSubmitBtnDom.addEventListener('click', ()=>{
    const newMenuText = addMenuInputDom.value.trim()
    if(newMenuText) {
      menuItems.append(new MenuItem({label: newMenuText, type: 'normal'}))
      addMenuInputDom.value = ''
    }
  })
  // 动态添加菜单 - 结束
})
