# Clustering

If you are running multiple `divvyd` servers in a single datacenter, you can configure those servers into a cluster to maximize efficiency. Running your `divvyd` servers in a cluster provides the following benefits:

- Clustered `divvyd` servers share the work of cryptography. If one server has verified the authenticity of a message, the other servers in the cluster trust it and do not re-verify.
- Clustered servers share information about peers and API clients that are misbehaving or abusing the network. This makes it harder to attack all servers of the cluster at once.
- Clustered servers always propagate transactions throughout the cluster, even if the transaction does not meet the current load-based transaction fee on some of them.

If you are running a validator as a [private peer](peer-protocol.html#private-peers), Divvy recommends using a cluster of `divvyd` servers as proxy servers.

For a tutorial on how to set up your servers in a cluster, see [Cluster `divvyd` Servers](cluster-divvyd-servers.html).

<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}			
{% include '_snippets/tx-type-links.md' %}			
{% include '_snippets/divvyd_versions.md' %}
