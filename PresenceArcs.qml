import QtQuick 2.11
import QtQuick.Shapes 1.0
import QtGraphicalEffects 1.0
import QtQuick.Controls 2.2

Item {
    property var presenceArcs: arcs
    width: parent.width
    height: parent.height
    Image {
        id: presence
        anchors.fill: parent
        source: "images/24-hour-clock-face.jpg"
        anchors.horizontalCenter : parent.horizontalCenter

        function calculateRadius(size, index) {
            return size / (arcs.count + 2) * (index + 1);
        }

        TestCase {

        }

        Repeater {
            model: presenceArcs
            Shape {
               anchors.fill: parent
               scale: 0.5

               ShapePath {
                   fillColor: "transparent"
                   strokeColor: "green"
                   strokeWidth: 20
                   capStyle: ShapePath.RoundCap

                   PathAngleArc {
                       id: presenceArc
                       centerX: parent.width / 2; centerY: parent.height / 2
                       radiusX: presence.calculateRadius(parent.width, index); radiusY: presence.calculateRadius(parent.height, index)
                       startAngle: availBegin
                       SequentialAnimation on sweepAngle {
                           loops: 1
                           NumberAnimation { to: availEnd; duration: 500 }
                       }
                   }
               }
               Repeater {
                   model: booked
                   Shape {
                      anchors.fill: parent

                      ShapePath {
                          fillColor: "transparent"
                          strokeColor: "red"
                          strokeWidth: 20

                          PathAngleArc {
                              centerX: parent.width / 2; centerY: parent.height / 2
                              radiusX: presenceArc.radiusX; radiusY: presenceArc.radiusY
                              startAngle: bookedBegin
                              sweepAngle: bookedDuration
                          }
                      }
                  }
               }
               Image {
                   id: avatarImage
                   x: parent.width / 2
                   y: parent.height / (arcs.count + 2) * (index + 1) + (parent.height / 2) -25
                   width: 50
                   height: 50
                   source: avatar
                   property bool rounded: true
                   property bool adapt: true

                   layer.enabled: rounded
                   layer.effect: OpacityMask {
                       maskSource: Item {
                           width: avatarImage.width
                           height: avatarImage.height
                           Rectangle {
                               anchors.centerIn: parent
                               width: avatarImage.width
                               height: avatarImage.height
                               radius: Math.min(width, height)
                           }
                       }
                   }
               }
           }
        }
        Item {
            id : clock
            width: 300
            height: 300
            anchors.centerIn: parent
            anchors.fill: parent
            property int hours
            property int minutes

            function timeChanged() {
                var date = new Date;
                hours = date.getHours()
                minutes = date.getMinutes()
            }

            Timer {
                interval: 100; running: true; repeat: true;
                onTriggered: clock.timeChanged()
            }

            Item {
                anchors.centerIn: parent
                anchors.fill: parent
                Image {
                    x: 140; y: 80
                    source: "images/hour.png"
                    transform: Rotation {
                        id: hourRotation
                        origin.x: 7.5; origin.y: 73;
                        angle: (clock.hours * 15) + (clock.minutes * 0.5)
                        Behavior on angle {
                            SpringAnimation { spring: 2; damping: 0.2; modulus: 360 }
                        }
                    }
                }
            }
        }
    }
}
