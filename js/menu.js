

//------------------MOSTRAR U OCULTAR MENU DESPLEGABLE------------------//
let btnMenu = document.getElementById("btnThemeId");
let btnArrow = document.getElementById("btnArrowId")
let dropDownMenu = document.querySelector("#themeMenuId");
let btnMisGuifos = document.getElementById("btnMisGuifosId");

const irMisGuifos = () =>{
    location.href = "./upload.html";
}

btnMisGuifos.addEventListener("click", irMisGuifos);

const showMenu = () =>{
    let status = dropDownMenu.style.display;
    if(status == "none"){
        dropDownMenu.style.display = "flex";
        document.getElementById("imgArrow").setAttribute("src", "./assets/forward.svg");
    }else{
        dropDownMenu.style.display = "none";
        document.getElementById("imgArrow").setAttribute("src", "./assets/dropdown.svg");
    }
}   

btnMenu.addEventListener("click", showMenu);
btnArrow.addEventListener("click", showMenu);

//------------------SELECCIONAR TEMAS------------------//

let btnSailorDay = document.getElementById("btnSailorDayId");
let btnSailorNight = document.getElementById("btnSailorNightId");

const showSailorDay = () =>{
    document.getElementById("styleSheet").setAttribute("href", "./styles/styles.css");
    document.getElementById("imgGuifosId").setAttribute("src", "./assets/gifOF_logo.png");

    
}

const showSailorNight = () =>{
    document.getElementById("styleSheet").setAttribute("href", "./styles/stylesNight.css");
    document.getElementById("imgGuifosId").setAttribute("src", "./assets/gifOF_logo_dark.png")
    

}

btnSailorDay.addEventListener("click", showSailorDay);
btnSailorNight.addEventListener("click", showSailorNight);
btnSailorNight.addEventListener("click", showMenu);
btnSailorDay.addEventListener("click", showMenu);


//------------------MOSTRAR U OCULTAR BUSQUEDA SUGERIDA------------------//
let search = document.getElementById("inputSearchId");
let menuAutocomplete = document.getElementById("searchAutocompleteId");
let btnBuscar = document.getElementById("btnSearchId");

function showMenuSuggestion(){
    menuAutocomplete.style.display = "block";
}

function hideSuggestionMenu(){
    menuAutocomplete.style.display = "none";
}

search.addEventListener('input', showMenuSuggestion);
search.addEventListener('click', hideSuggestionMenu);
window.addEventListener("click", hideSuggestionMenu);


//-------------------SUGGESTION -------------------//

const apiKey = "UQC4ztwZuYwvKFn6BhTHu3QfnYjwO7XR";
const endpoint = 'http://api.giphy.com/v1/gifs/search?q=';
const endpointTendency = 'http://api.giphy.com/v1/gifs/trending?limit=';


async function getGiphy(tendency){
    let responseGiphy = await fetch(endpoint + tendency + '&api_key=' + apiKey);
    let responseGiphyJson = await responseGiphy.json();

    let data = responseGiphyJson.data;
    let srcGif = data[1].images.downsized_medium.url;    
    
    // console.log(srcGif);
    return srcGif;
}     

let keyword = ["Jonathan Van Ness", "Batman", "Phoebe", "Barney Stinson"];

getGiphy(keyword[0]).then(function(resp){
    document.getElementById("gifId1").src = resp;
    document.getElementById("topGifId1").innerText = "#"+keyword[0];
})

getGiphy(keyword[1]).then(function(resp){
    document.getElementById("gifId2").src = resp;
    document.getElementById("topGifId2").innerText = "#"+keyword[1];
})

getGiphy(keyword[2]).then(function(resp){
    document.getElementById("gifId3").src = resp;
    document.getElementById("topGifId3").innerText = "#"+keyword[2];
})

getGiphy(keyword[3]).then(function(resp){
    document.getElementById("gifId4").src = resp;
    document.getElementById("topGifId4").innerText = "#"+keyword[3];
})


//-------------------TENDENCY -------------------//

let limit = 16;
let urlTendency = endpointTendency + limit + '&api_key=' + apiKey;

async function getTendencyGiphy(){
    try{
        
        
        let resp = await fetch(urlTendency);
        respTendencyJson = await resp.json();

        let dataTendency = respTendencyJson.data;

        let thumb = '';
        let srcGifLoading = './assets/cargando-loading-019.gif'
        dataTendency.forEach(dataTendency => {
            thumb += `
            <div class="cardTendency" id="cardTendency">
                <div class="containerTendency" id="containerTendencyId">
                    <img alt="Tendency" id="imgTendencyId" class="imgTendency" src=${dataTendency.images.downsized_medium.url}>
                    <div class ="gradient" id="footTendency">${dataTendency.title.substring(0 , 30)}</div>
                    <div></div>
                </div>

            </div>`
        });
    


    let divCont = document.getElementById("gifTendencyId");
    divCont.innerHTML = thumb;
    console.log(dataTendency);
    }catch(err){
        console.error("Fallo la carga desde la API.\n" + err)
    }
};

getTendencyGiphy();



//-------------------SEARCH -------------------//

//--¡¡LOCAL STORAGE - HISTORIAL DE BUSQUEDA!!--
//---------------------------------------------
//---------------------------------------------

class Search{
    constructor(date ,info){
        this.info = info;
        this.date = date;
    }
}

let arraySearch = [];

const ls_search = (val) =>{
   //LLAMO LA FUNCION DESDE SEARCHINI PASANDOLE POR PARAMETRO EL VALOR DE LA BUSQUEDA) 
    let busqueda = val;
    let fecha = Date.now();

    let elementSearch = new Search(fecha, busqueda);
    arraySearch.push(elementSearch);

    localStorage.setItem("busqueda", JSON.stringify(arraySearch));

    ls_createBtn();  
}

let btnHistory = document.getElementById("btnHistoryId");

const ls_createBtn = () =>{
    
    let arrayNew = JSON.parse(localStorage.getItem("busqueda"));
    
    let newBtn = "";
    arrayNew.forEach(e =>{
        newBtn += `<button type="button" id="btnHistoryId" class ="btnHistory">#${e.info}</button>`;
    })

    document.getElementById("historySearch").innerHTML = newBtn;

}


//---¡¡¡BUSCAMOS EL VALOR INGRESADO EN LA SECCION DE BUSQUEDA!!!---

const searchIni = () =>{
    
    document.getElementById("txtTendencyId").innerText = search.value;    
    try{
    urlTendency= endpoint  + search.value + '&api_key=' + apiKey;
    menuAutocomplete.style.display = "none";  
    
    getTendencyGiphy();
    location.href= "#txtTendencyId";
    
    ls_search(search.value);
    

    }
    catch(err){
        console.error("Fallo la carga de la búsqueda desde la API.\n" + err)
    }
}

btnBuscar.addEventListener("click", searchIni);



//--¡¡EN ESTA FUNCION TOMARE EL VALOR DE LOS BOTONES DEL MENU DESPLEGABLE COMO VALOR DE BUSQUEDA!!--

const btnFuntionSearch = () => { 
    let sug = document.getElementById(event.srcElement.id).innerText;
    search.value = sug;
   
    searchIni();
}

document.getElementById("btnSearchSugId1").addEventListener("click", btnFuntionSearch);
document.getElementById("btnSearchSugId2").addEventListener("click", btnFuntionSearch);
document.getElementById("btnSearchSugId3").addEventListener("click", btnFuntionSearch);

//--¡¡PARA MOSTRAR BUSQUEDA DE VER MAS SEGUN EL BOTON QUE PRESIONE!!--

const searchSeeMore1 = () => {
    search.value = keyword[0];
    searchIni();
}
const searchSeeMore2 = () => {
    search.value = keyword[1];
    searchIni();
}
const searchSeeMore3 = () => {
    search.value = keyword[2];
    searchIni();
}
const searchSeeMore4 = () => {
    search.value = keyword[3];
    searchIni();
}

document.getElementById("btnVerMas1").addEventListener("click", searchSeeMore1);
document.getElementById("btnVerMas2").addEventListener("click", searchSeeMore2);
document.getElementById("btnVerMas3").addEventListener("click", searchSeeMore3);
document.getElementById("btnVerMas4").addEventListener("click", searchSeeMore4);

const crearGuifos = () => {
    location.href = "./upload.html"
}
document.getElementById("btnCrearGifosId").addEventListener("click", crearGuifos);

