# Install on Ubuntu with Alien

This page describes the recommended instructions for installing the latest stable version of `divvyd` on **Ubuntu Linux 16.04 or higher**, using the [Alien](https://help.ubuntu.com/community/RPM/AlienHowto) utility to install from Divvy's [yum](https://en.wikipedia.org/wiki/Yellowdog_Updater,_Modified) repository.

These instructions install a binary that has been compiled by Divvy.


## Prerequisites

Before you install `divvyd`, you must meet the [System Requirements](system-requirements.html).


## Installation Steps

1. Install yum-utils and alien:

        $ sudo apt-get update
        $ sudo apt-get install yum-utils alien

2. Install the Divvy RPM repository:

        $ sudo rpm -Uvh https://mirrors.xdv.io/divvy-repo-el7.rpm

3. Download the `divvyd` software package:

        $ yumdownloader --enablerepo=divvy-stable --releasever=el7 divvyd

4. Verify the signature on the `divvyd` software package:

        $ sudo rpm --import https://mirrors.xdv.io/rpm/RPM-GPG-KEY-divvy-release && rpm -K divvyd*.rpm

5. Install the `divvyd` software package:

        $ sudo alien -i --scripts divvyd*.rpm && rm divvyd*.rpm

6. Configure the `divvyd` service to start on system boot:

        $ sudo systemctl enable divvyd.service

7. Start the `divvyd` service

        $ sudo systemctl start divvyd.service


## Next Steps

{% include '_snippets/post-divvyd-install.md' %}
