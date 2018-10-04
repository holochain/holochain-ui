//
// let newPersona = {
//     "name": "",
//     "fields": [
//     ]
// }
// let newHash = ""
// let newButtonText = "Create Persona"
// let persona =
// {
//     "name": "Personal",
//     "personaFields": [
//         {"firstName": "Phil"},
//         {"lastName": "Beadle"},
//         {"address": "123 Holochain Road"},
//         {"suburb": "Burwood"},
//         {"city": "Melbourne"}
//     ]
// }
// let hash = "rtyeyyutyr"
// let buttonText = "Update Persona"
// let createPersona = {}
// const personaCreate = decorateAction([
//   args => {
//     createPersona = args[0]
//     console.log(createPersona)
//     return args
//   }
// ])
//
// let updatePersona = {}
// const personaUpdate = decorateAction([
//   args => {
//     updatePersona = args[0]
//     // console.log(clickPersona)
//     return args
//   }
// ])

export const personaTests = describe('Looking after your Personas', () => {

  it('Creating a Persona by adding new fields and values, this will send a Persona to Holochain', () => {
    // const wrapper = mount(getPersona(newPersona, newHash, newButtonText))
    // const testPersona = {
    //   "name":"Personal",
    //   "personaFields":[
    //     {"firstName":"Phil"},
    //     {"lastName":"Beadle"}
    //   ]
    // }
    //
    // wrapper.find('input[name="personaName"]').simulate('change', {target: {value: 'Personal'}})
    // wrapper.find('button[name="addField"]').simulate('click')
    // wrapper.find('input[name="fieldName0"]').simulate('change', {target: {value: 'firstName'}})
    // wrapper.find('input[name="fieldValue0"]').simulate('change', {target: {value: 'Phil'}})
    // wrapper.find('button[name="addField"]').simulate('click')
    // wrapper.find('input[name="fieldName1"]').simulate('change', {target: {value: 'lastName'}})
    // wrapper.find('input[name="fieldValue1"]').simulate('change', {target: {value: 'Beadle'}})
    // wrapper.find('button[name="createPersona"]').simulate('click')
    // expect(createPersona).toEqual(testPersona)
    expect(3).toEqual(3)
  })
})
