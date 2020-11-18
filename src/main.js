(function () {

    function convertPeriod(mil){
        const min = Math.floor(mil /  60000);
        const sec = Math.floor((mil / 60000) / 1000);
        return `${min}m e ${sec}s`
    }

    function renderGarage(){
        const garage = getGarage();
        document.querySelector('#garage').innerHTML = "";
        garage.forEach(c => addCarToGarage(c));
    }

    function addCarToGarage(car){
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${car.name}</td>
            <td>${car.licence}</td>
            <td data-time="${car.time}">${new Date (car.time)
                .toLocaleTimeString("pt-BR",{
                    hour: "numeric" , minute: "numeric"
                }
                )}</td>
            <td>
                <button class="delete">x</button>
            </td>
        `;  document.querySelector('#garage').appendChild(row);

    };

    function checkOut(info){

        let period = new Date() - new Date(info[2].dataset.time);
        period = convertPeriod(period)
        const licence = info[1].textContent;
        const msg = `${info[0].textContent} DE PLACA: ${licence} permaneceu estacionado por ${period}. Deseja encerrar?`;

        if(!confirm(msg)) return;

        const garage = getGarage().filter(c => c.licence !== licence);
        localStorage.garage = JSON.stringify(garage);

        renderGarage();
        
    }

    const getGarage = () =>  localStorage.garage ? JSON.parse(localStorage.garage) : [];
    
    renderGarage();
    document.querySelector('#send').addEventListener("click" , e => { //selecionando o id send "do botao"
    const name = document.querySelector("#name").value //selecionando o name -> o .value traz so o valor e nao o input interio
    const licence = document.querySelector("#licence").value

    if(!name || !licence){ //verificando os campos
        alert("Preencha todos os campos")
        return;
    }

    const car = { name , licence , time : new Date()} //colocando as variaveis car e licnce no objeto
    const garage = getGarage();
    garage.push(car);//enviando os dados para o array car

    localStorage.garage = JSON.stringify(garage); //salvando no localstorage

    addCarToGarage(car);

    document.querySelector("#name").value = ''; // zerando os campos ao adicionar uma informaçao
    document.querySelector("#licence").value = '';

});

    document.querySelector("#garage").addEventListener("click", e => {
    if(e.target.className = "delete")
    checkOut(e.target.parentElement.parentElement.cells); //target qual o item selecionado. O parent é o pai - elemento pai
})
})();