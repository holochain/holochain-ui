import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.2

Page {
    id: splash
    title: qsTr("Holochain")
    Rectangle{
        color: "#4d4d4d"
        anchors.fill: parent
        Image {
            id: splashImage
            width: parent.width -50
            fillMode: Image.PreserveAspectFit
            x: (parent.width - splashImage.width) / 2
            y: (parent.height - splashImage.height) / 2
            source: "qrc:/images/Holochain_logo"
        }
    }
}
