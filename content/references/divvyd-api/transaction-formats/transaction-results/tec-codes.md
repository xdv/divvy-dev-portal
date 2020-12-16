# tec Codes

These codes indicate that the transaction failed, but it was applied to a ledger to apply the [transaction cost](transaction-cost.html). They have numerical values in the range 100 to 199. Divvy recommends using the text code, not the numeric value.

For the most part, transactions with `tec` codes take no action other than to destroy the XDV paid as a [transaction cost](transaction-cost.html), but there are some exceptions. As an exception, a transaction that results in `tecOVERSIZE` still cleans up some [unfunded offers](offers.html#lifecycle-of-an-offer). Always look at the [transaction metadata](transaction-metadata.html) to see precisely what a transaction did.

**Caution:** A transaction that provisionally failed with a `tec` code may still succeed or fail with a different code after being reapplied. The result is final when it appears in a validated ledger version. For more information, see [Finality of Results](finality-of-results.html) and [Reliable Transaction Submission](reliable-transaction-submission.html).

| Code                       | Value | Explanation                             |
|:---------------------------|:------|:----------------------------------------|
| `tecCLAIM`                 | 100   | Unspecified failure, with transaction cost destroyed. |
| `tecCRYPTOCONDITION_ERROR` | 146   | This [EscrowCreate][] or [EscrowFinish][] transaction contained a malformed or mismatched crypto-condition. |
| `tecDIR_FULL`              | 121   | The transaction tried to add an object (such as a trust line, Check, Escrow, or Payment Channel) to an account's owner directory, but that account cannot own any more objects in the ledger. |
| `tecDST_TAG_NEEDED`        | 143   | The [Payment transaction][] omitted a destination tag, but the destination account has the `lsfRequireDestTag` flag enabled. [New in: divvyd 0.28.0][] |
| `tecEXPIRED`               | 148   | The transaction tried to create an object (such as an Offer or a Check) whose provided Expiration time has already passed. |
| `tecFAILED_PROCESSING`     | 105   | An unspecified error occurred when processing the transaction. |
| `tecFROZEN`                | 137   | The [OfferCreate transaction][] failed because one or both of the assets involved are subject to a [global freeze](freezes.html). |
| `tecINSUF_RESERVE_LINE`    | 122   | The transaction failed because the sending account does not have enough XDV to create a new trust line. (See: [Reserves](reserves.html)) This error occurs when the counterparty already has a trust line in a non-default state to the sending account for the same currency. (See `tecNO_LINE_INSUF_RESERVE` for the other case.) |
| `tecINSUF_RESERVE_OFFER`   | 123   | The transaction failed because the sending account does not have enough XDV to create a new Offer. (See: [Reserves](reserves.html)) |
| `tecINSUFFICIENT_RESERVE`  | 141   | The transaction would increase the [reserve requirement](reserves.html) higher than the sending account's balance. [SignerListSet][], [PaymentChannelCreate][], [PaymentChannelFund][], and [EscrowCreate][] can return this error code. See [SignerLists and Reserves](signerlist.html#signerlists-and-reserves) for more information. |
| `tecINTERNAL`              | 144   | Unspecified internal error, with transaction cost applied. This error code should not normally be returned. If you can reproduce this error, please [report an issue](https://github.com/xdv/divvyd/issues). |
| `tecINVARIANT_FAILED`      | 147   | An invariant check failed when trying to execute this transaction. Requires the [EnforceInvariants amendment](known-amendments.html#enforceinvariants). If you can reproduce this error, please [report an issue](https://github.com/xdv/divvyd/issues). |
| `tecNEED_MASTER_KEY`       | 142   | This transaction tried to cause changes that require the master key, such as [disabling the master key or giving up the ability to freeze balances](accountset.html#accountset-flags). [New in: divvyd 0.28.0][] |
| `tecNO_ALTERNATIVE_KEY`    | 130   | The transaction tried to remove the only available method of [authorizing transactions](transaction-basics.html#authorizing-transactions). This could be a [SetRegularKey transaction][] to remove the regular key, a [SignerListSet transaction][] to delete a SignerList, or an [AccountSet transaction][] to disable the master key. (Prior to `divvyd` 0.30.0, this was called `tecMASTER_DISABLED`.) |
| `tecNO_AUTH`               | 134   | The transaction failed because it needs to add a balance on a trust line to an account with the `lsfRequireAuth` flag enabled, and that trust line has not been authorized. If the trust line does not exist at all, `tecNO_LINE` occurs instead. |
| `tecNO_DST`                | 124   | The account on the receiving end of the transaction does not exist. This includes Payment and TrustSet transaction types. (It could be created if it received enough XDV.) |
| `tecNO_DST_INSUF_XDV`      | 125   | The account on the receiving end of the transaction does not exist, and the transaction is not sending enough XDV to create it. |
| `tecNO_ENTRY`              | 140   | Reserved for future use.                |
| `tecNO_ISSUER`             | 133   | The account specified in the `issuer` field of a currency amount does not exist. |
| `tecNO_LINE`               | 135   | The `TakerPays` field of the [OfferCreate transaction][] specifies an asset whose issuer has `lsfRequireAuth` enabled, and the account making the offer does not have a trust line for that asset. (Normally, making an offer implicitly creates a trust line if necessary, but in this case it does not bother because you cannot hold the asset without authorization.) If the trust line exists, but is not authorized, `tecNO_AUTH` occurs instead. |
| `tecNO_LINE_INSUF_RESERVE` | 126   | The transaction failed because the sending account does not have enough XDV to create a new trust line. (See: [Reserves](reserves.html)) This error occurs when the counterparty does not have a trust line to this account for the same currency. (See `tecINSUF_RESERVE_LINE` for the other case.) |
| `tecNO_LINE_REDUNDANT`     | 127   | The transaction failed because it tried to set a trust line to its default state, but the trust line did not exist. |
| `tecNO_PERMISSION`         | 139   | The sender does not have permission to do this operation. For example, the [EscrowFinish transaction][] tried to release a held payment before its `FinishAfter` time, someone tried to use [PaymentChannelFund][] on a channel the sender does not own, or a [Payment][] tried to deliver funds to an account with the "DepositAuth" flag enabled. |
| `tecNO_REGULAR_KEY`        | 131   | The [AccountSet transaction][] tried to disable the master key, but the account does not have another way to [authorize transactions](transaction-basics.html#authorizing-transactions). If [multi-signing](multi-signing.html) is enabled, this code is deprecated and `tecNO_ALTERNATIVE_KEY` is used instead. |
| `tecNO_TARGET`             | 138   | The transaction referenced an Escrow or PayChannel ledger object that doesn't exist, either because it never existed or it has already been deleted. (For example, another [EscrowFinish transaction][] has already executed the held payment.) Alternatively, the destination account has `asfDisallowXDV` set so it cannot be the destination of this [PaymentChannelCreate][] or [EscrowCreate][] transaction. |
| `tecOVERSIZE`              | 145   | This transaction could not be processed, because the server created an excessively large amount of metadata when it tried to apply the transaction. [New in: divvyd 0.29.0-hf1][] |
| `tecOWNERS`                | 132   | The transaction requires that account sending it has a nonzero "owners count", so the transaction cannot succeed. For example, an account cannot enable the [`lsfRequireAuth`](accountset.html#accountset-flags) flag if it has any trust lines or available offers. |
| `tecPATH_DRY`              | 128   | The transaction failed because the provided paths did not have enough liquidity to send anything at all. This could mean that the source and destination accounts are not linked by trust lines. |
| `tecPATH_PARTIAL`          | 101   | The transaction failed because the provided paths did not have enough liquidity to send the full amount. |
| `tecUNFUNDED`              | 129   | The transaction failed because the account does not hold enough XDV to pay the amount in the transaction _and_ satisfy the additional reserve necessary to execute this transaction. (See: [Reserves](reserves.html)) |
| `tecUNFUNDED_ADD`          | 102   | **DEPRECATED.**                         |
| `tecUNFUNDED_PAYMENT`      | 104   | The transaction failed because the sending account is trying to send more XDV than it holds, not counting the reserve. (See: [Reserves](reserves.html)) |
| `tecUNFUNDED_OFFER`        | 103   | The [OfferCreate transaction][] failed because the account creating the offer does not have any of the `TakerGets` currency. |

<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/divvyd_versions.md' %}
