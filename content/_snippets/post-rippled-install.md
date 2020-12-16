It can take several minutes for `divvyd` to sync with the rest of the network, during which time it outputs warnings about missing ledgers.

For information about `divvyd` log messages, see [Understanding Log Messages](understanding-log-messages.html).

After your `divvyd` has synchronized with the rest of the network, you have a fully functional stock `divvyd` server that you can use for local signing and API access to the XDV Ledger. Use [`divvyd` server states](divvyd-server-states.html) to tell whether your `divvyd` server has synchronized with the network. You can use the [`divvyd` commandline interface](get-started-with-the-divvyd-api.html#commandline) to test this quickly:

{% if currentpage.md == "tutorials/manage-the-divvyd-server/installation/build-run-divvyd-ubuntu.md" or
      currentpage.md == "tutorials/manage-the-divvyd-server/installation/build-run-divvyd-macos.md" %}
    $ ./divvyd server_info
{% else %}
    $ /opt/divvy/bin/divvyd server_info
{% endif %}

For more information about communicating with your `divvyd` server using the divvyd APIs, see the [divvyd API reference](divvyd-api.html).

Once you have your stock `divvyd` server running, you may want to consider running it as a validating server. For information about validating servers and why you might want to run one, see [Run divvyd as a Validator](run-divvyd-as-a-validator.html).

Having trouble getting your `divvyd` server started? See [divvyd Server Won't Start](server-wont-start.html).

### Additional Configuration

`divvyd` should connect to the XDV Ledger with the default configuration. However, you can change your settings by editing the `divvyd.cfg` file. For recommendations about configuration settings, see [Capacity Planning](capacity-planning.html).

{% include '_snippets/conf-file-location.md' %}<!--_ -->

See [the `divvyd` GitHub repository](https://github.com/xdv/divvyd/blob/master/cfg/divvyd-example.cfg) for a description of all configuration options.

You must restart `divvyd` for any configuration changes to take effect:


{% if currentpage.md == "tutorials/manage-the-divvyd-server/installation/install-divvyd-on-ubuntu-with-alien.md" or
      currentpage.md == "tutorials/manage-the-divvyd-server/installation/install-divvyd-on-centos-rhel-with-yum" %}
        $ sudo systemctl restart divvyd.service

{% elif currentpage.md == "tutorials/manage-the-divvyd-server/installation/build-run-divvyd-ubuntu.md" or
        currentpage.md == "tutorials/manage-the-divvyd-server/installation/build-run-divvyd-macos.md" %}

  * Use Ctrl-C to stop `divvyd`, then start it again:

        $ ./divvyd

{% endif %}

If you change the `[debug_logfile]` or `[database_path]` sections, you may need to grant ownership of the new configured path to the user you run `divvyd` as.


### Updates

You must update `divvyd` regularly to remain synced with the rest of the XDV Ledger network. You can subscribe to the [divvyd Google Group](https://groups.google.com/forum/#!forum/divvy-server) to receive notifications of new `divvyd` releases.

The `divvyd` package for Red Hat Enterprise Linux and CentOS includes a script you can use to [enable automatic updates](update-divvyd-automatically-on-centos-rhel.html) on those platforms. On other platforms, you must update manually.
