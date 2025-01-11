export interface CircularProgressProps {
	value?: number
	max?: number
	indeterminate?: boolean
	fourColor?: boolean
	'aria-label'?: string | undefined | null
	element?: HTMLDivElement
}

export interface LinearProgressProps extends CircularProgressProps {
	buffer?: number
}
