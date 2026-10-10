/** The computed color a theme token resolves to, for comparing against computed styles. */
export const resolve = (token: string) => {
	const probe = document.createElement('div')
	probe.style.color = `var(${token})`
	document.body.append(probe)
	const value = getComputedStyle(probe).color
	probe.remove()
	return value
}

const rippleSurface = () => document.querySelector('.np-ripple-surface')!
export const rippleHoverColor = () => getComputedStyle(rippleSurface(), '::before').backgroundColor
export const ripplePressedColor = () => getComputedStyle(rippleSurface(), '::after').backgroundImage
