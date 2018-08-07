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

            RowLayout {
                width: parent.width
                Button {
                    id: addChannel
                    text: "Add Channel"
                    contentItem: Text {
                            text: addChannel.text
                            font: addChannel.font
                            opacity: enabled ? 1.0 : 0.3
                            color: control.down ? "#17a81a" : "#21be2b"
                            horizontalAlignment: Text.AlignHCenter
                            verticalAlignment: Text.AlignVCenter
                            elide: Text.ElideRight
                        }
                    background: Rectangle {
                        color : "#00ff99"
                        implicitWidth: 100
                        implicitHeight: 40
                        opacity: enabled ? 1 : 0.3
                        border.color: addChannel.down ? "#17a81a" : "#21be2b"
                        border.width: 1
                        radius: 2
                    }
                    onClicked: {
                        messageField.visible = true
                    }
                }
                TextArea {
                    id: messageField
                    visible: false
                    Layout.fillWidth: true
                    placeholderText: qsTr("Compose Message: ")
                    wrapMode: TextArea.Wrap
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
