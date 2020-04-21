inputFile = null;

function go() {
    // read file
    if (inputFile === null) throw 'No input file chosen';
    const reader = new FileReader();
    reader.onload = (e) => {
        callApi(e.target.result);
    }
    reader.readAsText(inputFile);
}

function callApi(number) {
    // call API
    fetch(`http://numbersapi.com/${number}`)
        .then(response => response.body.getReader().read())
        .then(response => {
            const decoder = new TextDecoder('utf-8');
            logResponseToFile(decoder.decode(response.value));
        })
}

function logResponseToFile(response) {
    // create file to download
    const e = document.createElement('a');
    e.setAttribute('href', 'data:text/plain;charset=utf-8,' + response);
    e.setAttribute('download', 'output.txt');
    e.style.display = 'none';
    document.body.appendChild(e);
    e.click();
    document.body.removeChild(e);
}

function setInputFile(e) {
    inputFile = e.files[0];
}
