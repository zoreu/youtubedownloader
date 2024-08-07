// ==UserScript==
// @name        Easy Youtube Downloader for Chrome
// @version     0.0.1
// @date        2023-10-29
// @description Download any video and music (audio) from Youtube.
// @author      zoreu
// @compatible chrome
// @license     CC BY-SA
// @license     https://creativecommons.org/licenses/by-sa/4.0
// @match       *://*.youtube.com/*
// @namespace   https://raw.githubusercontent.com/zoreu/youtubedownloader/master/easyyoutubedownloader2.user.js
// @run-at      document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Função para criar o botão de download
    function createDownloadButton(videoId) {
        const button = document.createElement('a');
        button.innerText = 'Download';
        button.href = `https://www.y2mate.com/youtube/${videoId}`;
        button.target = '_blank';
        button.style.margin = '10px';
        button.style.padding = '5px 10px';
        button.style.color = '#fff';
        button.style.backgroundColor = '#ff0000';
        button.style.border = 'none';
        button.style.borderRadius = '3px';
        button.style.cursor = 'pointer';
        button.style.textDecoration = 'none';
        button.style.fontSize = '14px';
        button.style.fontWeight = 'bold';
        button.style.display = 'inline-block';
        button.style.textAlign = 'center';
        button.id = 'yt-download-button'; // Adiciona um ID único ao botão

        return button;
    }

    // Função para adicionar o botão de download ao tp-yt-paper-dialog
    function addButtonToDialog() {
        const videoIdMatch = document.URL.match(/v=([a-zA-Z0-9_-]{11})/);
        if (videoIdMatch) {
            const videoId = videoIdMatch[1];
            const dialog = document.querySelector('tp-yt-paper-dialog');
            if (dialog) {
                // Verifica se o botão já foi adicionado
                if (!document.querySelector('#yt-download-button')) {
                    const downloadButton = createDownloadButton(videoId);
                    // Adiciona uma caixa HTML para o botão de download
                    const container = document.createElement('div');
                    container.style.padding = '10px';
                    container.appendChild(downloadButton);

                    // Adiciona o container ao tp-yt-paper-dialog
                    dialog.appendChild(container);

                    // Remove o elemento <ytd-offline-promo-renderer>
                    const offlinePromo = document.querySelector('ytd-offline-promo-renderer');
                    if (offlinePromo) {
                        offlinePromo.remove();
                    }
                }
            }
        }
    }

    // Cria um MutationObserver para observar mudanças no DOM
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Verifica se o tp-yt-paper-dialog foi adicionado
                if (document.querySelector('tp-yt-paper-dialog')) {
                    addButtonToDialog();
                    observer.disconnect(); // Para observar após adicionar o botão
                }
            }
        }
    });

    // Inicia a observação de mudanças no DOM
    observer.observe(document.body, { childList: true, subtree: true });
})();
