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

var num0 = document.getElementById("num0");
var num1 = document.getElementById("num1");
var num2 = document.getElementById("num2");
var num3 = document.getElementById("num3");
var num4 = document.getElementById("num4");
var num5 = document.getElementById("num5");
var num6 = document.getElementById("num6");
var num7 = document.getElementById("num7");
var num8 = document.getElementById("num8");
var num9 = document.getElementById("num9");
var dot = document.getElementById("dot");
var equal = document.getElementById("equal");

/*
Quand l'utilisateur clique sur un chiffree, on ajoute ce chiffre
*/
num0.onclick = function() { concatNumber(0); };
num1.onclick = function() { concatNumber(1); };
num2.onclick = function() { concatNumber(2); };
num3.onclick = function() { concatNumber(3); };
num4.onclick = function() { concatNumber(4); };
num5.onclick = function() { concatNumber(5); };
num6.onclick = function() { concatNumber(6); };
num7.onclick = function() { concatNumber(7); };
num8.onclick = function() { concatNumber(8); };
num9.onclick = function() { concatNumber(9); };

dot.onclick = function() {
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
	console.log( operation + " = " + eval(operation) );
}

function updateVisualOperation(x) {
	visualOperation.innerHTML === "0" ? visualOperation.innerHTML = x : visualOperation.innerHTML += x;
}

function updateOperation(x) {
	operation.innerHTML === "0" ? operation.innerHTML = x : operation.innerHTML += x;
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

var correct = document.getElementById("correct");
correct.onclick = function() {
	visualOperation.innerHTML = visualOperation.innerHTML.substring(0, visualOperation.innerHTML.length - 1);
	operation = operation.substring(0, operation.length - 1);
	
	if (visualOperation.length == 0 || operation.length == 0) {
		clear();
	}
	
	if (operation.length != 0) {
		evaluate();
	}
}






