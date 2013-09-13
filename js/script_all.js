
//Calcule the password strength
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


//Change localstorage string BD to a vetor
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
		if((i+1)%4==0){
			res[resindex] = aux;
			resindex++;
			aux = [];
			index = 0;
		}
		i++;
	}
	return res;
}


//Insert a first example in matriz BD
function firstLogin(){
	var matriz = new Array();
	var example = new Array();

	localStorage.setItem('maxid', 0);
	example[0] = 0;
	example[1] = 'Example';
	example[2] = "NickExample";
	example[3] = "#Ex4mplePa55word#";

	matriz[0] = example;
	localStorage.setItem('BDKEYS', matriz);
}

function insertMatriz(name, nick, password, matriz){
	var aux = new Array();
	localstorage.setItem('maxid', parseInt(localstorage.getItem('maxid'))+1);
	aux[0] = localstorage.getItem('maxid')
	aux[1] = name;
	aux[2] = nick;
	aux[3] = password;
	matriz.push(aux);
	return matriz;
}


function doSave(){
	
	var name = document.getElementById('name').value;
	var nick = document.getElementById('nick').value;
	var password = document.getElementById('password').value;
	if(name != "" && password != ""){
		if(nick == ""){
			nick = name;
		}
		var bd = toMatriz(localStorage.getItem('BDKEYS'));
		bd = insertMatriz(name, nick, password, bd);
		localStorage.setItem('BDKEYS', bd);
		blackberry.ui.dialog.standardAskAsync("Password saved with sucess!", blackberry.ui.dialog.D_OK, bb.pushScreen('main.html', 'main'), {
			title: "Ok!"
		});
	}else{
		blackberry.ui.dialog.standardAskAsync("You need to insert at least the fields: 'Name' and 'Password'.", blackberry.ui.dialog.D_OK, null, {
			title: "Ops!"
		});
	}
	
}

function pushByList(fix_id){
	bb.pushScreen('update.html', 'update', {bd_id: fix_id});
}
