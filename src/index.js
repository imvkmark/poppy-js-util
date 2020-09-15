import { browser as _browser } from './poppy/_http.js';
import { viewport as _viewport } from './poppy/_view.js';
import { windowHeight as _windowHeight } from './poppy/_view.js';

export { isUrl, buildUrl, domain, queryString } from './poppy/_http.js';
export { classie } from './poppy/_dom.js';
export { toJson } from './poppy/_json.js';
export { isEmail, isMobile, isTouchDevice, random, uniqueId, debugTime, isNumber, removerBlank } from './poppy/_util.js';
export { fullScreen, exitFullScreen } from './poppy/_view.js';

export const browser = _browser();
export const viewport = _viewport();
export const windowHeight = _windowHeight();

