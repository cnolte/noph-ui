<script lang="ts">
	import { DockedDatePicker } from '#lib/index.js'

	let german = $state<string | undefined>('2025-08-17')
	let japanese = $state<string | undefined>('2025-08-17')
</script>

<DockedDatePicker bind:value={german} label="Datum" locale="de-DE" />
<DockedDatePicker bind:value={japanese} label="日付" locale="ja-JP" />
