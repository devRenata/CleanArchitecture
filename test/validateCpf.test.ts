import { validateCpf } from "../src/validateCpf";

test.each([
	"97456321558",
	"71428793860",
	"87748248800"
])("Deve testar se o cpf é válido: %s", (cpf) => {
	const isValid = validateCpf(cpf);
	expect(isValid).toBe(true);
});

test.each([
	"8774824880",
	null,
	undefined,
	"11111111111"
])("Deve testar se o cpf é inválido: %s", function (cpf: any) {
	const isValid = validateCpf(cpf);
	expect(isValid).toBe(false);
});