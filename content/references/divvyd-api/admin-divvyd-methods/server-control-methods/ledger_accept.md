# ledger_accept
[[Source]<br>](https://github.com/xdv/divvyd/blob/a61ffab3f9010d8accfaa98aa3cacc7d38e74121/src/divvy/rpc/handlers/LedgerAccept.cpp "Source")

The `ledger_accept` method forces the server to close the current-working ledger and move to the next ledger number. This method is intended for testing purposes only, and is only available when the `divvyd` server is running stand-alone mode.

*The `ledger_accept` method is an [admin method](admin-divvyd-methods.html) that cannot be run by unprivileged users!*

### Request Format

An example of the request format:

<!-- MULTICODE_BLOCK_START -->

*WebSocket*

```
{
   "id": "Accept my ledger!",
   "command": "ledger_accept"
}
```

*Commandline*

```
#Syntax: ledger_accept
divvyd ledger_accept
```

<!-- MULTICODE_BLOCK_END -->

The request accepts no parameters.

### Response Format

An example of a successful response:
```js
{
  "id": "Accept my ledger!",
  "status": "success",
  "type": "response",
  "result": {
    "ledger_current_index": 6643240
  }
}
```

The response follows the [standard format][], with a successful result containing the following field:

| `Field`                | Type             | Description                      |
|:-----------------------|:-----------------|:---------------------------------|
| `ledger_current_index` | Unsigned Integer | Sequence number of the newly created 'current' ledger |

**Note:** When you close a ledger, `divvyd` determines the canonical order of transactions in that ledger and replays them. This can change the outcome of transactions that were provisionally applied to the current ledger.

### Possible Errors

* Any of the [universal error types][].
* `notStandAlone` - If the `divvyd` server is not currently running in stand-alone mode.

<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/divvyd_versions.md' %}
