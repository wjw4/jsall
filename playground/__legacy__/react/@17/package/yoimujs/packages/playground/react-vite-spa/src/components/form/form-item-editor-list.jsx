import { Table } from 'antd'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useEditorList } from '@yoimu/react-common-lib'
import { generateId } from '@yoimu/common-lib'

export const FormItemEditorList = forwardRef(
	(
		{
			children,
			rowKey = 'id',
			size,
			loading = false,
			columns: propColumns,
			value,
			onChange: onPropChange,
		},
		ref,
	) => {
		const columns = propColumns || []
		const [
			list,
			setList,
			{ create, editByIndex, editKeyValueByIndex, removeByIndex },
		] = useEditorList(
			() =>
				columns.reduce(
					(p, e) => ((p[e.dataIndex] = e.__initialValue ?? null), p),
					{ [rowKey]: generateId() },
				),
			false,
		)

		const transformEditorListFunc =
			func =>
			(...args) => {
				func(...args)
			}

		useImperativeHandle(ref, () => ({
			list,
			create: transformEditorListFunc(create),
			setList: transformEditorListFunc(setList),
			editByIndex: transformEditorListFunc(editByIndex),
			editKeyValueByIndex: transformEditorListFunc(editKeyValueByIndex),
			removeByIndex: transformEditorListFunc(removeByIndex),
		}))

		useEffect(() => {
			if (Array.isArray(value) && value !== list) {
				setList(list => {
					if (value.length === 0 && list.length === 0) return list
					return value
				})
			}
		}, [value])

		useEffect(() => {
			onPropChange?.(list)
		}, [list])

		return list?.length ? (
			<>
				<Table
					dataSource={list}
					columns={columns}
					rowKey={rowKey}
					size={size}
					loading={loading}
					pagination={false}
				/>
				{children?.(list)}
			</>
		) : null
	},
)
