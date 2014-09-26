'use strict';

document.addEventListener('mouseup', function () {
    var selectedText = this.getSelection().toString();
    if (selectedText) {
        chrome.extension.sendMessage({
            'message': 'updateContextMenu',
            'text': selectedText,
            'selection': true
        });
    }
});