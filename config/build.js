const execSync = require('child_process').execSync;

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  })

console.log('Building CommonJS modules ...');

exec('babel lib -d . --ignore test.js', {
  BABEL_ENV: 'cjs',
});

console.log('\nBuilding ES modules ...');

exec('babel lib -d es --ignore test.js', {
  BABEL_ENV: 'es',
});

console.log('\nBuilding rest-error-handler.js ...');

exec('webpack --config ./config/webpack.prod.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production',
})