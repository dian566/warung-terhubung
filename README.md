# Warung Terhubung
Public prototype with synthetic data. Not registered or submitted to any competition.

A stock-dependency explorer for small food shops, using Relate locally. Data is synthetic. No AI inference, external API, account or billing is required to run this app.

## Run
Requires Python3 for a static HTTP server, or any static-file host serving `.wasm` as `application/wasm`.

    python3 -m http.server 8080

Open http://localhost:8080 in a browser. Do not open index.html as a file: module workers need an HTTP(S) origin. A remote static host needs HTTPS for OPFS. All code and WASM files are bundled. No CDN is contacted.

## Relate integration
Relate1.0.1 WebAssembly engine runs Cypher in a module worker. Supplier -> Ingredient <- Menu relationships drive the actual impact queries and active-supplier lookup. Parameters are bound, not concatenated into Cypher. No free-form query entry is exposed.

Graph persistence uses OPFS with a visible in-memory fallback if OPFS is unavailable. OPFS is browser/origin-local, not shared or synced. Clearing website storage deletes it. A native `.rl` store for inspection is included in 11-warung.rl. `seed.js` contains the synthetic seed and fixed queries, while build_store.py creates the equivalent native store using relate-db1.0.1.

## Verify
- Telur: two affected menus, Nasi goreng and Mi goreng; two active suppliers.
- Beras: two affected menus; one active supplier.
- Ayam: one affected menu, Soto ayam; no active supplier.
- Reset: restores the example seed.
- Reload: OPFS store is retained when supported; no promises about a specific phone.

This is a single-browser prototype. Mobile viewport tests are not physical Android device tests. Contest registration and submission remain separate from this public code release. A live demo is enabled through GitHub Pages once deployment completes.

## Third-party license
Bundled engine: @relate/relate-wasm1.0.1, Apache2.0, https://github.com/relatedb/relate . The vendor engine binary and OPFS implementation are unchanged. The binary artifact is named 9-relate_bg.wasm. The relate.js WASM URL and import path are adjusted to ./opfs.js for this flat static release; no engine behavior was changed. See THIRD_PARTY_LICENSE.txt. Original project code: MIT, see LICENSE. The vendor remains Apache 2.0.

## Development assistance
AI assistance was used for the original application code and tests. No private work-session records, secrets or personal data are included. Significant AI assistance must be disclosed in any eventual contest submission.

## Refinement v2
Use English at the top to switch the entire interface for judges. Stock values must be whole numbers from0 to100000. A zero-stock scenario gets an explicit warning. Supplier buttons change active status in the local graph and update actual query results. Changes survive reload when OPFS is available; reset restores synthetic seed data. The example quantities are generic units, not interchangeable kilograms or pieces and not real inventory advice.

### Privacy and limitations
No personal data is needed. The app has no authentication, sync, order processing, pricing engine or supplier contact integration. It is a single-browser scenario tool. The first download includes a6.7MB uncompressed WASM module. Offline reload is not promised because this prototype has no service worker. Browser storage can be cleared or evicted. The public demo exposes the source and example data, not the contents of another visitor's OPFS.

### Test coverage
TEST_RESULTS.json records actual local Chromium tests at320,390,1280px: stock changes, supplier activation/deactivation, persistence after reload, English display, invalid negative input rejection, reset, fallback-free recovery scenario, query disclosure, no horizontal overflow or page errors. All HTTP requests during those tests were local static assets. This does not prove support on every mobile browser or physical phone.
