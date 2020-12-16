# Update Manually on CentOS/Red Hat

This page describes how to update manually to the latest release of `divvyd` on CentOS or Red Hat Enterprise Linux. Divvy recommends setting up [automatic updates](update-divvyd-automatically-on-centos-rhel.html) instead, where possible.

These instructions assume you have already [installed `divvyd` from the `yum` repository](install-divvyd-on-centos-rhel-with-yum.html).

To update manually, complete the following steps:

1. Update the package list from Divvy's yum repository:

        $ sudo rpm -Uvh --replacepkgs https://mirrors.xdv.io/divvy-repo-el7.rpm

2. Download and install the latest `divvyd` package:

        $ sudo yum update --enablerepo=divvy-stable divvyd

3. Reload the `systemd` unit files:

        $ sudo systemctl daemon-reload

4. Restart the `divvyd` service:

        $ sudo service divvyd restart
