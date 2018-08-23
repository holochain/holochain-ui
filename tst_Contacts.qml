import QtQuick 2.3
import QtTest 1.0

Contacts {
    id: testContacts

    TestCase {
        name: "ContactComponentTests"
        when: windowShown

        function ttest_when_ncontacts_loads_contacts_full_list_is_shown() {
            compare(48, testContacts.numberOfContacts, "All contacts")
        }
    }
}
