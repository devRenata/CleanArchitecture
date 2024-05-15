export function validateCpf (cpf: string) {
    if(!cpf) return false;
    cpf = removeNomDigit(cpf);
    if (isInvalidLength(cpf)) return false;
    if (hasAllDigitalEqual(cpf)) return false;
    const digit1 = calculateDigit(cpf, 10);
    const digit2 = calculateDigit(cpf, 11);
    return extractDigit(cpf) === `${digit1}${digit2}`;
}

function removeNomDigit(cpf: string) {
    return cpf.replace(/\D/g, "");
}

function isInvalidLength(cpf: string) {
    const cpf_length = 11;
    return cpf.length !== cpf_length;
}

function hasAllDigitalEqual(cpf: string) {
    return cpf.split("").every(digit => digit === cpf[0]);
}

function calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for(const digit of cpf) {
        if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return (rest < 2) ? 0 : 11 - rest;
}

function extractDigit(cpf: string) {
    return cpf.slice(9);
}