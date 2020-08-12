// ==UserScript==
// @name         Arxiv PDF preview
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Preview Arxiv PDF in the abstract page
// @author       You
// @match        https://arxiv.org/abs/*
// @grant        none
// ==/UserScript==

(function()
{
    'use strict';

    for (let ele of document.getElementsByClassName('abs-button'))
    {
        if (ele.innerHTML == 'PDF')
        {
            let pdfViewer = document.createElement('iframe')
            pdfViewer.src = ele.getAttribute('href')
            pdfViewer.width = '100%'
            pdfViewer.height = '1000px'

            let pdfDiv = document.createElement('div')
            pdfDiv.appendChild(pdfViewer)
            pdfDiv.style = 'position: relative'

            let insertPoint = document.getElementById('abs-outer')
            insertPoint.appendChild(pdfDiv)
            break
        }
    }
})();