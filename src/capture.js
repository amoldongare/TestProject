const electron = require('electron');

const { ipcRenderer: ipc } = electron;

function onCapture(){
  console.log("its here in capture");
}

ipc.on('capture',onCapture);

// const electron = require('electron');
// const path = require('path');
// const fs = require('fs');
// const { desktopCapturer, ipcRenderer: ipc, screen } = electron;
//
// function getMainSource(desktopCapturer, screen, done){
//   const options = {types: ['screen'], thumbnailsSize:screen.getPrimaryDisplay().workAreaSize};
//   desktopCapturer.getSources(options,(err, sources) =>{
//     if(err) return console.log("can not capture screen");
//
//     const isMainSource = source => source.name === 'Sntire screen' || source.name === 'Screen1';
//     done(sources.filter(isMainSource)[0]);
//   })
// }
//
// function onCapture(){
//   console.log("its here in capture");
//   getMainSource(desktopCapturer, screen, source => {
//     const png = source.thumbnail.toPng();
//     //const png = source.thumbnail.toPng();
//     const filePath = path.join(targetDir,new Date() + '.png');
//     writeScreenshot(png,filePath);
//   })
// }
//
// function writeScreenshot(png,filePath){
//   fs.writeFile(filePath,png,err =>{
//     if(err) return console.log("failed to write screen",err);
//   })
// }
// ipc.on('capture',onCapture);
