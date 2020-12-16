# Send a Check

_Requires the [Checks Amendment](known-amendments.html#checks)._

Sending a Check is like writing permission for an intended recipient to pull a payment from you. The outcome of this process is a [Check object in the ledger](check.html) which the recipient can cash later.

In many cases, you want to send a [Payment][] instead of a Check, since that delivers the money directly to the recipient in one step. However, if your intended recipient uses [DepositAuth](depositauth.html), you cannot send them Payments directly, so a Check is a good alternative.

This tutorial uses the example of a fictitious company, BoxSend SG (whose XDV Ledger address is rBXsgNkPcDN2runsvWmwxk3Lh97zdgo9za) paying a fictitious cryptocurrency consulting company named Grand Payments (with XDV Ledger address rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis) for some consulting work. Grand Payments prefers be paid in XDV, but to simplify their taxes and regulation, only accepts payments they've explicitly approved.

Outside of the XDV Ledger, Grand Payments sends an invoice to BoxSend SG with the ID `46060241FABCF692D4D934BA2A6C4427CD4279083E38C77CBE642243E43BE291`, and requests a Check for 100 XDV be sent to Grand Payments' XDV Ledger address of rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis.

{% set send_n = cycler(* range(1,99)) %}

## Prerequisites

To send a Check with this tutorial, you need the following:

- The **address** and **secret key** of a funded account to send the Check from.
    - You can use the [XDV Ledger Test Net Faucet](https://xdv.io/build/xdv-test-net/) to get a funded address and secret with 10,000 Test Net XDV.
- The **address** of a funded account to receive the Check.
- A secure way to sign transactions, such as [DivvyAPI][] or your own [`divvyd` server](install-divvyd.html).
- A client library that can connect to a `divvyd` server, such as [DivvyAPI][] or any HTTP or WebSocket library.
    - For more information, see [Get Started with the `divvyd` API](get-started-with-the-divvyd-api.html).

## {{send_n.next()}}. Prepare the CheckCreate transaction

Decide how much money the Check is for and who can cash it. Figure out the values of the [CheckCreate transaction][] fields. The following fields are the bare minimum; everything else is either optional or can be [auto-filled](transaction-common-fields.html#auto-fillable-fields) when signing:

| Field             | Value                     | Description                  |
|:------------------|:--------------------------|:-----------------------------|
| `TransactionType` | String                    | Use the string `CheckCreate` here. |
| `Account`         | String (Address)          | The address of the sender who is creating the Check. (In other words, your address.) |
| `Destination`     | String (Address)          | The address of the intended recipient who can cash the Check. |
| `SendMax`         | String or Object (Amount) | The maximum amount the sender can be debited when this Check gets cashed. For XDV, use a string representing drops of XDV. For issued currencies, use an object with `currency`, `issuer`, and `value` fields. See [Specifying Currency Amounts][] for details. If you want the recipient to be able to cash the Check for an exact amount of a non-XDV currency with a [transfer fee](transfer-fees.html), remember to include an extra percentage to pay for the transfer fee. (For example, for the recipient to cash a Check for 100 CAD from an issuer with a 2% transfer fee, you must set the `SendMax` to 102 CAD from that issuer.) |

If you are using [DivvyAPI](divvyapi-reference.html), you can use the `prepareCheckCreate()` helper method.

**Note:** DivvyAPI supports Checks in versions 0.19.0 and up.

### Example CheckCreate Preparation

The following example shows a prepared Check from BoxSend SG (rBXsgNkPcDN2runsvWmwxk3Lh97zdgo9za) to Grand Payments (rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis) for 100 XDV. As additional (optional) metadata, BoxSend SG adds the ID of the invoice from Grand Payments so Grand Payments knows which invoice this Check is intended to pay.

<!-- MULTICODE_BLOCK_START -->

*JSON-RPC, WebSocket, or Commandline*

```
{
  "TransactionType": "CheckCreate",
  "Account": "rBXsgNkPcDN2runsvWmwxk3Lh97zdgo9za",
  "Destination": "rGPnRH1EBpHeTF2QG8DCAgM7z5pb75LAis",
  "SendMax": "100000000",
  "InvoiceID": "46060241FABCF692D4D934BA2A6C4427CD4279083E38C77CBE642243E43BE291"
}
```

*DivvyAPI*

```js
{% include '_code-samples/checks/js/prepareCreate.js' %}
```

<!-- MULTICODE_BLOCK_END -->

## {{send_n.next()}}. Sign the CheckCreate transaction

{% include '_snippets/tutorial-sign-step.md' %}
<!--{#_ #}-->

### Example Request

<!-- MULTICODE_BLOCK_START -->

*DivvyAPI*

```js
{% include '_code-samples/checks/js/signCreate.js' %}
```

*WebSocket*

```json
{% include '_code-samples/checks/websocket/sign-create-req.json' %}
```

*Commandline*

```bash
{% include '_code-samples/checks/cli/sign-create-req.sh' %}
```

<!-- MULTICODE_BLOCK_END -->

#### Example Response

<!-- MULTICODE_BLOCK_START -->

*DivvyAPI*

```js
{% include '_code-samples/checks/js/sign-create-resp.txt' %}
```

*WebSocket*

```json
{% include '_code-samples/checks/websocket/sign-create-resp.json' %}
```

*Commandline*

```json
{% include '_code-samples/checks/cli/sign-create-resp.txt' %}
```

<!-- MULTICODE_BLOCK_END -->

## {{send_n.next()}}. Submit the signed transaction

{% set step_1_link = "#1-prepare-the-checkcreate-transaction" %}
{% include '_snippets/tutorial-submit-step.md' %}
<!--{#_ #}-->

### Example Request

<!-- MULTICODE_BLOCK_START -->

*DivvyAPI*

```js
{% include '_code-samples/checks/js/submitCreate.js' %}
```

*WebSocket*

```json
{% include '_code-samples/checks/websocket/submit-create-req.json' %}
```

*Commandline*

```bash
{% include '_code-samples/checks/cli/submit-create-req.sh' %}
```

<!-- MULTICODE_BLOCK_END -->

### Example Response

<!-- MULTICODE_BLOCK_START -->

*DivvyAPI*

```js
{% include '_code-samples/checks/js/submit-create-resp.txt' %}
```

*WebSocket*

```json
{% include '_code-samples/checks/websocket/submit-create-resp.json' %}
```

*Commandline*

```json
{% include '_code-samples/checks/cli/submit-create-resp.txt' %}
```

<!-- MULTICODE_BLOCK_END -->


## {{send_n.next()}}. Wait for validation

{% include '_snippets/wait-for-validation.md' %}
<!--{#_ #}-->

## {{send_n.next()}}. Confirm final result

Use the [tx method][] with the CheckCreate transaction's identifying hash to check its status. Look for a `"TransactionResult": "tesSUCCESS"` field in the transaction's metadata, indicating that the transaction succeeded, and the field `"validated": true` in the result, indicating that this result is final.

Look for a `CreatedNode` object in the transaction metadata with a `LedgerEntryType` of `"Check"`. This indicates that the transaction created a [Check ledger object](check.html). The `LedgerIndex` of this object is the ID of the Check. In the following example, the Check's ID is `84C61BE9B39B2C4A2267F67504404F1EC76678806C1B901EA781D1E3B4CE0CD9`.

**Note:** DivvyAPI does not report the Check's ID when you look up a CheckCreate transaction. You can work around this by calculating the Check's ID from the [Check ID format](check.html#check-id-format), as in the example DivvyAPI code below. <!--{# TODO: Remove this and update the code samples if divvy-lib #876 gets fixed. #}-->

### Example Request

<!-- MULTICODE_BLOCK_START -->

*DivvyAPI*

```
{% include '_code-samples/checks/js/getCreateTx.js' %}
```

*WebSocket*

```json
{% include '_code-samples/checks/websocket/tx-create-req.json' %}
```

*Commandline*

```bash
{% include '_code-samples/checks/cli/tx-create-req.sh' %}
```

<!-- MULTICODE_BLOCK_END -->

### Example Response

<!-- MULTICODE_BLOCK_START -->

*DivvyAPI*

```
{% include '_code-samples/checks/js/get-create-tx-resp.txt' %}
```

*WebSocket*

```json
{% include '_code-samples/checks/websocket/tx-create-resp.json' %}
```

*Commandline*

```json
{% include '_code-samples/checks/cli/tx-create-resp.txt' %}
```

<!-- MULTICODE_BLOCK_END -->

<!--{# common link defs #}-->
[DivvyAPI]: divvyapi-reference.html
{% include '_snippets/divvyd-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/divvyd_versions.md' %}
