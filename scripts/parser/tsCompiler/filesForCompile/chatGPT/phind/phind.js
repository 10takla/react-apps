const inputField = document.querySelector('.form-control');

inputField.value = 'some text';
inputField.textContent = 'some text';
[
    // 'abort', 'animationend', 'animationiteration', 'animationstart',
    // 'aos:in:countup:in', 'auxclick', 'blur', 'cancel', 'canplay',
    // 'canplaythrough', 
    'change', 
    'click', 
    // 'close', 'compositionend',
    // 'compositionstart', 'compositionupdate', 'contextmenu', 'copy',
    // 'cut', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragexit',
    // 'dragleave', 'dragover', 'dragstart', 'drop', 'durationchange',
    // '2ip6963:requestProvider', 'emptied', 'encrypted', 'ended',
    // 'error', 'Focus', 'focusin', 'focusout', 'gotpointercapture',
    // 'hashchange',
    'input',
    'invalid', 
    // 'keydown', 'keypress',
    // 'keyup', 'load', 'loadeddata', 'loadedmetadata',
    // 'loadstart', 'lostpointercapture', 'message', 'mousedoun',
    // 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'offline',
    // 'orientationchange',
    // 'pagehide',
    // 'pageshow',
    // 'paste',
    // 'pause', 'play', 'playing', 'pointercancel', 'pointerdown',
    // 'pointermove', 'pointerout', 'pointerover', 'pointerup', 'popstate',
    // 'progress', 'ratechange', 'reset', 'resize', 'scroll', 'seeked',
    // 'seeking', 'selectionchange', 'stalled', 'storage',
    // 'online',
    // 'submit',
    // 'suspend',
    // 'textInput',
    // 'timeupdate', 'toggle', 'touchcancel',
    // 'touchend', 'transitionend', 'unhandledrejection', 'visibilitychange',
    // 'volumechange', 'waiting',
].forEach((event) => {
    try {
        inputField.addEventListener(event, (e) => {
            // e.preventDefault();
            // e.stopPropagation();
            console.log(event);
        });
        inputField.dispatchEvent(
            new Event(event, {
                bubbles: true,
            }),
        );
    } catch (e) {
        // console.log(e.message);
    }
});
