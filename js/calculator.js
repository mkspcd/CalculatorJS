/*
Placeholders pour les champs qui affichent l'operation et le resultat.
La variable 'visualOperation' est une chaine de caractères qui sera affichée à l'utilisateur, en haut de la calculatrice.
La variable 'operation' est ce qui sera evalué avec la fonction eval()
On a besoin de les stocker dans des variables différentes car les signes affichés sont différents des signent qui servent à évaluer (le signe diviser '÷' par exemple)
*/
var visualOperation = document.getElementById("calculator-screen-operation");
visualOperation.innerHTML = "0";
var operation = "";

/* Le resultat qui sera affiché sur l'ecran de la calculatrice */
var result = document.getElementById("calculator-screen-result");
result.innerHTML = "0";

/* On reset la calculatrice quand l'utilisateur clique sur le resultat */
result.onclick = function() { clear(); };

/* On stocke certains element (les boutons des operateurs) dans des variables  */
var divide = document.getElementById("divide");
var multiply = document.getElementById("multiply");
var minus = document.getElementById("minus");
var plus = document.getElementById("plus");

/* Adding corresponding events when the user clicks an element */
divide.onclick = function() {
	if (endsWithOperator()) {
		visualOperation.innerHTML = visualOperation.innerHTML.substring(0, visualOperation.innerHTML.length - 1) + "÷";
		operation = operation.substring(0, operation.length - 1) + "/";
	} else {
		visualOperation.innerHTML += "÷";
		operation += "/";
	}
};

multiply.onclick = function() {
	if (endsWithOperator()) {
		visualOperation.innerHTML = visualOperation.innerHTML.substring(0, visualOperation.innerHTML.length - 1) + "×";
		operation = operation.substring(0, operation.length - 1) + "*";
	} else {
		visualOperation.innerHTML += "×";
		operation += "*";
	}
};

minus.onclick = function() {
	if (endsWithOperator()) {
		visualOperation.innerHTML = visualOperation.innerHTML.substring(0, visualOperation.innerHTML.length - 1) + "–";
		operation = operation.substring(0, operation.length - 1) + "-";
	} else {
		visualOperation.innerHTML += "–";
		operation += "-";
	}
};

plus.onclick = function() {
	if (endsWithOperator()) {
		visualOperation.innerHTML = visualOperation.innerHTML.substring(0, visualOperation.innerHTML.length - 1) + "+";
		operation = operation.substring(0, operation.length - 1) + "+";
	} else {
		visualOperation.innerHTML += "+";
		operation += "+";
	}
};

/*
Quand l'utilisateur clique sur un chiffre, on ajoute ce chiffre
*/
document.getElementById("num0").onclick = function() { concatNumber(0); };
document.getElementById("num1").onclick = function() { concatNumber(1); };
document.getElementById("num2").onclick = function() { concatNumber(2); };
document.getElementById("num3").onclick = function() { concatNumber(3); };
document.getElementById("num4").onclick = function() { concatNumber(4); };
document.getElementById("num5").onclick = function() { concatNumber(5); };
document.getElementById("num6").onclick = function() { concatNumber(6); };
document.getElementById("num7").onclick = function() { concatNumber(7); };
document.getElementById("num8").onclick = function() { concatNumber(8); };
document.getElementById("num9").onclick = function() { concatNumber(9); };

/*
Quand l'utilisateur clique sur le point '.' : 
	- si le signe precedent est un operateur, on ajoute un zero devant le point,
	- si les dernier nombre de la chaine est deja decimal, on ne fait rien
	- sinon, on ajoute le point
*/
document.getElementById("dot").onclick = function() {
	if ( endsWithOperator() ) {
		visualOperation.innerHTML += "0.";
		operation += "0.";
		evaluate();
	} else if ( !lastNumberisDecimal() ) {
		visualOperation.innerHTML += ".";
		operation += ".";
		evaluate();
	}	
};

/* Ajout des chiffres cliqués à la chaine representant l'operation. */
function concatNumber(x) {
	if ( !isTooLong() ) {
		updateVisualOperation(x);
		operation += x;
		evaluate();
	}
}

function evaluate() {
	result.innerHTML = eval(operation);
	result.innerHTML = result.innerHTML.substring(0, 9);
}

function updateVisualOperation(x) {
	visualOperation.innerHTML === "0" ? visualOperation.innerHTML = x : visualOperation.innerHTML += x;
}

/* Reset total de la calculatrice */
function clear() {
	visualOperation.innerHTML = "0";
	operation = "";
	result.innerHTML = "0";
}

/* On limite l'operation à 12 caractères */
function isTooLong() {
	if (visualOperation.innerHTML.length > 12) {
		return true;
	}
	return false;
}

/* Fonction qui retourne true si le dernier caractere de 'operation' est un operateur */
function endsWithOperator() {
	if (operation.endsWith("/") || operation.endsWith("*") || operation.endsWith("-") || operation.endsWith("+")) {
		return true;
	}
	return false;
}

/* Fonction qui retourne true si le dernier nombre de 'operation' est decimal (et contient donc dejà un '.') */
function lastNumberisDecimal() {
	if (operation.indexOf(".") != -1) {
		/*
		Si 'operation' contient deja un '.', on verifie si celui-ci se trouve après le dernier operateur utilisé
		*/
		if (operation.lastIndexOf("/") < operation.lastIndexOf(".") || 
			operation.lastIndexOf("*") < operation.lastIndexOf(".") || 
			operation.lastIndexOf("-") < operation.lastIndexOf(".") || 
			operation.lastIndexOf("+") < operation.lastIndexOf(".") ) {
			return true;
		}
	}
	return false;
}

/*
Gestion du bouton 'C' pour corriger la frappe
*/
document.getElementById("correct").onclick = function() {
	visualOperation.innerHTML = visualOperation.innerHTML.substring(0, visualOperation.innerHTML.length - 1);
	operation = operation.substring(0, operation.length - 1);
	
	/* Si l'utilisateur appuie sur 'C' pour enlever tous les caracteres, on reset la calculatrice */
	if (visualOperation.length == 0 || operation.length == 0) {
		clear();
	}
	
	/*
	Après chaque appuie sur 'C', on met à jour le result :
		- si operation ne se termine pas par un operateur, on evalue toute la chaine, 
		- si a la suite d'un appuie sur 'C' le dernier caracere est un operateur, on evalue operation sans ce dernier operateur
	*/
	if (operation.length != 0 && !endsWithOperator()) {
		evaluate();
	}
	
	if (endsWithOperator()) {
		result.innerHTML = eval( operation.substring(0, operation.length - 1) );
	}
}






