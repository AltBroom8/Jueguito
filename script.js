//hecho por carlos gowing 

var player1X = -2100;
var player1Y = 0;
var player2X = 2100;
var player2Y = 0;
var player1;
var player2;



var contador2;
var vida2;

var desaparece = false;
var colision = false;
var soloUna = false;

var arrayBarra2; 


document.addEventListener('DOMContentLoaded', function() {
    contador2 = 6;
    vida2 = document.getElementById("cantidad2");



    var listaItems = document.getElementsByTagName('li');
    var teclasPresionadasJugador1 = {};
    var teclasPresionadasJugador2 = {};
    for (var i = 0; i < listaItems.length; i++) {
        (function(index) {
            var spanElement = listaItems[index].getElementsByTagName('span')[0];
            if (spanElement && spanElement.textContent === 'START') {
                var boton = listaItems[index];
                boton.addEventListener('click', function() {
                    console.log('Se ha hecho clic en el botón con contenido: ' + this.textContent.trim());
                    empieza = true;
                    eliminarElemento(boton);
                    creaImagen('cuadrado2.jpeg','cuadrado1Start','tablero');
                    player1 = document.getElementsByClassName('cuadrado1Start')[0];
                    console.log(player1);
                    creaImagen('cuadrado1.jpg','cuadrado2Start','tablero');
                    player2 = document.getElementsByClassName('cuadrado2Start')[0];
                    console.log(player2);
                    document.addEventListener('keydown', function(event) {
                        teclasPresionadasJugador1[event.key] = true;
                        //player1 controles
                        if((teclasPresionadasJugador1['s'] && teclasPresionadasJugador1['d'] && teclasPresionadasJugador1['c']) || (teclasPresionadasJugador1['s'] && teclasPresionadasJugador1['c'])){
                            disparo1Rebote(player1, false,player2);
                        }else if ((teclasPresionadasJugador1['w'] && teclasPresionadasJugador1['c'] && teclasPresionadasJugador1['d']) || (teclasPresionadasJugador1['w'] && teclasPresionadasJugador1['c'])) {
                            disparo1Rebote(player1, true,player2);
                        } else if ((teclasPresionadasJugador1['d'] && teclasPresionadasJugador1['c']) || (teclasPresionadasJugador1['a'] && teclasPresionadasJugador1['c'])) {
                            soloUna = false;
                            disparo1simple(player1,player2);
                            soloUna = false;
                            console.log('ha presionado la tecla c junto con d o a');
                        }else if(teclasPresionadasJugador1['w'] && teclasPresionadasJugador1['d']) {
                            // Mover diagonalmente hacia arriba a la derecha
                            player1Y= moverArriba(player1,player1X,player1Y);
                            player1X=moverDerecha(player1,player1X,player1Y);
                        } else if (teclasPresionadasJugador1['w'] && teclasPresionadasJugador1['a']) {
                            // Mover diagonalmente hacia arriba a la izquierda
                            player1Y= moverArriba(player1,player1X,player1Y);
                            player1X=moverIzquierda(player1,player1X,player1Y);
                        } else if (teclasPresionadasJugador1['s'] && teclasPresionadasJugador1['d']) {
                            // Mover diagonalmente hacia abajo a la derecha
                            player1Y = moverAbajo(player1,player1X,player1Y);
                            player1X=moverDerecha(player1,player1X,player1Y);
                        } else if (teclasPresionadasJugador1['s'] && teclasPresionadasJugador1['a']) {
                            // Mover diagonalmente hacia abajo a la izquierda
                            player1Y = moverAbajo(player1,player1X,player1Y);
                            player1X=moverIzquierda(player1,player1X,player1Y);
                        } else if (teclasPresionadasJugador1['w']) {
                            player1Y = moverArriba(player1, player1X, player1Y);
                        } else if (teclasPresionadasJugador1['s']) {
                            player1Y = moverAbajo(player1, player1X, player1Y);
                        } else if (teclasPresionadasJugador1['d']) {
                            player1X = moverDerecha(player1, player1X, player1Y);
                        } else if (teclasPresionadasJugador1['a']) {
                            player1X = moverIzquierda(player1, player1X, player1Y);
                        }else if(teclasPresionadasJugador1['c']){
                            soloUna = false;
                            disparo1simple(player1,player2);
                            soloUna = false;
                            console.log('ha presionado la tecla c')
                        }
                         
                        
                    });
                    document.addEventListener('keydown', function(event) {
                        teclasPresionadasJugador2[event.key] = true;
                        //player 2 controles

                        if (teclasPresionadasJugador2['ArrowUp']) {
                            player2Y = moverArriba(player2, player2X, player2Y);
                        } else if (teclasPresionadasJugador2['ArrowDown']) {
                            player2Y = moverAbajo(player2, player2X, player2Y);
                        } else if (teclasPresionadasJugador2['ArrowLeft']) {
                            player2X = moverIzquierda(player2, player2X, player2Y);
                        } else if (teclasPresionadasJugador2['ArrowRight']) {
                            player2X = moverDerecha(player2, player2X, player2Y);
                        }

                        if (teclasPresionadasJugador2['ArrowUp'] && teclasPresionadasJugador2['ArrowRight']) {
                            // Mover diagonalmente hacia arriba a la derecha
                            player2Y = moverArriba(player2,player2X,player2Y);
                            player2X = moverDerecha(player2,player2X,player2Y);
                        } else if (teclasPresionadasJugador2['ArrowUp'] && teclasPresionadasJugador2['ArrowLeft']) {
                            // Mover diagonalmente hacia arriba a la izquierda
                            player2Y = moverArriba(player2,player2X,player2Y);
                            player2X = moverIzquierda(player2,player2X,player2Y);
                        } else if (teclasPresionadasJugador2['ArrowDown'] && teclasPresionadasJugador2['ArrowRight']) {
                            // Mover diagonalmente hacia abajo a la derecha
                            player2Y = moverAbajo(player2,player2X,player2Y);
                            player2X = moverDerecha(player2,player2X,player2Y);
                        } else if (teclasPresionadasJugador2['ArrowDown'] && teclasPresionadasJugador2['ArrowLeft']) {
                            // Mover diagonalmente hacia abajo a la izquierda
                            player2Y = moverAbajo(player2,player2X,player2Y);
                            player2X = moverIzquierda(player2,player2X,player2Y);
                        }
                    });
                    document.addEventListener('keyup', function(event) {
                        teclasPresionadasJugador1[event.key] = false;
                        
                        if (teclasPresionadasJugador1['w']) {
                            player1Y = moverArriba(player1, player1X, player1Y);
                        } else if (teclasPresionadasJugador1['s']) {
                            player1Y = moverAbajo(player1, player1X, player1Y);
                        } else if (teclasPresionadasJugador1['d']) {
                            player1X = moverDerecha(player1, player1X, player1Y);
                        } else if (teclasPresionadasJugador1['a']) {
                            player1X = moverIzquierda(player1, player1X, player1Y);
                        }
                    
                        
                    });
                    document.addEventListener('keyup', function(event) {
                        teclasPresionadasJugador2[event.key] = false;
                        if (teclasPresionadasJugador2['ArrowUp']) {
                            player2Y = moverArriba(player2, player2X, player2Y);
                        } else if (teclasPresionadasJugador2['ArrowDown']) {
                            player2Y = moverAbajo(player2, player2X, player2Y);
                        } else if (teclasPresionadasJugador2['ArrowLeft']) {
                            player2X = moverIzquierda(player2, player2X, player2Y);
                        } else if (teclasPresionadasJugador2['ArrowRight']) {
                            player2X = moverDerecha(player2, player2X, player2Y);
                        }
                    });

                });
            }
            
        })(i);
    }
    


    function moverArriba(elemento, posX, posY) {
        console.log('moviendo hacia arriba');
        console.log(elemento);
        if (posY > -2380) {
            posY -= 70;
            elemento.style.transform = 'translateX('+posX+'px) translateY('+posY+'px)';
            elemento.style.transition = 'transform 0.3s linear';
        }
        console.log(posY);
        


        return posY;
    }

    function moverAbajo(elemento,posX,posY){
        console.log('moviendo hacia abajo');
        console.log(elemento);
        if(posY<2380){
            posY+=70;
            elemento.style.transform = 'translateX('+posX+'px) translateY('+posY+'px)';
            elemento.style.transition = 'transform 0.3s linear';
        }
        console.log(posY);
        return posY;
    }
    function moverDerecha(elemento,posX,posY){
        if(posX<-420 && elemento.classList.contains('cuadrado1Start')){
            posX+=70;
            elemento.style.transform = 'translateX('+posX+'px) translateY('+posY+'px)';
            elemento.style.transition = 'transform 0.3s linear';
        }else if(posX<3920 && elemento.classList.contains('cuadrado2Start')){
            posX+=70;
            elemento.style.transform = 'translateX('+posX+'px) translateY('+posY+'px)';
            elemento.style.transition = 'transform 0.3s linear';
        }


        
        console.log(posX);
        return posX;
    }
    function moverIzquierda(elemento,posX,posY){
        if(posX>-3920 && elemento.classList.contains('cuadrado1Start')){
            posX-=70;
            elemento.style.transform = 'translateX('+posX+'px) translateY('+posY+'px)';
            elemento.style.transition = 'transform 0.3s linear';
        }else if(posX>420 && elemento.classList.contains('cuadrado2Start')){
            posX-=70;
            elemento.style.transform = 'translateX('+posX+'px) translateY('+posY+'px)';
            elemento.style.transition = 'transform 0.3s linear';
        }
        
        console.log(posX);

        return posX;
    }



});


function eliminarElemento(elemento) {
    elemento.classList.add('hide');
    setTimeout(function() {
        elemento.remove(); // Elimina el botón después de la transición
    }, 500); // Retraso de 500 milisegundos (0.5 segundos) para que coincida con el tiempo de transición
}

function creaImagen(nombre, clase, contenedor) {
    var imagen = document.createElement('img');
    imagen.classList.add(clase);
    imagen.src = nombre;
    var contenedorElement = document.querySelector('.' + contenedor);
    contenedorElement.appendChild(imagen);
    setTimeout(function() {
        imagen.classList.add('show');
    }, 10); // Retraso mínimo para asegurar la transición
    
}

function disparo1simple(player1,player2){
    existingElement = document.querySelector('.bolaAzulSimple');
    if (!existingElement){
        console.log('has entrado en el metodo disparo simple')
        var bolaAzul = document.createElement('img');
        bolaAzul.classList.add('bolaAzulSimple');
        bolaAzul.src = 'disparo_azul.png';
        document.body.appendChild(bolaAzul);
        var rect = player1.getBoundingClientRect();
        var ejeX = rect.left+15;
        var ejeY = rect.top+15;
        bolaAzul.style.left = ejeX + 'px';
        bolaAzul.style.top = ejeY + 'px';
        bolaAzul.style.zIndex = '1';
        var posXFinal = 1120; // Define la posición final en el eje X
        var distancia = posXFinal - ejeX;
        var rect2 = player2.getBoundingClientRect();
        var p2X = rect2.left;
        var p2Y = rect2.top;
        d1LineaRecta(bolaAzul, ejeX,ejeY, distancia,player2,p2X,p2Y);
        colision = false;
        desaparece = false;
    }
}

function d1LineaRecta(elemento, posX, posY, distancia, player2, p2X, p2Y) {
    
    var player2D = player2.getBoundingClientRect();
    var p2Ancho = player2D.width;
    var p2Alto = player2D.height;

    var bolaD = elemento.getBoundingClientRect();
    var bolaAncho = bolaD.width;
    var bolaAlto = bolaD.height;


    var colision = false;
    var desaparece = false;
    var soloUna = false;

    
    var interval = setInterval(function () {
        rect = player2.getBoundingClientRect();
        p2X = rect.left;
        p2Y = rect.top;
        console.log('p2x es'+p2X+'y p2y es '+p2Y);
        console.log('player2x es'+player2X+ ' player2y es '+player2Y);
        if (
            posX < p2X + p2Ancho &&
            posX + bolaAncho > p2X &&
            posY < p2Y + p2Alto &&
            posY + bolaAlto > p2Y
        ) {
            console.log('entra en la colision');
            colision = true;
            desaparece = true;
            console.log('colision + ' + colision + ' desaparece ' + desaparece + 'solouna ' + soloUna);
        }
        if (distancia > 0) {
            distancia -= 5;
            posX += 5;
            elemento.style.left = posX + 'px';
            elemento.style.transition = 'transform 0.3s linear';

            if (distancia <= 12 || colision) {
                fadeOutBola(elemento);
                elemento.remove();
                clearInterval(interval);
            } else {
                console.log(posX);
            }
        }

        if ((distancia <= 0 || colision) && desaparece && !soloUna) {
            quitaVida();
            contador2--;
            if (contador2 === 0) {
                window.location.href = './fin_partida.html';
                var video = document.getElementById('mivideo');
                video.play();
            }
            vida2.innerText = contador2;
            console.group('checkpoint');
            soloUna = true;
            clearInterval(interval);
        }
    }, 10);
}





function fadeOutBola(elemento) {
    console.log('entra en el metodo');

    elemento.style.transition = 'opacity 0.2s linear';
    elemento.style.opacity = '0';
    elemento.addEventListener('transitionend', function (event) {
        elemento.style.opacity = '0'; // Asegúrate de que la opacidad se establezca en 0 al final de la transición
    });
}

function disparo1Rebote(player1,arriba,player2){
    existingElement = document.querySelector('.bolaAzulSimple');
    if (!existingElement){
        console.log('has entrado en el metodo disparo rebote')
            var bolaAzul = document.createElement('img');
            bolaAzul.classList.add('bolaAzulSimple');
            bolaAzul.src = 'disparo_azul.png';
            document.body.appendChild(bolaAzul);
            var rect = player1.getBoundingClientRect();
            var ejeX = rect.left+15;
            var ejeY = rect.top+15;
            bolaAzul.style.left = ejeX + 'px';
            bolaAzul.style.top = ejeY + 'px';
            bolaAzul.style.zIndex = '1';
        if(arriba){
            rebote1Arriba(bolaAzul,ejeX,ejeY,player2);

        }else{
        rebote1Abajo(bolaAzul,ejeX,ejeY,player2);
        }
    }

}

function rebote1Arriba(bolaAzul, posX, posY,player2) {

    var player2D = player2.getBoundingClientRect();
    var p2Ancho = player2D.width;
    var p2Alto = player2D.height;

    var bolaD = elemento.getBoundingClientRect();
    var bolaAncho = bolaD.width;
    var bolaAlto = bolaD.height;
    

    var subiendo = true; // Bandera para indicar si el objeto está subiendo o bajando
    var interval = setInterval(function () {
        var rect2 = player2.getBoundingClientRect();
        var p2X = rect2.left;
        var p2Y = rect2.top;
        if(posX < p2X + p2Ancho &&
            posX + bolaAncho > p2X &&
            posY < p2Y + p2Alto &&
            posY + bolaAlto > p2Y ){
            colision = true;
            console.log('BANDERA BANDERITAAAA');
        }
        if (colision) {
            setTimeout(function () {
                fadeOutBola(bolaAzul);
            }, 1000); // Ajusta el tiempo para sincronizar con la transición de opacidad

            contador2--;
            quitaVida();

            if(contador2 === 0){
                window.location.href = "./fin_partida.html";
                var video = document.getElementById('mivideo'); 
                video.play();
            }

            vida2.innerText = contador2;
            console.group('checkpoint');
            clearInterval(interval); // Detener el intervalo cuando haya una colisión
            bolaAzul.remove();
        }
        if (subiendo) {
            if (posY > 132 && posX < 1120) {
                posX += 5;
                posY -= 5;
                bolaAzul.style.left = posX + 'px';
                bolaAzul.style.top = posY + 'px';
                bolaAzul.style.transition = 'transform 0.3s linear';
            } else {
                subiendo = false; // Cambia la bandera cuando alcanza el límite superior
            }
        } else {
            if (posX < 1120 && posY<640) {
                posX += 5;
                posY += 5;
                bolaAzul.style.left = posX + 'px';
                bolaAzul.style.top = posY + 'px';
                bolaAzul.style.transition = 'transform 0.3s linear';
            }else if(posY>=640 && posX < 1120){
                subiendo = true;
            }
             else {
                fadeOutBola(bolaAzul)
                clearInterval(interval); // Detén el intervalo cuando se alcanza el límite inferior
                bolaAzul.remove();
            }
        }
        
    }, 10); // Ajusta el retraso según sea necesario
    desaparece = false; // Reiniciar el manejo de colisiones
    colision = false; // Reiniciar el manejo de colisiones
}

function rebote1Abajo(bolaAzul, ejeX, ejeY) {
    console.log('x=' + ejeX + ' ejeY=' + ejeY);
    var player2D = player2.getBoundingClientRect();
    var p2Ancho = player2D.width;
    var p2Alto = player2D.height;

    var bolaD = elemento.getBoundingClientRect();
    var bolaAncho = bolaD.width;
    var bolaAlto = bolaD.height;

    var bajando = true; // Bandera para indicar si el objeto está subiendo o bajando
    

    var interval = setInterval(function () {
        var rect2 = player2.getBoundingClientRect();
        var p2X = rect2.left;
        var p2Y = rect2.top;
        if (bajando) {
            if (ejeY < 640 && ejeX < 1120) {
                ejeX += 5;
                ejeY += 5;
                bolaAzul.style.left = ejeX + 'px';
                bolaAzul.style.top = ejeY + 'px';
                bolaAzul.style.transition = 'transform 0.3s linear';
            } else {
                bajando = false; // Cambia la bandera cuando alcanza el límite superior
            }
        } else {
            if (ejeX < 1120 && ejeY > 132) {
                ejeX += 5;
                ejeY -= 5;
                bolaAzul.style.left = ejeX + 'px';
                bolaAzul.style.top = ejeY + 'px';
                bolaAzul.style.transition = 'transform 0.3s linear';
            } else if (ejeY <= 132 && ejeX < 1120) {
                bajando = true;
            } else {
                // Detén el intervalo cuando se alcanza el límite inferior
                clearInterval(interval);
                bolaAzul.remove();
            }
        }
        // Verificar la colisión en cada iteración del intervalo
        if (
            posX < p2X + p2Ancho &&
            posX + bolaAncho > p2X &&
            posY < p2Y + p2Alto &&
            posY + bolaAlto > p2Y 
        ) {
            colision = true;
            console.log('BANDERA BANDERITAAAA');
            // Realiza acciones de colisión aquí
            handleCollision(bolaAzul, interval);
        }
    }, 10); // Ajusta el retraso según sea necesario
    desaparece = false; // Reiniciar el manejo de colisiones
    colision = false; // Reiniciar el manejo de colisiones
}

// Función para manejar la colisión
function handleCollision(bolaAzul, interval) {
    setTimeout(function () {
        fadeOutBola(bolaAzul);
    }, 1000); // Ajusta el tiempo para sincronizar con la transición de opacidad

    contador2--;
    quitaVida();

    if (contador2 === 0) {
        window.location.href = './fin_partida.html';
        var video = document.getElementById('mivideo');
        video.play();
    }

    vida2.innerText = contador2;
    console.group('checkpoint');
    clearInterval(interval); // Detener el intervalo cuando haya una colisión
    bolaAzul.remove();
}


function quitaVida(){
    var barra2 = document.getElementById("vida2");
    var barritas2 = barra2.querySelectorAll('div');
    var arrayBarra2 = Array.from(barritas2);
    var i = arrayBarra2.length-1;
    var color;

    switch(i){
        case 1:
            color = "rgb(255, 79, 79)";
            break;
        case 2:
            color = "rgb(229, 153, 53)";
            break;
        case 3:
            color = "rgb(229, 211, 53)";
            break;
        case 4:
            color = "rgb(212, 255, 142)";
            break;
        case 5:
            color="rgb(181, 216, 94)"
            break;
        default:
            color="#69a469";
            break;
    }
    
    arrayBarra2.forEach(function(elemento) {
        elemento.style.backgroundColor=color;
    });
    eliminarElemento(arrayBarra2[i]);
    i--;

}

