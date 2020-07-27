import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		todos: [],
	},
	mutations: {
		addTodo(state,todo){
			todo.done = false
			state.todos.push(todo)
		},
		changeTodo(state,todo){
			let index = state.todos.findIndex(i=>i.id===todo.id)
			state.todos.splice(index,1, todo)
		},	
		deleteTodo(state,todo){
			let index = state.todos.findIndex(i=>i.id===todo.id)
			state.todos.splice(index,1)
		}
	},
	modules: {
	}
})
