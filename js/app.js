const form = document.querySelector("form");

form.addEventListener("submit", e => {
    e.preventDefault();
    if (validateCardDetails(form)) {
        console.log("datos válido... enviar...");
    } else {
        console.log("datos inválidos");
    }
});

function validateCardDetails(element) {
    const cardNumber = (element.cn.value);
    const expiryDate = (element.exp.value);
    const cardVerificationValue = (element.cvv.value);
    const cardName = (element.name.value);
    cardTests(cardNumber, expiryDate, cardVerificationValue, cardName);
}



const cardTests = (cardNumber, expiryDate, cardVerificationValue, cardName) => {
    if (checkDate(expiryDate) === false) {
        alert('Fecha no valida');
    } else if (checkCVV(cardVerificationValue) === false) {
        alert('CVV no valido');
    } else if (checkName(cardName) === false) {
        alert('Nombre no valido');
    }
    else if (checkCardNumber(cardNumber) === false) {
        alert('Numero de tarjeta no valido');
    }
    else if (checkCardNumber(cardNumber) === true) {
       checkLuhnAlgorithm();
    }
};

//Revisar fecha: string vacio, solo numeros, formato, formato mes, formato ano. 
const checkDate = expiryDate => {
    const onlyNumbers = /[^1-9| -]/g;
    const formatDate = /^\d{2}-\d{2}$/;
    const formatMonth = new RegExp('0[^1-9]|1[^0-2]', 'g');
    const formatYear = new RegExp('0[^1-9]|1[^1-9]', 'g');
    const dateSplit = expiryDate.split("-");
    const dateMonth = dateSplit[0];
    const dateYear = dateSplit[1];

    if (expiryDate.toString().length === 0) {
        console.log("es un string vacio");
        return false;
    } else if (expiryDate.match(onlyNumbers) !== null) {
        console.log('Contiene caracteres no validos');
        return false;
    } else if (!expiryDate.match(formatDate)) {
        console.log("no tiene el formato correcto")
        return false;;
    } else if (dateMonth.match(formatMonth) !== null) {
        console.log("el formato mes es incorrecto");
        return false;
    } else if (dateYear.match(formatYear) !== null) {
        console.log("el formato ano es incorrecto");
        return false;
    } else {
        console.log("Pasa las pruebas de fecha");
        return true;
    }
};



//Revisa cvv: caracteres, string vacio, y formato
const checkCVV = cardVerificationValue => {
    const onlyNumbers = /[^1-9]/g;
    const formatCVV = /^\d{3}$/;
    if (cardVerificationValue.toString().length === 0) {
        console.log('es un string vacio');
        return false;
    } else if (cardVerificationValue.match(onlyNumbers) !== null) {
        console.log('Contiene caracteres no validos');
        return false;
    } else if (!cardVerificationValue.match(formatCVV)) {
        console.log('no tiene el formato correcto');
        return false;
    } else {
        console.log('Pasa las pruebas de cvv');
        return true;
    }
};



//Revisa fecha: string vacio, caracteres no validos, dos palabras, menores a 30, no empiecen con espacios
const checkName = cardName => {
    const onlyLetters = /[^A-Za-z_\s]/g;
    const twoWords = cardName.split(' ');
    if (cardName.toString().length === 0) {
        console.log("es un string vacio");
        return false;
    } else if (cardName.match(onlyLetters) !== null) {
        console.log('Contiene caracteres no validos');
        return false;
    } else if (twoWords.length < 2) {
        console.log("Solo contiene una palabra");
        return false;
    } else if (cardName[0] === " ") {
        console.log("Comienza con espacio");
        return false;
    } else if (twoWords[0].length > 30 || twoWords[1].length > 30) {
        console.log("Las palabras tiene demasiados caracteres");
        return false;
    } else {
        console.log("Pasa las pruebas de nombre");
        return true;
    }
};



//Revisa numero de tarjeta con algoritmo de luhn
const checkCardNumber = cardNumber => {
    const onlyNumbers = /[^1-9]/g;
    if (cardNumber.toString().length === 0) {
        console.log('es un string vacio');
        return false;
    } else if (cardNumber.match(onlyNumbers) !== null) {
        console.log('Contiene caracteres no validos');
        return false;
    } else {
        console.log('El numero de tarjeta es correcto');
        return true;
    }
};