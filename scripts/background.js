'use strict';

var noop = function () {};

chrome.contextMenus.create({
    title: 'Search for ',
    contexts: ['selection'],
    id: 'DuckDuckGoContextMenu',
    onclick: function (info) {
        chrome.tabs.create({url: 'https://duckduckgo.com/?q=' + info.selectionText});
    }
});

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.selection) {
        if (request.message === 'updateContextMenu') {
            var i18n = chrome.i18n;
            var localeMessage = {
                message: i18n.getMessage('searchMessage'),
                quoteStart: i18n.getMessage('quoteStart'),
                quoteEnd: i18n.getMessage('quoteEnd')
            };
            chrome.contextMenus.update('DuckDuckGoContextMenu', {
                title: localeMessage.message + localeMessage.quoteStart + request.text + localeMessage.quoteEnd
            });
        }
    }
    sendResponse(noop);
});