// ==UserScript==
// @name        Easy Youtube Downloader
// @version     1.1.0
// @date        2025-09-25
// @description Download any video and music (audio) from Youtube, funciona também em playlists.
// @compatible chrome
// @compatible firefox
// @compatible opera
// @compatible safari
// @compatible edge
// @compatible brave
// @author       zoreu
// @match        *://*.youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Função para extrair o ID do vídeo da URL
    function getYouTubeVideoID() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('v');
    }

    // Função para verificar se é tema escuro
    function isDarkTheme() {
        return document.documentElement.hasAttribute('dark');
    }

    // Função para criar e inserir o botão
    function insertDownloadButton() {
        const videoId = getYouTubeVideoID();
        if (!videoId) return;

        const container = document.querySelector('#end');
        if (!container) return;

        // Remove botão antigo (caso já exista)
        const old = document.getElementById('ss-download-wrapper');
        if (old) old.remove();

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

        // Ícone SVG
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

        // Texto do botão
        const downloadSpan = document.createElement('span');
        downloadSpan.textContent = 'Download';

        downloadBtn.appendChild(downloadSvg);
        downloadBtn.appendChild(downloadSpan);

        // Efeito hover
        downloadBtn.addEventListener('mouseenter', () => {
            downloadBtn.style.backgroundColor = 'var(--btn-hover-bg)';
        });
        downloadBtn.addEventListener('mouseleave', () => {
            downloadBtn.style.backgroundColor = 'var(--btn-bg)';
        });

        wrapper.appendChild(downloadBtn);
        container.insertAdjacentElement('afterbegin', wrapper);

        // CSS dinâmico
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

    // Detecta mudanças de URL (SPA YouTube)
    function observeUrlChange(callback) {
        let oldHref = document.location.href;
        const body = document.querySelector("body");
        const observer = new MutationObserver(() => {
            if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                callback();
            }
        });
        observer.observe(body, { childList: true, subtree: true });

        // Hooka pushState e replaceState
        const pushState = history.pushState;
        history.pushState = function() {
            pushState.apply(this, arguments);
            callback();
        };
        const replaceState = history.replaceState;
        history.replaceState = function() {
            replaceState.apply(this, arguments);
            callback();
        };
        window.addEventListener('popstate', callback);
    }

    // Inicializa
    observeUrlChange(() => {
        setTimeout(insertDownloadButton, 1000);
    });

    // Executa na primeira carga
    setTimeout(insertDownloadButton, 1500);
})();
