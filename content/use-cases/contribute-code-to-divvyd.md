# Contribute Code to divvyd

Want to contribute code or a bug report to help improve `divvyd`, the core peer-to-peer server that manages the XDV Ledger? Here’s a roadmap to the high-level tasks that’ll have you reviewing code and functionality in no time.

{% set n = cycler(* range(1,99)) %}


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## <a href="https://github.com/xdv/divvyd" target="_blank">Access the `divvyd` repo <i class="fa fa-external-link" aria-hidden="true"></i></a> <!--#{ fix md highlighting_ #}-->

`divvyd` is an open-source project. You can take a look at `divvyd` code simply by accessing the `divvyd` GitHub repo. Before contributing or reporting bugs, we recommend that you get to know the code and developer experience by performing the following tasks.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Set up and run a `divvyd` server](manage-the-divvyd-server.html)

Set up and run a `divvyd` server to understand the developer experience and functionality of the core peer-to-peer server that manages the XDV Ledger. Anyone can run their own `divvyd` server that follows the network and keeps a complete copy of the XDV Ledger.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Try out XDV Ledger integration tools](get-started-with-the-divvyd-api.html)

Take a look at the various tools provided to help developers integrate with the XDV Ledger. From WebSocket and JSON-RPC API endpoints to the `divvy-lib` JavaScript library, take a look at the modes of integration offered to the developer community.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Get a sandbox XDV Ledger account](xdv-test-net-faucet.html)

Use the XDV Ledger Test Net to get a sandbox account. Connect your `divvyd server` to the Test Net to make test calls and get to know the XDV Ledger.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## Set up your development environment

A `divvyd` development environment has a C++ compiler, access to the necessary libraries to compile `divvyd` (such as Boost), and an editor for making changes to the source files. See the <a href="https://github.com/xdv/divvyd" target="_blank">`divvyd` repository <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix md highlighting_ #}--> for the latest recommendations of each. You should also create your own fork of the `divvyd` repository on GitHub so you can contribute pull requests to the official repo. <!-- for future, awaiting links to a few divvyd repo md files - Nik -->


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## <a href="https://github.com/xdv/divvyd/blob/develop/docs/CodingStyle.md" target="_blank">Familiarize yourself with `divvyd`'s coding style <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix md highlighting_ #}-->

Before you start contributing code to `divvyd,` take some time to familiarize yourself with the coding standards used in the `divvyd` repo. These standards gradually evolve and propagate through code reviews. Some aspects are enforced more strictly than others.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## <a href="https://github.com/xdv/divvyd/pulls" target="_blank">Contribute code <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix md highlighting_ #}-->

Now that you have a handle on `divvyd`, you may have ideas for how to improve it. Perhaps you’re developing on the XDV Ledger and want to contribute some code that enables the XDV Ledger to provide a feature your application needs. Access the `divvyd` repo and open an issue or pull request.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## <a href="https://github.com/xdv/divvyd/issues" target="_blank">Report bugs <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix md highlighting_ #}-->

As you explore `divvyd`, you may find code that you don’t think is working as intended. To report a bug, <a href="https://github.com/xdv/divvyd/issues" target="_blank">open an issue <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix md highlighting_ #}--> in the `divvyd` repo.

If the bug you wish to report is security-related, we urge you to disclose it responsibly through Divvy's <a href="https://xdv.io/bug-bounty/" target="_blank">Bug Bounty program <i class="fa fa-external-link" aria-hidden="true"></i></a>.
