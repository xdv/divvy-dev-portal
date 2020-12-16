<!--{# Links within the dev portal #}-->
[Address]: basic-data-types.html#addresses
[admin command]: admin-divvyd-methods.html
[common fields]: transaction-common-fields.html
[Currency Amount]: basic-data-types.html#specifying-currency-amounts
[Currency Code]: currency-formats.html#currency-codes
[drops of XDV]: basic-data-types.html#specifying-currency-amounts
[Hash]: basic-data-types.html#hashes
[Internal Type]: serialization.html
[Ledger Index]: basic-data-types.html#ledger-index
[Marker]: markers-and-pagination.html
[result code]: transaction-results.html
[seconds since the Divvy Epoch]: basic-data-types.html#specifying-time
[Sequence Number]: basic-data-types.html#account-sequence
[SHA-512Half]: basic-data-types.html#hashes
[Specifying Currency Amounts]: basic-data-types.html#specifying-currency-amounts
[Specifying Ledgers]: basic-data-types.html#specifying-ledgers
[Specifying Time]: basic-data-types.html#specifying-time
[standard format]: response-formatting.html
[Transaction Cost]: transaction-cost.html
[transaction cost]: transaction-cost.html
[universal error types]: error-formatting.html#universal-errors
[XDV, in drops]: basic-data-types.html#specifying-currency-amounts

<!--{# Links to external sites #}-->
[base58]: https://en.wikipedia.org/wiki/Base58
[crypto-condition]: https://tools.ietf.org/html/draft-thomas-crypto-conditions-03
[crypto-conditions]: https://tools.ietf.org/html/draft-thomas-crypto-conditions-03
[hexadecimal]: https://en.wikipedia.org/wiki/Hexadecimal
[Interledger Protocol]: https://interledger.org/
[RFC-1751]: https://tools.ietf.org/html/rfc1751
[divvy-lib]: https://github.com/xdv/divvy-lib

<!--{# divvyd API methods #}-->
{% set api_methods = [
  "account_channels",
  "account_currencies",
  "account_info",
  "account_lines",
  "account_objects",
  "account_offers",
  "account_tx",
  "book_offers",
  "can_delete",
  "channel_authorize",
  "channel_verify",
  "connect",
  "consensus_info",
  "deposit_authorized",
  "feature",
  "fee",
  "fetch_info",
  "gateway_balances",
  "get_counts",
  "json",
  "ledger",
  "ledger_accept",
  "ledger_cleaner",
  "ledger_closed",
  "ledger_current",
  "ledger_data",
  "ledger_entry",
  "ledger_request",
  "log_level",
  "logrotate",
  "nodivvy_check",
  "path_find",
  "peers",
  "ping",
  "print",
  "random",
  "divvy_path_find",
  "server_info",
  "server_state",
  "sign",
  "sign_for",
  "stop",
  "submit",
  "submit_multisigned",
  "subscribe",
  "transaction_entry",
  "tx",
  "tx_history",
  "unsubscribe",
  "validation_create",
  "validation_seed",
  "validator_list_sites",
  "validators",
  "wallet_propose"
] %}

{% for method in api_methods %}
[{{method}} method]: {{method|lower}}.html
[{{method}} command]: {{method|lower}}.html
{% endfor %}
