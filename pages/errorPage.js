(function() {
    var content = document.getElementById('content');

    route('*', 'error404', function () {
        init();
    });

    function init() {
        content.innerHTML = "";
        content.insertAdjacentHTML('beforeend', '<h1>404 Not found</h1>');
    }

    //needs a 'onExit' function that removes stuff
})();