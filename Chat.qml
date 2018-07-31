import QtQuick 2.11
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3

Page {
    id: root
    property string inConversationWith
    title: "Abundance of Presence - " + inConversationWith
    ColumnLayout {
        anchors.fill: parent
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
            model: [
                 {"author": {"name":"Micah", "avatar":"micah.png"}, "sentByMe":"false", "message":"Perfect book me in", "timestamp":"2018.07.18:00:11:22"},
                 {"author": {"name":"Philip", "avatar":"philip.png"}, "sentByMe":"true", "message":"Say an hour, long enough for a decent walkies :)", "timestamp":"2018.07.18:00:11:22"},
                 {"author": {"name":"Philip", "avatar":"philip.png"}, "sentByMe":"true", "message":"Cool, how about a bit later", "timestamp":"2018.07.18:00:11:22"},
                {"author": {"name":"Micah", "avatar":"micah.png"}, "sentByMe":"false", "message":"Actaully I have to go walk teh dog", "timestamp":"2018.07.18:00:11:22"},
                {"author": {"name":"Philip", "avatar":"philip.png"}, "sentByMe":"true", "message":"I see your free after standup", "timestamp":"2018.07.18:00:11:22"},
                {"author": {"name":"Micah", "avatar":"micah.png"}, "sentByMe":"false", "message":"Yeah sure Phil", "timestamp":"2018.07.18:00:11:22"},
               {"author": {"name":"Philip", "avatar":"philip.png"}, "sentByMe":"true", "message":"I'm having issues with layout", "timestamp":"2018.07.18:00:11:22"},
                {"author": {"name":"Philip", "avatar":"philip.png"}, "sentByMe":"true", "message":"Hi Micah can we catch up for a quick run down on QML?", "timestamp":"2018.07.18:00:11:22"},
              {"author": {"name":"Philip", "avatar":"philip.png"}, "sentByMe":"true", "message":"Phil Another tweet", "timestamp":"2018.07.18:00:11:22"},
                {"author": {"name":"Micah", "avatar":"micah.png"}, "sentByMe":"false", "message":"Micah Blah blah Micah Blah blah Micah Blah blah Micah Blah blah Micah Blah blah Micah Blah blah Micah Blah blah Micah Blah blah", "timestamp":"2018.07.18:00:11:22"},
                {"author": {"name":"Philip", "avatar":"philip.png"}, "sentByMe":"true", "message":"Phil message", "timestamp":"2018.07.18:00:11:22"}
            ]
            delegate: Column {
                readonly property bool sentByMe: (modelData.sentByMe === 'true')

                anchors.right: sentByMe ? parent.right : undefined
                spacing: 6
                Row {
                    id: messageRow

                    Image {
                        id: avatar
                        source: !sentByMe ? "qrc:/images/" + modelData.author.avatar : ""
                        width: 50
                        height: 50

                    }
                    Rectangle {
                        width: Math.min(messageText.implicitWidth + 24, chatList.width - (!sentByMe ? avatar.width + messageRow.spacing : 0))
                        height: messageText.implicitHeight + 24
                        color: sentByMe ? "lightgrey" : "steelblue"
                        radius: 15
                        Label {
                            id: messageText
                            text: modelData.message
                            color: sentByMe ? "black" : "white"
                            anchors.fill: parent
                            anchors.margins: 12
                            wrapMode: Label.Wrap
                        }
                    }
                }
                Label {
                    id: timestampText
                    text: Qt.formatDateTime(modelData.timestamp, "d MMM hh:mm")
                    color: "lightgrey"
                    anchors.right: sentByMe ? parent.right : undefined
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
                    placeholderText: qsTr("Compose message")
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
