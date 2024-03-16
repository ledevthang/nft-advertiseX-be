import {
  AccountUpdate,
  MerkleWitness,
  PublicKey,
  SmartContract,
  State,
  Struct,
  UInt64,
  method,
  state,
} from "o1js";

class Account extends Struct({
  publicKey: PublicKey,
  points: UInt64,
}) {}
export class AdvertiseXTokenSales extends SmartContract {
  @state(PublicKey) tokenPk = State<PublicKey>();
  @state(PublicKey) owner = State<PublicKey>();

  override events = {
    paymentCreated: Account,
    withDraw: Account,
  };

  @method initState(_tokenPk: PublicKey) {
    this.tokenPk.set(_tokenPk);
    this.owner.set(this.sender);
  }

  override init() {
    super.init();
  }

  onlyOwner() {
    this.owner.getAndAssertEquals().assertEquals(this.sender);
  }

  @method createPayment(amount: UInt64) {
    let sender = AccountUpdate.createSigned(this.sender);
    sender.send({ to: this, amount });

    //emit event
    this.emitEvent(
      "paymentCreated",
      new Account({
        publicKey: this.sender,
        points: amount,
      }),
    );
  }

  @method withDraw(amount: UInt64) {
    this.onlyOwner();

    this.send({ to: this.sender, amount });

    //emit event
    this.emitEvent(
      "withDraw",
      new Account({
        publicKey: this.sender,
        points: amount,
      }),
    );
  }
}
