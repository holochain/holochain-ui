import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.2

Page {
    id: contacts
    title: "Contacts"
    anchors.fill: parent
    ListView {
        id: listView
        anchors.fill: parent
        topMargin: 48
        leftMargin: 48
        bottomMargin: 48
        rightMargin: 48
        spacing: 20
        model: [{"name":"Celestial", "avatar":"celestial.png", "chat":"Chat.qml"}, {"name":"Micah", "avatar":"micah_notify.png", "chat":"Chat.qml"}, {"name":"Philip", "avatar":"philip.png", "chat":"Chat.qml"}, {"name":"Jean", "avatar":"jean.png", "chat":"Chat.qml"}, {"name":"Jean & Micah", "avatar":"micah_jean.png", "chat":"Chat2.qml"}]
        delegate: ItemDelegate {
            text: modelData.name
            width: listView.width - listView.leftMargin - listView.rightMargin
            height: avatar.implicitHeight
            leftPadding: avatar.implicitWidth + 32
            onClicked: contacts.StackView.view.push("qrc:/" + modelData.chat, { inConversationWith: modelData.name })
            RoundedAvatar {
                id: avatar
                source: "qrc:/images/" + modelData.avatar
                width: 100
                height: 100
            }
        }
    }
}
