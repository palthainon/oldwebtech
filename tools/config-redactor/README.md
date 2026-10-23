# Browser configuration redactor

The Network tools page uses the Lawson Cyber redactor rules for eight vendor and format profiles. Configuration processing runs in a browser worker. The page requires review before copy or download because unsupported sensitive values can remain.

Source: https://github.com/palthainon/lawson-config-redactor
Version: 0.4.0 local source
Source hashes: vendor/source.json
License: [MIT](../../nettools/config-redactor/LICENSE.txt)

The vendor directory retains seven TypeScript files from the extension. Run the sync script with the extension repository path before rebuilding. The synchronization manifest records normalized source hashes. The build script replaces Node address validation with strict browser validation. It replaces Node cryptography with Web Crypto. Address allocation uses the same keyed SHA-256 operation. The source extension stays unchanged.

## Profiles

The selector includes Cisco IOS and IOS-XE, Palo Alto PAN-OS set commands and XML, Junos set commands and hierarchy, and Dell OS6, OS9, and OS10. A profile change clears manual masks and requires a new review. XML mode masks values conservatively. Unsupported formats and unknown sensitive fields block export.

Vendor sources: [VENDOR-SOURCES.md](test/fixtures/VENDOR-SOURCES.md).

## Build and tests

From the repository root:

1. Install build dependencies with `npm ci --ignore-scripts --prefix mcp-experiment`.
2. Build with `node tools/config-redactor/build.mjs`.
3. Test with `node --test tools/config-redactor/test/core.test.mjs`.
4. Check generated files with `node tools/config-redactor/build.mjs --check`.

The page has no runtime package dependency. The static deployment includes the generated JavaScript files.

For browser checks, install Playwright in a test environment. Set `PLAYWRIGHT_MODULE` to its package path if it is not available through Node resolution. Set `TEST_BROWSER` to `chrome` or `msedge`. Run `node tools/config-redactor/test/browser.mjs`. The harness uses a temporary loopback server. It uses synthetic configurations only. Screenshots go to the repository's tmp directory.

## Verification on 2026-10-23

All 35 core tests passed. Both address modes match the original implementation. Ten mapping keys also produce identical results. Independent checks cover 161 secrets, 544 addresses, and 151 network relationships in the 1,567-line fixture.

All fifteen browser check groups passed in Edge 155.0.4283.62 and Chrome 156.0.8078.47. Checks include Junos privacy key removal and blocked export for unsupported privacy values. Checks cover review controls, copy, download, manual masks, blocked sections, source changes, cancellation, file size, offline processing after load, mobile layout, browser storage, and request destinations. Desktop and mobile screenshots received visual review.

Firefox and Safari checks remain untested because their test engines are not installed. These tests do not establish complete detection of sensitive content.

The clipboard test normalizes Windows line endings. The cancellation test triggers scan and cancel in one browser task to avoid a timing race.

## Privacy and limits

Configuration values stay in page and worker memory. The page does not include analytics or remote assets. The page policy blocks outgoing connections. The source, preview, and manual masks clear on page exit or Clear page. Browser navigation preferences can still use the site's existing storage.

The browser text area normalizes line endings to LF. The output is review text. Do not use it as a device configuration. The download has a fixed filename. This page does not preserve original filenames.

No server tool, hosting resource, quota, or deployment changed.
