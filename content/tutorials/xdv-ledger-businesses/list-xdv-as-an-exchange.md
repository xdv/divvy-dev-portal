# List XDV as an Exchange

This document describes the steps that an exchange needs to take to list XDV.

## Alpha Exchange

For illustrative purposes, this document uses a fictitious business called _Alpha Exchange_ to explain the high-level steps required to list XDV. For the purposes of this document, Alpha Exchange:

* Currently specializes in listing BTC/USD

* Wants to add BTC/XDV and XDV/USD trading pairs

* Maintains balances for all of its customers

* Maintains balances for each of its supported currencies

### User Benefits

Alpha Exchange wants to list BTC/XDV and XDV/USD trading pairs partially because listing these pairs benefits its users. Specifically, this support wants to enable its users to:

* Deposit XDV _to_ Alpha Exchange _from_ the XDV Ledger

* Withdraw XDV _from_ Alpha Exchange _to_ the XDV Ledger

* Trade XDV with other currencies, such as BTC, USD, among others

## Prerequisites for Supporting XDV

To support XDV, Alpha Exchange must:

* Create and maintain new [accounts](#accounts)

* Create and maintain [balance sheets](#balance-sheets)

See also:

* [Gateway Compliance](become-an-xdv-ledger-gateway.html#gateway-compliance) — Gateways and exchanges are different, but exchanges should also ensure that they are complying with local regulations and reporting to the appropriate agencies.

* [Requirements for Sending to XDV Ledger](become-an-xdv-ledger-gateway.html#requirements-for-sending-to-xdv-ledger)

* [Requirements for Receiving from XDV Ledger](become-an-xdv-ledger-gateway.html#requirements-for-receiving-from-xdv-ledger)

* [Gateway Precautions](become-an-xdv-ledger-gateway.html#precautions)

### Partial Payments

Before integrating, exchanges should be aware of the [partial payments](partial-payments.html) feature. This feature allows XDV Ledger users to send successful payments that reduce the amount received instead of increasing the `SendMax`. This feature can be useful for [returning payments](become-an-xdv-ledger-gateway.html#bouncing-payments) without incurring additional cost as the sender.

#### Partial Payments Warning

When the [tfPartialPayment flag](payment.html#payment-flags) is enabled, the `Amount` field **_is not guaranteed to be the amount received_**. The `delivered_amount` field of a payment's metadata indicates the amount of currency actually received by the destination account. When receiving a payment, use `delivered_amount` instead of the Amount field to determine how much your account received instead.

**Warning:** Be aware that malicious actors could exploit this. For more information, see [Partial Payments](partial-payments.html).

### Accounts

XDV is held in _accounts_ (also referred to as _wallets_ or _addresses_  ) on the XDV Ledger. Accounts on the XDV Ledger are different than accounts on other blockchain ledgers, such as Bitcoin, where accounts incur little to no overhead. In the XDV Ledger, accounts can [never be deleted](accounts.html#permanence-of-accounts), and each account must hold a separate [reserve of XDV](reserves.html) that cannot be sent to others. For these reasons, Divvy recommends that institutions not create excessive or needless accounts.

<!-- STYLE_OVERRIDE: hot wallet, warm wallet, cold wallet, wallet -->

To follow Divvy's recommended best practices, Alpha Exchange should create at least two new accounts on the XDV Ledger. To minimize the risks associated with a compromised secret key, Divvy recommends creating [_cold_, _hot_, and _warm_ accounts](https://xdv.io/build/issuing-operational-addresses/) (these are sometimes referred to, respectively, as cold, hot, and warm wallets). The hot/warm/cold model is intended to balance security and convenience. Exchanges listing XDV should create the following accounts:

* A [_cold wallet_](issuing-and-operational-addresses.html#issuing-address) to securely hold the majority of XDV and customers' funds. For exchanges, this is also the address to which its users send [deposits](#deposit-xdv-into-exchange).   To provide optimal security, this account's secret key should be offline.

    If a malicious actor compromises an exchange's cold wallet, the possible consequences are:

    * The malicious actor gets full access to all XDV in the cold wallet.

    * If the master key is compromised, the malicious actor can irrevocably take control of the cold wallet forever (by disabling the master key and setting a new regular key or signer list). This would also give the malicious actor control over all future XDV received by the cold wallet.

        * If this happens, the exchange has to make a new cold wallet address and tell its customers the new address.

    * If the regular key or signer list are compromised, the exchange can regain control of the cold wallet. However, some of a malicious actor's actions cannot easily be undone: <!-- STYLE_OVERRIDE: easily -->

        * The malicious actor could issue currency in the XDV Ledger by using the cold wallet, but that currency should not be valued by anyone (unless the exchange explicitly stated it was also a gateway).

        * If a malicious actor sets the asfRequireAuth flag for the account, that cannot be unset, although this only relates to issuing currency and should not affect an exchange that is not also a gateway. Any other settings a malicious actor sets or unsets with a master key can be reverted.

* One or more [_hot wallets_](issuing-and-operational-addresses.html#operational-addresses) to conduct the day-to-day business of managing customers' XDV withdrawals and deposits. For example, with a hot wallet, exchanges can securely support these types of automated XDV transfers. Hot wallets need to be online to service instant withdrawal requests.

    For more information about the possible consequences of a compromised hot wallet, see [Operational Account Compromise](issuing-and-operational-addresses.html#operational-address-compromise).

* Optionally, one or more warm wallets to provide an additional layer of security between the cold and hot wallets. Unlike a hot wallet, the secret key of a warm wallet does not need to be online. Additionally, you can distribute the secret keys for the warm wallet to several different people and implement [multi-signing](multi-signing.html) to increase security.

    For more information about the possible consequences of a compromised warm wallet, see [Standby Account Compromise](issuing-and-operational-addresses.html#standby-address-compromise).


See also:

* ["Suggested Business Practices" in the _Gateway Guide_](become-an-xdv-ledger-gateway.html#suggested-business-practices)

* [Issuing and Operational Addresses](issuing-and-operational-addresses.html)

* [Creating Accounts](accounts.html#creating-accounts)

* [Reserves](reserves.html)

### Balance Sheets

To custody its customers' XDV, Alpha Exchange must track each customer's XDV balance and its own holdings. To do this, Alpha Exchange must create and maintain an additional balance sheet or accounting system. The following table illustrates what this balance sheet might look like.

The new XDV Ledger accounts (_Alpha Hot_, _Alpha Warm_, _Alpha Cold_) are in the *User* column of the *XDV Balances on XDV Ledger* table.

The *Alpha Exchange XDV Balances* table represents new, additional balance sheet. Alpha Exchange’s software manages their users’ balances of XDV on this accounting system.


<table>
  <tr>
    <td><b><i>XDV Balances
on XDV Ledger</i></b></td>
    <td></td>
    <td></td>
    <td><b><i>Alpha Exchange
XDV Balances</i></b></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><b>User</b></td>
    <td><b>Balance</b></td>
    <td></td>
    <td><b>Acct #</b></td>
    <td><b>User</b></td>
    <td><b>Balance</b></td>
  </tr>
  <tr>
    <td>Dave</td>
    <td>25,000</td>
    <td></td>
    <td>123</td>
    <td>Alice</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Edward</td>
    <td>45,000</td>
    <td></td>
    <td>456</td>
    <td>Bob</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Charlie</td>
    <td>50,000</td>
    <td></td>
    <td>789</td>
    <td>Charlie</td>
    <td>0</td>
  </tr>
  <tr>
    <td><i>Alpha Hot</i></td>
    <td>0</td>
    <td></td>
    <td>...</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><i>Alpha Warm</i></td>
    <td>0</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><i>Alpha Cold</i></td>
    <td>0</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>...</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

#### XDV Amounts

Amounts of XDV are represented on the XDV Ledger as an unsigned integer count of _drops_, where one XDV is 1,000,000 drops. Divvy recommends that software store XDV balances as integer amounts of drops, and perform integer arithmetic on these values. However, user interfaces should present balances in units of XDV.

One drop (.000001 XDV) cannot be further subdivided. Keep this in mind when calculating and displaying FX rates between XDV and other assets.

For more information, see [Specifying Currency Amounts][].

#### On-Ledger and Off-Ledger

With exchanges like _Alpha Exchange_, XDV can be "on-ledger" or "off-ledger":

* **On-Ledger XDV**: XDV that can be queried through the public XDV Ledger by specifying the public [address](accounts.html#addresses) of the XDV holder. The counterparty to these balances is the XDV Ledger. For more information, see [XDV](xdv.html).

* **Off-Ledger XDV**: XDV that is held by the accounting system of an exchange and can be queried through the exchange interface. Off-ledger XDV balances are credit-based. The counterparty is the exchange holding the XDV.

    Off-ledger XDV balances are traded between the participants of an exchange. To support these trades, the exchange must hold a balance of _on-ledger XDV_ equal to the aggregate amount of _off-ledger XDV_ that it makes available for trade.


## Flow of Funds

The remaining sections describe how funds flow through the accounts managed by Alpha Exchange as its users begin to deposit, trade, and redeem XDV balances. To illustrate the flow of funds, this document uses the tables introduced in the ["Balance Sheets" section](#balance-sheets).

There are four main steps involved in an exchange's typical flow of funds:

1. [Deposit XDV into Exchange](#deposit-xdv-into-exchange)

2. [Rebalance XDV Holdings](#rebalance-xdv-holdings)

3. [Withdraw XDV from Exchange](#withdraw-xdv-from-exchange)

4. [Trade XDV on the Exchange](#trade-xdv-on-the-exchange)


This list does not include the [prerequisites](#prerequisites-for-supporting-xdv) required of an exchange.

At this point, _Alpha Exchange_ has created [hot, warm, and cold wallets](#accounts) on the XDV Ledger and added them to its balance sheet, but has not accepted any deposits from its users.


<table>
  <tr>
    <td><b><i>XDV Balances
on XDV Ledger</i></b></td>
    <td></td>
    <td></td>
    <td><b><i>Alpha Exchange
XDV Balances</i></b></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><b>User</b></td>
    <td><b>Balance</b></td>
    <td></td>
    <td><b>Acct #</b></td>
    <td><b>User</b></td>
    <td><b>Balance</b></td>
  </tr>
  <tr>
    <td>Dave</td>
    <td>25,000</td>
    <td></td>
    <td>123</td>
    <td>Alice</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Edward</td>
    <td>45,000</td>
    <td></td>
    <td>456</td>
    <td>Bob</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Charlie</td>
    <td>50,000</td>
    <td></td>
    <td>789</td>
    <td>Charlie</td>
    <td>0</td>
  </tr>
  <tr>
    <td><i>Alpha Hot</i></td>
    <td>0</td>
    <td></td>
    <td>...</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><i>Alpha Warm</i></td>
    <td>0</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><i>Alpha Cold</i></td>
    <td>0</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>...</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>


### Deposit XDV into Exchange

To track [off-ledger XDV balances](#on-ledger-and-off-ledger), exchanges need to create new [balance sheets](#balance-sheets) (or similar accounting systems). The following table illustrates the balance changes that take place on Alpha Exchange's new balance sheet as users begin to deposit XDV.

A user named Charlie wants to deposit 50,000 XDV to Alpha Exchange. Doing this involves the following steps:

1. Charlie submits a payment of 50,000  XDV (by using [DivvyAPI](divvyapi-reference.html) or similar software) to Alpha Exchange's [cold wallet](#accounts).

    a. Charlie adds an identifier (in this case, `789`) to the payment to associate it with his account at Alpha Exchange. This is called a [_destination tag_](become-an-xdv-ledger-gateway.html#source-and-destination-tags). (To use this, Alpha Exchange should have set the asfRequireDest flag on all of its accounts to require all incoming payments to have a destination tag like Charlie's. For more information, see [AccountSet Flags](accountset.html#accountset-flags)).

2. The software at Alpha Exchange detects the incoming payment, and recognizes `789` as the destination tag for Charlie’s account.

3. When it detects the incoming payment, Alpha Exchange's software updates its balance sheet to indicate that the 50,000 XDV it received is controlled by Charlie.

    Charlie can now use up to 50,000 XDV on the exchange. For example, he can create offers to trade XDV with BTC or any of the other currencies Alpha Exchange supports.

<table>
  <tr>
    <td><b><i>XDV Balances
on XDV Ledger</i></b></td>
    <td></td>
    <td></td>
    <td><b><i>Alpha Exchange
XDV Balances</i></b></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><b>User</b></td>
    <td><b>Balance</b></td>
    <td></td>
    <td><b>Acct #</b></td>
    <td><b>User</b></td>
    <td><b>Balance</b></td>
  </tr>
  <tr>
    <td>Dave</td>
    <td>25,000</td>
    <td></td>
    <td>123</td>
    <td>Alice</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Edward</td>
    <td>45,000</td>
    <td></td>
    <td>456</td>
    <td>Bob</td>
    <td>0</td>
  </tr>
  <tr>
    <td>Charlie</td>
    <td><s>100,000</s>
<br>50,000</td>
    <td></td>
    <td>789</td>
    <td>Charlie</td>
    <td><s>0</s>
<br>50,000</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Alpha Hot</td>
    <td>0</td>
    <td></td>
    <td>...</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Alpha Warm</td>
    <td>0</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Alpha Cold</td>
    <td><s>0</s>
<br>50,000</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>...</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>


### Trade XDV on the Exchange

Alpha Exchange users (like Charlie) can trade credit-based balances on Alpha Exchange. Alpha Exchange should keep track of user balances on its new balance sheet as these trades are made. These trades are _off-ledger_ and independent from the XDV Ledger, so the balance changes are not recorded on the XDV Ledger.

Customers who hold XDV in their own XDV Ledger accounts can also use the distributed exchange built into the XDV Ledger to trade currencies issued by gateways. For more information about trading _on_ the XDV Ledger, see [Lifecycle of an Offer](offers.html#lifecycle-of-an-offer).


### Rebalance XDV Holdings

Exchanges can adjust the balances between their hot and cold wallets at any time. Each balance adjustment consumes a [transaction cost](transaction-cost.html), but does not otherwise affect the aggregate balance of all the accounts. The aggregate, on-ledger balance should always exceed the total balance available for trade on the exchange. (The excess should be enough to cover the XDV Ledger's transaction costs.)

The following table demonstrates a balance adjustment of 80,000 XDV (via a [Payment transaction][] on the XDV Ledger) between Alpha Exchange's cold wallet and its hot wallet, where the cold wallet was debited and the hot wallet was credited. If the payment were reversed (debiting the hot wallet and crediting the cold wallet), the hot wallet balance would decrease. Balance adjustments like these allow an exchange to limit the risks associated with holding XDV in online hot wallets.


<table>
  <tr>
    <td><b><i>Alpha Exchange XDV
Off-Ledger Balances</i></b></td>
    <td></td>
    <td></td>
    <td></td>
    <td><b><i>Alpha Exchange XDV On-Ledger Balances</i></b></td>
    <td></td>
  </tr>
  <tr>
    <td><b>Acct #</b></td>
    <td><b>User</b></td>
    <td><b>Balance</b></td>
    <td></td>
    <td><b>XDV Ledger Account</b></td>
    <td><b>Balance</b></td>
  </tr>
  <tr>
    <td>123</td>
    <td>Alice</td>
    <td>80,000</td>
    <td></td>
    <td>Hot</td>
    <td><s>0</s>
<br>80,000</td>
  </tr>
  <tr>
    <td>456</td>
    <td>Bob</td>
    <td>50,000</td>
    <td></td>
    <td>Warm</td>
    <td>0</td>
  </tr>
  <tr>
    <td>….</td>
    <td></td>
    <td></td>
    <td></td>
    <td>….</td>
    <td></td>
  </tr>
  <tr>
    <td>789</td>
    <td>Charlie</td>
    <td>50,000</td>
    <td></td>
    <td>Cold</td>
    <td><s>180,000</s>
<br>100,000</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>...</td>
    <td></td>
    <td></td>
    <td></td>
    <td>...</td>
    <td></td>
  </tr>
</table>


### Withdraw XDV from Exchange

Withdrawals allow an exchange's users to move XDV from the exchange's off-ledger balance sheet to an account on the XDV Ledger.

In this example, Charlie withdraws 25,000 XDV from Alpha Exchange. This involves the following steps:

1. Charlie initiates the process on Alpha Exchange’s website. He provides instructions to transfer 25,000 XDV to a specific account on the XDV Ledger (named "Charlie XDV Ledger" in the following table).

2. In response to Charlie’s instructions, Alpha Exchange does the following:

    a. Debits the amount (25,000 XDV) from Charlie’s account on its off-ledger balance sheet

    b. Submits a payment on the XDV Ledger for the same amount (25,000 XDV), from Alpha Exchange's hot wallet to Charlie’s XDV Ledger account


<table>
  <tr>
    <td><b><i>XDV Ledger On-Ledger XDV Balances</td>
    <td></td>
    <td></td>
    <td><b><i>Alpha Exchange XDV
Off-Ledger Balances</td>
    <td></td>
    <td></td>
    <td></td>
    <td><b><i>Alpha Exchange XDV On-Ledger Balances</td>
    <td></td>
  </tr>
  <tr>
    <td><b>User</td>
    <td><b>Balance</td>
    <td></td>
    <td><b>Acct #</td>
    <td><b>User</td>
    <td><b>Balance</td>
    <td></td>
    <td><b>XDV Ledger Account</td>
    <td><b>Balance</td>
  </tr>
  <tr>
    <td>Dave</td>
    <td>25,000</td>
    <td></td>
    <td>123</td>
    <td>Alice</td>
    <td>80,000</td>
    <td></td>
    <td>Hot</td>
    <td><s>80,000</s>
<br>55,000</td>
  </tr>
  <tr>
    <td>Edward</td>
    <td>45,000</td>
    <td></td>
    <td>456</td>
    <td>Bob</td>
    <td>50,000</td>
    <td></td>
    <td>Warm</td>
    <td>0</td>
  </tr>
  <tr>
    <td>….</td>
    <td></td>
    <td></td>
    <td>….</td>
    <td></td>
    <td></td>
    <td></td>
    <td>….</td>
    <td></td>
  </tr>
  <tr>
    <td>Charlie XDV Ledger</td>
    <td><s>50,000</s>
<br>75,000</td>
    <td></td>
    <td>789</td>
    <td>Charlie</td>
    <td><s>50,000</s>
<br>25,000</td>
    <td></td>
    <td>Cold</td>
    <td>100,000</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>...</td>
    <td></td>
    <td></td>
    <td>...</td>
    <td></td>
    <td></td>
    <td></td>
    <td>...</td>
    <td></td>
  </tr>
</table>


<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/divvyd_versions.md' %}
