#!/bin/bash

rm -rf target
mvn -Dmaven.test.skip=true package

# remove unneeded jars that are packaged from maven transitive deps

(
cd target
TMPDIR=tmp$$
mkdir $TMPDIR
(
cd $TMPDIR
unzip ../alfext_share.amp
(
cd lib
ls |grep -v alfext |xargs rm
)
zip -r ../alfext_share-nodeps.amp .
)

rm -rf $TMPDIR
)




