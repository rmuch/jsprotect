
function jsprotect_strrev(str) {
    return str.split('').reverse().join('');
}

function jsprotect_encode(str) {
    return btoa(jsprotect_strrev(str));
}

function jsprotect_decode(str) {
    return jsprotect_strrev(atob(str));
}

function jsprotect_apply(id) {
    var tag = document.getElementById(id);

    var dataAttr = tag.getAttribute('data-jsprotect-inner');
    if (dataAttr) {
        tag.innerHTML = jsprotect_decode(dataAttr.valueOf());
    }

    var hrefAttr = tag.getAttribute('data-jsprotect-href');
    if (hrefAttr) {
        tag.setAttribute('href', jsprotect_decode(hrefAttr.valueOf()));
    }
}

function jsprotect_run(ids) {
    var startTime = new Date().getTime();

    // Wait time (in ms) can be adjusted to a higher arbitrary value to
    // mitigate against some automated screenshot tools.
    var wait = 192 + Math.floor(Math.random() * 384);

    setTimeout(function() {
        var completionTime = new Date().getTime();
        var delta = completionTime - startTime;

        // Probably not particularly useful, but we can detect here if the
        // JavaScript engine is running at a faster speed but still correctly
        // reporting time.
        var tolerance = 64;
        var deltaWait = Math.abs(wait - delta);
        if (deltaWait > tolerance) {
            return;
        }

        var idArray = ids.split(' ');
        idArray.forEach(function (a) {
            jsprotect_apply(a);
        });
    }, wait);
}
