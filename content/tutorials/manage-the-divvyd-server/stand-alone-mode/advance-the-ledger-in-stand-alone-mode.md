# Advance the Ledger in Stand-Alone Mode

In stand-alone mode, `divvyd` does not communicate to other members of the peer-to-peer network or participate in a consensus process. Instead, you must manually advance the ledger index using the [ledger_accept method][]:

```
divvyd ledger_accept --conf=/path/to/divvyd.cfg
```

In stand-alone mode, `divvyd` makes no distinction between a "closed" ledger version and a "validated" ledger version. (For more information about the difference, see [The XDV Ledger Consensus Process](consensus.html).)

Whenever `divvyd` closes a ledger, it reorders the transactions according to a deterministic but hard-to-game algorithm. (This is an important part of consensus, since transactions may arrive at different parts of the network in different order.) When using `divvyd` in stand-alone mode, you should manually advance the ledger before submitting a transaction that depends on the result of a transaction from a different address. Otherwise, the two transactions might be executed in reverse order when the ledger is closed. **Note:** You can safely submit multiple transactions from a single address to a single ledger, because `divvyd` sorts transactions from the same address in ascending order by [`Sequence` number](transaction-common-fields.html).


<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/divvyd_versions.md' %}
