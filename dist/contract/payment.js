"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDraw = exports.createPayment = void 0;
const o1js_1 = require("o1js");
const _1 = require(".");
const Network = o1js_1.Mina.Network("https://proxy.berkeley.minaexplorer.com/graphql");
o1js_1.Mina.setActiveInstance(Network);
let senderKey = o1js_1.PrivateKey.fromBase58("EKDpZSBnfpJijCwgLPmZnKVnHDe5svMFFHYR4jHTHBAbPPCnuYHH");
let senderAccount = senderKey.toPublicKey();
const zkAppPublicKey = o1js_1.PrivateKey.fromBase58("EKEop2zppg1z4F2zzyVe1zo2vtysXoN66rsmqYJjKBsoxyr8ctN9");
const zkapp = new _1.AdvertiseXTokenSales(zkAppPublicKey.toPublicKey());
async function createPayment(amount) {
    await _1.AdvertiseXTokenSales.compile();
    const tx = await o1js_1.Mina.transaction({ sender: senderAccount, fee: 100000000 }, () => {
        zkapp.createPayment(o1js_1.UInt64.from(amount * 1e9));
    });
    await tx.prove();
    tx.sign([senderKey]);
    const result = await tx.send();
    await result.safeWait();
    return result;
}
exports.createPayment = createPayment;
async function withDraw() {
    await _1.AdvertiseXTokenSales.compile();
    const tx = await o1js_1.Mina.transaction({ sender: senderAccount, fee: 100000000 }, () => {
        zkapp.withDraw(o1js_1.UInt64.from(0.1 * 1e9));
    });
    await tx.prove();
    tx.sign([senderKey]);
    const result = await tx.send();
    const safeWait = await result.safeWait();
    console.log({ result });
    console.log({ safeWait });
}
exports.withDraw = withDraw;
//# sourceMappingURL=payment.js.map