

//Message first login
function checkInsertPatern(){
	blackberry.ui.dialog.standardAskAsync("In your first login, you need insert a pattern, click help to see how insert a pattern", blackberry.ui.dialog.D_OK, null, {
			title: "Welcome to the Trunkeys!"
		});
}

//Teste add matriz

function localStorageMatriz(){
	var matriz = new Array();
	var ele1 = new Array();
	var ele2 = new Array();
	var ele3 = new Array();

	ele1[0] = 1;
	ele1[1] = "Bank";
	ele1[2] = "keyBank";

	ele2[0] = 2;
	ele2[1] = "Facebook";
	ele2[2] = "";

	ele3[0] = 3;
	ele3[1] = "Gmail";
	ele3[2] = "keyGmail";

	matriz[0] = ele1;
	matriz[1] = ele2;
	matriz[2] = ele3;

	localStorage.setItem('BDKEYS', matriz);
	var ret = localStorage.getItem('BDKEYS');
	alert(toMatriz(ret));
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


