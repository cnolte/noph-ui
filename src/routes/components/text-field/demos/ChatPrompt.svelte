<script lang="ts">
	import { IconButton, Menu, MenuItem, TextField } from '#lib/index.js'
	import { Icon } from '#lib/icons/index.js'

	let chatPromptPlusBtn: HTMLElement | undefined = $state()
</script>

<TextField placeholder="Ask anything" type="textarea" maxLines={8} style="width:22rem">
	{#snippet start()}
		<IconButton
			title="Add"
			style="anchor-name:--chat-prompt-plus"
			command="toggle-popover"
			commandfor="chat-prompt-menu"
			bind:element={chatPromptPlusBtn}
		>
			<Icon>add</Icon>
		</IconButton>
	{/snippet}
	{#snippet end()}
		<IconButton title="Send"><Icon>send</Icon></IconButton>
	{/snippet}
</TextField>
<Menu anchor={chatPromptPlusBtn} id="chat-prompt-menu" style="position-anchor:--chat-prompt-plus">
	<MenuItem>
		Web search
		{#snippet start()}<Icon>language</Icon>{/snippet}
	</MenuItem>
	<MenuItem>
		Connect apps
		{#snippet start()}<Icon>webhook</Icon>{/snippet}
	</MenuItem>
</Menu>
