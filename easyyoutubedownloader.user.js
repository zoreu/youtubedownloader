// ==UserScript==
// @name        Easy Youtube Downloader
// @version     1.0.7
// @date        2025-09-25
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

(function() {
    'use strict';

    // Função para extrair o ID do vídeo da URL
    function getYouTubeVideoID() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('v');
    }

    // Função para verificar se é um tema escuro
    function isDarkTheme() {
        return document.documentElement.hasAttribute('dark');
    }

    // Função para criar e inserir o botão
    function insertDownloadButton() {
        const videoId = getYouTubeVideoID();
        if (!videoId) return;

        const container = document.querySelector('#end');
        if (!container) return;

        // Verifica se o botão já foi inserido
        if (document.getElementById('ss-download-btn')) return;

        // Cria o wrapper para o botão
        const wrapper = document.createElement('div');
        wrapper.id = 'ss-download-wrapper';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.marginRight = '10px';
        wrapper.style.position = 'relative';

        // Cria o botão de download
        const downloadBtn = document.createElement('a');
        downloadBtn.id = 'ss-download-btn';
        downloadBtn.href = `https://youtubepp.com/watch?v=${videoId}`;
        downloadBtn.target = '_blank';
        downloadBtn.style.display = 'inline-flex';
        downloadBtn.style.alignItems = 'center';
        downloadBtn.style.padding = '0 12px 0 8px';
        downloadBtn.style.borderRadius = 'var(--btn-radius)';
        downloadBtn.style.backgroundColor = 'var(--btn-bg)';
        downloadBtn.style.color = 'var(--btn-color)';
        downloadBtn.style.cursor = 'var(--btn-cursor)';
        downloadBtn.style.transition = 'background-color .2s ease';
        downloadBtn.style.height = '36px';
        downloadBtn.style.textDecoration = 'none';
        downloadBtn.style.font = 'var(--btn-font)';

        // Adiciona o ícone SVG
        const downloadSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        downloadSvg.setAttribute('viewBox', '0 0 24 24');
        downloadSvg.setAttribute('width', '24');
        downloadSvg.setAttribute('height', '24');
        downloadSvg.style.marginRight = '6px';
        downloadSvg.style.fill = 'none';
        downloadSvg.style.stroke = 'currentColor';
        downloadSvg.style.strokeWidth = '1.5';
        downloadSvg.style.strokeLinecap = 'round';
        downloadSvg.style.strokeLinejoin = 'round';

        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path1.setAttribute('d', 'M12 4v12');
        const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path2.setAttribute('d', 'M8 12l4 4 4-4');
        const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path3.setAttribute('d', 'M4 18h16');

        downloadSvg.appendChild(path1);
        downloadSvg.appendChild(path2);
        downloadSvg.appendChild(path3);

        // Adiciona o texto do botão
        const downloadSpan = document.createElement('span');
        downloadSpan.textContent = 'Download';

        downloadBtn.appendChild(downloadSvg);
        downloadBtn.appendChild(downloadSpan);

        // Efeitos de hover
        downloadBtn.addEventListener('mouseenter', () => {
            downloadBtn.style.backgroundColor = 'var(--btn-hover-bg)';
        });
        downloadBtn.addEventListener('mouseleave', () => {
            downloadBtn.style.backgroundColor = 'var(--btn-bg)';
        });

        wrapper.appendChild(downloadBtn);
        container.insertAdjacentElement('afterbegin', wrapper);

        // Adiciona o CSS
        const darkTheme = isDarkTheme();
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --btn-bg: ${darkTheme ? "#272727" : "#f2f2f2"};
                --btn-hover-bg: ${darkTheme ? "#3f3f3f" : "#e5e5e5"};
                --btn-color: ${darkTheme ? "#fff" : "#000"};
                --btn-radius: 18px;
                --btn-font: 500 14px/36px "Roboto", "Arial", sans-serif;
                --btn-cursor: pointer;
            }

            #ss-download-btn {
                box-sizing: border-box;
            }

            #ss-download-btn:hover {
                background-color: var(--btn-hover-bg);
            }
        `;
        document.head.appendChild(style);
    }

    // Observa mudanças na URL (SPA do YouTube)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            setTimeout(insertDownloadButton, 1000);
        }
    }).observe(document, {subtree: true, childList: true});

    // Executa inicialmente
    setTimeout(insertDownloadButton, 1500);
})();
