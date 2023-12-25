import $ from 'jquery';

const loadLibrary = () => {
    const script = document.createElement('script');
    const src = 'https://code.jquery.com/jquery-3.6.4.min.js';
    script.src = src;
    document.head.appendChild(script);
    const el = $(document.head)
        .children(`script[src="${src}"]`);
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            if (el.length) {
                clearInterval(intervalId);
                resolve(null);
            }
        }, 100);
    });
};

const setCountRows = () => {
    const select = $('select[name="example_length"]')
        .val('100')
        .trigger('change');
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            if (select.val() === '100') {
                clearInterval(intervalId);
                resolve(null);
            }
        }, 100);
    });
};

const getWordsFromPage = () => {
    const rows: any[] = [];
    $('tbody tr[role="row"]')
        .each(function () {
            const td = $(this)
                .children('td');

            // eslint-disable-next-line max-len
            const difficultyLevel = parseInt(td.eq(0)
                .children('.rating')
                .attr('class')!.match(/rating(\d+(\.\d+)?)/)![1] as string, 10);
            const eng = td.eq(1)
                .children('b')
                .text();
            const transcriptionEng = td.eq(2)
                .children('.sound')
                .text();
            const transcriptionRus = td.eq(2)
                .children('.small')
                .text();
            const audioLink = (() => {
                const audioName = td.eq(2)
                    .children('small')
                    .attr('data-audio');
                return `https://poliglot16.ru/audio/words/${audioName?.[3]}/${audioName}`;
            })();
            const rus = td.eq(3)
                .find('span')
                .text();
            rows.push({
                difficultyLevel,
                eng,
                audioLink,
                transcriptionEng,
                transcriptionRus,
                rus,
            });
        });
    return rows;
};

const waitingRows = async (pageN: number) => {
    await new Promise((resolve) => {
        const interval = setInterval(() => {
            // eslint-disable-next-line no-use-before-define
            if (getBtn(pageN)
                .hasClass('active')) {
                clearInterval(interval);
                resolve(null);
            }
        }, 100);
    });
};
const getBtn = (pageN: number) => {
    return $('.paginate_button a')
        .filter(function () {
            return $(this)
                .text() === String(pageN);
        })
        .parent();
};
const onCLick = async (pageN: number) => {
    // @ts-ignore
    const nextBtn = getBtn(pageN);

    await new Promise((resolve) => {
        nextBtn.on('click', async () => {
            await waitingRows(pageN);
            resolve(null);
        });
        nextBtn.trigger('click');
    });
};

const getWords = async () => {
    const rows = [];
    let pageN = 1;
    const pagesCount = parseInt($('.paginate_button:not(.next):last')
        .text(), 10);
    console.log('...парсинг');
    for (; pageN <= pagesCount; pageN += 1) {
        // eslint-disable-next-line no-await-in-loop
        await onCLick(pageN);
        const item = getWordsFromPage();
        rows.push(...item);
    }

    fetch('http://localhost:8000/dictionary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rows),
    })
        .then((dat) => {
            console.log(dat);
        })
        .catch((e) => {
            console.log(e);
        });
    console.log(rows);
};

loadLibrary()
    .then(() => {
        setCountRows()
            .then(async () => {
                await getWords();
            });
    });
