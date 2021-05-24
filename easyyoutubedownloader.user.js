// ==UserScript==
// @name        Easy Youtube Downloader
// @version     1.0.0
// @date        2019-10-24
// @description Download any video and music (audio) from Youtube.
// @author      zoreu
// @compatible chrome
// @compatible firefox
// @compatible opera
// @compatible safari
// @license         CC BY-SA
// @license         https://creativecommons.org/licenses/by-sa/4.0
// @match          *://*.youtube.com/*
// @namespace https://raw.githubusercontent.com/zoreu/youtubedownloader/master/easyyoutubedownloader.user.js
// ==/UserScript==


(function() { //ABERTURA
    'use strict';
    if (document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer) {
    setInterval(function() {//ABRIR INTERVAL
        if (window.location.href.indexOf("watch?v=") < 0) { //ABRIR IF
            return false;
        }//FECHAR IF
        if (document.getElementById("count") && document.getElementById("distillvideo") === null) { //ABRIR IF
            Addytpolymer();
        } //FEFHAR IF
    }, 100);//FECHAR INTERVAL
    }//FECHAR PRIMEIRO IF
////////// BOTAO //////////////////////
function Addytpolymer() {
    var buttonDiv = document.createElement("span");
    var link = window.location.href;
    var link2 = link.replace("https://www.youtube.com/watch?v=", "");
    buttonDiv.style.width = "100%";
    buttonDiv.id = "distillvideo";
    var addButton = document.createElement("a");
    addButton.appendChild(document.createTextNode("MP3/4"));
    addButton.style.width = "100%";
    addButton.style.backgroundColor = "#CC0000";
    addButton.style.color = "white";
    addButton.style.textAlign = "center";
    addButton.style.padding = "2px 10px";
    addButton.style.margin = "0px 10px";
    addButton.style.fontSize = "13px";
    addButton.style.border = "0";
    addButton.style.cursor = "pointer";
    addButton.style.borderRadius = "2px";
    addButton.style.fontFamily = "Roboto, Arial, sans-serif";
    addButton.style.textDecoration = "none";
    addButton.href = "https://y2mate.com/pt/youtube/" + link2;
    ///////////////////////////////////////////////////////////////////
    addButton.target = "_blank";
    buttonDiv.appendChild(addButton);
    var targetElement = document.querySelectorAll("[id='count']");
    for (var i = 0; i < targetElement.length; i++) {
        if (targetElement[i].className.indexOf("ytd-video-primary-info-renderer") > -1) {
            targetElement[i].appendChild(buttonDiv);
        }
    }
}
///////////////////////////////////////
} //FECHAR ABERTURA
) //FHECAR FUNÇÃO
();//AUTO CHAMAR FUNÇÃO DE ABERTURA
