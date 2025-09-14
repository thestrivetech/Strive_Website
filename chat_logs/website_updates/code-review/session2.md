27 vulnerabilities (3 low, 7 moderate, 17 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
~/workspace$ npm audit
# npm audit report

@babel/helpers  <7.26.10
Severity: moderate
Babel has inefficient RegExp complexity in generated code with .replace when transpiling named capturing groups - https://github.com/advisories/GHSA-968p-4wvh-cqc8
fix available via `npm audit fix`
node_modules/@babel/helpers

brace-expansion  2.0.0 - 2.0.1
brace-expansion Regular Expression Denial of Service vulnerability - https://github.com/advisories/GHSA-v6h2-p8h4-qcjw
fix available via `npm audit fix`
node_modules/brace-expansion

cross-spawn  <6.0.6
Severity: high
Regular Expression Denial of Service (ReDoS) in cross-spawn - https://github.com/advisories/GHSA-3xgq-45jj-v275
fix available via `npm audit fix --force`
Will install imagemin-webp@6.1.0, which is a breaking change
node_modules/bin-build/node_modules/cross-spawn
node_modules/bin-check/node_modules/cross-spawn
node_modules/exec-buffer/node_modules/cross-spawn
  execa  0.5.0 - 0.9.0
  Depends on vulnerable versions of cross-spawn
  node_modules/bin-build/node_modules/execa
  node_modules/bin-check/node_modules/execa
  node_modules/exec-buffer/node_modules/execa
    bin-build  >=2.1.2
    Depends on vulnerable versions of download
    Depends on vulnerable versions of execa
    node_modules/bin-build
      cwebp-bin  >=3.0.0
      Depends on vulnerable versions of bin-build
      Depends on vulnerable versions of bin-wrapper
      node_modules/cwebp-bin
        imagemin-webp  >=5.0.0
        Depends on vulnerable versions of cwebp-bin
        Depends on vulnerable versions of exec-buffer
        node_modules/imagemin-webp
      mozjpeg  >=4.0.0
      Depends on vulnerable versions of bin-build
      Depends on vulnerable versions of bin-wrapper
      node_modules/mozjpeg
        imagemin-mozjpeg  >=8.0.0
        Depends on vulnerable versions of mozjpeg
        node_modules/imagemin-mozjpeg
    bin-check  >=4.1.0
    Depends on vulnerable versions of execa
    node_modules/bin-check
      bin-wrapper  >=0.4.0
      Depends on vulnerable versions of bin-check
      Depends on vulnerable versions of bin-version-check
      Depends on vulnerable versions of download
      node_modules/bin-wrapper
    exec-buffer  >=3.1.0
    Depends on vulnerable versions of execa
    node_modules/exec-buffer

esbuild  <=0.24.2
Severity: moderate
esbuild enables any website to send any requests to the development server and read the response - https://github.com/advisories/GHSA-67mh-4wv8-2f99
fix available via `npm audit fix --force`
Will install drizzle-kit@0.31.4, which is a breaking change
node_modules/@esbuild-kit/core-utils/node_modules/esbuild
node_modules/drizzle-kit/node_modules/esbuild
node_modules/vite/node_modules/esbuild
  @esbuild-kit/core-utils  *
  Depends on vulnerable versions of esbuild
  node_modules/@esbuild-kit/core-utils
    @esbuild-kit/esm-loader  *
    Depends on vulnerable versions of @esbuild-kit/core-utils
    node_modules/@esbuild-kit/esm-loader
      drizzle-kit  0.9.1 - 0.9.54 || >=0.12.9
      Depends on vulnerable versions of @esbuild-kit/esm-loader
      Depends on vulnerable versions of esbuild
      node_modules/drizzle-kit
  vite  <=6.1.6
  Depends on vulnerable versions of esbuild
  node_modules/vite

got  <=11.8.3
Severity: high
Got allows a redirect to a UNIX socket - https://github.com/advisories/GHSA-pfrx-2q88-qq97
Depends on vulnerable versions of cacheable-request
fix available via `npm audit fix --force`
Will install imagemin-webp@6.1.0, which is a breaking change
node_modules/bin-wrapper/node_modules/got
node_modules/got
  download  >=4.0.0
  Depends on vulnerable versions of got
  node_modules/bin-wrapper/node_modules/download
  node_modules/download

http-cache-semantics  <4.1.1
Severity: high
http-cache-semantics vulnerable to Regular Expression Denial of Service - https://github.com/advisories/GHSA-rc47-6667-2j5j
fix available via `npm audit fix --force`
Will install imagemin-webp@6.1.0, which is a breaking change
node_modules/http-cache-semantics
  cacheable-request  0.1.0 - 2.1.4
  Depends on vulnerable versions of http-cache-semantics
  node_modules/cacheable-request

on-headers  <1.1.0
on-headers is vulnerable to http response header manipulation - https://github.com/advisories/GHSA-76c9-3jph-rj3q
fix available via `npm audit fix`
node_modules/on-headers
  express-session  1.2.0 - 1.18.1
  Depends on vulnerable versions of on-headers
  node_modules/express-session

semver-regex  <=3.1.3
Severity: high
semver-regex Regular Expression Denial of Service (ReDOS) - https://github.com/advisories/GHSA-44c6-4v22-4mhx
Regular expression denial of service in semver-regex - https://github.com/advisories/GHSA-4x5v-gmq8-25ch
fix available via `npm audit fix --force`
Will install imagemin-webp@6.1.0, which is a breaking change
node_modules/semver-regex
  find-versions  <=3.2.0
  Depends on vulnerable versions of semver-regex
  node_modules/find-versions
    bin-version  <=4.0.0
    Depends on vulnerable versions of find-versions
    node_modules/bin-version
      bin-version-check  <=4.0.0
      Depends on vulnerable versions of bin-version
      node_modules/bin-version-check


27 vulnerabilities (3 low, 7 moderate, 17 high)