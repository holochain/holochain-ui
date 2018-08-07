import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.2
import QtTest 1.2


Page {
    id: contacts
    title: "Contacts"

    JsonModel {
        id: contactsModel
        dataUrl: "data/contacts.json"
        onIsLoaded: {
            console.log("Loaded Contacts")
        }
    }

    ListView {
        id: contactsListView
        anchors.fill: parent
        topMargin: 48
        leftMargin: 48
        bottomMargin: 48
        rightMargin: 48
        spacing: 20
        model: contactsModel.model
        delegate: ContactDelegate{
            stackView: contacts.StackView.view
        }
    }
}
