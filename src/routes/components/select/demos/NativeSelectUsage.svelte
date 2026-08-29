<script lang="ts">
	import { NativeSelect, Option } from '#lib/index.js'
</script>

<NativeSelect label="Fruit" name="fruit">
	<Option value=""></Option>
	<Option value="apple">Apple</Option>
	<Option value="apricot">Apricot</Option>
	<Option value="banana">Banana</Option>
	<Option value="cherry">Cherry</Option>
	<Option value="elderberry" disabled>Elderberry</Option>
	<Option value="fig">Fig</Option>
	<Option value="grape">Grape</Option>
</NativeSelect>
<NativeSelect variant="filled" label="Fruit" name="fruit">
	<Option value=""></Option>
	<Option value="apple">Apple</Option>
	<Option value="apricot">Apricot</Option>
	<Option value="banana">Banana</Option>
	<Option value="cherry">Cherry</Option>
	<Option value="elderberry" disabled>Elderberry</Option>
	<Option value="fig">Fig</Option>
	<Option value="grape">Grape</Option>
</NativeSelect>
