import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.2

Page {
    id: bookedItems
    title: "Booked"
    anchors.fill: parent

    RecursiveJsonModel {
        id: arcsModel
        dataUrl: "data/presence_philip_micah.json"
        onIsLoaded: {
            console.log("data/presence_philip_micah.json" + model.get(0).name)
        }
    }

    Column {
        Repeater {
            model: arcsModel.model
            Text {
                text: name
            }
            Repeater {
                model: booked
                Text { text: bookedBegin }
            }
        }
    }
}
