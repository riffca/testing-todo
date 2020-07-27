const express = require('express')
const cors = require('cors')
const path = require('path')
const serveStatic = require("serve-static");
const methodOverride = require('method-override')
const http = require('http')

let app = express()
app.set('port', process.env.PORT || 3000);
let clientPath = (location)=>{
	return path.resolve(__dirname, 'dist')
}
app.use(require('connect-history-api-fallback')()) 
app.use(serveStatic(clientPath()));
app.use(methodOverride('_method'));
app.use(cors())
app.use(express.json());


http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});