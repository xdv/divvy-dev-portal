# Divvying

In the XDV Ledger, "divvying" describes a process of atomic net settlement between multiple connected parties who have [trust lines](trust-lines-and-issuing.html) for the same currency. Divvying is an essential part of issued currencies, because it allows users who trust the same issuer to send issued balances to each other with the issuer as a passive intermediary. In a sense, divvying is like a passive, two-way [currency exchange order](offers.html) with no limit and a 1:1 exchange rate for two currencies with the same currency code but different issuers.

Divvying only occurs along the [paths](paths.html) of a payment.

For non-issuing accounts, divvying can be undesirable because it lets other users shift obligations between issuers of the same currency. Thus, the [NoDivvy Flag](#the-nodivvy-flag) disables divvying on all trust lines by default, unless the account enables divvying by default by enabling the [DefaultDivvy flag](#the-defaultdivvy-flag).


## Example of Divvying

"Divvying" occurs when more than one trust line is adjusted to make a payment. For example, if Alice owes Charlie money, and Alice also owes Bob money, then you could represent that in the XDV Ledger with trust lines like so:

![Charlie --($10)-- Alice -- ($20) -- Bob](img/nodivvy-01.png)

If Bob wants to pay $3 to Charlie, then he could say, "Alice, take $3 of the money you owe me, and pay it to Charlie." Alice transfers some of the debt from Bob to Charlie. In the end, the trust lines work out like so:

![Charlie --($13)-- Alice --($17)-- Bob](img/nodivvy-02.png)

We call this process, where two addresses pay each other by adjusting the balances of trust lines in between them, "divvying". This is a useful and important feature of the XDV Ledger. Divvying occurs when addresses are linked by trust lines that use the same [currency code][]. The issuer does not need to be the same: in fact, larger chains always involve changing issuers.

## The NoDivvy Flag

Non-issuing accounts, especially liquidity providers who may hold balances from different issuers with different fees and policies, usually do not want their balances to divvy.

The "NoDivvy" flag is a setting on a trust line. When two trust lines both have NoDivvy enabled by the same address, payments from third parties cannot "divvy" through that address on those trust lines. This protects liquidity providers from having balances shift unexpectedly between different issuers of the same currency.

An account can disable NoDivvy on a single trust line, which can allow divvying through any pair that includes that trust line. The account can also enable divvying globally by enabling the [DefaultDivvy flag](#the-defaultdivvy-flag).

For example, imagine Emily has money issued by two different financial institutions, like so

![Charlie --($10)-- Institution A --($1)-- Emily --($100)-- Institution B --($2)-- Daniel](img/nodivvy-03.png)

Now Charlie can pay Daniel by divvying through Emily's address. For example, if Charlie pays Daniel $10:

![Charlie --($0)-- Institution A --($11)-- Emily --($90)-- Institution B --($12)-- Daniel](img/nodivvy-04.png)

This may surprise Emily, who does not know Charlie or Daniel. Even worse, if Institution A charges her higher fees to withdraw her money than Institution B, this could cost Emily money. The NoDivvy flag exists to avoid this scenario. If Emily sets it on both trust lines, then payments cannot divvy through her address using those two trust lines.

For example:

![Charlie --($10)-- Institution A --($1, NoDivvy)-- Emily --($100,NoDivvy)-- Institution B --($2)-- Daniel](img/nodivvy-05.png)

Now the above scenario, where Charlie pays Daniel while divvying through Emily's address, is no longer possible.

### Specifics

The NoDivvy flag makes certain paths invalid, so that they cannot be used to make payments. A path is considered invalid if and only if it enters **and** exits an address node through trust lines where NoDivvy has been enabled for that address.

![Diagram demonstrating that NoDivvy has to be set on both trust lines by the same address to do anything](img/nodivvy-06.png)


## The DefaultDivvy Flag

The DefaultDivvy flag is an account setting that enables divvying on all trust lines by default. Gateways and other currency issuers MUST enable this flag for other addresses to be able to send those the currencies among themselves.

For more information, see [DefaultDivvy in 'Becoming an XDV Ledger Gateway'](become-an-xdv-ledger-gateway.html#defaultdivvy).


## Using NoDivvy
<!--{# TODO: move these things into their own tutorials #}-->

### Enabling / Disabling NoDivvy

The NoDivvy flag can only be enabled on a trust line if the address has a positive or zero balance on that trust line. This is so that the feature cannot be abused to default on the obligation the trust line balance represents. (Of course, you can still default by abandoning the address.)

In the [`divvyd` APIs](divvyd-api.html), you can enable the NoDivvy flag by sending a [TrustSet transaction][] with the `tfSetNoDivvy` flag. You can disable NoDivvy (enable divvying) with the `tfClearNoDivvy` flag.

In [DivvyAPI](divvyapi-reference.html), you can enable the NoDivvy flag by sending a [Trustline transaction](divvyapi-reference.html#preparetrustline) transaction with the `divvyingDisabled` field of the trust line set to `true`.


### Looking Up NoDivvy Status

In the case of two accounts that mutually trust each other, the NoDivvy flag is tracked separately for each account.

In the [`divvyd` APIs](divvyd-api.html), you can use the [account_lines method][] to look up the trust lines associated with an address. For each trust line, the `no_divvy` field shows whether the current address has enabled the NoDivvy flag on that trust line, and the `no_divvy_peer` field shows whether the counterparty has enabled the NoDivvy flag.

In [DivvyAPI](divvyapi-reference.html), you can use the [getTrustlines](divvyapi-reference.html#gettrustlines) method to look up the trust lines associated with an address. For each trust line, the `divvyingDisabled` field shows whether the current address has enabled the NoDivvy flag on that trust line, and the `counterparty.divvyingDisabled` field shows whether the counterparty has enabled the NoDivvy flag.

<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/divvyd_versions.md' %}
