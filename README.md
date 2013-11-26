alfext
======

Collection of useful fixes, patches and extensions for Alfresco packaged as an installable AMP file.
The intention is to collect useful work done by the community and make the code easier availabe for
users of Alresco providing a pre packaged installable module.


Installation and configuration
==============================

See the corresponding wiki page here [wiki/Installation_and_configuration]

Done
====

* DEPLOYMENT: Sharepoint protocol (SPP): simpler deployment for SPP
Provides a custom jetty connector to allow proper protocol (http or https) delegation from a fronting reverse
proxy via the header X-Forwared-Proto. This removes the requirement to do complicated jetty SSL configuration.


Todos and whishlist
===================

* DEVELOPMENT: Add the import(...) feature for JavaScript imports. This has the huge benefit over the Alfresco style imports
done with <import ...> by not breaking syntax correctness of JavaScript. Further line numbers in error messages
point to the correct line and will make debugging a lot easier, which is not the case with the Alfresco style imports.
Provided by AFaust at https://github.com/AFaust/alfresco-enhanced-script-environment

* DEPLOYMENT: Remove the hidden tracking pixel. It should be clear to users what kind of data is transmitted.


