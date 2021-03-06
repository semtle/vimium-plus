interface Element {
  vimiumHasOnclick?: boolean;
}

interface FgOptions extends SafeDict<any> {}

interface Window {
  VimiumInjector?: VimiumInjector;
  VSettings: VSettings | null;
}
interface VimiumInjector {
  id: string;
  alive: 0 | 0.5 | 1;
  destroy: ((this: void, silent?: boolean) => void) | null;
}
declare const enum HandlerResult {
  Nothing = 0,
  Default = Nothing,
  Suppress = 1,
  Prevent = 2,
  MinMayNotPassKey = 0,
  PassKey = -1,
}
declare const enum VisibilityType {
  Visible = 0,
  OutOfView = 1,
  NoSpace = 2,
}
declare namespace HandlerNS {
  type Event = KeyboardEvent;

  interface Handler<T extends object> {
    (this: T, event: HandlerNS.Event): HandlerResult;
  }
}
interface KeydownCacheArray extends Uint8Array {
}

interface EventControlKeys {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}

interface VRect {
  [0]: number; // left
  [1]: number; // top
  [2]: number; // right
  [3]: number; // bottom
}

interface ViewBox {
  [0]: number; // left
  [1]: number; // top
  [2]: number; // width
  [3]: number; // height
  [4]: number; // max-left or 0
}

declare const enum EditableType {
  Default = 0,
  NotEditable = Default,
  Embed = 1,
  Select = 2,
  Editbox = 3,
  _input = 4,
}

declare namespace HintsNS {
  interface Marker extends HTMLSpanElement {
    clickableItem: Hint[0];
    hintString: string;
    linkRect?: VRect;
  }
}

declare namespace FindNS {
  interface ExecuteOptions {
    count?: number;
    dir?: BOOL;
    noColor?: boolean;
    caseSensitive?: boolean;
  }
}

declare namespace VomnibarNS {
  const enum Status {
    NeedRedo = -3,
    KeepBroken = -2,
    Default = -1,
    NotInited = Default,
    Inactive = 0,
    Initing = 1,
    ToShow = 2,
    Showing = 3,
  }
  interface GlobalOptions {
    mode: string;
    force: boolean;
    keyword: string;
  }
  interface BaseFgOptions {
    width: number;
    search: "" | FgRes["parseSearchUrl"];
  }
  interface FgOptions extends BaseFgOptions, Partial<GlobalOptions> {
    url?: string | null;
    script: string;
  }
  type MessageData = [number, FgOptions | null];
  type Msg<T extends string> = { name: T };

  interface CReq {
    activate: FgOptions & Msg<"activate">;
    hide: "hide";
    focus: "focus";
    backspace: "backspace";
  }
  interface FReq {
    hide: {
    };
    scroll: {
      keyCode: number;
    };
    style: {
      height: number;
    };
    focus: {
      lastKey: number;
    };
    evalJS: {
      url: string;
    };
    broken: {
      active: boolean;
    };
    scrollEnd: {},
    scrollGoing: {},
    unload: {},
    uiComponentIsReady: {};
  }
  interface IframePort {
    sameOrigin?: true;
    postMessage<K extends keyof FReq> (this: void, msg: FReq[K] & Msg<K>): void | 1;
    onmessage<K extends keyof CReq> (this: void, msg: { data: CReq[K] }): void | 1;
  }
  type FgOptionsToFront = CReq["activate"];
}

declare type ScrollByY = 0 | 1;

interface Hint {
  [0]: HTMLElement | SVGElement; // element
  [1]: VRect; // bounding rect
  [2]: number; // priority (smaller is prior)
  [3]?: VRect; // bottom
  [4]?: [VRect, number]; // [rect of the hint below this marker, offset-x]
  length: number;
}

interface UIElementOptions {
  adjust?: boolean;
  before?: Element | null;
  showing?: false;
}

interface DomUI {
  box: HTMLElement | null;
  styleIn: HTMLStyleElement | string | null;
  root: ShadowRoot | null;
  callback: null | ((this: void) => void);
  flashLastingTime: number;
  addElement<T extends HTMLElement>(this: DomUI, element: T, options?: UIElementOptions): T;
  addElementList(this: DomUI, els: ReadonlyArray<Element>, offset: { [0]: number; [1]: number }): HTMLDivElement;
  adjust (this: void, event?: Event): void;
  toggle (this: DomUI, enabled: boolean): void;
  createStyle (this: DomUI, text: string, doc?: { createElement: Document["createElement"] }): HTMLStyleElement;
  css (this: DomUI, innerCSS: string): void;
  getSelection (this: DomUI): Selection;
  removeSelection (this: DomUI, root?: DocumentOrShadowRoot,): boolean;
  click (this: DomUI, element: Element, modifiers?: EventControlKeys | null, addFocus?: boolean): boolean;
  simulateSelect (this: DomUI, element: Element, flash?: boolean, suppressRepeated?: boolean): void;
  getZoom (this: void): number;
  getVRect (this: void, clickEl: Element): VRect | null;
  flash (this: DomUI, el: null, rect: VRect): number;
  flash (this: DomUI, el: Element): number | void;
  suppressTail (this: void, onlyRepeated: boolean): void;
  SuppressMost: HandlerNS.Handler<object>;
}

interface VDomMouse {
  (element: Element, type: "mouseover" | "mousedown" | "mouseup" | "click" | "mouseout"
    , modifiers?: EventControlKeys | null, related?: Element | null): boolean;
}
interface VPort {
  post<K extends keyof SettingsNS.FrontUpdateAllowedSettings>(this: void, req: SetSettingReq<K>): void | 1;
  post<K extends keyof FgReq>(this: void, req: FgReq[K] & Req.baseFg<K>): void | 1;
  send<K extends keyof FgRes>(this: void, req: FgReq[K] & Req.baseFg<K>
    , callback: (this: void, res: FgRes[K]) => void): void;
}
interface ComplicatedVPort extends VPort {
  post<K extends keyof FgReq, T extends FgReq[K]>(this: void, req: T & Req.baseFg<K>): void | 1;
}
interface VEventMode {
  lock(this: void): Element | null;
  suppress(keyCode?: number): void;
  OnWndFocus (this: void): void;
  focusAndListen (this: void, callback?: (() => void) | null, timedout?: 0): void;
  onWndBlur (this: void, onWndBlur: ((this: void) => void) | null): void;
  setupSuppress (this: void, onExit?: (this: void) => void): void;
  mapKey (this: void, key: string): string;
  scroll (this: void, event?: Partial<EventControlKeys & { keyCode: number }>, wnd?: Window): void;
  /** return has_error */
  keydownEvents (this: void, newArr: KeydownCacheArray): boolean;
  keydownEvents (this: void): KeydownCacheArray;
  OnScrolls: {
    0: (this: any, event: KeyboardEvent) => void | 1;
    1: (this: Window, event: KeyboardEvent) => void;
    2: (this: Window, event: Event) => void;
    3: (wnd: Window, interval?: number) => void;
  } 
}
interface VHUD {
  box: HTMLDivElement | null;
  text: string;
  opacity: 0 | 0.25 | 0.5 | 0.75 | 1;
  show (text: string): void;
  /** duration is default to 1500 */
  showForDuration (text: string, duration?: number): void;
  showCopied (text: string, type: string, virtual: true): string;
  showCopied (text: string, type?: string): void;
  hide (this: void): void;
}
interface VSettings {
  enabled: boolean;
  cache: SettingsNS.FrontendSettingCache;
  checkIfEnabled (this: void): void;
  onDestroy: ((this: void) => any) | null;
  destroy (this: void, silent?: boolean, keepChrome?: boolean): void;
}
declare var VimiumInjector: VimiumInjector;
