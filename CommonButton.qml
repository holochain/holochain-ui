import QtQuick 2.11
import QtQuick.Controls 2.2
import QtQuick.Controls.Universal 2.4

Button {
    id: standardButton

    contentItem: Text {
        text: standardButton.text
        font.bold: standardButton.font
        color: standardButton.down ? "white" : "#E5E9FB"
        horizontalAlignment: Text.AlignHCenter
        verticalAlignment: Text.AlignVCenter
        elide: Text.ElideRight
    }
    background: Rectangle {
        implicitWidth: 76
        implicitHeight: 40
        opacity: enabled ? 1 : 0.3
        border.color: "#8051ED"
        gradient: Gradient {
                        GradientStop { position: 0 ; color: standardButton.pressed ? "#57B496" : "#8051ED" }
                        GradientStop { position: 1 ; color: standardButton.pressed ? "#8051ED" : "#57B496" }
                    }
        border.width: 1.5
        radius: width / 2
    }

}
