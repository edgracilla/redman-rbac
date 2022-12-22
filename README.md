# Verb Based RBAC
A not so simple Role-Based Access Control System

It is highly influenced by [File System](https://en.wikipedia.org/wiki/File-system_permissions) symbolic notation


e.g. \
`-rwxr-xr-x` \
`crw-rw-r--`

In Verb Based Auth we do: \
`x---` for create/execute access (POST) \
`-r--` for read access (GET) \
`--u-` for update access (PATCH) \
`---d` for delete access (DELETE)

Basically a row represent as `[POST, GET, PATCH, DELETE]`
and each column char has a tristate value:

1. `-` or non `xrud` char represents - no access.
2. lowercase `xrud` char represents - partial access, which needs addition checking see below.
3. uppercase `XRUD` char represents - full access.

Lowercase (xrud) represents as a hint for the succeding process that that verb procedure
needs a controller level added permission checking. Such as checking if the product belongs
to a merchant, or asset belongs to a building, etc. This will blatantly fall in your
db query and database design.
