<template>
	<div class="todo">
		<div class="actions">
			<div><div class="button remove" @click="removeTodo(todo)">
				X
			</div></div>
			<div @click="setDone(todo)" class="checkbox" :class="{done: todo.done}">
					{{ !todo.done ? 'pending' : 'done' }}
			</div>
			<div><div class="button remove" @click="editText=!editText">{{ editText ? 'Ok' : 'Edit' }}</div></div>

		</div>

		<div class="todoText">
			<div v-if="!editText" class="text">{{todo.text}}</div>
			<div v-else class="inputText"><textarea  v-model="todo.text" cols="60" rows="10"></textarea></div>
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

	position: relative;
	margin-top: 1vw;

	.inputText {
		position:absolute;
		top: 0;
		left: 0;
		width: 12vw;
		padding-top: 1vw;
		padding-left: 1vw;
		text-align: left;
		background: white;
		z-index:1900;

	}
	
	.text {

		position: absolute;
		top: 0;
		left: 0;
		width: 80%;

		padding-top: 1vw;
		padding-left: 1vw;
		text-align: left;
		height: 30px;
		overflow: hidden;
		font-size: 14px;
		&:hover {
			background: white;
			height: auto;
			cursor: pointer;
			padding-bottom: 1vw;
			z-index: 900;

		}
	}

	.todoText {
		position: relative;
		height: 40px;
	}


}




.actions {
	display: flex;
	flex-direction: row-reverse;
	.remove {
		margin-top: 0;
		margin-bottom: 2vw;
		margin-left: 2vw;
	}

	.button {
		margin-bottom: 0;
	}
}

.checkbox {
	cursor: pointer;
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