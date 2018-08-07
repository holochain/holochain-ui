import QtQuick 2.11
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3

Page {
    id: root
    property string inConversationWith
    property string channelName
    property string inviteDetails

    title: "Abundance of Presence - " + inConversationWith
    ColumnLayout {
        anchors.fill: parent
        JsonModel {
            id: arcs
            dataUrl: "data/presence_" + channelName + ".json"
            onIsLoaded: {
                console.log("model" + model.get(0).booked.get(0).bookedBegin)
            }
        }
        Pane {
            id: presence
            Layout.alignment: Qt.AlignHCenter
            RowLayout {
                Layout.fillWidth: true
                width: parent.width
                PresenceArcs {
                    Layout.alignment : Qt.AlignHCenter
                    presenceArcs: arcs.model
                    width: 300
                    height: 300
                }
                Button {
                    id: findTimeButtton
                    text: qsTr("Find Time")
                    enabled: true
                    onClicked: root.StackView.view.push("qrc:/FindTime.qml",{findTimeWith: inConversationWith , rememberChannel: channelName})
                }
            }
        }

        JsonModel {
            id: chatMessagesModel
            dataUrl: "data/messages_" + channelName + ".json"
            onIsLoaded: {
                console.log("data/messages_" + channelName + ".json" + model.get(0).author.name)
            }
        }

        ListView {
            id: chatList
            Layout.fillWidth: true
            Layout.fillHeight: true
            Layout.margins: pane.leftPadding + messageField.leftPadding
            displayMarginBeginning: 200
            displayMarginEnd: 40
            verticalLayoutDirection: ListView.BottomToTop
            spacing: 12
            model: chatMessagesModel.model
            delegate: Column {
                readonly property bool wasSentByMe: (sentByMe === 'true')

                anchors.right: wasSentByMe ? parent.right : undefined
                spacing: 6
                Row {
                    id: messageRow

                    RoundedAvatar {
                        id: avatar
                        source: !wasSentByMe ? "qrc:/images/" + author.avatar : ""
                        width: 50
                        height: 50

                    }
                    Rectangle {
                        width: Math.min(messageText.implicitWidth + 24, chatList.width - (!wasSentByMe ? avatar.width + messageRow.spacing : 0))
                        height: messageText.implicitHeight + 24
                        color: wasSentByMe ? "lightgrey" : "steelblue"
                        radius: 15
                        Label {
                            id: messageText
                            text: message
                            color: wasSentByMe ? "black" : "white"
                            anchors.fill: parent
                            anchors.margins: 12
                            wrapMode: Label.Wrap
                        }
                    }
                }
                Label {
                    property var locale: Qt.locale()
                    property date currentDate: new Date(timestamp)
                    property string dateString

                    id: timestampText
                    text: currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString()
                    color: "light gray"
                    anchors.right: wasSentByMe ? parent.right : undefined
                }
            }

            ScrollBar.vertical: ScrollBar {}
        }

        Pane {
            id: pane
            Layout.fillWidth: true

            RowLayout {
                width: parent.width

                TextArea {
                    id: messageField
                    Layout.fillWidth: true
                    placeholderText: qsTr("Compose Message: ")
                    states: State { name: "invited"; when: inviteDetails != ""
                        PropertyChanges {target: messageField; placeholderText: "" }
                    }
                    text: inviteDetails
                    wrapMode: TextArea.Wrap
                }

                Button {
                    id: sendButton
                    text: qsTr("Send")
                    enabled: messageField.length > 0
                    property string currentTime
                    onClicked: {
                        currentTime = new Date().toISOString();
                        console.log(currentTime)
                        chatMessagesModel.insertItem({"author": {"name":"Philip", "avatar":"philip.png"}, "sentByMe":"true", "message": messageField.text, "timestamp":currentTime})
                    }
                }
            }
        }
    }
}
