
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
	if(localStorage.getItem('setQuestion') === 'readyToSet' || localStorage.getItem('setQuestion') == null){
		blackberry.ui.dialog.standardAskAsync("In your first login you need to follow the steps: 1. Create a pattern key to login your app. 2. Save a security question and your respective answer. ", blackberry.ui.dialog.D_OK, null, {
			title: "Welcome to the Trunkeys!"
		});
	}else{
		blackberry.ui.dialog.standardAskAsync("You need to follow the steps: 1. Create a pattern key to login your app.", blackberry.ui.dialog.D_OK, null, {
			title: "Patern Reseted"
		});
	}
	
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
	localStorage.setItem('setQuestion', 'readyToSet');
}

function saveQuestion(){
	var sQuestion = document.getElementById('secQuestion').value;
	var sAnswer = document.getElementById('secAnswer').value;
	if(sQuestion != "" && sAnswer != ""){
		localStorage.setItem('securityQuestion', sQuestion);
		localStorage.setItem('securityAnswer', sAnswer);
		localStorage.setItem('setQuestion', 'seted');
		try{
			blackberry.ui.toast.show("Security question saved!");
		}catch (e) {
			console.log(e);
		}
		bb.pushScreen('main.html', 'main');
	}else{
		blackberry.ui.dialog.standardAskAsync("You need to insert the security question and your respective answer.", blackberry.ui.dialog.D_OK, null, {
			title: "Ops!"
		});
	}

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
			blackberry.ui.toast.show("Password saved with success!");
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
			blackberry.ui.toast.show("Password updated with success!");
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
			blackberry.ui.toast.show("Password deleted with success!");
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

//reload app by index
function popScreenIndex(){
	window.open('index.html', '_self');
}

//------------------Settings Functions------------------

//-----------------------clear function------------------
function clearAllPasswordsConfirm(selection){
	if(selection.return === 'Ok' || selection == 0){
		try{
			localStorage.setItem('BDKEYS', '');
			blackberry.ui.toast.show("Passwords deleted with success!");
		}catch (e) {
			console.log(e);
		}
	}
}

function clearAllPasswords(){
	blackberry.ui.dialog.standardAskAsync("Are you sure to delete all the passwords?", blackberry.ui.dialog.D_OK_CANCEL, clearAllPasswordsConfirm, {title : "Are you sure?"});
}

//------------------reset Pattern function------------------

function resetPatternSettingConfirm(selection){
	if(selection.return === 'Ok' || selection == 0){
		try{
			localStorage.removeItem("paternseted");
			localStorage.removeItem("patern");
			localStorage.setItem('resetToken', 'ok');
			blackberry.ui.toast.show("Pattern reseted with success!");
		}catch (e) {
			console.log(e);
		}
		popScreenIndex();
	}
}

function resetPatternSetting(){
	blackberry.ui.dialog.standardAskAsync("Are you sure to reset the pattern key?", blackberry.ui.dialog.D_OK_CANCEL, resetPatternSettingConfirm, {title : "Are you sure?"});
}

//------------reset security question functions----------

function resetQuestionSettingConfirm(selection){
	if(selection.return === 'Ok' || selection == 0){
		try{
			localStorage.setItem('setQuestion', 'readyToSet');
			localStorage.removeItem("securityAnswer");
			localStorage.removeItem("securityQuestion");
			blackberry.ui.toast.show("Security Question reseted with success!");
		}catch (e) {
			console.log(e);
		}
		popScreenIndex();
	}
}

function resetQuestionSetting(){
	blackberry.ui.dialog.standardAskAsync("Are you sure to reset the security question?", blackberry.ui.dialog.D_OK_CANCEL, resetQuestionSettingConfirm, {title : "Are you sure?"});
}

//------------------reset app functions------------------

function resetAppConfirm(selection){
	if(selection.return === 'Ok' || selection == 0){
		try{
			localStorage.removeItem("paternseted");
			localStorage.removeItem("patern");

			localStorage.setItem("maxid", 0);
			localStorage.removeItem('BDKEYS');
			localStorage.removeItem('resetToken');

			localStorage.setItem('setQuestion', 'readyToSet');
			localStorage.removeItem("securityAnswer");
			localStorage.removeItem("securityQuestion");

			blackberry.ui.toast.show("App reseted with success!");
		}catch (e) {
			console.log(e);
		}
		popScreenIndex();
	}
}

function resetApp(){
	blackberry.ui.dialog.standardAskAsync("Are you sure to reset the App?", blackberry.ui.dialog.D_OK_CANCEL, resetAppConfirm, {title : "Are you sure?"});
}

//------------------------------------------------------

function pushForgot(){
	if(localStorage.getItem('setQuestion') === 'readyToSet' || localStorage.getItem('setQuestion') == null){
		blackberry.ui.dialog.standardAskAsync("To recover the pattern key you need to insert the security question.", blackberry.ui.dialog.D_OK, null, {
			title: "Ops!"
		})
	}else if(localStorage.getItem('setQuestion') == 'seted'){
		document.getElementById("content").style.display = "none";
		bb.pushScreen('forgot.html', 'forgot');
	}
}

function RecoverPattern(){
	var answer = document.getElementById('answerforgot').value;
	if(localStorage.getItem('securityAnswer') === answer){
		try{
			localStorage.removeItem("paternseted");
			localStorage.removeItem("patern");
			localStorage.setItem('resetToken', 'ok');
			blackberry.ui.toast.show("Right Answer! The pattern key has been reseted.");
		}catch (e) {
			console.log(e);
		}
		popScreenIndex();
	}else{
		blackberry.ui.dialog.standardAskAsync("Wrong answer, check your question and answer with right text.", blackberry.ui.dialog.D_OK, null, {
			title: "Ops!"
		});
	}
}