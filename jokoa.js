//------------------------------------BOTOIA JASOTZEA-----------------------------------------

document.addEventListener('keydown', function(evento){
	if(evento.keyCode==32){
		console.log("salta");
		if(nivel.muerto == false)
		{
			if(tortu.saltando==false){
				saltar();
			}
		}
		else
		{
			nivel.velocidad = 8;
			ninja.x = ancho + 100;
			nivel.muerto = false;
			nivel.marcador = 0;
			ilargi.velocidad= 1;
		}
	}

});

//-----------------------------------ARGAZKIAK-----------------------------------------------------------

var imgTortu, imgObs, imgLurre;

function cargaImagenes()
{
	imgTortu = new Image();
	imgLurre = new Image();
	imgObs = new Image();
	imgIl = new Image();
	imgZerue= new Image;
		
	imgTortu.src= 'img/tortu.png';
	imgLurre.src= 'img/fondo.png';
	imgObs.src= 'img/enemigo.png';
	imgIl.src= 'img/ilargixe.png';
	imgZerue.src= 'img/zerue.png';
}

//----------------------------------------CANVAS--------------------------------------------------

var ancho=700;
var alto= 300;
var canvas, ctx;


function inicializa()
{
	canvas=document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	cargaImagenes();
}

function borraCanvas()
{
	canvas.width = ancho;
	canvas.height= alto;
}

//-----------------------------------------BARIABLEAK-----------------------------------------

var lurre = 250
var tortu = {y:lurre, vy:0, gravedad:2, salto:25, vymax:9, saltando: false};
var nivel = {velocidad: 8, marcador: 0, muerto: false};
var ninja = {x: ancho+100, y: lurre-15};
var lurreg = {x: 0, y: lurre + 30};
var ilargi = {x: 650, y: 65, velocidad: 1};

//---------------------------------------TORTU---------------------------------------------------------

function dibujaTortu(){
	ctx.drawImage(imgTortu, 0, 0,236,242,100,tortu.y,50, 50);
}


//---------------------------OBSTAKULOA-----------------------------------------------------
function dibujaninja()
{
	ctx.drawImage(imgObs, 0, 0, 894, 894, ninja.x, ninja.y, 80, 80);
}

function logicaninja()
{
	if(ninja.x < -100)
	{
		ninja.x=ancho+100;
		nivel.marcador++;
		nivel.velocidad++;
	}
	else
	{
		ninja.x -=nivel.velocidad;
	}
}
//-----------------------------DEKORAZIOA---------------------------------------------------------------

function dibujadeco()
{
	ctx.drawImage(imgIl, 0, 0, 1080, 818, ilargi.x, ilargi.y, 100, 80);
}

function logicadeco()
{
	if(ilargi.x < -100)
	{
		ilargi.x = ancho + 100;
	}
	else
	{
		ilargi.x -= ilargi.velocidad;
	}
}

//----------------------------------------------------FONDOA----------------------------------------------

function dibujazerue()
{
	ctx.drawImage(imgZerue, 0, 0, 442, 247, 0, 0, 700, 300);
}

//--------------------------------LURRA------------------------------------------------------

function dibujalurre(){
	ctx.drawImage(imgLurre, lurreg.x, 0, 700, 30, 0, lurreg.y, 700, 30);
}

function logicalurre()
{
	if(lurreg.x > 500)
	{
		lurreg.x=0;
	}
	else
	{
		lurreg.x += nivel.velocidad;
	}
}



//---------------------------------GRABITATEA---------------------------------------------------------
function saltar()
{
	tortu.saltando = true;
	tortu.vy=tortu.salto;
}

function gravedad()
{
if (tortu.saltando == true)
{
	if(tortu.y - tortu.vy - tortu.gravedad > lurre)
	{
		tortu.saltando=false;
		tortu.vy=0;
		tortu.y = lurre;
	}
	else
	{
		tortu.vy -= tortu.gravedad;
		tortu.y -= tortu.vy;
	}	
}

}
//---------------------------------KOLISI0A---------------------------------------------------------------

function colision()
{
	if(ninja.x >= 60 && ninja.x <=110)
	{
		if(tortu.y >= lurre -20)
		{
			nivel.muerto = true;
			nivel.velocidad = 0;
			ilargi.velocidad= 0;
		}
	}

}

//----------------------------------PUNTUAZIOA------------------------------------------------------

function puntuacion()
{
	ctx.font = "30px impact";
	ctx.fillStyle = '#FF0000';
	ctx.fillText(`${nivel.marcador}`, 600, 50);
	


	if(nivel.muerto == true)
	{
		ctx.font = "60px impact";
		ctx.fillText(`GALDU EGIN DUZU`, 145, 150);
	}
}

//------------------------------PRINTZIPALA-------------------------------------------------------


var FPS= 50;

setInterval(function()
{
	principal();

},1000/FPS);

function principal()
{
	borraCanvas();
	gravedad();
	colision();
	logicalurre();
	logicadeco();
	logicaninja();
	dibujazerue();
	dibujalurre();
	dibujadeco();
	dibujaninja();
	dibujaTortu();
	puntuacion();	
}