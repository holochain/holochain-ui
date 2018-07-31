import QtQuick 2.11
import QtQuick.Controls 2.4

ApplicationWindow {
    id: window
    visible: true
    width: 500
    height: 900
    title: qsTr("Stack")

    Component.onCompleted: {
            //window.showFullScreen();
        }

    header: ToolBar {
        id: mainToolBar
        contentHeight: toolButton.implicitHeight

        ToolButton {
            id: toolButton
            text: stackView.depth > 1 ? "\u25C0" : "\u2630"
            font.pixelSize: Qt.application.font.pixelSize * 1.6
            onClicked: {
                if (stackView.depth > 1) {
                    stackView.pop()
                } else {
                    drawer.open()
                }
            }
        }

        Label {
            text: stackView.currentItem.title
            anchors.centerIn: parent
        }
    }

    Drawer {
        id: drawer
        width: window.width * 0.66
        height: window.height

        Column {
            anchors.fill: parent

            ItemDelegate {
                text: qsTr("Contacts")
                width: parent.width
                onClicked: {
                    stackView.push("Contacts.qml")
                    drawer.close()
                }
            }
            ItemDelegate {
                text: qsTr("Profiles")
                width: parent.width
                onClicked: {
                    stackView.push("Profiles.qml")
                    drawer.close()
                }
            }
        }
    }

    StackView {
        id: stackView
        initialItem: "Home.qml"
        anchors.fill: parent
    }
}
