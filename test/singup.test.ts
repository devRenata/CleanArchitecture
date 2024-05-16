import { getAccount } from "../src/getAccount";
import { signup } from "../src/singup";

test("Deve criar a conta de uma passageiro", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        isPassenger: true,
    }
    const outputSignup = await signup(input);
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount(outputSignup.accountId);
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.is_passenger).toBe(input.isPassenger);
});

test("Deve criar a conta de um motorista", async function () {
    const input = {
        name: "David Simas",
        email: `davin.simas${Math.random()}@gmail.com`,
        cpf: "71428793860",
        carPlate: "AAA9897",
        isDriver: true,
    }
    const outputSignup = await signup(input);
    expect(outputSignup.accountId).toBeDefined();
    const outputGetAccount = await getAccount(outputSignup.accountId);
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.is_driver).toBe(input.isDriver);
});

test("Não deve criar um passageiro se o nome for inválido", async function () {
    const input = {
        name: "John",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        isPassenger: true,
    }
    const outputSignup = await signup(input);
    await expect(() => signup(input)).rejects.toThrow(new Error("Invalid name"));
});

test("Não deve criar um passageiro se o email for inválido", async function () {
    const input = {
        name: "John",
        email: `john.doe${Math.random()}`,
        cpf: "97456321558", 
        isPassenger: true,
    }
    const outputSignup = await signup(input);
    await expect(() => signup(input)).rejects.toThrow(new Error("Invalid email"));
});

test("Não deve criar um passageiro se o cpf for inválido", async function () {
    const input = {
        name: "John",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "974563215",
        isPassenger: true,
    }
    const outputSignup = await signup(input);
    await expect(() => signup(input)).rejects.toThrow(new Error("Invalid cpf"));
});

test("Não deve criar um passageiro se a conta já existe", async function () {
    const input = {
        name: "John",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "974563215",
        isPassenger: true,
    }
    await signup(input);
    const outputSignup = await signup(input);
    await expect(() => signup(input)).rejects.toThrow(new Error("Already exists"));
});

test("Não deve criar a conta de um motorista se a placa for inválida", async function () {
    const input = {
        name: "David Simas",
        email: `davin.simas${Math.random()}@gmail.com`,
        cpf: "71428793860",
        carPlate: "AA897",
        isDriver: true,
    }
    const outputSignup = await signup(input);
    await expect(() => signup(input)).rejects.toThrow(new Error("Invalid plate"));
});