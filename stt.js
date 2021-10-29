var subscriptionKey = "ee745a61cf044b49b3f0503de9728a18";
var serviceRegion = "southcentralus";
var phraseDiv;
var startRecognizeAsyncButton;
var stopRecognizeAsyncButton;
var nuevaBusqueda;
var SpeechSDK;
var recognizer;
document.addEventListener("DOMContentLoaded", function() {
    startRecognizeAsyncButton = document.getElementById("startRecognizeAsyncButton");
    stopRecognizeAsyncButton = document.getElementById("stopRecognizeAsyncButton");
    nuevaBusqueda = document.getElementById("nuevaBusqueda");
    stopRecognizeAsyncButton.disabled = true;
    phraseDiv = document.getElementById("phraseDiv");
    var speechConfig;
    speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    speechConfig.speechRecognitionLanguage = "es-ES";
    var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    startRecognizeAsyncButton.addEventListener("click", function() {
        phraseDiv.value = "";
        startRecognizeAsyncButton.disabled = true;
        stopRecognizeAsyncButton.disabled = false;
        phraseDiv.innerHTML = "";
        recognizer.startContinuousRecognitionAsync();
        recognizer.recognized = function(s, e) {
            var resultado = e.result.text;
            console.log("resultado: " + resultado);
            if (resultado == undefined) {
                resultado = "";
                phraseDiv.value += resultado;
            } else {
                resultado = resultado.split(' ').join('');
                resultado = resultado.replace(".", "");
                resultado = resultado.toUpperCase();
                phraseDiv.value += resultado;
            }
        };
    });

    stopRecognizeAsyncButton.addEventListener("click", function() {
        startRecognizeAsyncButton.disabled = false;
        stopRecognizeAsyncButton.disabled = true;
        recognizer.stopContinuousRecognitionAsync();

    });

    nuevaBusqueda.addEventListener("click", function() {
        phraseDiv.value = "";
    });

    if (!!window.SpeechSDK) {
        SpeechSDK = window.SpeechSDK;
        startRecognizeAsyncButton.disabled = false;
        if (typeof RequestAuthorizationToken === "function") {
            RequestAuthorizationToken();
        }
    }
});