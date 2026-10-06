import type { ISOTime } from '#lib/date-picker/timeUtils.js'
import type { Issue } from '#lib/shared/types.js'
import type { HTMLAttributes } from 'svelte/elements'
import type { TimePickerState } from './timePickerState.svelte.js'
import type { TimePickerMode, TimeSelection } from './types.ts'

export interface TimePickerValueProps {
	/** The earliest selectable time, as `HH:mm`. */
	min?: ISOTime
	/** The latest selectable time, as `HH:mm`. */
	max?: ISOTime
	minuteStep?: number
	hour12?: boolean
	locale?: string
	/** Called with minutes since midnight. Return `false` to take a time out of reach. */
	isTimeEnabled?: (minutes: number) => boolean
}

export interface TimePickerLabelProps {
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
	issues?: Issue[]
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
