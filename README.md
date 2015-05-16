# theatreProjApp

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular-fullstack)

## Build & development

Run `grunt` for building and `grunt serve` for preview.

-- Mongo DB might not work across UniWireless but will work on a wired desktop. One zip file of the deployed version with the code but will not run without a local mongodb instance. A link to an openshift deployment which is interactive is also included

Third party libraries used
----------------------

Bootstrap and bootstrap datetimepicker


Directory structure
---------------------

The client side is in the `client` folder and server side is in the `api` folder inside the `server` folder.

The `api` folder is a REST API that has the different endpoints to provide information to the client side.

Under the `client` folder, 
- `bower_components` has the bower packages used by this app
- `components` has the main components
- `assets` has the static files i.e. images
- `app` is where the main code for the rendering on the front-end