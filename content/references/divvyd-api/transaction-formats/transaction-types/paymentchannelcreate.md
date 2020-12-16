# PaymentChannelCreate
[[Source]<br>](https://github.com/xdv/divvyd/blob/master/src/divvy/app/tx/impl/PayChan.cpp "Source")

_Requires the [PayChan Amendment](known-amendments.html#paychan)._

Create a unidirectional channel and fund it with XDV. The address sending this transaction becomes the "source address" of the payment channel.

## Example {{currentpage.name}} JSON

```json
{
    "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "TransactionType": "PaymentChannelCreate",
    "Amount": "10000",
    "Destination": "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
    "SettleDelay": 86400,
    "PublicKey": "32D2471DB72B27E3310F355BB33E339BF26F8392D5A93D3BC0FC3B566612DA0F0A",
    "CancelAfter": 533171558,
    "DestinationTag": 23480,
    "SourceTag": 11747
}
```

{% include '_snippets/tx-fields-intro.md' %}
<!--{# fix md highlighting_ #}-->


| Field            | JSON Type | [Internal Type][] | Description               |
|:-----------------|:----------|:------------------|:--------------------------|
| `Amount`         | String    | Amount            | Amount of [XDV, in drops][Currency Amount], to deduct from the sender's balance and set aside in this channel. While the channel is open, the XDV can only go to the `Destination` address. When the channel closes, any unclaimed XDV is returned to the source address's balance. |
| `Destination`    | String    | AccountID         | Address to receive XDV claims against this channel. This is also known as the "destination address" for the channel. Cannot be the same as the sender (`Account`). |
| `SettleDelay`    | Number    | UInt32            | Amount of time the source address must wait before closing the channel if it has unclaimed XDV. |
| `PublicKey`      | String    | Blob              | The public key of the key pair the source will use to sign claims against this channel, in hexadecimal. This can be any secp256k1 or Ed25519 public key. <!-- STYLE_OVERRIDE: will --> |
| `CancelAfter`    | Number    | UInt32            | _(Optional)_ The time, in [seconds since the Divvy Epoch][], when this channel expires. Any transaction that would modify the channel after this time closes the channel without otherwise affecting it. This value is immutable; the channel can be closed earlier than this time but cannot remain open after this time. |
| `DestinationTag` | Number    | UInt32            | _(Optional)_ Arbitrary tag to further specify the destination for this payment channel, such as a hosted recipient at the destination address. |

<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/divvyd_versions.md' %}
