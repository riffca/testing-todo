<template>
	<div class="todo">
		<div v-if="!editText" class="text">{{todo.text}}</div>
		<div v-else class="inputText"><textarea  v-model="todo.text" cols="60" rows="10"></textarea></div>
		<div class="actions">
			<div><div class="button remove" @click="editText=!editText">{{ editText ? 'Ok' : 'Edit' }}</div></div>
			<div @click="setDone(todo)" class="checkbox" :class="{done: todo.done}">
					{{ !todo.done ? 'pending' : 'done' }}
			</div>
			<div><div class="button remove" @click="removeTodo(todo)">
				X
			</div></div>
		</div>
		
	</div>
</template>

<script>
export default {
	props: {
		todo: Object,
	},
	data () {
		return {
			editText: false
		}
	},
	methods: {
		removeTodo(todo){
			this.$store.commit('deleteTodo',todo)
		},
		setDone(todo){
			todo.done = !todo.done
			this.$store.commit('changeTodo',todo)
		}
	}
}
</script>

<style lang="scss">


.todo {
	display: flex;
	margin-top: 1vw;

	.inputText {
		width: 12vw;
		padding-top: 1vw;
		padding-left: 1vw;
		text-align: left;
	}
	
	.text {
		width: 12vw;

		padding-top: 1vw;
		padding-left: 1vw;
		text-align: left;
		height: 60px;
		overflow: hidden;
		font-size: 14px;
		&:hover {
			height: auto;
			cursor: pointer;
		}
	}


}




.actions {
	transform: translateY(-1.2vw);
	display: flex;
	.remove {
		margin-top: 0;
		margin-bottom: 2vw;
		margin-left: 2vw;
	}
}

.checkbox {
	display: inline-block;
	width: 4vw;
	height: 2vw;
	border-radius: 10%;
	background: yellow;
	&.done {
		background: green;
		color: white;
	}
}


</style>