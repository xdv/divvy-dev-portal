# Update Automatically on CentOS/Red Hat

On CentOS and Red Hat Enterprise Linux, you can set up `divvyd` to automatically upgrade to the latest version with a one-time `cron` configuration. Divvy recommends enabling automatic updates if possible.

These instructions assume you have already [installed `divvyd` from the `yum` repository](install-divvyd-on-centos-rhel-with-yum.html).

To set up automatic updates, complete the following steps:

1. Check that `/opt/divvy/bin/update-divvyd.sh` exists. If it does not, [update manually](update-divvyd-manually-on-centos-rhel.html).

2. Install `crond`:

        $ sudo yum install cronie

3. Open the crontab file for editing

        $ sudo crontab -e

4. Add the following to the crontab file. Be sure to add a blank line at the end of the file.

        RANDOM_DELAY=59
        0 * * * * /opt/divvy/bin/update-divvyd.sh


The script updates the installed `divvyd` package within an hour of each new release. To reduce the chance of outages from all servers updating simultaneously, the script delays the update for a random number of minutes, up to 59.
