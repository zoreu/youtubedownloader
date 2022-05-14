// ==UserScript==
// @name        Easy Youtube Downloader
// @version     1.0.1
// @date        2021-05-25
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


var AKoiMain = {
    oXHttpReq: null,
    vid: null,
    oldUrl: null,
    DocOnLoad: function(o) {
        try {
            if (null != o && null != o.body && null != o.location && (AKoiMain.vid = AKoiMain.getVid(o), AKoiMain.vid)) {
                o.querySelector("#meta #notification-preference-button").setAttribute("style", "flex-wrap: wrap;");
                var t = o.querySelector("#notification-preference-button"),
                    e = o.querySelector("#y2mateconverter"),
                    n = AKoiMain.GetCommandButton();
                null == e && (null != t ? t.parentNode.insertBefore(n, t) : (t = o.querySelector("#eow-title")).parentNode.insertBefore(n, t)), AKoiMain.oldUrl = o.location.href, AKoiMain.checkChangeVid()
            }
            return !0
        } catch (o) {
            console.log("Ошибка в функции Y2mate.DocOnLoad. ", o)
        }
    },
    checkChangeVid: function() {
        setTimeout(function() {
            AKoiMain.oldUrl == window.location.href ? AKoiMain.checkChangeVid() : AKoiMain.WaitLoadDom(window.document)
        }, 1e3)
    },
    WaitLoadDom: function(o) {
        AKoiMain.vid = AKoiMain.getVid(o), AKoiMain.vid ? null != o.querySelector("#meta #notification-preference-button") ? AKoiMain.DocOnLoad(o) : setTimeout(function() {
            AKoiMain.WaitLoadDom(o)
        }, 1e3) : AKoiMain.checkChangeVid()
    },
    goToY2mate: function(o) {
        try {
            var t = "https://y2mate.com/youtube/" + AKoiMain.vid + "/?utm_source=chrome_addon";
            window.open(t, "_blank")
        } catch (o) {
            console.log("Ошибка в функции Y2mate.OnButtonClick. ", o)
        }
    },
    GetCommandButton: function() {
        try {
            var o = document.createElement("button");
            return o.id = "y2mateconverter", o.className = "yt-uix-tooltip", o.setAttribute("type", "button"), o.setAttribute("title", "Download by @ysEnma in Telegram"), o.innerHTML = "Download", o.addEventListener("click", function(o) {
                AKoiMain.goToY2mate(o)
            }, !0), o.setAttribute("style", "min-height:25px; position:relative; cursor: pointer; font: 13px Arial; background: #FC0A0A; color: #fff; text-transform: uppercase; display: block; padding: 10px 16px; margin:7px 7px; border: 1px solid #FC0A0A; border-radius: 2px; font-weight:bold"), o.setAttribute("onmouseover", "this.style.backgroundColor='#FC0A0A'"), o.setAttribute("onmouseout", "this.style.backgroundColor='#FC0A0A'"), o
        } catch (o) {
            console.log("Ошибка в функции Y2mate.GetCommandButton. ", o)
        }
    },
    getVid: function(o) {
        var t = o.location.toString().match(/^.*((m\.)?youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/);
        return !(!t || !t[3]) && t[3]
    }
};
AKoiMain.WaitLoadDom(window.document);
