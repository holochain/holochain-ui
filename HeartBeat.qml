import QtQuick 2.11
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3

Page {

    id: schedule
    property string findTimewith
    property string inviteNotes
    property string selectedTime

    title: "Schedule a Heartbeat with " + findTimewith

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

        Label {
            width: parent.width
            wrapMode: Label.Wrap
            anchors.horizontalCenter: parent.horizontalCenter
            text: "Meeting details"
        }
        ComboBox {
            anchors.horizontalCenter: parent.horizontalCenter
            currentIndex: 0

            model: ListModel {
                id: cbTime
                ListElement { text: "30min"}
                ListElement { text: "1 hour"}
                ListElement { text: "1 hour 30 min"}
                ListElement { text: "2 hours"}
            }
            width: 200
            onCurrentIndexChanged: {

                console.debug(cbTime.get(currentIndex).text)
                selectedTime = cbTime.get(currentIndex).text
            }

        }
        TextArea {
            id: notes
            placeholderText: ("Enter notes: ")
            onTextChanged: {
                if (selectedTime=="")
                        inviteNotes = text + ". This Heartbeat is scheduled for 30min"
                else
                    inviteNotes = text + ". This Heartbeat is scheduled for " + selectedTime
            }

            anchors.horizontalCenter: parent.horizontalCenter

        }
        Button {
            id: submitInvite
            text: qsTr("Invite")
            enabled: true
            anchors.horizontalCenter: parent.horizontalCenter
            onClicked: schedule.StackView.view.push("qrc:/Chat.qml", {inviteDetails: inviteNotes})
        }
    }

}


