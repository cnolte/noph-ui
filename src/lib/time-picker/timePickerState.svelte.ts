import {
	clampMinutes,
	isMinuteWithin,
	MINUTES_IN_HOUR,
	snapToStep,
} from '#lib/date-picker/timeUtils.js'
import type { TimeSelection } from './types.ts'

export interface TimePickerStateOptions {
	minuteStep: () => number
	min: () => number | undefined
	max: () => number | undefined
	isTimeEnabled: () => ((minutes: number) => boolean) | undefined
}

/**
 * The hour, minute and day period of a picker, with the step and the bounds applied on every write.
 * The dialog and the docked picker share it so the rules live in one place.
 */
export const timePickerState = (options: TimePickerStateOptions) => {
	let minutes = $state(0)
	let selection = $state<TimeSelection>('hour')

	const step = () => Math.max(1, Math.trunc(options.minuteStep()) || 1)

	const settle = (next: number) =>
		clampMinutes(snapToStep(next, step()), options.min(), options.max())

	const usable = (next: number) =>
		isMinuteWithin(next, options.min(), options.max()) && (options.isTimeEnabled()?.(next) ?? true)

	/** Whether any step-aligned minute of an hour can be reached, so the dial can grey it out. */
	const hourReachable = (hour: number) => {
		for (let minute = 0; minute < MINUTES_IN_HOUR; minute += step()) {
			if (usable(hour * MINUTES_IN_HOUR + minute)) return true
		}
		return false
	}

	return {
		get minutes() {
			return minutes
		},
		get hour() {
			return Math.floor(minutes / MINUTES_IN_HOUR)
		},
		get minute() {
			return minutes % MINUTES_IN_HOUR
		},
		get isPm() {
			return minutes >= 12 * MINUTES_IN_HOUR
		},
		get selection() {
			return selection
		},
		set selection(next: TimeSelection) {
			selection = next
		},
		get usable() {
			return usable(minutes)
		},
		hourReachable,
		/** Puts a value in without snapping it, so an exact incoming value survives a round trip. */
		reset: (next: number) => {
			minutes = clampMinutes(next, options.min(), options.max())
			selection = 'hour'
		},
		set: (next: number) => {
			minutes = settle(next)
		},
		setHour: (hour: number) => {
			minutes = settle(hour * MINUTES_IN_HOUR + (minutes % MINUTES_IN_HOUR))
		},
		setMinute: (minute: number) => {
			minutes = settle(Math.floor(minutes / MINUTES_IN_HOUR) * MINUTES_IN_HOUR + minute)
		},
		setPm: (isPm: boolean) => {
			const hour = Math.floor(minutes / MINUTES_IN_HOUR)
			const next = (hour % 12) + (isPm ? 12 : 0)
			minutes = settle(next * MINUTES_IN_HOUR + (minutes % MINUTES_IN_HOUR))
		},
	}
}

export type TimePickerState = ReturnType<typeof timePickerState>
