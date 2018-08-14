import QtQuick 2.0
import QtQuick.Controls 2.2

Rectangle {
    id: delegateItem
    width: parent.width; height: 100
    color: "transparent"
    property var stackView
    property bool createChannel: false

    MouseArea {
        anchors.fill: parent
        onClicked: {
            if(createChannel){
                console.log("add " + name)
            } else {
                stackView.push("qrc:/Chat.qml", { inConversationWith: name })
            }
        }
    }

    RoundedAvatar {
        id: imageItem
        width: 80; height: 80
        source: "qrc:/images/" + avatar
    }

    Column {
        anchors.left: imageItem.right
        anchors.leftMargin: 20
        anchors.topMargin: 40
        Text {
            id: itexItem
            font.pixelSize: 20
            text: name
        }

        Label {
            id: timestampText
            text: handle
            color: "light gray"
        }
    }
}
