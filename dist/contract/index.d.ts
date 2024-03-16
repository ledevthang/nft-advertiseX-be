import { PublicKey, SmartContract, State, UInt64 } from "o1js";
declare const Account_base: (new (value: {
    publicKey: PublicKey;
    points: UInt64;
}) => {
    publicKey: PublicKey;
    points: UInt64;
}) & {
    _isStruct: true;
} & import("o1js").ProvablePure<{
    publicKey: PublicKey;
    points: UInt64;
}> & {
    toInput: (x: {
        publicKey: PublicKey;
        points: UInt64;
    }) => {
        fields?: import("o1js/dist/node/lib/field").Field[] | undefined;
        packed?: [import("o1js/dist/node/lib/field").Field, number][] | undefined;
    };
    toJSON: (x: {
        publicKey: PublicKey;
        points: UInt64;
    }) => {
        publicKey: string;
        points: string;
    };
    fromJSON: (x: {
        publicKey: string;
        points: string;
    }) => {
        publicKey: PublicKey;
        points: UInt64;
    };
    empty: () => {
        publicKey: PublicKey;
        points: UInt64;
    };
};
declare class Account extends Account_base {
}
export declare class AdvertiseXTokenSales extends SmartContract {
    tokenPk: State<PublicKey>;
    owner: State<PublicKey>;
    events: {
        paymentCreated: typeof Account;
        withDraw: typeof Account;
    };
    initState(_tokenPk: PublicKey): void;
    init(): void;
    onlyOwner(): void;
    createPayment(amount: UInt64): void;
    withDraw(amount: UInt64): void;
}
export {};
