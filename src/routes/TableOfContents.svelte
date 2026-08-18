<script lang="ts">
	import type { TocSection } from './tocSections.ts'

	let { sections }: { sections: TocSection[] } = $props()

	let activeId = $state<string | undefined>(undefined)

	const trackReading = () => {
		if (CSS.supports('selector(:target-current)')) return

		const headings = sections
			.map(({ id }) => document.getElementById(id))
			.filter((heading): heading is HTMLElement => heading !== null)
		const offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 5.5
		let frame = 0

		const update = () => {
			frame = 0
			const scrolled = window.scrollY
			const atBottom =
				scrolled > 0 && scrolled + window.innerHeight >= document.documentElement.scrollHeight - 2
			if (atBottom) {
				activeId = headings.at(-1)?.id
				return
			}
			const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= offset + 2)
			activeId = (passed.at(-1) ?? headings[0])?.id
		}

		const schedule = () => {
			frame ||= requestAnimationFrame(update)
		}

		update()
		window.addEventListener('scroll', schedule, { passive: true })
		window.addEventListener('resize', schedule, { passive: true })
		return () => {
			window.removeEventListener('scroll', schedule)
			window.removeEventListener('resize', schedule)
			if (frame) cancelAnimationFrame(frame)
		}
	}
</script>

{#if sections.length > 0}
	<nav class="toc scroll-wrapper" aria-labelledby="toc-title" {@attach trackReading}>
		<p id="toc-title">On this page</p>
		<ul>
			{#each sections as section (section.id)}
				<li class={[section.level === 3 && 'nested']}>
					<a href="#{section.id}" aria-current={section.id === activeId ? 'location' : undefined}>
						{section.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	#toc-title {
		margin: 0 0 0.5rem 0.75rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--np-color-on-surface);
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li.nested a {
		padding-inline-start: 1.5rem;
		font-size: 0.8125rem;
	}

	a {
		display: block;
		padding: 0.375rem 0.5rem 0.375rem 0.75rem;
		border-inline-start: 2px solid transparent;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--np-color-on-surface-variant);
	}

	a:hover {
		color: var(--np-color-on-surface);
		background-color: color-mix(in srgb, var(--np-color-on-surface) 8%, transparent);
	}

	a:focus-visible {
		outline: 3px solid var(--np-color-secondary);
		outline-offset: -3px;
	}

	a[aria-current] {
		color: var(--np-color-primary);
		border-inline-start-color: var(--np-color-primary);
		font-weight: 500;
	}

	a:target-current {
		color: var(--np-color-primary);
		border-inline-start-color: var(--np-color-primary);
		font-weight: 500;
	}
</style>
