import QtQuick 2.11
import Qt.labs.calendar 1.0
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3

Page {

    id: schedule
    property string findTimeWith
    property string inviteNotes
    property string selectedTime
    property string selectedMeeting
    property string rememberChannel
    property string meetSpace

    title: "Schedule a meeting with " + findTimeWith

    ColumnLayout {
        anchors.fill: parent
        Text {
            id: currentDate
            Layout.alignment: Qt.AlignHCenter
            font.bold: true
            horizontalAlignment: Text.AlignHCenter
            text: "Today: " + new Date().toLocaleDateString(Qt.locale("en_AU")) // + "\n" + new Date().toLocaleTimeString(Qt.locale("en_AU"))
        }
        ColumnLayout {
            id:monthlyCalendar
            DayOfWeekRow {
                locale: grid.locale
                Layout.fillWidth: true
            }

            MonthGrid {
                id: grid
                //month: Calendar.*  be able to change this to current month
                //year: 2018  be able to change the year
                locale: Qt.locale("en_US")
                Layout.fillWidth: true
            }
        }
        JsonModel {
            id: arcs
            dataUrl: "data/presence_" + rememberChannel + ".json"
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
                    Layout.alignment: Qt.AlignHCenter
                    presenceArcs: arcs.model
                    width: 300
                    height: 300
                }
            }
        }

        Label {
            width: parent.width
            wrapMode: Label.Wrap
            Layout.alignment: Qt.AlignHCenter
            text: "Meeting details"
        }
        ComboBox {
            Layout.alignment: Qt.AlignHCenter
            currentIndex: 0
            editable:true
            model: ListModel {
                id: zoomRoom
                ListElement { text: "Teal Room"}
                ListElement { text: "Yellow Room"}
            }
            onAccepted: {
                if (find(editText) === -1)
                    meetSpace = model.append({text: editText})
            }
            width: 300
            onCurrentIndexChanged: {

                console.debug(zoomRoom.get(currentIndex).text)
                meetSpace = zoomRoom.get(currentIndex).text
            }

        }
        RowLayout
        {
            Layout.alignment: Qt.AlignHCenter
            spacing: 6

            ComboBox {
                currentIndex: 0
                editable:true
                model: ListModel {
                    id: meetingType
                    ListElement { text: "Heartbeat"}
                    ListElement { text: "Interview"}
                    ListElement { text: "Knowledge Transfer"}
                    ListElement { text: "..."}
                }
                width: 200
                onCurrentIndexChanged: {

                    console.debug(meetingType.get(currentIndex).text)
                    selectedMeeting = meetingType.get(currentIndex).text
                }
                onAccepted: {
                    if (find(editText) === -1)
                        selectedMeeting = model.append({text: editText})
                }

            }
            ComboBox {
                currentIndex: 0
                editable:true
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
                onAccepted: {
                    if (find(editText) === -1)
                        selectedTime = model.append({text: editText})
                }

            }
        }


        TextArea {
            id: notes
            Layout.alignment: Qt.AlignHCenter
            placeholderText: ("Enter notes: ")
            onTextChanged: {
                if (selectedTime=="")
                        inviteNotes = text + ". This meeting is scheduled for 30min"
                else
                    inviteNotes = text + ": This "+ selectedMeeting + " is scheduled for " + selectedTime + " in " + meetSpace
            }
        }
        CommonButton {
            id: submitInvite
            Layout.alignment: Qt.AlignHCenter
            text: qsTr("Invite")
            enabled: true
            onClicked: schedule.StackView.view.push("qrc:/Chat.qml",{inviteDetails: inviteNotes , channelName: rememberChannel , inConversationWith: findTimeWith})
        }
    }

}


