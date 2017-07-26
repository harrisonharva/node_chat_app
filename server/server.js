const path = require('path');
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

// app.statics.middleware =
const publicPath = path.join(__dirname, '../public' );
// hbs.registerPartials(__dirname+"/views/partials");

var app = express();
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render(publicPath+'/index.html', {
		pageTitle: "Home page",
		welcomeMessage: "Welcome to my website xyz.",
	});
});

app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
});

module.exports = {app}
