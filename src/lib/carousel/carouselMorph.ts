import type { Attachment } from 'svelte/attachments'
import { arrange, itemKeyframes, morphTrack, notches } from './carouselStrategy.ts'
import type { CarouselAlignment, CarouselItemElement } from './types.ts'

export interface CarouselMorphOptions {
	variant: 'multi-browse' | 'hero'
	alignment: CarouselAlignment
	vertical: boolean
	items: CarouselItemElement[]
	track: HTMLElement | undefined
	metrics: HTMLElement | undefined
	uid: string
}

export const scrollTimelines =
	typeof CSS !== 'undefined' && CSS.supports('animation-timeline', 'scroll(nearest inline)')

const px = (value: number) => `${Math.round(value * 100) / 100}px`

const lengthOf = (value: string | undefined, fallback: number) => {
	const parsed = Number.parseFloat(value ?? '')
	return Number.isFinite(parsed) ? parsed : fallback
}

export const carouselMorph =
	(options: CarouselMorphOptions): Attachment<HTMLElement> =>
	(scroller) => {
		const { items, vertical, track, metrics, uid } = options
		if (!track || items.length === 0) return

		const name = `np-carousel-morph-${uid}`
		const sheet = new CSSStyleSheet()
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]

		const markers = scroller.querySelector('.np-carousel-snap-points')?.children ?? []
		const itemProbe = metrics?.firstElementChild as HTMLElement | undefined
		const smallProbe = metrics?.lastElementChild as HTMLElement | undefined
		for (const [index, item] of items.entries()) {
			item.style.setProperty('--_morph', `${name}-${index}`)
		}

		let built: string | undefined

		const measure = () => {
			const style = getComputedStyle(track)
			const spacing = lengthOf(vertical ? style.rowGap : style.columnGap, 0)
			const lead = lengthOf(vertical ? style.paddingBlockStart : style.paddingInlineStart, 0)
			const trail = lengthOf(vertical ? style.paddingBlockEnd : style.paddingInlineEnd, 0)
			const port = vertical ? scroller.clientHeight : scroller.clientWidth
			const itemSize = itemProbe ? (vertical ? itemProbe.offsetHeight : itemProbe.offsetWidth) : 0
			const smallStyle = smallProbe && getComputedStyle(smallProbe)
			const smallMin = lengthOf(vertical ? smallStyle?.minBlockSize : smallStyle?.minInlineSize, 0)
			const smallMax = lengthOf(
				vertical ? smallStyle?.maxBlockSize : smallStyle?.maxInlineSize,
				Number.POSITIVE_INFINITY,
			)

			const signature = [port, lead, trail, spacing, itemSize, smallMin, smallMax].join(' ')
			if (signature === built) return
			built = signature

			const arrangement = arrange({
				variant: options.variant,
				alignment: options.alignment,
				itemCount: items.length,
				availableSpace: Math.max(0, port - lead - trail),
				itemSize,
				spacing,
				smallMin,
				smallMax,
			})

			const morph = morphTrack(arrangement)
			scroller.style.setProperty('--_item', px(arrangement.itemSize))
			scroller.style.setProperty('--_track', px(morph.trackSize))

			const snapAt = notches(morph)
			for (let index = 0; index < markers.length; index += 1) {
				const marker = markers[index] as HTMLElement
				const offset = snapAt[index]
				marker.style.setProperty('--_at', offset === undefined ? '' : px(offset))
				marker.toggleAttribute('hidden', offset === undefined)
			}

			if (arrangement.keylines.length === 0 || arrangement.scrollMax <= 0) {
				sheet.replaceSync('')
				return
			}

			const shape = 'var(--np-carousel-item-container-shape, var(--np-shape-corner-extra-large))'
			const offset = (along: number) =>
				vertical ? `inset-block-start:${px(along)}` : `inset-inline-start:${px(along)}`
			const mask = (clip: number) =>
				vertical ? `inset(${px(clip)} 0 round ${shape})` : `inset(0 ${px(clip)} round ${shape})`
			const at = (percent: number) => `${Math.round(percent * 1000) / 1000}%`

			const blocks: string[] = []
			for (const index of items.keys()) {
				const stops = itemKeyframes(morph, index)
					.map(
						({ percent, x, clip }) =>
							`${at(percent)}{${offset(x)};clip-path:${mask(clip)};--np-carousel-clip:${px(clip)}}`,
					)
					.join('')
				blocks.push(`@keyframes ${name}-${index}{${stops}}`)
			}
			sheet.replaceSync(blocks.join(''))
		}

		const axisClass = vertical ? 'np-carousel-morphing-block' : 'np-carousel-morphing-inline'
		scroller.classList.add('np-carousel-morphing', axisClass)
		measure()

		let frame = 0
		const resize = new ResizeObserver(() => {
			if (frame) return
			frame = requestAnimationFrame(() => {
				frame = 0
				measure()
			})
		})
		resize.observe(scroller)
		if (itemProbe) resize.observe(itemProbe)

		return () => {
			if (frame) cancelAnimationFrame(frame)
			resize.disconnect()
			document.adoptedStyleSheets = document.adoptedStyleSheets.filter((one) => one !== sheet)
			scroller.classList.remove('np-carousel-morphing', axisClass)
			for (const property of ['--_item', '--_track']) {
				scroller.style.removeProperty(property)
			}
			for (const item of items) item.style.removeProperty('--_morph')
		}
	}
