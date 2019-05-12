var request = require("request");
const { clipboard } = require('electron')

var obj;
var settings = {
  "ip": "192.168.0.102",
  "port":"3000"
}
var accounts = {
  "id" : 4,
  "title": "title",
  "username": "cicero",
  "password": "hunter3"
}
function textToStars(text){
  returnText = "";
  for(var i=0;i<text.length;i++){
    returnText+="*";
  }
  return returnText;
}
function loadMenu(type,number){
  var m = document.getElementsByClassName("account-cont");
  var mClone = m[0].cloneNode(true);
  quizNumber = number;
  for(var j=0; j<m.length; j++){
    document.getElementsByClassName("accounts")[0].innerHTML = "";
  }
  obj.forEach(function(acc,i){
    mClone = mClone.cloneNode(true);
    mClone.getElementsByClassName("account-title")[0].innerHTML = obj[i].title;
    mClone.getElementsByClassName("name")[0].innerHTML = obj[i].username;
    mClone.getElementsByClassName("pass")[0].innerHTML = textToStars(obj[i].password);
    mClone.getElementsByClassName("copy-name")[0].addEventListener("click",function(){
      clipboard.writeText(obj[i].username);
    });
    mClone.getElementsByClassName("copy-pass")[0].addEventListener("click",function(){
      clipboard.writeText(obj[i].password);
    });
    mClone.getElementsByClassName("delete")[0].addEventListener("click",function(){
      confirmCheck("are you sure you want to remove this entry?",removeData,acc.id);
    });
    document.getElementsByClassName("accounts")[0].appendChild(mClone);
  });
}
window.addEventListener('DOMContentLoaded', (event) => {
  loadData();
  addManagerListeners();
});
function loadData(username,number){
  if(localStorage.getItem("ip")!=null){
    settings.ip = localStorage.getItem("ip");
  }
  if(localStorage.getItem("port")!=null){
      settings.port = localStorage.getItem("port");
  }

  var url = "http://"+settings.ip+":"+settings.port+"/accounts";
  request({
      url: url,
      json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        obj = body;
        console.log(body);
        loadMenu();
      }
      else console.log(error);
  });
}
function removeData(id){
  var url = "http://"+settings.ip+":"+settings.port+"/accounts/"+id;
  request.delete(url,function(err, resp, body){
    loadData();
    loadMenu();
  });
}
function addData(data){
  var url = "http://"+settings.ip+":"+settings.port+"/accounts";
  var headersOpt = {  
    "Content-Type": "application/json",
  };
  data.id = obj.length;
  request(
          {
          method:'post',
          url: url, 
          form: data, 
          headers: headersOpt,
          json: true,
      }, function (error, response, body) {  
          loadData();
          loadMenu();
          console.log(body);  
  });
}
function addAccount(){
  var title = document.getElementById("input-title").value;
  var name = document.getElementById("input-name").value;
  var pass = document.getElementById("input-pass").value;
  var myData = accounts;
  myData.title = title;
  myData.username = name;
  myData.password = pass;
  if(title!="" && name!=""){
    addData(myData);
    title="";
    name="";
    pass="";
    toggleAddAccount();
    loadData();
    loadMenu();
  }
}
function toggleAddAccount(){
  var panel = document.getElementsByClassName("add-account")[0];
  if(panel.classList.contains("toggle"))
  panel.classList.remove("toggle");
  else panel.classList.add("toggle");
}
function addManagerListeners(){
  document.getElementById("add-acc").addEventListener("click",function(){
    toggleAddAccount();
  });
  document.getElementById("close-add-acc").addEventListener("click",function(){
    toggleAddAccount();
  });
  document.getElementById("create-acc").addEventListener("click",function(){
    addAccount();
  });
  
}
