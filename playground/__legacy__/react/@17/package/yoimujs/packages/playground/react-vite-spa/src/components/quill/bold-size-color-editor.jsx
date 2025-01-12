import ReactQuill from 'react-quill'
import { useMemo } from 'react'
import { createClassName } from '@yoimu/web-lib'

export const QuillBoldSizeColorEditor = ({
	toolbarId = 'toolbar',
	placeholder,
	value,
	readOnly = false,
	...quillProps
}) => {
	const className = useMemo(
		() =>
			createClassName({
				'react-quill--min-h-middle': !readOnly,
				'react-quill--readOnly': readOnly,
			}),
		[readOnly],
	)

	return (
		<>
			{readOnly ? null : (
				<div id={toolbarId} className="border-b-0">
					<select className="ql-size" />
					<select className="ql-color" />
					<button className="ql-bold" />
				</div>
			)}
			<ReactQuill
				{...quillProps}
				className={className}
				value={value || ''}
				placeholder={placeholder}
				modules={{
					toolbar: readOnly
						? false
						: {
								container: `#${toolbarId}`,
						  },
				}}
				readOnly={readOnly}
			/>
		</>
	)
}
