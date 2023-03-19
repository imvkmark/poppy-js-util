import { strAfter, strBefore, strRandom } from "./string";

/**
 * 方便添加维护类
 * @returns {{hasClass: *, addClass: *, removeClass: *, toggleClass: toggleClass, has: *, add: *, remove: *, toggle: toggleClass}}
 */
export function classie() {
    function classReg(className: string) {
        return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    let hasClass: any, addClass: any, removeClass: any;

    if ('classList' in document.documentElement) {
        hasClass = function (elem: Element, c: string) {
            return elem.classList.contains(c);
        };
        addClass = function (elem: Element, c: string) {
            elem.classList.add(c);
        };
        removeClass = function (elem: Element, c: string) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function (elem: Element, c: string) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem: Element, c: string) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem: Element, c: string) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem: Element, c: string) {
        let fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    return {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };
}


/**
 * return a promise that resolves with a File instance
 * https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
 * @param url
 */
export const base64ToFile = (url: string) => {
    // data:image/png;base64,iVBO
    let extension = strAfter(strBefore(url, ';base64'), '/');
    if (!extension) {
        extension = 'png';
    }
    let filename = strRandom(8) + '.' + extension
    let mimeType = 'image/' + extension;

    return (fetch(url)
            .then(function (res) {
                return res.arrayBuffer();
            })
            .then(function (buf) {
                return new File([buf], filename, { type: mimeType });
            })
    );
}