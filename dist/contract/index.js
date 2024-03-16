"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertiseXTokenSales = void 0;
const o1js_1 = require("o1js");
class Account extends (0, o1js_1.Struct)({
    publicKey: o1js_1.PublicKey,
    points: o1js_1.UInt64,
}) {
}
class AdvertiseXTokenSales extends o1js_1.SmartContract {
    constructor() {
        super(...arguments);
        this.tokenPk = (0, o1js_1.State)();
        this.owner = (0, o1js_1.State)();
        this.events = {
            paymentCreated: Account,
            withDraw: Account,
        };
    }
    initState(_tokenPk) {
        this.tokenPk.set(_tokenPk);
        this.owner.set(this.sender);
    }
    init() {
        super.init();
    }
    onlyOwner() {
        this.owner.getAndAssertEquals().assertEquals(this.sender);
    }
    createPayment(amount) {
        let sender = o1js_1.AccountUpdate.createSigned(this.sender);
        sender.send({ to: this, amount });
        this.emitEvent("paymentCreated", new Account({
            publicKey: this.sender,
            points: amount,
        }));
    }
    withDraw(amount) {
        this.onlyOwner();
        this.send({ to: this.sender, amount });
        this.emitEvent("withDraw", new Account({
            publicKey: this.sender,
            points: amount,
        }));
    }
}
exports.AdvertiseXTokenSales = AdvertiseXTokenSales;
__decorate([
    (0, o1js_1.state)(o1js_1.PublicKey),
    __metadata("design:type", Object)
], AdvertiseXTokenSales.prototype, "tokenPk", void 0);
__decorate([
    (0, o1js_1.state)(o1js_1.PublicKey),
    __metadata("design:type", Object)
], AdvertiseXTokenSales.prototype, "owner", void 0);
__decorate([
    o1js_1.method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [o1js_1.PublicKey]),
    __metadata("design:returntype", void 0)
], AdvertiseXTokenSales.prototype, "initState", null);
__decorate([
    o1js_1.method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [o1js_1.UInt64]),
    __metadata("design:returntype", void 0)
], AdvertiseXTokenSales.prototype, "createPayment", null);
__decorate([
    o1js_1.method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [o1js_1.UInt64]),
    __metadata("design:returntype", void 0)
], AdvertiseXTokenSales.prototype, "withDraw", null);
//# sourceMappingURL=index.js.map