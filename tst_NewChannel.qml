import QtQuick 2.3
import QtTest 1.0

NewChannel {
    id: testNewChannel

    TestCase {
        name: "NewChannelTests"
        when: windowShown

        function test_when_new_channel_loads_contacts_list_is_unfiltered() {
            testNewChannel.contactSearch.text = ""
            waitForRendering(testNewChannel, 100)
            var unfilteredCount = testNewChannel.contactsModel.rowCount()
            compare(unfilteredCount, 48, "Unfiltered")
        }

        function test_when_contact_details_typed_in_to_input_contacts_list_is_filtered() {
            testNewChannel.contactSearch.text = "philip"
            waitForRendering(testNewChannel, 100)
            var filteredCount = testNewChannel.contactsModel.rowCount()
            compare(filteredCount, 1, "Returns only Philip Beadle")
        }

        function test_clicking_on_a_contact_adds_them_to_the_new_channel() {
            testNewChannel.contactSearch.text = "philip"
            waitForRendering(testNewChannel, 100)
            var filteredCount = testNewChannel.contactsModel.rowCount()
            compare(filteredCount, 1, "Returns only Philip Beadle")
        }
    }
}
