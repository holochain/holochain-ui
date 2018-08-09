import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3

Page {
    id: contacts
    title: "Channels"

    ColumnLayout {
        anchors.fill: parent
        JsonModel {
            id: channelsModel
            dataUrl: "data/channels.json"
            onIsLoaded: {
                console.log("Channels loaded")
            }
        }
        Pane {
            id: pane
            Layout.fillWidth: true
            CommonButton {
                id: addChannel
                text: qsTr("Add Channel")
                anchors.right: parent.right
                onClicked: {
                    contacts.StackView.view.push("qrc:/NewChannel.qml")
                }
            }
        }
        ListView {
            id: channelsListView
            Layout.fillWidth: true
            Layout.fillHeight: true
            displayMarginBeginning: 200
            displayMarginEnd: 40
            topMargin: 48
            leftMargin: 48
            bottomMargin: 48
            rightMargin: 48
            spacing: 20
            model: channelsModel.model
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
}
