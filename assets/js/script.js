// variable 
const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

// selection de la voix et recuperation Google/Window
function voices(){
    for(let voice of synth.getVoices()){
        // Google US English, recupere la liste des voix de Google 
        let selected = voice.name === "Google US English" ? "selected" : "";
        // options des different voix 
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

// select de changement de voix 
synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}
// condition de la recuperation de la parole du robot 
speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        // si le text est trop long ( une possibilité de se faire une pause et play avec un btn) 
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convertir en discours";  // parole
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause de la parole";  // stop
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Discours";  // Resume
            }
        }else{
            speechBtn.innerText = "Convertir en discours"; // Convert
        }
    }
});