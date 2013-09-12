

function passwordStrength(password)
{
	var desc = new Array();
	desc[0] = "Very Weak";
	desc[1] = "Weak";
	desc[2] = "Better";
	desc[3] = "Medium";
	desc[4] = "Strong";
	desc[5] = "Strongest";

	var score   = 0;

	//if password bigger than 6 give 1 point
	if (password.length > 6) score++;

	//if password has both lower and uppercase characters give 1 point	
	if ( ( password.match(/[a-z]/) ) && ( password.match(/[A-Z]/) ) ) score++;

	//if password has at least one number give 1 point
	if (password.match(/\d+/)) score++;

	//if password has at least one special caracther give 1 point
	if ( password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) )	score++;

	//if password bigger than 12 give another 1 point
	if (password.length > 12) score++;

	 document.getElementById("passwordDescription").innerHTML = desc[score];
	 document.getElementById("passwordStrength").className = "strength" + score;
	 document.getElementById("passwordDescription").className = "strengthlabel" + score;
	 document.getElementById('password').value = password;
}


//Message first login
function checkInsertPatern(){
	blackberry.ui.dialog.standardAskAsync("In your first login, you need insert a pattern, click help to see how insert a pattern", blackberry.ui.dialog.D_OK, null, {
			title: "Welcome to the Trunkeys!"
		});
}



function toMatriz(array){
	array = array.split(',');
	i = 0;
	index = 0;
	resindex = 0;
	var aux = new Array();
	var res = new Array();
	while(i < array.length){
		aux[index] = array[i];
		index++;
		if((i+1)%3==0){
			res[resindex] = aux;
			resindex++;
			aux = [];
			index = 0;
		}
		i++;
	}
	return res;
}

//Teste add matriz

function localStorageMatriz(){
	var matriz = new Array();
	var ele1 = new Array();
	var ele2 = new Array();
	var ele3 = new Array();

	ele1[0] = 'Bank';
	ele1[1] = "JhoabMendes";
	ele1[2] = "keyBank";

	ele2[0] = "Facebook";
	ele2[1] = "Joabe-.com@gmail.com";
	ele2[2] = "";

	ele3[0] = "Gmail";
	ele3[1] = "joab.mendes.r2d2@gmail.com";
	ele3[2] = "keyGmail";

	matriz[0] = ele1;
	matriz[1] = ele2;
	matriz[2] = ele3;

	localStorage.setItem('BDKEYS', matriz);
	var ret = localStorage.getItem('BDKEYS');
	alert(toMatriz(ret));
}

function insertMatriz(name, nick, password, matriz){
	var aux = new Array();
	aux[0] = name;
	aux[1] = nick;
	aux[2] = password;
	matriz.push(aux);
	return matriz;
}


function doSave(){
	
	
	var name = document.getElementById('name').value;
	var nick = document.getElementById('nick').value;
	var password = document.getElementById('password').value;
	
	var bd = toMatriz(localStorage.getItem('BDKEYS'));

	bd = insertMatriz(name, nick, password, bd);

	localStorage.setItem('BDKEYS', bd);
}


