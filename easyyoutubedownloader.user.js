// ==UserScript==
// @name        Easy Youtube Downloader
// @version     1.1.5
// @date        2025-10-20
// @description Download any video and music (audio) from Youtube, com menu MP3/MP4 que fecha ao clicar fora ou em uma opção.
// @compatible chrome
// @compatible firefox
// @compatible opera
// @compatible safari
// @compatible edge
// @compatible brave
// @author       zoreu
// @match        *://*.youtube.com/*
// @grant       none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function getYouTubeVideoID() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('v');
    }

    function isDarkTheme() {
        return document.documentElement.hasAttribute('dark');
    }

    function insertDownloadButton() {
        const videoId = getYouTubeVideoID();
        if (!videoId) return;

        const container = document.querySelector('#end');
        if (!container) return;

        const old = document.getElementById('ss-download-wrapper');
        if (old) old.remove();

        const wrapper = document.createElement('div');
        wrapper.id = 'ss-download-wrapper';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.marginRight = '10px';
        wrapper.style.position = 'relative';

        const downloadBtn = document.createElement('a');
        downloadBtn.id = 'ss-download-btn';
        downloadBtn.href = '#';
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

        const downloadSpan = document.createElement('span');
        downloadSpan.textContent = 'Download';

        downloadBtn.appendChild(downloadSvg);
        downloadBtn.appendChild(downloadSpan);

        // Menu flutuante maior
        const menu = document.createElement('div');
        menu.style.position = 'absolute';
        menu.style.top = '42px';
        menu.style.left = '0';
        menu.style.width = '150px';
        menu.style.backgroundColor = isDarkTheme() ? '#272727' : '#f2f2f2';
        menu.style.border = '1px solid #888';
        menu.style.borderRadius = '8px';
        menu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)';
        menu.style.padding = '6px 0';
        menu.style.display = 'none';
        menu.style.flexDirection = 'column';
        menu.style.zIndex = 9999;

        const createMenuButton = (text, href) => {
            const btn = document.createElement('a');
            btn.href = href;
            btn.target = '_blank';
            btn.textContent = text;
            btn.style.padding = '8px 12px';
            btn.style.color = isDarkTheme() ? '#fff' : '#000';
            btn.style.textDecoration = 'none';
            btn.style.cursor = 'pointer';
            btn.style.fontWeight = '500';
            btn.addEventListener('mouseenter', () => btn.style.backgroundColor = isDarkTheme() ? '#3f3f3f' : '#e5e5e5');
            btn.addEventListener('mouseleave', () => btn.style.backgroundColor = 'transparent');

            // Fecha o menu ao clicar
            btn.addEventListener('click', () => {
                menu.style.display = 'none';
            });

            return btn;
        };

        menu.appendChild(createMenuButton('Baixar MP3', `https://ytmp3.cx/#${videoId}/mp3`));
        menu.appendChild(createMenuButton('Baixar MP4', `https://ytmp3.cx/#${videoId}/mp4`));

        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
        });

        wrapper.appendChild(downloadBtn);
        wrapper.appendChild(menu);
        container.insertAdjacentElement('afterbegin', wrapper);

        // Fecha menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                menu.style.display = 'none';
            }
        });

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

    observeUrlChange(() => {
        setTimeout(insertDownloadButton, 1000);
    });

    setTimeout(insertDownloadButton, 1500);
})();
