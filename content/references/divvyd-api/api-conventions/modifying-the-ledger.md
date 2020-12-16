# Modifying the Ledger

All changes to the XDV Ledger happen as the result of transactions. The only API methods that can change the contents of the XDV Ledger are the commands that submit transactions. Even then, changes only apply permanently if the transactions are approved by the [consensus process](consensus.html). Most other public methods represent different ways to view the data represented in the XDV Ledger, or request information about the state of the server.

Transaction submission commands:

- [submit method][]
- [submit_multisigned method][]

For more information on the various transactions you can submit, see the [Transaction Formats Reference](transaction-formats.html).

<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/divvyd_versions.md' %}
