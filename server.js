const express = require('express')
const app = express()
const connection = require("./middlewares/mysql-connection.js");
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routes = require("./controllers/routes.js");
// const data = require("./controllers/data.js");

connection.createSqlConnection()
	.then(success => {
		console.log('Connected to db with threadID ' + success)
	})
	.catch(data => {
		console.error('Error creating SQL connection: ' + data.stack)
		process.exit(1);
	})

// Use Helmet for security
app.use(helmet());

// 
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// Main router -- ****OTHER ROUTERS NEED TO BE ABOVE THIS LINE!!!!******
app.use("/", routes);

const port = process.env.PORT? process.env.PORT : 3000

app.listen(port, () => console.log('The Bank up and running on port ' + port))