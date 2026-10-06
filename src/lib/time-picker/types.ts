import type { Issue } from '#lib/shared/types.js'
import type { ISOTime } from '#lib/date-picker/timeUtils.js'
import type { DockedFieldProps } from '#lib/internal/fieldTypes.js'
import type { TextFieldElement } from '#lib/text-field/types.js'
import type { TimePickerLabelProps, TimePickerValueProps } from './internalTypes.ts'
import type { HTMLAttributes, HTMLDialogAttributes } from 'svelte/elements'

export type { ISOTime }

/** Which of the two fields the dial is currently editing. */
export type TimeSelection = 'hour' | 'minute'

/** `auto` follows the viewport: horizontal in a short landscape window, vertical otherwise. */
export type TimePickerLayout = 'vertical' | 'horizontal' | 'auto'

export type TimePickerMode = 'dial' | 'input'

export interface ClockDialProps
	extends
		Omit<HTMLAttributes<HTMLDivElement>, 'onselect' | 'onchange'>,
		Pick<TimePickerValueProps, 'hour12' | 'locale' | 'minuteStep' | 'isTimeEnabled'>,
		Pick<
			TimePickerLabelProps,
			'selectHourLabel' | 'selectMinuteLabel' | 'hourOptionLabel' | 'minuteOptionLabel'
		> {
	/** Minutes since midnight. */
	value: number
	selection?: TimeSelection
	/** Minutes since midnight, unlike the pickers which take an `ISOTime`. */
	min?: number
	max?: number
	disabled?: boolean | null
	element?: HTMLDivElement
	onselect?: (minutes: number) => void
	/** The pointer was lifted or a number was clicked, so the caller may advance hour to minute. */
	onselectionend?: (source: 'pointer' | 'keyboard') => void
}

export interface TimePickerDialogProps
	extends
		Omit<HTMLDialogAttributes, 'open' | 'onchange'>,
		TimePickerValueProps,
		TimePickerLabelProps {
	value?: ISOTime | number | null
	open?: boolean
	element?: HTMLDialogElement
	layout?: TimePickerLayout
	mode?: TimePickerMode
	modeToggle?: boolean
	title?: string
	inputTitle?: string
	name?: string
	form?: string
	issues?: Issue[]
	cancelLabel?: string
	confirmLabel?: string
	dialModeLabel?: string
	inputModeLabel?: string
	invalidTimeMessage?: string
	onchange?: (value: ISOTime | undefined) => void
	onconfirm?: (value: ISOTime | undefined) => void
	oncancel?: () => void
}

export interface DockedTimePickerProps
	extends
		Omit<HTMLAttributes<TextFieldElement>, 'onchange'>,
		TimePickerValueProps,
		DockedFieldProps,
		TimePickerLabelProps {
	value?: ISOTime | number | null
	defaultValue?: ISOTime | number | null
	mode?: TimePickerMode
	modeToggle?: boolean
	type?: 'time'
	cancelLabel?: string
	confirmLabel?: string
	openPickerLabel?: string
	dialModeLabel?: string
	inputModeLabel?: string
	invalidTimeMessage?: string
	onchange?: (value: ISOTime | undefined) => void
}
