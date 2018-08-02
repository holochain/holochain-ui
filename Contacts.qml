import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.2

Page {
    id: contacts
    title: "Contacts"
    anchors.fill: parent

    JsonModel {
        id: contactsModel
        dataUrl: "data/contacts.json"
        onIsLoaded: {
            console.log("model" + model.get(0).name)
        }
    }

    ListView {
        id: contactsListView
        anchors.fill: parent
        topMargin: 48
        leftMargin: 48
        bottomMargin: 48
        rightMargin: 48
        spacing: 20
        model: contactsModel.model
        delegate: Rectangle {
            id: delegateItem
            width: parent.width; height: 100
            color: "transparent"
            MouseArea {
                anchors.fill: parent
                onClicked: contacts.StackView.view.push("qrc:/Chat.qml", { inConversationWith: name, channelName: channel })
            }

            RoundedAvatar {
              id: imageItem
              width: 100; height: 100
              source: "qrc:/images/" + avatar
            }

            Text {
              id: itexItem
              anchors.left: imageItem.right
              anchors.leftMargin: 20
              anchors.verticalCenter: parent.verticalCenter
              font.pixelSize: 20
              text: name
            }
          }
    }
}
