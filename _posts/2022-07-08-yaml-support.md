---
layout: post
title:  "Dog 3.5.7 is OUT!"
date:   2022-07-08 06:00
categories: news
active: Blog
---
Today we released the 3.5.7 version of Dog, introducing a new YAML format for the house model configuration file and a migration facility to enable easy switching between XML and YAML formats.

Once migrated to version 3.5.7, migration to YAML can be enabled by configuring the house model to initiate such a migration:

```
#House model configuration it.polito.elite.dog.core.housemodel.simple.cfg 
devices=dog-gateway.xml
svgplan=simple_home.svg
enableYamlMigration=True
```

When restarted with such a configuration Dog creates the new YAML configuration file ready to be used. Once done, the configuration file should be updated as follows:

```
#House model configuration it.polito.elite.dog.core.housemodel.simple.cfg 
devices=dog-gateway.yaml
svgplan=simple_home.svg
enableYamlMigration=False
```

At such point, the gateway can be restarted and put in operation.

The corresponding DEBIAN package is now available on this site and includes a minimal, yet working version of Dog incorporating EnOcean and Modbus drivers. It has been tested primarily on Raspbian (Bullseye and earlier), however it should run on Ubuntu and Debian Bullseye with almost no issue.

Stay tuned and please contact us for any issue / bug / problem you might notice. 

The Dog development Team
