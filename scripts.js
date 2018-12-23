function translates(str){
	var STR=str.toLowerCase();
	var obj={black:'Negro',
		white:'Blanco',
		yellow:'Amarillo',
		brown:'Marron',
		blond:'Rubio',
		red:'Rojo',
		blue:'Azul',
		green:'Verde',
		light:'Claro',
		fair:'Blanca',
		white:'Blanco',
		grey:'Gris',
		auburn:'Castano',
		'n/a': 'N/A',
		none: 'Sin cabello',
		gray: 'Gris',
		gold: 'Dorado'
	}
	if (STR.indexOf(',')!=-1){
		var STRSPL = STR.split(',');
		var trans='';
		for (i=0;i<STRSPL.length;i++){
		STRSPL[i] = STRSPL[i].trim();
		trans=trans+obj[STRSPL[i]]+'-';
		}
		return trans.substr(0,trans.length-1);;
	}
	if (STR.indexOf('-')!=-1){
		var STRSPL = STR.split('-');
		var trans='';
		for (i=0;i<STRSPL.length;i++){
		STRSPL[i] = STRSPL[i].trim();
		trans=trans+obj[STRSPL[i]]+'-';
		}
		return trans.substr(0,trans.length-1);
	}
	else{
    if (obj[STR]==undefined){
      return STR;
    }
    else {
		  return obj[STR];
    }
	}
}
const app = document.getElementById('root');

const logo = document.createElement('div');
logo.setAttribute('class','header');
logo.textContent = 'STAR WARS CHARACTERS';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://swapi.co/api/people/?page=1', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  data=data.results;
  if (request.status >= 200 && request.status < 400) {
    data.forEach(person => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = person.name;

      const p = document.createElement('p');
      person.mass = person.mass*2.2047;
      p.textContent = `Peso: ${person.mass.toFixed(2)}lb`;

      const p1 = document.createElement('p');
      person.height= person.height/100;
      p1.textContent = `Altura: ${person.height}m`;

      const p2 = document.createElement('p');
      if (person.gender=='male' || person.gender=='Male' || person.gender=='MALE'){
      	person.gender='Masculino';
      }
      else if (person.gender=='female' || person.gender=='Female' || person.gender=='FEMALE') {
      	person.gender='Femenino';
      }
      else if (person.gender=='n/a' || person.gender=='N/a' || person.gender=='n/A') {
      	person.gender='N/A';
      }
      p2.textContent = `Genero: ${person.gender}`;

      const p3 = document.createElement('p');
      person.eye_color = translates(person.eye_color);
      p3.textContent = `Color de ojos: ${person.eye_color}`;

      const p4 = document.createElement('p');
      person.skin_color = translates(person.skin_color);
      p4.textContent = `Tono de piel: ${person.skin_color}`;

      const p5 = document.createElement('p');
      person.hair_color = translates(person.hair_color);
      p5.textContent = `Color de cabello: ${person.hair_color}`;

      
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(p1);
      card.appendChild(p2);
      card.appendChild(p3);
      card.appendChild(p4);
      card.appendChild(p5);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();