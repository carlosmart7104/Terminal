// Agregamos los comandos al objeto consola
// En este archivo se pueden agregar mas comandos a la consola 
// con solo agregar el metodo con prototype al objeto Terminal
// Este es el principio funcional, que cualquier expancion en las capacidades 
// Pueda ser realizada solo agregando la funcion, sin agregar a una lista 
// o tener que editar el nucleo del objeto.

// Agregamos los comandos al objeto consola

// Este comando permite hacer un alert de javascript, recive el string como argumento
Terminal.prototype.alert = function (string) {
	if (string != undefined) {
		alert(string);
	} else {
		string = 'Usa alert seguido de un texto entre comillas para mostrar una ventana de alerta. </br> Ejemplo: alert "Hola mundo", muestra: hola mundo.';
		terminal._console(string);
	};
};

// Este comando permite modificar el title de la instancia actual, recibe un string como argumento con el valor del nuevo titlulo
Terminal.prototype.title = function (argument) {
	if (argument != undefined) {
		this.titulo = argument;
		$(this.id+' .titulo').text(this.titulo)
	} else {
		argument = 'Usa title seguido de un texto entre comillas para cambiar el titulo de la consola. </br> Ejemplo: title "Nuevo titulo", muestra: Nuevo titulo en la barra superior.';
		terminal._console(argument);
	};
};

// Este comando permite modificar el color de texto de la instancia actual, recive un string como argumento con el valor css del color.
Terminal.prototype.text = function (argument) {
	if (argument != undefined) {
		if (argument=='default') {
			this.color = 'white';
			$(this.id+' .panel-body >*').css({
			color: this.color
			})
		} else {
			this.color = argument;
			$(this.id+' .panel-body >*').css({
			color: this.color
			})
		};
	} else {
		argument = 'Usa text seguido de un texto entre comillas para cambiar el color del texto. </br> Ejemplo: text "green", cambia el texto a color verde. Use el valor default entre comillas para volver al valor original.';
		terminal._console(argument);
	};
};

// Este comando permite cambiar el color de fondo de la instancia actual, recibe un string como argumento con el valor css del color.
Terminal.prototype.background = function (argument) {
	if (argument != undefined) {
		if (argument=='default') {
			this.fondo = 'rgba(120,60,150,0.75)';
			$(this.id+' .panel-body').css({
			backgroundColor: this.fondo
			})
		} else {
			this.fondo = argument;
			$(this.id+' .panel-body').css({
			backgroundColor: this.fondo
			})
		};
	} else {
		argument = 'Usa background seguido de un texto entre comillas para cambiar el color del fondo. </br> Ejemplo: background "black", cambia el fondo a color negro. Use el valor default entre comillas para volver al valor original.';
		terminal._console(argument);
	};
};

// Este comando permite abrir una nueva pestaña del navegador a un sitio web, recibe un string como argumento con la direccion url sin http://
Terminal.prototype.open = function (argument) {
	if (argument != undefined) {
		terminal._console('<a href="http://'+argument+'/" target="_blank">'+argument+'</a>');
		window.open('http://'+argument,'_blank')
	} else {
		argument = 'Use open seguido de la dirección electrónica entre comillas para abrir un sitio web en una nueva pestaña. </br> Ejemplo: open "www.google.com", abre una nueva pestaña a google.';
		terminal._console(argument);
	};
};
// Este comando permite abrir una nueva pestaña de acceso ftp en el navegador, recibe un string como argumento separando los datos con espacios, en el orden host-ftp usuario y contraseña
Terminal.prototype.ftp = function (argument) {
	if (argument != undefined) {
		argument = argument.split(' ');
		url = argument[1] + ':' + argument[2] + '@' + argument[0];
		terminal._console('<a href="ftp://'+url+'/" target="_blank">'+argument[1]+':**********@'+argument[0]+'</a>');
		window.open('ftp://'+url,'_blank');
	} else {
		argument = 'Use ftp seguido de la dirección electrónica, el usuario y la contraseña, todo entre comillas, para abrir el panel ftp en una nueva pestaña. </br> Ejemplo: ftp "host user pasword", abre una nueva pestaña al servidor ftp con la sesion iniciada.';
		terminal._console(argument);
	};
};

// iniciamos la instancia terminal del objeto Terminal con identificador: miTerminal y titulo: 2015. @carlosmart7104.
var terminal = new Terminal('#miTerminal','Terminal');

// Generamos el mensaje de licencia.
terminal._console('Terminal v1.0.5. </br> Licencia GPL, usted es libre de copiar, editar y redistribuir este software bajo la misma licencia.</br>Terminal. By: @carlosmart7104. </br> </br>');
