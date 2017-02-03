'use strict';

let ARRAYOFHTML = [{
    begin: ['<b>', '<i>', '<ins>', '<code>', '<mark>'],
    end: ['</b>', '</i>', '</ins>', '</code>', '</mark>']
}];

let $text = document.getElementById('text');
let selection = '';
let $menu = document.getElementById('main-menu');
let $clearText = $text.innerHTML;

function selectedText() {
    $text.addEventListener('mouseup', function () {

        if (window.getSelection) {
            selection = window.getSelection().toString();
        } else if (document.selection) {
            selection = document.selection.createRange().text;
        }
        return selection;
    })

}

function clearEdit() {
    $text.innerHTML = $clearText;
    return $text;
}

function wrapString(selectedText, indexOfHtml) {
    return ARRAYOFHTML[0].begin[indexOfHtml] + selectedText + ARRAYOFHTML[0].end[indexOfHtml];
}

function setupReplace(selectedText, indexOfHtml) {
    let newText = wrapString(selectedText, indexOfHtml);
    $text.innerHTML = $text.innerHTML.replace(selectedText, newText);
}

$menu.addEventListener('click', function (e) {
    let chosenId = e.target.id;
    if (chosenId == 'bold')
        setupReplace(selection, 0);
    else if (chosenId == 'italic')
        setupReplace(selection, 1);
    else if (chosenId == 'underlined')
        setupReplace(selection, 2);
    else if (chosenId == 'code')
        setupReplace(selection, 3);
    else if (chosenId == 'mark')
        setupReplace(selection, 4);
    else if (chosenId == 'clear')
        clearEdit();
});

function keysBind(e) {
    switch (e.keyCode) {
        case 66 : {
            setupReplace(selection, 0);
            break;
        }
        case 67: {
            setupReplace(selection, 3);
            break;
        }
        case 73: {
            setupReplace(selection, 1);
            break;
        }
        case 77: {
            setupReplace(selection, 4);
            break;
        }
        case 85: {
            setupReplace(selection, 2);
            break;
        }
        case 8: {
            clearEdit();
            break;
        }
    }
}
document.addEventListener('keyup', keysBind);
selectedText();
