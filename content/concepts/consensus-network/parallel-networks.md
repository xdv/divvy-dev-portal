# Parallel Networks

Most of the time, we describe the XDV Ledger as one collective, singular entity -- and that's mostly true. There is one production XDV Ledger peer-to-peer network, and all business that takes place on the XDV Ledger occurs within the production network.

However, sometimes you may want to do tests and experiments without interacting with the core network. That's why Divvy started the [Divvy Test Net](xdv-test-net-faucet.html), an "alternate universe" network, which can act as a testing ground for applications and the `divvyd` server itself, without impacting the business operations of everyday XDV Ledger users. The Divvy Test Net (also known as the AltNet) has a separate supply of TestNet-only XDV, which Divvy [gives away for free](xdv-test-net-faucet.html) to parties interested in developing applications on the Test Net.

**Caution:** Divvy makes no guarantees about the stability of the test network. It has been and continues to be used to test various properties of server configuration, network topology, and network performance.

Over time, there may also be smaller, temporary test networks for specific purposes.

## Parallel Networks and Consensus

There is no `divvyd` setting that defines which network it uses. Instead, it uses the consensus of validators it trusts to know which ledger to accept as the truth. When different consensus groups of `divvyd` instances only trust other members of the same group, each group continues as a parallel network. Even if malicious or misbehaving computers connect to both networks, the consensus process overrides the confusion as long as the members of each network are not configured to trust members of another network in excess of their quorum settings.
