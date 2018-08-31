import { createAction } from 'typesafe-actions'


interface HcMeta {
	isHc: boolean,
	namespace: string
}


/*
Typed action creators. See (https://github.com/piotrwitek/typesafe-actions#createaction) for details

This method allows for defining arbitraty function as action creators that also have their own types!
In the reducer it is possible to switch on the type of the action, no constants required

The arguments to resolve will be assigned to payload and meta respectively.
The type of the action will be automatically set
 */

export const messagesList = createAction('holochat/MESSAGE_LIST', resolve => {
	return () => {
		const meta: HcMeta = { isHc: true, namespace: 'messages' }
		return resolve(undefined, meta);
	}
})


