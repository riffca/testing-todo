<template>
	<div class="wrap-desk">
		<div class="panel">
			<h1 :style="{ marginTop: '1vw'}">Awesome todo desk</h1>
			<div class="button add" @click="createList">Add list</div>
			<div class="wrap-forms">
				
				<div class="form">
					<label for="todoName">search</label>
					<input id="todoName" type="text">
				</div>			

				<div class="form">
					<select v-model="status">
						<option>all</option>
						<option>done</option>
						<option>pending</option>
					</select>
				</div>
				
			</div>
		</div>
		<div class="lists">
			<div class="side" v-for="list in lists" :key="list.id">
				<h3>
					<span v-if="!list.editTitle" class="text">{{list.name}}</span>
					<span v-else class="text"><input  v-model="list.name" /></span>
					<span class="button" @click="list.editTitle = !list.editTitle">{{ list.editTitle ? 'ok' : 'i'}}</span>
					<span class="button" @click="addTodo(list.id)">+</span>
					<span class="button" @click="openModal(list.id)">X</span>
				</h3>
				<draggable :list="list.items"  group="people" @change="dragChangeTodo(list.id,$event)">
					<div
						class="todo"
						v-for="(element) in list.items"
						:key="element.id"
					>
					<TodoComponent :todo="element" />
					</div>
				</draggable>
			</div>	
		</div>

		<ModalComponent name="alert">
			<template slot="header">
				Are you sure 
			</template>			
			<template slot="body">
				to delete list ?
			</template>
			<template slot="footer">
				<div class="button" @click="deleteList">Yes</div>
				<div class="button" @click="$modal.hide('alert')">No</div>
			</template>
		</ModalComponent>
	</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'; 
import { mapState } from 'vuex'

import draggable from "vuedraggable";
import TodoComponent from "./Todo";
import ModalComponent from "./Modal";

export default {
	computed: {
		...mapState({
			todos: ({todos})=> todos
		})
	},

	watch:{
		todos(){
			this.renderTodos()
		},
		search() {
			this.renderTodos()
		},
		status(){
			this.renderTodos()
		}
	},

	components: {
		draggable,
		TodoComponent,
		ModalComponent
	},
	methods: {
		renderTodos(){
			this.lists.forEach(item=>{
				item.items= []
			})
			this.todos.forEach(item=>{
				this.lists.forEach((list)=>{
					if(item.listId=== list.id) {
						let exp = new RegExp(this.filter, 'i')
						if(item.text.match(exp)) {
							if(this.status === 'done' && item.done) {
								list.items.push(item)
							}
							if(this.status === 'pending' && !item.done) {
								list.items.push(item)
							}
							if(this.status === 'all') {
								list.items.push(item)
							}
						}
					}
				})
			})
		},
		deleteList(){
			let index= this.lists.findIndex(item=>item.id === this.currentListId)
			this.lists.splice(index,1)
			this.$modal.hide('alert')
		},
		openModal(listId){
			this.currentListId=listId
			this.$modal.show('alert')
		},
		dragChangeTodo(listId, val){
			if(val.added) {
				let todo = val.added.element
				todo.listId = listId
				this.$store.commit('changeTodo', todo)
			}
		},

		createList(){
			let data = {
				name: 'new list',
				id: uuidv4(),
				items: [],
				editTitle: false
			}
			this.lists.push(data)
		},
		addTodo(listId=''){
			let data = {
				text: 'new',
				id: uuidv4(),
				listId
			}
			this.$store.commit('addTodo',data)
		}
	},
	data () {
		return {
			lists: [{id: uuidv4(),name:'main', editTitle: false, items:[]}],
			status: 'all',
			search: '',
			currentListId: ''
		}
	}
}
</script>

<style lang="scss">

.button {
	display: inline-block;
	padding: .2vw 1vw;
	cursor: pointer;
	margin: 1vw;
	border: 1px solid black;

	&.add {
		padding-top: 1.6vw;

		&:hover {
			background: black;
			color: white;
		}
	}
}

.lists {
	justify-content: center;
	display: flex;
	flex-wrap: wrap;

	> div {
		margin: 1vw;
		width: 30vw;
		background-color: white;
		padding-bottom: 10vw;
	}



}
.panel {
	display: flex;
	justify-content: center;
}

.form {
	margin-top: 1vw;
	margin-right: 1vw;
	label {
		margin-right: 1vw;
	}

	input {
		width: 6vw;
	}

}

.wrap-forms {
	margin-top: .3vw;
}


</style>