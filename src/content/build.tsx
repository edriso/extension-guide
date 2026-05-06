import {
  Callout,
  Code,
  Example,
  Steps,
  Tags,
  Tree,
} from '../components/Blocks'
import type { Page } from '../types'

export const buildPages: Page[] = [
  {
    id: 'plan',
    title: 'What we will build',
    heading: 'A real, useful extension, end to end',
    lede: (
      <>
        We will build <strong>Word Counter</strong>, a small extension that
        counts words on the page you are reading and lets you save snippets.
        Tiny, but it touches every important part of the platform.
      </>
    ),
    content: (
      <>
        <h3>What it will do</h3>
        <ul>
          <li>Click the toolbar icon to count words on the current page.</li>
          <li>Highlight the selected text and store it as a saved snippet.</li>
          <li>Show all saved snippets in an options page.</li>
          <li>Run a daily reminder if you have unread snippets.</li>
          <li>Work in Chrome, Edge, and Firefox.</li>
        </ul>

        <h3>What it will use along the way</h3>
        <Tags items={['manifest v3', 'popup', 'content script', 'background worker', 'storage', 'context menu', 'alarms', 'options page']} />

        <Callout label="Follow along">
          <p>
            Make a folder somewhere named <code>word-counter</code>. Each
            page in this guide adds a new file or two. By the end you'll
            have a working extension you can install today.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'hello-world',
    title: 'Hello world',
    heading: 'The smallest extension that loads',
    lede: (
      <>
        Before any features, prove the loop works: write three files,
        load them into the browser, see the icon. Five minutes.
      </>
    ),
    content: (
      <>
        <h3>1. Create the manifest</h3>
        <Code lang="json" file="word-counter/manifest.json">
{`{
  "manifest_version": 3,
  "name": "Word Counter",
  "version": "0.1.0",
  "description": "Count words on the page and save snippets you love.",
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  },
  "action": {
    "default_title": "Count words",
    "default_popup": "popup/popup.html"
  }
}`}
        </Code>

        <h3>2. Create the popup</h3>
        <Code lang="html" file="word-counter/popup/popup.html">
{`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Word Counter</title>
    <link rel="stylesheet" href="popup.css" />
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>The extension loaded.</p>
    <script src="popup.js"></script>
  </body>
</html>`}
        </Code>

        <Code lang="js" file="word-counter/popup/popup.js">
{`console.log('Word Counter popup is alive.')`}
        </Code>

        <h3>3. Add icons</h3>
        <p>
          Drop any three PNGs in <code>icons/</code> at sizes 16, 48, and
          128 pixels. While you're prototyping, square doodles are fine.
        </p>

        <Tree>
{`word-counter/
├─ manifest.json
├─ icons/
│  ├─ icon-16.png
│  ├─ icon-48.png
│  └─ icon-128.png
└─ popup/
   ├─ popup.html
   └─ popup.js`}
        </Tree>

        <Callout label="Everything optional removed" tone="ok">
          <p>
            That's it. No build step, no dependencies. Open the next page
            to load it into Chrome.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'load',
    title: 'Loading it locally',
    heading: 'See your extension in the browser',
    lede: (
      <>
        Browsers let you load an unpacked extension in developer mode.
        This is your dev loop: edit, reload, retry.
      </>
    ),
    content: (
      <>
        <h3>Chrome and Edge</h3>
        <Steps>
          <li>
            Open <code>chrome://extensions</code> (or{' '}
            <code>edge://extensions</code>).
          </li>
          <li>
            Toggle <strong>Developer mode</strong> on (top right).
          </li>
          <li>
            Click <strong>Load unpacked</strong>, pick the{' '}
            <code>word-counter</code> folder.
          </li>
          <li>
            Pin the icon: click the puzzle-piece in the toolbar, then the
            pin next to your extension's name.
          </li>
          <li>
            Click your icon. The popup should say "Hello, world!".
          </li>
        </Steps>

        <h3>Firefox</h3>
        <Steps>
          <li>
            Open <code>about:debugging#/runtime/this-firefox</code>.
          </li>
          <li>
            Click <strong>Load Temporary Add-on</strong>.
          </li>
          <li>
            Pick <code>manifest.json</code> inside the folder.
          </li>
          <li>
            The icon appears in your toolbar. Click to test.
          </li>
        </Steps>

        <Callout label="The dev loop" tone="info">
          <p>
            After every code change, click the small <strong>reload</strong>{' '}
            icon on the extension card. A hard refresh of any tab the
            extension touched is sometimes needed too.
          </p>
        </Callout>

        <h3>The three places to look at logs</h3>
        <ul>
          <li>
            <strong>Popup logs</strong>: right-click the popup → <em>Inspect</em>.
          </li>
          <li>
            <strong>Background worker logs</strong>: on the extension card,
            click <em>service worker</em> (Chrome) or <em>Inspect</em> in
            Firefox.
          </li>
          <li>
            <strong>Content script logs</strong>: open the page's normal
            DevTools. They print to the page console.
          </li>
        </ul>
      </>
    ),
  },

  {
    id: 'popup-counter',
    title: 'A working popup',
    heading: 'Count words on the active page',
    lede: (
      <>
        Now make the popup actually do something. Click the icon, see a
        word count for the current tab.
      </>
    ),
    content: (
      <>
        <h3>1. Add the activeTab + scripting permissions</h3>
        <Code lang="json" file="manifest.json (replace)">
{`{
  "manifest_version": 3,
  "name": "Word Counter",
  "version": "0.2.0",
  "description": "Count words on the page and save snippets you love.",
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  },
  "action": {
    "default_title": "Count words",
    "default_popup": "popup/popup.html"
  },
  "permissions": ["activeTab", "scripting"]
}`}
        </Code>

        <p>
          <code>activeTab</code> grants temporary access to the tab the
          user just clicked your icon on. <code>scripting</code> lets us
          run a function inside that tab.
        </p>

        <h3>2. Update the popup HTML</h3>
        <Code lang="html" file="popup/popup.html">
{`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Word Counter</title>
    <link rel="stylesheet" href="popup.css" />
  </head>
  <body>
    <h1>Word Counter</h1>
    <p class="count" id="count">…</p>
    <p class="hint">Words on this page</p>
    <script src="popup.js"></script>
  </body>
</html>`}
        </Code>

        <Code lang="css" file="popup/popup.css">
{`body {
  width: 240px;
  margin: 0;
  padding: 18px 20px 22px;
  font: 14px/1.5 system-ui, sans-serif;
  color: #1a1a1a;
}
h1 { font-size: 14px; margin: 0 0 12px; letter-spacing: .04em; text-transform: uppercase; color: #888; }
.count { font: 600 36px/1 ui-serif, serif; margin: 0 0 4px; }
.hint  { color: #666; margin: 0; }`}
        </Code>

        <h3>3. The popup script</h3>
        <Code lang="js" file="popup/popup.js">
{`async function getActiveTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  })
  return tab
}

async function countWords(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      // runs inside the page
      const text = document.body.innerText || ''
      return text.trim().split(/\\s+/).filter(Boolean).length
    },
  })
  return result
}

;(async () => {
  const out = document.querySelector('#count')
  try {
    const tab = await getActiveTab()
    const n = await countWords(tab.id)
    out.textContent = n.toLocaleString()
  } catch (e) {
    out.textContent = '—'
    console.error(e)
  }
})()`}
        </Code>

        <Callout label="Why this works" tone="info">
          <p>
            The popup runs JS in the extension's own context.{' '}
            <code>chrome.scripting.executeScript</code> ships a function
            into the page, runs it there, and returns the result. The page
            itself never sees your code; you only see what the function
            returns.
          </p>
        </Callout>

        <Example>
          <p>
            Reload the extension and click the icon on a long article.
            You should see something like <strong>1,247</strong> appear
            instantly.
          </p>
        </Example>
      </>
    ),
  },

  {
    id: 'content-script',
    title: 'A content script',
    heading: 'Highlight selected text inside the page',
    lede: (
      <>
        Time to inject a script that lives in the page itself. We'll add
        a "save snippet" feature that highlights what the user selects.
      </>
    ),
    content: (
      <>
        <h3>1. Declare the content script</h3>
        <Code lang="json" file="manifest.json (add)">
{`"content_scripts": [
  {
    "matches": ["<all_urls>"],
    "js": ["content.js"],
    "css": ["content.css"],
    "run_at": "document_idle"
  }
]`}
        </Code>

        <Callout label="About all_urls" tone="warn">
          <p>
            <code>{'<all_urls>'}</code> is broad. For a real product you'd
            list the sites your feature actually needs. We use it here so
            the demo works everywhere.
          </p>
        </Callout>

        <h3>2. Write the content script</h3>
        <Code lang="js" file="content.js">
{`// Listens for messages from the popup and from the page itself.

function highlightSelection() {
  const sel = window.getSelection()
  if (!sel || sel.isCollapsed) return null
  const text = sel.toString().trim()
  if (!text) return null

  const range = sel.getRangeAt(0)
  const span = document.createElement('span')
  span.className = 'wc-highlight'
  span.textContent = text
  range.deleteContents()
  range.insertNode(span)
  sel.removeAllRanges()
  return text
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'WC_HIGHLIGHT') {
    const text = highlightSelection()
    sendResponse({ saved: text })
    return true
  }
})`}
        </Code>

        <Code lang="css" file="content.css">
{`.wc-highlight {
  background: linear-gradient(180deg, #fff7ae, #ffd54a);
  padding: 0 2px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06);
}`}
        </Code>

        <h3>3. Add a "save selection" button to the popup</h3>
        <Code lang="html" file="popup/popup.html (add inside body)">
{`<button id="save">Save selected text</button>
<p id="status" class="hint"></p>`}
        </Code>

        <Code lang="js" file="popup/popup.js (append)">
{`document.querySelector('#save').addEventListener('click', async () => {
  const tab = await getActiveTab()
  const reply = await chrome.tabs.sendMessage(tab.id, { type: 'WC_HIGHLIGHT' })
  const status = document.querySelector('#status')
  if (reply && reply.saved) {
    status.textContent = 'Saved: "' + reply.saved.slice(0, 40) + '"'
  } else {
    status.textContent = 'Select some text first.'
  }
})`}
        </Code>

        <Callout label="What we just did" tone="ok">
          <p>
            Three new things at once: a content script, a CSS injection,
            and message-passing between the popup and the page. This same
            pattern handles 80% of real extension features.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'storage',
    title: 'Saving with storage',
    heading: 'Remember snippets across sessions',
    lede: (
      <>
        Highlight is fun but pointless if it disappears on reload. Let's
        save snippets to <code>chrome.storage</code>.
      </>
    ),
    content: (
      <>
        <h3>1. Add the storage permission</h3>
        <Code lang="json" file="manifest.json (permissions)">
{`"permissions": ["activeTab", "scripting", "storage"]`}
        </Code>

        <h3>2. Save snippets when highlighted</h3>
        <p>
          We'll move the persistence to a small <code>db.js</code> module
          imported by everything that touches snippets.
        </p>

        <Code lang="js" file="db.js">
{`const KEY = 'snippets'

export async function getSnippets() {
  const { [KEY]: list = [] } = await chrome.storage.local.get(KEY)
  return list
}

export async function addSnippet(text, url) {
  const list = await getSnippets()
  list.unshift({
    id: crypto.randomUUID(),
    text: text.slice(0, 500),
    url,
    createdAt: Date.now(),
    read: false,
  })
  await chrome.storage.local.set({ [KEY]: list.slice(0, 200) })
}

export async function markRead(id) {
  const list = await getSnippets()
  const next = list.map(s => (s.id === id ? { ...s, read: true } : s))
  await chrome.storage.local.set({ [KEY]: next })
}

export async function unreadCount() {
  const list = await getSnippets()
  return list.filter(s => !s.read).length
}`}
        </Code>

        <Callout label="Modules in extensions" tone="note">
          <p>
            Use modules by setting <code>type: "module"</code> wherever
            you load JS that uses <code>import</code>. The service worker
            already supports modules; for popups, change the script tag
            to <code>{'<script type="module" src="popup.js"></script>'}</code>.
          </p>
        </Callout>

        <h3>3. Use it from the popup</h3>
        <Code lang="js" file="popup/popup.js (replace the save handler)">
{`import { addSnippet } from '../db.js'

document.querySelector('#save').addEventListener('click', async () => {
  const tab = await getActiveTab()
  const reply = await chrome.tabs.sendMessage(tab.id, { type: 'WC_HIGHLIGHT' })
  const status = document.querySelector('#status')
  if (reply && reply.saved) {
    await addSnippet(reply.saved, tab.url)
    status.textContent = 'Saved.'
  } else {
    status.textContent = 'Select some text first.'
  }
})`}
        </Code>

        <Example>
          <p>
            Reload, highlight something, click save. Open the dev tools on
            the popup and run{' '}
            <code>chrome.storage.local.get('snippets', console.log)</code>.
            Your snippet is there.
          </p>
        </Example>
      </>
    ),
  },

  {
    id: 'background',
    title: 'A background worker',
    heading: 'Move long-running stuff out of the popup',
    lede: (
      <>
        The popup closes the moment you click away. Put cross-extension
        logic in a service worker so the work survives.
      </>
    ),
    content: (
      <>
        <h3>1. Wire it up</h3>
        <Code lang="json" file="manifest.json (add)">
{`"background": {
  "service_worker": "background.js",
  "type": "module"
}`}
        </Code>

        <h3>2. Listen for events</h3>
        <Code lang="js" file="background.js">
{`import { unreadCount, getSnippets } from './db.js'

// runs when installed or updated
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === 'install') {
    chrome.tabs.create({ url: 'https://example.com/word-counter-welcome' })
  }
  await refreshBadge()
})

// keep the toolbar badge fresh
async function refreshBadge() {
  const n = await unreadCount()
  await chrome.action.setBadgeText({ text: n ? String(n) : '' })
  await chrome.action.setBadgeBackgroundColor({ color: '#f59e0b' })
}

// every time storage changes, update the badge
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.snippets) refreshBadge()
})

// expose a way for the popup to get the list
chrome.runtime.onMessage.addListener((msg, _sender, send) => {
  if (msg.type === 'GET_SNIPPETS') {
    getSnippets().then(send)
    return true
  }
})`}
        </Code>

        <Callout label="Why a worker, not the popup" tone="info">
          <p>
            The badge has to update even when the popup is closed. Same
            for any future syncing or notifications. Anything that should
            keep ticking after the user looks away belongs here.
          </p>
        </Callout>

        <h3>3. The dev loop reminder</h3>
        <p>
          Whenever you change <code>background.js</code>, click the
          extension's reload icon. Service workers don't auto-refresh.
          The DevTools window for the worker even closes after a reload,
          so you may need to re-open it.
        </p>
      </>
    ),
  },

  {
    id: 'context-menu',
    title: 'Context menu',
    heading: 'Right-click to save',
    lede: (
      <>
        Most users prefer right-click over opening a popup. Add a context
        menu item that saves whatever's selected, no popup at all.
      </>
    ),
    content: (
      <>
        <h3>1. Permission</h3>
        <Code lang="json" file="manifest.json (permissions)">
{`"permissions": ["activeTab", "scripting", "storage", "contextMenus"]`}
        </Code>

        <h3>2. Create the menu</h3>
        <Code lang="js" file="background.js (add)">
{`import { addSnippet } from './db.js'

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'wc-save',
    title: 'Save selection to Word Counter',
    contexts: ['selection'],
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'wc-save') return
  if (info.selectionText && tab) {
    await addSnippet(info.selectionText, tab.url)
  }
})`}
        </Code>

        <Callout label="Notice the API surface" tone="note">
          <p>
            <code>chrome.contextMenus</code> only registers items at install
            time. The {'onClicked'} listener fires every time someone uses
            it. Same model as alarms, notifications, and most extension
            APIs: declare once, react many times.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'alarms',
    title: 'Alarms & notifications',
    heading: 'Remind the user about unread snippets',
    lede: (
      <>
        Schedule a daily check. If the user has unread snippets, send a
        notification.
      </>
    ),
    content: (
      <>
        <h3>1. Permissions</h3>
        <Code lang="json" file="manifest.json">
{`"permissions": [
  "activeTab", "scripting", "storage",
  "contextMenus", "alarms", "notifications"
]`}
        </Code>

        <h3>2. Schedule and react</h3>
        <Code lang="js" file="background.js (add)">
{`chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('wc-daily', {
    delayInMinutes: 60 * 24, // first fire in 24 hours
    periodInMinutes: 60 * 24, // every 24 hours after that
  })
})

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== 'wc-daily') return
  const n = await unreadCount()
  if (n === 0) return
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon-128.png',
    title: 'Word Counter',
    message: \`You have \${n} unread snippet\${n === 1 ? '' : 's'}.\`,
    priority: 1,
  })
})`}
        </Code>

        <Callout label="Use alarms, not setTimeout" tone="warn">
          <p>
            <code>setTimeout</code> dies with the service worker.{' '}
            <code>chrome.alarms</code> survives sleep and wakes the worker
            up to fire. Anything longer than ~30 seconds belongs here.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'options-page',
    title: 'An options page',
    heading: 'Browse all your saved snippets',
    lede: (
      <>
        A full-tab page with the list, with a button to mark each as
        read. This is the kind of page where many extensions actually
        live. Popups are tiny.
      </>
    ),
    content: (
      <>
        <h3>1. Wire it up</h3>
        <Code lang="json" file="manifest.json (add)">
{`"options_ui": {
  "page": "options/options.html",
  "open_in_tab": true
}`}
        </Code>

        <h3>2. Build the page</h3>
        <Code lang="html" file="options/options.html">
{`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Word Counter — Snippets</title>
    <link rel="stylesheet" href="options.css" />
  </head>
  <body>
    <header>
      <h1>Saved snippets</h1>
      <p id="count" class="muted"></p>
    </header>
    <ul id="list"></ul>
    <script type="module" src="options.js"></script>
  </body>
</html>`}
        </Code>

        <Code lang="css" file="options/options.css">
{`body { font: 16px/1.6 system-ui, sans-serif; max-width: 640px; margin: 4rem auto; padding: 0 1.2rem; color: #1a1a1a; }
header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 1.4rem; }
h1 { font: 600 1.6rem/1.2 ui-serif, serif; margin: 0; }
.muted { color: #777; }
ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.6rem; }
li { padding: .85rem 1rem; border: 1px solid #eee; border-radius: 12px; }
li.read { opacity: .55; }
li button { float: right; margin-left: 1rem; }
li time { display: block; color: #999; font-size: .8rem; margin-top: .2rem; }`}
        </Code>

        <Code lang="js" file="options/options.js">
{`import { getSnippets, markRead } from '../db.js'

function render(list) {
  const ul = document.querySelector('#list')
  document.querySelector('#count').textContent =
    list.length + (list.length === 1 ? ' snippet' : ' snippets')
  ul.innerHTML = ''
  for (const s of list) {
    const li = document.createElement('li')
    li.className = s.read ? 'read' : ''
    li.innerHTML = \`
      <button data-id="\${s.id}">Mark read</button>
      <span></span>
      <time></time>
    \`
    li.querySelector('span').textContent = s.text
    li.querySelector('time').textContent = new Date(s.createdAt).toLocaleString()
    li.querySelector('button').addEventListener('click', async (e) => {
      await markRead(e.currentTarget.dataset.id)
    })
    ul.append(li)
  }
}

// initial paint + re-paint on changes
;(async () => render(await getSnippets()))()
chrome.storage.onChanged.addListener(async (_c, area) => {
  if (area === 'local') render(await getSnippets())
})`}
        </Code>

        <Callout label="Live updates" tone="ok">
          <p>
            Notice we re-render on <code>storage.onChanged</code>. Open the
            options page in one tab, save a snippet from another tab, and
            the list updates without a refresh. That's a small detail
            users feel.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'cross-browser',
    title: 'Cross-browser polish',
    heading: 'Make it work in Firefox and Safari',
    lede: (
      <>
        Most code already works. A couple of small tweaks make the
        experience smooth across browsers.
      </>
    ),
    content: (
      <>
        <h3>1. Use a tiny API shim</h3>
        <Code lang="js" file="api.js">
{`// One liner that works in Chrome, Edge, Firefox, Safari.
export const api = globalThis.browser ?? globalThis.chrome`}
        </Code>

        <p>
          Replace <code>chrome.</code> with <code>api.</code> wherever you
          want to be portable. Firefox already aliases <code>chrome</code>{' '}
          for compatibility, so this is mostly future-proofing.
        </p>

        <h3>2. Firefox-specific manifest field</h3>
        <p>
          Firefox needs a <code>browser_specific_settings</code> block
          with an extension ID before you can sign and publish on AMO.
        </p>
        <Code lang="json" file="manifest.json (add)">
{`"browser_specific_settings": {
  "gecko": {
    "id": "word-counter@yourname.dev",
    "strict_min_version": "115.0"
  }
}`}
        </Code>

        <h3>3. Test the unloaded path</h3>
        <p>
          Restart the browser and click your icon before any tab loads.
          Make sure the popup still works on a blank new-tab page (it
          shouldn't crash).
        </p>

        <Callout label="Safari" tone="note">
          <p>
            Safari packages your extension as part of a tiny native macOS
            / iOS app. Use Apple's <code>safari-web-extension-converter</code>{' '}
            tool, then sign the app in Xcode. It's a different release
            track. Treat it as v2.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'package',
    title: 'Packaging',
    heading: 'Turn the folder into a publishable file',
    lede: (
      <>
        For the store, you need a single <code>.zip</code>. The contents
        are exactly what you've been editing.
      </>
    ),
    content: (
      <>
        <h3>1. Bump the version</h3>
        <p>
          Each upload needs a higher <code>version</code> in the manifest
          than the last. Use semantic versioning if it helps:{' '}
          <code>0.1.0</code>, <code>0.2.0</code>, <code>1.0.0</code>.
        </p>

        <h3>2. Build a clean zip</h3>
        <Code lang="bash" file="terminal">
{`# from inside the project root
cd word-counter
zip -r ../word-counter-1.0.0.zip . -x "*.DS_Store" "*.map"`}
        </Code>

        <Callout label="What goes in" tone="warn">
          <p>
            Only ship what the extension needs at runtime. Source maps,
            test files, README, screenshots. All stay out. A small zip
            loads faster on the user's first install and reviews quicker.
          </p>
        </Callout>

        <h3>3. If you have a build step</h3>
        <p>
          When you use TypeScript, React, or a bundler, your build step
          produces a <code>dist/</code> folder that contains the same
          shape: manifest at the root, JS files, icons. Zip{' '}
          <code>dist/</code>, not the source.
        </p>

        <Code lang="json" file="package.json (helpful scripts)">
{`{
  "scripts": {
    "build": "vite build",
    "package": "cd dist && zip -r ../word-counter.zip . && cd .."
  }
}`}
        </Code>
      </>
    ),
  },

  {
    id: 'publish-chrome',
    title: 'Publish to Chrome Web Store',
    heading: 'The store submission flow',
    lede: (
      <>
        It's a paid one-time fee, a developer dashboard, and usually a
        few days of review. Here's the path.
      </>
    ),
    content: (
      <>
        <Steps>
          <li>
            Pay the <strong>$5 one-time</strong> developer registration fee
            at <code>chrome.google.com/webstore/devconsole</code>.
          </li>
          <li>
            Click <strong>New item</strong>, upload your{' '}
            <code>.zip</code>.
          </li>
          <li>
            Fill in: title, summary, full description, category, language,
            and at least one screenshot (1280×800 or 640×400).
          </li>
          <li>
            Add a <strong>privacy policy URL</strong>: even if you collect
            nothing, you need one. Be specific.
          </li>
          <li>
            For each permission, write a short <em>justification</em>{' '}
            explaining why your extension needs it.
          </li>
          <li>
            Decide visibility: <em>Public</em>, <em>Unlisted</em>, or{' '}
            <em>Private</em> (limited to specific accounts or domains).
          </li>
          <li>
            Submit. First review usually takes a few business days. Future
            updates are often faster.
          </li>
        </Steps>

        <Callout label="Common rejections" tone="warn">
          <p>
            Asking for broader permissions than you justify; missing
            privacy policy; "single purpose" violations (one extension
            doing too many unrelated things). Fix and resubmit. Most
            rejections are resolved on the second try.
          </p>
        </Callout>

        <h3>After it's live</h3>
        <ul>
          <li>Watch <strong>support emails</strong>: reply within a day or two.</li>
          <li>Watch the <strong>analytics tab</strong>: installs, uninstalls, ratings.</li>
          <li>Each update goes through review again, but smaller updates are usually quick.</li>
        </ul>
      </>
    ),
  },

  {
    id: 'publish-firefox',
    title: 'Publish to Firefox AMO',
    heading: 'A free, friendly review path',
    lede: (
      <>
        Mozilla's add-on store is free to submit to and is generally
        faster and stricter on technical details.
      </>
    ),
    content: (
      <>
        <Steps>
          <li>
            Sign in at <code>addons.mozilla.org/developers/</code>.
          </li>
          <li>
            Click <strong>Submit a new add-on</strong>, choose{' '}
            <em>On this site</em> (listed in AMO).
          </li>
          <li>
            Upload your zip. AMO will validate the manifest and warn about
            issues like missing IDs or unsigned-code use.
          </li>
          <li>
            Pick listed/unlisted, write a description, add screenshots,
            and submit.
          </li>
          <li>
            Reviewers may ask you to upload your <strong>source code</strong>{' '}
            if you bundled or minified anything. They build your extension
            from source and compare to what you uploaded. Keep your build
            reproducible.
          </li>
        </Steps>

        <Callout label="Source review" tone="info">
          <p>
            AMO's source-code review is one of the strongest checks you'll
            get. If your build is messy, this is where you'll feel it.
            Lock dependencies, document <code>npm run build</code>, and
            ship matching <code>dist/</code> + <code>src/</code>.
          </p>
        </Callout>
      </>
    ),
  },

  {
    id: 'updates',
    title: 'Shipping updates',
    heading: 'How updates flow to users',
    lede: (
      <>
        Once you're live, updates are a normal part of life. The flow is
        gentler than first publishing.
      </>
    ),
    content: (
      <>
        <h3>The cycle</h3>
        <Steps>
          <li>Make changes locally. Reload-test in dev mode.</li>
          <li>Bump the version in <code>manifest.json</code>.</li>
          <li>Build a fresh zip.</li>
          <li>Upload it as a new package in the developer dashboard.</li>
          <li>Wait for review.</li>
          <li>Once approved, browsers auto-update users within hours.</li>
        </Steps>

        <h3>Communicate</h3>
        <ul>
          <li>Write a 1–2 line "what's new" in the store entry.</li>
          <li>For visible UI changes, show a small note inside the popup the first time after update.</li>
          <li>Keep a CHANGELOG file in your repo for users who care about the details.</li>
        </ul>

        <Callout label="If something breaks in production" tone="warn">
          <p>
            Roll forward, don't try to roll back. Ship a fix as a new
            version. Stores don't really support deleting a version.
          </p>
        </Callout>

        <h3>One last bit of advice</h3>
        <p>
          Reply to bad reviews politely. Many one-star reviews come from
          confused users. A friendly reply often turns the rating into
          five stars and earns you a forever fan.
        </p>
      </>
    ),
  },

  {
    id: 'ideas',
    title: 'Where to go next',
    heading: 'Real-world ideas using everything we covered',
    content: (
      <>
        <p>
          You now know enough to build almost any small extension. A few
          starting points if you want practice:
        </p>

        <ul>
          <li>
            <strong>Read-it-later button</strong>: save selected text or
            the whole article, list with tags and a search. (popup +
            content script + storage + options).
          </li>
          <li>
            <strong>Site-specific helper</strong>: a button that fills out
            a recurring form on a specific site. (host_permissions on one
            domain + content script).
          </li>
          <li>
            <strong>Tab cleaner</strong>: button that closes duplicate
            tabs or groups by domain. (chrome.tabs + chrome.tabGroups).
          </li>
          <li>
            <strong>Daily quote</strong>: replace the new-tab page with a
            calm quote. (chrome_url_overrides.newtab → your HTML).
          </li>
          <li>
            <strong>Translate selection</strong>: right-click → translate.
            (contextMenus + offscreen document for HTML parsing if
            needed).
          </li>
          <li>
            <strong>Pocket-sized GPT</strong>: ask a model from a side
            panel about the current selection. (sidePanel + identity for
            OAuth + your model's API).
          </li>
        </ul>

        <Callout label="The shape stays the same" tone="ok">
          <p>
            Every one of those is the same skeleton you just built:
            manifest, popup or side panel, optional content script,
            storage, maybe a worker. New API names, same dance.
          </p>
        </Callout>

        <p>
          Ship the smallest version of your idea you can stand. Submit
          it. Watch how a real user uses it. Iterate. That's the loop.
        </p>
      </>
    ),
  },
]
