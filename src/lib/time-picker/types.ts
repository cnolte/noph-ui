import type { ISOTime } from '#lib/date-picker/timeUtils.js'
import type { TextFieldElement } from '#lib/text-field/types.js'
import type { HTMLAttributes, HTMLDialogAttributes, HTMLInputAttributes } from 'svelte/elements'
import type { TimePickerState } from './timePickerState.svelte.js'

export type { ISOTime }

/** Which of the two fields the dial is currently editing. */
export type TimeSelection = 'hour' | 'minute'

/** `auto` follows the viewport: horizontal in a short landscape window, vertical otherwise. */
export type TimePickerLayout = 'vertical' | 'horizontal' | 'auto'

export type TimePickerMode = 'dial' | 'input'

interface TimePickerValueProps {
	/** Minutes since midnight of the earliest selectable time. */
	min?: ISOTime
	/** Minutes since midnight of the latest selectable time. */
	max?: ISOTime
	minuteStep?: number
	hour12?: boolean
	locale?: string
	/** Called with minutes since midnight. Return `false` to take a time out of reach. */
	isTimeEnabled?: (minutes: number) => boolean
}

interface TimePickerLabelProps {
	hourLabel?: string
	minuteLabel?: string
	dayPeriodLabel?: string
	amLabel?: string
	pmLabel?: string
	selectHourLabel?: string
	selectMinuteLabel?: string
	hourOptionLabel?: (value: string, total: number) => string
	minuteOptionLabel?: (value: string, total: number) => string
}

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
	disabled?: boolean
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
	issues?: { message: string }[]
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
		TimePickerLabelProps {
	value?: ISOTime | number | null
	defaultValue?: ISOTime | number | null
	open?: boolean
	element?: HTMLSpanElement
	mode?: TimePickerMode
	modeToggle?: boolean
	name?: string
	form?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	variant?: 'outlined' | 'filled'
	issues?: { message: string }[]
	type?: 'time'
	noAsterisk?: boolean
	autocomplete?: HTMLInputAttributes['autocomplete']
	label?: string
	supportingText?: string
	cancelLabel?: string
	confirmLabel?: string
	openPickerLabel?: string
	dialModeLabel?: string
	inputModeLabel?: string
	invalidTimeMessage?: string
	onchange?: (value: ISOTime | undefined) => void
}

export interface TimePickerPanelProps
	extends
		Omit<HTMLAttributes<HTMLDivElement>, 'onchange'>,
		Omit<TimePickerValueProps, 'min' | 'max'>,
		TimePickerLabelProps {
	/** The live hour, minute and day period. Both pickers hand their own state in. */
	state: TimePickerState
	mode: TimePickerMode
	horizontal?: boolean
	hour12: boolean
	/** Minutes since midnight. */
	min?: number
	max?: number
	headline?: string
	disabled?: boolean
	invalidTimeMessage: string
	issues?: { message: string }[]
	headlineId?: string
	onchange?: () => void
}

export interface TimeSelectorsProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onselect' | 'onchange'
> {
	/** Minutes since midnight. */
	value: number
	selection: TimeSelection
	hour12: boolean
	locale?: string
	disabled?: boolean
	hourLabel: string
	minuteLabel: string
	onselect?: (selection: TimeSelection) => void
}

export interface TimeInputsProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onselect' | 'onchange'
> {
	/** Minutes since midnight. */
	value: number
	hour12: boolean
	locale?: string
	disabled?: boolean
	hourLabel: string
	minuteLabel: string
	invalidTimeMessage: string
	onselect?: (minutes: number) => void
}

export interface PeriodSelectorProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onselect' | 'onchange'
> {
	isPm: boolean
	orientation?: 'vertical' | 'horizontal'
	disabled?: boolean
	amDisabled?: boolean
	pmDisabled?: boolean
	label: string
	amLabel: string
	pmLabel: string
	onselect?: (isPm: boolean) => void
}
