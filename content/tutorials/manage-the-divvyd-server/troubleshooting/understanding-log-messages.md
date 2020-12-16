# Understanding Log Messages

The following sections describe some of the most common types of log messages that can appear in a `divvyd` server's debug log and how to interpret them.

This is an important step in [Diagnosing Problems](diagnosing-problems.html) with `divvyd`.

## Crashes

Messages in the log that mention runtime errors can indicate that the server crashed. These messages usually start with a message such as one of the following examples:

```
Throw<std::runtime_error>
```

```
Terminating thread divvyd: main: unhandled St13runtime_error
```

If your server always crashes on startup, see [Server Won't Start](server-wont-start.html) for possible cases.

If your server crashes randomly during operation or as a result of particular commands, make sure you are [updated](install-divvyd.html) to the latest `divvyd` version. If you are on the latest version and your server is still crashing, check the following:

- Is your server running out of memory? On some systems, `divvyd` may be terminated by the Out Of Memory (OOM) Killer or another monitor process.
- If your server is running in a shared environment, are other users or administrators causing the machine or service to be restarted? For example, some hosted providers automatically kill any service that uses a large amount of a shared machine's resources for an extended period of time.
- Does your server meet the [minimum requirements](system-requirements.html) to run `divvyd`? What about the [recommendations for production servers](system-requirements.html#recommended-specifications)?

If none of the above apply, please report the issue to Divvy as a security-sensitive bug. If Divvy can reproduce the crash, you may be eligible for a bounty. See <https://xdv.io/bug-bounty/> for details.


## Connection reset by peer

The following log message indicates that a peer `divvyd` server closed a connection:

```text
2018-Aug-28 22:55:41.738765510 Peer:WRN [012] onReadMessage: Connection reset by peer
```

Losing connections from time to time is normal for any peer-to-peer network. **Occasional messages of this kind do not indicate a problem.**

A large number of these messages around the same time may indicate a problem, such as:

- Your internet connection to one or more specific peers was cut off.
- Your server may have been overloading the peer with requests, causing it to drop your server.


## No hash for fetch pack

Messages such as the following are caused by a bug in `divvyd` v1.1.0 and earlier when downloading historical ledgers for [history sharding](history-sharding.html):

```text
2018-Aug-28 22:56:21.397076850 LedgerMaster:ERR No hash for fetch pack. Missing Index 7159808
```

These can be safely ignored.


## LoadMonitor Job

Messages such as the following occur when a function takes a long time to run (over 11 seconds in this example):

```text
2018-Aug-28 22:56:36.180827973 LoadMonitor:WRN Job: gotFetchPack run: 11566ms wait: 0ms
```

The following similar message occurs when a job spends a long time waiting to run (again, over 11 seconds in this example):

```text
2018-Aug-28 22:56:36.180970431 LoadMonitor:WRN Job: processLedgerData run: 0ms wait: 11566ms
2018-Aug-28 22:56:36.181053831 LoadMonitor:WRN Job: AcquisitionDone run: 0ms wait: 11566ms
2018-Aug-28 22:56:36.181110594 LoadMonitor:WRN Job: processLedgerData run: 0ms wait: 11566ms
2018-Aug-28 22:56:36.181169931 LoadMonitor:WRN Job: AcquisitionDone run: 0ms wait: 11566ms
```

These two types of messages often occur together, when a long-running job causes other jobs to wait a long time for it to finish.

It is **normal** to display several messages of these types **during the first few minutes** after starting the server.

If the messages continue for more than 5 minutes after starting the server, especially if the `run` times are well over 1000ms, that may indicate that **your server does not have sufficient resources, such as disk I/O, RAM, or CPU**. This may be caused by not having sufficiently-powerful hardware or because other processes running on the same hardware are competing with `divvyd` for resources. (Examples of other processes that may compete with `divvyd` for resources include scheduled backups, virus scanners, and periodic database cleaners.)

Another possible cause is trying to use NuDB on rotational hard disks; NuDB should only be used with solid state drives (SSDs). Divvy recommends always using SSD storage for `divvyd`'s databases, but you _may_ be able to run `divvyd` successfully on rotational disks using RocksDB. If you are using rotational disks, make sure both the `[node_db]` and the `[shard_db]` (if you have one) are configured to use RocksDB. For example:

```
[node_db]
type=RocksDB
# ... more config omitted

[shard_db]
type=RocksDB
```


## View of consensus changed during open

Log messages such as the following occur when a server is not in sync with the rest of the network:

```text
2018-Aug-28 22:56:22.368460130 LedgerConsensus:WRN View of consensus changed during open status=open,  mode=proposing
2018-Aug-28 22:56:22.368468202 LedgerConsensus:WRN 96A8DF9ECF5E9D087BAE9DDDE38C197D3C1C6FB842C7BB770F8929E56CC71661 to 00B1E512EF558F2FD9A0A6C263B3D922297F26A55AEB56A009341A22895B516E
2018-Aug-28 22:56:22.368499966 LedgerConsensus:WRN {"accepted":true,"account_hash":"89A821400087101F1BF2D2B912C6A9F2788CC715590E8FA5710F2D10BF5E3C03","close_flags":0,"close_time":588812130,"close_time_human":"2018-Aug-28 22:55:30.000000000","close_time_resolution":30,"closed":true,"hash":"96A8DF9ECF5E9D087BAE9DDDE38C197D3C1C6FB842C7BB770F8929E56CC71661","ledger_hash":"96A8DF9ECF5E9D087BAE9DDDE38C197D3C1C6FB842C7BB770F8929E56CC71661","ledger_index":"3","parent_close_time":588812070,"parent_hash":"5F5CB224644F080BC8E1CC10E126D62E9D7F9BE1C64AD0565881E99E3F64688A","seqNum":"3","totalCoins":"100000000000000000","total_coins":"100000000000000000","transaction_hash":"0000000000000000000000000000000000000000000000000000000000000000"}
```

During the first 5 to 15 minutes after the server starts up, it is normal for it to be out of sync with the rest of the network and print messages such as these. If the server writes these messages long after starting up, it could indicate a problem. Common causes include unreliable network connections and insufficient hardware specs. This can also happen when other processes running on the same hardware are competing with `divvyd` for resources. (Examples of other processes that may compete with `divvyd` for resources include scheduled backups, virus scanners, and periodic database cleaners.)


## Already validated sequence at or past

Log messages such as the following indicate that a server received validations for different ledger sequences out of order.

```text
2018-Aug-28 22:55:58.316094260 Validations:WRN Val for 2137ACEFC0D137EFA1D84C2524A39032802E4B74F93C130A289CD87C9C565011 trusted/full from nHUeUNSn3zce2xQZWNghQvd9WRH6FWEnCBKYVJu2vAizMxnXegfJ signing key n9KcRZYHLU9rhGVwB9e4wEMYsxXvUfgFxtmX25pc1QPNgweqzQf5 already validated sequence at or past 12133663 src=1
```

Occasional messages of this type do not usually indicate a problem. If this type of message occurs frequently with the same sending validator, it could indicate a problem, including any of the following (roughly in order of most to least likely):

- The server writing the message is having network issues.
- The validator described in the message is having network issues.
- The validator described in the message is behaving maliciously.


## Unable to determine hash of ancestor

Log messages such as the following occur when the server sees a validation message from a peer and it does not know the parent ledger version that server is building on. This is normal when a server is syncing to the network.

```text
2018-Aug-28 22:56:22.256065549 Validations:WRN Unable to determine hash of ancestor seq=3 from ledger hash=00B1E512EF558F2FD9A0A6C263B3D922297F26A55AEB56A009341A22895B516E seq=12133675
```

If this message occurs frequently outside of the first 5 to 15 minutes after starting the server, it could indicate a problem.


## InboundLedger Want hash

Log messages such as the following indicate that the server is requesting ledger data from other servers:

```text
InboundLedger:WRN Want: 5AE53B5E39E6388DBACD0959E5F5A0FCAF0E0DCBA45D9AB15120E8CDD21E019B
```

This is normal if your server is syncing, backfilling, or downloading [history shards](history-sharding.html).


## InboundLedger 11 timeouts for ledger

```text
InboundLedger:WRN 11 timeouts for ledger 8265938
```

This indicates that your server is having trouble requesting specific ledger data from its peers. If the [ledger index](basic-data-types.html#ledger-index) is much lower than the most recent validated ledger's index as reported by the [server_info method][], this probably indicates that your server is downloading a [history shard](history-sharding.html).

This is not strictly a problem, but if you want to acquire ledger history faster, you can configure `divvyd` to connect to peers with full history by adding or editing the `[ips_fixed]` config stanza and restarting the server. For example, to always try to connect to one of Divvy's full-history servers:

```
[ips_fixed]
s2.xdv.io 51235
```



<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/divvyd_versions.md' %}
