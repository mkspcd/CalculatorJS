/*
Placeholders pour les champs qui affichent l'operation et le resultat.
La variable visualOperation est une chaine de caractères qui sera affichée à l'utilisateur, en haut de la calculatrice.
La variable operation est ce qui sera evalué avec la fonction eval()
On a besoin de les stocker dans des variables différentes car les signes affichés sont différents des signent qui servent à évaluer (le signe diviser '÷' par exemple)
*/
var visualOperation = document.getElementById("calculator-screen-operation");
visualOperation.innerHTML = "0";
var operation = "";

var result = document.getElementById("calculator-screen-result");
result.innerHTML = "0";

/* On reset la calculatrice quand l'utilisateur clique sur le resultat */
result.onclick = function() { clear(); };

var divide = document.getElementById("divide");
var multiply = document.getElementById("multiply");
var minus = document.getElementById("minus");
var plus = document.getElementById("plus");

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

document.getElementById("dot").onclick = function() {
	visualOperation.innerHTML += ".";
	operation += ".";
	evaluate();
};

function concatNumber(x) {
	updateVisualOperation(x);
	operation += x;
	evaluate();
}

function evaluate() {
	result.innerHTML = eval(operation);
	result.innerHTML = result.innerHTML.substring(0, 8);
	console.log( operation + " = " + eval(operation) );
}

function updateVisualOperation(x) {
	visualOperation.innerHTML === "0" ? visualOperation.innerHTML = x : visualOperation.innerHTML += x;
}

function clear() {
	visualOperation.innerHTML = "0";
	operation = "";
	result.innerHTML = "0";
}

function endsWithOperator() {
	if (operation.endsWith("/") || operation.endsWith("*") || operation.endsWith("-") || operation.endsWith("+")) {
		return true;
	}
	return false;
}

document.getElementById("correct").onclick = function() {
	visualOperation.innerHTML = visualOperation.innerHTML.substring(0, visualOperation.innerHTML.length - 1);
	operation = operation.substring(0, operation.length - 1);
	
	if (visualOperation.length == 0 || operation.length == 0) {
		clear();
	}
	
	if (operation.length != 0 && !endsWithOperator()) {
		evaluate();
	}
	
	if (endsWithOperator()) {
		result.innerHTML = eval( operation.substring(0, operation.length - 1) );
	}
}






