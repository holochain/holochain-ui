import QtQuick 2.11
import QtQuick.Shapes 1.0

Item {
    property ListModel presenceArcs: arcs

    Image {
        source: "resources/images/24-hour-clock-face.jpg"
        anchors.horizontalCenter : parent.horizontalCenter
        Repeater {
            model: presenceArcs
            Shape {
               width: parent.width
               height: parent.height
               anchors.bottom: parent.bottom
               anchors.right: parent.right

               scale: 0.5

               ShapePath {
                   fillColor: "transparent"
                   strokeColor: "green"
                   strokeWidth: 20
                   capStyle: ShapePath.RoundCap

                   PathAngleArc {
                       centerX: parent.width / 2; centerY: parent.height / 2
                       radiusX: parent.width / (arcs.count + 2) * (index + 1); radiusY: parent.height / (arcs.count + 2) * (index + 1)
                       startAngle: availBegin
                       SequentialAnimation on sweepAngle {
                           loops: 1
                           NumberAnimation { to: availEnd; duration: 2000 }
                       }
                   }
               }
               Image {
                   id: image
                   x: parent.width / 2
                   y: parent.height / (arcs.count + 2) * (index + 1) + (parent.height / 2)
                   width: 50
                   height: 50
                   source: avatar
               }
           }
        }
    }
}
