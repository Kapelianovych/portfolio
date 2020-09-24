import defaults from './defaults';
import { backSpaceHtmlChars, typeHtmlChars } from './html-parser';
import { appendAnimationCss, getCurrentElContent } from './initializer';

/**
 * Welcome to Typed.js!
 * @param {string} elementId HTML element ID _OR_ HTML element
 * @param {object} options options object
 * @returns {object} a new Typed object
 */
export default class Typed {
  pause: {
    status: boolean;
    typewrite: boolean;
    curString: string;
    curStrPos: number;
  };
  el: HTMLElement;
  options: typeof defaults;
  isInput: boolean;
  attr: string | null;
  bindInputFocusEvents: boolean;
  showCursor: boolean;
  cursorChar: string;
  cursorBlinking: boolean;
  elContent: string | null;
  contentType: string;
  typeSpeed: number;
  startDelay: number;
  backSpeed: number;
  smartBackspace: boolean;
  backDelay: number;
  fadeOut: boolean;
  fadeOutClass: string;
  fadeOutDelay: number;
  isPaused: boolean;
  strings: Array<string>;
  stringsElement: HTMLElement | null;
  strPos: number;
  arrayPos: number;
  stopNum: number;
  loop: boolean;
  loopCount: number;
  curLoop: number;
  shuffle: boolean;
  /** Holds number of sentence in strings field. */
  sequence: Array<string>;
  typingComplete: boolean;
  currentElContent: string;
  autoInsertCss: boolean;

  timeout: number | undefined;
  cursor: HTMLSpanElement | null | undefined;
  temporaryPause: boolean = false;

  constructor(
    elementId: string | HTMLElement,
    options: Partial<typeof defaults>
  ) {
    // chosen element to manipulate text
    if (typeof elementId === 'string') {
      this.el = document.querySelector(elementId) as HTMLElement;
    } else {
      this.el = elementId;
    }

    this.options = { ...defaults, ...options };

    // attribute to type into
    this.isInput = this.el.tagName.toLowerCase() === 'input';
    this.attr = this.options.attr;
    this.bindInputFocusEvents = this.options.bindInputFocusEvents;

    // show cursor
    this.showCursor = this.isInput ? false : this.options.showCursor;

    // custom cursor
    this.cursorChar = this.options.cursorChar;

    // Is the cursor blinking
    this.cursorBlinking = true;

    // text content of element
    this.elContent = this.attr
      ? this.el.getAttribute(this.attr)
      : this.el.textContent;

    // html or plain text
    this.contentType = this.options.contentType;

    // typing speed
    this.typeSpeed = this.options.typeSpeed;

    // add a delay before typing starts
    this.startDelay = this.options.startDelay;

    // backspacing speed
    this.backSpeed = this.options.backSpeed;

    // only backspace what doesn't match the previous string
    this.smartBackspace = this.options.smartBackspace;

    // amount of time to wait before backspacing
    this.backDelay = this.options.backDelay;

    // Fade out instead of backspace
    this.fadeOut = this.options.fadeOut;
    this.fadeOutClass = this.options.fadeOutClass;
    this.fadeOutDelay = this.options.fadeOutDelay;

    // variable to check whether typing is currently paused
    this.isPaused = false;

    // input strings of text
    this.strings = this.options.strings.map((s) => s.trim());

    // div containing strings
    if (typeof this.options.stringsElement === 'string') {
      this.stringsElement = document.querySelector(
        (this.options.stringsElement as unknown) as string
      ) as HTMLElement;
    } else {
      this.stringsElement = this.options.stringsElement;
    }

    if (this.stringsElement) {
      this.strings = [];
      this.stringsElement.style.display = 'none';
      const strings = Array.prototype.slice.apply(this.stringsElement.children);
      const stringsLength = strings.length;

      if (stringsLength) {
        for (let i = 0; i < stringsLength; i += 1) {
          const stringEl = strings[i];
          this.strings.push(stringEl.innerHTML.trim());
        }
      }
    }

    // character number position of current string
    this.strPos = 0;

    // current array position
    this.arrayPos = 0;

    // index of string to stop backspacing on
    this.stopNum = 0;

    // Looping logic
    this.loop = this.options.loop;
    this.loopCount = this.options.loopCount;
    this.curLoop = 0;

    // shuffle the strings
    this.shuffle = this.options.shuffle;
    // the order of strings
    this.sequence = [];

    this.pause = {
      status: false,
      typewrite: true,
      curString: '',
      curStrPos: 0,
    };

    // When the typing is complete (when not looped)
    this.typingComplete = false;

    // Set the order in which the strings are typed
    for (let i in this.strings) {
      this.sequence[i] = i;
    }

    // If there is some text in the element
    this.currentElContent = getCurrentElContent(this);

    this.autoInsertCss = this.options.autoInsertCss;

    appendAnimationCss(this);

    // All systems go!
    this.begin();
  }

  /**
   * Toggle start() and stop() of the Typed instance
   * @public
   */
  toggle() {
    this.pause.status ? this.start() : this.stop();
  }

  /**
   * Stop typing / backspacing and enable cursor blinking
   * @public
   */
  stop() {
    if (this.typingComplete) return;
    if (this.pause.status) return;
    this.toggleBlinking(true);
    this.pause.status = true;
    this.options.onStop(this.arrayPos, this);
  }

  /**
   * Start typing / backspacing after being stopped
   * @public
   */
  start() {
    if (this.typingComplete) return;
    if (!this.pause.status) return;
    this.pause.status = false;
    if (this.pause.typewrite) {
      this.typewrite(this.pause.curString, this.pause.curStrPos);
    } else {
      this.backspace(this.pause.curString, this.pause.curStrPos);
    }
    this.options.onStart(this.arrayPos, this);
  }

  /**
   * Destroy this instance of Typed
   * @public
   */
  destroy() {
    this.reset(false);
    this.options.onDestroy(this);
  }

  /**
   * Reset Typed and optionally restarts
   * @param {boolean} restart
   * @public
   */
  reset(restart: boolean = true) {
    clearInterval(this.timeout);
    this.replaceText('');
    if (this.cursor && this.cursor.parentNode) {
      this.cursor.parentNode.removeChild(this.cursor);
      this.cursor = null;
    }
    this.strPos = 0;
    this.arrayPos = 0;
    this.curLoop = 0;
    if (restart) {
      this.insertCursor();
      this.options.onReset(this);
      this.begin();
    }
  }

  /**
   * Begins the typing animation
   * @private
   */
  begin() {
    setTimeout;
    this.options.onBegin(this);
    this.typingComplete = false;
    this.shuffleStringsIfNeeded();
    this.insertCursor();
    if (this.bindInputFocusEvents) this.bindFocusEvents();
    this.timeout = window.setTimeout(() => {
      // Check if there is some text in the element, if yes start by backspacing the default message
      if (!this.currentElContent || this.currentElContent.length === 0) {
        this.typewrite(
          this.strings[parseInt(this.sequence[this.arrayPos])],
          this.strPos
        );
      } else {
        // Start typing
        this.backspace(this.currentElContent, this.currentElContent.length);
      }
    }, this.startDelay);
  }

  /**
   * Called for each character typed
   * @param {string} curString the current string in the strings array
   * @param {number} curStrPos the current position in the curString
   * @private
   */
  typewrite(curString: string, curStrPos: number) {
    if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
      this.el.classList.remove(this.fadeOutClass);
      if (this.cursor) this.cursor.classList.remove(this.fadeOutClass);
    }

    const humanize = this.humanizer(this.typeSpeed);
    let numChars = 1;

    if (this.pause.status === true) {
      this.setPauseStatus(curString, curStrPos, true);
      return;
    }

    // contain typing function in a timeout humanize'd delay
    this.timeout = window.setTimeout(() => {
      // skip over any HTML chars
      curStrPos = typeHtmlChars(curString, curStrPos, this);

      let pauseTime = 0;
      let substr = curString.substr(curStrPos);
      // check for an escape character before a pause value
      // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
      // single ^ are removed from string
      if (substr.charAt(0) === '^') {
        if (/^\^\d+/.test(substr)) {
          let skip = 1; // skip at least 1
          substr = (/\d+/.exec(substr) || [])[0];
          skip += substr.length;
          pauseTime = parseInt(substr);
          this.temporaryPause = true;
          this.options.onTypingPaused(this.arrayPos, this);
          // strip out the escape character and pause value so they're not printed
          curString =
            curString.substring(0, curStrPos) +
            curString.substring(curStrPos + skip);
          this.toggleBlinking(true);
        }
      }

      // check for skip characters formatted as
      // "this is a `string to print NOW` ..."
      if (substr.charAt(0) === '`') {
        while (curString.substr(curStrPos + numChars).charAt(0) !== '`') {
          numChars++;
          if (curStrPos + numChars > curString.length) break;
        }
        // strip out the escape characters and append all the string in between
        const stringBeforeSkip = curString.substring(0, curStrPos);
        const stringSkipped = curString.substring(
          stringBeforeSkip.length + 1,
          curStrPos + numChars
        );
        const stringAfterSkip = curString.substring(curStrPos + numChars + 1);
        curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
        numChars--;
      }

      // timeout for any pause after a character
      this.timeout = window.setTimeout(() => {
        // Accounts for blinking while paused
        this.toggleBlinking(false);

        // We're done with this sentence!
        if (curStrPos >= curString.length) {
          this.doneTyping(curString, curStrPos);
        } else {
          this.keepTyping(curString, curStrPos, numChars);
        }
        // end of character pause
        if (this.temporaryPause) {
          this.temporaryPause = false;
          this.options.onTypingResumed(this.arrayPos, this);
        }
      }, pauseTime);

      // humanized value for typing
    }, humanize);
  }

  /**
   * Continue to the next string & begin typing
   * @param {string} curString the current string in the strings array
   * @param {number} curStrPos the current position in the curString
   * @private
   */
  keepTyping(curString: string, curStrPos: number, numChars: number) {
    // call before functions if applicable
    if (curStrPos === 0) {
      this.toggleBlinking(false);
      this.options.preStringTyped(this.arrayPos, this);
    }
    // start typing each new char into existing string
    // curString: arg, this.el.html: original text inside element
    curStrPos += numChars;
    const nextString = curString.substr(0, curStrPos);
    this.replaceText(nextString);
    // loop the function
    this.typewrite(curString, curStrPos);
  }

  /**
   * We're done typing the current string
   * @param {string} curString the current string in the strings array
   * @param {number} curStrPos the current position in the curString
   * @private
   */
  doneTyping(curString: string, curStrPos: number) {
    // fires callback function
    this.options.onStringTyped(this.arrayPos, this);
    this.toggleBlinking(true);
    // is this the final string
    if (this.arrayPos === this.strings.length - 1) {
      // callback that occurs on the last typed string
      this.complete();
      // quit if we wont loop back
      if (this.loop === false || this.curLoop === this.loopCount) {
        return;
      }
    }
    this.timeout = window.setTimeout(() => {
      this.backspace(curString, curStrPos);
    }, this.backDelay);
  }

  /**
   * Backspaces 1 character at a time
   * @param {string} curString the current string in the strings array
   * @param {number} curStrPos the current position in the curString
   * @private
   */
  backspace(curString: string, curStrPos: number) {
    if (this.pause.status === true) {
      this.setPauseStatus(curString, curStrPos, true);
      return;
    }
    if (this.fadeOut) return this.initFadeOut();

    this.toggleBlinking(false);
    const humanize = this.humanizer(this.backSpeed);

    this.timeout = window.setTimeout(() => {
      curStrPos = backSpaceHtmlChars(curString, curStrPos, this);
      // replace text with base text + typed characters
      const curStringAtPosition = curString.substr(0, curStrPos);
      this.replaceText(curStringAtPosition);

      // if smartBack is enabled
      if (this.smartBackspace) {
        // the remaining part of the current string is equal of the same part of the new string
        let nextString = this.strings[this.arrayPos + 1];
        if (
          nextString &&
          curStringAtPosition === nextString.substr(0, curStrPos)
        ) {
          this.stopNum = curStrPos;
        } else {
          this.stopNum = 0;
        }
      }

      // if the number (id of character in current string) is
      // less than the stop number, keep going
      if (curStrPos > this.stopNum) {
        // subtract characters one by one
        curStrPos--;
        // loop the function
        this.backspace(curString, curStrPos);
      } else if (curStrPos <= this.stopNum) {
        // if the stop number has been reached, increase
        // array position to next string
        this.arrayPos++;
        // When looping, begin at the beginning after backspace complete
        if (this.arrayPos === this.strings.length) {
          this.arrayPos = 0;
          this.options.onLastStringBackspaced(this);
          this.shuffleStringsIfNeeded();
          this.begin();
        } else {
          this.typewrite(
            this.strings[parseInt(this.sequence[this.arrayPos])],
            curStrPos
          );
        }
      }
      // humanized value for typing
    }, humanize);
  }

  /**
   * Full animation is complete
   * @private
   */
  complete() {
    this.options.onComplete(this);
    if (this.loop) {
      this.curLoop++;
    } else {
      this.typingComplete = true;
    }
  }

  /**
   * Has the typing been stopped
   * @param {string} curString the current string in the strings array
   * @param {number} curStrPos the current position in the curString
   * @param {boolean} isTyping
   * @private
   */
  setPauseStatus(curString: string, curStrPos: number, isTyping: boolean) {
    this.pause.typewrite = isTyping;
    this.pause.curString = curString;
    this.pause.curStrPos = curStrPos;
  }

  /**
   * Toggle the blinking cursor
   * @param {boolean} isBlinking
   * @private
   */
  toggleBlinking(isBlinking: boolean) {
    if (!this.cursor) return;
    // if in paused state, don't toggle blinking a 2nd time
    if (this.pause.status) return;
    if (this.cursorBlinking === isBlinking) return;
    this.cursorBlinking = isBlinking;
    if (isBlinking) {
      this.cursor.classList.add('typed-cursor--blink');
    } else {
      this.cursor.classList.remove('typed-cursor--blink');
    }
  }

  /**
   * Speed in MS to type
   * @param {number} speed
   * @private
   */
  humanizer(speed: number) {
    return Math.round((Math.random() * speed) / 2) + speed;
  }

  /**
   * Shuffle the sequence of the strings array
   * @private
   */
  shuffleStringsIfNeeded() {
    if (!this.shuffle) return;
    this.sequence = this.sequence.sort(() => Math.random() - 0.5);
  }

  /**
   * Adds a CSS class to fade out current string
   * @private
   */
  initFadeOut() {
    this.el.className += ` ${this.fadeOutClass}`;
    if (this.cursor) this.cursor.className += ` ${this.fadeOutClass}`;
    return setTimeout(() => {
      this.arrayPos++;
      this.replaceText('');

      // Resets current string if end of loop reached
      if (this.strings.length > this.arrayPos) {
        this.typewrite(this.strings[parseInt(this.sequence[this.arrayPos])], 0);
      } else {
        this.typewrite(this.strings[0], 0);
        this.arrayPos = 0;
      }
    }, this.fadeOutDelay);
  }

  /**
   * Replaces current text in the HTML element
   * depending on element type
   * @param {string} str
   * @private
   */
  replaceText(str: string) {
    if (this.attr) {
      this.el.setAttribute(this.attr, str);
    } else {
      if (this.isInput) {
        // @ts-ignore
        this.el.value = str;
      } else if (this.contentType === 'html') {
        this.el.innerHTML = str;
      } else {
        this.el.textContent = str;
      }
    }
  }

  /**
   * If using input elements, bind focus in order to
   * start and stop the animation
   * @private
   */
  bindFocusEvents() {
    if (!this.isInput) return;
    this.el.addEventListener('focus', (e) => {
      this.stop();
    });
    this.el.addEventListener('blur', (e) => {
      // @ts-ignore
      if (this.el.value && this.el.value.length !== 0) {
        return;
      }
      this.start();
    });
  }

  /**
   * On init, insert the cursor element
   * @private
   */
  insertCursor() {
    if (!this.showCursor) return;
    if (this.cursor) return;
    this.cursor = document.createElement('span');
    this.cursor.className = 'typed-cursor';
    this.cursor.innerHTML = this.cursorChar;
    this.el.parentNode &&
      this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
  }
}
