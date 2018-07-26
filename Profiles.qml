import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.2

Page {
    id: profiles
    title: "Profiles & Personas"
    anchors.fill: parent
    Label {
        text: qStr("This is where we manage our private personas and which apps have Profiles.")
        anchors.centerIn: parent
    }
}
