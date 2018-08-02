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
        dataList.append({
                        "name": "Phil",
                        "avatar": "images/philip.png",
                        "availBegin": 0,
                        "availEnd": 180,
                        "booked": [
                          {
                            "bookedBegin": 30,
                            "bookedDuration": 5
                          },
                          {
                            "bookedBegin": 120,
                            "bookedDuration": 15
                          }
                        ]
                      });
        dataList.append({
                            "name": "Micah",
                            "avatar": "images/micah.png",
                            "availBegin": 300,
                            "availEnd": 180,
                            "booked": [
                              {
                                "bookedBegin": 30,
                                "bookedDuration": 5
                              },
                              {
                                "bookedBegin": 100,
                                "bookedDuration": 15
                              }
                            ]
                          });
    }
}
