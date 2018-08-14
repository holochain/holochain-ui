import QtQuick 2.3
import QtTest 1.0

Contacts {
    id: testContacts

    TestCase {
        name: "MathTests"
        when: windowShown

        function test_math() {
            compare(2 + 2, 4, "2 + 2 = 4")
        }

        function test_fail() {
            compare(5, testContacts.numberOfContacts, "2 + 2 = 5")
        }
    }
}
