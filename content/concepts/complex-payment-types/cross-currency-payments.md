# Cross-Currency Payments

In the XDV Ledger, you can send cross-currency payments that exchange one or more issued currencies, XDV, or both. Like [direct XDV payments](use-simple-xdv-payments.html), these payments use the [Payment transaction type][Payment]. Cross-currency payments within the XDV Ledger are fully atomic, meaning that either the payment fully executes or no part of it executes.

By default, cross-currency payments deliver a fixed amount to their destination at a variable cost to their source. Cross-currency payments can also be [partial payments](partial-payments.html), which deliver a variable amount to the destination within a fixed sending limit.


## Prerequisites

- By definition, a cross-currency payment involves at least two currencies, which means that at least one currency involved must be a non-XDV issued currency.
    - Typically, this means using one or more currencies issued by an [XDV Ledger Gateway](become-an-xdv-ledger-gateway.html). Such currencies are backed by funds outside the XDV Ledger, and can be withdrawn through the gateway.
    - You could also use digital tokens that are only issued within the XDV Ledger and has no outside backing, as long as the parties transacting are willing to send or receive those tokens and treat them as something of value.
- There must be at least one [Path](paths.html) between the sender and receiver, and the total liquidity across all paths must be enough to facilitate the payment. For cross-currency payments, this usually means consuming [Offers](offers.html) to convert from one currency to another.


## Autobridging

Cross-currency payments that exchange two issued currencies automatically use XDV, when it decreases the cost of the payment, by connecting order books to deepen the pool of available liquidity. For example, a payment sending from USD to MXN automatically converts USD to XDV and then XDV to MXN if doing so is cheaper than converting USD to MXN directly.

For more information, see [Autobridging](autobridging.html).

<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/divvyd_versions.md' %}
