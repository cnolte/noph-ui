<div class="text-center">
	<div class="loader inline-block"></div>
</div>

<style>
	.loader {
		width: 50px;
		padding: 8px;
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--cn-color-primary);
		--_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
		-webkit-mask: var(--_m);
		mask: var(--_m);
		-webkit-mask-composite: source-out;
		mask-composite: subtract;
		animation: l3 1s infinite linear;
	}
	@keyframes l3 {
		to {
			transform: rotate(1turn);
		}
	}
</style>
