var manifest = {
	"/*404": [
	{
		type: "script",
		href: "/assets/_...404_.5d14142b.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.393f2830.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.d870915a.css"
	}
],
	"/about": [
	{
		type: "script",
		href: "/assets/about.b0d097b0.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.393f2830.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.d870915a.css"
	}
],
	"/dashboard": [
	{
		type: "script",
		href: "/assets/dashboard.78fd7aa5.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.393f2830.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.d870915a.css"
	},
	{
		type: "script",
		href: "/assets/userStore.b83f8ccc.js"
	}
],
	"/": [
	{
		type: "script",
		href: "/assets/index.b727e4be.js"
	},
	{
		type: "script",
		href: "/assets/entry-client.393f2830.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.d870915a.css"
	},
	{
		type: "script",
		href: "/assets/userStore.b83f8ccc.js"
	}
],
	"entry-client": [
	{
		type: "script",
		href: "/assets/entry-client.393f2830.js"
	},
	{
		type: "style",
		href: "/assets/entry-client.d870915a.css"
	}
],
	"index.html": [
]
};

const ERROR = Symbol("error");
const BRANCH = Symbol("branch");
function castError(err) {
  if (err instanceof Error || typeof err === "string") return err;
  return new Error("Unknown error");
}
function handleError(err) {
  err = castError(err);
  const fns = lookup(Owner, ERROR);
  if (!fns) throw err;
  for (const f of fns) f(err);
}
const UNOWNED = {
  context: null,
  owner: null
};
let Owner = null;
function createRoot(fn, detachedOwner) {
  detachedOwner && (Owner = detachedOwner);
  const owner = Owner,
    root = fn.length === 0 ? UNOWNED : {
      context: null,
      owner
    };
  Owner = root;
  let result;
  try {
    result = fn(() => {});
  } catch (err) {
    handleError(err);
  } finally {
    Owner = owner;
  }
  return result;
}
function createSignal(value, options) {
  return [() => value, v => {
    return value = typeof v === "function" ? v(value) : v;
  }];
}
function createComputed(fn, value) {
  Owner = {
    owner: Owner,
    context: null
  };
  try {
    fn(value);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
}
const createRenderEffect = createComputed;
function createMemo(fn, value) {
  Owner = {
    owner: Owner,
    context: null
  };
  let v;
  try {
    v = fn(value);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
  return () => v;
}
function batch(fn) {
  return fn();
}
const untrack = batch;
function on(deps, fn, options = {}) {
  const isArray = Array.isArray(deps);
  const defer = options.defer;
  return () => {
    if (defer) return undefined;
    let value;
    if (isArray) {
      value = [];
      for (let i = 0; i < deps.length; i++) value.push(deps[i]());
    } else value = deps();
    return fn(value);
  };
}
function onCleanup(fn) {
  let node;
  if (Owner && (node = lookup(Owner, BRANCH))) {
    if (!node.cleanups) node.cleanups = [fn];else node.cleanups.push(fn);
  }
  return fn;
}
function cleanNode(node) {
  if (node.cleanups) {
    for (let i = 0; i < node.cleanups.length; i++) node.cleanups[i]();
    node.cleanups = undefined;
  }
}
function onError(fn) {
  if (Owner) {
    if (Owner.context === null) Owner.context = {
      [ERROR]: [fn]
    };else if (!Owner.context[ERROR]) Owner.context[ERROR] = [fn];else Owner.context[ERROR].push(fn);
  }
}
function createContext(defaultValue) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext(context) {
  let ctx;
  return (ctx = lookup(Owner, context.id)) !== undefined ? ctx : context.defaultValue;
}
function getOwner() {
  return Owner;
}
function children(fn) {
  const memo = createMemo(() => resolveChildren(fn()));
  memo.toArray = () => {
    const c = memo();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo;
}
function runWithOwner(o, fn) {
  const prev = Owner;
  Owner = o;
  try {
    return fn();
  } catch (err) {
    handleError(err);
  } finally {
    Owner = prev;
  }
}
function lookup(owner, key) {
  return owner ? owner.context && owner.context[key] !== undefined ? owner.context[key] : lookup(owner.owner, key) : undefined;
}
function resolveChildren(children) {
  if (typeof children === "function" && !children.length) return resolveChildren(children());
  if (Array.isArray(children)) {
    const results = [];
    for (let i = 0; i < children.length; i++) {
      const result = resolveChildren(children[i]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children;
}
function createProvider(id) {
  return function provider(props) {
    return createMemo(() => {
      Owner.context = {
        [id]: props.value
      };
      return children(() => props.children);
    });
  };
}

function resolveSSRNode$1(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode$1(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode$1(node());
  return String(node);
}
const sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? {
    ...sharedConfig.context,
    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
    count: 0
  } : undefined;
}
function createUniqueId() {
  const ctx = sharedConfig.context;
  if (!ctx) throw new Error(`createUniqueId cannot be used under non-hydrating context`);
  return `${ctx.id}${ctx.count++}`;
}
function createComponent(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}
function mergeProps(...sources) {
  const target = {};
  for (let i = 0; i < sources.length; i++) {
    let source = sources[i];
    if (typeof source === "function") source = source();
    if (source) {
      const descriptors = Object.getOwnPropertyDescriptors(source);
      for (const key in descriptors) {
        if (key in target) continue;
        Object.defineProperty(target, key, {
          enumerable: true,
          get() {
            for (let i = sources.length - 1; i >= 0; i--) {
              let s = sources[i] || {};
              if (typeof s === "function") s = s();
              const v = s[key];
              if (v !== undefined) return v;
            }
          }
        });
      }
    }
  }
  return target;
}
function splitProps(props, ...keys) {
  const descriptors = Object.getOwnPropertyDescriptors(props),
    split = k => {
      const clone = {};
      for (let i = 0; i < k.length; i++) {
        const key = k[i];
        if (descriptors[key]) {
          Object.defineProperty(clone, key, descriptors[key]);
          delete descriptors[key];
        }
      }
      return clone;
    };
  return keys.map(split).concat(split(Object.keys(descriptors)));
}
function Show(props) {
  let c;
  return props.when ? typeof (c = props.children) === "function" ? c(props.when) : c : props.fallback || "";
}
function ErrorBoundary$1(props) {
  let error,
    res,
    clean,
    sync = true;
  const ctx = sharedConfig.context;
  const id = ctx.id + ctx.count;
  function displayFallback() {
    cleanNode(clean);
    ctx.writeResource(id, error, true);
    setHydrateContext({
      ...ctx,
      count: 0
    });
    const f = props.fallback;
    return typeof f === "function" && f.length ? f(error, () => {}) : f;
  }
  onError(err => {
    error = err;
    !sync && ctx.replace("e" + id, displayFallback);
    sync = true;
  });
  onCleanup(() => cleanNode(clean));
  createMemo(() => {
    Owner.context = {
      [BRANCH]: clean = {}
    };
    return res = props.children;
  });
  if (error) return displayFallback();
  sync = false;
  return {
    t: `<!e${id}>${resolveSSRNode$1(res)}<!/e${id}>`
  };
}
const SuspenseContext = createContext();
function suspenseComplete(c) {
  for (const r of c.resources.values()) {
    if (r.loading) return false;
  }
  return true;
}
function startTransition(fn) {
  fn();
}
function Suspense(props) {
  let done;
  let clean;
  const ctx = sharedConfig.context;
  const id = ctx.id + ctx.count;
  const o = Owner;
  if (o) {
    if (o.context) o.context[BRANCH] = clean = {};else o.context = {
      [BRANCH]: clean = {}
    };
  }
  const value = ctx.suspense[id] || (ctx.suspense[id] = {
    resources: new Map(),
    completed: () => {
      const res = runSuspense();
      if (suspenseComplete(value)) {
        done(resolveSSRNode$1(res));
      }
    }
  });
  function runSuspense() {
    setHydrateContext({
      ...ctx,
      count: 0
    });
    return runWithOwner(o, () => {
      return createComponent(SuspenseContext.Provider, {
        value,
        get children() {
          clean && cleanNode(clean);
          return props.children;
        }
      });
    });
  }
  const res = runSuspense();
  if (suspenseComplete(value)) return res;
  onError(err => {
    if (!done || !done(undefined, err)) {
      if (o) runWithOwner(o.owner, () => {
        throw err;
      });else throw err;
    }
  });
  done = ctx.async ? ctx.registerFragment(id) : undefined;
  if (ctx.async) {
    setHydrateContext({
      ...ctx,
      count: 0,
      id: ctx.id + "0.f",
      noHydrate: true
    });
    const res = {
      t: `<template id="pl-${id}"></template>${resolveSSRNode$1(props.fallback)}<!pl-${id}>`
    };
    setHydrateContext(ctx);
    return res;
  }
  setHydrateContext({
    ...ctx,
    count: 0,
    id: ctx.id + "0.f"
  });
  ctx.writeResource(id, "$$f");
  return props.fallback;
}

const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
const BooleanAttributes = /*#__PURE__*/new Set(booleans);
/*#__PURE__*/new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);
const ChildProperties = /*#__PURE__*/new Set(["innerHTML", "textContent", "innerText", "children"]);
const Aliases = /*#__PURE__*/Object.assign(Object.create(null), {
  className: "class",
  htmlFor: "for"
});

const {
  hasOwnProperty
} = Object.prototype;
const REF_START_CHARS = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
const REF_START_CHARS_LEN = REF_START_CHARS.length;
const REF_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
const REF_CHARS_LEN = REF_CHARS.length;
const STACK = [];
const BUFFER = [""];
let ASSIGNMENTS = new Map();
let INDEX_OR_REF = new WeakMap();
let REF_COUNT = 0;
BUFFER.pop();
function stringify(root) {
  if (writeProp(root, "")) {
    let result = BUFFER[0];
    for (let i = 1, len = BUFFER.length; i < len; i++) {
      result += BUFFER[i];
    }
    if (REF_COUNT) {
      if (ASSIGNMENTS.size) {
        let ref = INDEX_OR_REF.get(root);
        if (typeof ref === "number") {
          ref = toRefParam(REF_COUNT++);
          result = ref + "=" + result;
        }
        for (const [assignmentRef, assignments] of ASSIGNMENTS) {
          result += ";" + assignments + assignmentRef;
        }
        result += ";return " + ref;
        ASSIGNMENTS = new Map();
      } else {
        result = "return " + result;
      }
      result = "(function(" + refParamsString() + "){" + result + "}())";
    } else if (root && root.constructor === Object) {
      result = "(" + result + ")";
    }
    BUFFER.length = 0;
    INDEX_OR_REF = new WeakMap();
    return result;
  }
  return "void 0";
}
function writeProp(cur, accessor) {
  switch (typeof cur) {
    case "string":
      BUFFER.push(quote(cur, 0));
      break;
    case "number":
      BUFFER.push(cur + "");
      break;
    case "boolean":
      BUFFER.push(cur ? "!0" : "!1");
      break;
    case "object":
      if (cur === null) {
        BUFFER.push("null");
      } else {
        const ref = getRef(cur, accessor);
        switch (ref) {
          case true:
            return false;
          case false:
            switch (cur.constructor) {
              case Object:
                writeObject(cur);
                break;
              case Array:
                writeArray(cur);
                break;
              case Date:
                BUFFER.push('new Date("' + cur.toISOString() + '")');
                break;
              case RegExp:
                BUFFER.push(cur + "");
                break;
              case Map:
                BUFFER.push("new Map(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case Set:
                BUFFER.push("new Set(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case undefined:
                BUFFER.push("Object.assign(Object.create(null),");
                writeObject(cur);
                BUFFER.push(")");
                break;
              default:
                return false;
            }
            break;
          default:
            BUFFER.push(ref);
            break;
        }
      }
      break;
    default:
      return false;
  }
  return true;
}
function writeObject(obj) {
  let sep = "{";
  STACK.push(obj);
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      const escapedKey = toObjectKey(key);
      BUFFER.push(sep + escapedKey + ":");
      if (writeProp(val, escapedKey)) {
        sep = ",";
      } else {
        BUFFER.pop();
      }
    }
  }
  if (sep === "{") {
    BUFFER.push("{}");
  } else {
    BUFFER.push("}");
  }
  STACK.pop();
}
function writeArray(arr) {
  BUFFER.push("[");
  STACK.push(arr);
  writeProp(arr[0], 0);
  for (let i = 1, len = arr.length; i < len; i++) {
    BUFFER.push(",");
    writeProp(arr[i], i);
  }
  STACK.pop();
  BUFFER.push("]");
}
function getRef(cur, accessor) {
  let ref = INDEX_OR_REF.get(cur);
  if (ref === undefined) {
    INDEX_OR_REF.set(cur, BUFFER.length);
    return false;
  }
  if (typeof ref === "number") {
    ref = insertAndGetRef(cur, ref);
  }
  if (STACK.includes(cur)) {
    const parent = STACK[STACK.length - 1];
    let parentRef = INDEX_OR_REF.get(parent);
    if (typeof parentRef === "number") {
      parentRef = insertAndGetRef(parent, parentRef);
    }
    ASSIGNMENTS.set(ref, (ASSIGNMENTS.get(ref) || "") + toAssignment(parentRef, accessor) + "=");
    return true;
  }
  return ref;
}
function toObjectKey(name) {
  const invalidIdentifierPos = getInvalidIdentifierPos(name);
  return invalidIdentifierPos === -1 ? name : quote(name, invalidIdentifierPos);
}
function toAssignment(parent, key) {
  return parent + (typeof key === "number" || key[0] === '"' ? "[" + key + "]" : "." + key);
}
function getInvalidIdentifierPos(name) {
  let char = name[0];
  if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char === "$" || char === "_")) {
    return 0;
  }
  for (let i = 1, len = name.length; i < len; i++) {
    char = name[i];
    if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9" || char === "$" || char === "_")) {
      return i;
    }
  }
  return -1;
}
function quote(str, startPos) {
  let result = "";
  let lastPos = 0;
  for (let i = startPos, len = str.length; i < len; i++) {
    let replacement;
    switch (str[i]) {
      case '"':
        replacement = '\\"';
        break;
      case "\\":
        replacement = "\\\\";
        break;
      case "<":
        replacement = "\\x3C";
        break;
      case "\n":
        replacement = "\\n";
        break;
      case "\r":
        replacement = "\\r";
        break;
      case "\u2028":
        replacement = "\\u2028";
        break;
      case "\u2029":
        replacement = "\\u2029";
        break;
      default:
        continue;
    }
    result += str.slice(lastPos, i) + replacement;
    lastPos = i + 1;
  }
  if (lastPos === startPos) {
    result = str;
  } else {
    result += str.slice(lastPos);
  }
  return '"' + result + '"';
}
function insertAndGetRef(obj, pos) {
  const ref = toRefParam(REF_COUNT++);
  INDEX_OR_REF.set(obj, ref);
  if (pos) {
    BUFFER[pos - 1] += ref + "=";
  } else {
    BUFFER[pos] = ref + "=" + BUFFER[pos];
  }
  return ref;
}
function refParamsString() {
  let result = REF_START_CHARS[0];
  for (let i = 1; i < REF_COUNT; i++) {
    result += "," + toRefParam(i);
  }
  REF_COUNT = 0;
  return result;
}
function toRefParam(index) {
  let mod = index % REF_START_CHARS_LEN;
  let ref = REF_START_CHARS[mod];
  index = (index - mod) / REF_START_CHARS_LEN;
  while (index > 0) {
    mod = index % REF_CHARS_LEN;
    ref += REF_CHARS[mod];
    index = (index - mod) / REF_CHARS_LEN;
  }
  return ref;
}

const REPLACE_SCRIPT = `function $df(e,t,n,o,d){if(n=document.getElementById(e),o=document.getElementById("pl-"+e)){for(;o&&8!==o.nodeType&&o.nodeValue!=="pl-"+e;)d=o.nextSibling,o.remove(),o=d;o.replaceWith(n.content)}n.remove(),_$HY.set(e,t),_$HY.fe(e)}`;
function renderToStringAsync(code, options = {}) {
  const {
    timeoutMs = 30000
  } = options;
  let timeoutHandle;
  const timeout = new Promise((_, reject) => {
    timeoutHandle = setTimeout(() => reject("renderToString timed out"), timeoutMs);
  });
  return Promise.race([renderToStream(code, options), timeout]).then(html => {
    clearTimeout(timeoutHandle);
    return html;
  });
}
function renderToStream(code, options = {}) {
  let {
    nonce,
    onCompleteShell,
    onCompleteAll,
    renderId
  } = options;
  const blockingResources = [];
  const registry = new Map();
  const dedupe = new WeakMap();
  const checkEnd = () => {
    if (!registry.size && !completed) {
      writeTasks();
      onCompleteAll && onCompleteAll({
        write(v) {
          !completed && buffer.write(v);
        }
      });
      writable && writable.end();
      completed = true;
    }
  };
  const pushTask = task => {
    tasks += task + ";";
    if (!scheduled && firstFlushed) {
      Promise.resolve().then(writeTasks);
      scheduled = true;
    }
  };
  const writeTasks = () => {
    if (tasks.length && !completed && firstFlushed) {
      buffer.write(`<script${nonce ? ` nonce="${nonce}"` : ""}>${tasks}</script>`);
      tasks = "";
    }
    scheduled = false;
  };
  let context;
  let writable;
  let tmp = "";
  let tasks = "";
  let firstFlushed = false;
  let completed = false;
  let scriptFlushed = false;
  let scheduled = true;
  let buffer = {
    write(payload) {
      tmp += payload;
    }
  };
  sharedConfig.context = context = {
    id: renderId || "",
    count: 0,
    async: true,
    resources: {},
    lazy: {},
    suspense: {},
    assets: [],
    nonce,
    block(p) {
      if (!firstFlushed) blockingResources.push(p);
    },
    replace(id, payloadFn) {
      if (firstFlushed) return;
      const placeholder = `<!${id}>`;
      const first = html.indexOf(placeholder);
      if (first === -1) return;
      const last = html.indexOf(`<!/${id}>`, first + placeholder.length);
      html = html.replace(html.slice(first, last + placeholder.length + 1), resolveSSRNode(payloadFn()));
    },
    writeResource(id, p, error, wait) {
      const serverOnly = sharedConfig.context.noHydrate;
      if (error) return !serverOnly && pushTask(serializeSet(dedupe, id, p, serializeError));
      if (!p || typeof p !== "object" || !("then" in p)) return !serverOnly && pushTask(serializeSet(dedupe, id, p));
      if (!firstFlushed) wait && blockingResources.push(p);else !serverOnly && pushTask(`_$HY.init("${id}")`);
      if (serverOnly) return;
      p.then(d => {
        !completed && pushTask(serializeSet(dedupe, id, d));
      }).catch(() => {
        !completed && pushTask(`_$HY.set("${id}", {})`);
      });
    },
    registerFragment(key) {
      if (!registry.has(key)) {
        registry.set(key, []);
        firstFlushed && pushTask(`_$HY.init("${key}")`);
      }
      return (value, error) => {
        if (registry.has(key)) {
          const keys = registry.get(key);
          registry.delete(key);
          if (waitForFragments(registry, key)) return;
          if ((value !== undefined || error) && !completed) {
            if (!firstFlushed) {
              Promise.resolve().then(() => html = replacePlaceholder(html, key, value !== undefined ? value : ""));
              error && pushTask(serializeSet(dedupe, key, error, serializeError));
            } else {
              buffer.write(`<template id="${key}">${value !== undefined ? value : " "}</template>`);
              pushTask(`${keys.length ? keys.map(k => `_$HY.unset("${k}")`).join(";") + ";" : ""}$df("${key}"${error ? "," + serializeError(error) : ""})${!scriptFlushed ? ";" + REPLACE_SCRIPT : ""}`);
              scriptFlushed = true;
            }
          }
        }
        if (!registry.size) Promise.resolve().then(checkEnd);
        return firstFlushed;
      };
    }
  };
  let html = resolveSSRNode(escape(code()));
  function doShell() {
    sharedConfig.context = context;
    context.noHydrate = true;
    html = injectAssets(context.assets, html);
    for (const key in context.resources) {
      if (!("data" in context.resources[key] || context.resources[key].ref[0].error)) pushTask(`_$HY.init("${key}")`);
    }
    for (const key of registry.keys()) pushTask(`_$HY.init("${key}")`);
    if (tasks.length) html = injectScripts(html, tasks, nonce);
    buffer.write(html);
    tasks = "";
    scheduled = false;
    onCompleteShell && onCompleteShell({
      write(v) {
        !completed && buffer.write(v);
      }
    });
  }
  return {
    then(fn) {
      function complete() {
        doShell();
        fn(tmp);
      }
      if (onCompleteAll) {
        ogComplete = onCompleteAll;
        onCompleteAll = options => {
          ogComplete(options);
          complete();
        };
      } else onCompleteAll = complete;
      if (!registry.size) Promise.resolve().then(checkEnd);
    },
    pipe(w) {
      Promise.allSettled(blockingResources).then(() => {
        doShell();
        buffer = writable = w;
        buffer.write(tmp);
        firstFlushed = true;
        if (completed) writable.end();else setTimeout(checkEnd);
      });
    },
    pipeTo(w) {
      Promise.allSettled(blockingResources).then(() => {
        doShell();
        const encoder = new TextEncoder();
        const writer = w.getWriter();
        writable = {
          end() {
            writer.releaseLock();
            w.close();
          }
        };
        buffer = {
          write(payload) {
            writer.write(encoder.encode(payload));
          }
        };
        buffer.write(tmp);
        firstFlushed = true;
        if (completed) writable.end();else setTimeout(checkEnd);
      });
    }
  };
}
function HydrationScript(props) {
  const {
    nonce
  } = sharedConfig.context;
  return ssr(generateHydrationScript({
    nonce,
    ...props
  }));
}
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function ssrClassList(value) {
  if (!value) return "";
  let classKeys = Object.keys(value),
    result = "";
  for (let i = 0, len = classKeys.length; i < len; i++) {
    const key = classKeys[i],
      classValue = !!value[key];
    if (!key || key === "undefined" || !classValue) continue;
    i && (result += " ");
    result += key;
  }
  return result;
}
function ssrStyle(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  let result = "";
  const k = Object.keys(value);
  for (let i = 0; i < k.length; i++) {
    const s = k[i];
    const v = value[s];
    if (v != undefined) {
      if (i) result += ";";
      result += `${s}:${escape(v, true)}`;
    }
  }
  return result;
}
function ssrElement(tag, props, children, needsId) {
  let result = `<${tag}${needsId ? ssrHydrationKey() : ""} `;
  if (props == null) props = {};else if (typeof props === "function") props = props();
  const keys = Object.keys(props);
  let classResolved;
  for (let i = 0; i < keys.length; i++) {
    const prop = keys[i];
    if (ChildProperties.has(prop)) {
      if (children === undefined) children = prop === "innerHTML" ? props[prop] : escape(props[prop]);
      continue;
    }
    const value = props[prop];
    if (prop === "style") {
      result += `style="${ssrStyle(value)}"`;
    } else if (prop === "class" || prop === "className" || prop === "classList") {
      if (classResolved) continue;
      let n;
      result += `class="${(n = props.class) ? n + " " : ""}${(n = props.className) ? n + " " : ""}${ssrClassList(props.classList)}"`;
      classResolved = true;
    } else if (BooleanAttributes.has(prop)) {
      if (value) result += prop;else continue;
    } else if (value == undefined || prop === "ref" || prop.slice(0, 2) === "on") {
      continue;
    } else {
      result += `${Aliases[prop] || prop}="${escape(value, true)}"`;
    }
    if (i !== keys.length - 1) result += " ";
  }
  return {
    t: result + `>${resolveSSRNode(children)}</${tag}>`
  };
}
function ssrAttribute(key, value, isBoolean) {
  return isBoolean ? value ? " " + key : "" : value != null ? ` ${key}="${value}"` : "";
}
function ssrHydrationKey() {
  const hk = getHydrationKey();
  return hk ? ` data-hk="${hk}"` : "";
}
function escape(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (!attr && t === "function") return escape(s(), attr);
    if (!attr && Array.isArray(s)) {
      let r = "";
      for (let i = 0; i < s.length; i++) r += resolveSSRNode(escape(s[i], attr));
      return {
        t: r
      };
    }
    if (attr && t === "boolean") return String(s);
    return s;
  }
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
    out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return hydrate && !hydrate.noHydrate && `${hydrate.id}${hydrate.count++}`;
}
function useAssets(fn) {
  sharedConfig.context.assets.push(() => resolveSSRNode(fn()));
}
function generateHydrationScript({
  eventNames = ["click", "input"],
  nonce
} = {}) {
  return `<script${nonce ? ` nonce="${nonce}"` : ""}>(e=>{let t=e=>e&&e.hasAttribute&&(e.hasAttribute("data-hk")?e:t(e.host&&e.host instanceof Node?e.host:e.parentNode));["${eventNames.join('", "')}"].forEach((o=>document.addEventListener(o,(o=>{let s=o.composedPath&&o.composedPath()[0]||o.target,a=t(s);a&&!e.completed.has(a)&&e.events.push([a,o])}))))})(window._$HY||(_$HY={events:[],completed:new WeakSet,r:{},fe(){},init(e,t){_$HY.r[e]=[new Promise((e=>t=e)),t]},set(e,t,o){(o=_$HY.r[e])&&o[1](t),_$HY.r[e]=[t]},unset(e){delete _$HY.r[e]},load:e=>_$HY.r[e]}));</script><!--xs-->`;
}
function NoHydration(props) {
  sharedConfig.context.noHydrate = true;
  return props.children;
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
  return html.replace(`</head>`, out + `</head>`);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function serializeError(error) {
  if (error.message) {
    const fields = {};
    const keys = Object.getOwnPropertyNames(error);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = error[key];
      if (!value || key !== "message" && typeof value !== "function") {
        fields[key] = value;
      }
    }
    return `Object.assign(new Error(${stringify(error.message)}), ${stringify(fields)})`;
  }
  return stringify(error);
}
function waitForFragments(registry, key) {
  for (const k of [...registry.keys()].reverse()) {
    if (key.startsWith(k)) {
      registry.get(k).push(key);
      return true;
    }
  }
  return false;
}
function serializeSet(registry, key, value, serializer = stringify) {
  const exist = registry.get(value);
  if (exist) return `_$HY.set("${key}", _$HY.r["${exist}"][0])`;
  value !== null && typeof value === "object" && registry.set(value, key);
  return `_$HY.set("${key}", ${serializer(value)})`;
}
function replacePlaceholder(html, key, value) {
  const marker = `<template id="pl-${key}">`;
  const close = `<!pl-${key}>`;
  const first = html.indexOf(marker);
  if (first === -1) return html;
  const last = html.indexOf(close, first + marker.length);
  return html.slice(0, first) + value + html.slice(last + close.length);
}

const isServer = true;
function Dynamic(props) {
  const [p, others] = splitProps(props, ["component"]);
  const comp = p.component,
    t = typeof comp;
  if (comp) {
    if (t === "function") return comp(others);else if (t === "string") {
      return ssrElement(comp, others, undefined, true);
    }
  }
}
function Portal(props) {
  return "";
}

let e={data:""},t=t=>"object"==typeof window?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||e,l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,a=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,o=(e,t)=>{let r="",l="",a="";for(let n in e){let c=e[n];"@"==n[0]?"i"==n[1]?r=n+" "+c+";":l+="f"==n[1]?o(c,n):n+"{"+o(c,"k"==n[1]?"":t)+"}":"object"==typeof c?l+=o(c,t?t.replace(/([^,])+/g,e=>n.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):n):null!=c&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=o.p?o.p(n,c):n+":"+c+";");}return r+(t&&a?t+"{"+a+"}":a)+l},c={},s=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+s(e[r]);return t}return e},i=(e,t,r,i,p)=>{let u=s(e),d=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return "go"+r})(u));if(!c[d]){let t=u!==e?e:(e=>{let t,r,o=[{}];for(;t=l.exec(e.replace(a,""));)t[4]?o.shift():t[3]?(r=t[3].replace(n," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(n," ").trim();return o[0]})(e);c[d]=o(p?{["@keyframes "+d]:t}:t,r?"":"."+d);}let f=r&&c.g?c.g:null;return r&&(c.g=c[d]),((e,t,r,l)=>{l?t.data=t.data.replace(l,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e);})(c[d],t,i,f),d},p=(e,t,r)=>e.reduce((e,l,a)=>{let n=t[a];if(n&&n.call){let e=n(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;n=t?"."+t:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e;}return e+l+(null==n?"":n)},"");function u(e){let r=this||{},l=e.call?e(r.p):e;return i(l.unshift?l.raw?p(l,[].slice.call(arguments,1),r.p):l.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):l,t(r.target),r.g,r.o,r.k)}u.bind({g:1});u.bind({k:1});

const ThemeContext = createContext();

function makeStyled(tag) {
  let _ctx = this || {};
  return (...args) => {
    const Styled = props => {
      const theme = useContext(ThemeContext);
      const withTheme = mergeProps(props, { theme });
      const clone = mergeProps(withTheme, {
        get class() {
          const pClass = withTheme.class,
            append = "class" in withTheme && /^go[0-9]+/.test(pClass);
          // Call `css` with the append flag and pass the props
          let className = u.apply(
            { target: _ctx.target, o: append, p: withTheme, g: _ctx.g },
            args
          );
          return [pClass, className].filter(Boolean).join(" ");
        }
      });
      const [local, newProps] = splitProps(clone, ["as", "theme"]);
      const htmlProps = newProps;
      const createTag = local.as || tag;
      let el;

      if (typeof createTag === "function") {
        el = createTag(htmlProps);
      } else {
        {
          const [local, others] = splitProps(htmlProps, ["children", "theme"]);
          el = Dynamic({
            component: createTag,
            get children() {
              return local.children;
            },
            ...others
          });
        }
      }
      return el;
    };
    Styled.class = props => {
      return untrack(() => {
        return u.apply({ target: _ctx.target, p: props, g: _ctx.g }, args);
      });
    };

    return Styled;
  };
}

const styled = new Proxy(makeStyled, {
  get(target, tag) {
    return target(tag);
  }
});

function addUniqueItem(array, item) {
    array.indexOf(item) === -1 && array.push(item);
}

const clamp = (min, max, v) => Math.min(Math.max(v, min), max);

const defaults = {
    duration: 0.3,
    delay: 0,
    endDelay: 0,
    repeat: 0,
    easing: "ease",
};

const isNumber = (value) => typeof value === "number";

const isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);

const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function getEasingForSegment(easing, i) {
    return isEasingList(easing)
        ? easing[wrap(0, easing.length, i)]
        : easing;
}

const mix = (min, max, progress) => -progress * min + progress * max + min;

const noop = () => { };
const noopReturn = (v) => v;

const progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);

function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for (let i = 1; i <= remaining; i++) {
        const offsetProgress = progress(0, remaining, i);
        offset.push(mix(min, 1, offsetProgress));
    }
}
function defaultOffset(length) {
    const offset = [0];
    fillOffset(offset, length - 1);
    return offset;
}

function interpolate(output, input = defaultOffset(output.length), easing = noopReturn) {
    const length = output.length;
    /**
     * If the input length is lower than the output we
     * fill the input to match. This currently assumes the input
     * is an animation progress value so is a good candidate for
     * moving outside the function.
     */
    const remainder = length - input.length;
    remainder > 0 && fillOffset(input, remainder);
    return (t) => {
        let i = 0;
        for (; i < length - 2; i++) {
            if (t < input[i + 1])
                break;
        }
        let progressInRange = clamp(0, 1, progress(input[i], input[i + 1], t));
        const segmentEasing = getEasingForSegment(easing, i);
        progressInRange = segmentEasing(progressInRange);
        return mix(output[i], output[i + 1], progressInRange);
    };
}

const isCubicBezier = (easing) => Array.isArray(easing) && isNumber(easing[0]);

const isEasingGenerator = (easing) => typeof easing === "object" &&
    Boolean(easing.createAnimation);

const isFunction = (value) => typeof value === "function";

const isString = (value) => typeof value === "string";

const time = {
    ms: (seconds) => seconds * 1000,
    s: (milliseconds) => milliseconds / 1000,
};

/*
  Bezier function generator

  This has been modified from Gaëtan Renaudeau's BezierEasing
  https://github.com/gre/bezier-easing/blob/master/src/index.js
  https://github.com/gre/bezier-easing/blob/master/LICENSE
  
  I've removed the newtonRaphsonIterate algo because in benchmarking it
  wasn't noticiably faster than binarySubdivision, indeed removing it
  usually improved times, depending on the curve.

  I also removed the lookup table, as for the added bundle size and loop we're
  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
  to 12 to compensate and this still tended to be faster for no perceivable
  loss in accuracy.

  Usage
    const easeOut = cubicBezier(.17,.67,.83,.67);
    const x = easeOut(0.5); // returns 0.627...
*/
// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t, a1, a2) => (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) * t;
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
        currentT = lowerBound + (upperBound - lowerBound) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - x;
        if (currentX > 0.0) {
            upperBound = currentT;
        }
        else {
            lowerBound = currentT;
        }
    } while (Math.abs(currentX) > subdivisionPrecision &&
        ++i < subdivisionMaxIterations);
    return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
    // If this is a linear gradient, return linear easing
    if (mX1 === mY1 && mX2 === mY2)
        return noopReturn;
    const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
    // If animation is at start/end, return t without easing
    return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}

const steps = (steps, direction = "end") => (progress) => {
    progress =
        direction === "end"
            ? Math.min(progress, 0.999)
            : Math.max(progress, 0.001);
    const expanded = progress * steps;
    const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
    return clamp(0, 1, rounded / steps);
};

const namedEasings = {
    ease: cubicBezier(0.25, 0.1, 0.25, 1.0),
    "ease-in": cubicBezier(0.42, 0.0, 1.0, 1.0),
    "ease-in-out": cubicBezier(0.42, 0.0, 0.58, 1.0),
    "ease-out": cubicBezier(0.0, 0.0, 0.58, 1.0),
};
const functionArgsRegex = /\((.*?)\)/;
function getEasingFunction(definition) {
    // If already an easing function, return
    if (isFunction(definition))
        return definition;
    // If an easing curve definition, return bezier function
    if (isCubicBezier(definition))
        return cubicBezier(...definition);
    // If we have a predefined easing function, return
    if (namedEasings[definition])
        return namedEasings[definition];
    // If this is a steps function, attempt to create easing curve
    if (definition.startsWith("steps")) {
        const args = functionArgsRegex.exec(definition);
        if (args) {
            const argsArray = args[1].split(",");
            return steps(parseFloat(argsArray[0]), argsArray[1].trim());
        }
    }
    return noopReturn;
}

class Animation {
    constructor(output, keyframes = [0, 1], { easing, duration: initialDuration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, offset, direction = "normal", } = {}) {
        this.startTime = null;
        this.rate = 1;
        this.t = 0;
        this.cancelTimestamp = null;
        this.easing = noopReturn;
        this.duration = 0;
        this.totalDuration = 0;
        this.repeat = 0;
        this.playState = "idle";
        this.finished = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        easing = easing || defaults.easing;
        if (isEasingGenerator(easing)) {
            const custom = easing.createAnimation(keyframes);
            easing = custom.easing;
            keyframes = custom.keyframes || keyframes;
            initialDuration = custom.duration || initialDuration;
        }
        this.repeat = repeat;
        this.easing = isEasingList(easing) ? noopReturn : getEasingFunction(easing);
        this.updateDuration(initialDuration);
        const interpolate$1 = interpolate(keyframes, offset, isEasingList(easing) ? easing.map(getEasingFunction) : noopReturn);
        this.tick = (timestamp) => {
            var _a;
            // TODO: Temporary fix for OptionsResolver typing
            delay = delay;
            let t = 0;
            if (this.pauseTime !== undefined) {
                t = this.pauseTime;
            }
            else {
                t = (timestamp - this.startTime) * this.rate;
            }
            this.t = t;
            // Convert to seconds
            t /= 1000;
            // Rebase on delay
            t = Math.max(t - delay, 0);
            /**
             * If this animation has finished, set the current time
             * to the total duration.
             */
            if (this.playState === "finished" && this.pauseTime === undefined) {
                t = this.totalDuration;
            }
            /**
             * Get the current progress (0-1) of the animation. If t is >
             * than duration we'll get values like 2.5 (midway through the
             * third iteration)
             */
            const progress = t / this.duration;
            // TODO progress += iterationStart
            /**
             * Get the current iteration (0 indexed). For instance the floor of
             * 2.5 is 2.
             */
            let currentIteration = Math.floor(progress);
            /**
             * Get the current progress of the iteration by taking the remainder
             * so 2.5 is 0.5 through iteration 2
             */
            let iterationProgress = progress % 1.0;
            if (!iterationProgress && progress >= 1) {
                iterationProgress = 1;
            }
            /**
             * If iteration progress is 1 we count that as the end
             * of the previous iteration.
             */
            iterationProgress === 1 && currentIteration--;
            /**
             * Reverse progress if we're not running in "normal" direction
             */
            const iterationIsOdd = currentIteration % 2;
            if (direction === "reverse" ||
                (direction === "alternate" && iterationIsOdd) ||
                (direction === "alternate-reverse" && !iterationIsOdd)) {
                iterationProgress = 1 - iterationProgress;
            }
            const p = t >= this.totalDuration ? 1 : Math.min(iterationProgress, 1);
            const latest = interpolate$1(this.easing(p));
            output(latest);
            const isAnimationFinished = this.pauseTime === undefined &&
                (this.playState === "finished" || t >= this.totalDuration + endDelay);
            if (isAnimationFinished) {
                this.playState = "finished";
                (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, latest);
            }
            else if (this.playState !== "idle") {
                this.frameRequestId = requestAnimationFrame(this.tick);
            }
        };
        this.play();
    }
    play() {
        const now = performance.now();
        this.playState = "running";
        if (this.pauseTime !== undefined) {
            this.startTime = now - this.pauseTime;
        }
        else if (!this.startTime) {
            this.startTime = now;
        }
        this.cancelTimestamp = this.startTime;
        this.pauseTime = undefined;
        this.frameRequestId = requestAnimationFrame(this.tick);
    }
    pause() {
        this.playState = "paused";
        this.pauseTime = this.t;
    }
    finish() {
        this.playState = "finished";
        this.tick(0);
    }
    stop() {
        var _a;
        this.playState = "idle";
        if (this.frameRequestId !== undefined) {
            cancelAnimationFrame(this.frameRequestId);
        }
        (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, false);
    }
    cancel() {
        this.stop();
        this.tick(this.cancelTimestamp);
    }
    reverse() {
        this.rate *= -1;
    }
    commitStyles() { }
    updateDuration(duration) {
        this.duration = duration;
        this.totalDuration = duration * (this.repeat + 1);
    }
    get currentTime() {
        return this.t;
    }
    set currentTime(t) {
        if (this.pauseTime !== undefined || this.rate === 0) {
            this.pauseTime = t;
        }
        else {
            this.startTime = performance.now() - t / this.rate;
        }
    }
    get playbackRate() {
        return this.rate;
    }
    set playbackRate(rate) {
        this.rate = rate;
    }
}

var invariant$1 = function () { };
if (process.env.NODE_ENV !== 'production') {
    invariant$1 = function (check, message) {
        if (!check) {
            throw new Error(message);
        }
    };
}

/**
 * The MotionValue tracks the state of a single animatable
 * value. Currently, updatedAt and current are unused. The
 * long term idea is to use this to minimise the number
 * of DOM reads, and to abstract the DOM interactions here.
 */
class MotionValue {
    setAnimation(animation) {
        this.animation = animation;
        animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => { });
    }
    clearAnimation() {
        this.animation = this.generator = undefined;
    }
}

const data = new WeakMap();
function getAnimationData(element) {
    if (!data.has(element)) {
        data.set(element, {
            transforms: [],
            values: new Map(),
        });
    }
    return data.get(element);
}
function getMotionValue(motionValues, name) {
    if (!motionValues.has(name)) {
        motionValues.set(name, new MotionValue());
    }
    return motionValues.get(name);
}

/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */
const axes = ["", "X", "Y", "Z"];
/**
 * An ordered array of each transformable value. By default, transform values
 * will be sorted to this order.
 */
const order = ["translate", "scale", "rotate", "skew"];
const transformAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
};
const rotation = {
    syntax: "<angle>",
    initialValue: "0deg",
    toDefaultUnit: (v) => v + "deg",
};
const baseTransformProperties = {
    translate: {
        syntax: "<length-percentage>",
        initialValue: "0px",
        toDefaultUnit: (v) => v + "px",
    },
    rotate: rotation,
    scale: {
        syntax: "<number>",
        initialValue: 1,
        toDefaultUnit: noopReturn,
    },
    skew: rotation,
};
const transformDefinitions = new Map();
const asTransformCssVar = (name) => `--motion-${name}`;
/**
 * Generate a list of every possible transform key
 */
const transforms = ["x", "y", "z"];
order.forEach((name) => {
    axes.forEach((axis) => {
        transforms.push(name + axis);
        transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
    });
});
/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */
const compareTransformOrder = (a, b) => transforms.indexOf(a) - transforms.indexOf(b);
/**
 * Provide a quick way to check if a string is the name of a transform
 */
const transformLookup = new Set(transforms);
const isTransform = (name) => transformLookup.has(name);
const addTransformToElement = (element, name) => {
    // Map x to translateX etc
    if (transformAlias[name])
        name = transformAlias[name];
    const { transforms } = getAnimationData(element);
    addUniqueItem(transforms, name);
    /**
     * TODO: An optimisation here could be to cache the transform in element data
     * and only update if this has changed.
     */
    element.style.transform = buildTransformTemplate(transforms);
};
const buildTransformTemplate = (transforms) => transforms
    .sort(compareTransformOrder)
    .reduce(transformListToString, "")
    .trim();
const transformListToString = (template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`;

const isCssVar = (name) => name.startsWith("--");
const registeredProperties = new Set();
function registerCssVariable(name) {
    if (registeredProperties.has(name))
        return;
    registeredProperties.add(name);
    try {
        const { syntax, initialValue } = transformDefinitions.has(name)
            ? transformDefinitions.get(name)
            : {};
        CSS.registerProperty({
            name,
            inherits: false,
            syntax,
            initialValue,
        });
    }
    catch (e) { }
}

const testAnimation = (keyframes, options) => document.createElement("div").animate(keyframes, options);
const featureTests = {
    cssRegisterProperty: () => typeof CSS !== "undefined" &&
        Object.hasOwnProperty.call(CSS, "registerProperty"),
    waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
    partialKeyframes: () => {
        try {
            testAnimation({ opacity: [1] });
        }
        catch (e) {
            return false;
        }
        return true;
    },
    finished: () => Boolean(testAnimation({ opacity: [0, 1] }, { duration: 0.001 }).finished),
    linearEasing: () => {
        try {
            testAnimation({ opacity: 0 }, { easing: "linear(0, 1)" });
        }
        catch (e) {
            return false;
        }
        return true;
    },
};
const results = {};
const supports = {};
for (const key in featureTests) {
    supports[key] = () => {
        if (results[key] === undefined)
            results[key] = featureTests[key]();
        return results[key];
    };
}

// Create a linear easing point for every x second
const resolution = 0.015;
const generateLinearEasingPoints = (easing, duration) => {
    let points = "";
    const numPoints = Math.round(duration / resolution);
    for (let i = 0; i < numPoints; i++) {
        points += easing(progress(0, numPoints - 1, i)) + ", ";
    }
    return points.substring(0, points.length - 2);
};
const convertEasing = (easing, duration) => {
    if (isFunction(easing)) {
        return supports.linearEasing()
            ? `linear(${generateLinearEasingPoints(easing, duration)})`
            : defaults.easing;
    }
    else {
        return isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
    }
};
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

function hydrateKeyframes(keyframes, readInitialValue) {
    for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i] === null) {
            keyframes[i] = i ? keyframes[i - 1] : readInitialValue();
        }
    }
    return keyframes;
}
const keyframesList = (keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes];

function getStyleName(key) {
    if (transformAlias[key])
        key = transformAlias[key];
    return isTransform(key) ? asTransformCssVar(key) : key;
}

const style = {
    get: (element, name) => {
        name = getStyleName(name);
        let value = isCssVar(name)
            ? element.style.getPropertyValue(name)
            : getComputedStyle(element)[name];
        if (!value && value !== 0) {
            const definition = transformDefinitions.get(name);
            if (definition)
                value = definition.initialValue;
        }
        return value;
    },
    set: (element, name, value) => {
        name = getStyleName(name);
        if (isCssVar(name)) {
            element.style.setProperty(name, value);
        }
        else {
            element.style[name] = value;
        }
    },
};

function stopAnimation(animation, needsCommit = true) {
    if (!animation || animation.playState === "finished")
        return;
    // Suppress error thrown by WAAPI
    try {
        if (animation.stop) {
            animation.stop();
        }
        else {
            needsCommit && animation.commitStyles();
            animation.cancel();
        }
    }
    catch (e) { }
}

function getUnitConverter(keyframes, definition) {
    var _a;
    let toUnit = (definition === null || definition === void 0 ? void 0 : definition.toDefaultUnit) || noopReturn;
    const finalKeyframe = keyframes[keyframes.length - 1];
    if (isString(finalKeyframe)) {
        const unit = ((_a = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)) === null || _a === void 0 ? void 0 : _a[2]) || "";
        if (unit)
            toUnit = (value) => value + unit;
    }
    return toUnit;
}

function getDevToolsRecord() {
    return window.__MOTION_DEV_TOOLS_RECORD;
}
function animateStyle(element, key, keyframesDefinition, options = {}, AnimationPolyfill) {
    const record = getDevToolsRecord();
    const isRecording = options.record !== false && record;
    let animation;
    let { duration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, easing = defaults.easing, persist = false, direction, offset, allowWebkitAcceleration = false, } = options;
    const data = getAnimationData(element);
    const valueIsTransform = isTransform(key);
    let canAnimateNatively = supports.waapi();
    /**
     * If this is an individual transform, we need to map its
     * key to a CSS variable and update the element's transform style
     */
    valueIsTransform && addTransformToElement(element, key);
    const name = getStyleName(key);
    const motionValue = getMotionValue(data.values, name);
    /**
     * Get definition of value, this will be used to convert numerical
     * keyframes into the default value type.
     */
    const definition = transformDefinitions.get(name);
    /**
     * Stop the current animation, if any. Because this will trigger
     * commitStyles (DOM writes) and we might later trigger DOM reads,
     * this is fired now and we return a factory function to create
     * the actual animation that can get called in batch,
     */
    stopAnimation(motionValue.animation, !(isEasingGenerator(easing) && motionValue.generator) &&
        options.record !== false);
    /**
     * Batchable factory function containing all DOM reads.
     */
    return () => {
        const readInitialValue = () => { var _a, _b; return (_b = (_a = style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0; };
        /**
         * Replace null values with the previous keyframe value, or read
         * it from the DOM if it's the first keyframe.
         */
        let keyframes = hydrateKeyframes(keyframesList(keyframesDefinition), readInitialValue);
        /**
         * Detect unit type of keyframes.
         */
        const toUnit = getUnitConverter(keyframes, definition);
        if (isEasingGenerator(easing)) {
            const custom = easing.createAnimation(keyframes, key !== "opacity", readInitialValue, name, motionValue);
            easing = custom.easing;
            keyframes = custom.keyframes || keyframes;
            duration = custom.duration || duration;
        }
        /**
         * If this is a CSS variable we need to register it with the browser
         * before it can be animated natively. We also set it with setProperty
         * rather than directly onto the element.style object.
         */
        if (isCssVar(name)) {
            if (supports.cssRegisterProperty()) {
                registerCssVariable(name);
            }
            else {
                canAnimateNatively = false;
            }
        }
        /**
         * If we've been passed a custom easing function, and this browser
         * does **not** support linear() easing, and the value is a transform
         * (and thus a pure number) we can still support the custom easing
         * by falling back to the animation polyfill.
         */
        if (valueIsTransform &&
            !supports.linearEasing() &&
            (isFunction(easing) || (isEasingList(easing) && easing.some(isFunction)))) {
            canAnimateNatively = false;
        }
        /**
         * If we can animate this value with WAAPI, do so.
         */
        if (canAnimateNatively) {
            /**
             * Convert numbers to default value types. Currently this only supports
             * transforms but it could also support other value types.
             */
            if (definition) {
                keyframes = keyframes.map((value) => isNumber(value) ? definition.toDefaultUnit(value) : value);
            }
            /**
             * If this browser doesn't support partial/implicit keyframes we need to
             * explicitly provide one.
             */
            if (keyframes.length === 1 &&
                (!supports.partialKeyframes() || isRecording)) {
                keyframes.unshift(readInitialValue());
            }
            const animationOptions = {
                delay: time.ms(delay),
                duration: time.ms(duration),
                endDelay: time.ms(endDelay),
                easing: !isEasingList(easing)
                    ? convertEasing(easing, duration)
                    : undefined,
                direction,
                iterations: repeat + 1,
                fill: "both",
            };
            animation = element.animate({
                [name]: keyframes,
                offset,
                easing: isEasingList(easing)
                    ? easing.map((thisEasing) => convertEasing(thisEasing, duration))
                    : undefined,
            }, animationOptions);
            /**
             * Polyfill finished Promise in browsers that don't support it
             */
            if (!animation.finished) {
                animation.finished = new Promise((resolve, reject) => {
                    animation.onfinish = resolve;
                    animation.oncancel = reject;
                });
            }
            const target = keyframes[keyframes.length - 1];
            animation.finished
                .then(() => {
                if (persist)
                    return;
                // Apply styles to target
                style.set(element, name, target);
                // Ensure fill modes don't persist
                animation.cancel();
            })
                .catch(noop);
            /**
             * This forces Webkit to run animations on the main thread by exploiting
             * this condition:
             * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/platform/graphics/ca/GraphicsLayerCA.cpp?rev=281238#L1099
             *
             * This fixes Webkit's timing bugs, like accelerated animations falling
             * out of sync with main thread animations and massive delays in starting
             * accelerated animations in WKWebView.
             */
            if (!allowWebkitAcceleration)
                animation.playbackRate = 1.000001;
            /**
             * If we can't animate the value natively then we can fallback to the numbers-only
             * polyfill for transforms.
             */
        }
        else if (AnimationPolyfill && valueIsTransform) {
            /**
             * If any keyframe is a string (because we measured it from the DOM), we need to convert
             * it into a number before passing to the Animation polyfill.
             */
            keyframes = keyframes.map((value) => typeof value === "string" ? parseFloat(value) : value);
            /**
             * If we only have a single keyframe, we need to create an initial keyframe by reading
             * the current value from the DOM.
             */
            if (keyframes.length === 1) {
                keyframes.unshift(parseFloat(readInitialValue()));
            }
            animation = new AnimationPolyfill((latest) => {
                style.set(element, name, toUnit ? toUnit(latest) : latest);
            }, keyframes, Object.assign(Object.assign({}, options), { duration,
                easing }));
        }
        else {
            const target = keyframes[keyframes.length - 1];
            style.set(element, name, definition && isNumber(target)
                ? definition.toDefaultUnit(target)
                : target);
        }
        if (isRecording) {
            record(element, key, keyframes, {
                duration,
                delay: delay,
                easing,
                repeat,
                offset,
            }, "motion-one");
        }
        motionValue.setAnimation(animation);
        return animation;
    };
}

const getOptions = (options, key) => 
/**
 * TODO: Make test for this
 * Always return a new object otherwise delay is overwritten by results of stagger
 * and this results in no stagger
 */
options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options);

function resolveElements(elements, selectorCache) {
    var _a;
    if (typeof elements === "string") {
        if (selectorCache) {
            (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : (selectorCache[elements] = document.querySelectorAll(elements));
            elements = selectorCache[elements];
        }
        else {
            elements = document.querySelectorAll(elements);
        }
    }
    else if (elements instanceof Element) {
        elements = [elements];
    }
    /**
     * Return an empty array
     */
    return Array.from(elements || []);
}

const createAnimation = (factory) => factory();
const withControls = (animationFactory, options, duration = defaults.duration) => {
    return new Proxy({
        animations: animationFactory.map(createAnimation).filter(Boolean),
        duration,
        options,
    }, controls);
};
/**
 * TODO:
 * Currently this returns the first animation, ideally it would return
 * the first active animation.
 */
const getActiveAnimation = (state) => state.animations[0];
const controls = {
    get: (target, key) => {
        const activeAnimation = getActiveAnimation(target);
        switch (key) {
            case "duration":
                return target.duration;
            case "currentTime":
                return time.s((activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) || 0);
            case "playbackRate":
            case "playState":
                return activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key];
            case "finished":
                if (!target.finished) {
                    target.finished = Promise.all(target.animations.map(selectFinished)).catch(noop);
                }
                return target.finished;
            case "stop":
                return () => {
                    target.animations.forEach((animation) => stopAnimation(animation));
                };
            case "forEachNative":
                /**
                 * This is for internal use only, fire a callback for each
                 * underlying animation.
                 */
                return (callback) => {
                    target.animations.forEach((animation) => callback(animation, target));
                };
            default:
                return typeof (activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) === "undefined"
                    ? undefined
                    : () => target.animations.forEach((animation) => animation[key]());
        }
    },
    set: (target, key, value) => {
        switch (key) {
            case "currentTime":
                value = time.ms(value);
            case "currentTime":
            case "playbackRate":
                for (let i = 0; i < target.animations.length; i++) {
                    target.animations[i][key] = value;
                }
                return true;
        }
        return false;
    },
};
const selectFinished = (animation) => animation.finished;

function resolveOption(option, i, total) {
    return isFunction(option) ? option(i, total) : option;
}

function createAnimate(AnimatePolyfill) {
    return function animate(elements, keyframes, options = {}) {
        elements = resolveElements(elements);
        const numElements = elements.length;
        invariant$1(Boolean(numElements), "No valid element provided.");
        invariant$1(Boolean(keyframes), "No keyframes defined.");
        /**
         * Create and start new animations
         */
        const animationFactories = [];
        for (let i = 0; i < numElements; i++) {
            const element = elements[i];
            for (const key in keyframes) {
                const valueOptions = getOptions(options, key);
                valueOptions.delay = resolveOption(valueOptions.delay, i, numElements);
                const animation = animateStyle(element, key, keyframes[key], valueOptions, AnimatePolyfill);
                animationFactories.push(animation);
            }
        }
        return withControls(animationFactories, options, 
        /**
         * TODO:
         * If easing is set to spring or glide, duration will be dynamically
         * generated. Ideally we would dynamically generate this from
         * animation.effect.getComputedTiming().duration but this isn't
         * supported in iOS13 or our number polyfill. Perhaps it's possible
         * to Proxy animations returned from animateStyle that has duration
         * as a getter.
         */
        options.duration);
    };
}

const animate$1 = createAnimate(Animation);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const thresholds = {
    any: 0,
    all: 1,
};
function inView$1(elementOrSelector, onStart, { root, margin: rootMargin, amount = "any" } = {}) {
    /**
     * If this browser doesn't support IntersectionObserver, return a dummy stop function.
     * Default triggering of onStart is tricky - it could be used for starting/stopping
     * videos, lazy loading content etc. We could provide an option to enable a fallback, or
     * provide a fallback callback option.
     */
    if (typeof IntersectionObserver === "undefined") {
        return () => { };
    }
    const elements = resolveElements(elementOrSelector);
    const activeIntersections = new WeakMap();
    const onIntersectionChange = (entries) => {
        entries.forEach((entry) => {
            const onEnd = activeIntersections.get(entry.target);
            /**
             * If there's no change to the intersection, we don't need to
             * do anything here.
             */
            if (entry.isIntersecting === Boolean(onEnd))
                return;
            if (entry.isIntersecting) {
                const newOnEnd = onStart(entry);
                if (isFunction(newOnEnd)) {
                    activeIntersections.set(entry.target, newOnEnd);
                }
                else {
                    observer.unobserve(entry.target);
                }
            }
            else if (onEnd) {
                onEnd(entry);
                activeIntersections.delete(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(onIntersectionChange, {
        root,
        rootMargin,
        threshold: typeof amount === "number" ? amount : thresholds[amount],
    });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
}

function dispatchPointerEvent(element, name, event) {
    element.dispatchEvent(new CustomEvent(name, { detail: { originalEvent: event } }));
}
function dispatchViewEvent(element, name, entry) {
    element.dispatchEvent(new CustomEvent(name, { detail: { originalEntry: entry } }));
}

const inView = {
    isActive: (options) => Boolean(options.inView),
    subscribe: (element, { enable, disable }, { inViewOptions = {} }) => {
        const { once } = inViewOptions, viewOptions = __rest(inViewOptions, ["once"]);
        return inView$1(element, (enterEntry) => {
            enable();
            dispatchViewEvent(element, "viewenter", enterEntry);
            if (!once) {
                return (leaveEntry) => {
                    disable();
                    dispatchViewEvent(element, "viewleave", leaveEntry);
                };
            }
        }, viewOptions);
    },
};

const mouseEvent = (element, name, action) => (event) => {
    if (event.pointerType && event.pointerType !== "mouse")
        return;
    action();
    dispatchPointerEvent(element, name, event);
};
const hover = {
    isActive: (options) => Boolean(options.hover),
    subscribe: (element, { enable, disable }) => {
        const onEnter = mouseEvent(element, "hoverstart", enable);
        const onLeave = mouseEvent(element, "hoverend", disable);
        element.addEventListener("pointerenter", onEnter);
        element.addEventListener("pointerleave", onLeave);
        return () => {
            element.removeEventListener("pointerenter", onEnter);
            element.removeEventListener("pointerleave", onLeave);
        };
    },
};

const press = {
    isActive: (options) => Boolean(options.press),
    subscribe: (element, { enable, disable }) => {
        const onPointerUp = (event) => {
            disable();
            dispatchPointerEvent(element, "pressend", event);
            window.removeEventListener("pointerup", onPointerUp);
        };
        const onPointerDown = (event) => {
            enable();
            dispatchPointerEvent(element, "pressstart", event);
            window.addEventListener("pointerup", onPointerUp);
        };
        element.addEventListener("pointerdown", onPointerDown);
        return () => {
            element.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointerup", onPointerUp);
        };
    },
};

const gestures = { inView, hover, press };
/**
 * A list of state types, in priority order. If a value is defined in
 * a righter-most type, it will override any definition in a lefter-most.
 */
["initial", "animate", ...Object.keys(gestures), "exit"];

function animateProgress(target, options = {}) {
    return withControls([
        () => {
            const animation = new Animation(target, [0, 1], options);
            animation.finished.catch(() => { });
            return animation;
        },
    ], options, options.duration);
}
function animate(target, keyframesOrOptions, options) {
    const factory = isFunction(target) ? animateProgress : animate$1;
    return factory(target, keyframesOrOptions, options);
}

function nextFrame(fn) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}

const Transition = props => {
  let el;
  let first = true;
  const [s1, set1] = createSignal();
  const [s2, set2] = createSignal();
  const resolved = children(() => props.children);
  const {
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeExit,
    onExit,
    onAfterExit
  } = props;
  const classnames = createMemo(() => {
    const name = props.name || "s";
    return {
      enterActiveClass: props.enterActiveClass || name + "-enter-active",
      enterClass: props.enterClass || name + "-enter",
      enterToClass: props.enterToClass || name + "-enter-to",
      exitActiveClass: props.exitActiveClass || name + "-exit-active",
      exitClass: props.exitClass || name + "-exit",
      exitToClass: props.exitToClass || name + "-exit-to"
    };
  });

  function enterTransition(el, prev) {
    if (!first || props.appear) {
      const enterClasses = classnames().enterClass.split(" ");
      const enterActiveClasses = classnames().enterActiveClass.split(" ");
      const enterToClasses = classnames().enterToClass.split(" ");
      onBeforeEnter && onBeforeEnter(el);
      el.classList.add(...enterClasses);
      el.classList.add(...enterActiveClasses);
      nextFrame(() => {
        el.classList.remove(...enterClasses);
        el.classList.add(...enterToClasses);
        onEnter && onEnter(el, () => endTransition());

        if (!onEnter || onEnter.length < 2) {
          el.addEventListener("transitionend", endTransition);
          el.addEventListener("animationend", endTransition);
        }
      });

      function endTransition(e) {
        if (el && (!e || e.target === el)) {
          el.removeEventListener("transitionend", endTransition);
          el.removeEventListener("animationend", endTransition);
          el.classList.remove(...enterActiveClasses);
          el.classList.remove(...enterToClasses);
          batch(() => {
            s1() !== el && set1(el);
            s2() === el && set2(undefined);
          });
          onAfterEnter && onAfterEnter(el);
          if (props.mode === "inout") exitTransition(el, prev);
        }
      }
    }

    prev && !props.mode ? set2(el) : set1(el);
  }

  function exitTransition(el, prev) {
    const exitClasses = classnames().exitClass.split(" ");
    const exitActiveClasses = classnames().exitActiveClass.split(" ");
    const exitToClasses = classnames().exitToClass.split(" ");
    if (!prev.parentNode) return endTransition();
    onBeforeExit && onBeforeExit(prev);
    prev.classList.add(...exitClasses);
    prev.classList.add(...exitActiveClasses);
    nextFrame(() => {
      prev.classList.remove(...exitClasses);
      prev.classList.add(...exitToClasses);
    });
    onExit && onExit(prev, () => endTransition());

    if (!onExit || onExit.length < 2) {
      prev.addEventListener("transitionend", endTransition);
      prev.addEventListener("animationend", endTransition);
    }

    function endTransition(e) {
      if (!e || e.target === prev) {
        prev.removeEventListener("transitionend", endTransition);
        prev.removeEventListener("animationend", endTransition);
        prev.classList.remove(...exitActiveClasses);
        prev.classList.remove(...exitToClasses);
        s1() === prev && set1(undefined);
        onAfterExit && onAfterExit(prev);
        if (props.mode === "outin") enterTransition(el, prev);
      }
    }
  }

  createComputed(prev => {
    el = resolved();

    while (typeof el === "function") el = el();

    return untrack(() => {
      if (el && el !== prev) {
        if (props.mode !== "outin") enterTransition(el, prev);else if (first) set1(el);
      }

      if (prev && prev !== el && props.mode !== "inout") exitTransition(el, prev);
      first = false;
      return el;
    });
  });
  return [s1, s2];
};

const FETCH_EVENT = "$FETCH";

function getRouteMatches$1(routes, path, method) {
  const segments = path.split("/").filter(Boolean);
  routeLoop:
    for (const route of routes) {
      const matchSegments = route.matchSegments;
      if (segments.length < matchSegments.length || !route.wildcard && segments.length > matchSegments.length) {
        continue;
      }
      for (let index = 0; index < matchSegments.length; index++) {
        const match = matchSegments[index];
        if (!match) {
          continue;
        }
        if (segments[index] !== match) {
          continue routeLoop;
        }
      }
      const handler = route[method];
      if (handler === "skip" || handler === void 0) {
        return;
      }
      const params = {};
      for (const { type, name, index } of route.params) {
        if (type === ":") {
          params[name] = segments[index];
        } else {
          params[name] = segments.slice(index).join("/");
        }
      }
      return { handler, params };
    }
}

let apiRoutes$1;
const registerApiRoutes = (routes) => {
  apiRoutes$1 = routes;
};
async function internalFetch(route, init) {
  if (route.startsWith("http")) {
    return await fetch(route, init);
  }
  let url = new URL(route, "http://internal");
  const request = new Request(url.href, init);
  const handler = getRouteMatches$1(apiRoutes$1, url.pathname, request.method.toUpperCase());
  if (!handler) {
    throw new Error(`No handler found for ${request.method} ${request.url}`);
  }
  let apiEvent = Object.freeze({
    request,
    params: handler.params,
    clientAddress: "127.0.0.1",
    env: {},
    locals: {},
    $type: FETCH_EVENT,
    fetch: internalFetch
  });
  const response = await handler.handler(apiEvent);
  return response;
}

const XSolidStartLocationHeader = "x-solidstart-location";
const LocationHeader = "Location";
const ContentTypeHeader = "content-type";
const XSolidStartResponseTypeHeader = "x-solidstart-response-type";
const XSolidStartContentTypeHeader = "x-solidstart-content-type";
const XSolidStartOrigin = "x-solidstart-origin";
const JSONResponseType = "application/json";
function redirect(url, init = 302) {
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = { status: responseInit };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  if (url === "") {
    url = "/";
  }
  let headers = new Headers(responseInit.headers);
  headers.set(LocationHeader, url);
  const response = new Response(null, {
    ...responseInit,
    headers
  });
  return response;
}
const redirectStatusCodes = /* @__PURE__ */ new Set([204, 301, 302, 303, 307, 308]);
function isRedirectResponse(response) {
  return response && response instanceof Response && redirectStatusCodes.has(response.status);
}
class ResponseError extends Error {
  status;
  headers;
  name = "ResponseError";
  ok;
  statusText;
  redirected;
  url;
  constructor(response) {
    let message = JSON.stringify({
      $type: "response",
      status: response.status,
      message: response.statusText,
      headers: [...response.headers.entries()]
    });
    super(message);
    this.status = response.status;
    this.headers = new Map([...response.headers.entries()]);
    this.url = response.url;
    this.ok = response.ok;
    this.statusText = response.statusText;
    this.redirected = response.redirected;
    this.bodyUsed = false;
    this.type = response.type;
    this.response = () => response;
  }
  response;
  type;
  clone() {
    return this.response();
  }
  get body() {
    return this.response().body;
  }
  bodyUsed;
  async arrayBuffer() {
    return await this.response().arrayBuffer();
  }
  async blob() {
    return await this.response().blob();
  }
  async formData() {
    return await this.response().formData();
  }
  async text() {
    return await this.response().text();
  }
  async json() {
    return await this.response().json();
  }
}

const api = [
  {
    GET: "skip",
    path: "/*404"
  },
  {
    GET: "skip",
    path: "/about"
  },
  {
    GET: "skip",
    path: "/dashboard"
  },
  {
    GET: "skip",
    path: "/"
  }
];
function expandOptionals$1(pattern) {
  let match = /(\/?\:[^\/]+)\?/.exec(pattern);
  if (!match)
    return [pattern];
  let prefix = pattern.slice(0, match.index);
  let suffix = pattern.slice(match.index + match[0].length);
  const prefixes = [prefix, prefix += match[1]];
  while (match = /^(\/\:[^\/]+)\?/.exec(suffix)) {
    prefixes.push(prefix += match[1]);
    suffix = suffix.slice(match[0].length);
  }
  return expandOptionals$1(suffix).reduce(
    (results, expansion) => [...results, ...prefixes.map((p) => p + expansion)],
    []
  );
}
function routeToMatchRoute(route) {
  const segments = route.path.split("/").filter(Boolean);
  const params = [];
  const matchSegments = [];
  let score = route.path.endsWith("/") ? 4 : 0;
  let wildcard = false;
  for (const [index, segment] of segments.entries()) {
    if (segment[0] === ":") {
      const name = segment.slice(1);
      score += 3;
      params.push({
        type: ":",
        name,
        index
      });
      matchSegments.push(null);
    } else if (segment[0] === "*") {
      params.push({
        type: "*",
        name: segment.slice(1),
        index
      });
      wildcard = true;
    } else {
      score += 4;
      matchSegments.push(segment);
    }
  }
  return {
    ...route,
    score,
    params,
    matchSegments,
    wildcard
  };
}
const allRoutes = api.flatMap((route) => {
  const paths = expandOptionals$1(route.path);
  return paths.map((path) => ({ ...route, path }));
}).map(routeToMatchRoute).sort((a, b) => b.score - a.score);
registerApiRoutes(allRoutes);
function getApiHandler(url, method) {
  return getRouteMatches$1(allRoutes, url.pathname, method.toUpperCase());
}

const apiRoutes = ({ forward }) => {
  return async (event) => {
    let apiHandler = getApiHandler(new URL(event.request.url), event.request.method);
    if (apiHandler) {
      let apiEvent = Object.freeze({
        request: event.request,
        clientAddress: event.clientAddress,
        locals: event.locals,
        params: apiHandler.params,
        env: event.env,
        $type: FETCH_EVENT,
        fetch: internalFetch
      });
      try {
        return await apiHandler.handler(apiEvent);
      } catch (error) {
        if (error instanceof Response) {
          return error;
        }
        return new Response(JSON.stringify(error), {
          status: 500
        });
      }
    }
    return await forward(event);
  };
};
function normalizeIntegration(integration) {
    if (!integration) {
        return {
            signal: createSignal({ value: "" })
        };
    }
    else if (Array.isArray(integration)) {
        return {
            signal: integration
        };
    }
    return integration;
}
function staticIntegration(obj) {
    return {
        signal: [() => obj, next => Object.assign(obj, next)]
    };
}

function createBeforeLeave() {
    let listeners = new Set();
    function subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }
    let ignore = false;
    function confirm(to, options) {
        if (ignore)
            return !(ignore = false);
        const e = {
            to,
            options,
            defaultPrevented: false,
            preventDefault: () => (e.defaultPrevented = true)
        };
        for (const l of listeners)
            l.listener({
                ...e,
                from: l.location,
                retry: (force) => {
                    force && (ignore = true);
                    l.navigate(to, options);
                }
            });
        return !e.defaultPrevented;
    }
    return {
        subscribe,
        confirm
    };
}

const hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
const trimPathRegex = /^\/+|\/+$/g;
function normalizePath(path, omitSlash = false) {
    const s = path.replace(trimPathRegex, "");
    return s ? (omitSlash || /^[?#]/.test(s) ? s : "/" + s) : "";
}
function resolvePath(base, path, from) {
    if (hasSchemeRegex.test(path)) {
        return undefined;
    }
    const basePath = normalizePath(base);
    const fromPath = from && normalizePath(from);
    let result = "";
    if (!fromPath || path.startsWith("/")) {
        result = basePath;
    }
    else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
        result = basePath + fromPath;
    }
    else {
        result = fromPath;
    }
    return (result || "/") + normalizePath(path, !result);
}
function invariant(value, message) {
    if (value == null) {
        throw new Error(message);
    }
    return value;
}
function joinPaths(from, to) {
    return normalizePath(from).replace(/\/*(\*.*)?$/g, "") + normalizePath(to);
}
function extractSearchParams(url) {
    const params = {};
    url.searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}
function createMatcher(path, partial, matchFilters) {
    const [pattern, splat] = path.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    const len = segments.length;
    return (location) => {
        const locSegments = location.split("/").filter(Boolean);
        const lenDiff = locSegments.length - len;
        if (lenDiff < 0 || (lenDiff > 0 && splat === undefined && !partial)) {
            return null;
        }
        const match = {
            path: len ? "" : "/",
            params: {}
        };
        const matchFilter = (s) => matchFilters === undefined ? undefined : matchFilters[s];
        for (let i = 0; i < len; i++) {
            const segment = segments[i];
            const locSegment = locSegments[i];
            const key = segment[0] === ":" ? segment.slice(1) : segment;
            if (segment[0] === ":" && matchSegment(locSegment, matchFilter(key))) {
                match.params[key] = locSegment;
            }
            else if (!matchSegment(locSegment, segment)) {
                return null;
            }
            match.path += `/${locSegment}`;
        }
        if (splat) {
            const remainder = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
            if (matchSegment(remainder, matchFilter(splat))) {
                match.params[splat] = remainder;
            }
            else {
                return null;
            }
        }
        return match;
    };
}
function matchSegment(input, filter) {
    const isEqual = (s) => s.localeCompare(input, undefined, { sensitivity: "base" }) === 0;
    if (filter === undefined) {
        return true;
    }
    else if (typeof filter === "string") {
        return isEqual(filter);
    }
    else if (typeof filter === "function") {
        return filter(input);
    }
    else if (Array.isArray(filter)) {
        return filter.some(isEqual);
    }
    else if (filter instanceof RegExp) {
        return filter.test(input);
    }
    return false;
}
function scoreRoute(route) {
    const [pattern, splat] = route.pattern.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === undefined ? 0 : 1));
}
function createMemoObject(fn) {
    const map = new Map();
    const owner = getOwner();
    return new Proxy({}, {
        get(_, property) {
            if (!map.has(property)) {
                runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
            }
            return map.get(property)();
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: true,
                configurable: true
            };
        },
        ownKeys() {
            return Reflect.ownKeys(fn());
        }
    });
}
function mergeSearchString(search, params) {
    const merged = new URLSearchParams(search);
    Object.entries(params).forEach(([key, value]) => {
        if (value == null || value === "") {
            merged.delete(key);
        }
        else {
            merged.set(key, String(value));
        }
    });
    const s = merged.toString();
    return s ? `?${s}` : "";
}
function expandOptionals(pattern) {
    let match = /(\/?\:[^\/]+)\?/.exec(pattern);
    if (!match)
        return [pattern];
    let prefix = pattern.slice(0, match.index);
    let suffix = pattern.slice(match.index + match[0].length);
    const prefixes = [prefix, (prefix += match[1])];
    // This section handles adjacent optional params. We don't actually want all permuations since
    // that will lead to equivalent routes which have the same number of params. For example
    // `/:a?/:b?/:c`? only has the unique expansion: `/`, `/:a`, `/:a/:b`, `/:a/:b/:c` and we can
    // discard `/:b`, `/:c`, `/:b/:c` by building them up in order and not recursing. This also helps
    // ensure predictability where earlier params have precidence.
    while ((match = /^(\/\:[^\/]+)\?/.exec(suffix))) {
        prefixes.push((prefix += match[1]));
        suffix = suffix.slice(match[0].length);
    }
    return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map(p => p + expansion)], []);
}

const MAX_REDIRECTS = 100;
const RouterContextObj = createContext();
const RouteContextObj = createContext();
const useRouter = () => invariant(useContext(RouterContextObj), "Make sure your app is wrapped in a <Router />");
let TempRoute;
const useRoute = () => TempRoute || useContext(RouteContextObj) || useRouter().base;
const useNavigate = () => useRouter().navigatorFactory();
const useLocation = () => useRouter().location;
const useSearchParams = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const setSearchParams = (params, options) => {
        const searchString = untrack(() => mergeSearchString(location.search, params));
        navigate(location.pathname + searchString + location.hash, {
            scroll: false,
            resolve: false,
            ...options
        });
    };
    return [location.query, setSearchParams];
};
function createRoutes(routeDef, base = "", fallback) {
    const { component, data, children } = routeDef;
    const isLeaf = !children || (Array.isArray(children) && !children.length);
    const shared = {
        key: routeDef,
        element: component
            ? () => createComponent(component, {})
            : () => {
                const { element } = routeDef;
                return element === undefined && fallback
                    ? createComponent(fallback, {})
                    : element;
            },
        preload: routeDef.component
            ? component.preload
            : routeDef.preload,
        data
    };
    return asArray(routeDef.path).reduce((acc, path) => {
        for (const originalPath of expandOptionals(path)) {
            const path = joinPaths(base, originalPath);
            const pattern = isLeaf ? path : path.split("/*", 1)[0];
            acc.push({
                ...shared,
                originalPath,
                pattern,
                matcher: createMatcher(pattern, !isLeaf, routeDef.matchFilters)
            });
        }
        return acc;
    }, []);
}
function createBranch(routes, index = 0) {
    return {
        routes,
        score: scoreRoute(routes[routes.length - 1]) * 10000 - index,
        matcher(location) {
            const matches = [];
            for (let i = routes.length - 1; i >= 0; i--) {
                const route = routes[i];
                const match = route.matcher(location);
                if (!match) {
                    return null;
                }
                matches.unshift({
                    ...match,
                    route
                });
            }
            return matches;
        }
    };
}
function asArray(value) {
    return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", fallback, stack = [], branches = []) {
    const routeDefs = asArray(routeDef);
    for (let i = 0, len = routeDefs.length; i < len; i++) {
        const def = routeDefs[i];
        if (def && typeof def === "object" && def.hasOwnProperty("path")) {
            const routes = createRoutes(def, base, fallback);
            for (const route of routes) {
                stack.push(route);
                const isEmptyArray = Array.isArray(def.children) && def.children.length === 0;
                if (def.children && !isEmptyArray) {
                    createBranches(def.children, route.pattern, fallback, stack, branches);
                }
                else {
                    const branch = createBranch([...stack], branches.length);
                    branches.push(branch);
                }
                stack.pop();
            }
        }
    }
    // Stack will be empty on final return
    return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location) {
    for (let i = 0, len = branches.length; i < len; i++) {
        const match = branches[i].matcher(location);
        if (match) {
            return match;
        }
    }
    return [];
}
function createLocation(path, state) {
    const origin = new URL("http://sar");
    const url = createMemo(prev => {
        const path_ = path();
        try {
            return new URL(path_, origin);
        }
        catch (err) {
            console.error(`Invalid path ${path_}`);
            return prev;
        }
    }, origin);
    const pathname = createMemo(() => url().pathname);
    const search = createMemo(() => url().search, true);
    const hash = createMemo(() => url().hash);
    const key = createMemo(() => "");
    return {
        get pathname() {
            return pathname();
        },
        get search() {
            return search();
        },
        get hash() {
            return hash();
        },
        get state() {
            return state();
        },
        get key() {
            return key();
        },
        query: createMemoObject(on(search, () => extractSearchParams(url())))
    };
}
function createRouterContext(integration, base = "", data, out) {
    const { signal: [source, setSource], utils = {} } = normalizeIntegration(integration);
    const parsePath = utils.parsePath || (p => p);
    const renderPath = utils.renderPath || (p => p);
    const beforeLeave = utils.beforeLeave || createBeforeLeave();
    const basePath = resolvePath("", base);
    const output = out
        ? Object.assign(out, {
            matches: [],
            url: undefined
        })
        : undefined;
    if (basePath === undefined) {
        throw new Error(`${basePath} is not a valid base path`);
    }
    else if (basePath && !source().value) {
        setSource({ value: basePath, replace: true, scroll: false });
    }
    const [isRouting, setIsRouting] = createSignal(false);
    const start = async (callback) => {
        setIsRouting(true);
        try {
            await startTransition(callback);
        }
        finally {
            setIsRouting(false);
        }
    };
    const [reference, setReference] = createSignal(source().value);
    const [state, setState] = createSignal(source().state);
    const location = createLocation(reference, state);
    const referrers = [];
    const baseRoute = {
        pattern: basePath,
        params: {},
        path: () => basePath,
        outlet: () => null,
        resolvePath(to) {
            return resolvePath(basePath, to);
        }
    };
    if (data) {
        try {
            TempRoute = baseRoute;
            baseRoute.data = data({
                data: undefined,
                params: {},
                location,
                navigate: navigatorFactory(baseRoute)
            });
        }
        finally {
            TempRoute = undefined;
        }
    }
    function navigateFromRoute(route, to, options) {
        // Untrack in case someone navigates in an effect - don't want to track `reference` or route paths
        untrack(() => {
            if (typeof to === "number") {
                if (!to) ;
                else if (utils.go) {
                    beforeLeave.confirm(to, options) && utils.go(to);
                }
                else {
                    console.warn("Router integration does not support relative routing");
                }
                return;
            }
            const { replace, resolve, scroll, state: nextState } = {
                replace: false,
                resolve: true,
                scroll: true,
                ...options
            };
            const resolvedTo = resolve ? route.resolvePath(to) : resolvePath("", to);
            if (resolvedTo === undefined) {
                throw new Error(`Path '${to}' is not a routable path`);
            }
            else if (referrers.length >= MAX_REDIRECTS) {
                throw new Error("Too many redirects");
            }
            const current = reference();
            if (resolvedTo !== current || nextState !== state()) {
                {
                    if (output) {
                        output.url = resolvedTo;
                    }
                    setSource({ value: resolvedTo, replace, scroll, state: nextState });
                }
            }
        });
    }
    function navigatorFactory(route) {
        // Workaround for vite issue (https://github.com/vitejs/vite/issues/3803)
        route = route || useContext(RouteContextObj) || baseRoute;
        return (to, options) => navigateFromRoute(route, to, options);
    }
    createRenderEffect(() => {
        const { value, state } = source();
        // Untrack this whole block so `start` doesn't cause Solid's Listener to be preserved
        untrack(() => {
            if (value !== reference()) {
                start(() => {
                    setReference(value);
                    setState(state);
                });
            }
        });
    });
    return {
        base: baseRoute,
        out: output,
        location,
        isRouting,
        renderPath,
        parsePath,
        navigatorFactory,
        beforeLeave
    };
}
function createRouteContext(router, parent, child, match, params) {
    const { base, location, navigatorFactory } = router;
    const { pattern, element: outlet, preload, data } = match().route;
    const path = createMemo(() => match().path);
    preload && preload();
    const route = {
        parent,
        pattern,
        get child() {
            return child();
        },
        path,
        params,
        data: parent.data,
        outlet,
        resolvePath(to) {
            return resolvePath(base.path(), to, path());
        }
    };
    if (data) {
        try {
            TempRoute = route;
            route.data = data({ data: parent.data, params, location, navigate: navigatorFactory(route) });
        }
        finally {
            TempRoute = undefined;
        }
    }
    return route;
}

const Router = props => {
  const {
    source,
    url,
    base,
    data,
    out
  } = props;
  const integration = source || (staticIntegration({
    value: url || ""
  }) );
  const routerState = createRouterContext(integration, base, data, out);
  return createComponent(RouterContextObj.Provider, {
    value: routerState,
    get children() {
      return props.children;
    }
  });
};
const Routes$1 = props => {
  const router = useRouter();
  const parentRoute = useRoute();
  const routeDefs = children(() => props.children);
  const branches = createMemo(() => createBranches(routeDefs(), joinPaths(parentRoute.pattern, props.base || ""), Outlet));
  const matches = createMemo(() => getRouteMatches(branches(), router.location.pathname));
  const params = createMemoObject(() => {
    const m = matches();
    const params = {};
    for (let i = 0; i < m.length; i++) {
      Object.assign(params, m[i].params);
    }
    return params;
  });
  if (router.out) {
    router.out.matches.push(matches().map(({
      route,
      path,
      params
    }) => ({
      originalPath: route.originalPath,
      pattern: route.pattern,
      path,
      params
    })));
  }
  const disposers = [];
  let root;
  const routeStates = createMemo(on(matches, (nextMatches, prevMatches, prev) => {
    let equal = prevMatches && nextMatches.length === prevMatches.length;
    const next = [];
    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = prevMatches && prevMatches[i];
      const nextMatch = nextMatches[i];
      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;
        if (disposers[i]) {
          disposers[i]();
        }
        createRoot(dispose => {
          disposers[i] = dispose;
          next[i] = createRouteContext(router, next[i - 1] || parentRoute, () => routeStates()[i + 1], () => matches()[i], params);
        });
      }
    }
    disposers.splice(nextMatches.length).forEach(dispose => dispose());
    if (prev && equal) {
      return prev;
    }
    root = next[0];
    return next;
  }));
  return createComponent(Show, {
    get when() {
      return routeStates() && root;
    },
    children: route => createComponent(RouteContextObj.Provider, {
      value: route,
      get children() {
        return route.outlet();
      }
    })
  });
};
const Outlet = () => {
  const route = useRoute();
  return createComponent(Show, {
    get when() {
      return route.child;
    },
    children: child => createComponent(RouteContextObj.Provider, {
      value: child,
      get children() {
        return child.outlet();
      }
    })
  });
};

class ServerError extends Error {
  constructor(message, {
    status,
    stack
  } = {}) {
    super(message);
    this.name = "ServerError";
    this.status = status || 400;
    if (stack) {
      this.stack = stack;
    }
  }
}
class FormError extends ServerError {
  constructor(message, {
    fieldErrors = {},
    form,
    fields,
    stack
  } = {}) {
    super(message, {
      stack
    });
    this.formError = message;
    this.name = "FormError";
    this.fields = fields || Object.fromEntries(typeof form !== "undefined" ? form.entries() : []) || {};
    this.fieldErrors = fieldErrors;
  }
}

let FormImpl = _props => {
  let [props, rest] = splitProps(mergeProps({
    reloadDocument: false,
    replace: false,
    method: "post",
    action: "/",
    encType: "application/x-www-form-urlencoded"
  }, _props), ["reloadDocument", "replace", "method", "action", "encType", "onSubmission", "onSubmit", "children", "ref"]);
  let formMethod = props.method.toLowerCase() === "get" ? "get" : "post";
  return ssrElement("form", mergeProps({
    method: formMethod,
    get action() {
      return _props.action;
    },
    get enctype() {
      return props.encType;
    }
  }, rest), () => escape(props.children), true);
};

const ServerContext = createContext({});
const useRequest = () => {
  return useContext(ServerContext);
};

const Routes = Routes$1;

const resources = new Set();
function refetchRouteData(key) {
  return startTransition(() => {
    for (let refetch of resources) refetch(key);
  });
}

function createRouteAction(fn, options = {}) {
  let init = checkFlash(fn);
  const [input, setInput] = createSignal(init.input);
  const [result, setResult] = createSignal(init.result);
  const navigate = useNavigate();
  const event = useRequest();
  let count = 0;
  function submit(variables) {
    const p = fn(variables, event);
    const reqId = ++count;
    batch(() => {
      setResult(undefined);
      setInput(() => variables);
    });
    return p.then(async data => {
      if (reqId === count) {
        if (data instanceof Response) {
          await handleResponse(data, navigate, options);
        } else await handleRefetch(data, options);
        if (!data || isRedirectResponse(data)) setInput(undefined);else setResult({
          data
        });
      }
      return data;
    }).catch(async e => {
      if (reqId === count) {
        if (e instanceof Response) {
          await handleResponse(e, navigate, options);
        }
        if (!isRedirectResponse(e)) {
          setResult({
            error: e
          });
        } else setInput(undefined);
      }
      return undefined;
    });
  }
  submit.url = fn.url;
  submit.Form = props => {
    let url = fn.url;
    return createComponent(FormImpl, mergeProps(props, {
      action: url,
      onSubmission: submission => {
        submit(submission.formData);
      },
      get children() {
        return props.children;
      }
    }));
  };
  return [{
    get pending() {
      return !!input() && !result();
    },
    get input() {
      return input();
    },
    get result() {
      return result()?.data;
    },
    get error() {
      return result()?.error;
    },
    clear() {
      batch(() => {
        setInput(undefined);
        setResult(undefined);
      });
    },
    retry() {
      const variables = input();
      if (!variables) throw new Error("No submission to retry");
      submit(variables);
    }
  }, submit];
}
function handleRefetch(response, options = {}) {
  return refetchRouteData(typeof options.invalidate === "function" ? options.invalidate(response) : options.invalidate);
}
function handleResponse(response, navigate, options) {
  if (response instanceof Response && isRedirectResponse(response)) {
    const locationUrl = response.headers.get("Location") || "/";
    if (locationUrl.startsWith("http")) {
      window.location.href = locationUrl;
    } else {
      navigate(locationUrl);
    }
  }
  return handleRefetch(response, options);
}
function checkFlash(fn) {
  const [params] = useSearchParams();
  let param = params.form ? JSON.parse(params.form) : null;
  if (!param || param.url !== fn.url) {
    return {};
  }
  const input = new Map(param.entries);
  return {
    result: {
      error: param.error ? new FormError(param.error.message, {
        fieldErrors: param.error.fieldErrors,
        stack: param.error.stack,
        form: param.error.form,
        fields: param.error.fields
      }) : undefined
    },
    input: input
  };
}

const server$ = (_fn) => {
  throw new Error("Should be compiled away");
};
async function parseRequest(event) {
  let request = event.request;
  let contentType = request.headers.get(ContentTypeHeader);
  let name = new URL(request.url).pathname, args = [];
  if (contentType) {
    if (contentType === JSONResponseType) {
      let text = await request.text();
      try {
        args = JSON.parse(text, (key, value) => {
          if (!value) {
            return value;
          }
          if (value.$type === "headers") {
            let headers = new Headers();
            request.headers.forEach((value2, key2) => headers.set(key2, value2));
            value.values.forEach(([key2, value2]) => headers.set(key2, value2));
            return headers;
          }
          if (value.$type === "request") {
            return new Request(value.url, {
              method: value.method,
              headers: value.headers
            });
          }
          return value;
        });
      } catch (e) {
        throw new Error(`Error parsing request body: ${text}`);
      }
    } else if (contentType.includes("form")) {
      let formData = await request.clone().formData();
      args = [formData, event];
    }
  }
  return [name, args];
}
function respondWith(request, data, responseType) {
  if (data instanceof ResponseError) {
    data = data.clone();
  }
  if (data instanceof Response) {
    if (isRedirectResponse(data) && request.headers.get(XSolidStartOrigin) === "client") {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartLocationHeader, data.headers.get(LocationHeader));
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(null, {
        status: 204,
        statusText: "Redirected",
        headers
      });
    } else if (data.status === 101) {
      return data;
    } else {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(data.body, {
        status: data.status,
        statusText: data.statusText,
        headers
      });
    }
  } else if (data instanceof FormError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: "",
          formError: data.formError,
          fields: data.fields,
          fieldErrors: data.fieldErrors
        }
      }),
      {
        status: 400,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "form-error"
        }
      }
    );
  } else if (data instanceof ServerError) {
    return new Response(
      JSON.stringify({
        error: {
          message: data.message,
          stack: ""
        }
      }),
      {
        status: data.status,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "server-error"
        }
      }
    );
  } else if (data instanceof Error) {
    console.error(data);
    return new Response(
      JSON.stringify({
        error: {
          message: "Internal Server Error",
          stack: "",
          status: data.status
        }
      }),
      {
        status: data.status || 500,
        headers: {
          [XSolidStartResponseTypeHeader]: responseType,
          [XSolidStartContentTypeHeader]: "error"
        }
      }
    );
  } else if (typeof data === "object" || typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        [ContentTypeHeader]: "application/json",
        [XSolidStartResponseTypeHeader]: responseType,
        [XSolidStartContentTypeHeader]: "json"
      }
    });
  }
  return new Response("null", {
    status: 200,
    headers: {
      [ContentTypeHeader]: "application/json",
      [XSolidStartContentTypeHeader]: "json",
      [XSolidStartResponseTypeHeader]: responseType
    }
  });
}
async function handleServerRequest(event) {
  const url = new URL(event.request.url);
  if (server$.hasHandler(url.pathname)) {
    try {
      let [name, args] = await parseRequest(event);
      let handler = server$.getHandler(name);
      if (!handler) {
        throw {
          status: 404,
          message: "Handler Not Found for " + name
        };
      }
      const data = await handler.call(event, ...Array.isArray(args) ? args : [args]);
      return respondWith(event.request, data, "return");
    } catch (error) {
      return respondWith(event.request, error, "throw");
    }
  }
  return null;
}
const handlers = /* @__PURE__ */ new Map();
server$.createHandler = (_fn, hash, serverResource) => {
  let fn = function(...args) {
    let ctx;
    if (typeof this === "object") {
      ctx = this;
    } else if (sharedConfig.context && sharedConfig.context.requestContext) {
      ctx = sharedConfig.context.requestContext;
    } else {
      ctx = {
        request: new URL(hash, "http://localhost:3000").href,
        responseHeaders: new Headers()
      };
    }
    const execute = async () => {
      try {
        return serverResource ? _fn.call(ctx, args[0], ctx) : _fn.call(ctx, ...args);
      } catch (e) {
        if (e instanceof Error && /[A-Za-z]+ is not defined/.test(e.message)) {
          const error = new Error(
            e.message + "\n You probably are using a variable defined in a closure in your server function."
          );
          error.stack = e.stack;
          throw error;
        }
        throw e;
      }
    };
    return execute();
  };
  fn.url = hash;
  fn.action = function(...args) {
    return fn.call(this, ...args);
  };
  return fn;
};
server$.registerHandler = function(route, handler) {
  handlers.set(route, handler);
};
server$.getHandler = function(route) {
  return handlers.get(route);
};
server$.hasHandler = function(route) {
  return handlers.has(route);
};
server$.fetch = internalFetch;

const inlineServerFunctions = ({ forward }) => {
  return async (event) => {
    const url = new URL(event.request.url);
    if (server$.hasHandler(url.pathname)) {
      let contentType = event.request.headers.get(ContentTypeHeader);
      let origin = event.request.headers.get(XSolidStartOrigin);
      let formRequestBody;
      if (contentType != null && contentType.includes("form") && !(origin != null && origin.includes("client"))) {
        let [read1, read2] = event.request.body.tee();
        formRequestBody = new Request(event.request.url, {
          body: read2,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
        event.request = new Request(event.request.url, {
          body: read1,
          headers: event.request.headers,
          method: event.request.method,
          duplex: "half"
        });
      }
      let serverFunctionEvent = Object.freeze({
        request: event.request,
        clientAddress: event.clientAddress,
        locals: event.locals,
        fetch: internalFetch,
        $type: FETCH_EVENT,
        env: event.env
      });
      const serverResponse = await handleServerRequest(serverFunctionEvent);
      let responseContentType = serverResponse.headers.get(XSolidStartContentTypeHeader);
      if (formRequestBody && responseContentType !== null && responseContentType.includes("error")) {
        const formData = await formRequestBody.formData();
        let entries = [...formData.entries()];
        return new Response(null, {
          status: 302,
          headers: {
            Location: new URL(event.request.headers.get("referer") || "").pathname + "?form=" + encodeURIComponent(
              JSON.stringify({
                url: url.pathname,
                entries,
                ...await serverResponse.json()
              })
            )
          }
        });
      }
      return serverResponse;
    }
    const response = await forward(event);
    return response;
  };
};

function renderAsync(fn, options) {
  return () => apiRoutes({
    forward: inlineServerFunctions({
      async forward(event) {
        let pageEvent = createPageEvent(event);
        let markup = await renderToStringAsync(() => fn(pageEvent), options);
        if (pageEvent.routerContext && pageEvent.routerContext.url) {
          return redirect(pageEvent.routerContext.url, {
            headers: pageEvent.responseHeaders
          });
        }
        markup = handleIslandsRouting(pageEvent, markup);
        return new Response(markup, {
          status: pageEvent.getStatusCode(),
          headers: pageEvent.responseHeaders
        });
      }
    })
  });
}
function createPageEvent(event) {
  let responseHeaders = new Headers({
    "Content-Type": "text/html"
  });
  const prevPath = event.request.headers.get("x-solid-referrer");
  let statusCode = 200;
  function setStatusCode(code) {
    statusCode = code;
  }
  function getStatusCode() {
    return statusCode;
  }
  const pageEvent = Object.freeze({
    request: event.request,
    prevUrl: prevPath || "",
    routerContext: {},
    tags: [],
    env: event.env,
    clientAddress: event.clientAddress,
    locals: event.locals,
    $type: FETCH_EVENT,
    responseHeaders,
    setStatusCode,
    getStatusCode,
    fetch: internalFetch
  });
  return pageEvent;
}
function handleIslandsRouting(pageEvent, markup) {
  return markup;
}

const MetaContext = createContext();
const cascadingTags = ["title", "meta"];
const getTagType = tag => tag.tag + (tag.name ? `.${tag.name}"` : "");
const MetaProvider = props => {
  const cascadedTagInstances = new Map();
  const actions = {
    addClientTag: tag => {
      let tagType = getTagType(tag);
      if (cascadingTags.indexOf(tag.tag) !== -1) {
        //  only cascading tags need to be kept as singletons
        if (!cascadedTagInstances.has(tagType)) {
          cascadedTagInstances.set(tagType, []);
        }
        let instances = cascadedTagInstances.get(tagType);
        let index = instances.length;
        instances = [...instances, tag];
        // track indices synchronously
        cascadedTagInstances.set(tagType, instances);
        return index;
      }
      return -1;
    },
    removeClientTag: (tag, index) => {
      const tagName = getTagType(tag);
      if (tag.ref) {
        const t = cascadedTagInstances.get(tagName);
        if (t) {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
            for (let i = index - 1; i >= 0; i--) {
              if (t[i] != null) {
                document.head.appendChild(t[i].ref);
              }
            }
          }
          t[index] = null;
          cascadedTagInstances.set(tagName, t);
        } else {
          if (tag.ref.parentNode) {
            tag.ref.parentNode.removeChild(tag.ref);
          }
        }
      }
    }
  };
  {
    actions.addServerTag = tagDesc => {
      const {
        tags = []
      } = props;
      // tweak only cascading tags
      if (cascadingTags.indexOf(tagDesc.tag) !== -1) {
        const index = tags.findIndex(prev => {
          const prevName = prev.props.name || prev.props.property;
          const nextName = tagDesc.props.name || tagDesc.props.property;
          return prev.tag === tagDesc.tag && prevName === nextName;
        });
        if (index !== -1) {
          tags.splice(index, 1);
        }
      }
      tags.push(tagDesc);
    };
    if (Array.isArray(props.tags) === false) {
      throw Error("tags array should be passed to <MetaProvider /> in node");
    }
  }
  return createComponent(MetaContext.Provider, {
    value: actions,
    get children() {
      return props.children;
    }
  });
};
const MetaTag = (tag, props) => {
  const id = createUniqueId();
  const c = useContext(MetaContext);
  if (!c) throw new Error("<MetaProvider /> should be in the tree");
  useHead({
    tag,
    props,
    id,
    get name() {
      return props.name || props.property;
    }
  });
  return null;
};
function useHead(tagDesc) {
  const {
    addClientTag,
    removeClientTag,
    addServerTag
  } = useContext(MetaContext);
  createRenderEffect(() => {
    if (!isServer) ;
  });
  {
    addServerTag(tagDesc);
    return null;
  }
}
function renderTags(tags) {
  return tags.map(tag => {
    const keys = Object.keys(tag.props);
    const props = keys.map(k => k === "children" ? "" : ` ${k}="${tag.props[k]}"`).join("");
    return tag.props.children ? `<${tag.tag} data-sm="${tag.id}"${props}>${
    // Tags might contain multiple text children:
    //   <Title>example - {myCompany}</Title>
    Array.isArray(tag.props.children) ? tag.props.children.join("") : tag.props.children}</${tag.tag}>` : `<${tag.tag} data-sm="${tag.id}"${props}/>`;
  }).join("");
}
const Title = props => MetaTag("title", props);
const Meta$1 = props => MetaTag("meta", props);

const _tmpl$$9 = ["<div", " style=\"", "\"><div style=\"", "\"><p style=\"", "\" id=\"error-message\">", "</p><button id=\"reset-errors\" style=\"", "\">Clear errors and retry</button><pre style=\"", "\">", "</pre></div></div>"];
function ErrorBoundary(props) {
  return createComponent(ErrorBoundary$1, {
    fallback: (e, reset) => {
      return createComponent(Show, {
        get when() {
          return !props.fallback;
        },
        get fallback() {
          return props.fallback && props.fallback(e, reset);
        },
        get children() {
          return createComponent(ErrorMessage, {
            error: e
          });
        }
      });
    },
    get children() {
      return props.children;
    }
  });
}
function ErrorMessage(props) {
  return ssr(_tmpl$$9, ssrHydrationKey(), "padding:" + "16px", "background-color:" + "rgba(252, 165, 165)" + (";color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";overflow:" + "scroll") + (";padding:" + "16px") + (";margin-bottom:" + "8px"), "font-weight:" + "bold", escape(props.error.message), "color:" + "rgba(252, 165, 165)" + (";background-color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";padding:" + "4px 8px"), "margin-top:" + "8px" + (";width:" + "100%"), escape(props.error.stack));
}

const routeLayouts = {
  "/*404": {
    "id": "/*404",
    "layouts": []
  },
  "/about": {
    "id": "/about",
    "layouts": []
  },
  "/dashboard": {
    "id": "/dashboard",
    "layouts": []
  },
  "/": {
    "id": "/",
    "layouts": []
  }
};

const _tmpl$$8 = ["<link", " rel=\"stylesheet\"", ">"],
  _tmpl$2 = ["<link", " rel=\"modulepreload\"", ">"];
function flattenIslands(match, manifest) {
  let result = [...match];
  match.forEach(m => {
    if (m.type !== "island") return;
    const islandManifest = manifest[m.href];
    if (islandManifest) {
      const res = flattenIslands(islandManifest.assets, manifest);
      result.push(...res);
    }
  });
  return result;
}
function getAssetsFromManifest(manifest, routerContext) {
  let match = routerContext.matches ? routerContext.matches.reduce((memo, m) => {
    if (m.length) {
      const fullPath = m.reduce((previous, match) => previous + match.originalPath, "");
      const route = routeLayouts[fullPath];
      if (route) {
        memo.push(...(manifest[route.id] || []));
        const layoutsManifestEntries = route.layouts.flatMap(manifestKey => manifest[manifestKey] || []);
        memo.push(...layoutsManifestEntries);
      }
    }
    return memo;
  }, []) : [];
  match.push(...(manifest["entry-client"] || []));
  match = manifest ? flattenIslands(match, manifest) : [];
  const links = match.reduce((r, src) => {
    r[src.href] = src.type === "style" ? ssr(_tmpl$$8, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : src.type === "script" ? ssr(_tmpl$2, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : undefined;
    return r;
  }, {});
  return Object.values(links);
}

/**
 * Links are used to load assets for the server rendered HTML
 * @returns {JSXElement}
 */
function Links() {
  const context = useContext(ServerContext);
  useAssets(() => getAssetsFromManifest(context.env.manifest, context.routerContext));
  return null;
}

function Meta() {
  const context = useContext(ServerContext);
  // @ts-expect-error The ssr() types do not match the Assets child types
  useAssets(() => ssr(renderTags(context.tags)));
  return null;
}

const _tmpl$4 = ["<script", " type=\"module\" async", "></script>"];
const isDev = "production" === "development";
const isIslands = false;
function Scripts() {
  const context = useContext(ServerContext);
  return [createComponent(HydrationScript, {}), isIslands , createComponent(NoHydration, {
    get children() {
      return (      ssr(_tmpl$4, ssrHydrationKey(), ssrAttribute("src", escape(context.env.manifest["entry-client"][0].href, true), false)) );
    }
  }), isDev ];
}

function Html(props) {
  {
    return ssrElement("html", props, undefined, false);
  }
}
function Head(props) {
  {
    return ssrElement("head", props, () => [props.children, createComponent(Meta, {}), createComponent(Links, {})], false);
  }
}
function Body(props) {
  {
    return ssrElement("body", props, () => props.children , false);
  }
}

function HttpStatusCode(props) {
  const context = useContext(ServerContext);
  {
    context.setStatusCode(props.code);
  }
  onCleanup(() => {
    {
      context.setStatusCode(200);
    }
  });
  return null;
}

const _tmpl$$7 = ["<main", "><!--#-->", "<!--/--><!--#-->", "<!--/--><h1>Page Not Found</h1><p>Visit <a href=\"https://start.solidjs.com\" target=\"_blank\">start.solidjs.com</a> to learn how to build SolidStart apps.</p></main>"];
function NotFound() {
  return ssr(_tmpl$$7, ssrHydrationKey(), escape(createComponent(Title, {
    children: "Not Found"
  })), escape(createComponent(HttpStatusCode, {
    code: 404
  })));
}

const _tmpl$$6 = ["<h1", ">About Page</h1>"];
function About() {
  return ssr(_tmpl$$6, ssrHydrationKey());
}

const Image$1 = styled("img")`
  width: 100%;
  height: 100%;
`;
const SpaceMissionHelmet = () => {
  return createComponent(Image$1, {
    src: "https://ik.imagekit.io/csu76xuqqlwj/nerds-who-sell/projects/space-mission/space-mission-logo_b9B98nvMW.png?ik-sdk-version=javascript-1.4.3",
    alt: "Space Mission space helmet",
    title: "Space Mission",
    width: 138,
    height: 148
  });
};

const _tmpl$$5 = ["<svg", " viewBox=\"0 0 176 30\"", " xmlns=\"http://www.w3.org/2000/svg\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"2\"><path id=\"space-mission-container\" fill=\"none\" d=\"M0 0h175.438v29.877H0z\"></path><g style=\"", "\" id=\"space\" fill-rule=\"nonzero\"><path d=\"M13.769 13.722c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-1.442c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442H3.674a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443H2.232a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h2.884c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h5.769a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442H3.674a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442H2.232a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h8.653c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h1.442c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443h-2.884a6.369 6.369 0 0 1-.145-1.443c0-.576.049-1.057.145-1.442H5.116c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h7.211c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442Z\"></path><path d=\"M28.334 15.164c0 .553-.048 1.034-.144 1.442h-1.442c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-1.442c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-5.769c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442h-2.884a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h2.884c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442h1.442c.097.384.145.865.145 1.442 0 .553-.048 1.033-.145 1.442h-1.442c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h4.327a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442h1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.442a6.303 6.303 0 0 1-.145-1.442c0-.577.048-1.058.145-1.442h-2.885a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h4.327c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.385.144.865.144 1.442Z\"></path><path d=\"M42.611 19.49c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-2.884a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.442a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442h-4.327c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h4.327c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-5.769a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h5.769a6.36 6.36 0 0 1-.145-1.442c0-.577.049-1.058.145-1.442h-5.048a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h6.49c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h1.442Z\"></path><path d=\"M57.032 16.606c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442H55.59c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-7.211a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h7.211c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h-2.884a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-4.327c.097.384.145.865.145 1.442 0 .553-.048 1.033-.145 1.442h-1.442c.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442h1.442c.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442h4.327a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h2.884Z\"></path><path d=\"M71.597 12.28c0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-7.571c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h6.129c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442H62.8a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.802a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.082a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h1.082a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442H62.8a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h7.211c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.384.144.865.144 1.442Zm-3.028 1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-4.687c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h4.687Z\"></path></g><g style=\"", "\" id=\"mission\" fill-rule=\"nonzero\"><path d=\"M86.733 5.069c.096.385.145.866.145 1.442 0 .553-.049 1.034-.145 1.443.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442.096.385.145.866.145 1.443 0 .552-.049 1.033-.145 1.442h-2.884a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-1.081c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h-.721c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-2.164a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-.721a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-1.081c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-2.884a6.309 6.309 0 0 1-.145-1.442c0-.577.048-1.058.145-1.443a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442a6.303 6.303 0 0 1-.145-1.442c0-.577.048-1.058.145-1.442a6.303 6.303 0 0 1-.145-1.442c0-.577.048-1.058.145-1.442a6.312 6.312 0 0 1-.145-1.443c0-.576.048-1.057.145-1.442a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442h3.605c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h1.081c.096.385.145.866.145 1.442 0 .553-.049 1.034-.145 1.443h.541c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.082a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h.541a6.312 6.312 0 0 1-.145-1.443c0-.576.048-1.057.145-1.442h1.081a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h3.605c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442Z\"></path><path d=\"M98.991 19.49c.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-7.21a6.366 6.366 0 0 1-.145-1.442c0-.577.049-1.058.145-1.443h2.163a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h-2.163a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442h7.21c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-2.163c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h2.163Z\"></path><path d=\"M115.575 13.722c.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442h-1.442c.096.385.145.866.145 1.443 0 .552-.049 1.033-.145 1.442h-8.652a6.366 6.366 0 0 1-.145-1.442c0-.577.049-1.058.145-1.443h-1.442a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442h2.884c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h5.768a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-7.21a6.36 6.36 0 0 1-.145-1.442c0-.577.049-1.058.145-1.442h-1.442a6.303 6.303 0 0 1-.145-1.442c0-.577.048-1.058.145-1.442a6.312 6.312 0 0 1-.145-1.443c0-.576.048-1.057.145-1.442h1.442a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442h8.652c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h1.442c.097.385.145.866.145 1.442 0 .553-.048 1.034-.145 1.443h-2.884a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h-5.768c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h7.21c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442h1.442Z\"></path><path d=\"M129.996 13.722c.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442h-1.442c.096.385.145.866.145 1.443 0 .552-.049 1.033-.145 1.442h-8.652a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.442a6.297 6.297 0 0 1-.145-1.442c0-.577.048-1.057.145-1.442h2.884c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h5.768a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-7.21a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-1.442a6.303 6.303 0 0 1-.145-1.442c0-.577.048-1.058.145-1.442a6.312 6.312 0 0 1-.145-1.443c0-.576.048-1.057.145-1.442h1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h8.652c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h1.442c.097.385.145.866.145 1.442 0 .553-.048 1.034-.145 1.443h-2.884a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h-5.768c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h7.21c.096.384.145.865.145 1.442a6.36 6.36 0 0 1-.145 1.442h1.442Z\"></path><path d=\"M142.254 19.49c.096.385.145.866.145 1.443 0 .552-.049 1.033-.145 1.442h-7.21a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h2.163a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h-2.163a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h7.21c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h-2.163c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h2.163Z\"></path><path d=\"M158.839 10.838c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-1.082c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h-1.803c.096.385.145.866.145 1.443 0 .552-.049 1.033-.145 1.442h-5.768a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.803a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.081a6.353 6.353 0 0 1-.145-1.442c0-.577.049-1.057.145-1.442a6.36 6.36 0 0 1-.145-1.442c0-.577.049-1.058.145-1.442a6.36 6.36 0 0 1-.145-1.442c0-.577.049-1.058.145-1.442h1.081a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h1.803a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h5.768c.096.385.145.865.145 1.442 0 .553-.049 1.034-.145 1.442h1.803c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443h1.082c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442Zm-2.885 5.768a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-1.081a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442h-3.606c.097.385.145.866.145 1.442 0 .553-.048 1.034-.145 1.443h-1.081c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h1.081c.097.385.145.865.145 1.442 0 .553-.048 1.034-.145 1.442h3.606a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h1.081Z\"></path><path d=\"M173.26 5.069c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-2.885a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443h-1.802a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.082a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442h-1.442c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442.096.385.144.866.144 1.443a6.37 6.37 0 0 1-.144 1.442h-2.884a6.37 6.37 0 0 1-.144-1.442c0-.577.048-1.058.144-1.443a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h3.605c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442h1.082c.096.385.144.866.144 1.442 0 .553-.048 1.034-.144 1.443h1.081c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442c.096.384.144.865.144 1.442 0 .553-.048 1.033-.144 1.442h1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.364 6.364 0 0 1-.144-1.442c0-.577.048-1.058.144-1.442a6.373 6.373 0 0 1-.144-1.443c0-.576.048-1.057.144-1.442a6.358 6.358 0 0 1-.144-1.442c0-.577.048-1.057.144-1.442h2.885c.096.385.144.865.144 1.442 0 .553-.048 1.034-.144 1.442Z\"></path></g></svg>"];
const SpaceMission = props => {
  return ssr(_tmpl$$5, ssrHydrationKey(), ssrAttribute("width", escape(props.width, true), false) + ssrAttribute("height", escape(props.height, true), false), "fill:" + "var(--logo-color, #f8f8f8)", "fill:" + "var(--logo-color, #f8f8f8)");
};

const Container$f = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 20px;
  justify-items: center;
  width: 224px;
`;
const HelmetContianer = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  width: 50%;
  isolation: isolate;

  & img {
    width: 100px;
  }
`;
const MissionText$1 = styled("div")`
  width: 100%;
`;
const HelmetShadow = styled("div")`
  position: absolute;
  bottom: 0;
  left: 50%;
  background-color: #000;
  width: 40px;
  height: 40px;
  filter: blur(6px);
  transform: translate(-50%, 0px);
  z-index: -1;
`;
const BlueGalaxy$1 = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--accent-teal);
  width: 44px;
  height: 44px;
  filter: blur(30px);
  opacity: 0.6;
  z-index: -1;
`;
const PinkGalaxy$1 = styled("div")`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--accent-pink);
  width: 44px;
  height: 44px;
  filter: blur(30px);
  z-index: -1;
`;
const SpaceMissionLogo = () => {
  return createComponent(Container$f, {
    get children() {
      return [createComponent(HelmetContianer, {
        get children() {
          return [createComponent(SpaceMissionHelmet, {}), createComponent(HelmetShadow, {}), createComponent(BlueGalaxy$1, {}), createComponent(PinkGalaxy$1, {})];
        }
      }), createComponent(MissionText$1, {
        get children() {
          return createComponent(SpaceMission, {});
        }
      })];
    }
  });
};

const Container$e = styled("header")`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const Header = () => {
  return createComponent(Container$e, {
    get children() {
      return createComponent(SpaceMissionLogo, {});
    }
  });
};

const Container$d = styled("div")`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-blue);
  border-radius: 12px;
  width: 100%;
  max-width: 300px;
`;
const BaseCard = props => {
  const child = children(() => props.children);
  return createComponent(Container$d, {
    get children() {
      return child();
    }
  });
};

const _tmpl$$4 = ["<svg", " viewBox=\"0 0 240 192\" xmlns=\"http://www.w3.org/2000/svg\"", " fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"2\"><path fill=\"none\" d=\"M0 0h239.894v191.422H0z\"></path><circle cx=\"119.782\" cy=\"116.574\" r=\"32.065\" fill=\"var(--camera-color, var(--accent-purple))\"></circle><path d=\"M214.799 36.559h-32.313V19.863c0-9.886-8.014-17.899-17.899-17.899h-89.61c-9.886 0-17.899 8.013-17.899 17.899v16.696H24.765c-12.804 0-23.184 10.38-23.184 23.183v106.429c0 12.805 10.38 23.183 23.184 23.183h190.034c12.804 0 23.183-10.378 23.183-23.183V59.742c0-12.803-10.379-23.183-23.183-23.183Zm-95.018 25.96c29.833 0 54.053 24.22 54.053 54.055 0 29.832-24.22 54.053-54.053 54.053s-54.054-24.221-54.054-54.053c0-29.835 24.221-54.055 54.054-54.055Zm105.09 0c0 7.165-5.809 12.973-12.973 12.973-7.166 0-12.973-5.808-12.973-12.973 0-7.166 5.807-12.974 12.973-12.974 7.164 0 12.973 5.808 12.973 12.974Z\" fill=\"var(--cameria-color, var(--accent-purple))\" fill-rule=\"nonzero\"></path></svg>"];
const ImageUploadIcon = props => {
  return ssr(_tmpl$$4, ssrHydrationKey(), ssrAttribute("width", escape(props.width, true), false) + ssrAttribute("height", escape(props.height, true), false));
};

const ImageInputContainer = styled("div")`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 300px;
  isolation: isolate;
  overflow: hidden;
`;
const ImageInput = styled("input")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
`;
const ContentContainer$1 = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 20px;
  justify-items: center;
  width: 100%;
`;
const UploadIcon = styled("div")`
  width: 140px;
`;
const LabelContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 12px;
  justify-items: center;
  width: 100%;
`;
const Label$4 = styled("p")`
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--accent-purple);
`;
const ImagePreview = styled("img")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  border-radius: 12px;
  width: 200px;
  height: 200px;
  object-fit: cover;
  visibility: var(--image-preview-visibility, hidden);
`;
const ImageUploadInput = props => {
  const [showAvatarPreview, setShowAvatarPreview] = createSignal(false);
  const updateShowAvatarPreview = state => {
    setShowAvatarPreview(state);
  };
  let imageRef;
  onCleanup(() => {
    updateShowAvatarPreview(false);
  });
  const handleDragEnter = event => {
    event.stopPropagation();
    event.preventDefault();
  };
  const handleDragOver = event => {
    event.stopPropagation();
    event.preventDefault();
  };
  const handleDrop = event => {
    event.stopPropagation();
    event.preventDefault();
    const data = event.dataTransfer;
    if (!data) {
      return;
    }
    const file = data.files;
    // props.updateAvatarFileList(file);
    updateShowAvatarPreview(true);
    handleFiles(file);
  };
  const handlePhotoSelect = e => {
    e.preventDefault();
    updateShowAvatarPreview(false);
    imageRef.src = "";
    const inputElement = e.currentTarget;
    const data = inputElement.files;
    const file = data;
    if (file.length > 0) {
      // props.updateAvatarFileList(file);
      updateShowAvatarPreview(true);
      handleFiles(file);
    }
  };
  const handleFiles = fileList => {
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target) {
        imageRef.src = e.target?.result;
      }
    };
    if (fileList) {
      reader.readAsDataURL(fileList[0]);
    }
    return;
  };
  const styles = createMemo(() => ({
    "--image-preview-visibility": showAvatarPreview() ? "show" : "hidden"
  }));
  return createComponent(ImageInputContainer, {
    get style() {
      return styles();
    },
    get children() {
      return [createComponent(ImagePreview, {
        src: "",
        alt: "Image Preview"
      }), createComponent(ImageInput, {
        id: "avatarImage",
        name: "avatarImage",
        type: "file",
        accept: "image/*",
        onInput: handlePhotoSelect,
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDrop: handleDrop
      }), showAvatarPreview() ? null : createComponent(ContentContainer$1, {
        get children() {
          return [createComponent(UploadIcon, {
            get children() {
              return createComponent(ImageUploadIcon, {});
            }
          }), createComponent(LabelContainer, {
            get children() {
              return [createComponent(Label$4, {
                children: "Click the Camera"
              }), createComponent(Label$4, {
                children: "Or..."
              }), createComponent(Label$4, {
                children: "Drag & Drop Image"
              })];
            }
          })];
        }
      })];
    }
  });
};

const Button$3 = styled("button")`
  padding: 6px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--dark-blue);
  background-color: var(--button-background-color, var(--accent-pink));
  border-radius: 12px;
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  cursor: var(--button-cursor);
  transition: box-shadow, background-color, 300ms ease-in-out;
  &:focus {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
  &:hover {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
`;
const FormButton = props => {
  const child = children(() => props.children);
  const styles = createMemo(() => ({
    "--button-background-color": props.isValid ? "var(--accent-pink)" : "var(--base-blue)",
    "--button-cursor": props.isValid ? "pointer" : "not-allowed"
  }));
  return createComponent(Button$3, {
    type: "submit",
    get style() {
      return styles();
    },
    get disabled() {
      return !props.isValid;
    },
    get children() {
      return child();
    }
  });
};

const [user, setUser] = createSignal({
  userId: "",
  emailAddress: "",
  activeMission: "",
  finishedMissions: [],
  callsign: "",
  avatar: ""
});
const updateUser = (user2) => {
  setUser(user2);
};

const Container$c = styled("div")`
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
  width: 300px;
`;
const ButtonContainer$3 = styled("div")`
  width: 260px;
`;
const ImageUploadForm = () => {
  const [_, {
    Form
  }] = createRouteAction(async formData => {
    const avatarImage = formData.get("avatarImage");
    console.log(avatarImage);

    // Hit Cloudflare

    // if (email) {
    //   const user: UserDoc = {
    //     userId: "123456",
    //     activeMission: "",
    //     callsign: "Maverick",
    //     avatar: "",
    //     emailAddress: email as string,
    //     finishedMissions: [],
    //   };

    //   updateUser(user);
    // }
  });

  return createComponent(Form, {
    get children() {
      return createComponent(Container$c, {
        get children() {
          return [createComponent(ImageUploadInput, {}), createComponent(ButtonContainer$3, {
            get children() {
              return createComponent(FormButton, {
                isValid: true,
                children: "Save Space Avatar"
              });
            }
          })];
        }
      });
    }
  });
};

const draw = (progress) => ({
  strokeDashoffset: 1 - progress,
  visibility: "visible"
});
const drawCheck = (progress) => {
  return {
    strokeDashoffset: 1 - progress * -1,
    visibility: "visible",
    opacity: progress === 0 ? 0 : 1
  };
};
const drawCircleGraph = (path, value, duration, kill) => {
  const valueLevel = value / 10;
  const ani = animate(path, draw(valueLevel), {
    duration,
    easing: "linear"
  });
  if (kill) {
    ani.cancel();
  } else {
    ani.play();
  }
};
const checkmarkOn = (checkPath, kill) => {
  const check = animate(checkPath, drawCheck(1), {
    duration: 0.3,
    easing: "ease-in-out"
  });
  if (kill) {
    check.cancel();
  } else {
    check.play();
  }
};
const checkmarkOff = (checkPath, kill) => {
  const check = animate(checkPath, drawCheck(0), {
    duration: 0.3,
    easing: "ease-in-out"
  });
  if (kill) {
    check.cancel();
  } else {
    check.play();
  }
};

const IconContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  width: var(--icon-size);
  height: var(--icon-size);
`;
const XCross = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background: var(--close-icon-color, #f8f8f8);
  border-radius: 20px;
  width: calc((var(--icon-size) * 5) / 34);
  height: 100%;
  opacity: 0;
`;
const CloseIcon = props => {
  const styles = createMemo(() => ({
    "--icon-size": props.width ? `${props.width}px` : "34px"
  }));
  return createComponent(IconContainer, {
    get style() {
      return styles();
    },
    get children() {
      return [createComponent(XCross, {}), createComponent(XCross, {})];
    }
  });
};

const Container$b = styled("div")`
  /* position: var(--container-position); */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ClickLayer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 0%, 0.3);
  z-index: 1;
`;
const InstantTransition = props => {
  const child = children(() => props.children);
  const onEnter = (node, done) => {
    if (props.isOpen) {
      animate(node, {
        opacity: [0, 1]
      }, {
        duration: 0
      }).finished.then(() => done());
    }
  };
  const onExit = (node, done) => {
    if (!props.isOpen) {
      animate(node, {
        opacity: [1, 0]
      }, {
        duration: 0,
        delay: 0.4
      }).finished.then(() => done());
    }
  };
  const styles = createMemo(() => ({
    "--container-position": props.isMobileLayout ? "fixed" : "absolute"
  }));
  return createComponent(Transition, {
    onEnter: onEnter,
    onExit: onExit,
    get children() {
      return props.isOpen ? createComponent(Container$b, {
        get style() {
          return styles();
        },
        get children() {
          return [createComponent(ClickLayer, {
            get onPointerUp() {
              return props.handleClick;
            }
          }), props.isOpen ? child() : null];
        }
      }) : null;
    }
  });
};

const Dialog = styled("dialog")`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 12px;
  justify-items: end;
  background-color: var(--dark-blue);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  border-radius: 20px;
  width: fit-content;
  box-shadow: 0 4px 4px 1px hsla(0, 0%, 0%, 0.4), 0 0 0 4px var(--accent-purple);
  z-index: 2;
  overflow: hidden;
`;
const ContentContainer = styled("div")`
  position: relative;
  width: 100%;
  isolation: isolate;
`;
const CloseButton = styled("button")`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  z-index: 1;

  &:focus {
    outline-offset: 5px;
    outline-style: dashed;
    outline-width: 1px;
    outline-color: var(--light-2);
  }
`;
const MissionDetailsModal = props => {
  const child = children(() => props.children);
  return createComponent(InstantTransition, {
    get isOpen() {
      return props.isOpen;
    },
    get handleClick() {
      return props.closeOverlay;
    },
    isMobileLayout: false,
    get children() {
      return createComponent(Dialog, {
        get children() {
          return [createComponent(CloseButton, {
            type: "button",
            "aria-label": "Close button",
            get onClick() {
              return props.closeOverlay;
            },
            get children() {
              return createComponent(CloseIcon, {
                get isOpen() {
                  return props.isOpen;
                }
              });
            }
          }), createComponent(ContentContainer, {
            get children() {
              return child();
            }
          })];
        }
      });
    }
  });
};

const [isMissionOverlayOpen, setIsMissionOverlayOpen] = createSignal({
  isOpen: false,
  mission: "mars"
});
const toggleIsMissionOverlayOpen = (mission) => {
  setIsMissionOverlayOpen((prevValue) => ({
    isOpen: !prevValue.isOpen,
    mission
  }));
};
const closeIsOverlayOpen = () => {
  setIsMissionOverlayOpen(() => ({
    isOpen: false,
    mission: "mars"
  }));
};
const [isImageUploadOpen, setIsImageUploadOpen] = createSignal(false);
const toggleIsImageUploadOpen = () => {
  setIsImageUploadOpen((prevValue) => !prevValue);
};

const Button$2 = styled.button`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--accent-purple);
  border-radius: 50%;
  border: none;
  width: 60px;
  height: 60px;
  outline: none;
  cursor: pointer;
  box-shadow: 0 0 0 4px hsla(0, 0%, 0%, 0.4);
  transition: box-shadow, background-color, 300ms ease-in-out;

  &:focus {
    background-color: var(--accent-teal);
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
  &:hover {
    background-color: var(--accent-teal);
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
`;

// TODO - toggle overlay to update the avatar for the astronaught
const AvatarButton = () => {
  // TODO - Create an image input you can toss in the modal
  const handleChangeAvatar = () => {
    console.log("Overly image input and use Cloudflare workers to update image");
    toggleIsImageUploadOpen();
  };
  return [createComponent(Button$2, {
    type: "button",
    "aria-label": "Avatar Image Button",
    onClick: handleChangeAvatar,
    get children() {
      return createComponent(SpaceMissionHelmet, {});
    }
  }), createComponent(Portal, {
    get children() {
      return createComponent(MissionDetailsModal, {
        get isOpen() {
          return isImageUploadOpen();
        },
        closeOverlay: toggleIsImageUploadOpen,
        get children() {
          return createComponent(ImageUploadForm, {});
        }
      });
    }
  })];
};

const capitalizeName = (name) => {
  const nameArray = name.split("");
  const firstChar = nameArray.shift()?.toUpperCase();
  if (firstChar) {
    nameArray.unshift(firstChar);
    const cappedName = nameArray.join("");
    return cappedName;
  } else {
    return "";
  }
};

const Container$a = styled("div")`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 20px;
  justify-items: start;
  align-items: center;
  width: 100%;
`;
const IdentityContainer$1 = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 4px;
  justify-items: start;
  width: 100%;
`;
const Label$3 = styled("p")`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--label-color, var(--accent-pink));
`;
const UserIdentityContent = () => {
  const formattedCallSign = createMemo(() => user().callsign.length > 0 ? capitalizeName(user().callsign) : "Rook");
  const dynamicStyles = createMemo(() => ({
    "--label-color": "var(--accent-purple)"
  }));
  return createComponent(Container$a, {
    get children() {
      return [createComponent(AvatarButton, {}), createComponent(IdentityContainer$1, {
        get children() {
          return [createComponent(Label$3, {
            children: "Astronaut Call Sign:"
          }), createComponent(Label$3, {
            get style() {
              return dynamicStyles();
            },
            get children() {
              return formattedCallSign();
            }
          })];
        }
      })];
    }
  });
};

const MissionImage = styled("div")`
  position: relative;
  background-color: var(--dark-blue);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 0 0 4px hsla(0, 0%, 0%, 0.4);
  overflow: hidden;
  isolation: isolate;
`;
const Image = styled("img")`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;
const ActiveMission = props => {
  return createComponent(MissionImage, {
    get children() {
      return createComponent(Image, {
        get src() {
          return props.imageUrl;
        },
        get alt() {
          return props.altTag;
        },
        get title() {
          return props.titleTag;
        }
      });
    }
  });
};

const _tmpl$$3 = ["<svg", " viewBox=\"0 0 57 209\"", " xmlns=\"http://www.w3.org/2000/svg\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linejoin=\"round\" stroke-miterlimit=\"2\"><path id=\"Artboard1\" fill=\"none\" d=\"M0 0h56.685v208.464H0z\"></path><path fill=\"var(--accent-teal)\" d=\"M14.119 145.403c-2.336-14.782-12.467-81.36-9.015-102.996 2.454-15.373 23.36-40.442 23.36-40.442s20.905 25.069 23.359 40.442c3.453 21.636-6.679 88.214-9.015 102.996 7.679 4.796 12.79 13.322 12.79 23.033 0 2.878-.449 5.652-1.28 8.255-3.497-10.315-13.757-17.791-25.854-17.791-12.098 0-22.357 7.476-25.854 17.791a27.071 27.071 0 0 1-1.281-8.255c0-9.711 5.112-18.237 12.79-23.033Z\"></path><path fill=\"var(--accent-teal)\" d=\"M28.464 205.924s11.073-23.255 11.073-33.222c0-6.111-4.962-11.073-11.073-11.073-6.112 0-11.074 4.962-11.074 11.073 0 9.967 11.074 33.222 11.074 33.222Zm0-18.258s5.487-11.524 5.487-16.463a5.49 5.49 0 0 0-5.487-5.488 5.49 5.49 0 0 0-5.488 5.488c0 4.939 5.488 16.463 5.488 16.463Z\"></path></svg>"];
const MissionPlaceholderIcon = props => {
  return ssr(_tmpl$$3, ssrHydrationKey(), ssrAttribute("width", escape(props.width, true), false) + ssrAttribute("height", escape(props.height, true), false));
};

const Container$9 = styled.div`
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--base-blue);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 0 0 4px hsla(0, 0%, 0%, 0.4);
  overflow: hidden;
`;
const Icon = styled("div")`
  width: 14px;
`;
const MissionPlaceholder = () => {
  return createComponent(Container$9, {
    get children() {
      return createComponent(Icon, {
        get children() {
          return createComponent(MissionPlaceholderIcon, {});
        }
      });
    }
  });
};
const [missionStats, setMissionStats] = createSignal({
  isGoal1Complete: false,
  isGoal2Complete: false,
  isGoal3Complete: false
});
const updateMissionStats = (completedMission) => {
  switch (completedMission) {
    case "missionGoal1": {
      setMissionStats((prevValue) => ({
        ...prevValue,
        isGoal1Complete: true
      }));
      break;
    }
    case "missionGoal2": {
      setMissionStats((prevValue) => ({
        ...prevValue,
        isGoal2Complete: true
      }));
      break;
    }
    case "missionGoal3": {
      setMissionStats((prevValue) => ({
        ...prevValue,
        isGoal3Complete: true
      }));
      break;
    }
  }
};
const resetMissionStats = () => {
  setMissionStats(() => ({
    isGoal1Complete: false,
    isGoal2Complete: false,
    isGoal3Complete: false
  }));
};
const [activeMissionData, setActiveMissionData] = createSignal({
  missionId: null,
  coverImage: "",
  altTag: "",
  titleTag: "",
  headline: "",
  description: "",
  difficulty: 0
});

const Container$8 = styled("div")`
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 20px;
  justify-items: start;
  align-items: center;
  width: 100%;
`;
const IdentityContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 4px;
  justify-items: start;
  width: 100%;
`;
const Label$2 = styled("p")`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--label-color, var(--accent-pink));
`;
const UserMissionContent = () => {
  const missionName = createMemo(() => user().activeMission.length > 0 ? capitalizeName(user().activeMission) : "No Active Mission");
  const styles = {
    "--label-color": "var(--accent-purple)"
  };
  return createComponent(Container$8, {
    get children() {
      return [createComponent(IdentityContainer, {
        get children() {
          return [createComponent(Label$2, {
            children: "Active Mission:"
          }), createComponent(Label$2, {
            style: styles,
            children: missionName
          })];
        }
      }), user().activeMission !== "" && activeMissionData().coverImage !== "" ? createComponent(ActiveMission, {
        get imageUrl() {
          return activeMissionData().coverImage;
        },
        get altTag() {
          return activeMissionData().altTag;
        },
        get titleTag() {
          return activeMissionData().titleTag;
        }
      }) : createComponent(MissionPlaceholder, {})];
    }
  });
};

const GoalDot = styled("div")`
  background-color: var(--dot-background-color);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  box-shadow: 0 0 0 2px var(--accent-blue);
`;
const GoalIndicator = props => {
  const styles = createMemo(() => ({
    "--dot-background-color": props.isComplete ? "var(--accent-blue)" : "none"
  }));
  return createComponent(GoalDot, {
    get style() {
      return styles();
    }
  });
};

const _tmpl$$2 = ["<svg", " style=\"", "\" viewBox=\"0 0 389 391\"", " xmlns=\"http://www.w3.org/2000/svg\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"1.5\"><path id=\"circle-graph-container\" fill=\"none\" d=\"M0 0h388.749v390.781H0z\"></path><circle id=\"background\" cx=\"194.254\" cy=\"195.105\" r=\"162.476\" fill=\"none\" stroke=\"#000\" stroke-width=\"58.33\"></circle><path id=\"value-path\" d=\"M356.73 195.104c.002.273.001-.205 0 0-.331 89.391-73.008 162.476-162.476 162.476-89.673 0-162.476-72.803-162.476-162.476S104.581 32.628 194.254 32.628c89.4 0 162.035 73.179 162.476 162.476Z\" fill=\"none\" stroke=\"", "\" stroke-width=\"58.33\" stroke-dashoffset=\"1\" stroke-dasharray=\"1\" visibility=\"hidden\" pathLength=\"1\"></path><defs><linearGradient id=\"missionCompletePercent\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"rotate(90 80.813 113.44) scale(324.953)\"><stop offset=\"0\" stop-color=\"#B983FF\"></stop><stop offset=\".45\" stop-color=\"#94B3FD\"></stop><stop offset=\".83\" stop-color=\"#94DAFF\"></stop><stop offset=\"1\" stop-color=\"#99FEFF\"></stop></linearGradient></defs></svg>"];
const CircleGraph = props => {
  let valuePathRef;
  onCleanup(() => {
    drawCircleGraph(valuePathRef, props.value, 0, true);
  });
  return ssr(_tmpl$$2, ssrHydrationKey(), "transform:" + "rotate(-90deg)", ssrAttribute("width", escape(props.width, true), false) + ssrAttribute("height", escape(props.height, true), false), `url(#missionCompletePercent)`);
};

const Container$7 = styled("div")`
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 20px;
  justify-items: start;
  align-items: center;
  width: 100%;
`;
const StatsContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 8px;
  justify-items: start;
  width: 100%;
`;
const Label$1 = styled("p")`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--accent-pink);
`;
const DotsContainer$1 = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: fit-content;
`;
const StatusGraph = styled("div")`
  width: 60px;
`;
const UserMissionStatsContent = () => {
  const percentComplete = createMemo(() => {
    if (missionStats().isGoal1Complete && !missionStats().isGoal2Complete && !missionStats().isGoal3Complete) {
      return 3;
    }
    if (missionStats().isGoal1Complete && missionStats().isGoal2Complete && !missionStats().isGoal3Complete) {
      return 6;
    }
    if (missionStats().isGoal1Complete && missionStats().isGoal2Complete && missionStats().isGoal3Complete) {
      return 10;
    }
    return 0;
  });
  return createComponent(Container$7, {
    get children() {
      return [createComponent(StatsContainer, {
        get children() {
          return [createComponent(Label$1, {
            children: "Mission Status:"
          }), createComponent(DotsContainer$1, {
            get children() {
              return [createComponent(GoalIndicator, {
                get isComplete() {
                  return missionStats().isGoal1Complete;
                }
              }), createComponent(GoalIndicator, {
                get isComplete() {
                  return missionStats().isGoal2Complete;
                }
              }), createComponent(GoalIndicator, {
                get isComplete() {
                  return missionStats().isGoal3Complete;
                }
              })];
            }
          })];
        }
      }), createComponent(StatusGraph, {
        get children() {
          return createComponent(CircleGraph, {
            get value() {
              return percentComplete();
            },
            runAction: true
          });
        }
      })];
    }
  });
};

const BarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: fit-content;
`;
const AstronautDataBar = () => {
  return createComponent(BarContainer, {
    get children() {
      return [createComponent(BaseCard, {
        get children() {
          return createComponent(UserIdentityContent, {});
        }
      }), createComponent(BaseCard, {
        get children() {
          return createComponent(UserMissionContent, {});
        }
      }), createComponent(BaseCard, {
        get children() {
          return createComponent(UserMissionStatsContent, {});
        }
      })];
    }
  });
};

const _tmpl$$1 = ["<img", " style=\"", "\"", " width=\"600\" height=\"300\"", ">"];
const MissionBannerImage = props => {
  return ssr(_tmpl$$1, ssrHydrationKey(), "width:" + "100%", ssrAttribute("src", escape(props.imageUrl, true), false), ssrAttribute("alt", escape(props.altTag, true), false) + ssrAttribute("title", escape(props.titleTag, true), false));
};

const Container$6 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  pointer-events: none;

  & img {
    width: 100%;
    height: auto;
  }
`;
const Divider$1 = styled.div`
  background-color: var(--accent-teal);
  width: 100%;
  height: 6px;
`;
const MissionBanner = props => {
  return createComponent(Container$6, {
    get children() {
      return [createComponent(MissionBannerImage, {
        get imageUrl() {
          return props.imageUrl;
        },
        get altTag() {
          return props.altTag;
        },
        get titleTag() {
          return props.titleTag;
        }
      }), createComponent(Divider$1, {})];
    }
  });
};

const Container$5 = styled("div")`
  padding: 12px 12px 20px 12px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 8px;
  justify-items: start;
  width: 100%;
  pointer-events: none;
`;
const CardHeadline = styled("h3")`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--accent-pink);
`;
const CardDescription = styled("p")`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--accent-purple);
  line-height: 1.6;
  text-align: left;
  text-overflow: ellipsis;
`;
const MissionDescription = props => {
  const shortDescription = createMemo(() => {
    return props.description.slice(0, 120);
  });
  return createComponent(Container$5, {
    get children() {
      return [createComponent(CardHeadline, {
        get children() {
          return props.headline;
        }
      }), createComponent(CardDescription, {
        get children() {
          return [shortDescription(), " ..."];
        }
      })];
    }
  });
};

const Button$1 = styled("div")`
  padding: 6px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--dark-blue);
  background-color: var(--button-background-color, var(--accent-pink));
  border-radius: 12px;
  outline: none;
  width: 100%;
  height: 50px;
  box-shadow: var(--button-box-shadow);
  transition: box-shadow, background-color, 300ms ease-in-out;
`;
const DummyButton = props => {
  const child = children(() => props.children);
  const styles = createMemo(() => ({
    "--button-box-shadow": props.isHovering ? "0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal)" : "none"
  }));
  return createComponent(Button$1, {
    get style() {
      return styles();
    },
    get children() {
      return child();
    }
  });
};

const Container$4 = styled("div")`
  padding: 0 12px 12px 12px;
  display: grid;
  grid-template-columns: 1fr min-content;
  justify-items: center;
  align-items: center;
  width: 100%;
  pointer-events: none;
`;
const DotsContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: fit-content;
`;
const ButtonContainer$2 = styled("div")`
  width: 175px;
`;
const Footer$1 = props => {
  const styles = createMemo(() => ({
    "--button-background-color": props.isActive ? "var(--accent-pink)" : props.isMissionComplete ? "var(--accent-purple)" : "var(--accent-teal)"
  }));
  return createComponent(Container$4, {
    get children() {
      return [createComponent(DotsContainer, {
        get children() {
          return [createComponent(GoalIndicator, {
            get isComplete() {
              return missionStats().isGoal1Complete && props.isActive;
            }
          }), createComponent(GoalIndicator, {
            get isComplete() {
              return missionStats().isGoal2Complete && props.isActive;
            }
          }), createComponent(GoalIndicator, {
            get isComplete() {
              return missionStats().isGoal3Complete && props.isActive;
            }
          })];
        }
      }), createComponent(ButtonContainer$2, {
        get style() {
          return styles();
        },
        get children() {
          return createComponent(DummyButton, {
            get isHovering() {
              return props.isHovering;
            },
            get children() {
              return props.isActive ? "Update Mission" : props.isMissionComplete ? "Completed" : "Start Mission";
            }
          });
        }
      })];
    }
  });
};

const Container$3 = styled("div")`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  width: 100%;
  isolation: isolate;
`;
const Divider = styled("div")`
  background-color: var(--accent-teal);
  width: 100%;
  height: 6px;
`;
const MissionHeadline = styled("h3")`
  position: absolute;
  bottom: 8px;
  left: 20px;
  padding: 12px 24px;
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--accent-pink);
  background-color: hsla(0, 0%, 0%, 0.4);
  border-radius: 12px 12px 0 0;
  z-index: 1;
`;
const CardHeader = props => {
  return createComponent(Container$3, {
    get children() {
      return [createComponent(MissionBannerImage, {
        get imageUrl() {
          return props.imageUrl;
        },
        get altTag() {
          return props.altTag;
        },
        get titleTag() {
          return props.titleTag;
        }
      }), createComponent(Divider, {}), createComponent(MissionHeadline, {
        get children() {
          return props.headline;
        }
      })];
    }
  });
};

const Container$2 = styled("div")`
  padding: 20px;
  width: 100%;
`;
const Descriptioon = styled("p")`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--accent-purple);
  line-height: 1.6;
  text-align: left;
`;
const Description = props => {
  return createComponent(Container$2, {
    get children() {
      return createComponent(Descriptioon, {
        get children() {
          return props.description;
        }
      });
    }
  });
};

const Button = styled("button")`
  padding: 6px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--button-label-color);
  background-color: var(--button-background-color, var(--accent-pink));
  border-radius: 0;
  border: none;
  outline: none;
  width: 100%;
  height: 60px;
  box-shadow: var(--button-box-shadow);
  cursor: var(--button-cursor);
  transition: box-shadow, background-color, 300ms ease-in-out;
  &:focus {
    background-color: var(--accent-teal);
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
  &:hover {
    background-color: var(--accent-teal);
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
`;
const ActionButton = props => {
  const child = children(() => props.children);
  const styles = createMemo(() => ({
    "--button-label-color": props.isDisabled ? "#2C2C4E" : "var(--dark-blue)",
    "--button-background-color": props.isDisabled ? "var(--base-blue)" : "var(--accent-pink)",
    "--button-cursor": props.isDisabled ? "not-allowed" : "pointer"
  }));
  return createComponent(Button, {
    get style() {
      return styles();
    },
    type: "button",
    get onClick() {
      return props.handleClick;
    },
    get disabled() {
      return props.isDisabled;
    },
    get children() {
      return child();
    }
  });
};

const missions = [
  {
    missionId: "mars",
    coverImage: "https://ik.imagekit.io/csu76xuqqlwj/nerds-who-sell/projects/space-mission/mars-card-image_kC3L3akaf-p.jpg?ik-sdk-version=javascript-1.4.3",
    altTag: "Mission to Mars",
    titleTag: "Mission to Mars",
    headline: "Beat Elon to Mars and Colonize",
    description: "Your mission should you choose to accept it is to beat Elon to Mars and colonize it. You will be given one space ship with 1000 fertilized embryos. Your team is the backup method for colonization. Once on Mars you need to grow food and setup the Terraform Bubble. This bubble is the key to your mission. Keep it working. Your timeline is 5 years to the first born human Martians. Should you need help... remember... no one can hear you scream in space. This is a do or die mission. But the rewards are enormous. You'll get to meat Elon when he shows up.",
    difficulty: 8
  },
  {
    missionId: "pleiades",
    coverImage: "https://ik.imagekit.io/csu76xuqqlwj/nerds-who-sell/projects/space-mission/pleiades-card-image_ta9aACakphVT.jpg?ik-sdk-version=javascript-1.4.3",
    altTag: "Pleiades Mission",
    titleTag: "Pleiades Mission",
    headline: "Find Intelligent Life",
    description: "Your mission should you choose to accept it is to navigate your way to the Pleiades and find out if intelligent life exists. Unfortunately we don't have a hard agreement on what intelligent means yet. Don't worry... your mission is long and by the time you get there... intelligent will be defined. The ship taking you to the Pleiades is our very best. Your success rate is 98%. When you arrive. You will automatically be woken from stasis. It will be up to your high level of intelligence (which is defined) and space smarts to figure out what to do. This is a blind mission. We know you can do it.",
    difficulty: 10
  },
  {
    missionId: "prodigious",
    coverImage: "https://ik.imagekit.io/csu76xuqqlwj/nerds-who-sell/projects/space-mission/black-hole-card-image_R0qCJKeXQ.jpg?ik-sdk-version=javascript-1.4.3",
    altTag: "Prodigious Mission",
    titleTag: "Prodigious Mission",
    headline: "Find The Fourth Dimension",
    description: "Your mission should you choose to accept it is to navigate to Prodigious... the biggest black hole close enough for one ship to get there. Ever since Intersteller... scientists have been obsessive over the fourth dimension. Now it's your turn to find out if it's real. We're not going to lie... there's not a lot of science to back up going inside Prodigious. But that's what your job is... to collect the science so our next mission can succeed where you fail. But who knows... maybe you'll come back more powerful than any of us. Are you ready to enter Prodigious?",
    difficulty: 7
  },
  {
    missionId: "titan",
    coverImage: "https://ik.imagekit.io/csu76xuqqlwj/nerds-who-sell/projects/space-mission/titan-card-image_AIqXhGo5SZ.jpg?ik-sdk-version=javascript-1.4.3",
    altTag: "Mission to Titan",
    titleTag: "Mission to Titan",
    headline: "Find Out If Titan Can Support Live",
    description: `Your mission should you choose to accept it is to navigate your way to Titan and discover if it can sustain life. This is class A mission... it's quite possible when you arrive on Titan... you'll immediately implode. We don't know how long this worst case scenario will take. We say immediately... but that is truly worst case. You need make a judgement call fast on whether life can be sustained. If it can't and you don't hit your "No Life" button. You will cause more astronauts to die going to Titan. If Titan can sustain life... hit the "Yes Life" button and it's up to you to prosper. You've trained for this.`,
    difficulty: 9
  },
  {
    missionId: "x24c89",
    coverImage: "https://ik.imagekit.io/csu76xuqqlwj/nerds-who-sell/projects/space-mission/astroid-mining-card-image_JnvLP7m6cQ.jpg?ik-sdk-version=javascript-1.4.3",
    altTag: "x24c89 Mission",
    titleTag: "x24c89 Mission",
    headline: "Mine Precious Metals From x24c89",
    description: "Your mission should you choose to accept it is to land on x24c89 and mine it for the rare metals it contains. We have exhausted the readily available metals on Earth. Elon and Tesla have proven battery technology can only take us so far. It's thought the metals on x24c89 will take batteries to a level never even imagined. I'm talking small watch size batteries that can power a country. Needless to say this mission holds the fate of Earth in its success. Make sure you watch Armageddon before launch. You might pick up some valuable mindset tips.",
    difficulty: 5
  }
];

const Container$1 = styled("div")`
  padding-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 20px;
  justify-items: center;
  width: 100%;
`;
const MissionText = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: #f8f8f8;
`;
const StartMission = props => {
  // TODO - Figure out how to get the user with the right Solid Start api method

  const handleStartMission = () => {
    // Update the user doc with the active mission
    const updatedUser = {
      ...user(),
      activeMission: props.missionId
    };
    updateUser(updatedUser);

    // Create the stats table for this mission
    const activeMission = missions.find(m => m.missionId === props.missionId);
    setActiveMissionData(activeMission);
  };
  const buttonLabel = createMemo(() => {
    if (missionStats().isGoal1Complete && missionStats().isGoal2Complete && missionStats().isGoal3Complete) {
      return "Filing Completed Missing Breifs";
    }
    if (user().activeMission === "") {
      return "Activate Mission";
    }
    return "You're Out On Mission";
  });
  return createComponent(Container$1, {
    get children() {
      return [createComponent(MissionText, {
        children: "Do You Accept This Mission?"
      }), createComponent(ActionButton, {
        handleClick: handleStartMission,
        get isDisabled() {
          return user().activeMission !== "";
        },
        get children() {
          return buttonLabel();
        }
      })];
    }
  });
};

const _tmpl$ = ["<svg", " id=\"form-check\" xmlns=\"http://www.w3.org/2000/svg\"", " viewBox=\"0 0 164.85 127.53\"><path id=\"check\" fill=\"none\" stroke=\"var(--base-blue)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"34\" stroke-dashoffset=\"1\" stroke-dasharray=\"1\" pathLength=\"1\" opacity=\"0\" visibility=\"hidden\" d=\"M147.85 17l-93.52 93.53L17 73.2\"></path></svg>"];
const CheckmarkIcon = props => {
  let checkRef;
  onCleanup(() => {
    checkmarkOn(checkRef, true);
    checkmarkOff(checkRef, true);
  });
  return ssr(_tmpl$, ssrHydrationKey(), ssrAttribute("width", escape(props.width, true), false) + ssrAttribute("height", escape(props.height, true), false));
};

const Box = styled("div")`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsla(240, 100%, 100%, 0.35);
  border-radius: var(--box-border-radius);
  width: var(--box-dimensions);
  height: var(--box-dimensions);
  box-shadow: 0 1px 4px 1px hsla(240, 0%, 0%, 0.3);
`;
const Check = styled("div")`
  width: 100%;
`;
const Checkbox = props => {
  const styles = createMemo(() => ({
    "--box-border-radius": props.makeSmall ? "8px" : "14px",
    "--box-dimensions": props.makeSmall ? "28px" : "54px"
  }));
  return createComponent(Box, {
    get style() {
      return styles();
    },
    get children() {
      return createComponent(Check, {
        get children() {
          return createComponent(CheckmarkIcon, {
            get runAction() {
              return props.isComplete;
            }
          });
        }
      });
    }
  });
};

const ButtonContainer$1 = styled("button")`
  padding: 12px;
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 12px;
  justify-items: start;
  align-items: center;
  background: var(--accent-blue);
  border-radius: 12px;
  border: none;
  width: 100%;
  outline: none;
  width: 100%;
  cursor: var(--button-cursor);
  transition: box-shadow, 300ms ease-in-out;
  &:focus {
    box-shadow: 0 4px 2px 0px hsla(0, 0%, 0%, 0.4), 0 0 0 2px var(--dark-4),
      0 0 0 5px var(--accent-teal);
  }
  &:hover {
    box-shadow: 0 4px 2px 0px hsla(0, 0%, 0%, 0.4), 0 0 0 2px var(--dark-4),
      0 0 0 5px var(--accent-teal);
  }
`;
const Label = styled("p")`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--base-blue);
  font-weight: 700;
  width: 100%;
`;
const GoalCheckboxFake = props => {
  const styles = createMemo(() => ({
    "--button-cursor": props.isDisabled ? "not-allowed" : "pointer"
  }));
  return createComponent(ButtonContainer$1, {
    get style() {
      return styles();
    },
    type: "button",
    onClick: () => props.handleUpdateMissionStats(props.name, !props.isChecked),
    get children() {
      return [createComponent(Checkbox, {
        makeSmall: true,
        get isComplete() {
          return props.isChecked;
        }
      }), createComponent(Label, {
        get children() {
          return props.label;
        }
      })];
    }
  });
};

const GoalForm = styled.form`
  padding: 0 20px 20px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
`;
const MissionGoalsForm = props => {
  // TODO - Read about data fetching in Solid because if the user is not in memory. The uesr needs to be retreved... not sure the best way to do this yet
  // Something here

  const handleUpdateMissionStats = async (name, value) => {
    updateMissionStats(name);
  };
  return createComponent(GoalForm, {
    get children() {
      return [createComponent(GoalCheckboxFake, {
        name: "missionGoal1",
        label: "Complete Goal 1",
        get isChecked() {
          return missionStats().isGoal1Complete;
        },
        handleUpdateMissionStats: handleUpdateMissionStats,
        isDisabled: false
      }), createComponent(GoalCheckboxFake, {
        name: "missionGoal2",
        label: "Complete Goal 2",
        get isChecked() {
          return missionStats().isGoal2Complete;
        },
        handleUpdateMissionStats: handleUpdateMissionStats,
        get isDisabled() {
          return !missionStats().isGoal1Complete;
        }
      }), createComponent(GoalCheckboxFake, {
        name: "missionGoal3",
        label: "Complete Goal 3",
        get isChecked() {
          return missionStats().isGoal3Complete;
        },
        handleUpdateMissionStats: handleUpdateMissionStats,
        get isDisabled() {
          return !missionStats().isGoal1Complete || !missionStats().isGoal2Complete;
        }
      })];
    }
  });
};

const Footer = props => {
  return props.isActive ? createComponent(MissionGoalsForm, {
    get missionId() {
      return props.missionId;
    }
  }) : createComponent(StartMission, {
    get missionId() {
      return props.missionId;
    }
  });
};

const CancelButton = styled("button")`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 12px 24px;
  display: grid;
  grid-template-columns: min-content 1fr;
  justify-items: start;
  align-items: center;
  gap: 12px;
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #f8f8f8;
  background-color: #ff0055;
  border-radius: 12px;
  border: none;
  width: fit-content;
  outline: none;
  cursor: pointer;
  box-shadow: 0 4px 12px 1px hsla(0, 0%, 0%, 0.5);
  z-index: 1;
  transition: box-shadow 300ms ease-in-out;
  &:focus {
    box-shadow: 0 0 0 3px #9b1743, 0 0 0 6px #ff0055;
  }
  &:hover {
    box-shadow: 0 0 0 3px #9b1743, 0 0 0 6px #ff0055;
  }
`;
const CancelMissionButton = props => {
  const handleCancelMission = async () => {
    // set loader that says cancelling mission

    const updatedUser = {
      ...user(),
      activeMission: ""
    };
    updateUser(updatedUser);
    resetMissionStats();
  };
  return createComponent(CancelButton, {
    type: "button",
    onClick: handleCancelMission,
    get children() {
      return [createComponent(CloseIcon, {
        isOpen: true,
        width: 20
      }), "Cancel Mission"];
    }
  });
};

const CardContainer$1 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  width: 600px;
`;
const MissionDetailsCard = props => {
  return createComponent(CardContainer$1, {
    get children() {
      return [createComponent(CardHeader, {
        get imageUrl() {
          return props.imageUrl;
        },
        get altTag() {
          return props.altTag;
        },
        get titleTag() {
          return props.titleTag;
        },
        get headline() {
          return props.headline;
        }
      }), createComponent(Description, {
        get description() {
          return props.description;
        }
      }), createComponent(Footer, {
        get isActive() {
          return props.isActive;
        },
        get missionId() {
          return props.missionId;
        }
      }), props.isActive ? createComponent(CancelMissionButton, {
        get missionId() {
          return props.missionId;
        }
      }) : null];
    }
  });
};

const CardContainer = styled.button`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  background-color: var(--dark-blue);
  border-radius: 12px;
  border: none;
  outline: none;
  width: 350px;
  box-shadow: 0 0 0 6px hsla(0, 0%, 0%, 0.4);
  cursor: pointer;
  overflow: hidden;
  opacity: var(--card-opacity);
  pointer-events: var(--card-pointer-events);
  transform: translateY(0);
  transition: transform, box-shadow, 300ms ease-in-out;

  &:focus {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-pink);
    transform: translateY(-8px);
  }
  &:hover {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-pink);
    transform: translateY(-8px);
  }
`;
const MissionCard = props => {
  const [isHovering, setIsHovering] = createSignal(false);
  const toggleIsHovering = () => {
    setIsHovering(prevValue => !prevValue);
  };
  const isActive = createMemo(() => user().activeMission === props.missionId);
  const isOpen = createMemo(() => isMissionOverlayOpen().isOpen && isMissionOverlayOpen().mission === props.missionId);
  const openCardContainer = () => {
    toggleIsMissionOverlayOpen(props.missionId);
  };
  createMemo(() => {
    if (user().activeMission === props.missionId) {
      if (missionStats().isGoal1Complete && missionStats().isGoal2Complete && missionStats().isGoal3Complete) {
        const completedMission = props.missionId;
        const updatedUser = {
          ...user(),
          activeMission: "",
          finishedMissions: [...user().finishedMissions, completedMission]
        };
        updateUser(updatedUser);
        setTimeout(() => {
          resetMissionStats();
          toggleIsMissionOverlayOpen(props.missionId);
        }, 1500);
      }
    }
  });
  const isMissionComplete = createMemo(() => {
    return user().finishedMissions.includes(props.missionId);
  });
  const styles = createMemo(() => ({
    "--card-opacity": isMissionComplete() ? 0.3 : 1,
    "--card-pointer-events": isMissionComplete() ? "none" : "auto"
  }));
  return [createComponent(CardContainer, {
    get style() {
      return styles();
    },
    type: "button",
    "aria-label": "Mission button",
    onMouseOver: toggleIsHovering,
    onMouseLeave: toggleIsHovering,
    onClick: openCardContainer,
    get disabled() {
      return isMissionComplete();
    },
    get children() {
      return [createComponent(MissionBanner, {
        get imageUrl() {
          return props.coverImage;
        },
        get altTag() {
          return props.altTag;
        },
        get titleTag() {
          return props.titleTag;
        }
      }), createComponent(MissionDescription, {
        get headline() {
          return props.headline;
        },
        get description() {
          return props.description;
        }
      }), createComponent(Footer$1, {
        get isActive() {
          return isActive();
        },
        get isHovering() {
          return isHovering();
        },
        get isMissionComplete() {
          return isMissionComplete();
        }
      })];
    }
  }), createComponent(Portal, {
    get children() {
      return createComponent(MissionDetailsModal, {
        get isOpen() {
          return isOpen();
        },
        closeOverlay: closeIsOverlayOpen,
        get children() {
          return createComponent(MissionDetailsCard, {
            get isOpen() {
              return isOpen();
            },
            get missionId() {
              return props.missionId;
            },
            get imageUrl() {
              return props.coverImage;
            },
            get altTag() {
              return props.altTag;
            },
            get titleTag() {
              return props.titleTag;
            },
            get headline() {
              return props.headline;
            },
            get description() {
              return props.description;
            },
            get isActive() {
              return isActive();
            }
          });
        }
      });
    }
  })];
};

const MissionsContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  column-gap: 20px;
  row-gap: 40px;
  width: 1100px;
`;
const MissionCards = props => {
  const cards = createMemo(() => props.missions.map(mission => {
    const missionId = mission.missionId;
    const headline = mission.headline;
    const description = mission.description;
    const imageUrl = mission.coverImage;
    const altTag = mission.altTag;
    const titleTag = mission.titleTag;
    const difficulty = mission.difficulty;
    return createComponent(MissionCard, {
      missionId: missionId,
      coverImage: imageUrl,
      altTag: altTag,
      titleTag: titleTag,
      headline: headline,
      description: description,
      difficulty: difficulty
    });
  }));
  return createComponent(MissionsContainer, {
    get children() {
      return cards();
    }
  });
};

const ViewContainer = styled("div")`
  position: relative;
  padding: 40px 12px 200px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
  width: 100%;
  isolation: isolate;
`;
const HeaderContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
`;
const BlueGalaxy = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--accent-teal);
  width: 460px;
  height: 460px;
  opacity: 0.2;
  filter: blur(100px);
  z-index: -1;
`;
const PinkGalaxy = styled("div")`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--accent-pink);
  width: 460px;
  height: 460px;
  opacity: 0.2;
  filter: blur(100px);
  z-index: -1;
`;
const DashboardView = props => {
  return createComponent(ViewContainer, {
    get children() {
      return [createComponent(HeaderContainer, {
        get children() {
          return [createComponent(Header, {}), createComponent(AstronautDataBar, {})];
        }
      }), createComponent(MissionCards, {
        get missions() {
          return props.missions;
        }
      }), createComponent(BlueGalaxy, {}), createComponent(PinkGalaxy, {})];
    }
  });
};

function Dashboard() {
  return [createComponent(Title, {
    children: "Space Mission Solid Start and Cloudflare"
  }), createComponent(DashboardView, {
    missions: missions
  })];
}

const InputContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr min-content;
  gap: 0;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  height: 68px;
  box-shadow: 0 2px 8px 2px hsla(0, 0%, 0%, 0.3);
  overflow: hidden;
`;
const InputField = styled("input")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  margin: 0;
  padding: 12px;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--accent-purple);
  background: #313056;
  border: none;
  width: 100%;
  outline: none;
  caret-color: var(--accent-teal);
  &::placeholder {
    font-size: 1.6rem;
    color: var(--accent-purple);
  }
`;
const UnderlineContainer = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 6px;
`;
const BaseUnderline = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: #14141f;
  width: 100%;
  height: 100%;
`;
const Underline = styled("div")`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: var(--underline-color);
  width: 100%;
  height: 100%;
  transition: background-color 300ms ease-in-out;
  pointer-events: none;
`;

// TODO - Build out this input for component library
const TextInput = props => {
  const styles = createMemo(() => ({
    "--underline-color": props.touched ? "var(--accent-pink)" : !props.valid && !props.touched && !props.initial ? "#E03030" : props.valid && !props.touched ? "var(--accent-teal)" : "#14141F"
  }));
  return createComponent(InputContainer, {
    get style() {
      return styles();
    },
    get children() {
      return [createComponent(InputField, {
        get type() {
          return props.inputType;
        },
        get id() {
          return props.inputName;
        },
        "auto-complete": "off",
        get name() {
          return props.inputName;
        },
        get placeholder() {
          return props.placeholder;
        },
        get value() {
          return props.value;
        },
        get onInput() {
          return props.updateInputValue;
        },
        get onFocus() {
          return props.updateInputOptions;
        },
        get onBlur() {
          return props.updateInputOptions;
        }
      }), createComponent(UnderlineContainer, {
        get children() {
          return [createComponent(BaseUnderline, {}), createComponent(Underline, {})];
        }
      })];
    }
  });
};

const formValidator = (value, rules) => {
  const cleanNumberInput = (number) => {
    const stringNumber = number.toString();
    const cleanStringNumber = stringNumber.trim();
    const cleanNumberValue2 = Number(cleanStringNumber);
    return cleanNumberValue2;
  };
  let isValid = true;
  let cleanStringValue = typeof value === "string" ? value.trim() : "";
  let cleanNumberValue = typeof value === "number" ? cleanNumberInput(value) : 0;
  for (let rule in rules) {
    switch (rule) {
      case "maxLength":
        isValid = isValid && maxLengthValidator(cleanStringValue, rules[rule]);
        break;
      case "minLength":
        isValid = isValid && minLengthValidator(cleanStringValue, rules[rule]);
        break;
      case "isRequired": {
        if (cleanStringValue) {
          isValid = isValid && requiredValidator(cleanStringValue);
        }
        if (cleanNumberValue) {
          isValid = isValid && requiredValidator(cleanNumberValue);
        }
        break;
      }
      case "isEmail":
        isValid = isValid && emailValidator(cleanStringValue);
        break;
      default:
        isValid = true;
        break;
    }
  }
  return isValid;
};
const maxLengthValidator = (value, maxLength) => {
  if (maxLength) {
    return value.length <= maxLength;
  }
  return true;
};
const minLengthValidator = (value, minLength) => {
  return value.length >= minLength;
};
const requiredValidator = (value) => {
  if (typeof value === "string" || typeof value === "number") {
    return value !== "";
  }
  return false;
};
const emailValidator = (value) => {
  var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

const emailValidationRules = {
  minLength: 4,
  isEmail: true,
  isRequired: true
};

const [emailAddress, setEmailAddress] = createSignal({
  value: "",
  valid: false
});
const [emailAddressOptions, setEmailAddressOptions] = createSignal({
  initial: true,
  touched: false
});
const updateEmailAddressValue = (event) => {
  const inputElement = event.currentTarget;
  const value = inputElement.value;
  const valid = formValidator(value, emailValidationRules);
  setEmailAddress(() => ({
    value,
    valid
  }));
};
const updateEmailAddressOptions = () => {
  setEmailAddressOptions((prevState) => ({
    initial: false,
    touched: !prevState.touched
  }));
};
const resetLoginForm = () => {
  setEmailAddress(() => ({
    value: "",
    valid: false
  }));
  setEmailAddressOptions(() => ({
    initial: true,
    touched: false
  }));
};

const FormContainer$1 = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 24px;
  justify-items: center;
  width: 320px;
`;
const ButtonContainer = styled("div")`
  width: 175px;
`;
const LoginForm = () => {
  const [_, {
    Form
  }] = createRouteAction(async formData => {
    const email = formData.get("emailAddress");
    if (email) {
      const user = {
        userId: "123456",
        activeMission: "",
        callsign: "Maverick",
        avatar: "",
        emailAddress: email,
        finishedMissions: []
      };
      updateUser(user);
    }
    if (email === "dan@dan.com") {
      return redirect("/dashboard");
    } else {
      resetLoginForm();
    }
  });
  return createComponent(Form, {
    get children() {
      return createComponent(FormContainer$1, {
        get children() {
          return [createComponent(TextInput, {
            inputType: "email",
            inputName: "emailAddress",
            labelFor: "emailAddress",
            labelName: "Email Address",
            labelInstructions: "",
            labelError: "",
            placeholder: "Enter your email address...",
            get value() {
              return emailAddress().value;
            },
            get valid() {
              return emailAddress().valid;
            },
            get initial() {
              return emailAddressOptions().initial;
            },
            get touched() {
              return emailAddressOptions().touched;
            },
            updateInputValue: updateEmailAddressValue,
            updateInputOptions: updateEmailAddressOptions
          }), createComponent(ButtonContainer, {
            get children() {
              return createComponent(FormButton, {
                get isValid() {
                  return emailAddress().valid;
                },
                children: "Login"
              });
            }
          })];
        }
      });
    }
  });
};

const Container = styled("div")`
  position: relative;
  isolation: isolate;
`;
const FormContainer = styled("div")`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
  background-color: #0f0f1a;
  border-radius: 20px;
  width: 100%;
  max-width: 375px;
  box-shadow: 0 0 0 6px hsla(0, 0%, 0%, 0.4);
  overflow: hidden;
`;
const Galaxy = styled("div")`
  position: absolute;
  top: var(--galaxy-top);
  left: var(--galaxy-left);
  right: var(--galaxy-right);
  bottom: var(--galaxy-bottom);
  background-color: var(--galaxy-color);
  width: var(--galaxy-size);
  height: var(--galaxy-size);
  filter: blur(100px);
  z-index: -1;
`;
const LoginView = () => {
  const galaxy1Styles = createMemo(() => ({
    "--galaxy-top": 0,
    "--galaxy-left": 0,
    "--galaxy-right": "unset",
    "--galaxy-bottom": "unset",
    "--galaxy-color": "var(--accent-teal)",
    "--galaxy-size": "160px"
  }));
  const galaxy2Styles = createMemo(() => ({
    "--galaxy-top": "unset",
    "--galaxy-left": "unset",
    "--galaxy-right": 0,
    "--galaxy-bottom": 0,
    "--galaxy-color": "var(--accent-pink)",
    "--galaxy-size": "120px"
  }));
  return createComponent(Container, {
    get children() {
      return [createComponent(FormContainer, {
        get children() {
          return [createComponent(SpaceMissionLogo, {}), createComponent(LoginForm, {})];
        }
      }), createComponent(Galaxy, {
        get style() {
          return galaxy1Styles();
        }
      }), createComponent(Galaxy, {
        get style() {
          return galaxy2Styles();
        }
      })];
    }
  });
};

const Main = styled("main")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
function Home() {
  return createComponent(Main, {
    get children() {
      return [createComponent(Title, {
        children: "Space Mission Solid Start and Cloudflare"
      }), createComponent(LoginView, {})];
    }
  });
}

/// <reference path="../server/types.tsx" />
const fileRoutes = [{
  component: NotFound,
  path: "/*404"
}, {
  component: About,
  path: "/about"
}, {
  component: Dashboard,
  path: "/dashboard"
}, {
  component: Home,
  path: "/"
}];

/**
 * Routes are the file system based routes, used by Solid App Router to show the current page according to the URL.
 */

const FileRoutes = () => {
  return fileRoutes;
};

function Root() {
  return createComponent(Html, {
    lang: "en",
    get children() {
      return [createComponent(Head, {
        get children() {
          return [createComponent(Title, {
            children: "SolidStart - Bare"
          }), createComponent(Meta$1, {
            charset: "utf-8"
          }), createComponent(Meta$1, {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          })];
        }
      }), createComponent(Body, {
        get children() {
          return [createComponent(Suspense, {
            get children() {
              return createComponent(ErrorBoundary, {
                get children() {
                  return createComponent(Routes, {
                    get children() {
                      return createComponent(FileRoutes, {});
                    }
                  });
                }
              });
            }
          }), createComponent(Scripts, {})];
        }
      })];
    }
  });
}

const rootData = Object.values(/* #__PURE__ */ Object.assign({

}))[0];
const dataFn = rootData ? rootData.default : undefined;

/** Function responsible for listening for streamed [operations]{@link Operation}. */

/** This composes an array of Exchanges into a single ExchangeIO function */
const composeMiddleware = exchanges => ({
  forward
}) => exchanges.reduceRight((forward, exchange) => exchange({
  forward
}), forward);
function createHandler(...exchanges) {
  const exchange = composeMiddleware(exchanges);
  return async event => {
    return await exchange({
      forward: async op => {
        return new Response(null, {
          status: 404
        });
      }
    })(event);
  };
}
function StartRouter(props) {
  return createComponent(Router, props);
}
const docType = ssr("<!DOCTYPE html>");
function StartServer({
  event
}) {
  const parsed = new URL(event.request.url);
  const path = parsed.pathname + parsed.search;

  // @ts-ignore
  sharedConfig.context.requestContext = event;
  return createComponent(ServerContext.Provider, {
    value: event,
    get children() {
      return createComponent(MetaProvider, {
        get tags() {
          return event.tags;
        },
        get children() {
          return createComponent(StartRouter, {
            url: path,
            get out() {
              return event.routerContext;
            },
            location: path,
            get prevLocation() {
              return event.prevUrl;
            },
            data: dataFn,
            routes: fileRoutes,
            get children() {
              return [docType, createComponent(Root, {})];
            }
          });
        }
      });
    }
  });
}

const entryServer = createHandler(renderAsync(event => createComponent(StartServer, {
  event: event
})));

const onRequestGet = async ({ request, next, env }) => {
  // Handle static assets
  if (/\.\w+$/.test(request.url)) {
    let resp = await next(request);
    if (resp.status === 200 || 304) {
      return resp;
    }
  }

  env.manifest = manifest;
  env.next = next;
  env.getStaticHTML = async path => {
    return next();
  };
  return entryServer({
    request: request,
    clientAddress: request.headers.get('cf-connecting-ip'),
    locals: {},
    env
  });
};

const onRequestHead = async ({ request, next, env }) => {
  // Handle static assets
  if (/\.\w+$/.test(request.url)) {
    let resp = await next(request);
    if (resp.status === 200 || 304) {
      return resp;
    }
  }

  env.manifest = manifest;
  env.next = next;
  env.getStaticHTML = async path => {
    return next();
  };
  return entryServer({
    request: request,
    env
  });
};

async function onRequestPost({ request, env }) {
  // Allow for POST /_m/33fbce88a9 server function
  env.manifest = manifest;
  return entryServer({
    request: request,
    env
  });
}

async function onRequestDelete({ request, env }) {
  // Allow for POST /_m/33fbce88a9 server function
  env.manifest = manifest;
  return entryServer({
    request: request,
    env
  });
}

async function onRequestPatch({ request, env }) {
  // Allow for POST /_m/33fbce88a9 server function
  env.manifest = manifest;
  return entryServer({
    request: request,
    env
  });
}

export { onRequestDelete, onRequestGet, onRequestHead, onRequestPatch, onRequestPost };
