//speech synthesis

const msg = new SpeechSynthesisUtterance();         //fetch the speech synthesis object which recognizes speech/voice inbuilt in browser
let voices = [];                                    //empty arr
const voiceDropDown = document.querySelector('[name="voice"]');             //fetch dropDown
const options = document.querySelectorAll('[type="range"], [name="text"]');     //fetch ranges and textarea
const speakButton = document.querySelector('#speak');           //fetch both buttons
const stopButton = document.querySelector('#stop');
//set the msg.text i.e 'speech synthesizer' value as text in the textarea
msg.text = document.querySelector('[name = "text"]').value;

//to populate different voices on dropDown
function populateVoices() {
    voices = this.getVoices();      //fetch the different voices from speech synthesizer //'this' => speechsyntheseizer bcz function  is an event listener on speech synthesizer
    //iterate through all the voices and return an <option> tag for every voice //insert those options inside the DropDown
    voiceDropDown.innerHTML = voices
     .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
     .join('');
}

//to set the voice selected on drpdown
function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);  //msg.voice = speech synthesizer's voice // iterate all voices and find which matches the selected in dropdown and in the array
    toggle();       //speak
}

//to speak and stop the voice
//pass a arg=true
//when function is called, cancel the any/current voice running && if startover=true then speak the msg
function toggle(startover=true) {
    speechSynthesis.cancel();       //stop speaking
    if(startover) {
        speechSynthesis.speak(msg);     //if true speak th msg
    }
}

//to set the pitch and range
function setOption() {
    msg[this.name] = this.value //set the name of the input and its value (eg . msg[rate] == 2 i.e rate will be 2) )
    toggle();       //speak
}


speechSynthesis.addEventListener('voiceschanged', populateVoices); 
voiceDropDown.addEventListener('change', setVoice);     //when dropdown value changes, setVoice()
options.forEach(option => option.addEventListener('change', setOption));    //iterate all options(pitch n range) //when range changes call setOption
speakButton.addEventListener('click', toggle);      //speak when speakButton
stopButton.addEventListener('click', () => toggle(false));      //when stop button pressed pass false as toggle arg, //i.e STOPPPP














