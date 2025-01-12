import { useSafeState } from './use-safe-state'
import produce from 'immer'

export const useEditorList = (initialValueFunc, init = true) => {
	const [list, setList] = useSafeState(() => (init ? [initialValueFunc()] : []))

	const create = () =>
		setList(
			produce(d => {
				d.push(initialValueFunc())
			}),
		)

	const editByIndex = (index, value) => {
		if (index < 0 || index > list.length - 1) return

		setList(
			produce(d => {
				d[index] = value
			}),
		)
	}

	const editKeyValueByIndex = (index, key, value) => {
		if (index < 0 || index > list.length - 1) return

		setList(
			produce(d => {
				d[index][key] = value
			}),
		)
	}

	const removeByIndex = (index, removeNum = 1) => {
		if (index < 0 || index > list.length - 1) return

		setList(
			produce(d => {
				d.splice(index, removeNum)
			}),
		)
	}

	const removeByKeyValue = (key, value, removeNum = 1) => {
		const removeIndex = list.findIndex(e => e[key] === value)
		if (removeIndex === -1) return

		setList(
			produce(d => {
				d.splice(removeIndex, removeNum)
			}),
		)
	}

	return [
		list,
		setList,
		{
			create,
			editByIndex,
			editKeyValueByIndex,
			removeByIndex,
			removeByKeyValue,
		},
	]
}
