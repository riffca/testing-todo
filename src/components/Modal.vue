<template>

	<transition name="modal">

		<div
			@click="toggle(false)"
			:name="name" 
			v-if="showModal"
			:style="{zIndex: currentZIndex}"
			:class="[
					'modal-mask', 
					'modal-'+name,
				]">
			<div 
				@click.stop
				class="modal-wrapper">
				<div :class="[
						'modal-container',
					]">
					<div class="modal-header">
						<slot name="header">
							default header
						</slot>
					</div>
					<div class="modal-body">
						<slot name="body">
							default body
						</slot>
					</div>
					<slot name="footer">
						<base-button @click.native="toggle(false)">
							OK
						</base-button>
					</slot>
				</div>
			</div>
		</div>

	</transition>

</template>

<script>

import Modal from './ModalPlugin'

export default {
	props: {
		name: {
			type: String,
			default: ""
		},
	},

	name: 'base-modal',
	data () {
		return {
			currentZIndex: 10000,
			showModal: false,
			closeCallback: null,
			options: {}
		}
	},
	beforeMount() {
		Modal.event.$on('toggle', (name, state, options={}) => {

			if (name === this.name) {
				if(!this.closeCallback) {
					this.closeCallback = options.close 
				}
			}
			
			this.toggle(state)

		})
	},

	methods: {
		toggle(state){
			this.showModal = state
		},
	},
	watch:{
		showModal(val){
			if(!val){
				if(this.closeCallback){
					this.closeCallback()
					this.closeCallback = null
				}
			} 
		}
	}
}
</script>

<style lang="scss">
$white-color: white;
$top-right: 34px;
$red-dark-color: red;

.modalClose {
	cursor: pointer;
	fill: $red-dark-color;
	transform: translateY(-12%);
	position: absolute;
	top: get-vw($top-right);
	right: get-vw(34px);
}

.modal-mask {

	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(206, 122, 31, 0.12);
	display: flex;
	transition: opacity .3s ease;
	align-items: center;
	justify-content: center;
}

.modal-wrapper {

	position: relative;
}

.modal-container {
	padding: 2vw;
	width: auto;
	margin: 0px auto;
	background-color: $white-color;
	box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	transition: all .3s ease;
	font-family: Helvetica, Arial, sans-serif;
	max-height: 90vh;
	overflow-Y: scroll;

	&::-webkit-scrollbar { 
		display: none; 
		-ms-overflow-style: none;  // IE 10+
		overflow: -moz-scrollbars-none;  
	}

}

.modal-header {
	margin-top: 0;
	text-transform: uppercase;
	text-align: left;
}


.modal-default-button {
	float: right;
}


.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}

.modal-footer {
	text-align: left;
}

</style>