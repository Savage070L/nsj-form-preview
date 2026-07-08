/* ============================================================
   Заявление НСЖ (SAQTAU / PRO LIFE) — статичная копия формы
   TestViewMain для предпросмотра дизайна на GitHub Pages.
   Вся логика формы (мастер, условные поля, выгодоприобретатели,
   плитки заболеваний) воспроизведена на чистом JS. Бэкенда нет.
   ============================================================ */
'use strict';

/* ---------- маленький DOM-хелпер ---------- */
function h(tag, props, ...kids) {
    const e = document.createElement(tag);
    if (props) for (const [k, v] of Object.entries(props)) {
        if (v == null || v === false) continue;
        if (k === 'class') e.className = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k === 'text') e.textContent = v;
        else if (k === 'style') e.style.cssText = v;
        else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
        else if (v === true) e.setAttribute(k, '');
        else e.setAttribute(k, v);
    }
    for (let kid of kids.flat()) {
        if (kid == null || kid === false) continue;
        e.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return e;
}
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- иконки (компактные линейные SVG в стиле Vaadin) ---------- */
const P = {
    wallet: '<path d="M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/><path d="M3 7l2-3h11l2 3"/><circle cx="17" cy="13" r="1.3" fill="currentColor" stroke="none"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    heart: '<path d="M12 20s-7-4.6-9-9.2C1.4 6.9 4 4 7 4c2 0 3.4 1.2 5 3 1.6-1.8 3-3 5-3 3 0 5.6 2.9 4 6.8C19 15.4 12 20 12 20z"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c0-3.2 2.7-5.4 6-5.4S15 15.8 15 19"/><path d="M16 5.2A3.2 3.2 0 0 1 16 13"/><path d="M21 19c0-2.6-1.6-4.6-4-5.2"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
    doc: '<path d="M6 3h7l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M13 3v5h5M8 13h8M8 16.5h8"/>',
    hash: '<path d="M8 4l-1.6 16M17.6 4L16 20M4.5 9h15M3.5 15h15"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M6.5 14.5h4"/>',
    barcode: '<path d="M4 6v12M7 6v12M9.5 6v12M12 6v12M15 6v12M17 6v12M20 6v12"/>',
    institution: '<path d="M12 3l9 5H3l9-5z"/><path d="M5 9v8M9 9v8M15 9v8M19 9v8M3 20h18"/>',
    pencil: '<path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17"/>',
    home: '<path d="M4 11l8-6 8 6"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>',
    marker: '<path d="M12 21s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10z"/><circle cx="12" cy="11" r="2.2"/>',
    phone: '<path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
    envelope: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M4 7l8 6 8-6"/>',
    pie: '<path d="M12 3v9h9a9 9 0 1 0-9 9" /><path d="M12 3a9 9 0 0 1 9 9h-9z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    checkCircle: '<circle cx="12" cy="12" r="8.5"/><path d="M8 12l2.5 2.5L16 9"/>',
    ban: '<circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/>',
    arrowLeft: '<path d="M14 6l-6 6 6 6"/>',
    arrowRight: '<path d="M10 6l6 6-6 6"/>',
    gender: '<circle cx="10" cy="10" r="4.2"/><path d="M10 14.2V21M7 18h6"/><circle cx="17" cy="7" r="0"/>',
};
function icon(name, cls) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.7');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('class', 'ic' + (cls ? ' ' + cls : ''));
    svg.innerHTML = P[name] || '';
    return svg;
}

/* ---------- варианты (точно из Java-исходников) ---------- */
const O = {
    idDocument: ['Удостоверение личности', 'Загранпаспорт', 'Национальный паспорт', 'Свидетельство о рождении'],
    authority: ['Министерство внутренних дел РК', 'Министерство иностранных дел РК', 'Министерство юстиции РК', 'Иное'],
    gender: ['Мужской', 'Женский'],
    yesno: ['Да', 'Нет'],
    infoChannels: ['СМС', 'E-mail', 'Почта', 'WhatsApp'],
    premiumFrequency: ['Ежемесячно', 'Ежеквартально', 'Ежегодно', 'Раз в полугодие', 'Единовременно'],
    insurancePayments: ['Единовременно', 'Аннуитетные выплаты'],
    annuityPayments: ['Ежемесячно', 'Ежеквартально', 'Ежегодно', 'Раз в полугодие', 'Единовременно'],
    indexing: ['Включено', 'Исключено'],
    disabilityInsuranceAccident: [
        'Единовременная выплата 100% страховой суммы, в случае присвоения инвалидности первой группы, 80% страховой суммы, случае присвоения инвалидности второй группы',
        'Освобождение от уплаты страховых взносов в Случае утраты Застрахованным трудоспособности',
    ],
    injurySums: ['500 000', '1 000 000', '1 500 000', '2 000 000'],
    coverageSums: ['1 000 000', '2 000 000', '3 000 000', '4 000 000', '5 000 000'],
    disabilityGroup: ['1', '2', '3'],
};
const range = (from, to, step) => { const a = []; for (let v = from; v <= to; v += step) a.push(String(v)); return a; };
const BP_UP = range(90, 200, 5);
const BP_LOW = range(50, 140, 5);

/* Заболевания — порядок отображения (после reorderDiseases) + иконки */
const DISEASES = [
    'Нарушение слуха', 'Сахарный диабет', 'ИБС (стенокардия, инфаркт миокарда), другие болезни сердца',
    'Последствия травм', 'Болезни глаз', 'Болезни легких', 'Нет', 'Артериальная гипертония',
    'Болезни почек', 'Нарушения мозгового кровообращения и их последствия, эпилепсия',
    'Онкологические заболевания', 'Болезни печени', 'Другое',
];
const DISEASE_ICONS = {
    'Нет': 'icon-none', 'Сахарный диабет': 'icon-diabetes',
    'ИБС (стенокардия, инфаркт миокарда), другие болезни сердца': 'icon-heart',
    'Последствия травм': 'icon-trauma', 'Болезни глаз': 'icon-eyes', 'Болезни легких': 'icon-lungs',
    'Артериальная гипертония': 'icon-hypertension', 'Болезни почек': 'icon-kidneys',
    'Нарушения мозгового кровообращения и их последствия, эпилепсия': 'icon-brain',
    'Болезни печени': 'icon-liver', 'Нарушение слуха': 'icon-hearing',
    'Онкологические заболевания': 'icon-oncology', 'Другое': 'icon-other',
};

const STEP_TITLES = ['Страхователь', 'Застрахованный', 'Страховая защита', 'Выгодоприобретатели', 'Опросник'];

/* Типы выплат выгодоприобретателей */
const BT = {
    LUMP_END: 'Для получения единовременной выплаты по окончанию срока полиса',
    LUMP_ACCUM_DEATH: 'Единовременная выплата в случае смерти застрахованного в период накопления',
    ANNUITY_END: 'Для получения аннуитетной выплаты по окончанию срока полиса',
    ANNUITY_GUARANTEED: 'Для получения аннуитетной выплаты в гарантированный период в случае смерти застрахованного по окончанию срока полиса',
    ANNUITY_ACCUM_DEATH: 'Аннуитетная выплата в случае смерти застрахованного в период накопления',
};

/* ============================================================
   Построители полей
   ============================================================ */
let uid = 0;

function field(cfg) {
    const cls = ['field'];
    if (cfg.col2) cls.push('col-2');
    if (cfg.required) cls.push('required');
    if (cfg.hidden) cls.push('hidden');
    if (cfg.withIcon) cls.push('with-icon');
    if (cfg.extraClass) cls.push(cfg.extraClass);
    const wrap = h('div', { class: cls.join(' ') });
    wrap.dataset.kind = cfg.kind;
    if (cfg.id) wrap.dataset.fid = cfg.id;
    if (cfg.prop) wrap.dataset.prop = cfg.prop;
    const id = 'ctl' + (++uid);

    if (cfg.kind === 'radio' || cfg.kind === 'checkboxgroup') {
        wrap.append(h('span', { class: 'group-label' }, cfg.label));
        const grp = h('div', { class: 'choice-group' + (cfg.horizontal ? ' horizontal' : '') });
        (cfg.options || []).forEach(opt => {
            const inp = h('input', { type: cfg.kind === 'radio' ? 'radio' : 'checkbox', name: id, value: opt });
            grp.append(h('label', { class: 'opt' }, inp, h('span', {}, opt)));
        });
        wrap.append(grp);
    } else if (cfg.kind === 'checkbox') {
        const inp = h('input', { type: 'checkbox' });
        wrap.append(h('label', { class: 'single-check' + (cfg.large ? ' large-helper' : '') }, inp, h('span', {}, cfg.label)));
    } else {
        if (cfg.withIcon) wrap.append(icon(cfg.iconName || 'user', 'fi'));
        if (cfg.label) wrap.append(h('label', { for: id }, cfg.label));
        let control;
        if (cfg.kind === 'select') {
            control = h('select', { id });
            control.append(h('option', { value: '', disabled: true, selected: true, hidden: true }, cfg.placeholder || 'Выберите…'));
            (cfg.options || []).forEach(o => control.append(h('option', { value: o }, o)));
        } else if (cfg.kind === 'textarea') {
            control = h('textarea', { id, rows: cfg.rows || 2, placeholder: cfg.placeholder || '' });
        } else {
            const type = cfg.kind === 'email' ? 'email' : (cfg.kind === 'number' || cfg.kind === 'integer') ? 'text' : 'text';
            control = h('input', { id, type, placeholder: cfg.placeholder || '', inputmode: (cfg.kind === 'number' || cfg.kind === 'integer') ? 'numeric' : null });
            if (cfg.readonly) control.readOnly = true;
        }
        if (cfg.value != null) control.value = cfg.value;
        wrap.append(control);
        if (cfg.suffix) { wrap.style.position = 'relative'; wrap.append(h('span', { class: 'in-suffix' }, cfg.suffix)); }
    }
    if (cfg.helper) wrap.append(h('span', { class: 'helper' + (cfg.largeHelper ? ' large' : '') }, cfg.helper));
    return wrap;
}

function sectionEl(id, title, extraCard) {
    const det = h('details', { class: 'section' + (extraCard ? ' extra-card' : ''), open: true });
    if (id) det.id = id;
    det._summary = h('summary', {}, h('span', { class: 'card-summary-title' }, title));
    det._body = h('div', { class: 'section-body' });
    det.append(det._summary, det._body);
    return det;
}
function grid(...kids) { return h('div', { class: 'form-grid' }, kids.flat()); }

/* доступ к значению/пустоте поля */
function fval(wrap) {
    const kind = wrap.dataset.kind;
    if (kind === 'radio') { const c = $('input:checked', wrap); return c ? c.value : null; }
    if (kind === 'checkboxgroup') return $$('input:checked', wrap).map(i => i.value);
    if (kind === 'checkbox') return $('input', wrap).checked;
    const c = $('input,select,textarea', wrap); return c ? c.value : null;
}
function fclear(wrap) {
    $$('input,select,textarea', wrap).forEach(c => {
        if (c.type === 'checkbox' || c.type === 'radio') c.checked = false;
        else c.value = '';
    });
}
function onFchange(wrap, fn) {
    $$('input,select,textarea', wrap).forEach(c => c.addEventListener('change', () => fn(fval(wrap))));
    return wrap;
}
function reveal(wrap, on, { require: req, clear = true } = {}) {
    wrap.classList.toggle('hidden', !on);
    if (req != null) wrap.classList.toggle('required', on && req);
    if (!on && clear) fclear(wrap);
}

/* ============================================================
   Блок «удостоверение личности» (страхователь / застрахованный / доп.)
   ============================================================ */
function identityFields(refs, opts) {
    const F = {};
    const add = (key, cfg) => { const w = field(cfg); F[key] = w; refs[key] = w; if (cfg.id && cfg.id !== key) refs[cfg.id] = w; return w; };

    add('fio', { kind: 'text', label: 'ФИО', id: opts.fioId, prop: 'fio', col2: true, required: true, withIcon: opts.icons, iconName: 'user' });
    add('birthday', { kind: 'text', label: 'Дата рождения', prop: 'birthday', required: true, placeholder: 'дд.мм.гггг', withIcon: opts.icons, iconName: 'calendar' });
    add('gender', { kind: 'radio', label: 'Пол', id: 'gender', prop: 'gender', required: true, options: O.gender });
    add('idDocument', { kind: 'select', label: 'Документ, удостоверяющий личность', id: 'idDocument', prop: 'idDocument', required: true, options: O.idDocument, withIcon: opts.icons, iconName: 'doc' });
    add('no', { kind: 'text', label: '№', prop: 'no', required: true, withIcon: opts.icons, iconName: 'hash' });
    add('authority', { kind: 'select', label: 'Выдан', id: 'authority', prop: 'authority', required: true, options: O.authority, withIcon: opts.icons, iconName: 'institution' });
    add('authorityOther', { kind: 'text', label: 'Укажите, кем выдан', id: 'authorityOther', prop: 'authorityOther', col2: true, hidden: true, withIcon: opts.icons, iconName: 'pencil' });
    add('iin', { kind: 'text', label: 'ИИН', id: 'iin', prop: 'iin', hidden: true, withIcon: opts.icons, iconName: 'card' });
    add('series', { kind: 'text', label: 'Серия', id: 'series', prop: 'series', hidden: true, withIcon: opts.icons, iconName: 'barcode' });
    add('issueDate', { kind: 'text', label: 'Дата выдачи', prop: 'issueDate', required: true, placeholder: 'дд.мм.гггг', withIcon: opts.icons, iconName: 'calendar' });
    add('kzResident', { kind: 'checkbox', label: 'Не резидент РК', id: 'kzResident', prop: 'kzResident' });
    add('citizenship', { kind: 'text', label: 'Гражданство', id: 'citizenship', prop: 'citizenship', hidden: true, withIcon: opts.icons, iconName: 'globe' });

    // условные раскрытия — «Выдан = Иное»
    onFchange(F.authority, v => reveal(F.authorityOther, v === 'Иное', { require: true }));
    // «Не резидент РК» → «Гражданство»
    onFchange(F.kzResident, v => reveal(F.citizenship, v === true, {}));
    // документ → ИИН / Серия (+ рабочие поля, если есть)
    onFchange(F.idDocument, v => applyIdDocument(refs, v, opts));
    return F;
}
function applyIdDocument(refs, v, opts) {
    const set = (w, on, req) => { if (w) reveal(w, on, { require: req }); };
    let iin = false, series = false, work = false;
    switch (v) {
        case 'Загранпаспорт': iin = false; series = true; work = true; break;
        case 'Удостоверение личности': iin = true; series = false; work = true; break;
        case 'Национальный паспорт': iin = true; series = true; work = true; break;
        case 'Свидетельство о рождении': iin = true; series = false; work = false; break;
        default: iin = false; series = false; work = false;
    }
    set(refs.iin, iin, true); set(refs.series, series, true);
    if (opts.workplace) { set(refs.workPlace, work, true); set(refs.position, work, true); set(refs.jobDescr, work, true); }
}

/* ============================================================
   Шаг 1 — Страхователь (InsurerFragment)
   ============================================================ */
const R = { insurer: {}, insured: {}, protection: {}, quest: {}, agent: {} };
let insurerFio = () => (fval(R.insurer.fio) || '').trim();

function buildInsurer() {
    const det = sectionEl('insurerSection', 'ИНФОРМАЦИЯ О СТРАХОВАТЕЛЕ');
    const refs = R.insurer;
    const F = identityFields(refs, { fioId: 'insurerFio', icons: false, workplace: true });
    const extra = {};
    const add = (k, cfg) => { const w = field(cfg); extra[k] = w; refs[cfg.id || k] = w; return w; };
    add('taxResident', { kind: 'checkbox', label: 'Налоговый резидент США', col2: true });
    add('birthplace', { kind: 'text', label: 'Юридический адрес', prop: 'birthplace', col2: true });
    add('address', { kind: 'text', label: 'Фактический адрес', prop: 'address', col2: true, required: true, helper: '(Почтовый индекс, название области, города, села, улицы, микрорайона, номер дома, квартиры)' });
    add('isOfficial', { kind: 'radio', label: 'Является ли Застрахованный публичным должностным лицом?', id: 'isOfficial', col2: true, required: true, options: O.yesno, helper: 'Публичное должностное лицо - лицо, назначаемое или избираемое, занимающее какую-либо должность в законодательном, исполнительном, административном или судебном органе государства, а также любое лицо, выполняющее какую-либо публичную функцию для государства.' });
    add('workPlace', { kind: 'text', label: 'Место работы', id: 'workPlace', col2: true, required: true, hidden: true });
    add('position', { kind: 'text', label: 'Должность', id: 'position', col2: true, required: true, hidden: true });
    add('jobDescr', { kind: 'textarea', label: 'Точное описание служебных обязанностей', id: 'jobDescr', col2: true, required: true, hidden: true });
    add('phone', { kind: 'text', label: 'Мобильный телефон', prop: 'phone', required: true, placeholder: '+7 (___) ___-__-__' });
    add('email', { kind: 'email', label: 'E-mail', prop: 'email' });
    add('secondPhone', { kind: 'text', label: 'Дополнительные контакты', prop: 'secondPhone', placeholder: '+7 (___) ___-__-__' });
    add('infoChannels', { kind: 'checkboxgroup', label: 'Каким образом вы желаете получать информацию от Страховщика', col2: true, horizontal: true, options: O.infoChannels });

    det._body.append(grid(
        F.fio, F.birthday, F.gender, F.idDocument, F.no, F.authority, F.authorityOther, F.iin, F.series, F.issueDate,
        F.kzResident, F.citizenship, extra.taxResident, extra.birthplace, extra.address, extra.isOfficial,
        extra.workPlace, extra.position, extra.jobDescr, extra.phone, extra.email, extra.secondPhone, extra.infoChannels,
    ));

    // живое зеркало: любое изменение страхователя обновляет опцию выбора и, если выбран «Страхователь», данные застрахованного
    $$('input,select,textarea', det).forEach(c => c.addEventListener('input', onInsurerChanged));
    return det;
}
function onInsurerChanged() {
    refreshInsuredChoiceLabel();
    if (fval(R.insured.insuredChoice) === 'INSURER') fillInsuredFromInsurer();
    refreshPersonChoices();
}

/* ============================================================
   Шаг 2 — Застрахованный (insuredForm из XML)
   ============================================================ */
function buildInsured() {
    const det = sectionEl('insuredSection', 'ИНФОРМАЦИЯ О ЗАСТРАХОВАННОМ');
    const refs = R.insured;
    const choice = field({ kind: 'select', label: 'Выбрать застрахованного', id: 'insuredChoice', col2: true, placeholder: 'Выберите…' });
    refs.insuredChoice = choice;
    // опции с внутренними значениями INSURER / THIRD
    const sel = $('select', choice);
    sel.append(h('option', { value: 'INSURER', 'data-role': 'insurer' }, 'Страхователь'));
    sel.append(h('option', { value: 'THIRD' }, 'Третье лицо'));

    const F = identityFields(refs, { fioId: 'insuredFio', icons: false, workplace: true });
    const extra = {};
    const add = (k, cfg) => { const w = field(cfg); extra[k] = w; refs[cfg.id || k] = w; return w; };
    add('taxResident', { kind: 'checkbox', label: 'Налоговый резидент США', col2: true });
    add('birthplace', { kind: 'text', label: 'Юридический адрес', prop: 'birthplace', col2: true });
    add('address', { kind: 'text', label: 'Фактический адрес', prop: 'address', col2: true, required: true, helper: '(Почтовый индекс, название области, города, села, улицы, микрорайона, номер дома, квартиры)' });
    add('isOfficial', { kind: 'radio', label: 'Является ли Застрахованный публичным должностным лицом?', id: 'isOfficial', col2: true, required: true, options: O.yesno, helper: 'Публичное должностное лицо - лицо, назначаемое или избираемое, занимающее какую-либо должность в законодательном, исполнительном, административном или судебном органе государства, а также любое лицо, выполняющее какую-либо публичную функцию для государства.' });
    add('workPlace', { kind: 'text', label: 'Место работы', id: 'workPlace', col2: true, required: true, hidden: true });
    add('position', { kind: 'text', label: 'Должность', id: 'position', col2: true, required: true, hidden: true });
    add('jobDescr', { kind: 'textarea', label: 'Точное описание служебных обязанностей', id: 'jobDescr', col2: true, required: true, hidden: true });
    add('phone', { kind: 'text', label: 'Мобильный телефон', prop: 'phone', required: true, placeholder: '+7 (___) ___-__-__' });
    add('email', { kind: 'email', label: 'E-mail', prop: 'email' });
    add('secondPhone', { kind: 'text', label: 'Дополнительные контакты', prop: 'secondPhone', placeholder: '+7 (___) ___-__-__' });
    add('economicSector', { kind: 'text', label: 'Код сектора экономики', id: 'economicSector', col2: true, hidden: true });
    add('infoChannels', { kind: 'checkboxgroup', label: 'Каким образом вы желаете получать информацию от Страховщика', col2: true, horizontal: true, options: O.infoChannels });
    add('relationshipDegree', { kind: 'textarea', label: 'Характер взаимоотношений (степень родства) Страхователя и Застрахованного', id: 'relationshipDegree', col2: true, hidden: true });

    const addBtn = h('button', { class: 'btn btn-primary col-2', type: 'button', onclick: addAdditionalInsured }, '+ Добавить дополнительного застрахованного');
    refs.addBtn = addBtn;

    const g = grid(
        choice, F.fio, F.birthday, F.gender, F.idDocument, F.no, F.authority, F.authorityOther, F.iin, F.series, F.issueDate,
        F.kzResident, F.citizenship, extra.taxResident, extra.birthplace, extra.address, extra.isOfficial,
        extra.workPlace, extra.position, extra.jobDescr, extra.phone, extra.email, extra.secondPhone,
        extra.economicSector, extra.infoChannels, extra.relationshipDegree, addBtn,
    );
    refs.grid = g;
    det._body.append(g);

    // видимость до выбора застрахованного
    const SELF = ['insuredChoice', 'iin', 'series', 'citizenship', 'workPlace', 'position', 'jobDescr', 'economicSector', 'relationshipDegree', 'authorityOther'];
    refs._self = SELF;
    setInsuredFieldsVisible(false);

    onFchange(choice, v => {
        if (v === 'INSURER') { fillInsuredFromInsurer(); setInsuredFieldsVisible(true); reveal(refs.relationshipDegree, false, {}); }
        else if (v === 'THIRD') { clearInsured(); setInsuredFieldsVisible(true); reveal(refs.relationshipDegree, true, { require: false, clear: false }); }
        else { setInsuredFieldsVisible(false); reveal(refs.relationshipDegree, false, {}); }
        updateWizardBar();
    });
    // живое обновление пикеров выгодоприобретателей
    $$('input,select,textarea', g).forEach(c => c.addEventListener('input', () => refreshPersonChoices()));
    return det;
}
function setInsuredFieldsVisible(on) {
    const refs = R.insured;
    $$('.field, .btn', refs.grid).forEach(w => {
        if (w === refs.insuredChoice) return;
        const fid = w.dataset && w.dataset.fid;
        if (on && refs._self.includes(fid)) return; // сами управляют видимостью
        if (w.classList.contains('btn')) { w.classList.toggle('hidden', !on); return; }
        w.classList.toggle('hidden', !on);
    });
    if (on) { // повторно применить условные правила
        applyIdDocument(refs, fval(refs.idDocument), { workplace: true });
        reveal(refs.authorityOther, fval(refs.authority) === 'Иное', { require: true });
        reveal(refs.citizenship, fval(refs.kzResident) === true, {});
    }
}
function refreshInsuredChoiceLabel() {
    const opt = R.insured.insuredChoice && $('option[data-role="insurer"]', R.insured.insuredChoice);
    if (opt) { const f = insurerFio(); opt.textContent = f ? `Страхователь (${f})` : 'Страхователь'; }
}
function fillInsuredFromInsurer() {
    // зеркалим данные страхователя в застрахованного по data-prop
    $$('.field[data-prop]', R.insured.grid).forEach(dst => {
        const src = $(`#insurerSection .field[data-prop="${dst.dataset.prop}"]`);
        if (src) copyFieldValue(src, dst);
    });
    applyIdDocument(R.insured, fval(R.insured.idDocument), { workplace: true });
}
function copyFieldValue(src, dst) {
    const kind = src.dataset.kind;
    if (kind === 'radio') {
        const v = fval(src);
        $$('input', dst).forEach(i => i.checked = (i.value === v));
    } else if (kind === 'checkbox') {
        $('input', dst).checked = $('input', src).checked;
    } else {
        const c = $('input,select,textarea', dst); const s = $('input,select,textarea', src);
        if (c && s) c.value = s.value;
    }
}
function clearInsured() {
    $$('.field[data-prop]', R.insured.grid).forEach(fclear);
}

/* дополнительный застрахованный */
let additionalInsured = null;
function addAdditionalInsured() {
    if (additionalInsured) return;
    const det = sectionEl(null, 'ИНФОРМАЦИЯ О ДОП. ЗАСТРАХОВАННОМ', true);
    det._summary.append(h('button', { class: 'card-x', type: 'button', title: 'Убрать', onclick: removeAdditionalInsured }, '×'));
    const refs = {};
    const F = identityFields(refs, { fioId: 'additionalInsuredFio', icons: false, workplace: true });
    const extra = {};
    const add = (k, cfg) => { const w = field(cfg); extra[k] = w; return w; };
    add('birthplace', { kind: 'text', label: 'Юридический адрес', col2: true });
    add('address', { kind: 'text', label: 'Фактический адрес', col2: true, required: true, helper: '(Почтовый индекс, название области, города, села, улицы, микрорайона, номер дома, квартиры)' });
    add('workPlace', { kind: 'text', label: 'Место работы', id: 'workPlace', col2: true, required: true, hidden: true });
    add('position', { kind: 'text', label: 'Должность', id: 'position', col2: true, required: true, hidden: true });
    add('jobDescr', { kind: 'textarea', label: 'Точное описание служебных обязанностей', id: 'jobDescr', col2: true, required: true, hidden: true });
    add('phone', { kind: 'text', label: 'Мобильный телефон', required: true, placeholder: '+7 (___) ___-__-__' });
    add('email', { kind: 'email', label: 'E-mail' });
    add('secondPhone', { kind: 'text', label: 'Дополнительные контакты', placeholder: '+7 (___) ___-__-__' });
    // wire workplace via refs
    refs.workPlace = extra.workPlace; refs.position = extra.position; refs.jobDescr = extra.jobDescr;
    det._body.append(grid(
        F.fio, F.birthday, F.gender, F.idDocument, F.no, F.authority, F.authorityOther, F.iin, F.series, F.issueDate,
        F.kzResident, F.citizenship, extra.birthplace, extra.address, extra.workPlace, extra.position, extra.jobDescr,
        extra.phone, extra.email, extra.secondPhone,
    ));
    // вставляем сразу после секции застрахованного (тот же шаг 1)
    $('#insuredSection').after(det);
    additionalInsured = det;
    registerInStep(1, det);
    R.insured.addBtn.classList.add('hidden');
    // добавляем анкету доп. застрахованного на шаг 5
    addAdditionalQuestionnaire();
    $$('input,select,textarea', det).forEach(c => c.addEventListener('input', () => refreshPersonChoices()));
    goToStep(currentStep); // перерисовать видимость
}
function removeAdditionalInsured() {
    if (additionalInsured) { unregisterFromStep(1, additionalInsured); additionalInsured.remove(); additionalInsured = null; }
    removeAdditionalQuestionnaire();
    R.insured.addBtn.classList.remove('hidden');
    refreshPersonChoices();
    updateWizardBar();
}

/* ============================================================
   Шаг 3 — Страховая защита
   ============================================================ */
function buildProtection() {
    const det = sectionEl('protectionSection', 'СТРАХОВАЯ ЗАЩИТА');
    const refs = R.protection;

    // Ползунок «Период накопления»
    const accLabel = h('span', { class: 'group-label' }, 'ПЕРИОД НАКОПЛЕНИЯ (в годах): 1');
    const accSlider = h('input', { type: 'range', min: 1, max: 30, step: 1, value: 1, class: 'range-accum' });
    accSlider.addEventListener('input', () => accLabel.textContent = 'ПЕРИОД НАКОПЛЕНИЯ (в годах): ' + accSlider.value);
    const accWrap = h('div', { class: 'field col-2' }, accLabel, accSlider);

    const premium = field({ kind: 'integer', label: 'РАЗМЕР СТРАХОВОГО ВЗНОСА (премии), в тенге', required: true });
    const freq = field({ kind: 'select', label: 'ПЕРИОДИЧНОСТЬ ОПЛАТЫ СТРАХОВОЙ ПРЕМИИ', required: true, options: O.premiumFrequency });
    const payments = field({ kind: 'radio', label: 'ПЕРИОД СТРАХОВЫХ ВЫПЛАТ', id: 'insurancePayments', col2: true, required: true, options: O.insurancePayments });
    const annuityTerm = field({ kind: 'integer', label: 'Срок аннуитетных выплат', id: 'annuityTerm', hidden: true });
    const guaranteed = field({ kind: 'integer', label: 'Гарантированный период', id: 'guaranteedPeriod', hidden: true });
    const annuityPay = field({ kind: 'select', label: 'ПЕРИОДИЧНОСТЬ АННУИТЕТНЫХ ВЫПЛАТ', id: 'annuityPayments', hidden: true, options: O.annuityPayments });
    const indexing = field({ kind: 'radio', label: 'ИНДЕКСАЦИЯ', id: 'indexing', col2: true, required: true, options: O.indexing });
    refs.insurancePayments = payments;

    onFchange(payments, v => {
        const on = v === 'Аннуитетные выплаты';
        reveal(annuityTerm, on, { require: true }); reveal(guaranteed, on, { require: true }); reveal(annuityPay, on, { require: true });
        onPaymentPeriodChanged();
    });

    det._body.append(grid(accWrap, premium, freq, payments, annuityTerm, guaranteed, annuityPay, indexing));

    // Дополнительные страховые покрытия
    det._body.append(h('h5', { class: 'sub mt-l mb-l' }, 'ДОПОЛНИТЕЛЬНЫЕ СТРАХОВЫЕ ПОКРЫТИЯ'));
    const cov = h('div', {});
    cov.append(coverageItem('1. Выплата дополнительной страховой суммы в случае смерти Застрахованного в результате несчастного случая', null));
    cov.append(coverageItem('2. Страхование на случай утраты трудоспособности с установлением инвалидности 1, 2 группы в результате насчастного случая', { label: 'Выберите вариант', options: O.disabilityInsuranceAccident }));
    cov.append(coverageItem('3. Выплаты в соответствии с Таблицей выплат по телесным травмам в случае получения Застрахованным травмы в результате несчастного случая', { label: 'Выберите страховую сумму, тенге', options: O.injurySums }));
    cov.append(coverageItem('4. Выплаты в соответствии с Таблицей выплат по телесным травмам в случае получения Доп.Застрахованным травмы в результате несчастного случая', { label: 'Выберите страховую сумму, тенге', options: O.injurySums }));
    cov.append(coverageItem('5. Выплаты в случае госпитализации Застрахованного в результате несчастного случая', { label: 'Выберите страховую сумму, тенге', options: O.coverageSums }));
    cov.append(coverageItem('6. Выплаты в случае временной нетрудоспособности Застрахованным в результате несчастного случая', { label: 'Выберите страховую сумму, тенге', options: O.coverageSums }));
    cov.append(coverageItem('7. Страхование на случай критической болезни Застрахованного', { label: 'Выберите страховую сумму, тенге', options: O.coverageSums }));
    det._body.append(cov);
    return det;
}
function coverageItem(label, sel) {
    const box = h('div', { class: 'coverage-box' });
    const cb = h('input', { type: 'checkbox' });
    box.append(h('label', { class: 'single-check' }, cb, h('span', {}, label)));
    let sumField = null;
    if (sel) {
        sumField = field({ kind: 'select', label: sel.label, options: sel.options, hidden: true, extraClass: 'coverage-sum' });
        box.append(sumField);
    }
    cb.addEventListener('change', () => {
        box.classList.toggle('coverage-active', cb.checked);
        if (sumField) reveal(sumField, cb.checked, {});
    });
    return box;
}

/* ============================================================
   Шаг 4 — Выгодоприобретатели
   ============================================================ */
let beneficiaries = []; // {id, type, payPercent, data:{}}
let benefSeq = 0;
function buildBeneficiary() {
    const det = sectionEl('beneficiarySection', 'ВЫГОДОПРИОБРЕТАТЕЛИ');
    const mode = field({ kind: 'radio', label: 'Кто является выгодоприобретателем?', id: 'beneficiaryMode', col2: true, options: ['Законный(е) наследник(и)', 'Назначить выгодоприобретателя(ей)'] });
    R.benefMode = mode;
    const typeWrap = h('div', { class: 'hidden', id: 'typeBlocksContainer' });
    const cardsWrap = h('div', { class: 'hidden', id: 'contentWrapper' });
    R.benefTypeWrap = typeWrap; R.benefCards = cardsWrap;
    onFchange(mode, v => {
        beneficiaries = [];
        const on = !!v;
        typeWrap.classList.toggle('hidden', !on);
        cardsWrap.classList.toggle('hidden', !on);
        rebuildTypeBlocks();
        renderBenefCards();
        updateWizardBar();
    });
    det._body.append(grid(mode), typeWrap, cardsWrap);
    return det;
}
function beneficiaryTypeOptions() {
    const period = R.protection.insurancePayments ? fval(R.protection.insurancePayments) : null;
    const mode = fval(R.benefMode);
    let base = [];
    if (period === 'Аннуитетные выплаты') base = [BT.ANNUITY_END, BT.ANNUITY_GUARANTEED, BT.ANNUITY_ACCUM_DEATH];
    else if (period === 'Единовременно') base = [BT.LUMP_END, BT.LUMP_ACCUM_DEATH];
    else return { types: [], noPeriod: true };
    if (mode === 'Законный(е) наследник(и)') base = base.slice(0, 1);
    return { types: base, noPeriod: false };
}
function benefTypeIcon(t) {
    if (t.includes('гарантированный период')) return 'clock';
    if (t.includes('в период накопления')) return 'heart';
    return 'wallet';
}
function themeClass(i) { return ['benef-theme-green', 'benef-theme-teal', 'benef-theme-blue'][i % 3]; }

function rebuildTypeBlocks() {
    const wrap = R.benefTypeWrap; if (!wrap) return;
    wrap.innerHTML = '';
    if (fval(R.benefMode) == null) return;
    const { types, noPeriod } = beneficiaryTypeOptions();
    if (noPeriod) {
        wrap.append(h('div', { class: 'benef-hint' }, 'Сначала выберите «ПЕРИОД СТРАХОВЫХ ВЫПЛАТ» в разделе «Страховая защита».'));
        return;
    }
    const grid = h('div', { class: 'benef-cards-grid' });
    grid.style.setProperty('--benef-cols', types.length);
    grid.style.setProperty('--benef-share-font', types.length <= 1 ? '1rem' : types.length === 2 ? '0.92rem' : '0.86rem');
    types.forEach((t, i) => grid.append(buildTypeBlock(t, i)));
    wrap.append(grid);
}
function buildTypeBlock(type, index) {
    const card = h('div', { class: 'benef-card ' + themeClass(index) });
    card.append(h('div', { class: 'benef-card-icon' }, icon(benefTypeIcon(type))));
    card.append(h('div', { class: 'benef-card-header' }, type));
    const rows = h('div', { class: 'benef-card-rows' });
    const mine = beneficiaries.filter(b => b.type === type);
    let total = 0;
    mine.forEach((b, n) => { total += b.payPercent || 0; rows.append(buildShareRow(b, n + 1, type)); });
    card.append(rows);
    const footer = h('div', { class: 'benef-card-footer' });
    if (mine.length) {
        const totalLabel = h('span', {}, total >= 100 ? '100% распределено' : 'осталось ' + (100 - total) + '%');
        footer.append(h('div', { class: 'benef-total-row' }, icon('checkCircle'), totalLabel));
        const fill = h('div', { class: 'benef-progress-fill', style: 'width:' + Math.max(0, Math.min(100, total)) + '%' });
        footer.append(h('div', { class: 'benef-progress' }, fill));
        footer.append(h('div', { class: 'benef-scale' }, h('span', {}, '0%'), h('span', {}, '100%')));
    }
    const addBtn = h('button', { class: 'benef-add', type: 'button', onclick: () => addBeneficiary(type) }, icon('plus'), h('span', {}, 'Добавить выгодоприобретателя'));
    footer.append(addBtn);
    card.append(footer);
    return card;
}
function buildShareRow(b, number, type) {
    const row = h('div', { class: 'benef-share-row' });
    row.append(h('span', { class: 'benef-share-name' }, 'Выгодоприобретатель №' + number));
    const fieldWrap = h('div', { class: 'benef-share-field' });
    const inp = h('input', { type: 'text', inputmode: 'numeric', value: b.payPercent != null ? b.payPercent : '', placeholder: '0' });
    inp.addEventListener('change', () => onShareChange(b, inp, type));
    fieldWrap.append(inp);
    row.append(fieldWrap);
    row.append(h('button', { class: 'benef-del', type: 'button', title: 'Удалить выгодоприобретателя', onclick: () => removeBeneficiary(b) }, icon('close')));
    return row;
}
function onShareChange(b, inp, type) {
    let v = parseInt(inp.value, 10); if (isNaN(v)) v = 0; v = Math.max(0, v);
    const others = beneficiaries.filter(x => x.type === type && x !== b).reduce((s, x) => s + (x.payPercent || 0), 0);
    if (others + v > 100) { v = Math.max(0, 100 - others); toast('Сумма долей по этому типу выплаты не может превышать 100%'); }
    b.payPercent = v; inp.value = v;
    rebuildTypeBlocks();
    syncCardShares();
}
function addBeneficiary(type) {
    beneficiaries.push({ id: ++benefSeq, type, payPercent: null, data: {} });
    rebuildTypeBlocks();
    renderBenefCards();
    updateWizardBar();
}
function removeBeneficiary(b) {
    beneficiaries = beneficiaries.filter(x => x !== b);
    rebuildTypeBlocks();
    renderBenefCards();
    updateWizardBar();
}
function onPaymentPeriodChanged() {
    const { types } = beneficiaryTypeOptions();
    beneficiaries = beneficiaries.filter(b => types.includes(b.type));
    rebuildTypeBlocks();
    renderBenefCards();
    updateWizardBar();
}
function syncCardShares() {
    beneficiaries.forEach(b => { if (b._share) b._share.value = b.payPercent != null ? b.payPercent : ''; });
}

/* карточки данных выгодоприобретателей */
function renderBenefCards() {
    const wrap = R.benefCards; if (!wrap) return;
    wrap.innerHTML = '';
    const types = beneficiaryTypeOptions().types;
    const counters = {};
    beneficiaries.forEach(b => {
        counters[b.type] = (counters[b.type] || 0) + 1;
        wrap.append(buildBenefCard(b, counters[b.type], types.indexOf(b.type)));
    });
    refreshPersonChoices();
}
function buildBenefCard(b, number, themeIndex) {
    const themed = themeClass(Math.max(0, themeIndex));
    const det = sectionEl(null, '', false);
    det.classList.add('benef-data-card', themed);
    b._cardEl = det;
    const title = 'Выгодоприобретатель №' + number + (b.type ? ' — ' + b.type.charAt(0).toLowerCase() + b.type.slice(1) : '');
    $('.card-summary-title', det._summary).textContent = title;
    det._summary.append(h('button', { class: 'card-x', type: 'button', title: 'Удалить', onclick: () => removeBeneficiary(b) }, '×'));

    // селект «Выбрать выгодоприобретателя»
    const personChoice = field({ kind: 'select', label: 'Выбрать выгодоприобретателя', col2: true, placeholder: 'Выберите из заполненных ранее', withIcon: true, iconName: 'users' });
    b._person = personChoice;

    const share = field({ kind: 'integer', label: 'Доля в выплате', readonly: true, withIcon: true, iconName: 'pie', suffix: '%', value: b.payPercent != null ? b.payPercent : '' });
    b._share = $('input', share);
    const fio = field({ kind: 'text', label: 'ФИО', col2: true, required: true, placeholder: 'Введите ФИО', withIcon: true, iconName: 'user', prop: 'fio' });
    b._fio = fio;
    const birthday = field({ kind: 'text', label: 'Дата рождения', required: true, placeholder: 'дд.мм.гггг', withIcon: true, iconName: 'calendar' });
    const gender = field({ kind: 'radio', label: 'Пол', options: O.gender, required: true });
    const idDoc = field({ kind: 'select', label: 'Документ, удостоверяющий личность', required: true, options: O.idDocument, placeholder: 'Выберите документ', withIcon: true, iconName: 'doc' });
    const iin = field({ kind: 'text', label: 'ИИН', placeholder: 'Введите ИИН', withIcon: true, iconName: 'card' });
    const docNo = field({ kind: 'text', label: 'Номер документа', required: true, placeholder: 'Введите номер документа', withIcon: true, iconName: 'hash' });
    const series = field({ kind: 'text', label: 'Серия', hidden: true, placeholder: 'Введите серию', withIcon: true, iconName: 'barcode' });
    const authority = field({ kind: 'select', label: 'Выдан', required: true, options: O.authority, placeholder: 'Выберите орган выдачи', withIcon: true, iconName: 'institution' });
    const authorityOther = field({ kind: 'text', label: 'Укажите, кем выдан', col2: true, hidden: true, placeholder: 'Укажите орган выдачи', withIcon: true, iconName: 'pencil' });
    const issueDate = field({ kind: 'text', label: 'Дата выдачи', required: true, placeholder: 'дд.мм.гггг', withIcon: true, iconName: 'calendar' });
    const citizenship = field({ kind: 'text', label: 'Гражданство', hidden: true, placeholder: 'Введите гражданство', withIcon: true, iconName: 'globe' });
    const birthplace = field({ kind: 'textarea', label: 'Юридический адрес', col2: true, placeholder: 'Введите адрес', withIcon: true, iconName: 'home', helper: '(Почтовый индекс, название области, города, села, улицы, микрорайона, номер дома, квартиры)' });
    const address = field({ kind: 'textarea', label: 'Фактический адрес', col2: true, required: true, placeholder: 'Введите адрес', withIcon: true, iconName: 'marker', helper: '(Почтовый индекс, название области, города, села, улицы, микрорайона, номер дома, квартиры)' });
    const phone = field({ kind: 'text', label: 'Мобильный телефон', required: true, placeholder: '+7 (___) ___-__-__', withIcon: true, iconName: 'phone' });
    const email = field({ kind: 'email', label: 'E-mail', placeholder: 'Введите e-mail', withIcon: true, iconName: 'envelope' });

    // «Не резидент РК» — пилюля
    const kzPill = h('div', { class: 'benef-pill col-2' });
    kzPill.append(icon('ban', 'fi'));
    const kzInput = h('input', { type: 'checkbox' });
    kzPill.append(h('label', { class: 'opt' }, kzInput, h('span', {}, 'Не резидент РК')));

    // условные раскрытия
    onFchange(authority, v => reveal(authorityOther, v === 'Иное', { require: true }));
    kzInput.addEventListener('change', () => reveal(citizenship, kzInput.checked, {}));
    onFchange(idDoc, v => {
        let iinOn, seriesOn;
        switch (v) {
            case 'Загранпаспорт': iinOn = false; seriesOn = true; break;
            case 'Удостоверение личности': case 'Свидетельство о рождении': iinOn = true; seriesOn = false; break;
            case 'Национальный паспорт': iinOn = true; seriesOn = true; break;
            default: iinOn = true; seriesOn = false;
        }
        reveal(iin, iinOn, { require: false }); reveal(series, seriesOn, { require: true });
    });

    // персональный выбор
    const psel = $('select', personChoice);
    psel.addEventListener('change', () => applyPersonChoice(b, psel.value));

    // обновление доли и пикеров при вводе ФИО
    b._fioInput = $('input', fio);
    b._fioInput.addEventListener('input', () => refreshPersonChoices());

    det._body.append(grid(
        personChoice, share, fio, birthday, gender, idDoc, iin, docNo, series, authority, issueDate, kzPill,
        citizenship, authorityOther, birthplace, address, phone, email,
    ));
    return det;
}

/* пикеры «выбрать выгодоприобретателя» */
function collectPeople() {
    const people = [];
    const fioOf = (sectionSel, propFio) => {
        const w = $(`${sectionSel} .field[data-prop="fio"]`);
        return w ? (fval(w) || '').trim() : '';
    };
    const insurer = insurerFio();
    if (insurer) people.push({ label: `Страхователь (${insurer})`, src: '#insurerSection' });
    const insured = (fval(R.insured.fio) || '').trim();
    if (insured) people.push({ label: `Застрахованный (${insured})`, src: '#insuredSection' });
    if (additionalInsured) {
        const w = $('.field[data-prop="fio"]', additionalInsured);
        const f = w ? (fval(w) || '').trim() : '';
        if (f) people.push({ label: `Доп. застрахованный (${f})`, srcEl: additionalInsured });
    }
    return people;
}
function refreshPersonChoices() {
    if (!R.benefCards) return;
    const people = collectPeople();
    beneficiaries.forEach(b => {
        if (!b._person) return;
        const sel = $('select', b._person);
        const cur = sel.value;
        sel.innerHTML = '';
        sel.append(h('option', { value: '', disabled: true, selected: true, hidden: true }, 'Выберите из заполненных ранее'));
        people.forEach((p, i) => sel.append(h('option', { value: 'P' + i }, p.label)));
        // другие заполненные выгодоприобретатели
        beneficiaries.forEach(other => {
            if (other === b) return;
            const f = other._fioInput && other._fioInput.value.trim();
            if (f) sel.append(h('option', { value: 'B' + other.id }, `Выгодоприобретатель (${f})`));
        });
        sel.append(h('option', { value: 'OTHER' }, 'Выбрать другого'));
        b._peopleCache = people;
    });
}
function applyPersonChoice(b, val) {
    if (!val) return;
    if (val === 'OTHER') { clearBenefCard(b); return; }
    let srcRoot = null;
    if (val.startsWith('P')) { const p = (b._peopleCache || [])[parseInt(val.slice(1), 10)]; if (p) srcRoot = p.srcEl || (p.src ? $(p.src) : null); }
    else if (val.startsWith('B')) { const other = beneficiaries.find(x => 'B' + x.id === val); if (other) srcRoot = other._cardEl; }
    if (srcRoot && b._fio) {
        const srcFio = $('.field[data-prop="fio"]', srcRoot);
        if (srcFio) copyFieldValue(srcFio, b._fio);
    }
    refreshPersonChoices();
}
function clearBenefCard(b) {
    if (b._fio) fclear(b._fio);
}

/* ============================================================
   Шаг 5 — Опросник застрахованного
   ============================================================ */
function buildQuestionnaire() {
    const det = sectionEl('questionnaireSection', 'БЛАНК-ОПРОСНИК ЗАСТРАХОВАННОГО');
    const refs = R.quest;
    det._body.append(h('h5', { class: 'intro mt-l mb-l' }, 'Ваши ответы на предлагаемые ниже вопросы являются основным критерием для оценки страхового риска, поэтому просим вас предоставить на них достоверные и исчерпывающие ответы, а также всю дополнительную информацию, которая могла бы повлиять на принятие решения Страховщиком'));

    const height = field({ kind: 'number', label: 'Рост', required: true, helper: 'в сантиметрах' });
    const weight = field({ kind: 'number', label: 'Вес', required: true, helper: 'в килограммах' });

    const bpUpper1 = field({ kind: 'select', label: 'Верхнее (SYS)', options: BP_UP, placeholder: 'Верхнее (SYS)' });
    const bpLower1 = field({ kind: 'select', label: 'Нижнее (DIA)', options: BP_LOW, placeholder: 'Нижнее (DIA)' });
    const bpUpper2 = field({ kind: 'select', label: 'Верхнее (SYS)', options: BP_UP, placeholder: 'Верхнее (SYS)' });
    const bpLower2 = field({ kind: 'select', label: 'Нижнее (DIA)', options: BP_LOW, placeholder: 'Нижнее (DIA)' });

    const pregnant = field({ kind: 'radio', label: 'Беременны ли вы?', id: 'pregnant', required: true, hidden: true, options: O.yesno });
    const gestational = field({ kind: 'integer', label: 'Срок беременности', id: 'gestationalAge', hidden: true });
    const disabled = field({ kind: 'radio', label: 'Являетесь ли вы инвалидом?', id: 'disabled', required: true, options: O.yesno });
    const disabilityGroup = field({ kind: 'select', label: 'Группа инвалидности', id: 'disabilityGroup', hidden: true, options: O.disabilityGroup });
    refs.gender = R.insured.gender;

    onFchange(disabled, v => reveal(disabilityGroup, v === 'Да', { require: true }));

    const diseasesHeader = h('span', { class: 'q-label mt-m col-2', style: 'display:block' }, 'Укажите имеющиеся у вас заболевания');
    const otherDiseases = field({ kind: 'textarea', label: 'Укажите другое', id: 'otherDiseases', col2: true, hidden: true });
    refs.otherDiseases = otherDiseases;

    const upcomingSurgery = field({ kind: 'radio', label: 'Предстоит ли вам хирургическая операция?', id: 'upcomingSurgery', col2: true, required: true, options: O.yesno });
    const surgeryDesc = field({ kind: 'textarea', label: 'Укажите хирургическую операцию', id: 'surgeryDescription', col2: true, hidden: true });
    onFchange(upcomingSurgery, v => reveal(surgeryDesc, v === 'Да', { require: true }));

    const dangerousSports = field({ kind: 'radio', label: 'Занимаетесь/собираетесь заниматься опасными видами спорта?', id: 'dangerousSports', col2: true, required: true, options: O.yesno });
    const sportsDesc = field({ kind: 'textarea', label: 'Укажите виды', id: 'sportsDescription', col2: true, hidden: true });
    const sportBox = h('div', { class: 'bordered-box col-2' });
    onFchange(dangerousSports, v => {
        const on = v === 'Да';
        reveal(sportsDesc, on, { require: true });
        sportBox.classList.toggle('on', on);
        sportBox.innerHTML = '';
        if (on) sportBox.append(buildSportFragment());
    });

    const hazardous = field({ kind: 'radio', label: 'Связана ли ваша профессия с трудовой деятельностью, которую можно назвать опасной?', id: 'hazardousOccupation', col2: true, required: true, options: O.yesno });
    const occBox = h('div', { class: 'bordered-box col-2' });
    onFchange(hazardous, v => {
        const on = v === 'Да';
        occBox.classList.toggle('on', on);
        occBox.innerHTML = '';
        if (on) occBox.append(buildOccupationFragment());
    });

    // блок давления — заголовки + пары селектов
    const bpBlock = h('div', { class: 'col-2' },
        h('span', { class: 'bp-label mt-m', style: 'display:block' }, 'Укажите верхнее и нижнее рабочее артериальное давление'),
        h('div', { class: 'form-grid', style: 'margin-top:.5rem' }, bpUpper1, bpLower1),
        h('span', { class: 'bp-label mt-m', style: 'display:block' }, 'Укажите верхнее и нижнее максимально повышенное артериальное давление'),
        h('div', { class: 'form-grid', style: 'margin-top:.5rem' }, bpUpper2, bpLower2),
    );

    const g = grid(height, weight, bpBlock, pregnant, gestational, disabled, disabilityGroup);
    det._body.append(g);

    // блок заболеваний
    det._body.append(diseasesHeader);
    const diseaseGrid = h('div', { class: 'disease-grid' });
    const diseaseAnketas = h('div', { class: 'disease-anketas' });
    buildDiseaseChecklist(diseaseGrid, diseaseAnketas, otherDiseases);
    det._body.append(diseaseGrid, diseaseAnketas);
    det._body.append(grid(otherDiseases, upcomingSurgery, surgeryDesc, dangerousSports, sportsDesc, sportBox, hazardous, occBox));

    // условные раскрытия по полу застрахованного (беременность)
    refs.pregnant = pregnant; refs.gestational = gestational;
    onFchange(pregnant, v => reveal(gestational, v === 'Да', { require: true }));

    // агентский блок
    det._body.append(buildAgentBlock());
    R.questDet = det;
    return det;
}
function bindPregnantToGender() {
    // пол застрахованного управляет видимостью «Беременны ли вы?»
    const g = R.insured.gender;
    if (!g) return;
    onFchange(g, v => reveal(R.quest.pregnant, v === 'Женский', { require: true }));
}

function buildAgentBlock() {
    const wrap = h('div', { id: 'agentInfoForm' });
    wrap.append(h('h5', { class: 'sub mt-l' }, 'ИНФОРМАЦИЯ ОБ АГЕНТЕ'));
    const helped = field({ kind: 'radio', label: 'Помог ли вам агент заполнить заявление?', id: 'agentHelped', col2: true, options: O.yesno });
    const code = field({ kind: 'integer', label: 'Код сотрудника', id: 'employeeCode', col2: true, hidden: true });
    onFchange(helped, v => reveal(code, v === 'Да', { require: true }));
    wrap.append(grid(helped, code));
    R.agentBlock = wrap;
    return wrap;
}

/* плитки заболеваний */
function buildDiseaseChecklist(gridEl, anketasEl, otherDiseasesField) {
    const state = { selected: new Set(), anketas: {} };
    DISEASES.forEach(name => {
        const iconCls = DISEASE_ICONS[name] || 'icon-placeholder';
        const tile = h('div', { class: 'disease-tile' },
            h('div', { class: 'disease-icon ' + iconCls }),
            h('span', { class: 'disease-name' }, name));
        tile.addEventListener('click', () => toggleDisease(name, tile, state, gridEl, anketasEl, otherDiseasesField));
        gridEl.append(tile);
    });
}
function toggleDisease(name, tile, state, gridEl, anketasEl, otherDiseasesField) {
    const isNo = name === 'Нет';
    const selected = !tile.classList.contains('selected');
    if (isNo) {
        if (selected) {
            // эксклюзивно: снять и заблокировать остальные
            $$('.disease-tile', gridEl).forEach(t => {
                if (t === tile) return;
                t.classList.remove('selected'); t.classList.add('disabled');
            });
            Object.keys(state.anketas).forEach(k => { state.anketas[k].remove(); delete state.anketas[k]; });
            state.selected.clear();
            reveal(otherDiseasesField, false, {});
            tile.classList.add('selected');
        } else {
            $$('.disease-tile', gridEl).forEach(t => t.classList.remove('disabled'));
            tile.classList.remove('selected');
        }
        updateWizardBar();
        return;
    }
    tile.classList.toggle('selected', selected);
    if (selected) {
        state.selected.add(name);
        if (name === 'Другое') reveal(otherDiseasesField, true, { require: true, clear: false });
        const anketa = buildDiseaseAnketa(name);
        state.anketas[name] = anketa;
        anketasEl.append(anketa);
    } else {
        state.selected.delete(name);
        if (name === 'Другое') reveal(otherDiseasesField, false, {});
        if (state.anketas[name]) { state.anketas[name].remove(); delete state.anketas[name]; }
    }
    updateWizardBar();
}

/* анкета по заболеванию (Questionnaireondiseasesfragment) */
function buildDiseaseAnketa(name) {
    const det = sectionEl(null, 'АНКЕТА ПО ЗАБОЛЕВАНИЮ' + (name ? ' (' + name + ')' : ''), true);
    det._body.append(h('span', { class: 'anketa-intro' }, 'Заполнение данной анкеты необходимо по каждому заболеванию в отдельности. Пожалуйста, ответьте на каждый вопрос и подробно изложите все необходимые сведения.'));
    let n = 0; const num = () => (++n) + '. ';

    const sufferingNow = field({ kind: 'radio', label: num() + 'Вы страдаете данным заболеванием в настоящее время?', options: O.yesno });
    const severity = field({ kind: 'select', label: num() + 'Степень тяжести', options: ['Лёгкий дискомфорт', 'Мешает нормальной жизнедеятельности', 'Временная нетрудоспособность', 'Полная нетрудоспособность', 'Требуется госпитализация'] });
    onFchange(sufferingNow, v => {
        const sel = $('select', severity);
        const cur = sel.value;
        sel.innerHTML = '';
        sel.append(h('option', { value: '', disabled: true, selected: true, hidden: true }, 'Выберите…'));
        const base = ['Лёгкий дискомфорт', 'Мешает нормальной жизнедеятельности', 'Временная нетрудоспособность', 'Полная нетрудоспособность', 'Требуется госпитализация'];
        (v === 'Нет' ? ['Нет', ...base] : base).forEach(o => sel.append(h('option', { value: o }, o)));
    });

    const colLeft = h('div', { class: 'anketa-col' },
        sufferingNow,
        field({ kind: 'textarea', label: num() + 'Когда вы почувствовали первые признаки данного заболевания?' }),
        field({ kind: 'textarea', label: num() + 'Как часто вас беспокоит данное состояние?' }),
        severity,
        field({ kind: 'textarea', label: num() + 'Опишите симптомы' }),
        field({ kind: 'text', label: num() + 'Укажите дату последнего обострения / когда в последний раз ощущали симптомы', placeholder: 'дд.мм.гггг' }),
        field({ kind: 'radio', label: num() + 'Вы обращались к врачу по поводу данного состояния?', options: O.yesno }),
    );

    const surgeryOffered = field({ kind: 'radio', label: '', options: O.yesno });
    const surgResult = field({ kind: 'textarea', label: 'Когда она была проведена и ее результат', hidden: true, helper: 'Пожалуйста, подробно укажите детали.' });
    const surgDescr = field({ kind: 'textarea', label: 'Укажите описание операции', hidden: true, helper: 'По возможности' });
    const underSpec = field({ kind: 'radio', label: 'Находитесь ли вы под наблюдением специалиста в настоящее время?', options: O.yesno, hidden: true });
    const recommend = field({ kind: 'textarea', label: 'Его рекомендации', hidden: true });
    const disabilityBenefit = field({ kind: 'radio', label: '', options: O.yesno });
    const benefitDetails = field({ kind: 'textarea', label: 'Укажите подробные сведения, включая причину выплаты данного пособия', hidden: true });
    $('.group-label', surgeryOffered).textContent = num() + 'Предлагалась ли вам операция?';

    const colRight = h('div', { class: 'anketa-col' },
        field({ kind: 'radio', label: num() + 'Было ли вам проведено какое-либо обследование?', options: O.yesno }),
        field({ kind: 'textarea', label: num() + 'Каковы его результаты?', helper: 'Полный диагноз и наименование медицинского учреждения' }),
        field({ kind: 'textarea', label: num() + 'Вы проходили или все еще проходите какое-нибудь лечение?' }),
        field({ kind: 'select', label: num() + 'Укажите степень вашего выздоровления', options: ['Выздоровление', 'Требуется профилактическое лечение', 'Требуется операция', 'Хроническое заболевание'] }),
        field({ kind: 'textarea', label: num() + 'Вы испытываете какие-нибудь признаки данного заболевания или осложнения', helper: 'Опишите их, а также частоту и тяжесть' }),
        surgeryOffered, surgResult, surgDescr, underSpec, recommend,
    );
    // нумерация оставшихся
    $('.group-label', disabilityBenefit).textContent = num() + 'Вы получали когда-либо или получаете сейчас какое-нибудь пособие по нетрудоспособности?';
    colRight.append(disabilityBenefit, benefitDetails);

    onFchange(surgeryOffered, v => {
        const on = v === 'Да';
        [surgResult, surgDescr, underSpec, recommend].forEach(w => reveal(w, on, {}));
    });
    onFchange(disabilityBenefit, v => reveal(benefitDetails, v === 'Да', {}));

    det._body.append(h('div', { class: 'anketa-columns' }, colLeft, colRight));

    // артериальная гипертония → «Частота кризов»
    if (name === 'Артериальная гипертония') {
        colRight.append(field({ kind: 'textarea', label: 'Частота кризов', col2: true }));
    }
    return det;
}

/* спорт-анкета */
function buildSportFragment() {
    const det = sectionEl(null, 'ДОПОЛНИТЕЛЬНАЯ АНКЕТА: СПОРТ', true);
    det._body.append(h('span', { class: 'helper large', style: 'display:block;margin-bottom:.8rem' }, 'Пожалуйста, ответьте на каждый вопрос и подробно изложите все необходимые сведения.'));
    det._body.append(grid(
        field({ kind: 'textarea', label: 'Каким видом спорта вы занимаетесь или увлекаетесь?', col2: true }),
        field({ kind: 'radio', label: 'Укажите, кем вы являетесь в данной сфере:', col2: true, options: ['Профессионалом', 'Любителем', 'Преподавателем/Тренером', 'Инструктором'] }),
        field({ kind: 'radio', label: 'Принимаете ли вы участие в соревнованиях?', col2: true, options: O.yesno }),
    ));
    det._body.append(h('span', { class: 'q-label mt-m', style: 'display:block' }, 'Тип спорта (нужное отметить):'));
    det._body.append(grid(
        field({ kind: 'checkbox', label: 'Бесконтактный' }),
        field({ kind: 'checkbox', label: 'Частичный или полный контакт' }),
        field({ kind: 'checkbox', label: 'С использованием оружия' }),
    ));
    return det;
}

/* профессия-анкета */
function buildOccupationFragment() {
    const det = sectionEl(null, 'ДОПОЛНИТЕЛЬНАЯ АНКЕТА: ПО РОДУ ДЕЯТЕЛЬНОСТИ', true);
    det._body.append(h('span', { class: 'helper large', style: 'display:block;margin-bottom:.8rem' }, 'Пожалуйста, ответьте на каждый вопрос и подробно изложите все необходимые сведения.'));
    const dangerDetails = field({ kind: 'textarea', label: 'Пожалуйста, укажите детали (характер, частоту или специфику выбранных условий)', col2: true, hidden: true });
    const dangers = [
        'a) Поднятие или перемещение тяжелых грузов (товаров)', 'b) Работа под землей или на высоте 15 метров и более',
        'c) Работа с химикатами и газами', 'd) Работа с радиоактивными веществами', 'e) Имеют место регулярные командировки',
        'f) Регулярная смена или плавающий рабочий график', 'g) Ненормированный рабочий день', 'h) Использование взрывчатых веществ',
        'i) Работа с высоким напряжением', 'j) Имеется ли разрешение на ношение оружия',
    ];
    const checks = dangers.map(d => field({ kind: 'checkbox', label: d, col2: true }));
    const updateDanger = () => {
        const any = checks.some(w => $('input', w).checked);
        reveal(dangerDetails, any, {});
    };
    checks.forEach(w => $('input', w).addEventListener('change', updateDanger));
    det._body.append(grid(
        field({ kind: 'radio', label: '1. Вы', col2: true, options: ['Работаете постоянно', 'Работаете временно', 'Частично заняты'] }),
        field({ kind: 'textarea', label: '2. Пожалуйста, опишите ваши профессиональные обязанности', col2: true }),
    ));
    det._body.append(h('span', { class: 'q-label mt-m col-2', style: 'display:block' }, '3. Подвергаетесь ли вы какой-либо ниже перечисленной опасности во время выполнения ваших профессиональных обязанностей либо ваша работа включает:'));
    det._body.append(grid(...checks, dangerDetails,
        field({ kind: 'textarea', label: '4. Пожалуйста, опишите какое-либо полученное вами производственное заболевание или травму', col2: true }),
    ));
    return det;
}

/* анкета доп. застрахованного (шаг 5) */
let additionalQuestionnaire = null;
function addAdditionalQuestionnaire() {
    if (additionalQuestionnaire) return;
    const det = sectionEl(null, 'БЛАНК-ОПРОСНИК ДОП. ЗАСТРАХОВАННОГО', true);
    det._body.append(h('h5', { class: 'intro mt-l mb-l' }, 'Ваши ответы на предлагаемые ниже вопросы являются основным критерием для оценки страхового риска, поэтому просим вас предоставить на них достоверные и исчерпывающие ответы, а также всю дополнительную информацию, которая могла бы повлиять на принятие решения Страховщиком'));
    const treatment = field({ kind: 'textarea', label: 'Какое лечение вы получали, или какие лекарства вам были прописаны?', col2: true, required: true });
    const reason = field({ kind: 'textarea', label: 'По какой причине вы получали лечение?', col2: true, required: true });
    const height = field({ kind: 'number', label: 'Рост', required: true, helper: 'в сантиметрах' });
    const weight = field({ kind: 'number', label: 'Вес', required: true, helper: 'в килограммах' });
    const disabled = field({ kind: 'radio', label: 'Являетесь ли вы инвалидом?', required: true, options: O.yesno });
    const disabilityGroup = field({ kind: 'select', label: 'Группа инвалидности', hidden: true, options: O.disabilityGroup });
    onFchange(disabled, v => reveal(disabilityGroup, v === 'Да', { require: true }));
    const upcoming = field({ kind: 'radio', label: 'Предстоит ли вам хирургическая операция?', col2: true, required: true, options: O.yesno });
    const surgeryD = field({ kind: 'textarea', label: 'Укажите хирургическую операцию', col2: true, hidden: true });
    onFchange(upcoming, v => reveal(surgeryD, v === 'Да', { require: true }));
    det._body.append(grid(treatment, reason, height, weight, disabled, disabilityGroup, upcoming, surgeryD));
    $('#questionnaireSection').after(det);
    additionalQuestionnaire = det;
    registerInStep(4, det);
}
function removeAdditionalQuestionnaire() {
    if (additionalQuestionnaire) { unregisterFromStep(4, additionalQuestionnaire); additionalQuestionnaire.remove(); additionalQuestionnaire = null; }
}

/* ============================================================
   Мастер (wizard)
   ============================================================ */
let steps = [];            // массив массивов секций
let currentStep = 0;
let wizardBar, backBtn, nextBtn, signBtn, stepIndicator;

function registerInStep(i, el) { if (!steps[i].includes(el)) steps[i].push(el); el.classList.add('wiz-anim'); el.classList.toggle('step-off', i !== currentStep); }
function unregisterFromStep(i, el) { steps[i] = steps[i].filter(x => x !== el); }

function buildWizardBar() {
    const bar = h('div', { class: 'wizard-bar' });
    STEP_TITLES.forEach((title, i) => {
        if (i > 0) bar.append(h('div', { class: 'wizard-connector', 'data-conn': i }));
        const step = h('div', { class: 'wizard-step', 'data-step': i, onclick: () => goToStep(i) },
            h('div', { class: 'wizard-dot' }, String(i + 1)),
            h('div', { class: 'wizard-label' }, title));
        bar.append(step);
    });
    wizardBar = bar;
    return bar;
}
function buildWizardNav() {
    backBtn = h('button', { class: 'btn btn-tertiary', type: 'button', onclick: () => goToStep(currentStep - 1) }, icon('arrowLeft'), h('span', {}, 'Назад'));
    nextBtn = h('button', { class: 'btn btn-primary', type: 'button', onclick: () => goToStep(currentStep + 1) }, h('span', {}, 'Далее'), icon('arrowRight'));
    signBtn = h('button', { class: 'btn btn-primary', type: 'button', onclick: onSign }, icon('checkCircle'), h('span', {}, 'Подтвердить'));
    stepIndicator = h('span', { class: 'wizard-progress-text' });
    const nav = h('div', { class: 'wizard-nav' }, backBtn, stepIndicator, h('div', { class: 'wizard-nav-right' }, nextBtn, signBtn));
    return nav;
}
function goToStep(index) {
    if (index < 0 || index >= steps.length) return;
    currentStep = index;
    steps.forEach((secs, i) => secs.forEach(sec => {
        sec.classList.toggle('step-off', i !== index);
        if (i === index && sec.tagName === 'DETAILS') sec.open = true;
    }));
    if (index === 1) refreshInsuredChoiceLabel();
    if (index === 3) refreshPersonChoices();
    backBtn.classList.toggle('hidden', index === 0);
    nextBtn.classList.toggle('hidden', index === steps.length - 1);
    signBtn.classList.toggle('hidden', index !== steps.length - 1);
    stepIndicator.textContent = 'Шаг ' + (index + 1) + ' из ' + steps.length;
    updateWizardBar();
    const c = $('#app'); if (c) c.scrollIntoView({ block: 'start' });
}
function updateWizardBar() {
    if (!wizardBar) return;
    $$('.wizard-step', wizardBar).forEach(step => {
        const i = +step.dataset.step;
        const filled = i !== currentStep && isStepFilled(i);
        step.classList.toggle('active', i === currentStep);
        step.classList.toggle('done', filled);
        $('.wizard-dot', step).textContent = filled ? '✓' : String(i + 1);
    });
    $$('.wizard-connector', wizardBar).forEach(conn => {
        const i = +conn.dataset.conn;
        conn.classList.toggle('done', i <= currentStep);
    });
}
function isStepFilled(step) {
    if (step === 1 && (fval(R.insured.insuredChoice) == null || fval(R.insured.insuredChoice) === '')) return false;
    if (step === 3) {
        const mode = fval(R.benefMode);
        if (mode == null || mode === '') return false;
        if (beneficiaries.length === 0) return false;
    }
    return !steps[step].some(sec => hasEmptyRequired(sec));
}
function hasEmptyRequired(root) {
    return $$('.field.required', root).some(w => {
        if (w.closest('.hidden')) return false;      // скрытые условные поля не считаются
        if (w.closest('.step-off') && !root.classList.contains('step-off')) { /* внутри активной */ }
        const v = fval(w);
        if (w.dataset.kind === 'checkboxgroup') return v.length === 0;
        return v == null || v === '';
    });
}

/* ============================================================
   Прочее
   ============================================================ */
function toast(msg) {
    const t = h('div', { class: 'toast' }, msg);
    document.body.append(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
}
function onSign() {
    toast('Демо-режим: данные никуда не отправляются');
}

/* ============================================================
   Инициализация
   ============================================================ */
function init() {
    const app = $('#app');
    app.append(h('h1', { class: 'header' }, 'ЗАЯВЛЕНИЕ НА НАКОПИТЕЛЬНОЕ СТРАХОВАНИЕ ЖИЗНИ С УЧАСТИЕМ В ПРИБЫЛИ'));
    app.append(h('div', { class: 'line mt-m mb-m' }));
    app.append(buildWizardBar());

    const insurer = buildInsurer();
    const insured = buildInsured();
    const protection = buildProtection();
    const beneficiary = buildBeneficiary();
    const questionnaire = buildQuestionnaire();

    app.append(insurer, insured, protection, beneficiary, questionnaire);
    app.append(buildWizardNav());

    steps = [[insurer], [insured], [protection], [beneficiary], [questionnaire]];

    // связки, требующие готовности всех секций
    bindPregnantToGender();

    // применить стартовые опции документа (скрыть рабочие поля до выбора)
    applyIdDocument(R.insurer, null, { workplace: true });

    goToStep(0);
}
document.addEventListener('DOMContentLoaded', init);
