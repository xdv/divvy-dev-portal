# Install on CentOS/Red Hat with yum

This page describes the recommended instructions for installing the latest stable version of `divvyd` on **CentOS 7** or **Red Hat Enterprise Linux 7**, using Divvy's [yum](https://en.wikipedia.org/wiki/Yellowdog_Updater,_Modified) repository.

These instructions install a binary that has been compiled by Divvy.


## Prerequisites

Before you install `divvyd`, you must meet the [System Requirements](system-requirements.html).


## Installation Steps

1. Install the Divvy RPM repository:

        $ sudo rpm -Uvh https://mirrors.xdv.io/divvy-repo-el7.rpm

2. Install the `divvyd` software package:

        $ sudo yum install --enablerepo=divvy-stable divvyd

3. Configure the `divvyd` service to start on system boot:

        $ sudo systemctl enable divvyd.service

4. Start the `divvyd` service

        $ sudo systemctl start divvyd.service


## Next Steps

{% include '_snippets/post-divvyd-install.md' %}<!--_ -->

## See Also

- [Update Automatically on CentOS/Red Hat](update-divvyd-automatically-on-centos-rhel.html)
- [Install divvyd on Ubuntu Linux](install-divvyd-on-ubuntu-with-alien.html) (Pre-built binary on Ubuntu)
- [Build and Run `divvyd` on Ubuntu](build-run-divvyd-ubuntu.html) (Compile `divvyd` yourself on Ubuntu)
- [Compilation instructions for other platforms](https://github.com/xdv/divvyd/tree/develop/Builds)
