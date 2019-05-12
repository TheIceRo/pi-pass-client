var settings = {
    "ip": "192.168.0.102",
    "port":"3000"
}

window.addEventListener('DOMContentLoaded', (event) => {
    if(localStorage.getItem("ip")!=null){
        settings.ip = localStorage.getItem("ip");
    }
    if(localStorage.getItem("port")!=null){
        settings.port = localStorage.getItem("port");
    }
    loadSettings();
    addSettingListeners();
});

function addSettingListeners(){
    var ipText = document.getElementById("ip-setting");
    var portText = document.getElementById("port-setting")
    document.getElementById("save").addEventListener("click",function(){
        if(ipText.value!=""){
            settings.ip = ipText.value;
            localStorage.setItem("ip",ipText.value);
        }
        if(portText.value!=""){
            settings.port = portText.value;
            localStorage.setItem("port",portText.value);
        }
        
    });
}

function loadSettings(){
    var ipText = document.getElementById("ip-setting");
    var portText = document.getElementById("port-setting");
    ipText.value = settings.ip;
    portText.value = settings.port;
}