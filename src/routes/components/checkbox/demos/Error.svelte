<script lang="ts">
	import { Checkbox } from '#lib/index.js'
</script>

<Checkbox aria-label="Unchecked" issues={[{ message: 'Required' }]} />
<Checkbox aria-label="Checked" checked issues={[{ message: 'Required' }]} />
<Checkbox aria-label="Indeterminate" indeterminate issues={[{ message: 'Required' }]} />
