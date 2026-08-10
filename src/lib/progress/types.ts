export interface CircularProgressProps {
	value?: number
	max?: number
	indeterminate?: boolean
	fourColor?: boolean
	track?: boolean
	wavy?: boolean
	'aria-label'?: string | undefined | null
}

export interface LinearProgressProps extends CircularProgressProps {
	buffer?: number
}
