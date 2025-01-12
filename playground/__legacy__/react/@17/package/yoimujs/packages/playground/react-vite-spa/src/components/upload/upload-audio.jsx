import { Button, message, Upload } from 'antd'
import { createClassName } from '@yoimu/web-lib'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import {
	PauseCircleOutlined,
	PlayCircleOutlined,
	ReloadOutlined,
} from '@ant-design/icons'
import { useUploadFile } from '@/hooks/use-upload-file'
import { useSafeState } from '@yoimu/react-common-lib'

export const UploadAudio = ({
	className: propClassName,
	value: propValue,
	onChange: onPropChange,
}) => {
	const className = useMemo(
		() =>
			createClassName({
				'flex items-center': true,
				[propClassName]: propClassName != null,
			}),
		[propClassName],
	)
	const [value, setValue] = useSafeState(null)
	const { upload } = useUploadFile()
	const audioRef = useRef(null)
	const [isAudioPlaying, setIsAudioPlaying] = useSafeState(false)

	const onBeforeUpload = async file => {
		if (!/(wav)|(mpeg)/.test(file.type)) {
			message.error(`${file.name} 不是 wav/mp3 檔`)
			return
		}

		const { success, id, name } = await upload(file)
		if (success) {
			setIsAudioPlaying(false)
			setValue({ id, name })
			onPropChange?.({ id, name }, file)
		}
		return false
	}

	const onPlay = () => {
		const audio = audioRef.current
		audio.play()
	}

	const onRestart = () => {
		const audio = audioRef.current
		audio.pause()
		audio.currentTime = 0
		audio.play()
	}

	const onPause = () => {
		const audio = audioRef.current
		setIsAudioPlaying(false)
		audio.pause()
	}

	const onPlayAudio = useCallback(() => {
		setIsAudioPlaying(true)
	}, [])

	const onEndAudio = useCallback(() => {
		audioRef.current.currentTime = 0
		setIsAudioPlaying(false)
	}, [])

	useEffect(() => {
		setIsAudioPlaying(false)
		if (propValue == null) {
			setValue([])
		} else {
			setValue(propValue)
		}
	}, [propValue])

	useEffect(() => {
		const audio = audioRef.current
		if (audio != null) {
			audio.addEventListener('play', onPlayAudio)
			audio.addEventListener('ended', onEndAudio)
			return () => {
				audio.removeEventListener('played', onPlayAudio)
				audio.removeEventListener('ended', onEndAudio)
			}
		}
	}, [value?.id])

	return (
		<div className={className}>
			<Upload beforeUpload={onBeforeUpload} itemRender={null} fileList={null}>
				<Button type={'primary'}>上傳</Button>
			</Upload>
			{value?.id ? (
				<>
					{isAudioPlaying ? (
						<div className="flex items-center ml-2">
							<PauseCircleOutlined
								className={'text-primary mr-2'}
								onClick={onPause}
							/>
							<ReloadOutlined className="text-primary" onClick={onRestart} />
						</div>
					) : (
						<PlayCircleOutlined
							className="text-primary ml-2"
							onClick={onPlay}
						/>
					)}
					<div className={'ml-2'}>{value.name}</div>
					<audio
						ref={audioRef}
						className={'hidden'}
						controls
						src={`/file/get/${value.id}`}
					/>
				</>
			) : null}
		</div>
	)
}
