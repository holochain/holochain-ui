import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.2

Page {
    id: contacts
    header: ToolBar {
        Label {
            text: qsTr("Contacts")
            font.pixelSize: 20
            anchors.centerIn: parent
        }
    }
    ListView {
        id: listView
        anchors.fill: parent
        topMargin: 48
        leftMargin: 48
        bottomMargin: 48
        rightMargin: 48
        spacing: 20
        model: [{"name":"Celestial", "avatar":"celestial.png"}, {"name":"Micah", "avatar":"micah.png"}, {"name":"Philip", "avatar":"philip.png"}, {"name":"Jean", "avatar":"jean.png"}]
        delegate: ItemDelegate {
            text: modelData.name
            width: listView.width - listView.leftMargin - listView.rightMargin
            height: avatar.implicitHeight
            leftPadding: avatar.implicitWidth + 32
            onClicked: contacts.StackView.view.push("qrc:/Chat.qml", { inConversationWith: modelData.name })
            Image {
                id: avatar
                source: "qrc:/images/" + modelData.avatar
                width: 100
                height: 100
            }
        }
    }
}
