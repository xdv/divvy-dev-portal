# Update Manually on Ubuntu

This page describes how to update manually to the latest release of `divvyd` on Ubuntu Linux. These instructions assume you have already [installed `divvyd` using Alien](install-divvyd-on-ubuntu-with-alien.html).

To update manually, complete the following steps:

1. Update the package list from Divvy's yum repository:

        $ sudo rpm -Uvh --replacepkgs https://mirrors.xdv.io/divvy-repo-el7.rpm

2. Download the latest `divvyd` package:

        $ yumdownloader --enablerepo=divvy-stable --releasever=el7 divvyd

3. Verify the signatures on the downloaded packages:

        $ rpm -K divvyd*.rpm

4. Use Alien to upgrade to the new `divvyd` package:

        $ sudo alien -i --scripts divvyd*.rpm

5. Reload the `systemd` unit files:

        $ sudo systemctl daemon-reload

6. Restart the `divvyd` service:

        $ sudo service divvyd restart
