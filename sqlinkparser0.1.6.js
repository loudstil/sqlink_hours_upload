function buildInputWindow( ){

var wrapper = document.createElement('div');
var innerDiv = document.createElement('div');
var inpt = document.createElement('textarea');
var ok = document.createElement('input');
var cncl = document.createElement('input');
var tbl = document.createElement('table');
var r1 = document.createElement('tr');
var r2 = document.createElement('tr');
var r3 = document.createElement('tr');
var c1 = document.createElement('td');
var c2 = document.createElement('td');
var c3 = document.createElement('td');
var c4 = document.createElement('td');
var c5 = document.createElement('td');


// Creating the attributes for the elements
wrapper.setAttribute('style', 'position: absolute; 	left: 20px;	top: 80px;	width: 100%;	height: 500px;');
wrapper.setAttribute('id', 'wrapperDiv');

innerDiv.setAttribute('style', 'position: relative;  margin: 0 auto; width: 450px; height: auto; z-index: 9999999; background-color: #FFF; padding: 10px; border: 1px solid #ABABAB;');

inpt.setAttribute('rows','20');
inpt.setAttribute('cols','50');
inpt.setAttribute('id','inpt');
inpt.setAttribute('style','resize:none;');

c1.innerHTML = '<img src="https://on-time.malam.com/Timesheet2Root/faces/jsps/general/showImage.jspx?p_index_num=1780" border="0" height="20px">';
c2.innerHTML = '';
c2.setAttribute('align','left');

r1.appendChild(c1);
r1.appendChild(c2);

r2.setAttribute('colspan','2');
c3.appendChild(inpt); //adding the textarea
r2.appendChild(c3);

ok.setAttribute('type','button');
ok.setAttribute('value','Go');
ok.setAttribute('style','style="background-color: blue; color: white; width: 100%"');
ok.setAttribute('align','middle');
ok.setAttribute('onclick','uploadData(\'inpt\')');

cncl.setAttribute('type','button');
cncl.setAttribute('value','Cancel');
cncl.setAttribute('style','style="background-color: orange; color: white; width: 100%"');
cncl.setAttribute('align','middle');
cncl.setAttribute('onclick','document.body.removeChild(document.getElementById(\'wrapperDiv\'))');

c4.appendChild(cncl);
c5.appendChild(ok);
r3.appendChild(c4);
r3.appendChild(c5);

tbl.appendChild(r1);
tbl.appendChild(r2);
tbl.appendChild(r3);

innerDiv.appendChild(tbl);
	
wrapper.appendChild(innerDiv);
	
document.getElementsByTagName("body")[0].appendChild(wrapper);

}


function msg(object_id)
{
	var the_obj = document.getElementById(object_id);
	var file_name = the_obj.value;

	//file_name = file_name.replace(/\\/g,"/");
	alert(file_name);
}

function foo(){
	var t = document.getElementById("txt");
	var c = document.getElementById("filename");
	
	t.innerHTML = c.value;
}

function uploadData(objectName){

	var valuesArr=document.getElementById(objectName).value.split(/\n/);
	var tuple = new Array(30),tmp,  //holds each record
			ext,	// exit_time
			entr,	// enter_time
			dt;	// date
			
	var target = getElementByTheClass('table','af_table_data-table af_table_data-table-VH-lines');
			
	var  cl, rw, tbl;
	var tblCreated = false;
	 
	var count = 0;
	
	var curCell;
	 
			
	//creating an array of the values		
	for (var i in valuesArr) { 
	 
		if ( !valuesArr[i] ) break;
		
		if( !tblCreated) {
			tbl = document.createElement('table');
			tblCreated = true;
		}
		
		tmp = valuesArr[i].split(','); 
		
		//ext 	= tuple[0]; 
		//entr 	= tuple[1]; 
		//dt 	= tuple[2]; 
		
		tuple[i] = new Array(3);
		
		tuple[i][0] = tmp[0]; //exit
		tuple[i][1] = tmp[1]; //enter
		tuple[i][2] = tmp[2]; //date
		
	}
	
	for( var i in valuesArr ) {
		//pt1:dataTable:0:clockInDate::content
		curCell = document.getElementById('pt1:dataTable:' + i + ':clockInDate::content');
		
		if(curCell == null) break;
		
		if(curCell.value == tuple[count][2]) {
			document.getElementById('pt1:dataTable:' + i + ':clockInTime::content').value = tuple[i][1];
			document.getElementById('pt1:dataTable:' + i + ':clockOutTime::content').value = tuple[i][0];
			count++;
		}
		
	}
	
	
	//document.getElementById("appendTable").appendChild(tbl);
	document.body.removeChild(document.getElementById('wrapperDiv'));
}


function foo3(){
	alert('Success!!');
}

function openMinWindow(){

	//adding the input window to the top of the body tag
	document.getElementsByTagName("body")[0].appendChild();
}

function getElementByTheClass(elementName, className){
	
	var elems = document.getElementsByTagName(elementName);
	var matchClass = className;
	
	
	 for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')  > -1) {
           return elems[i];
        }
    }
}
