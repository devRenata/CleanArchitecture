import crypto from "crypto";
import pgp from "pg-promise";
import { validateCpf } from "./validateCpf";

export async function getAccount (accountId: string): Promise<any> {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	try {
		const id = crypto.randomUUID();

		const [acc] = await connection.query("select * from cccat15.account where account_id = $1", [accountId]);
        return acc;
		

	} finally {
		await connection.$pool.end();
	}
}