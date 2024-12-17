interface ProgressProps {
	value?: number
	max?: number
	indeterminate?: boolean
	fourColor?: boolean
	'aria-label'?: string | undefined | null
	element?: HTMLDivElement
}

export interface LinearProgressProps extends ProgressProps {
	buffer?: number
}

export type CircularProgressProps = ProgressProps
