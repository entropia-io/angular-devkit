# AngularDevkit

## How to create a new lib?

```console
ng g library @entropia-io/lib-name --prefix=npx
 ```

add a build script at `package.json` for easy deploy

## How to publish a library

1. Commit all previous changes, so repo will be clean

2. Manually update the version number on package.json file at `./projects/entropia-io/ngx-xxxx/package.json`

3. Build and publish library
   ```console
   npm run build:xxxx
   cd dist/entropia-io/ngx-xxxx
   npm publish   
   ```
   
4. Commit changes
   ```console
   cd -
   git add *
   git commit -m "New versions: @entropia-io/ngx-xxxx -> from v0.0.x to v0.0.y"
   git push
   ```

> check `package.json` file for all `build:xxxx` scripts
