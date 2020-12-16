# Connect Your divvyd to the XDV Test Net

Divvy has created the [XDV Test Network](https://xdv.io/build/xdv-test-net/) to provide a testing platform for the XDV Ledger. XDV Test Net funds are not real funds and are intended for testing only. You can connect your `divvyd` server to the XDV Test Net to test out and understand `divvyd` functionality before connecting to the production XDV Ledger Network. You can also use the XDV Test Net to verify that your own code interacts correctly with `divvyd`.

**Note:** The XDV Test Net ledger and balances are reset on a regular basis.

To connect your `divvyd` server to the XDV Test Net, set the following configurations:

1. In your `divvyd.cfg` file:

    a. Uncomment the following section, as follows:

        [ips]
        r.altnet.divvytest.net 51235

    b. Comment out the following section, as follows:

        # [ips]
        # r.xdv.io 51235

2. In your `validators.txt` file:

    a. Uncomment the following sections, as follows:

        [validator_list_sites]
        https://vl.altnet.divvytest.net

        [validator_list_keys]
        ED264807102805220DA0F312E71FC2C69E1552C9C5790F6C25E3729DEB573D5860

    b. Comment out the following sections, as follows:

        # [validator_list_sites]
        # https://vl.xdv.io
        #
        # [validator_list_keys]
        # ED2677ABFFD1B33AC6FBC3062B71F1E8397C1505E1C42C64D11AD1B28FF73F4734

3. Restart `divvyd`.

4. To verify that your `divvyd` is connected to the XDV Test Net, use the [server_info method][] on your server and compare it to the results from a public server on the Test Net. The `seq` field of the `validated_ledger` object should be the same on both servers (possibly off by one or two, if it changed as you were checking).

    The following command checks the latest validated ledger of a Test Net server at `s.altnet.divvytest.net`:

        $ ./divvyd --rpc_ip 34.210.87.206:51234 server_info | grep seq

    The following command checks your local `divvyd`'s latest validated ledger sequence:

        $ ./divvyd server_info | grep seq



<!--{# common link defs #}-->
{% include '_snippets/divvyd-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/divvyd_versions.md' %}
