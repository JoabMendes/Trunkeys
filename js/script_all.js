
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
	 document.getElementById('pass').value = password;
}


//Message first login
function checkInsertPatern(){
	blackberry.ui.dialog.standardAskAsync("In your first login, you need insert a pattern, click in help to see how insert a pattern", blackberry.ui.dialog.D_OK, null, {
			title: "Welcome to the Trunkeys!"
		});
}


//Change localStorage string BD to a vetor
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
	localStorage.setItem('maxid', parseInt(localStorage.getItem('maxid'))+1);
	aux[0] = localStorage.getItem('maxid')
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
		try{
			blackberry.ui.toast.show("Password saved with sucess!");
		}catch (e) {
			console.log(e);
		}
		bb.pushScreen('main.html', 'main');
	}else{
		blackberry.ui.dialog.standardAskAsync("You need to insert at least the fields: 'Name' and 'Password'.", blackberry.ui.dialog.D_OK, null, {
			title: "Ops!"
		});
	}
	
}

function updateMatriz(id, name, nick, password, bd){
	var i = 0;
	while(i < bd.length){
		if(bd[i][0] === id){
			bd[i][1] = name;
			bd[i][2] = nick;
			bd[i][3] = password;
		}
		i++;
	}
	return bd;
}

function doUpdate(id_update){
	var name = document.getElementById('name').value;
	var nick = document.getElementById('nick').value;
	var password = document.getElementById('password').value;
	if(name != "" && password != ""){
		if(nick == ""){
			nick = name;
		}
		var bd = toMatriz(localStorage.getItem('BDKEYS'));
		bd = updateMatriz(id_update, name, nick, password, bd);
		localStorage.setItem('BDKEYS', bd);
		try{
			blackberry.ui.toast.show("Password updated with sucess!");
		}catch (e) {
			console.log(e);
		}
		bb.pushScreen('main.html', 'main');
	}else{
		blackberry.ui.dialog.standardAskAsync("You need to insert at least the fields: 'Name' and 'Password'.", blackberry.ui.dialog.D_OK, null, {
			title: "Ops!"
		});
	}

}

function pushByList(rowid, rowname, rownick, rowpass){
	bb.pushScreen('update.html', 'update', {row_id: rowid, row_name: rowname, row_nick: rownick, row_pass: rowpass});
}


/*-------------------DELETE FUNTION----------------------*/

var id_del = null;

//ASK IF ARE SURE ABOUT THE DELETE
function sureFunction(){
	blackberry.ui.dialog.standardAskAsync("Are you sure to delete this password?", blackberry.ui.dialog.D_OK_CANCEL, dialogBack, {title : "Are you sure?"});
}

//IF ASK ABOUT DELETE IS OK, DELE THE INFO BY ID_DEL
function dialogBack(selection){
  console.log("dialogBack called. selection: "+selection.return);
  if(selection.return === 'Ok' || selection == 0){
  		var bd = toMatriz(localStorage.getItem('BDKEYS'));
		var i = 0;
		while(i < bd.length){
			if(parseInt(bd[i][0]) == id_del){
				bd.splice(i, 1);
			}
			i++;
		}
		localStorage.setItem('BDKEYS', bd);
		try{
			blackberry.ui.toast.show("Password deleted with sucess!");
		}catch (e) {
			console.log(e);
		}
		bb.pushScreen('main.html', 'main');
  }
}

//CALL THE ASK AND SET THE ID TO DELETE
function doDelete(id_delete){
	id_del = parseInt(id_delete);
	if(id_del != null){
		sureFunction();
		console.log("id inserted, sure called with var ok.");
	}
}

/*--------------------------------------------------------*/