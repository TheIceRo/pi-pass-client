function confirmFunction(){};
var confirmWindow;
var confirmText;
var confirmButton;
var cancelButton;
var parameter;
function confirmCheck(text,confirmFunc,param){
    confirmFunction = confirmFunc;
    confirmWindow.classList.add("toggle");
    parameter = param;
    confirmText.innerHTML = text;
}
function loadUtils(){
    confirmWindow = document.getElementsByClassName("confirm-window")[0];
    confirmText = confirmWindow.getElementsByClassName("confirm-text")[0];
    confirmButton = confirmWindow.getElementsByClassName("confirm")[0];
    cancelButton = confirmWindow.getElementsByClassName("cancel")[0];
}
function addUtilsListeners(){
    confirmButton.addEventListener('click',function(){
        confirmFunction(parameter);
        confirmFunction = null;
        parameter = null;
        confirmWindow.classList.remove("toggle");
    });
    cancelButton.addEventListener('click',function(){
        confirmFunction = null;
        parameter = null;
        confirmWindow.classList.remove("toggle");
    });
}
window.addEventListener('DOMContentLoaded', (event) => {
    loadUtils();
    addUtilsListeners();
});

