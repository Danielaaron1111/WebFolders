// Do not change this file.

function randomValue(element) {
    let value = Math.ceil(Math.random() * 10);
    element.innerText = value
}

function populateWithRandomValues(firstElement, secondelement) {
    randomValue(firstElement)
    randomValue(secondelement)
}

export { populateWithRandomValues} 
