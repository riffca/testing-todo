<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	display: flex;
	flex-direction: column;
	flex: 1;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}



/*
* Default styles
*/
h1, h2 {
	font-weight: 400;
}

h1 {
	text-align: center;
	margin: 0 0 32px;
}


/*
* Header
*/
body {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	min-height: 100vh;
	margin: 0;
	background-color: #f3f3f4;
}

</style>
