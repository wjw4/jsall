import ReactQuill, { Quill, ReactQuillProps } from 'react-quill'
import { createClassName } from '@yoimu/web-lib'
import { Upload } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { useCallback, useRef } from 'react'
import { useHttp } from '@/core/hooks/http/use-http'

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
	<svg viewBox="0 0 18 18">
		<polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
		<path
			className="ql-stroke"
			d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
		/>
	</svg>
)

// Redo button icon component for Quill editor
const CustomRedo = () => (
	<svg viewBox="0 0 18 18">
		<polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
		<path
			className="ql-stroke"
			d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
		/>
	</svg>
)

// Undo and redo functions for Custom Toolbar
function undoChange() {
	this.quill.history.undo()
}
function redoChange() {
	this.quill.history.redo()
}

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size')
Size.whitelist = ['extra-small', 'small', 'medium', 'large']
Quill.register(Size, true)

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font')
Font.whitelist = [
	'arial',
	'comic-sans',
	'courier-new',
	'georgia',
	'helvetica',
	'lucida',
]
Quill.register(Font, true)

// Modules object for setting up the Quill editor
export const quillAllToolbarModules = toolbarId => ({
	toolbar: {
		container: '#' + toolbarId,
		handlers: {
			undo: undoChange,
			redo: redoChange,
		},
	},
	history: {
		delay: 500,
		maxStack: 100,
		userOnly: true,
	},
})

// Formats objects for setting up the Quill editor
export const quillAllFormats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'align',
	'strike',
	'script',
	'blockquote',
	'background',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	'color',
	'code-block',
]

// Quill Toolbar component
export const QuillAllOptionsToolbar = ({ id, editorRef, rangeRef }) => {
	const http = useHttp()

	const beforeUpload = async file => {
		const formData = new FormData()
		formData.append('file', file)
		const { data } = await http.file.upload(formData)
		if (data.success) {
			const current = editorRef.current
			if (current) {
				const quillEditor = current.getEditor()
				const imageId = data.data.id
				const imageLink = urlHelper(imageId)
				quillEditor.insertEmbed(
					rangeRef.current.index,
					'image',
					imageLink,
					'api',
				)
				quillEditor.setSelection(rangeRef.current.index)
			}
		}
		return false
	}

	return (
		<div id={id} className="border-b-0">
			<span className="ql-formats">
				<select className="ql-font" defaultValue="arial">
					<option value="arial">Arial</option>
					<option value="comic-sans">Comic Sans</option>
					<option value="courier-new">Courier New</option>
					<option value="georgia">Georgia</option>
					<option value="helvetica">Helvetica</option>
					<option value="lucida">Lucida</option>
				</select>
				<select className="ql-size" defaultValue="medium">
					<option value="extra-small">Size 1</option>
					<option value="small">Size 2</option>
					<option value="medium">Size 3</option>
					<option value="large">Size 4</option>
				</select>
				<select className="ql-header" defaultValue="3">
					<option value="1">Heading</option>
					<option value="2">Subheading</option>
					<option value="3">Normal</option>
				</select>
			</span>
			<span className="ql-formats">
				<button className="ql-bold" />
				<button className="ql-italic" />
				<button className="ql-underline" />
				<button className="ql-strike" />
			</span>
			<span className="ql-formats">
				<button className="ql-list" value="ordered" />
				<button className="ql-list" value="bullet" />
				<button className="ql-indent" value="-1" />
				<button className="ql-indent" value="+1" />
			</span>
			<span className="ql-formats">
				<button className="ql-script" value="super" />
				<button className="ql-script" value="sub" />
				<button className="ql-blockquote" />
				<button className="ql-direction" />
			</span>
			<span className="ql-formats">
				<select className="ql-align" />
				<select className="ql-color" />
				<select className="ql-background" />
			</span>
			<span className="ql-formats inline-flex items-center">
				<button className="ql-link" />
				<Upload
					className={'flex p-1'}
					fileList={null}
					beforeUpload={beforeUpload}
				>
					<PictureOutlined
						className={'flex items-center justify-center hover:text-primary'}
					/>
				</Upload>
				<button className="ql-video" />
			</span>
			<span className="ql-formats">
				<button className="ql-formula" />
				<button className="ql-code-block" />
				<button className="ql-clean" />
			</span>
			<span className="ql-formats">
				<button className="ql-undo">
					<CustomUndo />
				</button>
				<button className="ql-redo">
					<CustomRedo />
				</button>
			</span>
		</div>
	)
}

/**
 * @param {string | undefined} [uuid = 'toolbar'] 如果一個頁面有多個該組件，必須有唯一 id(必須符合 html id 規範)
 * @param {string | undefined} className
 * @param {ReactQuillProps} quillProps
 * @return {JSX.Element}
 * @constructor
 */
export const QuillAllOptionsEditor = ({
	toolbarId = 'toolbar',
	className,
	value,
	onChangeSelection: ponChangeSelection,
	...quillProps
}) => {
	const editorRef = useRef(null)
	const rangeRef = useRef({ index: 0, length: 0 })
	const onChangeSelection = useCallback((range, oldRange, source) => {
		if (range != null && range.index != null) {
			rangeRef.current.index = range.index
			rangeRef.current.length = range.length
		}
		ponChangeSelection?.(range, oldRange, source)
	}, [])

	return (
		<>
			<QuillAllOptionsToolbar
				id={toolbarId}
				editorRef={editorRef}
				rangeRef={rangeRef}
			/>
			<ReactQuill
				ref={editorRef}
				className={createClassName({
					[className]: className != null,
				})}
				modules={quillAllToolbarModules(toolbarId)}
				formats={quillAllFormats}
				value={value || ''}
				onChangeSelection={onChangeSelection}
				{...quillProps}
			/>
		</>
	)
}
