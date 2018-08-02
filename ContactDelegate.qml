import QtQuick 2.0

Rectangle {
  id: delegateItem
  width: parent.width; height: 100
  color: "transparent"
  MouseArea {
      anchors.fill: parent
      onClicked: contacts.StackView.view.push("qrc:/Chat.qml", { inConversationWith: name })
  }

  RoundedAvatar {
    id: imageItem
    width: 100; height: 100
    source: "qrc:/images/" + avatar
  }

  Text {
    id: itexItem
    anchors.left: imageItem.right
    anchors.leftMargin: 20
    anchors.verticalCenter: parent.verticalCenter
    font.pixelSize: 20
    text: name
  }
}
