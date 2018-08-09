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
    property variant objectArray
    property string searchTerm

    Component.onCompleted: {
        console.log("Loading data " + dataUrl)
        dataList.clear()
        var req = new XMLHttpRequest;
        req.open("GET", dataUrl);
        req.onreadystatechange = function() {
            status = req.readyState;
            if (status === XMLHttpRequest.DONE) {
                //                console.log(req.responseText)
                objectArray = JSON.parse(req.responseText);
                if (objectArray.errors !== undefined)
                    console.log("Error fetching data: " + objectArray.errors[0].message)
                else {
                    for (var key in objectArray) {
                        var jsonObject = objectArray[key];
                        dataList.append(jsonObject);
                    }
                }
                if (wasLoading == true){
                    //                    console.log(dataList.rowCount())
                    console.log("Loaded data " + dataUrl)
                    wrapper.isLoaded()
                }
            }
            wasLoading = (status === XMLHttpRequest.LOADING);
        }
        req.send();
    }

    function insertItem(item) {
        dataList.insert(0, item)
        console.log("Send the item to Holochain here!")
    }


    function containsNameOrHandle(contact) {
        return contact.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    }

    function filter() {
        dataList.clear()
        var filteredObjectArray = objectArray.filter(containsNameOrHandle)
//        console.log(filteredObjectArray)
        for (var key in filteredObjectArray) {
            var jsonObject = filteredObjectArray[key];
            dataList.append(jsonObject);
        }
    }
}
