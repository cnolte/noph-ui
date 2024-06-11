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
	class="button-container {disabled
		? `${variant}-disabled`
		: `enabled ${variant} ${variant}-${color}`} {size}"
	style={fullWidth ? '' : 'width: fit-content;'}
>
	{#if disabled}
		<div class="button gap-1">
			{@render content()}
		</div>
	{:else if href}
		<a {onclick} {style} class="bt-hover button gap-1" {href} {target}>
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
			class="bt-hover button gap-1"
		>
			{@render content()}
		</button>
	{/if}
</div>

<style>
	@media (hover: hover) {
		.bt-hover:hover {
			background-color: color-mix(in srgb, var(--cn-ripple-hover-color) 10%, transparent);
		}
	}
	.text {
		border-color: transparent;
	}
	.text {
		border-color: transparent;
	}
	.text-primary {
		--cn-ripple-hover-color: var(--cn-color-primary, rgb(5, 125, 187));
		--cn-ripple-pressed-color: var(--cn-color-primary, rgb(5, 125, 187));
		color: var(--cn-color-primary, rgb(5, 125, 187));
	}
	.text-success {
		--cn-ripple-hover-color: var(--cn-color-success, rgb(2, 183, 139));
		--cn-ripple-pressed-color: var(--cn-color-success, rgb(2, 183, 139));
		color: var(--cn-color-success, rgb(2, 183, 139));
	}
	.text-error {
		--cn-ripple-hover-color: var(--cn-color-error, rgb(228, 56, 52));
		--cn-ripple-pressed-color: var(--cn-color-error, rgb(228, 56, 52));
		color: var(--cn-color-error, rgb(228, 56, 52));
	}
	.text-disabled {
		border-color: transparent;
		color: var(--cn-color-disabled);
	}
	.contained {
		--cn-ripple-hover-color: var(--cn-background-color, rgb(255, 255, 255));
		--cn-ripple-pressed-color: var(--cn-background-color, rgb(255, 255, 255));
		transition-property: box-shadow;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
		border-color: transparent;
		color: var(--cn-background-color, rgb(255, 255, 255));
	}
	.contained-primary {
		background-color: var(--cn-color-primary, rgb(5, 125, 187));
	}
	.contained-success {
		background-color: var(--cn-color-success, rgb(2, 183, 139));
	}
	.contained-error {
		background-color: var(--cn-color-error, rgb(228, 56, 52));
	}
	.contained:hover {
		box-shadow: var(
			--cn-elevation-1,
			0 1px 2px 0 rgb(0 0 0 / 0.6),
			0 0px 0px -1px rgb(0 0 0 / 0.6)
		);
	}
	.contained:active {
		box-shadow: none;
	}
	.contained-disabled {
		border-color: transparent;
		color: var(--cn-background-color, rgb(255, 255, 255));
		background-color: var(--cn-color-disabled);
	}
	.outlined-primary {
		--cn-ripple-hover-color: var(--cn-color-primary, rgb(5, 125, 187));
		--cn-ripple-pressed-color: var(--cn-color-primary, rgb(5, 125, 187));
		color: var(--cn-color-primary, rgb(5, 125, 187));
		border-color: var(--cn-color-primary, rgb(5, 125, 187));
	}
	.outlined-success {
		--cn-ripple-hover-color: var(--cn-color-success, rgb(2, 183, 139));
		--cn-ripple-pressed-color: var(--cn-color-success, rgb(2, 183, 139));
		color: var(--cn-color-success, rgb(2, 183, 139));
		border-color: var(--cn-color-success, rgb(2, 183, 139));
	}
	.outlined-error {
		--cn-ripple-hover-color: var(--cn-color-error, rgb(228, 56, 52));
		--cn-ripple-pressed-color: var(--cn-color-error, rgb(228, 56, 52));
		color: var(--cn-color-error, rgb(228, 56, 52));
		border-color: var(--cn-color-error, rgb(228, 56, 52));
	}
	.outlined-disabled {
		color: var(--cn-color-disabled);
		border-color: var(--cn-color-disabled);
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
	.enabled {
		cursor: pointer;
	}
	.button {
		fill: currentColor;
		flex: 1;
		display: flex;
		height: 2.5rem;
		padding: 0 1.25rem;
		align-items: center;
		text-align: start;
	}
	.button-container {
		position: relative;
		border-style: solid;
		display: flex;
		overflow: hidden;
		border-radius: 9999px;
		border-width: 1px;
	}
</style>
