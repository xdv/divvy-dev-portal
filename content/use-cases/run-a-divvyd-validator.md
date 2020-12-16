# Run a divvyd Validator

Each `divvyd` server (not running in stand-alone mode) connects to a network of peers, relays cryptographically signed transactions, and maintains a local copy of the complete shared global ledger. A `divvyd` server running in validator mode additionally participates in the consensus process and is a part of an interconnected web of validators who each trust a specific set of validators not to collude. Here’s a roadmap to the high-level tasks you’ll need to perform to run a `divvyd` validator.


{% set n = cycler(* range(1,99)) %}


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Understand what it means to run a validator](divvyd-server-modes.html#reasons-to-run-a-validator)

If you or your organization relies on the XDV Ledger, it is in your interest to run a validator to participate in the consensus process and provide a trusted validator that supports the ongoing decentralization of the XDV Ledger.

If you are an independent developer, you may want to run a validator as a way to participate in and dive into the technology that supports the XDV Ledger network.

While validator diversity is important, not every validator is likely to be widely trusted and validator list publishers may require validators to meet stringent criteria before they list them on validator lists.

Despite that, it is important to note that every validator contributes to the long-term health and decentralization of the XDV Ledger.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Set up and run a `divvyd` server](manage-the-divvyd-server.html)

Install and run a `divvyd` server. Anyone can run their own `divvyd` server that follows the network and keeps a complete copy of the XDV Ledger.

For configuration guidance and network and hardware requirements, see [Capacity Planning](capacity-planning.html).


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Enable validation on your divvyd server](run-divvyd-as-a-validator.html)

To configure your `divvyd` server to run in validator mode, generate a validator key pair and add it to your `divvyd.cfg` file.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Set up a stock divvyd server as a proxy](run-divvyd-as-a-validator.html#set-up-proxies-to-help-protect-your-validator)

To protect a production validator from DDoS attacks, you can use a stock `divvyd` server as a proxy between the validator and the outside network.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Associate your validator with a web domain you control](run-divvyd-as-a-validator.html#provide-domain-verification)

Network participants are unlikely to trust a validator without knowing who is operating it. To address this concern, associate your validator with a web domain you control.
You may also wish to have your validator listed with one or more validator tracking services, such as the <a href="https://xdvcharts.xdv.io/#/validators" target="_blank">XDV Charts Validator Registry <i class="fa fa-external-link" aria-hidden="true"></i></a>.<!--#{ fix md highlighting_ #}-->


### Related Tasks

- [Contribute Code to `divvyd`](contribute-code-to-divvyd.html)
