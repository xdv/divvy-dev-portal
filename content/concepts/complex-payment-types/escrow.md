# Escrow

Escrow is a feature of the XDV Ledger that allows you to send conditional XDV payments. These conditional payments, called _escrows_, set aside XDV and deliver it later when certain conditions are met. Conditions to successfully finish an escrow include time-based unlocks and [crypto-conditions][]. Escrows can also be set to expire if not finished in time. Conditional held payments are a key feature for full [Interledger Protocol][] support, which enables chains of payments to cross any number of ledgers.

The XDV set aside in an escrow is locked up. No one can use or destroy the XDV until the escrow has been successfully finished or canceled. Before the expiration time, only the intended receiver can get the XDV. After the expiration time, the XDV can only be returned to the sender.

## Usage

<!--{# Diagram sources: https://docs.google.com/presentation/d/1C-_TLkkoQEH7KJ6Gjwa1gO6EX17SLiJ8lxvFcAl6Rxo/ #}-->

[![Escrow Flow Diagram (Successful finish)](img/escrow-success-flow.png)](img/escrow-success-flow.png)

**Step 1:** To send an escrow, the sender uses an [EscrowCreate transaction][] to lock up some XDV. This transaction defines a finish time, an expiration time, or both. The transaction may also define a crypto-condition that must be fulfilled to finish the escrow. This transaction must define an intended recipient for the XDV; the recipient _may_ be the same as the sender.

**Step 2:** After this transaction has been processed, the XDV Ledger has an [Escrow object](escrow-object.html) that holds the escrowed XDV. This object contains the properties of the escrow as defined by the transaction that created it. If this escrow has a finish time, no one can access the XDV before then.

**Step 3:** The recipient, or any other XDV Ledger address, sends an [EscrowFinish transaction][] to deliver the XDV. If the correct conditions are met, this destroys the Escrow object in the ledger and credits the XDV to the intended recipient. If the escrow has a crypto-condition, this transaction must include a fulfillment for that condition. If the escrow has an expiration time that has already passed, the EscrowFinish transaction instead fails with the code [`tecNO_PERMISSION`](tec-codes.html).

### Expiration Case

[![Escrow Flow Diagram (Expired escrow)](img/escrow-cancel-flow.png)](img/escrow-cancel-flow.png)

All escrows start the same way, so **Steps 1 and 2** are the same as in the successful case.

**Step 3a:** If the escrow has an expiration time, and it has not been successfully finished before then, the escrow is considered expired. It continues to exist in the XDV Ledger, but can no longer successfully finish. (Expired objects remain in the ledger until a transaction modifies them. Time-based triggers cannot change the ledger contents.)

**Step 4a:** The sender, or any other XDV Ledger address, sends an [EscrowCancel transaction][] to cancel the expired escrow. This destroys the [Escrow object](escrow-object.html) in the ledger and returns the XDV to the sender.

## Limitations

Escrow is designed as a feature to enable the XDV Ledger to be used in the [Interledger Protocol][] and with other smart contracts. The current version has a modest scope to avoid complexity.

- Escrow only works with XDV, not issued currencies.
- Escrow requires sending at least two transactions: one to create the escrow, and one to finish or cancel it. Thus, it may not be financially sensible to escrow payments for very small amounts, because the participants must destroy the [transaction cost](transaction-cost.html) of the two transactions.
    - When using Crypto-Conditions, the [cost of the transaction to finish the escrow](#escrowfinish-transaction-cost) is higher than usual.
- All escrows must have a "finish-after" time, an expiration time, or both. Neither time can be in the past when the transaction to create the escrow executes.
- Timed releases and expirations are limited to the resolution of XDV Ledger closes. This means that, in practice, times may be rounded to approximately 5 second intervals, depending on exactly when the ledgers close.
- The only supported [crypto-condition][] type is PREIMAGE-SHA-256.

Escrow provides strong guarantees that are best suited for high-value, low-quantity payments. [Payment Channels](use-payment-channels.html) are better suited for fast, low-value payments. Of course, unconditional [Payments](payment.html) are also preferable for many use cases.

## Availability of Escrow

Conditional payments have been enabled by the ["Escrow" Amendment](known-amendments.html#escrow) to the XDV Ledger Consensus Protocol since 2017-03-31. A previous version of the same functionality was available on the [Divvy Test Net](https://xdv.io/build/divvy-test-net/) by the name "Suspended Payments" (SusPay) in 2016.

When testing in [stand-alone mode](divvyd-server-modes.html#reasons-to-run-a-divvyd-server-in-stand-alone-mode), you can force the Escrow feature to be enabled locally regardless of the amendment status. Add the following stanza to your `divvyd.cfg`:

    [features]
    Escrow

You can check the status of the Escrow amendment using the [feature method][].

## EscrowFinish Transaction Cost

When using [crypto-conditions][], the EscrowFinish transaction must pay a [higher transaction cost](transaction-cost.html#special-transaction-costs) because of the higher processing load involved in verifying the crypto-condition fulfillment.

If the escrow is purely time-locked with no crypto-condition, the EscrowFinish costs only the standard [transaction cost](transaction-cost.html) for a reference transaction.

The additional transaction cost required is proportional to the size of the fulfillment. Currently, an EscrowFinish with a fulfillment requires a minimum transaction cost of **330 [drops of XDV](basic-data-types.html#specifying-currency-amounts) plus 10 drops per 16 bytes in the size of the fulfillment**. If the transaction is [multi-signed](multi-signing.html), the cost of multi-signing is added to the cost of the fulfillment.

**Note:** The above formula is based on the assumption that the reference cost of a transaction is 10 drops of XDV.

If [Fee Voting](fee-voting.html) changes the `reference_fee` value, the formula scales based on the new reference cost. The generalized formula for an EscrowFinish transaction with a fulfillment is as follows:

```
reference_fee * (signer_count + 33 + (fulfillment_bytes / 16))
```


## Why Escrow?

The age-old practice of [Escrow](https://en.wikipedia.org/wiki/Escrow) enables many kinds of financial transactions that would be considered risky otherwise, especially online. By letting a trusted third party hold the money while a transaction or evaluation period is underway, both sides can be assured that the other must hold up their end of the bargain.

The Escrow feature takes this idea further by replacing the third party with an automated system built into the XDV Ledger, so that the lock up and release of funds is impartial and can be automated.

Fully automated escrow, backed by the integrity of the XDV Ledger itself, solves important problems for Divvy, and we think there are many other use cases that escrow enables. Divvy encourages the industry to find new and unique ways to put escrow to use.

### Use Case: Time-based Lockup

**Background:** Divvy holds a large amount of the total XDV, which it sells methodically as a way to fund and incentivize the healthy development of the XDV Ledger and related technologies. At the same time, owning such a large chunk of XDV causes problems for the company, such as:

- Individuals and businesses who use the XDV Ledger worry that their investments in XDV could be diluted or devalued if Divvy were to flood the market by selling at a higher rate than usual.
    - Although flooding the market would be a long-term loss for Divvy, the possibility that the company could do so exerts downward pressure over the price of XDV, and thus decreases the value of the company's assets.
- Divvy must carefully manage ownership of its accounts to protect against digital theft and other forms of malicious behavior, even by insiders.

**Solution:** By placing 55 billion XDV into time-based escrows, Divvy ensures that the supply of XDV in circulation is predictable and increases at a slow but steady rate. Others who hold XDV know that Divvy cannot flood the market, even if the company's priorities or strategy changes.

Placing the money into escrow does not directly protect Divvy's holdings from malicious actors, but it sharply reduces the amount of XDV that can be quickly stolen or redirected if a malicious actor gains temporary control over Divvy's XDV accounts. This reduces the risk of catastrophic losses of XDV and increases the time for Divvy to detect, prevent, and track down unintended uses of Divvy's XDV assets.

### Use Case: Interledger Payments

**Background:** In the quickly-developing world of financial technology, one of the core challenges is coordinating activities that cross multiple digital money systems, or ledgers. Many proposed solutions to this problem (including early views of the XDV Ledger!) can be reduced to creating "one ledger to rule them all." Divvy believes no single system can meet the needs of everyone in the world: in fact, some desirable features are mutually exclusive. Instead, Divvy believes that an interconnected network of ledgers—an _interledger_—is the true future of financial technology. The [Interledger Protocol][] defines standards for making as many systems as possible connect securely and smoothly.

The most fundamental principle of inter-ledger payments is _conditional transfers_. Multi-hop payments have a risk problem: the more hops in the middle, the more places the payment can fail. Interledger solves this with the financial equivalent of a "[two-phase commit](https://en.wikipedia.org/wiki/Two-phase_commit_protocol)", where the two steps are (1) prepare conditional transfers, then (2) fulfill the conditions to execute the transfers. The Interledger project defined a [crypto-conditions][] specification to standardize automated ways to define and verify conditions, and settled on SHA-256 hashes as a "common denominator" of such conditions.

**Solution:** The Escrow feature makes the XDV Ledger ideal for bridging multi-hop payments using the Interledger Protocol, because it natively supports transfers that deliver XDV based on PREIMAGE-SHA-256 crypto-conditions, and it executes those transfers within seconds of being presented with the matching fulfillment.


## Further Reading

For more information about Escrow in the XDV Ledger, see the following:

- [Escrow Tutorials](use-escrows.html)
    - [Send a Time-Held Escrow](send-a-time-held-escrow.html)
    - [Send a conditionally-held escrow](send-a-conditionally-held-escrow.html)
    - [Look up escrows by sender or receiver](look-up-escrows.html)
- [Transaction Reference](transaction-formats.html)
    - [EscrowCreate transaction][]
    - [EscrowFinish transaction][]
    - [EscrowCancel transaction][]
- [Ledger Reference](ledger-data-formats.html)
    - [Escrow object](escrow-object.html)

For more information on Interledger and how conditional transfers enable secure payments across multiple ledgers, see [Interledger Architecture](https://interledger.org/rfcs/0001-interledger-architecture/).

For more information on Divvy's 55-Billion XDV Lockup, see [Divvy's Insights Blog](https://xdv.io/insights/divvy-to-place-55-billion-xdv-in-escrow-to-ensure-certainty-into-total-xdv-supply/).

<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/divvyd_versions.md' %}
