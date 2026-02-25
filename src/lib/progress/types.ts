export interface CircularProgressProps {
	value?: number
	max?: number
	indeterminate?: boolean
	fourColor?: boolean
	'aria-label'?: string | undefined | null
}

export interface LinearProgressProps extends CircularProgressProps {
	buffer?: number
}
