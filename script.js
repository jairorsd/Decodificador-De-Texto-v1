const texto = document.querySelector('.texto');
const resultado = document.querySelector('.msg');
const btnCopiar = document.querySelector('.btn-copiar');
const btnCriptografar = document.querySelector('.btn-criptografar');
const btnDescriptografar = document.querySelector('.btn-descriptografar');

const descriptografados = ['e', 'i', 'a', 'o', 'u'];
const criptografados = ['enter', 'imes', 'ai', 'ober', 'ufat'];

btnCriptografar.onclick = function (event) {
    event.preventDefault();

    criptografaEDescriptografaTexto(descriptografados, criptografados);

};

btnDescriptografar.onclick = function (event) {
    event.preventDefault();

    criptografaEDescriptografaTexto(criptografados, descriptografados);
};

function criptografaEDescriptografaTexto(caracteresRemovidos, caracteresAdicionados) {

    const textoModificado = [];
    let textoDigitado = texto.value;
    let posicao = 0;
    let indiceCaractere = 0;
    let caractereAtual = '';
    let encontrouCaracteres = false;

    if (!verificaSeTextoEValido(textoDigitado)) return;

    while (posicao < textoDigitado.length) {

        caractereAtual = caractereAtual + textoDigitado[posicao];

        for (let i = 0; i < caracteresRemovidos.length; i++) {

            if (caractereAtual == caracteresRemovidos[i]) {
                textoModificado.push(caracteresAdicionados[i]);
                caractereAtual = '';
                indiceCaractere = 0;
                break;

            } else if (caractereAtual[0] == caracteresRemovidos[i][0] 
                && caractereAtual[indiceCaractere] == caracteresRemovidos[i][indiceCaractere] 
                && posicao < textoDigitado.length - 1) 
            {
                indiceCaractere++;
                encontrouCaracteres = true;
                break;

            } else {
                encontrouCaracteres = false;
            }
        };
        if (!encontrouCaracteres && caractereAtual != '') {
            textoModificado.push(caractereAtual);
            caractereAtual = '';
            indiceCaractere = 0;
        };
        posicao++;
    };

    mostraResultado(textoModificado);
};

function verificaSeTextoEValido(texto) {

    let valido = false;

    if (texto.trimStart() != '') {
        if(estaEmMinusculoESemAcentos(texto)) {
            document.querySelector('form span').style.color = '#000000';
            valido = true;  
        } else {
            document.querySelector('form span').style.color = 'red';
        }
    } else {
        resultado.value = '';
        resultado.style.display = 'none';
        resultado.previousElementSibling.style.display = 'block';
        resultado.parentElement.style.justifyContent = 'center';
        btnCopiar.style.display = 'none';
    };
    return valido;
};

function estaEmMinusculoESemAcentos(texto) {

    let valido = false;

    for (let i = 0; i < texto.length; i++) {

        let code = texto.charCodeAt(i);

        if (code >= 97 && code <= 122 || code == 32) {
            valido = true;
        } else {
            valido = false;
            break;
        };
    };
    return valido;
};

function mostraResultado(texto) {

    let textoFinal = '';

    resultado.style.display = 'inline-block';
    resultado.previousElementSibling.style.display = 'none';
    resultado.parentElement.style.justifyContent = 'space-between';
    btnCopiar.style.display = 'inline-block';

    for (let i = 0; i < texto.length; i++) {

        textoFinal = textoFinal + texto[i];
    };
    resultado.value = textoFinal;
    resultado.style.height = resultado.scrollHeight.toString() + 'px';
};

btnCopiar.onclick = function () {

    navigator.clipboard.writeText(resultado.value);
    this.innerHTML = 'Copiado!';

};

btnCopiar.onmouseout = function () {

    this.innerHTML = 'Copiar';
};

let interval;

texto.onfocus = function () {

    if (!this.value) {
        interval = setInterval(placeholder, 500);
    }
};

texto.onblur = function () {

    this.placeholder = 'Digite seu texto';
    clearInterval(interval);
};

texto.oninput = function () {

    clearInterval(interval);
    this.style.caretColor = '#0A3871';
    if (!this.value) {
        interval = setInterval(placeholder, 500);
        this.style.caretColor = 'transparent';
    };
};

let sublinhado = '_';

function placeholder() {

    texto.placeholder = 'Digite seu texto' + sublinhado;

    if (!sublinhado) {
        sublinhado = '_';
    } else {
        sublinhado = '';
    }
}

window.onload = function() {
    texto.focus();
};  
