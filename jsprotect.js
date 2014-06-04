
function jsprotect_strrev(str) {
    return str.split('').reverse().join('');
}

function jsprotect_encode(str) {
    return btoa(jsprotect_strrev(str));
}

function jsprotect_decode(str) {
    return jsprotect_strrev(atob(str));
}

function jsprotect_apply(element) {
    var dataAttr = element.getAttribute('data-jsprotect-inner');
    if (dataAttr) {
        element.innerHTML = jsprotect_decode(dataAttr.valueOf());
    }

    var hrefAttr = element.getAttribute('data-jsprotect-href');
    if (hrefAttr) {
        element.setAttribute('href', jsprotect_decode(hrefAttr.valueOf()));
    }
}

function jsprotect_run(ids) {
    var startTime = new Date().getTime();

    // Wait time (in ms) can be adjusted to a higher arbitrary value to
    // mitigate against some automated screenshot tools.
    var wait = 192 + Math.floor(Math.random() * 384);

    setTimeout(function () {
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
        idArray.forEach(function (id) {
            jsprotect_apply(document.getElementById(id));
        });
    }, wait);
}

function jsprotect_run_global() {
    var startTime = new Date().getTime();

    // Wait time (in ms) can be adjusted to a higher arbitrary value to
    // mitigate against some automated screenshot tools.
    var wait = 192 + Math.floor(Math.random() * 384);

    setTimeout(function () {
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

        var allElements = document.getElementsByTagName('*');
        for (var i = 0; i < allElements.length; i++) {
            jsprotect_apply(allElements[i]);
        }
    }, wait);
}
