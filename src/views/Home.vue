<template>
	<div class="home">
		<Desk />
	</div>
</template>

<script>
// @ is an alias to /src
import Desk from '@/components/Desk.vue'

export default {
	name: 'Home',
	components: {
		Desk
	}
}
</script>
