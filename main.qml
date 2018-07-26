import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.2

Window {
    id: window
    visible: true
    width: 640
    height: 960

    StackView {
       id: stackView
       anchors.fill: parent
       initialItem: Contacts {
       }
   }
}
