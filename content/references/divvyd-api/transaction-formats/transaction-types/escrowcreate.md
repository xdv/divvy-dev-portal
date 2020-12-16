# EscrowCreate

[[Source]<br>](https://github.com/xdv/divvyd/blob/master/src/divvy/app/tx/impl/Escrow.cpp "Source")

_Requires the [Escrow Amendment](known-amendments.html#escrow)._

Sequester XDV until the escrow process either finishes or is canceled.

## Example {{currentpage.name}} JSON

```json
{
    "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "TransactionType": "EscrowCreate",
    "Amount": "10000",
    "Destination": "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
    "CancelAfter": 533257958,
    "FinishAfter": 533171558,
    "Condition": "A0258020E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855810100",
    "DestinationTag": 23480,
    "SourceTag": 11747
}
```

{% include '_snippets/tx-fields-intro.md' %}
<!--{# fix md highlighting_ #}-->


| Field            | JSON Type | [Internal Type][] | Description               |
|:-----------------|:----------|:------------------|:--------------------------|
| `Amount`         | String    | Amount            | Amount of [XDV, in drops][Currency Amount], to deduct from the sender's balance and escrow. Once escrowed, the XDV can either go to the `Destination` address (after the `FinishAfter` time) or returned to the sender (after the `CancelAfter` time). |
| `Destination`    | String    | AccountID         | Address to receive escrowed XDV. |
| `CancelAfter`    | Number    | UInt32            | _(Optional)_ The time, in [seconds since the Divvy Epoch][], when this escrow expires. This value is immutable; the funds can only be returned the sender after this time. |
| `FinishAfter`    | Number    | UInt32            | _(Optional)_ The time, in [seconds since the Divvy Epoch][], when the escrowed XDV can be released to the recipient. This value is immutable; the funds cannot move until this time is reached. |
| `Condition`      | String    | Blob              | _(Optional)_ Hex value representing a [PREIMAGE-SHA-256 crypto-condition](https://tools.ietf.org/html/draft-thomas-crypto-conditions-02#section-8.1). The funds can only be delivered to the recipient if this condition is fulfilled. |
| `DestinationTag` | Number    | UInt32            | _(Optional)_ Arbitrary tag to further specify the destination for this escrowed payment, such as a hosted recipient at the destination address. |

Either `CancelAfter` or `FinishAfter` must be specified. If both are included, the `FinishAfter` time must be before the `CancelAfter` time.

With the [fix1571 amendment](known-amendments.html#fix1571) enabled, you must supply `FinishAfter`, `Condition`, or both. [New in: divvyd 1.0.0][]

<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/divvyd_versions.md' %}
