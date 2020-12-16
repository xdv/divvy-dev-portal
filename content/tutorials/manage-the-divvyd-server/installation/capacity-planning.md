# Capacity Planning

This section describes configuration, network, and hardware recommendations that you can use to tune and optimize the performance of your `divvyd` server. Being aware of these considerations can help you ensure that your `divvyd` server is ready to handle XDV Ledger network capacity today and in the near future.



## Configuration Settings

Divvy recommends using these configuration guidelines to optimize resource utilization and performance of your `divvyd` server.

You can set the following parameters in the `divvyd.cfg` file used for your `divvyd` server. You can access an example configuration file, `divvyd-example.cfg`, in the [`cfg` directory](https://github.com/xdv/divvyd/blob/develop/cfg/divvyd-example.cfg) in the `divvyd` GitHub repo.


### Node Size

Set the `node_size` based on your server's expected load and the amount of memory you can make available to `divvyd`.

Divvy recommends you always use the largest node size your available RAM can support. See the following table for recommended settings.

#### Recommendation

Each `node_size` has a corresponding requirement for available RAM. For example, if you set `node_size` to `huge`, you should have at least 32GB of available RAM to help ensure that `divvyd` can run smoothly.

To tune your server, it may be useful to start with `tiny` and increase the size to `small`, `medium`, and so on as you refine the requirements for your use case.

| RAM available for `divvyd` | `node_size` value | Notes                      |
|:----------------------------|:------------------|:---------------------------|
| < 8GB                       | `tiny`            | Not recommended for testing or production servers. This is the default value if you don't specify a value in `divvyd.cfg`. |
| 8GB                         | `small`           | Recommended for test servers. |
| 16GB                        | `medium`          | The `divvyd-example.cfg` file uses this value. |
| 32GB                        | `huge`            | Recommended for production servers. |

Although `large` is also a legal value for `[node_size]`, in practice it performs worse than `huge` in most circumstances. Divvy recommends always using `huge` instead of `large`.

If you set the `node_size` parameter to an invalid value, the [server fails to start](server-wont-start.html#bad-node-size-value).


### Node DB Type

The `type` field in the `[node_db]` stanza of the `divvyd.cfg` file sets the type of key-value store that `divvyd` uses to hold the ledger store.

This setting does not directly configure RAM settings, but the choice of key-value store has important implications for RAM usage because of the different ways these technologies cache and index data for fast lookup.

You can set the value to either `RocksDB` or `NuDB`.

- If your server is a validator, it only needs a small amount of history, so use `RocksDB` for best performance. [Learn more](#more-about-using-rocksdb)

- For most cases, use `NuDB` because its performance is constant even with large amounts of data on disk. A fast SSD is required. [Learn more](#more-about-using-nudb)

- If you are using rotational disks (not recommended) or even just a slow SSD, use `RocksDB`. [Learn more](#more-about-using-rocksdb)

The example `divvyd-example.cfg` file has the `type` field in the `[node_db]` stanza set to `RocksDB`.

#### More About Using RocksDB

[RocksDB](https://rocksdb.org/docs/getting-started.html) is an embeddable persistent key-value store.

RocksDB works well on solid-state disks. RocksDB performs better than NuDB when used with rotational disks, but you may still encounter performance problems unless you use solid-state disks.

RocksDB requires approximately one-third less [disk storage](#disk-space) than NuDB and provides better I/O latency. However, the better I/O latency comes as result of the large amount of RAM RocksDB requires to store data indexes.

Validators should be configured to use RocksDB and to store no more than about 300,000 ledgers (approximately two weeks' worth of [historical data](#disk-space)) in the ledger store.

RocksDB has performance-related configuration options that you can set in `divvyd.cfg` to achieve maximum transaction processing throughput. Here is the recommended configuration for a `divvyd` server using RocksDB:

```
[node_db]
type=RocksDB
path=/var/lib/divvyd/db/rocksdb
open_files=512
filter_bits=12
cache_mb=512
file_size_mb=64
file_size_mult=2
online_delete=2000
advisory_delete=0
```

(Adjust the `path` to the directory where you want to keep the ledger store on disk. Adjust the `online_delete` and `advisory_delete` settings as desired for your configuration.)

#### More About Using NuDb

[NuDB](https://github.com/vinniefalco/nudb#introduction) is an append-only key-value store that is optimized for SSD drives.

NuDB has nearly constant performance and memory footprints regardless of the [amount of data being stored](#disk-space). NuDB _requires_ a solid-state drive, but uses much less RAM than RocksDB to access a large database.

Non-validator production servers should be configured to use NuDB and to store the amount of historical data required for the use case.

NuDB does not have performance-related configuration options available in `divvyd.cfg`. Here is the recommended configuration for a `divvyd` server using NuDB:

```
[node_db]
type=NuDB
path=/var/lib/divvyd/db/nudb
online_delete=2000
advisory_delete=0
```

(Adjust the `path` to the directory where you want to keep the ledger store on disk. Adjust the `online_delete` and `advisory_delete` settings as desired for your configuration.)


### Log Level

The example `divvyd-example.cfg` file sets the logging verbosity to `warning` in the `[rpc_startup]` stanza. This setting greatly reduces disk space and I/O requirements over more verbose logging. However, more verbose logging provides increased visibility for troubleshooting.

**Caution:** If you omit the `log_level` command from the `[rpc_startup]` stanza, `divvyd` writes logs to disk at the `debug` level and outputs `warning` level logs to the console. `debug` level logging requires several more GB of disk space per day than `warning` level, depending on transaction volumes and client activity.


## Network and Hardware

Each `divvyd` server in the XDV Ledger network performs all of the transaction processing work of the network. Therefore, the baseline hardware for production `divvyd` servers should be similar to that used in Divvy's [performance testing](https://xdv.io/dev-blog/demonstrably-scalable-blockchain/).

Ensuring that your `divvyd` server meets these network and hardware requirements helps achieve consistent, good performance across the XDV Ledger network.


### Recommendation

For best performance in enterprise production environments, Divvy recommends running `divvyd` on bare metal with the following characteristics:

- Operating System: Ubuntu 16.04+
- CPU: Intel Xeon 3+ GHz processor with 4 cores and hyperthreading enabled
- Disk speed: SSD (7000+ writes/second, 10,000+ reads/second)
- Disk space: Varies. At least 50 GB recommended.
- RAM: 32GB
- Network: Enterprise data center network with a gigabit network interface on the host

#### CPU Utilization and Virtualization

You'll get the best performance on bare metal, but virtual machines can perform nearly as well as long as the host hardware has high enough specs.

#### Disk Speed

Divvy _strongly recommends_ using a high-grade solid state disk drive (SSD) with low-latency random reads and high throughput. Divvy engineers have observed the following maximum reads and writes per second:

- Over 10,000 reads per second (in heavily-used public server clusters)
- Over 7,000 writes per second (in dedicated performance testing)

#### Disk Space

The amount of disk space `divvyd` requires depend on how much [ledger history](ledger-history.html) you plan to keep available locally. A `divvyd` server does not need to store more than the most recent 256 ledger versions to follow the consensus process and report the complete state of the ledger, but you can only query your server for transactions that executed in ledger versions it has stored locally.

You can control how much data you keep with [online deletion](online-deletion.html); the default config file has the server keep the latest 2000 ledger versions. Without online deletion, the server's disk requirements grow without bounds.

The following table approximates the requirements for different amounts of history, at the time of writing (2018-12-13):

| Real Time Amount | Number of Ledger Versions | Disk Space Required (RocksDB) | Disk Space Required (NuDB) |
|:-----------------|:--------------------------|:------------------------------|:--|
| 2 hours          | 2,000                     | 250 MB                        | 450 MB |
| 1 day            | 25,000                    | 8 GB                          | 12 GB |
| 14 days          | 350,000                   | 112 GB                        | 168 GB |
| 30 days          | 750,000                   | 240 GB                        | 360 GB |
| 90 days          | 2,250,000                 | 720 GB                        | 1 TB |
| 1 year           | 10,000,000                | 3 TB                          | 4.5 TB |
| 2 years          | 20,000,000                | 6 TB                          | 9 TB |
| Full history (through 2018) | 43,000,000+    | (Not recommended)             | ~9 TB |

These numbers are estimates. They depend on several factors, most importantly the volume of transactions in the network. As transaction volume increases, each ledger version stores more unique data. You should provision extra storage capacity to prepare for future growth.

The `online_delete` setting tells the server how many ledger versions to keep after deleting old history. You should plan for enough disk space to store twice that many ledger versions at maximum (right before online deletion runs).

For instructions on how to change the amount of history you keep, see [Configure Online Deletion](configure-online-deletion.html).

If you want to contribute to storing ledger history but you do not have enough disk space to store full history, you can use the [History Sharding](history-sharding.html) feature to store a randomized range of ledgers in a separate shard store. History sharding is configured in the `[shard_db]` stanza, and it can use a different type of key-value store than the one you defined for the ledger store using the `[node_db]` stanza.


##### Amazon Web Services

Amazon Web Services (AWS) is a popular virtualized hosting environment. You can run `divvyd` in AWS, but Divvy does not recommend using Elastic Block Storage (EBS). Elastic Block Storage's maximum number of IOPS (5,000) is insufficient for `divvyd`'s heaviest loads, despite being very expensive.

AWS instance stores (`ephemeral` storage) do not have these constraints. Therefore, Divvy recommends deploying `divvyd` servers with host types such as `M3` that have instance storage. The `database_path` and `node_db` path should each reside on instance storage.

**Caution:** AWS instance storage is not guaranteed to provide durability in the event of hard drive failure. You also lose data when you stop/start or reboot the instance. The latter type of data loss can be acceptable for a `divvyd` server because an individual server can usually re-acquire the lost data from its peer servers.

#### RAM/Memory

Memory requirements are mainly a function of the `node_size` configuration setting and the amount of client traffic retrieving historical data. For more information about memory requirements, see [Node Size](#node-size).

#### Network

Any enterprise or carrier-class data center should have substantial network bandwidth to support running `divvyd` servers.

Here are examples of observed network bandwidth use for common `divvyd` tasks:

| Task                                            | Transmit/Receive           |
|:------------------------------------------------|:---------------------------|
| Process current transaction volumes             | 2Mbps transmit, 2 Mbps receive |
| Serve historical ledger and transaction reports | 100Mbps transmit           |
| Start up `divvyd`                              | 20Mbps receive             |
