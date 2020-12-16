# List XDV in Your Exchange

Does your exchange want to list XDV, enabling your users to deposit, trade, and withdraw XDV? Here's a roadmap to the high-level tasks you'll need to perform.

{% set n = cycler(* range(1,99)) %}

<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Meet prerequisites for listing XDV](list-xdv-as-an-exchange.html#prerequisites-for-supporting-xdv)

Put in place the foundation and operational processes needed to efficiently and securely list XDV in your exchange.

This includes creating and securing XDV Ledger accounts, implementing internal balance sheets, adopting appropriate security procedures, and complying with any applicable regulations.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Set up and run a `divvyd` server](manage-the-divvyd-server.html)

`divvyd` is the core peer-to-peer server that manages the XDV Ledger.

While it isn’t required, your exchange should consider running your own `divvyd` server to be able to control the speed and reliability of your exchange’s XDV transaction processing.

You can start out running one `divvyd` server to support development and exploration. If required for your use case, you can then build up to an enterprise deployment that consists of multiple clustered servers with one private-peer validator, for example.

[Running a `divvyd` server in validator mode](run-a-divvyd-validator.html) enables your exchange to contribute to the strength and decentralization of the XDV Ledger network. Even if your `divvyd` server isn’t included in published validator lists, it is still contributing (albeit indirectly) and continues to build up reputation over time.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Try out XDV Ledger integration tools](get-started-with-the-divvyd-api.html)

Take a look at the various tools provided to help you integrate with the XDV Ledger.

From WebSocket and JSON-RPC API endpoints to the DivvyAPI JavaScript library, find a mode of integration that works with your technology.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Get a sandbox XDV Ledger account](xdv-test-net-faucet.html)

Use the XDV Ledger Test Net to get a sandbox account. Connect your `divvyd` server to the Test Net to make test calls and get to know the XDV Ledger. Once you’re ready to transact in real XDV, you can switch over to transacting on the live XDV Ledger.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Understand and code integrations to support the flow of funds](list-xdv-as-an-exchange.html#flow-of-funds)

To support listing XDV, code integrations with the XDV Ledger to deposit XDV into your exchange, trade XDV on the exchange, rebalance XDV holding, and withdraw XDV from your exchange.


### Related Tasks

- [Contribute Code to `divvyd`](contribute-code-to-divvyd.html)
- [Listen for New Ledger Versions](subscription-methods.html)
- [Capacity Planning](capacity-planning.html)
- [Look Up an XDV Ledger Account’s Transaction History](tx_history.html)
<!-- for the future, link to Implement Destination Tags -->
