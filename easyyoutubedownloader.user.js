// ==UserScript==
// @name        Easy Youtube Downloader
// @version     1.0.5
// @date        2023-10-29
// @description Download any video and music (audio) from Youtube.
// @author      zoreu
// @compatible chrome
// @compatible firefox
// @compatible opera
// @compatible safari
// @compatible edge
// @compatible brave
// @license         CC BY-SA
// @license         https://creativecommons.org/licenses/by-sa/4.0
// @match          *://*.youtube.com/*
// @namespace https://raw.githubusercontent.com/zoreu/youtubedownloader/master/easyyoutubedownloader.user.js
// @require https://code.jquery.com/jquery-2.2.4.min.js
// @run-at document-end
// ==/UserScript==

if ("undefined" == typeof(punisherYT)) {
   var punisherYT = {
      currentLink: '//www.y2mate.com/youtube',
      currentMedia: null,
      init: function() {
         punisherYT.pageLoad();
      },
      addClick: function(document) {
         if (document.URL.match('youtube.com') && new RegExp('v=[a-zA-Z0-9-_]{11}').exec(document.URL)) {
            var tubeID = RegExp.lastMatch.substr(2);
            var newInterface = $('#meta-contents');
            if (newInterface) {
               var addButton = $(`<div class="style-scope ytd-watch-metadata" id="punisherYT" style=""><button class="yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m" type="button" id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false" style="padding: 10px; margin: 10px;"><a class="style-scope ytd-subscribe-button-renderer text-white" style="text-decoration: none; color: red; padding-left: 3px; padding-right: 3px" target="_blank" href="`+ punisherYT.currentLink + `/` + tubeID +`"><i class="fas fa-download"></i>Download</a></div>`);
               var subsBtn = document.querySelector("#subscribe-button")
               subsBtn.parentNode.insertBefore(addButton[0], subsBtn)
            }
         }
      },
      pageLoad: function() {
         if (document.body && document.domain == 'www.youtube.com') {
            setInterval(punisherYT.inspectPg, 1000);
            punisherYT.inspectPg();
         }
      },
      inspectPg: function() {
         if (punisherYT.currentMedia != document.URL && typeof ytplayer != 'undefined' && ytplayer) {
            punisherYT.currentMedia = document.URL;
            if ($('#punisherYT')) {
               $('#punisherYT').remove()
            }
         }
         if ($("#meta-contents")[0] && !$('#punisherYT')[0] && typeof ytplayer != 'undefined' && ytplayer) {
            punisherYT.addClick(document);
         }
      },
   };
}
punisherYT.init();
