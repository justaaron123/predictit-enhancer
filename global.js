function addScript(file) {
    var s = document.createElement('script');
    s.src = file.indexOf('http') == -1 ? chrome.extension.getURL(file) : file;
    (document.head||document.documentElement).appendChild(s);
    s.onload = function() {
        s.parentNode.removeChild(s);
    };
}

function addCss(file) {
    var l = document.createElement('link');
    l.href = file.indexOf('http') == -1 ? chrome.extension.getURL(file) : file;
    l.type = 'text/css';
    l.rel = 'stylesheet';
    (document.head||document.documentElement).appendChild(l);
}
