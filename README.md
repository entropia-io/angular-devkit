# AngularDevkit

## How to create a new lib?

```console
ng g library @entropia-io/lib-name --prefix=npx
 ```

## How to publish a library

1. Manually update the version number on package.json file at `./projects/entropia-io/ngx-xxxx/package.json`

2. Build and publish library
   ```console
   ng build @entropia-io/ngx-xxxx
   cd dist/entropia-io/ngx-xxxx
   npm publish
   ```
