# lesson-4

## npm

Create an npm package with our super test helper!

## Workflow

1. To initialize package type `npm init` and follow the commands.
2. Create an index.js file exporting an example function:
```js
export function example() {
  return 5;
}
```
3. Try to run code with `node index.js`. What's wrong?
4. Convert export to old syntax. (New one is still not fully supported across packages).
```js
function example() { // don't use the export keyword. It's not supported in node.
  return 5;
}

module.exports = { // to export function use module.exports rather than export keyword
  example
};
```
5. Publicate the package.