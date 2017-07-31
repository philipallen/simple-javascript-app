var carService = (function() {
    return {
        getCars: function(url) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", url, false ); //TODO make this asynchronous using a callback?
            xmlHttp.send( null );
            return JSON.parse(xmlHttp.responseText)[0];
        },
        mapCarData: function(data) {
            var out = [];
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].VehAvails.length; j++) {
                    data[i].VehAvails[j]['Vendor'] = data[i].Vendor;
                    var newObj = {};

                    function flatten(data, preKey) {
                        for (var prop in data) {
                            if (data[prop] === Object(data[prop])) {
                                flatten(data[prop], prop);
                            } else {
                                var modifiedProp = preKey ? preKey + prop : prop;
                                newObj[modifiedProp] = data[prop];
                                newObj.id = i + '.' + j;
                            }
                        }
                    }
                    flatten(data[i].VehAvails[j]);
                    window.localStorage.setItem(newObj.id, JSON.stringify(newObj));
                    out.push(newObj);
                }
            }
            return out;
        },
        buildCarRows: function(cars) {
            var content = document.getElementById('content');
            for (var i = 0; i < cars.length; i++) {
                var elem = '<div class="car-row" id="' + cars[i].id + '"> \
                                <h4>' + cars[i]['VehMakeModel@Name'] + ' (' + cars[i]['Vendor@Name'] + ')' + '</h4> \
                                <div class="car-details"> \
                                    <div class="col-70"> \
                                        <p>transmission: <b>' + cars[i]['Vehicle@TransmissionType'] + '</b></p> \
                                        <p>max. passengers: <b>' + cars[i]['Vehicle@PassengerQuantity'] + '</b></p> \
                                        <p>fuel type: <b>' + cars[i]['Vehicle@FuelType'] + '</b></p> \
                                        <p>drive type: <b>' + cars[i]['Vehicle@DriveType'] + '</b></p> \
                                        <p>door count: <b>' + cars[i]['Vehicle@DoorCount'] + '</b></p> \
                                        <p>pcs of baggage: <b>' + cars[i]['Vehicle@BaggageQuantity'] + '</b></p> \
                                        <p>air conditioning: <b>' + cars[i]['Vehicle@AirConditionInd'] + '</b></p> \
                                    </div> \
                                    <div class="col-30"> \
                                        <p>price: ' + cars[i]['TotalCharge@CurrencyCode'] + cars[i]['TotalCharge@RateTotalAmount'] + '</p> \
                                    </div> \
                                </div> \
                            </div>'
                content.insertAdjacentHTML('beforeend', elem);
            }
        },
        sortCars: function(carData, column) { //rename to something more generic if required??
            // carData.lastSortedColumn = column;
            var sortOrder = 1;
            // if (carData.sortDirection == 'descending') {
            //     sortOrder = -1;
            // }
            return function (firstCar, secondCar) {
                console.log(firstCar['TotalCharge@RateTotalAmount']);
                console.log(secondCar['TotalCharge@RateTotalAmount']);


                var result = (Number(firstCar['TotalCharge@RateTotalAmount']) < Number(secondCar['TotalCharge@RateTotalAmount'])) ? -1 : (Number(firstCar['TotalCharge@RateTotalAmount']) > Number(secondCar['TotalCharge@RateTotalAmount'])) ? 1 : 0;
                
                console.log(result);
                return result * sortOrder;
            }
        }
    }
})()