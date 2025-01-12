import zh_TW from '@/core/i18n/zh_TW.json'
import zh_CN from '@/core/i18n/zh_CN.json'
import { ELocale } from '@/enums/e-locale'
import { createI18n } from '@yoimu/react-common-lib'

export const {
	t,
	Provider: I18nProvider,
	inject: useI18n,
} = createI18n({
	locale: ELocale.zh_TW,
	localStorageKey: `${import.meta.env.VITE_PROJECT_NAME}_locale`,
	messages: {
		[ELocale.zh_TW]: zh_TW,
		[ELocale.zh_CN]: zh_CN,
	},
})
