const subject = 'Методология научных исследований';
const message = `Твоя задача дать хороший содержательный ответ на экзаменационный вопрос по предмету: «${subject}» на русском языке. Вопрос: «{message}». Ничего не переспрашивай, сразу выдавай ответ.`;

const questions = [
    'Введение в методологию научных исследований.',
    'Определение науки.',
    'Наука и другие формы освоения действительности.',
    'Основные этапы развития науки.',
    'Понятие о научном знании.',
    'Методы научного познания.',
    'Этические и эстетические основания методологии.',
    'Методы выбора и цели научного исследования.',
    'Постановка научно-технической проблемы. Этапы научноисследовательской работы.',
    'Актуальность и научная новизна исследования.',
    'Выдвижение рабочей гипотезы.',
    'Документальные источники информации.',
    'Анализ документов.',
    'Поиск и накопление научной информации.',
    'Обработка научной информации, ее фиксация и хранение.',
    'Электронные формы информационных ресурсов.',
    'Методы и особенности теоретических исследований.',
    'Общие сведения об экспериментальных исследованиях.',
    'Структура и модели теоретического исследования.',
    'Методика и планирование эксперимента.',
    'Метрологическое обеспечение экспериментальных исследований.',
    'Влияние психологических факторов на ход и качество эксперимента.',
    'Организация рабочего места экспериментатора.',
    'Основы теории случайных ошибок и методов оценки случайных погрешностей в измерениях.',
    'Интервальная оценка измерений с помощью доверительной вероятности.',
    'Методы графической обработки результатов измерений.',
    'Оформление результатов научного исследования.',
    'Устное представление информации.',
    'Изложение и аргументация выводов научного исследования.',
    'Понятие и признаки магистерской диссертации.',
    'Структура магистерской диссертации.',
    'Формулирование цели и задачи исследования в магистерской диссертации.',
    'Объекты изобретений.',
    'Условия патентоспособности изобретения, полезного образца и промышленной модели.',
    'Патентный поиск.',
    'Структурная организация научного коллектива и методы управления научными исследованиями.',
    'Основные принципы организации деятельности научного коллектива.',
    'Методы сплочения научного коллектива.',

    'Психологические аспекты взаимоотношения руководителя и подчиненного.',
    'Особенности научной деятельности.',
    'Социальные функции науки.',
    'Наука и нравственность.',
    'Противоречия в современной науке и практике.',
].slice(40, 41);

(async () => {
    const answers = [];
    const end = document.querySelector('.sticky-top');

    end.addEventListener('click', () => {
        console.log(answers);
    });
    console.log(questions);
    for (const question of questions) {
        const s = message.replace('{message}', question);
        const answer = await sendMessageGetAnswer(s);
        answers.push([question, answer]);
    }
    console.log(answers);
})();

async function sendMessageGetAnswer(message) {
    let answer;
    try {
        const model = 'GPT-4';
        // model = 'Phind Model';
        if (document.querySelector('.dropdown > .btn.text-black').textContent !== model) {
            throw Error('не GPT-4');
        }
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
        const inputField = document.querySelector('.form-control');
        inputField.value = message;
        inputField.textContent = message;
        oneTimeEvent(inputField, 'input', () => {
            setTimeout(() => {
                const sendMessageBtn = document.querySelector('.btn-group > button:last-child');

                oneTimeEvent(sendMessageBtn, 'click', () => {
                    intervalPromise(
                        [
                            100,
                            () => {
                                const el = document.querySelector('.container-xl > .btn.btn-no-border');
                                return el;
                            },
                        ],
                        [250000, 'время вышло'],
                    ).then(() => {
                        resolve();
                    });
                });

                sendMessageBtn?.dispatchEvent(new MouseEvent('click', {
                    bubbles: true,
                }));
            }, 1500);
        });
    });
}

async function waitAnswer() {
    return intervalPromise(
        [
            100,
            () => {
                const el = document.querySelector('.container-xl > .btn.btn-no-border');
                console.log('ожидание...');
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
        }, errTimeout || 300000);
    });
}

function getAnswer(message) {
    let findAnswer;
    document.querySelectorAll('.mt-8 > div').forEach((chatBlock) => {
        const nameTitle = chatBlock.querySelector('.badge');
        if (nameTitle) {
            if (nameTitle.textContent === 'User') {
                const t = nameTitle.nextElementSibling?.nextElementSibling.querySelector('span');
                if (t.textContent.replace(/\u00A0/g, ' ').trim() === message) {
                    const answerBlock = chatBlock.previousElementSibling
                        ?.querySelector('.mt-8 > div .badge')
                        ?.nextElementSibling
                        ?.nextElementSibling;
                    console.log([
                        message,
                        parseHtmlMessage(answerBlock),
                    ]);
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
