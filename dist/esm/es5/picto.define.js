
// picto: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './picto.core.js';
import { COMPONENTS } from './picto.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
