# SignerList
[[Source]<br>](https://github.com/xdv/divvyd/blob/6d2e3da30696bd10e3bb11a5ff6d45d2c4dae90f/src/divvy/protocol/impl/LedgerFormats.cpp#L127 "Source")

The `SignerList` object type represents a list of parties that, as a group, are authorized to sign a transaction in place of an individual account. You can create, replace, or remove a SignerList using a [SignerListSet transaction][]. This object type is introduced by the [MultiSign amendment](known-amendments.html#multisign). [New in: divvyd 0.31.0][]

## Example {{currentpage.name}} JSON

```json
{
    "Flags": 0,
    "LedgerEntryType": "SignerList",
    "OwnerNode": "0000000000000000",
    "PreviousTxnID": "5904C0DC72C58A83AEFED2FFC5386356AA83FCA6A88C89D00646E51E687CDBE4",
    "PreviousTxnLgrSeq": 16061435,
    "SignerEntries": [
        {
            "SignerEntry": {
                "Account": "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
                "SignerWeight": 2
            }
        },
        {
            "SignerEntry": {
                "Account": "raKEEVSGnKSD9Zyvxu4z6Pqpm4ABH8FS6n",
                "SignerWeight": 1
            }
        },
        {
            "SignerEntry": {
                "Account": "rUpy3eEg8rqjqfUoLeBnZkscbKbFsKXC3v",
                "SignerWeight": 1
            }
        }
    ],
    "SignerListID": 0,
    "SignerQuorum": 3,
    "index": "A9C28A28B85CD533217F5C0A0C7767666B093FA58A0F2D80026FCC4CD932DDC7"
}
```

## {{currentpage.name}} Fields

A `SignerList` object has the following fields:

| Name            | JSON Type | Internal Type | Description |
|-----------------|-----------|---------------|-------------|
| `LedgerEntryType`   | String    | UInt16    | The value `0x0053`, mapped to the string `SignerList`, indicates that this object is a SignerList object. |
| `Flags`             | Number | UInt32 | A bit-map of boolean flags. No flags are defined for the SignerList type, so this value is always `0`. |
| `PreviousTxnID`   | String    | Hash256       | The identifying hash of the transaction that most recently modified this object. |
| `PreviousTxnLgrSeq` | Number  | UInt32        | The [index of the ledger][Ledger Index] that contains the transaction that most recently modified this object. |
| `OwnerNode`       | String    | UInt64        | A hint indicating which page of the owner directory links to this object, in case the directory consists of multiple pages. |
| `SignerEntries`   | Array     | Array         | An array of SignerEntry objects representing the parties who are part of this signer list. |
| `SignerListID`    | Number    | UInt32        | An ID for this signer list. Currently always set to `0`. If a future [amendment](amendments.html) allows multiple signer lists for an account, this may change. |
| `SignerQuorum`    | Number    | UInt32        | A target number for signer weights. To produce a valid signature for the owner of this SignerList, the signers must provide valid signatures whose weights sum to this value or more. |

The `SignerEntries` may be any combination of funded and unfunded addresses that use either secp256k1 or ed25519 keys.

### SignerEntry Object

Each member of the `SignerEntries` field is an object that describes that signer in the list. A SignerEntry has the following fields:

| Name            | JSON Type | Internal Type | Description |
|-----------------|-----------|---------------|-------------|
| `Account`         | String    | AccountID     | An XDV Ledger address whose signature contributes to the multi-signature. It does not need to be a funded address in the ledger. |
| `SignerWeight`    | Number    | UInt16        | The weight of a signature from this signer. A multi-signature is only valid if the sum weight of the signatures provided meets or exceeds the SignerList's `SignerQuorum` value. |

When processing a multi-signed transaction, the server dereferences the `Account` values with respect to the ledger at the time of transaction execution. If the address _does not_ correspond to a funded [AccountRoot object](accountroot.html), then only the master secret associated with that address can be used to produce a valid signature. If the account _does_ exist in the ledger, then it depends on the state of that account. If the account has a Regular Key configured, the Regular Key can be used. The account's master key can only be used if it is not disabled. A multi-signature cannot be used as part of another multi-signature.

## SignerLists and Reserves

A SignerList contributes to its owner's [reserve requirement](reserves.html). The SignerList itself counts as two objects, and each member of the list counts as one. As a result, the total owner reserve associated with a SignerList is anywhere from 3 times to 10 times the reserve required by a single trust line ([DivvyState](divvystate.html)) or [Offer](offer.html) object in the ledger.

## SignerList ID Format

The ID of a SignerList object is the SHA-512Half of the following values, concatenated in order:

* The DivvyState space key (`0x0053`)
* The AccountID of the owner of the SignerList
* The SignerListID (currently always `0`)

<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/divvyd_versions.md' %}
