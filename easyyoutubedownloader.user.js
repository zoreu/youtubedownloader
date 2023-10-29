// ==UserScript==
// @name        Easy Youtube Downloader
// @version     1.0.3
// @date        2023-10-29
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

(function() {
    'use strict';

    function getVideoID() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('v');
    }

    function generateRandomID() {
        // Gere um ID aleatório único
        return 'download-button-' + Math.random().toString(36).substr(2, 9);
    }

    function createDownloadButton() {
        const ownerDiv = document.getElementById('owner');
        if (ownerDiv) {
            const videoID = getVideoID();
            if (videoID) {
                // Gere um ID aleatório para o link de download
                const downloadLinkID = generateRandomID();

                // Crie o link de download com o ID aleatório
                const downloadLink = document.createElement('a');
                downloadLink.id = downloadLinkID;
                downloadLink.href = `https://www.y2mate.com/youtube/${videoID}`;
                downloadLink.target = '_blank';

                // Estilize o link de download
                downloadLink.style.backgroundColor = 'red';
                downloadLink.style.borderRadius = '10px';
                downloadLink.style.width = '150px'; // Largura aumentada (altere conforme desejado)
                downloadLink.style.height = '34px'; // Altura aumentada (altere conforme desejado)
                downloadLink.style.textAlign = 'center'; // Centraliza o texto
                downloadLink.style.lineHeight = '34px'; // Centraliza verticalmente
                downloadLink.style.color = 'white'; // Define a cor do texto como branca
                downloadLink.style.fontSize = '16px'; // Aumenta o tamanho do texto
                downloadLink.style.textDecoration = 'none'; // Remove o sublinhado

                // Defina o texto do link como "Download"
                downloadLink.innerText = 'Download';

                // Adicione o link de download à div com o ID "owner"
                ownerDiv.appendChild(downloadLink);
            }
        }
    }

    // Adicione o botão após o carregamento completo da página
    window.addEventListener('load', createDownloadButton);
})();
