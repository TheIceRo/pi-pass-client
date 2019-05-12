const electron = require('electron');
const url = require('url');
const path = require('path');
const nativeImage = require('electron').nativeImage; 
let image = nativeImage.createEmpty(); 
const {app,BrowserWindow,Menu,IncomingMessage} = electron;

let window;

// Listen for app ready
app.on("ready",function(){
    window = new BrowserWindow({width:480,height:650,minHeight:650,minWidth:480,frame:true,title:"",
    resizable:true,backgroundColor:"#fff",nodeIntegration:true});
    window.nodeIntegration = true;
    //window.setMenu(null);
    window.loadURL(url.format({
        pathname: path.join(__dirname,"index.html"),
        protocol: 'file',
        slashes:true
    }));

});