# XDV Ledger Overview

The **XDV Ledger** is a decentralized cryptographic ledger powered by a network of peer-to-peer servers. The XDV Ledger is the home of **XDV**, a digital asset designed to bridge the many different currencies in use worldwide. Divvy stewards the development of the XDV Ledger, and advances XDV as a key contribution to the _Internet of Value_: a world in which money moves the way information does today.

## The Digital Asset for Payments

XDV is a digital asset native to the XDV Ledger. Anyone with a cryptographic key and an internet connection can receive, hold, and send XDV to anyone else. XDV's creators have developed it to be a desirable bridge currency that can facilitate trades in any other currency. XDV has many properties which make it an appealing asset for many other use cases, too:

- **[Censorship-Resistant Transaction Processing][]:** No single party decides which XDV transactions succeed or fail, and no one can "roll back" a transaction after it completes. As long as those who choose to participate in the network keep it healthy, they can send and receive XDV in seconds.
- **[Fast, Efficient Consensus Algorithm][]:** The XDV Ledger's consensus algorithm settles transactions in 4 to 5 seconds, processing at a throughput of up to 1500 transactions per second. These properties put XDV at least an order of magnitude ahead of other top digital assets.
- **[Finite XDV Supply][]:** When the XDV Ledger began, 100 billion XDV were created, and no more XDV will ever be created. (Each XDV is subdivisible down to 6 decimal places, for a grand total of 100 quadrillion (10^17) _drops_ of XDV.) The available supply of XDV decreases slowly over time as small amounts are destroyed to pay transaction costs.
- **[Responsible Software Governance][]:** A team of full-time, world-class developers at Divvy maintain and continually improve the XDV Ledger's underlying software. Divvy acts as a steward for the technology and an advocate for its interests, and builds constructive relationships with governments and financial institutions worldwide.
- **[Secure, Adaptable Cryptography][]:** The XDV Ledger relies on industry standard digital signature systems like ECDSA (the same scheme used by Bitcoin) but also supports modern, efficient algorithms like Ed25519. The extensible nature of the XDV Ledger's software makes it possible to add and disable algorithms as the state of the art in cryptography advances.
- **[Modern Features for Smart Contracts][]:** Features like Escrow, Checks, and Payment Channels support cutting-edge financial applications including the [Interledger Protocol](https://interledger.org/). This toolbox of advanced features comes with safety features like a process for amending the network and separate checks against invariant constraints.
- **[On-Ledger Decentralized Exchange][]:** In addition to all the features that make XDV useful on its own, the XDV Ledger also has a fully-functional accounting system for tracking and trading obligations denominated in any way users want, and an exchange built into the protocol. The XDV Ledger can settle long, cross-currency payment paths and exchanges of multiple currencies in atomic transactions, bridging gaps of trust with XDV.

## Censorship-Resistant Transaction Processing
[Censorship-Resistant Transaction Processing]: #censorship-resistant-transaction-processing

XDV is part of a new class of money which includes Bitcoin and other cryptocurrencies:

- These **Decentralized digital assets** exist in computer systems without a central administrator. As long as the system is sufficiently decentralized, no one can roll back transactions, freeze balances, or block someone from using a decentralized digital asset. These assets are natively digital, so they can be used online across any distance.

This combines qualities of physical and centralized digital money. Prior to the invention of Bitcoin in 2009, all currencies could be divided into those two categories:

- **Physical coins and paper money**, which individuals can use to do business without going through a central party. As physical objects, they cannot be used online, and doing business long-distance is slow and inconvenient.
- **Centralized digital currencies**, which need an administrator to confirm transactions. The administrator also has the power to censor or roll back transactions, or disallow some individuals from using the digital currency. If the operator of a digital currency decides someone has violated its terms of service, it can freeze or even confiscate that person's money. However, as digital balances, these currencies can be used online and are convenient across long distances.

**Note:** Users of the XDV Ledger _can_ freeze non-XDV currencies issued in the XDV Ledger. For more information, see the [Freeze documentation](freezes.html).

The XDV Ledger's system of trusted validators uses a small amount of human interaction to achieve better distribution of authority than other decentralized systems. Fully-automated systems for reaching consensus from an unknown set of participants are vulnerable to concentrations of voting power. For example, Bitcoin mining is disproportionately concentrated in places with cheap electricity. As Divvy curates a list of distinct validators operated by different entities in different jurisdictions, the XDV Ledger can become more resistant to censorship and outside pressures than proof-of-work mining. For more information on Divvy's plan to decentralize the recommended set of validators, see the  [Decentralization Strategy Update](https://xdv.io/dev-blog/decentralization-strategy-update/).


## Fast, Efficient Consensus Algorithm
[Fast, Efficient Consensus Algorithm]: #fast-efficient-consensus-algorithm

The XDV Ledger's biggest difference from most cryptocurrencies is that it uses a unique consensus algorithm that does not require the time and energy of "mining", the way Bitcoin, Ethereum, and almost all other such systems do. Instead of "proof of work" or even "proof of stake", The XDV Ledger's consensus algorithm uses a system where every participant has an overlapping set of "trusted validators" and those trusted validators efficiently agree on which transactions happen in what order. As of early 2018, the amount of electricity the Bitcoin network uses per transaction is more than a family home in the USA uses in an entire day, and confirming the transaction takes hours. A single XDV transaction uses a negligible amount of electricity, and takes 4 or 5 seconds to confirm.

Furthermore, each new "ledger version" in the XDV Ledger (the equivalent of a "block") contains the full current state of all balances, so a server can synchronize with the network in minutes instead of spending hours downloading and re-processing the full transaction history.

For more information on how the XDV Ledger's consensus algorithm works, see [The XDV Ledger Consensus Process](consensus.html). For background on why the XDV Ledger uses this consensus algorithm, see [Consensus Principles and Rules](consensus-principles-and-rules.html).


## Finite XDV Supply
[Finite XDV Supply]: #finite-xdv-supply

Alongside war and political turmoil, hyperinflation is one of the leading causes of death for currencies. While the decentralized system of validators provides XDV with some resistance to political factors, the rules of the XDV Ledger provide a simpler solution to hyperinflation: the total supply of XDV is finite. Without a mechanism to create more, it becomes much less likely that XDV could suffer hyperinflation.

The supply of XDV available to the general public _does_ change due to a few factors:

- Sending transactions in the XDV Ledger destroys a small amount of XDV. Senders choose how much to destroy, with certain minimums based on the expected work of processing the transaction and how busy the network is. If the network is busy, potential transactions that promise to destroy more XDV can cut in front of the transaction queue. This is an anti-spam measure to make it prohibitively expensive to [DDoS](https://en.wikipedia.org/wiki/Denial-of-service_attack) the XDV Ledger network. For more information, see [Transaction Cost](transaction-cost.html).
- Each account in the XDV Ledger must hold a small amount of XDV in reserve. This is an anti-spam measure to disincentivize making the ledger data occupy too much space. XDV Ledger validators can vote to change the amount of XDV required as a reserve, to compensate for changes in XDV's real-world value. (The last time this happened was in December 2013, when [the reserve requirement decreased from 50 XDV to 20 XDV](https://xdv.io/insights/proposed-change-to-divvy-reserve-requirement-2/).) If the reserve requirement decreases, XDV that was previously locked up by the reserve becomes available again.
- Divvy (the company) holds a large reserve of XDV in escrow. At the start of each month, 1 billion XDV is released from escrow for Divvy to use. (Divvy uses XDV to incentivize growth in the XDV Ledger ecosystem and sells XDV to institutional investors. Divvy also sells XDV programmatically on exchanges, limited to a small percentage of overall exchange volume. Divvy publishes sales figures quarterly in the [XDV Markets Report](https://xdv.io/insights/q1-2018-xdv-markets-report/).) At the end of each month, any remaining XDV the company does not sell or give away is stored into escrow for a 54-month period. For more information on Divvy's escrow policy, see [Divvy Escrows 55 Billion XDV for Supply Predictability](https://xdv.io/insights/divvy-to-place-55-billion-xdv-in-escrow-to-ensure-certainty-into-total-xdv-supply/). For more information on the technical capabilities of the Escrow feature, see [Escrow](escrow.html).


## Responsible Software Governance
[Responsible Software Governance]: #responsible-software-governance

Any piece of software can only be as good as the developers who code and manage it. Divvy employs a team of world-class engineers dedicated full-time to maintaining and improving the XDV Ledger software, especially the core server, `divvyd`. The [source code for `divvyd`](https://github.com/divvy/divvyd/) is available to the public with a permissive open-source license, as are many other parts of the XDV Ledger ecosystem. Divvy engineers follow best practices for software engineering, including:

- A famously strict and thorough code review process
- Comprehensive code coverage and unit tests
- Regularly running automated checks for potential vulnerabilities and memory leaks
- Regularly commissioning external reviews by professional organizations

As an entity that is obligated to hold large amounts of XDV for the long term, Divvy has a strong incentive to ensure that XDV is widely used in ways that are legal, sustainable, and constructive. Divvy provides technical support to businesses whose goals align with Divvy's ideal of an Internet of Value. Divvy also cooperates with legislators and regulators worldwide to guide the implementation of sensible laws governing digital assets and associated businesses.


## Secure, Adaptable Cryptography
[Secure, Adaptable Cryptography]: #secure-adaptable-cryptography

Cryptography is one of the hardest parts of any distributed system, and a mistake can lead to money stolen by malicious actors anywhere in the world. The XDV Ledger uses industry-standard schemes for signing and verifying transactions, algorithms that have successfully protected hundreds of billions of US dollars' worth of value for many years. The XDV Ledger also layers multi-signing functionality so you can use multi-factor authorization or split keys across multiple people as a backup, and provides new algorithms with a path to migrate the keys you use if a breakthrough in cryptography makes the old algorithms obsolete.

For more information, see [Cryptographic Keys](cryptographic-keys.html) and [Multi-Signing](multi-signing.html).


## Modern Features for Smart Contracts
[Modern Features for Smart Contracts]: #modern-features-for-smart-contracts

Besides simple value transfer with XDV payments, the XDV Ledger has several advanced features that provide useful functions for building applications that use the Internet of Value to serve previously unknown or impractical needs. Rather than running applications as "smart contracts" in the network itself, the XDV Ledger provides tools for settling contracts, while letting the applications themselves run anywhere, in whatever environment or container is appropriate. This "keep it simple" approach is flexible, scalable, and powerful.

A sample of advanced features in the XDV Ledger:

- [Payment Channels](use-payment-channels.html) allow asynchronous balance changes as fast as you can create and validate signatures.
- [Escrow](escrow.html) locks up XDV until a declared time passes or cryptographic condition is met.
- [DepositAuth](depositauth.html) lets users decide who can send them money and who can't.
- A [Decentralized Exchange](#on-ledger-decentralized-exchange) lets users trade obligations and XDV on-ledger.
- [Invariant Checking](https://xdv.io/dev-blog/protecting-ledger-invariant-checking/) provides an independent layer of protections against bugs in transaction execution.
- [Amendments](amendments.html) provide smooth upgrades to the existing feature set, so the technology can continue to evolve without fracturing the ecosystem or causing uncertainty around times of transition.


## On-Ledger Decentralized Exchange
[On-Ledger Decentralized Exchange]: #on-ledger-decentralized-exchange

One of the biggest features that sets the XDV Ledger apart from other cryptocurrency networks is that it also contains a full currency exchange that runs on the XDV Ledger. Within this system, businesses (typically called "gateways") can freely issue any currency they want to customers, and those customers can freely trade issued currencies for XDV or other issued currencies issued by any gateway. The XDV Ledger can execute atomic cross-currency transactions this way, using orders in the exchange to provide liquidity.

For more information on how the decentralized exchange works, see [Decentralized Exchange](decentralized-exchange.html). For more information on the gateway business model, see the [Become an XDV Ledger Gateway](become-an-xdv-ledger-gateway.html).
