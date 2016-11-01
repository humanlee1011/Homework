// hw: week5 calculator
// 15331169 lixiaoyun 
// last edited: 2016-10-03

var Input = "";
var Exp = "";
var ans = "";
var Mem = 0;
var operflag = false;//true:last input is operator
var flag = false;//true: last input is cal's result
var bracketflag = 0;
var f1 = false;
window.onload = function() {
	buttonDisabled(true);
	document.getElementById("keyboard").addEventListener("click", function(e) {
		var tar = e.target;
		if (tar.className == "Memory") {
			memoryFunc(tar);
			operflag =false;
		}
		else if (tar.className == "num") {
			if (!flag) {
				Input += tar.value;
			}
			else {
				Input = tar.value;
				Exp = "";
				ans = "";
			}
			operflag = false;
			flag = false;
			refresh();
		}
		else if (tar.className == "operator"){
			flag = false;
			operFunc(tar);
		}
		else if (tar.className == "bracket") {
			bracketFunc(tar);
		}
		else if (tar.id == "clear-all") {
			Input = "";
			if (flag) {
				Exp = "";
				ans = "";   
			}
			operflag =false;
			refresh();		
		}	
		else if (tar.id == "clear") {
			Input = "";
			Exp = "";
			ans = "";
			operflag = false;
			refresh();
		}
		else if (tar.id == "delete") {	
			Input = Input.slice(0, Input.length - 1);
			operflag = false;
			refresh();
		}
		else if (tar.id == "equivalence") {
			Exp += Input;
			ans += Input;
			Cal();
			operflag = false;
		}
		else if (tar.id == "shift") {
			shift = !shift;
			refresh();
		}
	}); 
}

function refresh() {
	if (Input) {
		if (Input.length > 26) 
			document.getElementById("InputField").innerHTML = "Overflow";
		else 
			document.getElementById("InputField").innerHTML = Input;
	}
	else  
		document.getElementById("InputField").innerHTML = "0";

	if (Exp) {
		if (Exp.length > 26)
			document.getElementById("ExpressionField").innerHTML = "Overflow";
		else 
			document.getElementById("ExpressionField").innerHTML = Exp;
	}
	else 
		document.getElementById("ExpressionField").innerHTML = "";
}

function Cal() {
	try {
	    eval(ans);
	} catch (e) {
    	if (e instanceof SyntaxError || e instanceof ReferenceError) {
    		alert("Invalid Expression!");
			document.getElementById("InputField").innerHTML = "Error!";
			ans = "";
			Exp = "";
			Input = "";
			return;
		}
		else 
			alert(e);
	}
	document.getElementById("InputField").innerHTML = eval(ans);
	document.getElementById("ExpressionField").innerHTML = "";
	Exp = ans = eval(ans);
	Input = "";
	flag = true;
}

function memoryFunc(tar) {
	if (tar.id == "MC") {
		Mem = 0;
		buttonDisabled(true);
	}
	else if (tar.id == "MR") {
		Input = Mem.toString();
		flag = true;
		document.getElementById("InputField").innerHTML = Input;
	}
	else if (tar.id == "M+") {
		buttonDisabled(false);
		Mem += Number(Input);
		flag = true;
	}
	else if (tar.id == "M-") {
		buttonDisabled(false);
		Mem -= Number(Input);
		flag = true;
	}
	else if (tar.id == "MS") {
		buttonDisabled(false);
		if (Input)
			Mem = Number(Input);
		else 
			Mem = Number(ans);
		flag = true;
	}
}

function bracketFunc(tar) {
	if (tar.value == "(") {
		bracketflag++;
	}
	else if (tar.value == ")"){
		bracketflag--;
	}
	if (flag) {
		Exp = tar.value;
		ans = tar.value;
	}
	else {
		Exp += Input;
		ans += Input;
		Exp += tar.value;
		ans += tar.value;
	}
	Input = "";
	flag = false;
	refresh();
}

function buttonDisabled(temp) {
	document.getElementById("MC").disabled = temp;
	document.getElementById("MR").disabled = temp;
}

function operFunc(tar) {
	if (tar.id == "pi") {
		Input = Math.PI;
		flag = true;
		refresh();
	}
	else if (tar.value == "negate") {
		if (Input)
			Input *= "-1";
		else  
			Input = ans * "-1";
		refresh();
	}
	else if (tar.id == "sqr") {
		if (!Input) {
			Input = ans;
			Exp = ans = "";
		}
		Exp += "sqrt(" + Input + ")";
		Input = Math.sqrt(Input);
		ans += Input;
		flag = true;
		f1 = true;
		refresh();
	}	
	else if (tar.id == "square") {
		if (!Input){
			Input = ans;
			Exp = ans = "";
		}
		Exp += "sqr(" + Input + ")";
		Input = Math.pow(Input, 2);
		ans += Input;
		flag = true;
		f1 = true;
		refresh();
	}
	else if (tar.id == "third") {
		if (!Input) {
			Input = ans;
			Exp = ans = "";
		}
		Exp += "cube(" + Input + ")";
		Input = Math.pow(Input, 3);
		ans += Input;
		flag = true;
		f1 = true;
		refresh();
	}
	else if (tar.id == "Frac") {
		if (!Input) {
			Input = ans;
			Exp = ans = "";
		}
		Exp += "1/" + Input;
		Input = 1 / Input;
		ans += Input;
		flag = true;
		f1 = true;
		refresh();
	}
	else if (tar.id == "e"){
		Input = Math.E;
		flag = true;
		refresh();
	}
	else {
		if (operflag) {
			Exp = Exp.slice(0, Exp.length - 1) + tar.value;
			ans = ans.slice(0, ans.length - 1) + tar.value;
			refresh();
		}
		else {
			operflag = true;
			//check if the input is number
			if (!f1) {
				Exp += Input;
				ans += Input;
			}
			else 
				f1 = false;	
			if (!bracketflag)
				Input = eval(ans);
			Exp += tar.value;
			ans += tar.value;
			refresh();
			Input = "";
		}
		operflag = true;
	}
}