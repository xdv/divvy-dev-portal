# PaymentChannelFund
[[Source]<br>](https://github.com/xdv/divvyd/blob/master/src/divvy/app/tx/impl/PayChan.cpp "Source")

_Requires the [PayChan Amendment](known-amendments.html#paychan)._

Add additional XDV to an open payment channel, update the expiration time of the channel, or both. Only the source address of the channel can use this transaction. (Transactions from other addresses fail with the error `tecNO_PERMISSION`.)

Example PaymentChannelFund:

```json
{
    "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
    "TransactionType": "PaymentChannelFund",
    "Channel": "C1AE6DDDEEC05CF2978C0BAD6FE302948E9533691DC749DCDD3B9E5992CA6198",
    "Amount": "200000",
    "Expiration": 543171558
}
```

{% include '_snippets/tx-fields-intro.md' %}
<!--{# fix md highlighting_ #}-->

| Field        | JSON Type | [Internal Type][] | Description                   |
|:-------------|:----------|:------------------|:------------------------------|
| `Channel`    | String    | Hash256           | The unique ID of the channel to fund, as a 64-character hexadecimal string. |
| `Amount`     | String    | Amount            | Amount of [XDV, in drops][Currency Amount] to add to the channel. To set the expiration for a channel without adding more XDV, set this to `"0"`. |
| `Expiration` | Number    | UInt32            | _(Optional)_ New `Expiration` time to set for the channel, in seconds since the Divvy Epoch. This must be later than either the current time plus the `SettleDelay` of the channel, or the existing `Expiration` of the channel. After the `Expiration` time, any transaction that would access the channel closes the channel without taking its normal action. Any unspent XDV is returned to the source address when the channel closes. (`Expiration` is separate from the channel's immutable `CancelAfter` time.) For more information, see the [PayChannel ledger object type](paychannel.html). |

<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/divvyd_versions.md' %}
