(function () {
    route('/', 'car', function () { 
        init();
    });

    var searchResults;
    var vehData;

    //needs a 'onExit' function that removes stuff

    function init() {
        searchResults = carService.getCars('cars.json');
        if (!searchResults) alert('No data found'); //TODO present error handling on page?
        vehData = carService.mapCarData(searchResults.VehAvailRSCore.VehVendorAvails);
        removeCarRows();
        buildSearchCriteria();
        carService.buildCarRows(vehData);
        addCarRowEvents();
        buildSortButton();
    }

    function buildSortButton() {
        var sortButton = document.getElementById('sortButton');
        sortButton.addEventListener('click', sortData);
    }

    function sortData() {
        vehData = vehData.sort(carService.sortCars(vehData));
        removeCarRows();
        carService.buildCarRows(vehData);
        addCarRowEvents();
    }

    function buildSearchCriteria() {
        if (document.getElementById('vehSearchCriteria')) return;
        var vehSearchCriteria = searchResults.VehAvailRSCore.VehRentalCore;
        var content = document.getElementById('content');
        content.insertAdjacentHTML('beforeend',
            '<div id="vehSearchCriteria"> \
                <h5>pick up time: ' + vehSearchCriteria['@PickUpDateTime'] + '</h5> \
                <h5>drop off time: ' + vehSearchCriteria['@ReturnDateTime'] + '</h5> \
                <h5>pick up location: ' + vehSearchCriteria.PickUpLocation['@Name'] + '</h5> \
                <h5>return location: ' + vehSearchCriteria.ReturnLocation['@Name'] + '</h5> \
            </div>'
        );
    }

    function removeCarRows() {
        var rows = document.getElementsByClassName('car-row');
        for (var i = rows.length - 1; i >= 0; i--) {
            rows[i].parentElement.removeChild(rows[i])
        }
    }

    function addCarRowEvents() {
        var carRows = document.getElementsByClassName('car-row');
        for (var i = 0; i < carRows.length; i++) {
            carRows[i].addEventListener('click', function() {
                removeCarRows();
                window.location.href = '#/page1?id=' + this.id ;
            });
        }
    }
})();

