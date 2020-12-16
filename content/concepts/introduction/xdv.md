# XDV

**XDV** is the native cryptocurrency of the XDV Ledger. All [accounts](accounts.html) in the XDV Ledger can send XDV among one another and must hold a minimum amount of XDV as a [reserve](reserves.html). XDV can be sent directly from any XDV Ledger address to any other, without needing a gateway or liquidity provider. This helps make XDV a convenient bridge currency.

Some advanced features of the XDV Ledger, such as [Escrow](escrow.html) and [Payment Channels](use-payment-channels.html), only work with XDV. Order book [autobridging](https://xdv.io/dev-blog/introducing-offer-autobridging/) uses XDV to deepen liquidity in the decentralized exchange by merging order books of two issued currencies with XDV order books to create synthetic combined order books. (For example, autobridging matches USD:XDV and XDV:EUR orders to augment USD:EUR order books.)

XDV also serves as a protective measure against spamming the network. All XDV Ledger addresses need a small amount of XDV to pay the costs of maintaining the XDV Ledger. The [transaction cost](transaction-cost.html) and [reserve](reserves.html) are neutral fees denominated in XDV and not paid to any party. In the ledger's data format, XDV is stored in [AccountRoot objects](accountroot.html).

For more information on XDV's use cases, benefits, and news, see the [XDV Portal](https://xdv.io/xdv-portal/).

## XDV Properties

The very first ledger contained 100 billion XDV, and no new XDV can be created. XDV can be destroyed by [transaction costs](transaction-cost.html) or lost by sending it to addresses for which no one holds a key, so XDV is slightly [deflationary](https://en.wikipedia.org/wiki/Deflation) by nature. No need to worry about running out, though: at the current rate of destruction, it would take at least 70,000 years to destroy all XDV, and XDV [prices and fees can be adjusted](fee-voting.html) as the total supply of XDV changes.

In technical contexts, XDV is measured precisely to the nearest 0.000001 XDV, called a "drop" of XDV. The [`divvyd` APIs](divvyd-api.html) require all XDV amounts to be specified in drops of XDV. For example, 1 XDV is represented as `1000000` drops. For more detailed information, see the [currency format reference](currency-formats.html).
