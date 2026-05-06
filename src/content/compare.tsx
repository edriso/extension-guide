import { Callout, CompareTable3, ProsCons } from '../components/Blocks'
import type { Page } from '../types'

export const comparePages: Page[] = [
  {
    id: 'verdict',
    title: 'Quick verdict',
    heading: 'Which browser to target first',
    lede: (
      <>
        For new extensions in 2026, ship Manifest V3 to Chrome first.
        Add Firefox second, almost for free. Treat Safari as a separate
        track only if you have macOS / iOS users to serve.
      </>
    ),
    content: (
      <>
        <p>
          Chrome plus Edge cover roughly 75% of desktop browser users
          worldwide. Firefox brings another ~3% but a power-user crowd
          that values extensions deeply. Safari covers most of the iOS
          and macOS-only audience.
        </p>
        <p>
          The good news: the WebExtension API is shared. You won't be
          rewriting your extension three times.
        </p>

        <Callout label="Lazy plan that works" tone="ok">
          <p>
            Build for Chrome first. Test the same code in Firefox. If
            something breaks, it's almost always one of three things:
            permissions, the background entry point, or a Chrome-only
            API. Fix and ship to AMO.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'browsers',
    title: 'Browser by browser',
    heading: 'Chrome, Edge, Firefox, Safari',
    content: (
      <>
        <CompareTable3
          cols={['Chrome / Edge', 'Firefox', 'Safari']}
          rows={[
            {
              feature: 'Manifest version',
              a: 'V3 only for new submissions',
              b: 'V2 + V3 (V3 recommended)',
              c: 'V3 only',
            },
            {
              feature: 'Background',
              a: 'Service worker (sleeps when idle)',
              b: 'Service worker or event page',
              c: 'Service worker',
            },
            {
              feature: 'API namespace',
              a: 'chrome.* (callbacks + promises)',
              b: 'browser.* (promises) + chrome shim',
              c: 'browser.* (promises)',
            },
            {
              feature: 'Submission cost',
              a: '$5 one-time',
              b: 'Free',
              c: '$99/year (Apple Dev)',
            },
            {
              feature: 'Review time',
              a: '~3–7 days first time',
              b: '~1–3 days, source review',
              c: '~1–2 weeks',
            },
            {
              feature: 'Install via dev mode',
              a: 'Load unpacked (chrome://extensions)',
              b: 'Temporary add-on (about:debugging)',
              c: 'Through Xcode + macOS settings',
            },
            {
              feature: 'Distribution',
              a: 'Chrome Web Store + side-load',
              b: 'AMO + side-load (signed)',
              c: 'App Store only',
            },
            {
              feature: 'Cross-device sync',
              a: 'storage.sync via Google account',
              b: 'storage.sync via Mozilla account',
              c: 'iCloud-backed sync',
            },
            {
              feature: 'Mobile',
              a: 'Edge Android, no Chrome Android',
              b: 'Firefox Android (limited add-ons)',
              c: 'iOS Safari (full Web Extensions)',
            },
          ]}
        />

        <Callout label="The mobile picture" tone="note">
          <p>
            Most desktop extensions don't run on mobile, with Safari iOS
            and Firefox Android being the exceptions. If mobile reach
            matters, Safari is unique in that you can ship one extension
            to Safari macOS and Safari iOS at once.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'manifest-versions',
    title: 'Manifest V2 vs V3',
    heading: 'What actually changed',
    content: (
      <>
        <CompareTable3
          cols={['Manifest V2', 'Manifest V3', 'What this means']}
          rows={[
            {
              feature: 'Background',
              a: 'Long-lived background page',
              b: 'Short-lived service worker',
              c: 'State must live in storage',
            },
            {
              feature: 'Remote code',
              a: 'Allowed (eval, hosted scripts)',
              b: 'Forbidden',
              c: 'Bundle everything you ship',
            },
            {
              feature: 'Network blocking',
              a: 'webRequest blocking',
              b: 'declarativeNetRequest rules',
              c: 'Different mental model for blockers',
            },
            {
              feature: 'Toolbar action',
              a: 'browser_action / page_action',
              b: 'unified action',
              c: 'Simpler, fewer fields',
            },
            {
              feature: 'Host access',
              a: 'Granted at install',
              b: 'Per-site or activeTab',
              c: 'Friendlier privacy story',
            },
            {
              feature: 'Inline scripts in HTML',
              a: 'Allowed with CSP relaxation',
              b: 'Forbidden',
              c: 'Move handlers into .js files',
            },
            {
              feature: 'webRequest (observe only)',
              a: 'Full',
              b: 'Available, non-blocking',
              c: 'Read-only without permission upgrade',
            },
          ]}
        />

        <Callout label="If you're maintaining a V2 extension" tone="warn">
          <p>
            Migrate to V3 for Chrome and Edge. Firefox still tolerates V2
            but you should plan the move. The biggest effort is usually
            re-writing webRequest blockers as declarativeNetRequest rules.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'capabilities',
    title: 'Capabilities at a glance',
    heading: 'What each browser lets you do',
    content: (
      <>
        <CompareTable3
          cols={['Chrome / Edge', 'Firefox', 'Safari']}
          rows={[
            {
              feature: 'Side panel',
              a: 'Yes (chrome.sidePanel)',
              b: 'Sidebar via sidebar_action',
              c: 'No native side panel',
            },
            {
              feature: 'DevTools panel',
              a: 'Yes',
              b: 'Yes',
              c: 'Yes',
            },
            {
              feature: 'Override new tab / history',
              a: 'Yes',
              b: 'Yes',
              c: 'Yes',
            },
            {
              feature: 'Notifications',
              a: 'Rich (basic, list, image, progress)',
              b: 'Basic only',
              c: 'Basic',
            },
            {
              feature: 'Identity / OAuth',
              a: 'chrome.identity (Google integrated)',
              b: 'chrome.identity (browser flow)',
              c: 'Custom; use webview',
            },
            {
              feature: 'Offscreen documents',
              a: 'Yes',
              b: 'No (but background can have DOM in V2 / hybrid)',
              c: 'No',
            },
            {
              feature: 'Native messaging',
              a: 'Yes',
              b: 'Yes',
              c: 'Yes (via container app)',
            },
            {
              feature: 'WebAssembly',
              a: 'Yes',
              b: 'Yes',
              c: 'Yes',
            },
          ]}
        />
      </>
    ),
  },

  {
    id: 'stores',
    title: 'Store policies',
    heading: 'What reviewers actually look at',
    content: (
      <>
        <CompareTable3
          cols={['Chrome Web Store', 'Firefox AMO', 'Mac/iOS App Store']}
          rows={[
            {
              feature: 'Single purpose policy',
              a: 'Strict. One clear job',
              b: 'Moderate',
              c: 'Strict (App Store rules)',
            },
            {
              feature: 'Permission justifications',
              a: 'Required, line by line',
              b: 'Required, in the listing',
              c: 'Required at app level',
            },
            {
              feature: 'Source code review',
              a: 'No (but they decompile and run)',
              b: 'Yes if minified. Full source review',
              c: 'No (App Store review of binary)',
            },
            {
              feature: 'Privacy policy',
              a: 'Required URL',
              b: 'Required text in listing',
              c: 'Required URL',
            },
            {
              feature: 'Cost to publish',
              a: '$5 one-time',
              b: 'Free',
              c: '$99 / year',
            },
            {
              feature: 'Updates',
              a: 'Each version reviewed; usually fast',
              b: 'Each version reviewed',
              c: 'Each version goes through App Store review',
            },
          ]}
        />

        <Callout label="The reviewer's #1 question" tone="info">
          <p>
            "Could this extension do its job with fewer permissions?" If
            the answer is yes, you'll be asked to trim. Have a clear
            answer ready for every permission you ask for.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'pros-cons',
    title: 'Pros & cons',
    heading: 'Honest summary per browser',
    content: (
      <>
        <h3>Chrome / Edge</h3>
        <ProsCons
          pros={[
            'Largest audience by far. Most users never leave Chrome or Edge.',
            'Best documentation and tooling (Chrome DevTools, Web Store dev console).',
            'Fastest review cycle for updates.',
            'Edge accepts the same extensions; one zip, two stores.',
            'Side panel and offscreen docs are first-class here.',
          ]}
          cons={[
            'Strict V3 rules forced ad-blocker rewrites.',
            'Network-blocking is now declarative-only. Less power.',
            'Permissions creep: users get nervous if you ask for too much.',
            'No mobile Chrome support for extensions.',
          ]}
        />

        <h3>Firefox</h3>
        <ProsCons
          pros={[
            'Free to publish. No yearly fee.',
            'Friendly to power-user features (still allows broader webRequest in some cases).',
            'V2 still supported during the transition.',
            'Mobile Firefox Android supports a curated set of add-ons.',
            'Source-code review keeps the catalog cleaner.',
          ]}
          cons={[
            'Smaller audience.',
            'Source review is strict; messy builds get bounced.',
            'A few APIs (sidePanel, offscreen) work differently.',
            'You need an extension ID and signing flow before AMO.',
          ]}
        />

        <h3>Safari</h3>
        <ProsCons
          pros={[
            'Only place to reach iOS Safari users.',
            'Apple-tier privacy story can be a selling point.',
            'Same WebExtension API surface as Chrome / Firefox (mostly).',
          ]}
          cons={[
            '$99 / year Apple Developer Program membership.',
            'Builds require Xcode and macOS.',
            'App Store review can take days; rejections feel less specific.',
            'Smaller, fragmented user base; not where most extensions earn.',
          ]}
        />
      </>
    ),
  },

  {
    id: 'when-to-pick',
    title: 'When to pick which first',
    heading: 'A decision shortcut',
    content: (
      <>
        <h3>Pick Chrome first when…</h3>
        <ul>
          <li>You want maximum reach with minimum effort.</li>
          <li>Your extension is a productivity, dev, or content tool.</li>
          <li>You'll iterate quickly and want the fastest review loop.</li>
        </ul>

        <h3>Pick Firefox first when…</h3>
        <ul>
          <li>You're building a privacy-focused tool. Firefox users value that.</li>
          <li>You want free publishing and a friendly review.</li>
          <li>Your extension does network-level work that Manifest V3 makes harder in Chrome.</li>
        </ul>

        <h3>Add Safari when…</h3>
        <ul>
          <li>Your audience is iOS-heavy or macOS-heavy.</li>
          <li>You already have an Apple Developer membership.</li>
          <li>The extension's value is high enough to justify the App Store flow.</li>
        </ul>

        <Callout label="Cross-publish is normal" tone="ok">
          <p>
            Most successful small extensions ship at least two stores. The
            second store is usually 10% of the work and can bring 30% more
            users. Worth doing once your first store version is stable.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'closing',
    title: 'Closing thoughts',
    heading: 'Build it, ship it, listen',
    content: (
      <>
        <p>
          Browser extensions are one of the most generous platforms for
          small developers. You don't need a server. You don't need a
          framework. You don't need a marketing budget. You need a small
          good idea and a few evenings.
        </p>
        <p>
          Pick the smallest version of your idea you can stand. Ship it
          to one store. Listen to the first three reviews. Decide what's
          next from there. Most useful extensions in the world started
          exactly this way.
        </p>

        <p className="footnote">
          Numbers and policies in this guide are accurate as of early
          2026. Stores update their rules; check{' '}
          <code>developer.chrome.com/docs/extensions</code>,{' '}
          <code>extensionworkshop.com</code>, and{' '}
          <code>developer.apple.com/safari/extensions</code> when in
          doubt.
        </p>
      </>
    ),
  },
]
