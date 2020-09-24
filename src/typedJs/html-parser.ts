/**
 * TODO: These methods can probably be combined somehow
 * Parse HTML tags & HTML Characters
 */

import type Typed from './typed';

/**
 * Type HTML tags & HTML Characters
 * @param {string} curString Current string
 * @param {number} curStrPos Position in current string
 * @param {Typed} self instance of Typed
 * @returns {number} a new string position
 * @private
 */

export function typeHtmlChars(
  curString: string,
  curStrPos: number,
  self: Typed
): number {
  if (self.contentType !== 'html') return curStrPos;
  const curChar = curString.substr(curStrPos).charAt(0);
  if (curChar === '<' || curChar === '&') {
    let endTag = '';
    if (curChar === '<') {
      endTag = '>';
    } else {
      endTag = ';';
    }
    while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
      curStrPos++;
      if (curStrPos + 1 > curString.length) {
        break;
      }
    }
    curStrPos++;
  }
  return curStrPos;
}

/**
 * Backspace HTML tags and HTML Characters
 * @param {string} curString Current string
 * @param {number} curStrPos Position in current string
 * @param {Typed} self instance of Typed
 * @returns {number} a new string position
 * @private
 */
export function backSpaceHtmlChars(
  curString: string,
  curStrPos: number,
  self: Typed
): number {
  if (self.contentType !== 'html') return curStrPos;
  const curChar = curString.substr(curStrPos).charAt(0);
  if (curChar === '>' || curChar === ';') {
    let endTag = '';
    if (curChar === '>') {
      endTag = '<';
    } else {
      endTag = '&';
    }
    while (curString.substr(curStrPos - 1).charAt(0) !== endTag) {
      curStrPos--;
      if (curStrPos < 0) {
        break;
      }
    }
    curStrPos--;
  }
  return curStrPos;
}
