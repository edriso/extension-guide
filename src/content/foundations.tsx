import {
  Callout,
  Code,
  Limits,
  Tags,
  Terms,
  Tree,
} from '../components/Blocks'
import type { Page } from '../types'

export const foundationsPages: Page[] = [
  {
    id: 'intro',
    title: 'What is an extension',
    heading: 'A browser extension, in plain words',
    lede: (
      <>
        A small bundle of HTML, CSS, and JavaScript that the browser loads
        alongside the web. It can change pages, add buttons, watch tabs, save
        data, and talk to your servers, all from inside the browser.
      </>
    ),
    content: (
      <>
        <p>
          Think of the browser as an apartment building. Every web page is a
          tenant. An extension is the friendly handyman the landlord (the
          user) lets through the front door with a key. The handyman can walk
          into any apartment, fix things, leave notes, and remember little
          things between visits.
        </p>
        <p>
          The key is the <strong>permission set</strong> the user agrees to
          when they install the extension. The keychain is the{' '}
          <strong>manifest</strong>. The handyman is your code, split into
          a few specialised parts that we'll meet shortly.
        </p>

        <h3>What an extension can typically do</h3>
        <ul>
          <li>Show a popup when the user clicks the extension's toolbar icon.</li>
          <li>Inject scripts into pages to read or change their content.</li>
          <li>Listen for events: tab created, alarm fired, message received.</li>
          <li>Store data locally, or sync it across the user's signed-in browsers.</li>
          <li>Fetch data from the network, even from origins the page itself can't reach.</li>
          <li>Add items to the right-click menu, omnibox keywords, or a side panel.</li>
          <li>Override the new-tab page, bookmarks panel, or history page.</li>
        </ul>

        <Callout label="Mental model" tone="info">
          <p>
            An extension is a tiny browser-aware app that can also see the
            web. That dual personality is the whole magic.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'skills',
    title: 'Skills you need',
    heading: 'What you should know before building',
    lede: (
      <>
        The good news: extensions are made of plain web technology. If you
        can build a small website, you can build an extension.
      </>
    ),
    content: (
      <>
        <h3>The basics</h3>
        <Terms
          items={[
            { term: 'HTML', def: 'For the popup, options page, side panel. Any UI surface your extension shows.' },
            { term: 'CSS', def: 'For styling those surfaces. The same CSS you already write.' },
            { term: 'JavaScript', def: 'The brain. You can use plain JS or TypeScript with a build step.' },
            { term: 'JSON', def: 'You will write one. The manifest.json that describes the extension.' },
            { term: 'The browser dev tools', def: 'You will live inside the inspector. Learning the Network and Application tabs really helps.' },
          ]}
        />

        <h3>Helpful but optional</h3>
        <Terms
          items={[
            { term: 'A bundler', def: 'Vite, Webpack, or Rollup. Useful when you outgrow vanilla JS. For TypeScript, modules, React, etc.' },
            { term: 'A framework', def: 'React, Svelte, Vue, Solid. Optional. The browser does not care which one you use; it gets static HTML and JS.' },
            { term: 'TypeScript', def: 'Highly recommended once your extension grows. Type definitions for chrome.* / browser.* APIs are excellent.' },
            { term: 'Git', def: 'For version control and shipping updates safely.' },
            { term: 'The Web Platform basics', def: 'Promises, async/await, fetch, the DOM. Same skills as web work.' },
          ]}
        />

        <Callout label="You do not need" tone="ok">
          <p>
            A native compiler, a server, a backend, a paid service, or any
            framework. The smallest useful extension is three files in a
            folder.
          </p>
        </Callout>

        <Tags items={['html', 'css', 'js', 'json', 'web platform basics', 'devtools']} />
      </>
    ),
  },

  {
    id: 'anatomy',
    title: 'Anatomy of an extension',
    heading: 'The pieces that make up an extension',
    lede: (
      <>
        An extension is a folder of files that the browser reads and runs.
        Different files play different roles. Here's the cast.
      </>
    ),
    content: (
      <>
        <h3>The folder</h3>
        <Tree>
{`my-extension/
├─ manifest.json        ← required. Describes the extension
├─ icons/               ← icons in 16, 32, 48, 128 px
│  └─ icon-128.png
├─ background.js        ← service worker / background page
├─ content.js           ← script injected into web pages
├─ popup/
│  ├─ popup.html        ← UI when toolbar icon clicked
│  ├─ popup.css
│  └─ popup.js
├─ options/             ← settings page
│  ├─ options.html
│  └─ options.js
└─ _locales/            ← optional translations
   └─ en/
      └─ messages.json`}
        </Tree>

        <h3>The roles</h3>
        <Terms
          items={[
            { term: 'manifest.json', def: 'The required file. Lists name, version, permissions, and which scripts go where.' },
            { term: 'Service worker (background)', def: 'A short-lived script that handles events: alarms, messages, install. Has access to extension APIs but no DOM.' },
            { term: 'Content scripts', def: 'JS that runs inside web pages. Sees and changes the page DOM. Lives in a sandboxed environment, not the page\'s own JS world.' },
            { term: 'Popup', def: 'A tiny HTML page shown when the toolbar icon is clicked. Closes on click-away.' },
            { term: 'Options page', def: 'A full-tab settings UI accessible from the extension manager.' },
            { term: 'Side panel', def: 'A docked panel that lives next to the page. Newer surface, great for tools.' },
            { term: 'DevTools page', def: 'Adds a tab to the dev tools. Useful for developer-targeted extensions.' },
            { term: 'Override pages', def: 'You can replace the new tab, bookmarks, or history pages with your own HTML.' },
          ]}
        />

        <Callout label="Tip">
          <p>
            You don't need every part. Many useful extensions have only a
            manifest, an icon, and one of: a popup, a content script, or a
            background worker.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'manifest',
    title: 'The manifest',
    heading: 'manifest.json, your extension\'s ID card',
    lede: (
      <>
        The manifest is a small JSON file. Every extension has exactly one.
        Browsers refuse to load anything without it.
      </>
    ),
    content: (
      <>
        <p>
          Here's a real, minimum-but-useful manifest for Manifest V3 (the
          modern format that Chrome, Edge, Firefox, and Safari all
          support).
        </p>

        <Code lang="json" file="manifest.json">
{`{
  "manifest_version": 3,
  "name": "My Lovely Extension",
  "version": "1.0.0",
  "description": "Adds a button that says hello.",
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  },
  "action": {
    "default_title": "Say hello",
    "default_popup": "popup/popup.html"
  },
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"],
  "host_permissions": ["https://example.com/*"]
}`}
        </Code>

        <h3>What every field does</h3>
        <Terms
          items={[
            { term: 'manifest_version', def: 'Always 3 for new extensions. Manifest V2 still runs in Firefox but is being phased out.' },
            { term: 'name', def: 'Up to 75 characters. Shown in the store and the extension manager.' },
            { term: 'version', def: 'A dotted number. Each upload to the store needs a higher version.' },
            { term: 'description', def: 'A short blurb (up to 132 chars). Localizable.' },
            { term: 'icons', def: 'Sizes the browser uses in different places. 16 (small), 32, 48 (manager), 128 (store).' },
            { term: 'action', def: 'Configures the toolbar button. The default popup HTML opens when you click it.' },
            { term: 'background.service_worker', def: 'JS file that runs as the background service worker.' },
            { term: 'content_scripts', def: 'Tells the browser to inject scripts into pages matching certain URLs.' },
            { term: 'permissions', def: 'API-level permissions you need (storage, alarms, tabs, etc.).' },
            { term: 'host_permissions', def: 'URL patterns your extension is allowed to read or modify pages on.' },
            { term: 'options_page / options_ui', def: 'Points at your settings page.' },
            { term: 'side_panel', def: 'Points at the HTML for your side panel.' },
            { term: 'commands', def: 'Keyboard shortcuts your extension exposes.' },
            { term: 'web_accessible_resources', def: 'Files inside the extension that web pages or content scripts may load.' },
          ]}
        />

        <Callout label="Validate as you go">
          <p>
            Bad manifests cause silent failures. Run the JSON through any
            validator and load the unpacked extension early. The browser's
            error message will point at the line that's wrong.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'mv2-vs-mv3',
    title: 'Manifest V2 vs V3',
    heading: 'V2 is the past, V3 is the present',
    lede: (
      <>
        Manifest V3 (MV3) is the format new extensions must use in Chrome,
        Edge, and the Chrome Web Store. Firefox supports both, but is
        steering everyone toward V3 too.
      </>
    ),
    content: (
      <>
        <h3>The big differences</h3>
        <Terms
          items={[
            { term: 'Background', def: 'V2 had long-lived "background pages". V3 uses short-lived service workers that go to sleep when idle.' },
            { term: 'Remote code', def: 'V3 forbids loading code from outside the extension package. You can fetch data; you cannot eval scripts pulled at runtime.' },
            { term: 'Network blocking', def: 'V2 used the powerful (and abused) webRequest blocking API. V3 uses declarativeNetRequest with predefined rules.' },
            { term: 'Permissions', def: 'V3 lets users grant host access per-site instead of "on every site you visit".' },
            { term: 'browser_action / page_action', def: 'V2 had two separate actions. V3 unified them as "action".' },
            { term: 'CSP', def: 'V3 has stricter Content Security Policy. No inline scripts in HTML.' },
          ]}
        />

        <Callout label="Why the change" tone="note">
          <p>
            V2's powerful APIs let extensions snoop too easily. V3 is more
            privacy-friendly and a lot more efficient for the browser. The
            trade-off is that some classic ad-blocker tricks need to be
            re-thought.
          </p>
        </Callout>

        <h3>What this means for you</h3>
        <ul>
          <li>Build new extensions in V3. Don't even start V2.</li>
          <li>Plan for the service worker waking and sleeping. State that needs to live longer than the worker must go in <code>chrome.storage</code>.</li>
          <li>If you need to block requests, write declarative rules. They are JSON the browser executes, not code you run on each request.</li>
          <li>Avoid eval, new Function, and any "load this script from a URL" patterns.</li>
        </ul>
      </>
    ),
  },

  {
    id: 'permissions',
    title: 'Permissions',
    heading: 'What you ask for vs. what you actually need',
    lede: (
      <>
        Permissions are the trade between you and the user. Ask for too
        much and people refuse to install. Ask for too little and your
        code can't do its job.
      </>
    ),
    content: (
      <>
        <h3>The two kinds</h3>
        <Terms
          items={[
            { term: 'API permissions', def: 'Named features like "storage", "alarms", "tabs", "scripting", "activeTab", "contextMenus", "notifications", "downloads".' },
            { term: 'Host permissions', def: 'URL match patterns like "https://*.example.com/*" or "<all_urls>". Lets you read/write pages on those URLs.' },
          ]}
        />

        <h3>Common ones, explained</h3>
        <Terms
          items={[
            { term: 'storage', def: 'Read/write chrome.storage. Almost always needed.' },
            { term: 'activeTab', def: 'Temporary access to the page the user just clicked your icon on. The friendliest permission. The user grants it implicitly by clicking.' },
            { term: 'tabs', def: 'See tab titles, URLs, and metadata. Bigger permission than activeTab.' },
            { term: 'scripting', def: 'Inject scripts dynamically with chrome.scripting.executeScript.' },
            { term: 'alarms', def: 'Schedule recurring tasks even when the worker is asleep.' },
            { term: 'contextMenus', def: 'Add items to the right-click menu.' },
            { term: 'notifications', def: 'Show OS-level notifications.' },
            { term: 'cookies', def: 'Read or set cookies for matching hosts. Sensitive. Review before using.' },
            { term: 'webRequest / declarativeNetRequest', def: 'Inspect or modify network requests.' },
            { term: 'identity', def: 'OAuth login flows. Needed if you connect to Google or any provider.' },
          ]}
        />

        <h3>Optional permissions</h3>
        <p>
          You can declare permissions in <code>optional_permissions</code> and
          ask for them at runtime with <code>chrome.permissions.request</code>.
          A user clicking "Sync to Notion" sees a friendly prompt right before
          the feature uses the new power.
        </p>

        <Code lang="js" file="popup.js">
{`document.querySelector('#sync').addEventListener('click', async () => {
  const granted = await chrome.permissions.request({
    permissions: ['identity'],
    origins: ['https://api.notion.com/*'],
  })
  if (granted) await syncToNotion()
})`}
        </Code>

        <Callout label="Rule of thumb" tone="ok">
          <p>
            Start with the smallest permission set. Use <code>activeTab</code>{' '}
            when you can. Move things to optional permissions when they only
            run on user action. Reviewers and users both notice.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'background',
    title: 'Background / service worker',
    heading: 'The brain that wakes up when needed',
    lede: (
      <>
        The service worker handles events, runs short tasks, and goes back
        to sleep. It cannot use the DOM but it can use most extension
        APIs.
      </>
    ),
    content: (
      <>
        <p>
          A V3 service worker behaves like a web ServiceWorker: it registers
          listeners up front, the browser invokes them when the right event
          happens, and after about <strong>30 seconds of idle time</strong>{' '}
          it is unloaded. State in module variables is lost when it sleeps,
          so anything you need later goes into <code>chrome.storage</code>.
        </p>

        <Code lang="js" file="background.js">
{`// register listeners at the top level
chrome.runtime.onInstalled.addListener(() => {
  console.log('Welcome aboard.')
  chrome.contextMenus.create({
    id: 'highlight',
    title: 'Highlight on the page',
    contexts: ['selection'],
  })
})

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'PING') {
    sendResponse({ pong: Date.now() })
    return true // keep the channel open if you respond async
  }
})

chrome.alarms.create('refresh', { periodInMinutes: 30 })
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'refresh') {
    const data = await fetch('https://example.com/feed').then(r => r.json())
    await chrome.storage.local.set({ feed: data, fetchedAt: Date.now() })
  }
})`}
        </Code>

        <h3>Things to watch for</h3>
        <ul>
          <li>
            All listeners must be registered <em>synchronously</em>, at the
            top of the file. Listeners added inside an async callback can
            be missed when the worker wakes.
          </li>
          <li>
            <code>setTimeout</code> and <code>setInterval</code> won't fire
            once the worker sleeps. Use <code>chrome.alarms</code> for any
            schedule longer than ~30 seconds.
          </li>
          <li>
            No <code>document</code>, no <code>window</code>, no DOM. If you
            need to parse HTML, use <code>DOMParser</code>.
          </li>
          <li>
            For long-running networking, do the work, save the result, and
            let the worker sleep. Don't try to keep it alive.
          </li>
        </ul>

        <Callout label="When the worker is not enough" tone="note">
          <p>
            For tasks that genuinely need a live page (audio playback, live
            DOM, WebRTC), open an <strong>offscreen document</strong>: it's
            an invisible HTML page your worker can spawn and talk to.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'content-scripts',
    title: 'Content scripts',
    heading: 'Code that lives inside the web page',
    lede: (
      <>
        Content scripts run in the page's tab. They see and change the
        DOM. They are sandboxed away from the page's own JavaScript, but
        they share the DOM.
      </>
    ),
    content: (
      <>
        <h3>How to declare them</h3>
        <Code lang="json" file="manifest.json (excerpt)">
{`{
  "content_scripts": [
    {
      "matches": ["https://github.com/*"],
      "js": ["content.js"],
      "css": ["content.css"],
      "run_at": "document_idle"
    }
  ]
}`}
        </Code>

        <Terms
          items={[
            { term: 'matches', def: 'URL patterns where the script runs. Use the smallest pattern that works.' },
            { term: 'js / css', def: 'Files to inject. Loaded in order.' },
            { term: 'run_at', def: '"document_start" before parsing, "document_end" after DOM is ready, "document_idle" (default) after that.' },
            { term: 'all_frames', def: 'true if you want to run inside iframes too. Default is false.' },
            { term: 'world', def: '"ISOLATED" (default, sandboxed) or "MAIN" (runs in the page\'s own JS world). Use MAIN when you need to call page-defined functions or read window globals.' },
          ]}
        />

        <h3>Inject scripts on demand</h3>
        <p>
          Sometimes you don't want a script to always run. You want it
          when the user clicks your toolbar icon. Use the scripting API.
        </p>

        <Code lang="js" file="background.js">
{`chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      document.body.style.background = 'lemonchiffon'
      alert('Hello from your extension!')
    },
  })
})`}
        </Code>

        <h3>Talking between content and background</h3>
        <Code lang="js" file="content.js">
{`// from content script → background worker
const reply = await chrome.runtime.sendMessage({ type: 'PING' })
console.log('background says', reply)`}
        </Code>

        <Callout label="Sandbox gotcha" tone="warn">
          <p>
            By default the content script and the page's own scripts share
            the DOM but live in separate worlds. They can't read each
            other's variables. Use{' '}
            <code>postMessage</code> + <code>window.addEventListener('message')</code>{' '}
            if you really need to swap data with the page's JS. Most
            extensions never need to.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'popup-options',
    title: 'Popup, options, side panel',
    heading: 'The visible surfaces of your extension',
    lede: (
      <>
        These are just regular HTML pages, hosted inside the extension.
        Same DOM, same CSS, same JS. But with chrome.* APIs available.
      </>
    ),
    content: (
      <>
        <h3>Popup</h3>
        <p>
          A popup is a tiny HTML page shown when the user clicks the
          toolbar icon. It closes the moment focus moves elsewhere. Keep
          it small and friendly.
        </p>

        <Code lang="html" file="popup/popup.html">
{`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="popup.css" />
    <title>My Extension</title>
  </head>
  <body>
    <h1>Hello!</h1>
    <button id="action">Do the thing</button>
    <script src="popup.js"></script>
  </body>
</html>`}
        </Code>

        <Callout label="Width matters">
          <p>
            Popups grow to fit content but are limited (about 800×600 max).
            Aim for ~360px wide and only as tall as you need.
          </p>
        </Callout>

        <h3>Options page</h3>
        <p>
          A full-tab settings page. Open it with{' '}
          <code>chrome.runtime.openOptionsPage()</code> or the user can find
          it in the extension manager.
        </p>

        <Code lang="json" file="manifest.json (excerpt)">
{`"options_ui": {
  "page": "options/options.html",
  "open_in_tab": true
}`}
        </Code>

        <h3>Side panel</h3>
        <p>
          A panel docked next to the page. Great for tools the user keeps
          open while browsing, like notes or a chat.
        </p>

        <Code lang="json" file="manifest.json (excerpt)">
{`"permissions": ["sidePanel"],
"side_panel": { "default_path": "side/panel.html" }`}
        </Code>

        <Code lang="js" file="background.js">
{`chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })`}
        </Code>

        <h3>One thing they all share</h3>
        <p>
          These pages can use the full <code>chrome.*</code> API and have a
          DOM. They are <em>your</em> pages. Totally normal HTML where
          you can use any framework, any library, anything you'd ship to
          the web.
        </p>
      </>
    ),
  },

  {
    id: 'storage',
    title: 'Storage & sync',
    heading: 'Saving data across sessions',
    lede: (
      <>
        chrome.storage is the friendliest place to keep small data. It
        survives reloads, syncs across devices if you want, and is
        accessible from every part of your extension.
      </>
    ),
    content: (
      <>
        <h3>The four areas</h3>
        <Terms
          items={[
            { term: 'storage.local', def: 'Plain local storage. ~10 MB by default. Lives on this device.' },
            { term: 'storage.sync', def: 'Syncs across the user\'s signed-in browsers. Smaller quotas (~100 KB total). Great for settings.' },
            { term: 'storage.session', def: 'In-memory store. Cleared when the browser closes. Useful for short-lived caches.' },
            { term: 'storage.managed', def: 'Read-only. Set by an enterprise admin via policy. Most extensions ignore it.' },
          ]}
        />

        <h3>Read and write</h3>
        <Code lang="js">
{`// write
await chrome.storage.local.set({ count: 42 })

// read
const { count } = await chrome.storage.local.get('count')
console.log(count) // 42

// remove
await chrome.storage.local.remove('count')`}
        </Code>

        <h3>React to changes</h3>
        <Code lang="js">
{`chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.count) {
    console.log('count went from', changes.count.oldValue, 'to', changes.count.newValue)
  }
})`}
        </Code>

        <h3>Limits to remember</h3>
        <Limits
          items={[
            { label: 'storage.local', value: '~10 MB', meta: 'per extension by default' },
            { label: 'storage.sync (total)', value: '~100 KB', meta: 'across all keys' },
            { label: 'storage.sync (per item)', value: '~8 KB', meta: 'per key' },
            { label: 'sync writes / hour', value: '~1,800', meta: 'rate limited' },
            { label: 'storage.session', value: '~10 MB', meta: 'in-memory only' },
          ]}
        />

        <Callout label="Don't put secrets here" tone="warn">
          <p>
            chrome.storage is unencrypted and accessible to anyone with
            local access to the browser profile. Don't store passwords or
            API tokens in plain text. Use <code>chrome.identity</code> for
            OAuth tokens managed by the browser.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'messaging',
    title: 'Messaging',
    heading: 'Talking between parts',
    lede: (
      <>
        Background, content scripts, popups, and side panels live in
        different worlds. Messaging is how they speak.
      </>
    ),
    content: (
      <>
        <h3>One-shot messages</h3>
        <Code lang="js" file="popup.js">
{`const reply = await chrome.runtime.sendMessage({ type: 'GET_STATS' })
document.querySelector('#count').textContent = reply.count`}
        </Code>

        <Code lang="js" file="background.js">
{`chrome.runtime.onMessage.addListener((msg, sender, send) => {
  if (msg.type === 'GET_STATS') {
    chrome.storage.local.get('count').then(({ count = 0 }) => {
      send({ count })
    })
    return true // tell the runtime: we'll respond async
  }
})`}
        </Code>

        <h3>Long-lived ports</h3>
        <p>
          For chatty conversations (a streaming response, a live
          subscription), open a port that stays open until either side
          disconnects.
        </p>

        <Code lang="js">
{`// content script
const port = chrome.runtime.connect({ name: 'live' })
port.postMessage({ hello: 'world' })
port.onMessage.addListener((msg) => console.log('background says', msg))`}
        </Code>

        <Code lang="js" file="background.js">
{`chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'live') {
    port.onMessage.addListener((msg) => {
      port.postMessage({ echo: msg })
    })
  }
})`}
        </Code>

        <h3>Talking to a specific tab</h3>
        <Code lang="js" file="background.js">
{`const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
const reply = await chrome.tabs.sendMessage(tab.id, { type: 'PARSE_PAGE' })`}
        </Code>

        <Callout label="Pattern" tone="info">
          <p>
            One <em>type</em> per message helps a lot. Treat messages like
            tiny actions: <code>{`{ type: 'SAVE_BOOKMARK', payload: {...} }`}</code>.
            It scales as your extension grows.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'apis-tour',
    title: 'API tour',
    heading: 'A short tour of the most-used APIs',
    lede: (
      <>
        You won't need every API. Knowing roughly what's there saves time
        when you wonder "can my extension even do this?"
      </>
    ),
    content: (
      <>
        <Terms
          items={[
            { term: 'chrome.tabs', def: 'Read tab info, create/close tabs, send messages to a tab.' },
            { term: 'chrome.windows', def: 'List, focus, create browser windows.' },
            { term: 'chrome.scripting', def: 'Inject JS or CSS into a tab on demand.' },
            { term: 'chrome.action', def: 'Toolbar button: badge text, icon, listening to clicks.' },
            { term: 'chrome.contextMenus', def: 'Right-click menu items, contextual to selection / link / image.' },
            { term: 'chrome.commands', def: 'Keyboard shortcuts the user can rebind.' },
            { term: 'chrome.alarms', def: 'Reliable timers that survive worker sleep.' },
            { term: 'chrome.notifications', def: 'OS-level notifications with title, message, and image.' },
            { term: 'chrome.downloads', def: 'Trigger a download or watch progress.' },
            { term: 'chrome.history / chrome.bookmarks', def: 'Read or modify the user\'s browsing data.' },
            { term: 'chrome.cookies', def: 'Read/write cookies. Sensitive permission.' },
            { term: 'chrome.identity', def: 'OAuth login flows. Useful for "Sign in with Google" extensions.' },
            { term: 'chrome.runtime', def: 'Lifecycle: onInstalled, sendMessage, getURL, openOptionsPage.' },
            { term: 'chrome.storage', def: 'Persistent key-value store. See the storage page.' },
            { term: 'chrome.declarativeNetRequest', def: 'Block, redirect, or modify network requests with rules.' },
            { term: 'chrome.webRequest', def: 'Observe network requests. Restricted in V3. Read-only for non-blocking.' },
            { term: 'chrome.devtools', def: 'Add a panel to the dev tools.' },
            { term: 'chrome.sidePanel', def: 'Show a docked panel beside the page.' },
            { term: 'chrome.offscreen', def: 'Spawn an invisible page with a real DOM (audio, DOM parsing).' },
            { term: 'chrome.i18n', def: 'Localized strings via _locales/.' },
          ]}
        />

        <Callout label="Where to look up the rest" tone="note">
          <p>
            Bookmark <code>developer.chrome.com/docs/extensions</code> and{' '}
            <code>developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions</code>.
            Both are excellent and authoritative.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'cross-browser',
    title: 'Cross-browser',
    heading: 'Will my extension run in Firefox and Safari?',
    lede: (
      <>
        Mostly yes, with care. The WebExtension API is broadly the same
        across Chrome, Edge, Firefox, and Safari. But each has corners
        of its own.
      </>
    ),
    content: (
      <>
        <h3>The API namespaces</h3>
        <Terms
          items={[
            { term: 'chrome.*', def: 'Callback-style by default in Chrome and Edge. Modern versions also support promises.' },
            { term: 'browser.*', def: 'Promise-based, used in Firefox. Firefox also exposes chrome.* as a callback shim.' },
            { term: 'Safari', def: 'Uses browser.* with promises. Web Extension support is real and improving.' },
          ]}
        />

        <h3>Smooth-over patterns</h3>
        <Code lang="js">
{`// works in Chrome, Edge, Firefox, Safari
const api = globalThis.browser ?? globalThis.chrome
const tab = await api.tabs.query({ active: true, currentWindow: true })`}
        </Code>

        <p>
          Or use the small <code>webextension-polyfill</code> library, which
          makes <code>chrome.*</code> APIs return promises in every browser.
        </p>

        <h3>Things that vary</h3>
        <ul>
          <li>
            <strong>declarativeNetRequest</strong> rule limits differ
            between browsers.
          </li>
          <li>
            <strong>Service workers</strong> are V3 in Chrome/Edge; Firefox
            for V3 launched more recently and supports event pages too.
          </li>
          <li>
            <strong>Manifest V2</strong> still works in Firefox (for now);
            it does not in Chrome.
          </li>
          <li>
            <strong>Safari</strong> packages your extension as part of a
            tiny native macOS / iOS app. The build flow uses Xcode.
          </li>
          <li>
            <strong>Some APIs</strong> (chrome.identity, chrome.payments,
            certain enterprise APIs) are Chromium-only.
          </li>
        </ul>

        <Callout label="The pragmatic plan" tone="ok">
          <p>
            Build for Chrome / Manifest V3 first. Test in Firefox second
            (most things just work). Treat Safari as a separate, smaller
            release. You'll cover 95% of users with the first two.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'security',
    title: 'Security & privacy',
    heading: 'Extensions are powerful: be a good neighbour',
    lede: (
      <>
        Your extension can see what your users see and read what they
        type. That's a lot of trust. Honour it.
      </>
    ),
    content: (
      <>
        <h3>The big rules</h3>
        <ul>
          <li>
            <strong>Ask for the smallest permission set.</strong> Use{' '}
            <code>activeTab</code> instead of broad host permissions
            whenever possible.
          </li>
          <li>
            <strong>Validate inputs from the page.</strong> A page is
            adversarial. Don't trust message contents; sanitise before
            you do anything destructive.
          </li>
          <li>
            <strong>No remote code.</strong> V3 already forbids it, but
            the spirit is: ship your code in the package; never
            <code>eval()</code> something off the network.
          </li>
          <li>
            <strong>Use HTTPS for everything.</strong> Including your
            backends. Including your update URLs.
          </li>
          <li>
            <strong>Encrypt sensitive data at rest.</strong> If you
            absolutely must store a token, encrypt it with a key derived
            from the user's password or use the OS keystore via your
            backend.
          </li>
          <li>
            <strong>Make your privacy policy real.</strong> Stores
            require it. Users actually read it. Be specific.
          </li>
          <li>
            <strong>Sandbox third-party iframes.</strong> If you embed
            external content, isolate it.
          </li>
        </ul>

        <Callout label="Common review rejections" tone="warn">
          <p>
            Asking for <code>{'<all_urls>'}</code> for a feature that only
            runs on one site. Bundling unminified third-party code with
            unclear licenses. A privacy policy that says "we don't
            collect data" while the code clearly does. Fix these before
            submitting.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'best-practices',
    title: 'Best practices',
    heading: 'Things you wish you\'d known',
    lede: (
      <>
        A grab bag of habits that make extensions easier to maintain,
        easier to review, and friendlier to the user.
      </>
    ),
    content: (
      <>
        <h3>Code</h3>
        <ul>
          <li>Keep the popup small and fast. It opens and closes constantly.</li>
          <li>Defer heavy work to the service worker; the popup should only call APIs and render.</li>
          <li>Type your messages: a single discriminated union of message kinds saves hours.</li>
          <li>Wrap chrome.* calls if you build for multiple browsers. One tiny adapter, not a polyfill scattered everywhere.</li>
          <li>Log generously in dev, but ship quiet code. Ad-blocker reviewers will read your console.</li>
        </ul>

        <h3>UX</h3>
        <ul>
          <li>Default to "do nothing" until the user asks. No surprise overlays on first install.</li>
          <li>Show a friendly first-run page (open it from <code>onInstalled</code>) explaining what the user just installed.</li>
          <li>Make settings discoverable. Right-click on the icon → Options is a path many people forget.</li>
          <li>Respect the user's theme. <code>prefers-color-scheme</code> is your friend.</li>
          <li>Provide a "disable on this site" toggle for any extension that injects on every page.</li>
        </ul>

        <h3>Operations</h3>
        <ul>
          <li>Bump the version on every release. Stores reject duplicate versions.</li>
          <li>Keep a CHANGELOG. Both users and reviewers appreciate it.</li>
          <li>Test in incognito and split-incognito modes. Your extension may not have access there.</li>
          <li>Set up source maps that don't ship in production but help you debug crash reports.</li>
          <li>Have a contact email. People will email you when things break.</li>
        </ul>

        <Callout label="The quietest wins" tone="ok">
          <p>
            Update notes. Translation. Keyboard shortcuts. Accessible
            colours. None of these are flashy. All of them quietly raise
            your store rating.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'limits',
    title: 'Limits cheatsheet',
    heading: 'Numbers and caps to remember',
    content: (
      <>
        <Limits
          items={[
            { label: 'manifest_version', value: '3', meta: 'for new extensions' },
            { label: 'storage.local', value: '~10 MB', meta: 'unless unlimitedStorage permission' },
            { label: 'storage.sync', value: '~100 KB', meta: 'total; ~8 KB per key' },
            { label: 'Service worker idle', value: '~30 s', meta: 'before unload' },
            { label: 'Popup max size', value: '~800 × 600', meta: '' },
            { label: 'Action badge text', value: '~4 chars', meta: 'fits in the icon' },
            { label: 'Context menu items', value: '~no hard cap', meta: 'but be polite' },
            { label: 'declarativeNetRequest rules', value: '30,000', meta: 'static + dynamic combined' },
            { label: 'Locale folders', value: 'unlimited', meta: 'but each adds size' },
            { label: 'Package size', value: '500 MB', meta: 'Chrome Web Store hard limit' },
            { label: 'Icon sizes', value: '16 / 32 / 48 / 128', meta: 'recommended' },
            { label: 'CSP', value: 'strict in V3', meta: 'no inline scripts in HTML' },
          ]}
        />

        <Callout label="When you bump a wall" tone="note">
          <p>
            If storage feels small, move bigger blobs into{' '}
            <code>IndexedDB</code> from inside an offscreen document. Service
            workers can't open IndexedDB the same way pages can. The
            offscreen document is the workaround.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'closing',
    title: 'A short pep-talk',
    heading: 'You can absolutely build this',
    content: (
      <>
        <p>
          Extensions feel intimidating until you build the first one.
          After that, every new extension is mostly the same shape. A
          manifest, a few scripts, a couple of API calls. You'll forget
          syntax; you'll re-google permissions; you'll bump into limits.
          That's the same loop everyone else lives in.
        </p>
        <p>
          Now skip over to the <em>Build</em> tab and we'll make a real
          one together, end to end.
        </p>
      </>
    ),
  },
]
