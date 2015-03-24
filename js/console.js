// En este archivo se declara el objeto encargado demanipular los eventos y caracteristicas de la consola
// Declaracion del objeto Terminal
function Terminal(id,titulo) { // Pasamos el id del div y el titulo inicial de la consola como argumentos
	this.id = id, // Establecemos el id de la instancia actual
	this.titulo = titulo, // Establecemos el titulo por default
	this.color = 'white', // Establecemos el color de texto por default
	this.fondo = 'rgba(120,60,150,0.75)', // Establecemos el color de fondo por default
	this.version = 'v1.0.5', // Establecemos la version actual de la terminal en cada instancia
	$('.prompt').html('> '), // Establecemos el prompt
	$(this.id).html('<div class="panel terminal" dragable><div class="panel-heading"><h3 class="panel-title"><span class="glyphicon glyphicon-cloud" aria-hidden="true"></span> <span class="titulo"></span></h3></div><div class="panel-body"><span class="historial"></span><span class="prompt"></span><input class="entrada" type="text" placeholder="&copy 2015. Cloudtronic. Todos los derechos reservados." spellcheck="false" autofocus></div></div>'), // Insertamos el html necesario para la instancia de la terminal dentro del dic indicado por el id
	$(this.id+' .terminal').click(function() { // Declaramos la funcion focus
		$(this.id+' .entrada').focus(); // Hacemos focus al input de texto cuando se de click sobre la terminal
	}),
	$(this.id+' .titulo').text(this.titulo), // Escribimos el titulo de la consola en la instancia actual
	$(this.id+' .panel-body').css({ // Establecemos el color de texto y el color de fondo de la instancia actual
		color: this.color,
		backgroundColor: this.fondo
	}),
	$(this.id+' .entrada').on('keypress', function(event) { // Detectamos cuando se pulsan teclas estando dentro de la terminal
		// No hacemos el prevent default para no  afectar las funciones normales del input
		if (event.keyCode==13) { // Detectamos la tecla enter
			var entrada = $(this.id+' .entrada').val(); // Obtenemos el valor del input y  lo guardamos en la variable entrada
			if (entrada!= '') { // Detectamos si el valor es distinto de "vacio"
				terminal._command(entrada); // Invocamos la instancia terminal con su metodo _command para ejecutar el comando !! Aqui hace falta corragir para que no se requiera una instancia definida, se debe  añadir la posibilidad de auto invocarse al objeto.
			};
			$('.prompt').html('> '); // Generamos el prompt en cada div con clase prompt
		};
	}),
	this._console = function (string) { // Creamos la funcion _console que recibe un string por argumento y lo escribe en la ultima linea de la consola
			$(this.id+' .historial').append('<span class="bloque"><span class="prompt"></span> '+string+'</span>'); // Generamos el html necesario con todos los elementos
			$(this.id+' .panel-body').scrollTop($(this.id+' .panel-body')[0].scrollHeight); // Hacemos scroll al div para no perder el cursor abajo, fuera del div
		},
	this._version = function () { // Creamos la funcion version que devuelve la versión de la terminal 
		terminal._console(this.version);  // invocamos la instancia terminal con el metodo consol para dibijar la version en la terminal, aqui se comienza a ver por que es necesario el _console para ahorrar codigo
	},
	this._command = function (linea) { // Declaramos la funcion _command, encargada de invocar un metodo de la instancia a manera de comando de consola, pasa el texto antes del primer espacio como funcion y el resto como argumentos.
			$(this.id+' .entrada').val(''); // limpiamos el input
			terminal._console(linea); // Dibujamos el efecto de que se ha introducido el comando escribiendolo en una linea arriba del cursor
			linea = linea.split(' '); // Separamos el string en palabras, y guardammos cada una como un elemento del array
			comando = linea[0]; // Obtenemos la primera palabra
			linea.shift(); // eliminamos la primera palabra del string (que está en forma de array  por ahora)
			argumentos = linea.join(' '); // Juntamos el arrar resultante de nuevo en forma de string, separando cada palabra por un espacio
			if (typeof this[comando] == 'function') { // Evaluamos que el comando (primera palabra) sea una función o metodo existente del objeto
				// Si existe el comando
				eval('terminal.'+comando+'('+argumentos+')'); // convertimos el comando y los argumentos de string a javascript nativo a manera de metodo dado por el comando invocado sus argumentos dados por el string
			} else { // Si el metodo no existe devolvemos un error en consola
				// Si no existe el comando
				terminal._console('El comando "'+comando+'" no existe. Usa help para ver la lista de comandos.'); // Usamos  de nuevo el metodo _console para mostrar un mensaje en la consola, de nuevo hace falta correjir para no requerir la instancia específica "terminal"
			};
		},
	this._help = function () { // Declaramos la funcion _help, que lista todas las funciones o metodos internos (no publicos, solo para funcionamiento) de la consola
			var obj = this; // Obtenemos una el objeto mismo como valor de obj
			var msg = 'Lista de comandos ocultos</br> Usa el comando sin argumentos para ver la lista de comandos internos.</br> Los comandos ocultos no devuelven información de su uso.</br></br>'; // Geeramos la primera linea del mensaje de de consola
			for (var property in obj) { // Hacemos un for recorriendo todas las propiedades del objeto
				if (typeof obj[property] == 'function') { // Obtenemos solo las propiedades de tipo funcion, o metodos del objeto
					var inicio = obj[property].toString().indexOf('function'); // Generamos el primer numero del index de funciones
					var fin = obj[property].toString().indexOf(')')+1; // Generamos el ultimo numero de funcion
					var propertyValue=obj[property].toString().substring(inicio,fin); // Guardamos la propiedades del objeto de inicio a fin en forma de string
					if (property.split('')[0]=='_') { // Lo dividimos en palabras con split y filtramos solo los metodos que comienzan por guion bajo, es decir metodos internos
						msg += ' '+property+'</br>'; // Generamos la lista de funciones internas
					};
				};
			};
			terminal._console(msg+'</br>'); // Usamos la instancia terminal con el metodo _console imprimiendo la lista completa en pantalla. De nuevo hay que evitar la instancia terminal.
		},
	this.help = function () { // Generamos el metodo help que lista toda las funciones o metodos del objeto que no comiencen con guien bajo, es decir los metodos publicos.
			var obj = this;
			var msg = 'Lista de comandos </br> Usa el comando sin argumentos para ver su funcionamiento.</br> Ejemplo: help, muestra esta ayuda. </br></br>';
			for (var property in obj) {
				if (typeof obj[property] == 'function') {
					var inicio = obj[property].toString().indexOf('function');
					var fin = obj[property].toString().indexOf(')')+1;
					var propertyValue=obj[property].toString().substring(inicio,fin);
					if (property.split('')[0]!='_') { // Esta ves solo ignoramos los comandos que comiencen con quion bajo
						msg += ' '+property+'</br>';
					};
				};
			};
			terminal._console(msg+'</br>'); // Aqui tambien hay que buscar como evitar el uso de una instancia específica para invocar la funcion, en este caso la instancia terminal para invocar _console
		},
	this.clear = function () {
			$(this.id+' .historial').empty(); // Generamos la primera funcion pública con un efecto útil, la funcion clear, para limpiar el texto en consola
		}
};