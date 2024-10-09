/*
const {ipcRenderer} = require('electron');

process.once('loaded', () => {
  window.addEventListener('main-to-download', (event) => {
    
    console.log(event);

    switch(event.message) {
      case 'newFile':
        ipcRenderer.send('newFile', event.data);
        break;
      case 'downloadingFile':
        ipcRenderer.send('downloadingFile', event.data);
        break;
      case 'fileDownloaded':
        ipcRenderer.send('fileDownloaded', event.data);
        break;
    }
  });
});
*/