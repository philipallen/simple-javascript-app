(function () {
    route('/page1', 'selected-car', function () {
        init();
    });

    var vehData = [];

    //needs a 'onExit' function that removes stuff

    function init() {
        vehData.length = 0;
        vehData.push(JSON.parse(window.localStorage.getItem(getParameterByName('id'))))
        carService.buildCarRows(vehData);
    }

    //extract a parameter from the url
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
})();