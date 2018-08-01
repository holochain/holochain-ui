import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.2
import QtGraphicalEffects 1.0

Image {
    id: avatar
    source: "qrc:/images/" + modelData.avatar
    property bool rounded: true
    property bool adapt: true
    
    layer.enabled: rounded
    layer.effect: OpacityMask {
        maskSource: Item {
            width: avatar.width
            height: avatar.height
            Rectangle {
                anchors.centerIn: parent
                width: avatar.adapt ? avatar.width : Math.min(avatar.width, avatar.height)
                height: avatar.adapt ? avatar.height : width
                radius: Math.min(width, height)
            }
        }
    }
}
