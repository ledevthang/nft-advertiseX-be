import { Mina, PublicKey, PrivateKey, UInt64 } from "o1js";
import { AdvertiseXTokenSales } from ".";
// set Mina instance
const Network = Mina.Network("https://proxy.berkeley.minaexplorer.com/graphql");
Mina.setActiveInstance(Network);

let senderKey = PrivateKey.fromBase58(
  "EKDpZSBnfpJijCwgLPmZnKVnHDe5svMFFHYR4jHTHBAbPPCnuYHH", // my wallet address
);
let senderAccount = senderKey.toPublicKey();

const zkAppPublicKey = PrivateKey.fromBase58(
  "EKEop2zppg1z4F2zzyVe1zo2vtysXoN66rsmqYJjKBsoxyr8ctN9", //contract address
);
const zkapp = new AdvertiseXTokenSales(zkAppPublicKey.toPublicKey());

export async function createPayment(amount: number) {
  await AdvertiseXTokenSales.compile();
  // create the transaction, add proofs and signatures
  const tx = await Mina.transaction(
    { sender: senderAccount, fee: 100000000 },
    () => {
      zkapp.createPayment(UInt64.from(amount * 1e9));
    },
  );
  await tx.prove();
  tx.sign([senderKey]);

  // send transaction
  const result = await tx.send();
  await result.safeWait();

  return result;
}

export async function withDraw() {
  await AdvertiseXTokenSales.compile();
  // create the transaction, add proofs and signatures
  const tx = await Mina.transaction(
    { sender: senderAccount, fee: 100000000 },
    () => {
      zkapp.withDraw(UInt64.from(0.1 * 1e9));
    },
  );
  await tx.prove();
  tx.sign([senderKey]);

  // send transaction
  const result = await tx.send();
  const safeWait = await result.safeWait();
  console.log({ result });
  console.log({ safeWait });
}
// withDraw().then()
