jQuery(document).ready(($) => {
  const { ipcRenderer } = require("electron");  
  
  let files = [];
  const REMOVE_TIMER = 5000;
  
  ipcRenderer.on('newFile', (event, args) => {
    addFile(args.id, args.fileName, args.extension, args.fullPath, args.bytes, args.downloadedFrom);
  });

  ipcRenderer.on('downloadingFile', (event, args) => {
    downloadingFile(args.id, args.perc);
  });

  ipcRenderer.on('fileDownloaded', (event, args) => {
    fileDownloaded(args.id, args.fullPath);
  });

  ipcRenderer.on('downloadCancelled', (event, args) => {
    removeFile(args.id);
  });
  
  const getTemplate = (selector) => {
    const el = $(selector);
    const contents = $(el).contents().clone();
    return contents;
  };
  
  const addFile = (id, fileName, extension, fullPath, bytes, downloadedFrom) => { 
    const contents = getTemplate("#itemRowNotFinished");
    contents.attr("id", id);
    contents.find("span.fileName").text(fileName);
    contents.find("div.icon").click(() => {
      removeFile(id, true);
    });
    $("#container").append(contents);
    files.push({
      id,
      fileName,
      extension,
      bytes,
      downloadedFrom,
      fullPath,
      completed: false,
    });
  
    resizeWindow();
  };
  
  const downloadingFile = (id, perc) => {
    const el = $("#" + id);
    el.find("#percBar").css("width", perc + "%");
    resizeWindow();
  };
  
  const fileDownloaded = (id, path) => {
    downloadingFile(id, 100);
    const file = files.find((item) => {
      return item.id === id;
    });
  
    let bytesUnit = "B";
    let bytes = file.bytes;
    let f = bytes / 1024;
    if (f >= 1) {
      bytes = f;
      f = f / 1024;
      bytesUnit = "KB";
      if (f >= 1) {
        bytes = f;
        bytesUnit = "MB";
      }
    }
    bytes = Math.round(bytes);
  
    let el = $("#" + id);
    el.find("div.icons").remove();
    let contents = getTemplate("#finishedOptions");
    el.append(contents);
    el.find("div.x").click((ev) => {
      ev.stopPropagation();
      removeFile(id);
    });
    el.find("div.folder").click((ev) => {
      ev.stopPropagation();
      openFolder(path);
    });
    el.click(() => {
      openFolder(path);
    });
  
    el.find("div.bar").remove();
    let conts = getTemplate("#finishedInfo");
    conts.find("span").text(bytes + " " + bytesUnit + " " + file.extension);
    el.find("div.info").append(conts);
  
    el.addClass("completed");
    file.completed = true;
    
    resizeWindow();
    setTimeout(() => removeFile(id), REMOVE_TIMER);
  };
  
  const removeFile = (id, cancelDownload = false) => {
    const file = files.find((item) => {
      return item.id === id;
    });
    
    files = files.filter((item) => {
      return item.id !== id;
    });

    let closeDownloadWindow = true;
    if (files.length > 0) {
      closeDownloadWindow = false;
    }
    $("#" + id).remove();
    ipcRenderer.send('removeFile', { id: id, closeDownloadWindow: closeDownloadWindow, cancelDownload: cancelDownload, url: file.downloadedFrom });
  
    resizeWindow();
  };
  
  const openFolder = (path) => {
    ipcRenderer.send('openFolder', { fullPath: path });
  };
  
  const resizeWindow = () => {
    const el = $("body");
    $('html').height(el.height());

    ipcRenderer.send('resizeWindow', { width: el.width(), height: el.height() + 1, });
  };

  /*
  const retryDownload = (id) => {
    const file = files.find((item) => {
      return item.id === id;
    });
  
    ipcRenderer.send('retryDownload', { id: file.id, url: file.downloadedFrom });
  };
  */
 
  /*
  const cancelDownload = (id) => {
    console.log( {files: files, id: id} );
    const file = files.find((item) => {
      return item.id === id;
    });
  
    ipcRenderer.send('cancelDownload', { id: id, url: file.downloadedFrom });
  };
  */
});
