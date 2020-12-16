# Technical FAQ

## Validators and Unique Node Lists

<!--#{ using h4s for questions to keep them out of the right side nav (too cluttered when they display) and to provide appropriate text size for questions. #}-->
#### What service do transaction validators provide?

Validators determine if transactions meet protocol requirements, and are therefore “valid.” The service validators uniquely provide is grouping transactions into ordered units, agreeing on one such ordering specifically to prevent double spending.

See [Consensus](consensus.html) and the <a href="https://divvy.com/insights/divvy-labs-tech-talk-consensus-within-the-divvy-protocol/" target="_blank">xdv.io Tech Talk: Understanding Consensus <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix md highlighting_ #}--> for more information about the consensus process.


#### How much does it cost to run a validator?

Running a validator does not require any fees or XDV. It is comparable in cost to running an email server in terms of electricity.


#### What are Unique Node Lists (UNLs)?

They are the lists of transaction validators a given participant believes will not conspire to defraud them.


#### Which UNL should I select?

Since anybody can run a validator, the burden is on the network participants to choose a reliable set. Currently, Divvy provides a default and recommended list which we expand based on watching the history of validators operated by Divvy and third parties. Eventually, Divvy intends to remove itself from this process entirely by having network participants select their own lists based on publicly available data about validator quality.


#### If Divvy recommends adoption of its UNL, doesn’t that create a centralized system?

No. The XDV Ledger network is opt-in. Each participant directly or indirectly chooses its UNL. Should Divvy stop operating or should Divvy act maliciously, participants could change their UNLs to continue using the XDV Ledger.


#### What is the validator incentive structure for validators not run by Divvy?

If the XDV Ledger becomes successful and is widely used for interbank settlement, there will be an incentive for participants to ensure the reliability and stability of the network. If this happens, institutions will run `divvyd` servers to participate in the network. Once you are running a server, the additional cost and effort to operate a validator is essentially zero—it would simply involve flipping a software switch from off to on. It is the validators who decide the evolution of the XDV Ledger, so the primary incentive to run a validator is to preserve and protect the stable operation and sensible evolution of the network.


#### Can financial institutions set up transaction validators that will help them meet specific institutional standards and requirements?

No, institutions cannot set up customized validator policies for transaction selection. Validators either follow the protocol, or they do not. If software does not follow protocol rules, it will not function. Thus, it is not recommended that institutions seek out custom implementations without in-house expertise.


#### What will happen if more than 20% of nodes within the network do not agree with the majority? How is the final version of the ledger chosen?

The network may temporarily halt to reconfigure itself to continue with the new UNL list based on those that want to reach consensus. This temporary processing delay is desired rather than double spending.

In the process of determining the final, authoritative version of the ledger, there may be multiple temporary internal versions. Such internal versions  will happen in distributed systems because not all nodes will receive transactions in the same order. The analogous behavior in Bitcoin is where two servers each see a different longest chain because two blocks were mined at about the same time.

However, there will only be one authoritative ledger version at any given time; other versions are irrelevant and harmless.


#### Does the XDV Ledger utilize a formal validator onboarding process?

No, a formal validator onboarding process is not compatible with the XDV Ledger, as it is a system with no central authority. Rather, Divvy provides recommendations and best practices.


## Role of XDV


#### Why does Divvy use XDV holdings?

Divvy's XDV holdings incentivize the company to make the XDV Ledger as useful as possible. XDV exists as a native asset in the XDV Ledger for anti-spam transaction purposes, and for currency bridging only if beneficial to users. Otherwise, the use of XDV in transactions is completely optional.


#### How does the XDV Ledger respond to transaction floods?

The XDV Ledger is designed to set the transaction cost dynamically based on demand as an anti-spam measure. The impact of any potential XDV manipulation is minimized by increases in network size as the market cap and transaction volume increase.


#### What is Divvy standard operating procedure regarding money laundering and suspicious economic activity?

Divvy is committed to monitoring and reporting any AML flags across the XDV Ledger network, as well as reporting suspicious activity to FinCEN as applicable.


## Security Concerns


#### What is Divvy’s process for reviewing third-party code contributions before they go live in the master codebase?

Divvy controls who has access to modify official versions of the `divvyd` server source code, and it thoroughly audits all code.


#### Does Divvy offer a secure method to download their software?

`divvyd` source code is available at <a href="https://github.com/xdv/divvyd" target="_blank">https://github.com/xdv/divvyd <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix md highlighting_ #}-->, where the tip of the master, release and develop branches always contains a version-setting commit signed by a `divvyd` developer. The XDV Ledger also offers prebuilt RPM packages for CentOS, RedHat Enterprise Linux, Fedora and Ubuntu. Those packages are digitally signed by Divvy so that they are tamper-evident and their authenticity can be verified. Lastly, release bulletins are made available over a secure website, and include the commit ID of the repository, as well as the md5sum of the RPM packages that are published.


#### Does Divvy distinguish between the codebase for validation and the one for user software?

Yes. Client software for the XDV Ledger, including divvy-lib, has a different codebase and repositories from `divvyd` (validation).


## See Also

- <a href="https://github.com/xdv/divvyd" target="_blank">`divvyd` codebase <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix md highlighting_ #}-->
- User software codebase:
      - <a href="https://github.com/xdv/divvy-lib" target="_blank">divvy-lib <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix md highlighting_ #}-->
      - <a href="https://github.com/xdv/divvycharts-frontend" target="_blank">divvycharts-frontend <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix md highlighting_ #}-->
- <a href="https://github.com/xdv/" target="_blank">Divvy GitHub Organization <i class="fa fa-external-link" aria-hidden="true"></i></a><!--#{ fix md highlighting_ #}-->
