# TheatreProjApp
This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular-fullstack)

# Build & development
Run grunt for building and grunt serve for preview.

Mongo DB might not work across UniWireless but will work on a wired desktop. One zip file of the deployed version with the code but will not run without a local mongodb instance. A link to an openshift deployment which is interactive is also included

# Third party libraries used
Bootstrap,
Bootstrap datetimepicker,
Angular-hammer

# Directory structure
- client
	- app (All of our app specific components go in here)
	- assets (Custom assets: fonts, images, etc)
	- components (Our reusable components, non-specific to to our app)
- server
	- api (Our apps server api)
	- auth (For handling authentication with different auth strategies)
	- components (Our reusable or app-wide components)
	- config (Where we do the bulk of our apps configuration)
		- local.env.js (Keep our environment variables out of source control)
		- environment (Configuration specific to the node environment)
		- views (Server rendered views)

# Group authored code
- client
	- app
		- about-us/*
		- account/*
		- admin/*
		- contacts/*
		- groups/*
		- main/*
		- production-meeting/*
		- shows/*
		- venue-allocation/*
		- custom.scss
- server
	- api/*
- README.md

# Generated code that we edited
- server
	- config
		- environment/*
- bower.json
- Gruntfile.js

# Carousel
There's an easter egg, good luck finding it! ;-)