import QtQuick 2.0

Item {
    id: wrapper
    property string dataUrl
    signal isLoaded
    property variant model: dataList
    property int status: XMLHttpRequest.UNSENT
    property bool isLoading: status === XMLHttpRequest.LOADING
    property bool wasLoading: false
    ListModel { id: dataList }

    Component.onCompleted: {
        console.log("Loading data 1" + dataUrl)
        dataList.clear()
        var req = new XMLHttpRequest;
        req.open("GET", dataUrl);
        req.onreadystatechange = function() {
            status = req.readyState;
            if (status === XMLHttpRequest.DONE) {
                console.log(req.responseText)
                var objectArray = JSON.parse(req.responseText);
                if (objectArray.errors !== undefined)
                    console.log("Error fetching data: " + objectArray.errors[0].message)
                else {
                    for (var key in objectArray) {
                        var jsonObject = objectArray[key];
                        dataList.append(jsonObject);
                    }
                }
                if (wasLoading == true){
                    console.log(dataList.rowCount())
                    wrapper.isLoaded(dataList.rowCount())
                }
            }
            wasLoading = (status === XMLHttpRequest.LOADING);
        }
        req.send();
    }
}
