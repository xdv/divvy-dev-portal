# Contribute Code to divvy-lib

Want to contribute code or a bug report to help improve `divvy-lib`, the official client library for [DivvyAPI](divvyapi-reference.html)? DivvyAPI is a JavaScript API for interacting with the XDV Ledger. Here’s a roadmap to the high-level tasks that’ll have you reviewing code and functionality in no time.


{% set n = cycler(* range(1,99)) %}

<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## <a href="https://github.com/xdv/divvy-lib" target="_blank">Access the `divvy-lib` repo <i class="fa fa-external-link" aria-hidden="true"></i></a> <!--#{ fix for md highlighting_ #}-->

`divvy-lib` is an open-source project. You can take a look at `divvy-lib` code simply by accessing the `divvy-lib` GitHub repo. Before contributing or reporting bugs, we recommend that you get to know the code and developer experience by performing the following tasks.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Set up and run a `divvyd` server](manage-the-divvyd-server.html)

DivvyAPI is an API for interacting with the XDV Ledger. The core peer-to-peer server that manages the XDV Ledger is `divvyd`. Optionally, you can set up and run a `divvyd` server to understand its developer experience and functionality. Anyone can run their own `divvyd` server that follows the network and keeps a complete copy of the XDV Ledger.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Get a Test Net XDV Ledger account](xdv-test-net-faucet.html)

Use the XDV Test Net Faucet to get a test account on the XDV Test Network. If you set up a `divvyd` server, you can connect it to the XDV Test Net to make test calls and get to know the XDV Ledger.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Set up your `divvy-lib` development environment](get-started-with-divvyapi-for-javascript.html#environment-setup)

`divvy-lib` requires Node.js and a few dependencies. We recommend using <a href="https://nodejs.org/en/" target="_blank">Node.js v10 LTS <i class="fa fa-external-link" aria-hidden="true"></i></a> <!--#{ fix for md highlighting_ #}--> and <a href="https://yarnpkg.com/en/" target="_blank">Yarn <i class="fa fa-external-link" aria-hidden="true"></i></a> <!--#{ fix for md highlighting_ #}--> dependency management. Also, be sure to create your own fork of the `divvy-lib` repository on GitHub so you can contribute pull requests to the official repo.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## [Run your first `divvy-lib` script](get-started-with-divvyapi-for-javascript.html#first-divvyapi-script)

Examine and run the `get-account-info.js` script. Use it to get a feel for how DivvyAPI scripts work and to verify that your DivvyAPI interface is working.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## <a href="https://github.com/xdv/divvy-lib/pulls" target="_blank">Contribute code <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix for md highlighting_ #}-->

Now that you have a handle on `divvy-lib`, you may have ideas for how to improve it.

Perhaps you’re developing on the XDV Ledger and want to contribute some code that enables `divvy-lib` to provide a feature your application needs.

Need some inspiration? Take a look at our list of <a href="https://github.com/xdv/divvy-lib/issues?utf8=%E2%9C%93&q=label%3A%22help+wanted%22" target="_blank">Help Wanted issues <i class="fa fa-external-link" aria-hidden="true"></i></a> <!--#{ fix for md highlighting_ #}-->.

Access the `divvy-lib` repo and open an issue or pull request.


<span class="use-case-step-num">{{n.next()}}</span>
<!-- <span class="use-case-step-length">(1 hour)</span> -->
## <a href="https://github.com/xdv/divvy-lib/issues" target="_blank">Report bugs <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix for md highlighting_ #}-->

As you explore `divvy-lib`, you may find code that you don’t think is working as intended. To report a bug, <a href="https://github.com/xdv/divvy-lib/issues" target="_blank">open an issue <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix for md highlighting_ #}--> in the `divvy-lib` repo.

If the bug you wish to report is security-related, we urge you to disclose it responsibly through Divvy's <a href="https://xdv.io/bug-bounty/" target="_blank">Bug Bounty program <i class="fa fa-external-link" aria-hidden="true"></i></a>.
