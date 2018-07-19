import QtQuick 2.11
import QtQuick.Controls 2.4

Page {
    width: 750
    height: 1355

    header: Label {
        text: qsTr("Abundance of Presence")
        verticalAlignment: Text.AlignTop
        horizontalAlignment: Text.AlignHCenter
        font.pixelSize: 37
        font.weight: Font.ExtraBold
        font.bold: true
        padding: 10
    }

    property var presenceData: [{
            name: "Phil",
            avatar: "resources/images/philip.png",
            availBegin: 0,
            availEnd: 180
        }]

    ListModel {
        id: arcs

        ListElement {
            name: "Phil"
            avatar: "resources/images/philip.png"
            availBegin: 0
            availEnd: 180
            booked: [
                ListElement {
                    bookedBegin: 195
                    bookedEnd: 200
                },
                ListElement {
                    bookedBegin: 225
                    bookedEnd: 255
                }
            ]
        }
        ListElement {
            name: "Micah"
            avatar: "resources/images/micah.png"
            availBegin: 300
            availEnd: 180
            booked: [
                ListElement {
                    bookedBegin: 195
                    bookedEnd: 200
                }
            ]
        }
        ListElement {
            name: "Celestial"
            avatar: "resources/images/celestial.png"
            availBegin: 300
            availEnd: 180
            booked: [
                ListElement {
                    bookedBegin: 195
                    bookedEnd: 200
                }
            ]
        }
        ListElement {
            name: "Jean"
            avatar: "resources/images/jean.png"
            availBegin: 300
            availEnd: 180
            booked: [
                ListElement {
                    bookedBegin: 195
                    bookedEnd: 200
                }
            ]
        }
    }

    PresenceArcs {
        presenceArcs: presenceData
        x: 25
        y: 75
        width: 600
        height: 600
        anchors.horizontalCenter: parent.horizontalCenter
    }
}
