const electron = require('electron');
const countdown = require('./countdown')
const {app,clipboard,globalShortcut,Tray,Menu} = electron;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const path = require('path');
// const Menu = electron.Menu;
// const Tray = electron.Tray;
let windows = [];
const name = electron.app.getName();
const STACK_SIZE = 5;

function addToStack(item, stack){
  return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0,stack.length - 1):stack)
}
function checkClickboardForChange(clipboard,onChange){
  let cache = clipboard.readText();
  let latest;
  setInterval(_=>{
    latest = clipboard.readText();
    if(latest !== cache){
      cache = latest;
      onChange(cache);
    }
  },1000)
}
let mainWindow;
app.on('ready', _ => {
    const template = [{
        label:name,
        submenu:[{
            label:`About ${name}`,
            click:_=>{
                console.log("clicked");
            },
            role: 'about'
        },{
            type:'separator'
        },{
            label: 'Quit',
            click:_=>{app.quit()},
            accelerator: 'Cmd + Q'
        }]
    }];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    //check the clipboard API
    //tray.setContextMenu(menu);
    const tray = new Tray(path.join(__dirname, '/login.ico'));

    tray.setContextMenu(Menu.buildFromTemplate([{
      label:'<Empty>',
      enabled:false
    }]));
    let stack = [];
    checkClickboardForChange(clipboard, text =>{
      stack = addToStack(text,stack);
      console.log("stack is",stack);
    });
    tray.setToolTip("this is the sample icon");
    // open the multiple windows using loop
    //[1,2,3].forEach(_=>{
    let win = new BrowserWindow({
        width: 500,
        height: 500
    });
    //load the html file from path
    win.loadURL('file:///' + __dirname + "/countdown.html");
    //action on window close
    win.on('closed', _ => {
        console.log("closing the window");
        mainWindow = null;
    });
    mainWindow=win;

    globalShortcut.register('Ctrl+d',_=>{
      console.log("got it");
      mainWindow.webContents.send('capture',app.getPath('pictures'));
    });
    //win.openDevTools();
    //push windows in arrays
    // windows.push(win);
    // })
});

ipc.on('countdown-start',_=>{
    console.log("got it");
    //countdown();
    countdown(count => {
      mainWindow.webContents.send('countdown',count);
        // windows.forEach(win => {
        //     win.webContents.send('countdown',count);
        // })
    })
})
