const form = document.querySelector("form");

form.addEventListener("submit", e => {
    e.preventDefault();
    if (validateCardDetails(form) === true) {
        console.log("datos válidos");
    } else if (validateCardDetails(form) === false){
        console.log("datos inválidos");
    }
});

//Funcion para validar tarjeta
function validateCardDetails(element) {
    const cardNumber = (element.cn.value);
    const expiryDate = (element.exp.value);
    const cardVerificationValue = (element.cvv.value);
    const cardName = (element.name.value);
    if (checkDate(expiryDate) === false) {
        console.log('Fecha no valida');
        element.exp.classList.add("error");
    }else if (checkCVV(cardVerificationValue) === false) {
        console.log('CVV no valido');
        element.cvv.classList.add("error");
    } else if (checkName(cardName) === false) {
        console.log('Nombre no valido');
        element.name.classList.add("error");
    } else if (checkCardNumber(cardNumber) === false) {
        console.log('Formato de numero de tarjeta no valido');
        element.cn.classList.add("error");
    } else if (checkLuhnAlgorithm(cardNumber) === true) {
            console.log('Numero de tarjeta valido segun algoritmo');
            element.cn.classList.add("success");
            return true;
        }
        else {
            element.cn.classList.add("error");
            return false;
        }
    }




//Revisar fecha: string vacio, solo numeros, formato, formato mes, formato ano. 
const checkDate = expiryDate => {
    const onlyNumbers = /[^0-9| -]/g;
    const formatDate = /^\d{2}-\d{2}$/;
    const formatMonth = new RegExp('0[^0-9]|1[^0-2]', 'g');
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
    const onlyNumbers = /[^0-9]/g;
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
    const onlyNumbers = /[^0-9]/g;
    if (cardNumber.toString().length === 0) {
        console.log('es un string vacio');
        return false;
    } else if (cardNumber.match(onlyNumbers) !== null) {
        console.log('Contiene caracteres no validos');
        return false;
    } else {
        console.log('Pasa las pruebas de formato de tarjeta');
        return true;
    }
};




//Revisa numero de tarjeta con algoritmo de luhn
const checkLuhnAlgorithm = cardNumber => {
    const cardNumbersArray = Array.from(cardNumber);
    //Numeros son colocados al reves
    const reversedCardNumbers = cardNumbersArray.reverse();
    const evenReversedCardNumbers = [];
    const oddReversedCardNumbers = [];

    //Array de numeros en posicion par
    for (let [index, value] of reversedCardNumbers.entries()) {
        if (index % 2 == 0) {
            evenReversedCardNumbers.push(value);
        }
    }
    //Array de numeros en posicion impar
    for (let [index, value] of reversedCardNumbers.entries()) {
        if (index % 2 !== 0) {
            oddReversedCardNumbers.push(value);
        }
    }
    // console.log(evenReversedCardNumbers);
    // console.log(oddReversedCardNumbers);

    //Multiplicacion de numeros en posicion impar
    let OddMultipledNumbers = oddReversedCardNumbers.map(function (number) {
        return number * 2;
    });
    // console.log(OddMultipledNumbers);

    //Array de numeros con mas de dos digitos
    let twoDigitsOddMultipledNumbers = OddMultipledNumbers.filter(function (
        number
    ) {
        return number > 9;
    });
    // console.log(twoDigitsOddMultipledNumbers);

    //Array de numeros de un digito
    let oneDigitOddMultipledNumbers = OddMultipledNumbers.filter(function (
        number
    ) {
        return number <= 9;
    });
    // console.log(oneDigitOddMultipledNumbers);
    var sumTwoDigits = [];

    //Suma de numeros de dos digitos
    twoDigitsOddMultipledNumbers.forEach(function (element) {
        let element2 = element.toString();
        let firstDigit = parseInt(element2[0]);
        let secondDigit = parseInt(element2[1]);
        sumTwoDigits.push(firstDigit + secondDigit);
    });

    // console.log(sumTwoDigits);

    //Suma de todos los numeros de dos digitos
    let totalTwoDigitSum = sumTwoDigits.reduce(function (
        valorAnterior,
        valorActual,
        indice,
        vector
    ) {
        return valorAnterior + valorActual;
    });

    //Suma de todos los numeros de un digitos
    let totalOneDigitSum = oneDigitOddMultipledNumbers.reduce(function (
        valorAnterior,
        valorActual,
        indice,
        vector
    ) {
        return valorAnterior + valorActual;
    });
    //Suma de todos los numeros impares
    let totalsumOdd = totalOneDigitSum + totalTwoDigitSum;
    // console.log(totalOneDigitSum);
    // console.log(totalTwoDigitSum);
    // console.log(totalsumOdd);

    //Suma de todos los numeros pares
    let totalSumEven = evenReversedCardNumbers.reduce(function (
        valorAnterior,
        valorActual,
        indice,
        vector
    ) {
        return parseInt(valorAnterior) + parseInt(valorActual);
    });
    // console.log(totalSumEven);


    //Suma de total de numeros pares e  impares
    let totalSum = totalSumEven + totalsumOdd;
    //Condicion si es divisible entre 10 
    if (totalSum % 10 === 0) {
        console.log('El numero de tarjeta es valido');
        return true;
    } else {
        return false;
    }
};
