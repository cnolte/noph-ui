<script lang="ts">
	import type { Snippet } from 'svelte'
	let {
		href,
		target,
		disabled = false,
		size = 'small',
		variant = 'outlined',
		color = 'primary',
		type,
		form,
		formaction,
		popovertarget,
		popovertargetaction = 'toggle',
		onclick,
		children,
		start,
		end,
		style,
		fullWidth = false,
		...attributes
	}: {
		href?: string
		target?: string
		disabled?: boolean
		size?: 'small' | 'medium' | 'large'
		variant?: 'text' | 'contained' | 'outlined'
		color?: 'primary' | 'error' | 'success'
		type?: 'reset' | 'submit' | 'button' | null
		form?: string | null
		formaction?: string | null
		popovertarget?: string
		popovertargetaction?: 'toggle' | 'show' | 'hide' | null
		onclick?: (event: MouseEvent) => void
		children: Snippet
		start?: Snippet
		end?: Snippet
		style?: string | null | undefined
		fullWidth?: boolean
	} = $props()
</script>

{#snippet content()}
	{#if start}
		{@render start()}
	{/if}
	<div class="flex-1">
		{@render children()}
	</div>
	{#if end}
		{@render end()}
	{/if}
{/snippet}

<div
	class="relative flex overflow-hidden rounded-full border border-solid {disabled
		? `${variant}-disabled`
		: `cursor-pointer ${variant} ${variant}-${color}`} {size}"
	style={fullWidth ? '' : 'width: fit-content;'}
>
	{#if disabled}
		<div class="flex h-10 flex-1 items-center gap-1 fill-current px-5 text-start">
			{@render content()}
		</div>
	{:else if href}
		<a
			{onclick}
			{style}
			class="bt-hover flex h-10 flex-1 items-center gap-1 fill-current px-5 text-start"
			{href}
			{target}
		>
			{@render content()}
		</a>
	{:else}
		<button
			{...attributes}
			{popovertarget}
			{popovertargetaction}
			{type}
			{form}
			{formaction}
			{onclick}
			{style}
			class="bt-hover flex h-10 flex-1 items-center gap-1 fill-current px-5 text-start"
		>
			{@render content()}
		</button>
	{/if}
</div>

<style>
	@media (hover: hover) {
		.bt-hover:hover {
			background-color: color-mix(in srgb, var(--np-ripple-hover-color) 10%, transparent);
		}
	}
	.text {
		border-color: transparent;
	}
	.text-primary {
		--np-ripple-hover-color: var(--np-color-primary, rgb(5, 125, 187));
		--np-ripple-pressed-color: var(--np-color-primary, rgb(5, 125, 187));
		color: var(--np-color-primary, rgb(5, 125, 187));
	}
	.text-success {
		--np-ripple-hover-color: var(--np-color-success, rgb(2, 183, 139));
		--np-ripple-pressed-color: var(--np-color-success, rgb(2, 183, 139));
		color: var(--np-color-success, rgb(2, 183, 139));
	}
	.text-error {
		--np-ripple-hover-color: var(--np-color-error, rgb(228, 56, 52));
		--np-ripple-pressed-color: var(--np-color-error, rgb(228, 56, 52));
		color: var(--np-color-error, rgb(228, 56, 52));
	}
	.text-disabled {
		border-color: transparent;
		color: var(--np-color-disabled);
	}
	.contained {
		--np-ripple-hover-color: var(--np-background-color, rgb(255, 255, 255));
		--np-ripple-pressed-color: var(--np-background-color, rgb(255, 255, 255));
		transition-property: box-shadow;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		border-color: transparent;
		color: var(--np-background-color, rgb(255, 255, 255));
	}
	.contained-primary {
		background-color: var(--np-color-primary, rgb(5, 125, 187));
	}
	.contained-success {
		background-color: var(--np-color-success, rgb(2, 183, 139));
	}
	.contained-error {
		background-color: var(--np-color-error, rgb(228, 56, 52));
	}
	.contained:hover {
		box-shadow: var(
			--np-elevation-1,
			0 1px 2px 0 rgb(0 0 0 / 0.6),
			0 0px 0px -1px rgb(0 0 0 / 0.6)
		);
	}
	.contained:active {
		box-shadow: none;
	}
	.contained-disabled {
		border-color: transparent;
		color: var(--np-background-color, rgb(255, 255, 255));
		background-color: var(--np-color-disabled);
	}
	.outlined-primary {
		--np-ripple-hover-color: var(--np-color-primary, rgb(5, 125, 187));
		--np-ripple-pressed-color: var(--np-color-primary, rgb(5, 125, 187));
		color: var(--np-color-primary, rgb(5, 125, 187));
		border-color: var(--np-color-primary, rgb(5, 125, 187));
	}
	.outlined-success {
		--np-ripple-hover-color: var(--np-color-success, rgb(2, 183, 139));
		--np-ripple-pressed-color: var(--np-color-success, rgb(2, 183, 139));
		color: var(--np-color-success, rgb(2, 183, 139));
		border-color: var(--np-color-success, rgb(2, 183, 139));
	}
	.outlined-error {
		--np-ripple-hover-color: var(--np-color-error, rgb(228, 56, 52));
		--np-ripple-pressed-color: var(--np-color-error, rgb(228, 56, 52));
		color: var(--np-color-error, rgb(228, 56, 52));
		border-color: var(--np-color-error, rgb(228, 56, 52));
	}
	.outlined-disabled {
		color: var(--np-color-disabled);
		border-color: var(--np-color-disabled);
	}
	.small {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	.medium {
		font-size: 1rem;
		line-height: 1.5rem;
	}
	.large {
		font-size: 1.125rem;
		line-height: 1.75rem;
	}
</style>
