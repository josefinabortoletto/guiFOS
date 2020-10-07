//------------------MOSTRAR U OCULTAR MENU DESPLEGABLE------------------//
let btnMenu = document.getElementById("btnThemeId");
let btnArrow = document.getElementById("btnArrowId")
let dropDownMenu = document.querySelector("#themeMenuId");


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



//-----GRABAR GUIFOS----//

//BOTONES
const
     $btnComenzar = document.getElementById("btnComenzarId"),
     $btnCancelar = document.getElementById("btnCancelarId"),
     $btnArrowPaso2 = document.getElementById("arrowPaso2Id"),
     $btnCapturar = document.getElementById("btnCapturarId"),
     $btnImgCapturar = document.getElementById("btnImgCapturarId"),
     $btnArrowPaso3 = document.getElementById("arrowPaso3Id"),
     $btnOk = document.getElementById("btnListoId"),
     $btnRepetirCaptura = document.getElementById("btnRepetirCapturaId"),
     $btnSubirGif = document.getElementById("btnSubirGifoId"),
     $btnCancelarUpGif = document.getElementById("btnCancelarUploadingId"),
     $btnArrowPaso5 = document.getElementById("arrowPaso5Id"),
     $btnListo = document.getElementById("btnGifOkLIstoId"),
     $btnArrowPaso6 = document.getElementById("arrowIdPaso6"),
     $btnCopy = document.getElementById("btnCopiarId"),
     $btnDownload = document.getElementById("btnDescargarId"),
     $btnMisGuifos = document.getElementById("btnMisGuifosId");


     const misGuifos = () => {
        location.href = "#misGifId";
    }
    
    $btnMisGuifos.addEventListener("click", misGuifos);

//SECCIONES 

const $paso1 = document.getElementById("windowsCreateId");
const $paso2 = document.getElementById("windowPrecaptureId");
const $paso3 = document.getElementById("windowCaptureId");
const $paso4 = document.getElementById("windowPreviewId");
const $paso5 = document.getElementById("windowUploadingId");
const $paso6 = document.getElementById("windowGifOkId");


//FUNCIONES PARA PASAR DE PASOS
const pressComenzar = () =>{
    $paso1.style.display = "none";
    $paso2.style.display = "block";
    permissions();
}

const pressArrowPaso2 = () =>{
    $paso1.style.display = "block";
    $paso2.style.display = "none";
}

//EVENTOS PARA PASAR DE PASOS
$btnComenzar.addEventListener("click", pressComenzar);
$btnArrowPaso2.addEventListener("click", pressArrowPaso2);


//CONFIGURACIONES

const objVideo = {
    audio: false,
    video: {
        facingMode: "user",
        width: { min: 660, max: 1460},
        height: { min: 434, max: 538}
    }
};

//PERMISOS
const permissions = () =>{
    let $video = document.getElementById("imgPrecapture");

    navigator.mediaDevices.getUserMedia(objVideo)
    .then(function(mediaStreamObj){
        if("srcObject" in $video){
            $video.srcObject = mediaStreamObj;
        }
        $video.onloadeddata = function(ev) {
            $video.play();
        }

    })
    .catch(function(err) {
        console.log(err.name, err.message);
    })
    }

//PASO 3: 

const pressArrowPaso3 = () =>{
    $paso3.style.display = "none";
    $paso1.style.display = "block";
}

const pressCapturar = () =>{
    $paso2.style.display = "none";
    $paso3.style.display = "block";
}

$btnCapturar.addEventListener("click", pressCapturar);
$btnArrowPaso3.addEventListener("click", pressArrowPaso3);

//GRABAR GIF
const startRecording = () =>{
    let $videoCapture = document.getElementById("imgCaptureId");

    navigator.mediaDevices.getUserMedia(objVideo)
    .then(function(mediaStreamObj){
        if("srcObject" in $videoCapture){
            $videoCapture.srcObject = mediaStreamObj;
        }
        $videoCapture.onloadeddata = function(ev) {
            $videoCapture.play();
        }

        recorder = RecordRTC(mediaStreamObj, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,

            onGifRecordingStarted: function() {
                console.log('started')
            },
        });

        recorder.startRecording();
    })
    .catch(function(err) {
        console.log(err.name, err.message);
    })
    }

    $btnCapturar.addEventListener("click", startRecording);


    //FINALIZAR GRABADO, Y CONVERTIR GIF EN BLOB (PASO 4)

        const pressOk = () =>{
        $paso3.style.display = "none";
        $paso4.style.display = "block";
        stopRecording();
    }
    


let gifBlob = '';
let newGif= ''; 
let gifId = ''; 


const stopRecording = () => {

    recorder.stopRecording();

    let previewGif = document.getElementById("gifPreviewId");
    gifBlob = recorder.getBlob();
        
    previewGif.src = URL.createObjectURL(gifBlob);
    

}
    
$btnOk.addEventListener("click", pressOk)



const reapetCapture = () => {
    $paso4.style.display = "none";
    $paso2.style.display = "block";
}

const uploadGif = () => {
    $paso4.style.display = "none";
    $paso5.style.display = "block";
    uploadingGif();
}

const cancelUploading = () => {
    $paso5.style.display = "none";
    $paso1.style.display = "block";
}

$btnRepetirCaptura.addEventListener("click", reapetCapture);
$btnSubirGif.addEventListener("click", uploadGif);
$btnCancelarUpGif.addEventListener("click", cancelUploading);
$btnArrowPaso5.addEventListener("click", cancelUploading);



const apiKey = "UQC4ztwZuYwvKFn6BhTHu3QfnYjwO7XR";
const endpointUploading = 'https://upload.giphy.com/v1/gifs';
//PASO 5 SUBIR A GUIFOS EL ARCHIVO BLOB

const uploadingGif = async () => {


    let form = new FormData();
    form.append('file', gifBlob, 'miGuifo.gif');

    try {
        await postGiphyCreate(form);
        if (await newGif.meta.status === 200) {
            gifId = newGif.data.id;

            //GRABAR GIF EN LOCAL STORAGE
            
      
            
            console.log("Gif subido correctamente.")
            $paso5.style.display = "none";
            $paso6.style.display = "block";

            let previewVideo = document.getElementById("miGifOkId");
            previewVideo.src = URL.createObjectURL(gifBlob);
            console.log(previewVideo.src);

            await ls_gif(gifId, previewVideo.src);

        }
    }
    catch (error) {
        console.log(error)
        $paso5.style.display = "none";
        $paso1.style.display = "block";
    }
}

const postGiphyCreate = async (data) => {
    try {
        const options = {
            method: 'POST',
            body: data,
            json: true
        }

        let urlUpload = endpointUploading + '?api_key=' + apiKey;
        let res = await fetch(urlUpload, options);
        newGif = await res.json();

        return newGif;

    }
    catch (err) {
        console.error("El gif no pudo subirse.\n", err);
    }
}

//----LOCAL STORAGE---GUARDAR GIF---/

let arrayGuifos = [];


class Gif{
    constructor(id, src){
        this.id = id;
        this.src = src;
    }
}

const ls_gif = (id, src) =>{


    let nuevoGifo = new Gif(id, src);
    arrayGuifos.push(nuevoGifo);
    console.log(arrayGuifos);
    localStorage.setItem("gif", JSON.stringify(arrayGuifos));

    ls_crearPreviwGif();
}

let misGifCreados = document.getElementById("contendorMisGifId");

let arrayObjGif  = [];
const ls_crearPreviwGif = () => {
    
    arrayObjGif = JSON.parse(localStorage.getItem("gif"));

    let newDiv = '';

    arrayObjGif.forEach(element => {
        newDiv += `<div><img src="${element.src}" class="miGif" id="misGifId"></div>`
    });

    misGifCreados.innerHTML = newDiv;
    
}

const endGif = () =>{
    $paso6.style.display = "none";
    $paso1.style.display = "block";
}

$btnListo.addEventListener("click", endGif);
$btnArrowPaso6.addEventListener("click", endGif);

//FUNCION PARA COPIAR EL ENLACE DEL GIF

const copyGif = () =>{
    
       //CREO UN TEXT AREA PARA CREAR LA RUTA AL GIF
    const input = document.createElement("textarea");
    document.body.appendChild(input);
    input.value = `https://giphy.com/gifs/${gifId}`;

    input.select();
    document.execCommand("copy");

    //ELIMINO EL ELEMENTO CREADO
    document.body.removeChild(input);
    alert('Link copiado en portapeles.')
}

$btnCopy.addEventListener("click", copyGif);

//FUNCION PARA DESCARGAR GIF

const downloadGif = () =>{
    const input = document.createElement("textarea");
    document.body.appendChild(input);
    input.value = `https://giphy.com/gifs/${gifId}`;
    
    input.select();
    location.href = input.value;
}

$btnDownload.addEventListener("click", downloadGif);

