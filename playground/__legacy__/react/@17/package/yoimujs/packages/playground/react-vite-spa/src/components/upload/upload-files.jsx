import { useEffect, useMemo, useRef } from 'react'
import { Button, message, Tag, Upload } from 'antd'
import { createClassName } from '@yoimu/web-lib'
import {
	LeftCircleOutlined,
	MinusCircleOutlined,
	RightCircleOutlined,
} from '@ant-design/icons'
import { nearSort } from '@/lib/near-sort'
import { useSafeState } from '@yoimu/react-common-lib'
import { useHttp } from '@/core/hooks/http/use-http'

export const UploadFiles = ({
	className,
	value,
	only = true,
	onlyImage = true,
	max = Infinity,
	breakLine = false,
	sort = false,
	multiple = false,
	onChange,
	placeholder,
	disabled = false,
}) => {
	const http = useHttp()
	const name = useMemo(() => (onlyImage ? '圖片' : '檔案'), [onlyImage])
	const multipleFileListBufferRef = useRef({
		start: 0,
		end: 0,
	})
	const lockUpdateRef = useRef(0)
	/**
	 * @type {[{id: number, name: string}[], (setter: any) => void]}
	 */
	const [fileList, setFileList] = useSafeState(value || [])
	const [uploading, setUpLoading] = useSafeState(false)

	const onRemove = i => () => {
		lockUpdateRef.current++
		const newFileList = fileList
			.slice(0, i)
			.concat(fileList.slice(i + 1, fileList.length))
		setFileList(newFileList)
		onChange?.(newFileList)
	}

	const onSort =
		(i, direction = 'up') =>
		() => {
			const [newFileList, next] = nearSort(i, direction, fileList)
			setFileList(newFileList)
			onChange?.(newFileList)
		}

	const beforeUpload = async (file, _fileList) => {
		if (multiple) {
			multipleFileListBufferRef.current.end = _fileList.length
			if (
				multipleFileListBufferRef.current.start <
				multipleFileListBufferRef.current.end - 1
			) {
				multipleFileListBufferRef.current.start++
				return false
			} else {
				multipleFileListBufferRef.current.start = 0
				multipleFileListBufferRef.current.end = 0
			}
		}

		if (onlyImage) {
			if (multiple) {
				const errorMessages = []
				_fileList.forEach(e => {
					if (e.type.indexOf('image') < 0) {
						errorMessages.push(e.name)
					}
				})
				if (errorMessages.length) {
					message.error(
						`僅能上傳圖片，其中${errorMessages.join(
							'、',
						)}不是${name}，請重新上傳`,
					)
					return false
				}
			} else {
				if (file.type.indexOf('image') < 0) {
					message.error(`${file.name} 不是圖片`)
					return false
				}
			}
		}

		if (multiple && _fileList.length + fileList.length > max) {
			message.error(`超過上傳${name}限制數量，僅能上傳 ${max} 張${name}`)
			return false
		}

		const formData = new FormData()

		if (multiple) {
			_fileList.forEach(e => formData.append('files', e))
			lockUpdateRef.current++
			setUpLoading(true)
			try {
				const { data } = await http.file.upload(formData)
				if (data.success) {
					const newFileList = [...fileList, ...data.data]
					setFileList(newFileList)
					onChange?.(newFileList)
				}
			} catch (err) {}
			setUpLoading(false)
			return false
		}

		formData.append('file', file)
		lockUpdateRef.current++
		setUpLoading(true)
		try {
			const { data } = await http.file.upload(formData)
			if (data.success) {
				let newFileList
				if (only) {
					newFileList = [{ id: data.data.id, name: file.name }]
				} else {
					newFileList = [...fileList, { id: data.data.id, name: file.name }]
				}
				setFileList(newFileList)
				onChange?.(newFileList)
			}
		} catch (err) {}
		setUpLoading(false)
		return false
	}

	useEffect(() => {
		if (lockUpdateRef.current > 0) return lockUpdateRef.current--
		setFileList(value != null ? value : [])
	}, [value])

	return disabled ? (
		<div
			className={createClassName({
				flex: true,
				'flex-col': breakLine,
			})}
		>
			{fileList.length
				? fileList.map(e => (
						<Tag className={'mr-1 w-fit'} key={e.id}>
							{onlyImage ? (
								<a className="text-primary" href={`/${e.id}`} target="_blank">
									{e.name}
								</a>
							) : (
								<span>{e.name}</span>
							)}
						</Tag>
				  ))
				: '-'}
		</div>
	) : (
		<div
			className={createClassName({
				'items-center': true,
				'inline-flex': !breakLine,
				[className]: className != null,
			})}
		>
			<div className="flex items-baseline">
				<Upload beforeUpload={beforeUpload} fileList={null} multiple={multiple}>
					<Button type="primary" disabled={fileList >= max} loading={uploading}>
						上傳{name}
					</Button>
				</Upload>
				{max !== Infinity || placeholder != null ? (
					<div
						className={createClassName({
							'text-danger ml-3': true,
							'mr-2': fileList.length > 0,
						})}
					>
						({placeholder ? placeholder : `可上傳${max}張${name}`})
					</div>
				) : null}
			</div>
			<div
				className={createClassName({
					'flex flex-wrap': true,
					'flex-1': !breakLine,
					'w-full': breakLine,
					'mt-2': breakLine && fileList.length > 0,
				})}
			>
				{fileList.map((e, i) => (
					<Tag
						className={createClassName({
							'flex items-center my-1 mr-1': true,
							'ml-1': !breakLine || (breakLine && i > 0),
						})}
						key={e.id}
					>
						{sort && i > 0 ? (
							<LeftCircleOutlined
								className="ml-0 mr-1"
								onClick={onSort(i, 'up')}
							/>
						) : null}
						{onlyImage ? (
							<a className="text-primary" href={`/${e.id}`} target="_blank">
								{e.name}
							</a>
						) : (
							<span>{e.name}</span>
						)}
						<MinusCircleOutlined
							className="ml-1 text-danger"
							onClick={onRemove(i)}
						/>
						{sort && i < fileList.length - 1 ? (
							<RightCircleOutlined
								className="ml-1"
								onClick={onSort(i, 'down')}
							/>
						) : null}
					</Tag>
				))}
			</div>
		</div>
	)
}
