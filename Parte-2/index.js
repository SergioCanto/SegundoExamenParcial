let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );

let app = express();

let server;

app.put('/api/bookmarks/:id', jsonParser, (req, res) => {

	let idP = req.params.id;
	let id = req.body.id;
	let titulo = req.body.titulo;
	let descripcion = req.body.descripcion;
	let url = req.body.url;
	let obj = {};

	console.log(id);

	if (id && id !== '') {

		if (id === idP) {

			if ((descripcion && descripcion !== '') || (titulo && titulo !== '') || (url && url !== '')) {

				let exist = comentarios.find((elemento) => {
					if (elemento.id == id) {
						if (titulo)
							elemento.titulo = titulo;
						if (url)
							elemento.url = url;
						if (descripcion)
							elemento.descripcion = descripcion;
						obj = elemento;
						return true;
					}
				});

				if (!exist) {
					res.statusMessage = 'ID no existe en comentarios';
					return res.status(404).send();
				}

				else {
					console.log(obj);
					return res.status(202).json({ obj });
				}
			}
			
			else {
				res.statusMessage = 'No se encuentra campo a modificar';
				return res.status(406).send();
			}
		}

		else {
			res.statusMessage = 'Los ids no coinciden';
			return res.status(409).send();
		}
	}

	else {
		res.statusMessage = 'El id no se encuentra en el cuerpo.';
		return res.status(406).send();
	}
});

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}