const config = {
    '1': {
        id: 1,
        src: 'video/1/',
        answer: {
            '1': 'Турбо-пушка',
            '2': 'Доширак',
            '3': 'Крокодил-крокожу',
            '4': 'Курточка Stone Island'
        },
        video: {
            '1': 'Produce_0.mp4',
            '2': 'Produce_1.mp4',
            '3': 'Produce_2.mp4',
            '4': 'Produce_3.mp4',
            '5': 'Produce_4.mp4',
            'itog': 'Itog.mp4'
        },
        answerSuccess: 1
    },
    '2': {
        id: 2,
        src: 'video/2/',
        answer: {
            '1': 'Спинер',
            '2': 'Время ток',
            '3': 'Освежи меня',
            '4': 'Гамора'
        },
        video: {
            '1': 'Produce_0.mp4',
            '2': 'Produce_1.mp4',
            '3': 'Produce_2.mp4',
            '4': 'Produce_3.mp4',
            '5': 'Produce_4.mp4',
            'itog': 'Itog.mp4'
        },
        answerSuccess: 2
    },
    '3': {
        id: 3,
        src: 'video/3/',
        answer: {
            '1': 'Нет монет',
            '2': 'Злой',
            '3': 'Гранж-стайл',
            '4': 'Где сейчас?'
        },
        video: {
            '1': 'Produce_0.mp4',
            '2': 'Produce_1.mp4',
            '3': 'Produce_2.mp4',
            '4': 'Produce_3.mp4',
            '5': 'Produce_4.mp4',
            'itog': 'Itog.mp4'
        },
        answerSuccess: 3
    }
};

const playVideo = (src, id = 1, videoId = null) => {
    document.querySelector('.row').innerHTML = answer(id, src.toLowerCase().indexOf('itog') === -1 ? videoId : 'answer');
    document.getElementsByTagName('video')[0].src = config[id].src + src;
    let elementList = document.querySelectorAll('.page-item');
    for (let elem of elementList) {
        elem.classList.remove('active');
        if (elem.children[0].dataset.src === src) {
            elem.classList.add('active');
        }
    }
};

const next = (id) => {
    id = Number(id);
    if (typeof(config[id + 1]) !== 'undefined' && config[id + 1] !== null) {
        document.getElementById('listOption').innerHTML = listOption(id + 1);
        document.querySelector('.row').innerHTML = answer(id + 1);
        playVideo(config[id + 1].video[1], id + 1);
        addButtonBack();
    }
    if (id + 1 === 3) {
        document.getElementById('next').remove();
    }
    localStorage.setItem('answer', JSON.stringify([]))
};

const addButtonBack = (id = 2) => {
    if (config[id] !== undefined) {
        document.getElementById('listOption').innerHTML = `<li class="page-item" id="back"><a class="page-link" data-id="${config[id].id}" onclick="back(this.dataset.id)" href="#">Back</a></li>` + document.getElementById('listOption').innerHTML;
    }
};

const back = (id = 2) => {
    id = Number(id);
    if (config[id] !== undefined && typeof(config[id]) !== 'undefined' && config[id] !== null) {
        document.getElementById('listOption').innerHTML = listOption(id);
        document.querySelector('.row').innerHTML = answer(id);
        playVideo(config[id].video[1], id);
        addButtonBack(id - 1);
    }
    localStorage.setItem('answer', JSON.stringify([]))
};

const listOption = (id = 1) => {
    let arr = [];
    for (var item in config[id].video) {
        if (item === 'itog') {
            arr.push(`<li class="page-item"><a class="page-link" data-id="${config[id].id}" data-src="${config[id].video[item]}" onclick="playVideo(this.dataset.src, this.dataset.id)" href="#">Ответ</a></li>`);
            arr.push(`<li class="page-item" id="next"><a class="page-link" data-id="${config[id].id}" onclick="next(this.dataset.id)" href="#">Next</a></li>`);
        } else {
            arr.push(`<li class="page-item ${item === '1' ? 'active' : ''}"><a class="page-link" data-id="${config[id].id}" data-videoId="${item}" data-src="${config[id].video[item]}" onclick="playVideo(this.dataset.src, this.dataset.id, this.dataset.videoid)" href="#">${item}</a></li>`);
        }
    }
    return arr.join('');
};

const answerColor = (name) => {
    let answer = JSON.parse(localStorage.getItem('answer')) === undefined ? localStorage.setItem('answer', JSON.stringify([])) : JSON.parse(localStorage.getItem('answer'));
    let teamOne = 'btn-primary';
    let teamTwo = 'btn-danger';
    let answerDouble = 'answerDouble';
    let answers = document.querySelectorAll('.col');
    for (let item of answers) {
        if (item.children[0].dataset.answer === name) {
            if (answer.length === 0) {
                answer.push([name, teamOne]);
                localStorage.setItem('answer', JSON.stringify(answer))
                item.children[0].classList.add(teamOne);
                item.children[0].classList.remove('btn-outline-secondary');
            } else if(answer.length === 1) {
                if (item.children[0].classList.value.indexOf(teamOne) === -1) {
                    answer.push([name, teamTwo]);
                    localStorage.setItem('answer', JSON.stringify(answer))
                    item.children[0].classList.add(teamTwo);
                    item.children[0].classList.remove('btn-outline-secondary');
                } else {
                    answer.push([name, answerDouble]);
                    localStorage.setItem('answer', JSON.stringify(answer))
                    item.children[0].classList.add(answerDouble);
                    item.children[0].classList.remove('btn-outline-secondary');
                }
            }
        }
    }
};

const answer = (id = 1, videoId = 1) => {
    let arr = [];
    let answerSuccess = 'btn-success';
    let flag = videoId === 'answer' ? 1 : 0;
    videoId = videoId !== 'answer' ? Number(videoId) : 5;
    if (videoId === 2) {
        arr.push(`
            <div class="col">
                <button type="button" class="btn btn-outline-secondary btn-lg btn-block" data-answer="${config[id].answer[videoId]}" onclick="answerColor(this.dataset.answer)">
                    ${config[id].answer[videoId]}
                </button>
            </div>
        `);
    } else if (videoId === 3 || videoId === 4 || videoId === 5) {
        for (let item = 1; item < videoId; item++) {
            let color = '';
            let ans = JSON.parse(localStorage.getItem('answer')) ?? null;
            if (ans) {
                ans.map(value => {
                    if (value[0] === config[id].answer[item]) {
                        color = value[1];
                    }
                });
            }
            if (arr.length === 2) {
                console.log(flag, videoId, config[id].answer[item], config[id].answer[config[id].answerSuccess])
                arr.push(`
                    <div class="w-100"><br></div>
                        <div class="col">
                        <button type="button" class="btn btn-lg btn-block ${flag && config[id].answer[item] === config[id].answer[config[id].answerSuccess] ? answerSuccess : color !== '' ? color : 'btn-outline-secondary'}" data-answer="${config[id].answer[item]}" onclick="answerColor(this.dataset.answer)">
                            ${config[id].answer[item]}
                        </button>
                    </div>
                `);
            } else {
                arr.push(`
                    <div class="col">
                        <button type="button" class="btn btn-lg btn-block ${flag && config[id].answer[item] === config[id].answer[config[id].answerSuccess] ? answerSuccess : color !== '' ? color : 'btn-outline-secondary'}" data-answer="${config[id].answer[item]}" onclick="answerColor(this.dataset.answer)">
                            ${config[id].answer[item]}
                        </button>
                    </div>
                `);
            }
        }
    }

    return arr.join('');
};

document.getElementById('listOption').innerHTML = listOption();
document.querySelector('.row').innerHTML = answer();
document.getElementsByTagName('video')[0].volume = 0.2;
localStorage.setItem('answer', JSON.stringify([]))