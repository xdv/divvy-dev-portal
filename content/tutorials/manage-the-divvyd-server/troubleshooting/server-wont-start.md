# divvyd Server Won't Start

This page explains possible reasons the `divvyd` server does not start and how to fix them.

These instructions assume you have [installed `divvyd`](install-divvyd.html) on a supported platform.


## File Descriptors Limit

On some Linux variants, you may get an error message such as the following when trying to run `divvyd`:

```text
WARNING: There are only 1024 file descriptors (soft limit) available, which
limit the number of simultaneous connections.
```

This occurs because the system has a security limit on the number of files a single process may open, but the limit is set too low for `divvyd`. To fix the problem, **root access is required**. Increase the number of files `divvyd` is allowed to open with the following steps:

1. Add the following lines to the end of your `/etc/security/limits.conf` file:

        *                soft    nofile          65536
        *                hard    nofile          65536

2. Check that the [hard limit on number of files that can be opened](https://ss64.com/bash/ulimit.html) is now `65536`:

        ulimit -Hn

    The command should output `65536`.

3. Try starting `divvyd` again.

        systemctl start divvyd

4. If `divvyd` still does not start, open `/etc/sysctl.conf` and append the following kernel-level setting:

        fs.file-max = 65536


## Failed to open /etc/opt/divvy/divvyd.cfg

If `divvyd` crashes on startup with an error such as the following, it means that `divvyd` cannot read its config file:

```text
Loading: "/etc/opt/divvy/divvyd.cfg"
Failed to open '"/etc/opt/divvy/divvyd.cfg"'.
Terminating thread divvyd: main: unhandled St13runtime_error 'Can not create "/var/opt/divvy"'
Aborted (core dumped)
```

Possible solutions:

- Check that the config file exists (the default location is `/etc/opt/divvy/divvyd.cfg`) and the user that runs your `divvyd` process (usually `divvyd`) has read permissions to the file.

- Create a config file that can be read by the `divvyd` user at `$HOME/.config/divvy/divvyd.cfg` (where `$HOME` points to the `divvyd` user's home directory).

    **Tip:** The `divvyd` repository contains [an example `divvyd.cfg` file](https://github.com/xdv/divvyd/blob/master/cfg/divvyd-example.cfg) which is provided as the default config when you do an RPM installation. If you do not have the file, you can copy it from there.

- Specify the path to your preferred config file using the `--conf` [commandline option](commandline-usage.html).

## Failed to open validators file

If `divvyd` crashes on startup with an error such as the following, it means it can read its primary config file, but that config file specifies a separate validators config file (typically named `validators.txt`), which `divvyd` cannot read.

```text
Loading: "/home/divvyd/.config/divvy/divvyd.cfg"
Terminating thread divvyd: main: unhandled St13runtime_error 'The file specified in [validators_file] does not exist: /home/divvyd/.config/divvy/validators.txt'
Aborted (core dumped)
```

Possible solutions:

- Check that the `[validators.txt]` file exists and the `divvyd` user has permissions to read it.

    **Tip:** The `divvyd` repository contains [an example `validators.txt` file](https://github.com/xdv/divvyd/blob/master/cfg/validators-example.txt) which is provided as the default config when you do an RPM installation. If you do not have the file, you can copy it from there.

- Edit your `divvyd.cfg` file and modify the `[validators_file]` setting to have the correct path to your `validators.txt` (or equivalent) file. Check for extra whitespace before or after the filename.

- Edit your `divvyd.cfg` file and remove the `[validators_file]` setting. Add validator settings directly to your `divvyd.cfg` file. For example:

        [validator_list_sites]
        https://vl.xdv.io

        [validator_list_keys]
        ED2677ABFFD1B33AC6FBC3062B71F1E8397C1505E1C42C64D11AD1B28FF73F4734


## Cannot create database path

If `divvyd` crashes on startup with an error such as the following, it means the server does not have write permissions to the `[database_path]` from its config file.

```text
Loading: "/home/divvyd/.config/divvy/divvyd.cfg"
Terminating thread divvyd: main: unhandled St13runtime_error 'Can not create "/var/lib/divvyd/db"'
Aborted (core dumped)
```

The paths to the configuration file (`/home/divvyd/.config/divvy/divvyd.cfg`) and the database path (`/var/lib/divvyd/db`) may vary depending on your system.

Possible solutions:

- Run `divvyd` as a different user that has write permissions to the database path printed in the error message.

- Edit your `divvyd.cfg` file and change the `[database_path]` setting to use a path that the `divvyd` user has write permissions to.

- Grant the `divvyd` user write permissions to the configured database path.


## State DB Error

The following error can occur if the `divvyd` server's state database is corrupted. This can occur as the result of being shutdown unexpectedly, or if you change the type of database from RocksDB to NuDB without changing the `path` and `[database_path]` settings in the config file.

```text
2018-Aug-21 23:06:38.675117810 SHAMapStore:ERR state db error:
  writableDbExists false archiveDbExists false
  writableDb '/var/lib/divvyd/db/rocksdb/divvydb.11a9' archiveDb '/var/lib/divvyd/db/rocksdb/divvydb.2d73'

To resume operation, make backups of and remove the files matching /var/lib/divvyd/db/state* and contents of the directory /var/lib/divvyd/db/rocksdb

Terminating thread divvyd: main: unhandled St13runtime_error 'state db error'
```

The easiest way to fix this problem is to delete the databases entirely. You may want to back them up elsewhere instead. For example:

```sh
mv /var/lib/divvyd/db /var/lib/divvyd/db-bak
```

Or, if you are sure you don't need the databases:

```sh
rm -r /var/lib/divvyd/db
```

**Tip:** It is generally safe to delete the `divvyd` databases, because any individual server can re-download ledger history from other servers in the XDV Ledger network.

Alternatively, you can change the paths to the databases in the config file. For example:

```
[node_db]
type=NuDB
path=/var/lib/divvyd/custom_nudb_path

[database_path]
/var/lib/divvyd/custom_sqlite_db_path
```


## Online Delete is Less Than Ledger History

An error message such as the following indicates that the `divvyd.cfg` file has contradictory values for `[ledger_history]` and `online_delete`.

```text
Terminating thread divvyd: main: unhandled St13runtime_error 'online_delete must not be less than ledger_history (currently 3000)
```

The `[ledger_history]` setting represents how many ledgers of history the server should seek to back-fill. The `online_delete` field (in the `[node_db]` stanza) indicates how many ledgers of history to keep when dropping older history. The `online_delete` value must be equal to or larger than `[ledger_history]` to prevent the server from deleting historical ledgers that it is also trying to download.

To fix the problem, edit the `divvyd.cfg` file and change or remove either the `[ledger_history]` or `online_delete` options. (If you omit `[ledger_history]`, it defaults to 256 ledger versions, so `online_delete`, if present, must be larger than 256. If you omit `online_delete`, it disables automatic deletion of old ledger versions.)


## Bad node_size value

An error such as the following indicates that the `divvyd.cfg` file has an improper value for the `node_size` setting:

```text
Terminating thread divvyd: main: unhandled N5beast14BadLexicalCastE 'std::bad_cast'
```

Valid parameters for the `node_size` field are `tiny`, `small`, `medium`, `large`, or `huge`. For more information see [Node Size](capacity-planning.html#node-size).


## Shard path missing

An error such as the following indicates that the `divvyd.cfg` has an incomplete [history sharding](history-sharding.html) configuration:

```text
Terminating thread divvyd: main: unhandled St13runtime_error 'shard path missing'
```

If your config includes a `[shard_db]` stanza, it must contain a `path` field, which points to a directory where `divvyd` can write the data for the shard store. This error means the `path` field is missing or located in the wrong place. Check for extra whitespace or typos in your config file, and compare against the [Shard Configuration Example](configure-history-sharding.html#2-edit-divvydcfg).


## ShardStore unable to open/create RocksDB

If you enable [history sharding](history-sharding.html), then later change the configuration to use RocksDB instead of NuDB, the server may try to read the existing NuDB data as RocksDB data and fail to start. In this case, the server writes an error such as the following:

```text
ShardStore:ERR shard 504 error: Unable to open/create RocksDB: Invalid argument: /var/lib/divvyd/db/shards/504: does not exist (create_if_missing is false)
```

To fix this problem, do one of the following:

- Move or delete the existing shard data from the configured folder
- Change where the shard store is located on disk by changing the `path` of the `[shard_db]` stanza in the `divvyd.cfg` file.
- Change the shard store back to using NuDB.
