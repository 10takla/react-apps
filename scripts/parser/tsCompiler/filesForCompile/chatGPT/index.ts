const subject = 'Методология научных исследований';
const message = `Твоя задача дать хороший содержательный 
ответ на экзаменационный вопрос по предмету: «${subject}» на 
русском языке. Вопрос: «{message}»`;

const questions = [
    'Наука и другие формы освоения действительности.',
    'Формулирование цели и задачи исследования в магистерской диссертации.',
    'Социальные функции науки.',
];

(async () => {
    const answers = [];
    for (const question of questions) {
        const answer = await sendMessageGetAnswer(message.replace('{message}', question));
        answers.push([question, answer]);
    }
    console.log(answers);
})();

async function sendMessageGetAnswer(message) {
    let answer;
    try {
        await sendMessage(message);
        console.log('сообщение отправилось');
        await waitAnswer();
        console.log('сообщение готово');
    } catch (e) {
        console.log(e.message);
    } finally {
        answer = getAnswer(message);
        console.log('сообщение получено');
    }
    return answer;
}

async function sendMessage(message) {
    return new Promise((resolve, reject) => {
        const inputField = document.querySelector('#prompt-textarea');
        inputField.value = message;

        oneTimeEvent(inputField, 'input', () => {
            // ожидание пока кнопка не разблокируется
            const interval = setInterval(() => {
                const sendMessageBtn = document.querySelector("button[data-testId='send-button']");
                if (!sendMessageBtn?.hasAttribute('disabled')) {
                    sendMessageBtn?.dispatchEvent(new MouseEvent('click', {
                        bubbles: true,
                    }));
                    clearInterval(interval);
                    resolve();
                }
            }, 100);

            // очистить инwтервал если кнопка не разблокировалась спустя время
            setTimeout(() => {
                if (interval) {
                    clearInterval(interval);
                    reject(new Error('кнопкпа отправки сообщения не разблокировалсь'));
                }
            }, 1000);
        });

        inputField?.dispatchEvent(new Event('input', {
            bubbles: true,
        }));
    });
}

async function waitAnswer() {
    return intervalPromise(
        [
            100,
            () => {
                const el = document.querySelector('button[aria-label="Остановить генерацию"]');
                return !el;
            },
        ],
        [180000, 'время вышло'],
    );
}

function oneTimeEvent(el, type, fn) {
    const handle = () => {
        fn();
        el?.removeEventListener(type, handle);
    };

    el?.addEventListener(type, handle);
}

function intervalPromise(
    [resolveTimeout, compare, then],
    [errTimeout, errMessage],
) {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (compare()) {
                then?.();
                clearInterval(interval);
                resolve();
            }
        }, resolveTimeout);

        setTimeout(() => {
            if (interval) {
                clearInterval(interval);
                reject(new Error(errMessage));
            }
        }, errTimeout);
    });
}

function getAnswer(message) {
    let findAnswer;
    document.querySelectorAll('.flex.flex-col.pb-9 > div').forEach((chatBlock) => {
        const nameTitle = chatBlock.querySelector('.font-semibold.select-none');
        if (nameTitle) {
            if (nameTitle.textContent === 'Вы') {
                if (nameTitle.nextElementSibling?.textContent === message) {
                    const answerBlock = chatBlock.nextElementSibling
                        ?.querySelector('.font-semibold.select-none')
                        ?.nextElementSibling
                        ?.childNodes[0].childNodes[0];
                    findAnswer = parseHtmlMessage(answerBlock);
                }
            }
        }
    });
    if (findAnswer) {
        return findAnswer;
    }
    // throw Error('ответ не найден');
}

function parseHtmlMessage(el) {
    // const tmp = (el) => {
    //     el?.childNodes.forEach((child) => {
    //         try {
    //             console.log(child);
    //             const styles = window.getComputedStyle(child);
    //             const stylesStr = Array.from(styles).map((key) => `${key}: ${styles[key]}`).join('; ');
    //             child?.setAttribute('style', stylesStr);
    //             console.log(child);
    //             tmp(child);
    //         } catch {

    //         }
    //     });
    // };
    // tmp(el);
    return el.innerHTML;
}
