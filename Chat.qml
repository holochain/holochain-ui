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
//        JsonModel {
//            id: arcs
//            dataUrl: "data/" + channelName + ".json"
//            onIsLoaded: {
//                console.log("model" + model.get(0).name)
//            }
//        }
        ListModel {
            id: arcs

            ListElement {
                name: "Phil"
                avatar: "images/philip.png"
                availBegin: 0
                availEnd: 180
                booked: [
                    ListElement {
                        bookedBegin: 30
                        bookedDuration: 5
                    },
                    ListElement {
                        bookedBegin: 120
                        bookedDuration: 15
                    }
                ]
            }
            ListElement {
                name: "Micah"
                avatar: "images/micah.png"
                availBegin: 300
                availEnd: 180
                booked: [
                    ListElement {
                        bookedBegin: 30
                        bookedDuration: 5
                    },
                    ListElement {
                        bookedBegin: 100
                        bookedDuration: 15
                    }
                ]
            }
        }
        Pane {
            id: presence
            anchors.horizontalCenter: parent.horizontalCenter
            RowLayout {
                Layout.fillWidth: true
                width: parent.width
                PresenceArcs {
                    Layout.alignment : AlignHCenter
                    presenceArcs: arcs
                    width: 300
                    height: 300
                }
                Button {
                    id: heartbeatButtton
                    text: qsTr("Heart Beat")
                    enabled: true
                    onClicked: root.StackView.view.push("qrc:/HeartBeat.qml",{ findTimewith: inConversationWith })
                }                
            }
        }

        JsonModel {
            id: chatMessagesModel
            dataUrl: "data/messages_" + channelName + ".json"
            onIsLoaded: {
                console.log("data/messages_" + channelName + ".json" + model.get(0).name)
            }
        }

        ListView {
            id: chatList
            Layout.fillWidth: true
            Layout.fillHeight: true
            Layout.margins: pane.leftPadding + messageField.leftPadding
            displayMarginBeginning: 40
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
                    id: timestampText
                    text: Qt.formatDateTime(timestamp, "d MMM hh:mm")
                    color: "lightgrey"
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
                    onClicked: chatList.model.push({"author": {"name":"Philip", "avatar":"philip.png"}, "sentByMe":"true", "message":"Appended", "timestamp":"2018.07.18:00:11:22"})
                }
            }
        }
    }
}
