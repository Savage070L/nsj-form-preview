/* ============================================================
   Заявление НСЖ (SAQTAU / PRO LIFE) — статичная копия формы
   TestViewMain на РЕАЛЬНЫХ компонентах Vaadin 24.9 + теме
   Document.css (1:1 с приложением). Бэкенда нет.
   ============================================================ */
import '@vaadin/text-field';
import '@vaadin/text-area';
import '@vaadin/email-field';
import '@vaadin/number-field';
import '@vaadin/integer-field';
import '@vaadin/select';
import '@vaadin/date-picker';
import '@vaadin/radio-group';
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import '@vaadin/details';
import '@vaadin/dialog';
import '@vaadin/button';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/form-layout';
import '@vaadin/vaadin-lumo-styles/all-imports.js';
import './Document.css';
import './theme-extra.css';
import * as SENIM from './senim.js';

/* ---------- DOM-хелперы ---------- */
function h(tag, props, ...kids) {
    const e = document.createElement(tag);
    if (props) for (const [k, v] of Object.entries(props)) {
        if (v == null || v === false) continue;
        if (k === 'class') e.className = v;
        else if (k === 'text') e.textContent = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k === 'slot') e.setAttribute('slot', v);
        else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
        else if (v === true) e.setAttribute(k, '');
        else e.setAttribute(k, v);
    }
    for (const kid of kids.flat()) { if (kid == null || kid === false) continue; e.append(kid.nodeType ? kid : document.createTextNode(String(kid))); }
    return e;
}
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];

/* ---------- реальные иконки Vaadin ---------- */
const VICON = {
    wallet: 'vaadin:wallet', clock: 'vaadin:clock', heart: 'vaadin:heart',
    user: 'vaadin:user', users: 'vaadin:users', calendar: 'vaadin:calendar', calendarO: 'vaadin:calendar-o',
    doc: 'vaadin:file-text-o', hash: 'vaadin:hash', card: 'vaadin:user-card', barcode: 'vaadin:barcode',
    institution: 'vaadin:institution', pencil: 'vaadin:pencil', globe: 'vaadin:globe', home: 'vaadin:home',
    marker: 'vaadin:map-marker', phone: 'vaadin:phone', envelope: 'vaadin:envelope-o', pie: 'vaadin:pie-chart',
    plus: 'vaadin:plus', close: 'vaadin:close', checkCircle: 'vaadin:check-circle-o', ban: 'vaadin:ban',
    arrowLeft: 'vaadin:arrow-left', arrowRight: 'vaadin:arrow-right',
    eye: 'vaadin:eye', download: 'vaadin:download', infoCircle: 'vaadin:info-circle-o',
};
function icon(name) { const i = document.createElement('vaadin-icon'); i.icon = VICON[name] || name; return i; }
function vbtn(text, { theme, iconName, cls, onClick, iconAfter } = {}) {
    const b = document.createElement('vaadin-button');
    if (theme) b.setAttribute('theme', theme);
    if (cls) b.classList.add(...cls.split(' '));
    if (iconName && !iconAfter) b.appendChild(icon(iconName));
    if (text) b.appendChild(document.createTextNode(text));
    if (iconName && iconAfter) b.appendChild(icon(iconName));
    if (onClick) b.addEventListener('click', onClick);
    return b;
}

/* ---------- варианты (точно из Java) ---------- */
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
    officialType: ['Лицо, занимающее ответственную государственную должность',
        'Лицо, уполномоченное на выполнение государственных функций',
        'Лицо, исполняющее управленческие функции в государственной организации',
        'Иностранное публичное должностное лицо'],
    premiumSource: ['Доход от бизнеса', 'Дивиденды', 'Заработная плата', 'Иное'],
    activityType: ['Частный бизнес', 'Трудовая деятельность', 'Иное'],
};
const rng = (a, b, s) => { const o = []; for (let v = a; v <= b; v += s) o.push(String(v)); return o; };
const BP_UP = rng(90, 200, 5), BP_LOW = rng(50, 140, 5);

const DISEASES = ['Нарушение слуха', 'Сахарный диабет', 'ИБС (стенокардия, инфаркт миокарда), другие болезни сердца',
    'Последствия травм', 'Ревматическая лихорадка, артриты, подагра или заболевания костей и суставов', 'Болезни глаз',
    'Болезни легких', 'Артериальная гипертония', 'Болезни почек',
    'Нарушения мозгового кровообращения и их последствия, эпилепсия', 'Онкологические заболевания', 'Болезни печени',
    'Другое', 'Нет'];
const DISEASE_ICONS = {
    'Нет': 'icon-none', 'Сахарный диабет': 'icon-diabetes', 'ИБС (стенокардия, инфаркт миокарда), другие болезни сердца': 'icon-heart',
    'Последствия травм': 'icon-trauma', 'Болезни глаз': 'icon-eyes', 'Болезни легких': 'icon-lungs',
    'Артериальная гипертония': 'icon-hypertension', 'Болезни почек': 'icon-kidneys',
    'Нарушения мозгового кровообращения и их последствия, эпилепсия': 'icon-brain', 'Болезни печени': 'icon-liver',
    'Нарушение слуха': 'icon-hearing', 'Онкологические заболевания': 'icon-oncology', 'Другое': 'icon-other',
    'Ревматическая лихорадка, артриты, подагра или заболевания костей и суставов': 'icon-joints',
};
const STEP_TITLES = ['Страхователь', 'Застрахованный', 'Страховая защита', 'Выгодоприобретатели', 'Опросник'];
const BT = {
    LUMP_END: 'Для получения единовременной выплаты по окончанию срока полиса',
    LUMP_ACCUM_DEATH: 'Единовременная выплата в случае смерти застрахованного в период накопления',
    ANNUITY_END: 'Для получения аннуитетной выплаты по окончанию срока полиса',
    ANNUITY_GUARANTEED: 'Для получения аннуитетной выплаты в гарантированный период в случае смерти застрахованного по окончанию срока полиса',
    ANNUITY_ACCUM_DEATH: 'Аннуитетная выплата в случае смерти застрахованного в период накопления',
};

/* вариант выбора плиткой со значком (components/choiceTiles) */
function tileLabel(text, iconCls) {
    return h('label', { slot: 'label' },
        h('div', { class: 'tile-opt' }, iconCls ? h('div', { class: 'tile-icon ' + iconCls }) : null, h('span', {}, text)));
}
const TILES = {
    gender: { 'Мужской': 'tile-male', 'Женский': 'tile-female' },
    infoChannels: { 'СМС': 'tile-sms', 'E-mail': 'tile-email', 'Почта': 'tile-letter', 'WhatsApp': 'tile-whatsapp' },
    premiumSource: { 'Доход от бизнеса': 'tile-business', 'Дивиденды': 'tile-dividents', 'Заработная плата': 'tile-officejob', 'Иное': 'tile-other' },
    activityType: { 'Частный бизнес': 'tile-business2', 'Трудовая деятельность': 'tile-officejob2', 'Иное': 'tile-other' },
};

/* ---------- фабрика полей (реальные компоненты Vaadin) ---------- */
function field(cfg) {
    const k = cfg.kind;
    let c;
    if (k === 'radio') {
        c = document.createElement('vaadin-radio-group');
        if (cfg.label) c.label = cfg.label;
        if (cfg.helper) c.helperText = cfg.helper;
        if (cfg.required) c.required = true;
        (cfg.options || []).forEach(o => {
            const b = document.createElement('vaadin-radio-button');
            b.value = o;
            if (cfg.tiles) b.appendChild(tileLabel(o, cfg.tiles[o])); else b.label = o;
            c.appendChild(b);
        });
    } else if (k === 'checkboxgroup') {
        c = document.createElement('vaadin-checkbox-group');
        if (cfg.label) c.label = cfg.label;
        if (cfg.horizontal) c.setAttribute('theme', 'horizontal');
        (cfg.options || []).forEach(o => {
            const b = document.createElement('vaadin-checkbox');
            b.value = o;
            if (cfg.tiles) b.appendChild(tileLabel(o, cfg.tiles[o])); else b.label = o;
            c.appendChild(b);
        });
    } else if (k === 'checkbox') {
        c = document.createElement('vaadin-checkbox');
        if (cfg.label) c.label = cfg.label;
    } else {
        const tag = { email: 'vaadin-email-field', number: 'vaadin-number-field', integer: 'vaadin-integer-field', date: 'vaadin-date-picker', textarea: 'vaadin-text-area', select: 'vaadin-select' }[k] || 'vaadin-text-field';
        c = document.createElement(tag);
        if (cfg.label) c.label = cfg.label;
        if (cfg.placeholder) c.placeholder = cfg.placeholder;
        if (cfg.helper) c.helperText = cfg.helper;
        if (cfg.required) c.required = true;
        if (cfg.readonly) c.readonly = true;
        if (k === 'select') c.items = (cfg.options || []).map(o => ({ label: o, value: o }));
        if (cfg.value != null) c.value = String(cfg.value);
        if (cfg.iconName) { const ic = icon(cfg.iconName); ic.setAttribute('slot', 'prefix'); c.appendChild(ic); }
        if (cfg.suffix) c.appendChild(h('span', { slot: 'suffix' }, cfg.suffix));
    }
    if (cfg.col2) c.setAttribute('colspan', '2');
    else if (cfg.colspan) c.setAttribute('colspan', String(cfg.colspan));
    if (cfg.hidden) c.hidden = true;
    if (cfg.id) { c.id = cfg.id; c.dataset.fid = cfg.id; }
    if (cfg.prop) c.dataset.prop = cfg.prop;
    if (cfg.cls) c.classList.add(...cfg.cls.split(' '));
    c.dataset.field = '1';
    return c;
}
function fval(c) {
    const t = c.localName;
    if (t === 'vaadin-checkbox') return c.checked;
    if (t === 'vaadin-checkbox-group') return c.value || [];
    return c.value;
}
function fclear(c) {
    const t = c.localName;
    if (t === 'vaadin-checkbox') c.checked = false;
    else if (t === 'vaadin-checkbox-group') c.value = [];
    else c.value = '';
}
function fevent(c) { return c.localName === 'vaadin-checkbox' ? 'checked-changed' : 'value-changed'; }
function onFchange(c, fn) { c.addEventListener(fevent(c), () => fn(fval(c))); return c; }
function reveal(c, on, { require: req, clear = true } = {}) {
    c.hidden = !on;
    if (req != null) c.required = !!(on && req);
    if (!on && clear) fclear(c);
}
function copyVal(src, dst) {
    const t = src.localName;
    if (t === 'vaadin-checkbox') dst.checked = src.checked;
    else if (t === 'vaadin-checkbox-group') dst.value = [...(src.value || [])];
    else dst.value = src.value;
}

/* ---------- секции / сетки ---------- */
function formLayout(cols, cls) {
    const fl = document.createElement('vaadin-form-layout');
    fl.responsiveSteps = cols === 24
        ? [{ minWidth: '0', columns: 1 }, { minWidth: '40em', columns: 24 }]
        : cols === 1
            ? [{ minWidth: '0', columns: 1 }]
            : [{ minWidth: '0', columns: 1 }, { minWidth: '32em', columns: 2 }];
    if (cls) fl.classList.add(...cls.split(' '));
    return fl;
}
function grid(...kids) { const fl = formLayout(2); kids.flat().forEach(k => k && fl.appendChild(k)); return fl; }

function sectionEl(id, title, { extraCard, cardX } = {}) {
    const det = document.createElement('vaadin-details');
    det.opened = true;
    if (id) det.id = id;
    if (extraCard) det.classList.add('extra-card');
    const sum = document.createElement('vaadin-details-summary');
    sum.setAttribute('slot', 'summary');
    const wrap = h('div', { class: 'card-summary' });
    const titleSpan = h('span', { class: 'card-summary-title' }, title);
    wrap.appendChild(titleSpan);
    if (cardX) wrap.appendChild(vbtn('', { theme: 'tertiary-inline', iconName: 'close', onClick: cardX }));
    sum.appendChild(wrap);
    det.appendChild(sum);
    det._title = titleSpan;
    det._body = det;
    return det;
}

/* ---------- блок «удостоверение личности» ---------- */
function identityFields(refs, opts) {
    const F = {};
    const add = (key, cfg) => { const w = field(cfg); F[key] = w; refs[key] = w; if (cfg.id && cfg.id !== key) refs[cfg.id] = w; return w; };
    add('fio', { kind: 'text', label: 'ФИО', id: opts.fioId, prop: 'fio', col2: true, required: true, iconName: opts.icons ? 'user' : null });
    add('birthday', { kind: 'date', label: 'Дата рождения', prop: 'birthday', required: true, placeholder: 'дд.мм.гггг', iconName: opts.icons ? 'calendar' : null });
    add('gender', { kind: 'radio', label: 'Пол', id: 'gender', prop: 'gender', required: true, options: O.gender, tiles: TILES.gender, cls: 'tile-choice tile-choice-fill' });
    add('idDocument', { kind: 'select', label: 'Документ, удостоверяющий личность', id: 'idDocument', prop: 'idDocument', required: true, options: O.idDocument, placeholder: opts.icons ? 'Выберите документ' : null, iconName: opts.icons ? 'doc' : null });
    add('no', { kind: 'text', label: opts.docNoLabel || '№', prop: 'no', required: true, iconName: opts.icons ? 'hash' : null });
    add('authority', { kind: 'select', label: 'Выдан', id: 'authority', prop: 'authority', required: true, options: O.authority, placeholder: opts.icons ? 'Выберите орган выдачи' : null, iconName: opts.icons ? 'institution' : null });
    add('authorityOther', { kind: 'text', label: 'Укажите, кем выдан', id: 'authorityOther', prop: 'authorityOther', col2: true, hidden: true, iconName: opts.icons ? 'pencil' : null });
    add('iin', { kind: 'text', label: 'ИИН', id: 'iin', prop: 'iin', hidden: !opts.icons, iconName: opts.icons ? 'card' : null });
    add('series', { kind: 'text', label: 'Серия', id: 'series', prop: 'series', hidden: true, iconName: opts.icons ? 'barcode' : null });
    add('issueDate', { kind: 'date', label: 'Дата выдачи', prop: 'issueDate', required: true, placeholder: 'дд.мм.гггг', iconName: opts.icons ? 'calendarO' : null });
    add('kzResident', { kind: 'checkbox', label: 'Является резидентом Республики Казахстан', id: 'kzResident', prop: 'kzResident', col2: true, cls: 'consent-toggle ico-residentkz' });
    add('citizenship', { kind: 'text', label: 'Гражданство', id: 'citizenship', prop: 'citizenship', hidden: true, iconName: opts.icons ? 'globe' : null });
    if (opts.icons) F.iin.hidden = false;
    onFchange(F.authority, v => reveal(F.authorityOther, v === 'Иное', { require: true }));
    onFchange(F.kzResident, v => reveal(F.citizenship, v === false, {}));
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
   Состояние
   ============================================================ */
const R = { insurer: {}, insured: {}, protection: {}, quest: {} };
const insurerFio = () => (R.insurer.fio ? (fval(R.insurer.fio) || '') : '').trim();

/* ============================================================
   Шаг 1 — Страхователь
   ============================================================ */
function buildInsurer() {
    const det = sectionEl('insurerSection', 'ИНФОРМАЦИЯ О СТРАХОВАТЕЛЕ', {});
    const refs = R.insurer;
    const F = identityFields(refs, { fioId: 'insurerFio', icons: false, workplace: true });
    const extra = {};
    const add = (k, cfg) => { const w = field(cfg); extra[k] = w; refs[cfg.id || k] = w; return w; };
    add('notUsaTaxResident', { kind: 'checkbox', id: 'notUsaTaxResident', label: 'Не является налоговым резидентом США', col2: true, cls: 'consent-toggle ico-residentusa' });
    add('notOfficial', { kind: 'checkbox', id: 'notOfficial', label: 'Страхователь или его близкие родственники не являются публичными должностными лицами', col2: true, cls: 'consent-toggle ico-pdl' });
    add('birthplace', { kind: 'text', label: 'Юридический адрес', prop: 'birthplace', col2: true });
    add('address', { kind: 'text', label: 'Фактический адрес', prop: 'address', col2: true, required: true, helper: '(Почтовый индекс, название области, города, села, улицы, микрорайона, номер дома, квартиры)' });
    add('officialType', { kind: 'select', id: 'officialType', label: 'Категория публичного должностного лица', col2: true, hidden: true, options: O.officialType });
    add('workPlace', { kind: 'text', label: 'Место работы', id: 'workPlace', col2: true, required: true, hidden: true });
    add('position', { kind: 'text', label: 'Должность', id: 'position', col2: true, required: true, hidden: true });
    add('jobDescr', { kind: 'textarea', label: 'Точное описание служебных обязанностей', id: 'jobDescr', col2: true, required: true, hidden: true });
    add('phone', { kind: 'text', label: 'Мобильный телефон', prop: 'phone', required: true, placeholder: '+7 (___) ___-__-__' });
    add('email', { kind: 'email', label: 'E-mail', prop: 'email' });
    add('secondPhone', { kind: 'text', label: 'Дополнительные контакты', prop: 'secondPhone', placeholder: '+7 (___) ___-__-__' });
    add('infoChannels', { kind: 'checkboxgroup', label: 'Каким образом вы желаете получать информацию от Страховщика', col2: true, options: O.infoChannels, tiles: TILES.infoChannels, cls: 'tile-choice' });
    add('premiumSource', { kind: 'radio', id: 'premiumSource', label: 'Источник операции по оплате страховой премии', col2: true, required: true, options: O.premiumSource, tiles: TILES.premiumSource, cls: 'tile-choice tile-choice-lg' });
    add('premiumSourceOther', { kind: 'text', id: 'premiumSourceOther', label: 'Пожалуйста, введите ваш источник операций по оплате страховой премии', col2: true, hidden: true, placeholder: 'Укажите источник' });
    add('activityType', { kind: 'radio', id: 'activityType', label: 'Род деятельности', col2: true, required: true, options: O.activityType, tiles: TILES.activityType, cls: 'tile-choice tile-choice-lg' });
    add('activityTypeOther', { kind: 'text', id: 'activityTypeOther', label: 'Пожалуйста, введите ваш род деятельности', col2: true, hidden: true, placeholder: 'Укажите род деятельности' });
    onFchange(extra.premiumSource, v => reveal(extra.premiumSourceOther, v === 'Иное', { require: true }));
    onFchange(extra.activityType, v => reveal(extra.activityTypeOther, v === 'Иное', { require: true }));
    onFchange(extra.notOfficial, v => reveal(extra.officialType, v === false, { require: true }));
    const g = grid(F.fio, F.birthday, F.gender, F.idDocument, F.no, F.authority, F.authorityOther, F.iin, F.series, F.issueDate,
        F.kzResident, F.citizenship, extra.notUsaTaxResident, extra.notOfficial, extra.officialType, extra.birthplace, extra.address,
        extra.workPlace, extra.position, extra.jobDescr,
        extra.premiumSource, extra.premiumSourceOther, extra.activityType, extra.activityTypeOther,
        extra.phone, extra.email, extra.secondPhone, extra.infoChannels);
    refs.grid = g;
    det._body.appendChild(g);
    $$('[data-field]', g).forEach(c => c.addEventListener(fevent(c), onInsurerChanged));
    applyIdDocument(refs, null, { workplace: true });
    return det;
}
function onInsurerChanged() {
    refreshInsuredChoiceLabel();
    if (R.insured.insuredChoice && fval(R.insured.insuredChoice) === 'INSURER') fillInsuredFromInsurer();
    refreshPersonChoices();
}

/* ============================================================
   Шаг 2 — Застрахованный
   ============================================================ */
function buildInsured() {
    const det = sectionEl('insuredSection', 'ИНФОРМАЦИЯ О ЗАСТРАХОВАННОМ', {});
    const refs = R.insured;
    const choice = field({ kind: 'select', label: 'Выбрать застрахованного', id: 'insuredChoice', col2: true, placeholder: 'Выберите…' });
    refs.insuredChoice = choice;
    refreshInsuredChoiceLabel();

    const F = identityFields(refs, { fioId: 'insuredFio', icons: false, workplace: true });
    const extra = {};
    const add = (k, cfg) => { const w = field(cfg); extra[k] = w; refs[cfg.id || k] = w; return w; };
    add('notUsaTaxResident', { kind: 'checkbox', id: 'notUsaTaxResident', label: 'Не является налоговым резидентом США', col2: true, cls: 'consent-toggle ico-residentusa' });
    add('notOfficial', { kind: 'checkbox', id: 'notOfficial', label: 'Страхователь или его близкие родственники не являются публичными должностными лицами', col2: true, cls: 'consent-toggle ico-pdl' });
    add('birthplace', { kind: 'text', label: 'Юридический адрес', prop: 'birthplace', col2: true });
    add('address', { kind: 'text', label: 'Фактический адрес', prop: 'address', col2: true, required: true, helper: '(Почтовый индекс, название области, города, села, улицы, микрорайона, номер дома, квартиры)' });
    add('officialType', { kind: 'select', id: 'officialType', label: 'Категория публичного должностного лица', col2: true, hidden: true, options: O.officialType });
    add('workPlace', { kind: 'text', label: 'Место работы', id: 'workPlace', col2: true, required: true, hidden: true });
    add('position', { kind: 'text', label: 'Должность', id: 'position', col2: true, required: true, hidden: true });
    add('jobDescr', { kind: 'textarea', label: 'Точное описание служебных обязанностей', id: 'jobDescr', col2: true, required: true, hidden: true });
    add('phone', { kind: 'text', label: 'Мобильный телефон', prop: 'phone', required: true, placeholder: '+7 (___) ___-__-__' });
    add('email', { kind: 'email', label: 'E-mail', prop: 'email' });
    add('secondPhone', { kind: 'text', label: 'Дополнительные контакты', prop: 'secondPhone', placeholder: '+7 (___) ___-__-__' });
    add('economicSector', { kind: 'text', label: 'Код сектора экономики', id: 'economicSector', col2: true, hidden: true });
    add('infoChannels', { kind: 'checkboxgroup', label: 'Каким образом вы желаете получать информацию от Страховщика', col2: true, options: O.infoChannels, tiles: TILES.infoChannels, cls: 'tile-choice' });
    add('relationshipDegree', { kind: 'select', label: 'Характер взаимоотношений Страхователя и Застрахованного (степень родства)', id: 'relationshipDegree', col2: true, hidden: true, options: RELATIONSHIP, cls: 'label-sm' });
    onFchange(extra.notOfficial, v => reveal(extra.officialType, v === false, { require: true }));
    const addBtn = vbtn('+ Добавить дополнительного застрахованного', { theme: 'primary', onClick: addAdditionalInsured });
    addBtn.setAttribute('colspan', '2');
    refs.addBtn = addBtn;

    const g = grid(choice, F.fio, F.birthday, F.gender, F.idDocument, F.no, F.authority, F.authorityOther, F.iin, F.series, F.issueDate,
        F.kzResident, F.citizenship, extra.notUsaTaxResident, extra.notOfficial, extra.officialType, extra.birthplace, extra.address,
        extra.workPlace, extra.position, extra.jobDescr, extra.phone, extra.email, extra.secondPhone,
        extra.economicSector, extra.infoChannels, extra.relationshipDegree, addBtn);
    refs.grid = g;
    det._body.appendChild(g);

    refs._self = ['insuredChoice', 'iin', 'series', 'citizenship', 'workPlace', 'position', 'jobDescr', 'economicSector', 'relationshipDegree', 'authorityOther'];
    setInsuredFieldsVisible(false);

    onFchange(choice, v => {
        if (v === 'INSURER') { fillInsuredFromInsurer(); setInsuredFieldsVisible(true); reveal(refs.relationshipDegree, false, {}); }
        else if (v === 'THIRD') { clearInsured(); setInsuredFieldsVisible(true); reveal(refs.relationshipDegree, true, { require: false, clear: false }); }
        else { setInsuredFieldsVisible(false); reveal(refs.relationshipDegree, false, {}); }
        updateWizardBar();
    });
    $$('[data-field]', g).forEach(c => c.addEventListener(fevent(c), () => refreshPersonChoices()));
    return det;
}
function setInsuredFieldsVisible(on) {
    const refs = R.insured;
    [...refs.grid.children].forEach(w => {
        if (w === refs.insuredChoice) return;
        const fid = w.dataset ? w.dataset.fid : null;
        if (on && refs._self.includes(fid)) return;
        w.hidden = !on;
    });
    if (on) {
        applyIdDocument(refs, fval(refs.idDocument), { workplace: true });
        reveal(refs.authorityOther, fval(refs.authority) === 'Иное', { require: true });
        reveal(refs.citizenship, fval(refs.kzResident) === true, {});
    }
}
function refreshInsuredChoiceLabel() {
    const sel = R.insured.insuredChoice; if (!sel) return;
    const f = insurerFio();
    const v = sel.value;
    sel.items = [{ label: f ? `Страхователь (${f})` : 'Страхователь', value: 'INSURER' }, { label: 'Третье лицо', value: 'THIRD' }];
    if (v) sel.value = v;
}
function fillInsuredFromInsurer() {
    $$('[data-prop]', R.insured.grid).forEach(dst => {
        const src = $(`#insurerSection [data-prop="${dst.dataset.prop}"]`);
        if (src) copyVal(src, dst);
    });
    applyIdDocument(R.insured, fval(R.insured.idDocument), { workplace: true });
}
function clearInsured() { $$('[data-prop]', R.insured.grid).forEach(fclear); }

/* дополнительный застрахованный */
let additionalInsured = null;
function addAdditionalInsured() {
    if (additionalInsured) return;
    const det = sectionEl(null, 'ИНФОРМАЦИЯ О ДОП. ЗАСТРАХОВАННОМ', { extraCard: true, cardX: removeAdditionalInsured });
    const refs = {};
    const F = identityFields(refs, { fioId: 'additionalInsuredFio', icons: false, workplace: true });
    const extra = {};
    const add = (k, cfg) => { const w = field(cfg); extra[k] = w; refs[cfg.id || k] = w; return w; };
    add('birthplace', { kind: 'text', label: 'Юридический адрес', col2: true });
    add('address', { kind: 'text', label: 'Фактический адрес', col2: true, required: true, helper: '(Почтовый индекс, название области, города, села, улицы, микрорайона, номер дома, квартиры)' });
    add('workPlace', { kind: 'text', label: 'Место работы', id: 'workPlace', col2: true, required: true, hidden: true });
    add('position', { kind: 'text', label: 'Должность', id: 'position', col2: true, required: true, hidden: true });
    add('jobDescr', { kind: 'textarea', label: 'Точное описание служебных обязанностей', id: 'jobDescr', col2: true, required: true, hidden: true });
    add('phone', { kind: 'text', label: 'Мобильный телефон', required: true, placeholder: '+7 (___) ___-__-__' });
    add('email', { kind: 'email', label: 'E-mail' });
    add('secondPhone', { kind: 'text', label: 'Дополнительные контакты', placeholder: '+7 (___) ___-__-__' });
    det._body.appendChild(grid(F.fio, F.birthday, F.gender, F.idDocument, F.no, F.authority, F.authorityOther, F.iin, F.series, F.issueDate,
        F.kzResident, F.citizenship, extra.birthplace, extra.address, extra.workPlace, extra.position, extra.jobDescr, extra.phone, extra.email, extra.secondPhone));
    $('#insuredSection').after(det);
    additionalInsured = det;
    registerInStep(1, det);
    R.insured.addBtn.hidden = true;
    addAdditionalQuestionnaire();
    $$('[data-field]', det).forEach(c => c.addEventListener(fevent(c), () => refreshPersonChoices()));
    goToStep(currentStep);
}
function removeAdditionalInsured() {
    if (additionalInsured) { unregisterFromStep(1, additionalInsured); additionalInsured.remove(); additionalInsured = null; }
    removeAdditionalQuestionnaire();
    R.insured.addBtn.hidden = false;
    refreshPersonChoices();
    updateWizardBar();
}

/* ============================================================
   Шаг 3 — Расчёт: параметры · дополнительные покрытия · результат
   ============================================================ */
const COVERAGES = [
    { id: 'accidentalDeathBenefitCb', label: '1. Смерть от НС',
      hint: 'Выплата дополнительной страховой суммы в случае смерти Застрахованного в результате несчастного случая' },
    { id: 'disabilityInsuranceAccidentCb', label: '2. Инвалидность от НС',
      hint: 'Единовременная выплата 100% страховой суммы при присвоении инвалидности I группы (80% — при II группе) в результате несчастного случая' },
    { id: 'premiumWaiverCb', label: '3. Освобождение от взносов',
      hint: 'Освобождение от уплаты страховых взносов в случае утраты Застрахованным трудоспособности' },
    { id: 'bodilyInjuryTablePaymentCb', label: '4. Травмы по таблице', sums: 'injury',
      hint: 'Выплаты в соответствии с Таблицей выплат по телесным травмам в случае получения Застрахованным травмы в результате несчастного случая' },
    { id: 'additionalBodilyInjuryTablePaymentCb', label: '5. Травмы доп. застрахованного', sums: 'injury',
      hint: 'Выплаты в соответствии с Таблицей выплат по телесным травмам в случае получения дополнительным застрахованным травмы в результате несчастного случая' },
    { id: 'hospitalizationDueToAccidentCb', label: '6. Госпитализация от НС', sums: 'coverage',
      hint: 'Выплаты в случае госпитализации Застрахованного в результате несчастного случая' },
    { id: 'temporaryDisabilityDueToAccidentCb', label: '7. Временная нетрудоспособность', sums: 'coverage',
      hint: 'Выплаты в случае временной нетрудоспособности Застрахованного в результате несчастного случая' },
    { id: 'criticalIllnessInsuranceCb', label: '8. Критическая болезнь', sums: 'coverage',
      hint: 'Страхование на случай критической болезни Застрахованного' },
];
const FREQ_BY_LABEL = {
    'Ежегодно': SENIM.FREQ.ANNUAL, 'Раз в полугодие': SENIM.FREQ.SEMIANNUAL,
    'Ежеквартально': SENIM.FREQ.QUARTERLY, 'Ежемесячно': SENIM.FREQ.MONTHLY,
    'Единовременно': SENIM.FREQ.SINGLE,
};
const ACC_MIN = 3, ACC_MAX = 20;
let senimBody = null, navTotal = null, navTotalValue = null, senimTotal = null;

function yearsWord(n) {
    const m100 = n % 100, m10 = n % 10;
    if (m100 >= 11 && m100 <= 14) return 'лет';
    if (m10 === 1) return 'год';
    if (m10 >= 2 && m10 <= 4) return 'года';
    return 'лет';
}
function columnHead(num, title) {
    return h('div', { class: 'protection-col-head' },
        h('span', { class: 'protection-col-num' }, String(num)),
        h('span', { class: 'protection-col-title' }, title));
}
function buildProtection() {
    const det = sectionEl('protectionSection', 'РАСЧЁТ', {});
    const refs = R.protection;

    /* ① параметры расчёта */
    const params = formLayout(1);
    const accValue = h('span', { class: 'acc-value' }, '10 лет');
    const accHead = h('div', { class: 'acc-head' }, h('span', { class: 'acc-title' }, 'Период накопления'), accValue);
    const accSlider = h('input', { type: 'range', class: 'acc-slider', min: String(ACC_MIN), max: String(ACC_MAX), step: '1', value: '10' });
    accSlider.style.setProperty('--acc-fill', ((10 - ACC_MIN) * 100 / (ACC_MAX - ACC_MIN)) + '%');
    accSlider.addEventListener('input', () => {
        const v = +accSlider.value;
        accValue.textContent = v + ' ' + yearsWord(v);
        accSlider.style.setProperty('--acc-fill', ((v - ACC_MIN) * 100 / (ACC_MAX - ACC_MIN)) + '%');
        recalcSenim();
    });
    refs.accumulationPeriod = accSlider;

    const freq = field({ kind: 'select', id: 'premiumFrequency', label: 'Периодичность оплаты страховой премии', required: true, options: O.premiumFrequency });
    const premium = field({ kind: 'integer', id: 'insurancePremium', label: 'Размер страхового взноса (премии), в тенге', required: true });
    const indexing = field({ kind: 'checkbox', id: 'indexing', label: 'Индексация', cls: 'toggle-switch param-toggle' });
    const payments = field({ kind: 'checkbox', id: 'insurancePayments', label: 'Аннуитетные выплаты', cls: 'toggle-switch param-toggle' });
    const annuityTerm = field({ kind: 'integer', id: 'annuityTerm', label: 'Срок аннуитетных выплат', hidden: true });
    const guaranteed = field({ kind: 'integer', id: 'guaranteedPeriod', label: 'Гарантированный период', hidden: true });
    const annuityPay = field({ kind: 'select', id: 'annuityPayments', label: 'Периодичность аннуитетных выплат', hidden: true, options: O.annuityPayments });
    Object.assign(refs, { premiumFrequency: freq, insurancePremium: premium, insurancePayments: payments, guaranteedPeriod: guaranteed });
    onFchange(payments, on => {
        reveal(annuityTerm, on, { require: true }); reveal(guaranteed, on, { require: true }); reveal(annuityPay, on, { require: true });
        onPaymentPeriodChanged();
    });
    onFchange(guaranteed, () => onPaymentPeriodChanged());
    [freq, premium].forEach(f => onFchange(f, () => recalcSenim()));
    [accHead, accSlider, freq, premium, indexing, payments, annuityTerm, guaranteed, annuityPay].forEach(c => params.appendChild(c));
    const paramsCard = h('div', { class: 'protection-card protection-params' }, columnHead(1, 'Параметры расчёта'), params);

    /* ② дополнительные покрытия */
    const cov = formLayout(2);
    refs.coverage = {};
    COVERAGES.forEach(c => cov.appendChild(coverageItem(c, refs)));
    const coverageCard = h('div', { class: 'protection-card protection-coverages' }, columnHead(2, 'Дополнительные покрытия'), cov);

    /* ③ предварительный результат */
    senimBody = h('div', { class: 'calc-body' });
    const resultCard = h('div', { class: 'protection-card protection-result' }, columnHead(3, 'Предварительный результат'), senimBody);
    const right = h('div', { class: 'protection-right' }, resultCard);

    det._body.appendChild(h('div', { class: 'protection-grid' }, paramsCard, coverageCard, right));
    return det;
}
function coverageItem(cfg, refs) {
    const box = h('div', { class: 'coverage-box', colspan: '2' });
    const cb = field({ kind: 'checkbox', id: cfg.id, label: cfg.label, cls: 'large-helper' });
    const hint = icon('infoCircle'); hint.classList.add('coverage-hint'); hint.title = cfg.hint;
    box.appendChild(h('div', { class: 'coverage-head' }, cb, hint));
    let sum = null;
    if (cfg.sums) {
        sum = field({ kind: 'select', placeholder: 'Сумма, тенге', hidden: true, cls: 'coverage-sum',
            options: cfg.sums === 'injury' ? O.injurySums : O.coverageSums });
        box.appendChild(sum);
        onFchange(sum, () => recalcSenim());
    }
    refs.coverage[cfg.id] = { cb, sum };
    cb.addEventListener('checked-changed', () => {
        box.classList.toggle('coverage-active', cb.checked);
        if (sum) reveal(sum, cb.checked, {});
        // пункты 2 и 3 взаимоисключимы
        if (cb.checked && cfg.id === 'disabilityInsuranceAccidentCb') refs.coverage.premiumWaiverCb.cb.checked = false;
        if (cb.checked && cfg.id === 'premiumWaiverCb') refs.coverage.disabilityInsuranceAccidentCb.cb.checked = false;
        recalcSenim();
    });
    return box;
}

/* ---------- живой расчёт ---------- */
function personForCalc() {
    const take = refs => {
        const b = refs.birthday ? fval(refs.birthday) : null;
        const g = refs.gender ? fval(refs.gender) : null;
        return b && g ? { dob: new Date(b), male: g === 'Мужской' } : null;
    };
    return take(R.insured) || take(R.insurer);
}
function money(v) {
    const span = h('span', {});
    SENIM.formatInt(v).split(' ').forEach((part, i) => {
        if (i) span.appendChild(h('span', { class: 'calc-space' }, ' '));
        span.appendChild(h('span', {}, part));
    });
    span.appendChild(h('span', { class: 'calc-cur' }, ' ₸'));
    return span;
}
function calcAlert(info, text) {
    senimBody.innerHTML = '';
    senimBody.appendChild(h('div', { class: 'calc-alert ' + (info ? 'calc-alert-info' : 'calc-alert-warn') }, text));
}
function recalcSenim() {
    if (!senimBody) return;
    const refs = R.protection;
    const premium = parseInt(fval(refs.insurancePremium), 10);
    const frequency = FREQ_BY_LABEL[fval(refs.premiumFrequency)];
    const term = parseInt(refs.accumulationPeriod.value, 10);
    const person = personForCalc();
    const missing = [];
    if (!premium || premium <= 0) missing.push('размер страхового взноса');
    if (!frequency) missing.push('периодичность оплаты');
    if (!person) missing.push('дату рождения и пол застрахованного (шаг 1 или 2)');
    if (missing.length) { calcAlert(true, 'Для предварительного расчёта укажите: ' + missing.join(', ') + '.'); storeSenim(null); return; }

    const cvg = refs.coverage;
    const group1 = cvg.accidentalDeathBenefitCb.cb.checked ? SENIM.RIDER.ACCIDENTAL_DEATH : null;
    let group2 = null;
    if (cvg.disabilityInsuranceAccidentCb.cb.checked) group2 = SENIM.RIDER.DISABILITY_ACCIDENT_LUMPSUM;
    else if (cvg.premiumWaiverCb.cb.checked) group2 = SENIM.RIDER.PREMIUM_WAIVER;
    const group3 = [];
    const put = (id, rider) => {
        const c = cvg[id];
        if (!c.cb.checked || !c.sum || !c.sum.value) return;
        group3.push([rider, parseFloat(String(c.sum.value).replace(/[^0-9]/g, ''))]);
    };
    put('bodilyInjuryTablePaymentCb', SENIM.RIDER.TRAUMA);
    put('additionalBodilyInjuryTablePaymentCb', SENIM.RIDER.TRAUMA_EXTRA);
    put('temporaryDisabilityDueToAccidentCb', SENIM.RIDER.TEMPORARY_DISABILITY);
    put('hospitalizationDueToAccidentCb', SENIM.RIDER.HOSPITALIZATION);
    put('criticalIllnessInsuranceCb', SENIM.RIDER.CRITICAL_ILLNESS);

    const result = SENIM.calculate({ dob: person.dob, today: new Date(), male: person.male, term, frequency, premium, group1, group2, group3 });
    if (!result.success) { calcAlert(false, result.error); storeSenim(null); return; }
    renderSenimResult(result);
    storeSenim(result);
}
function senimTile(label, value, hintText, cls) {
    return h('div', { class: 'calc-tile ' + cls },
        h('span', { class: 'calc-tile-label' }, label),
        h('div', { class: 'calc-tile-value' }, money(value)),
        h('span', { class: 'calc-tile-hint' }, hintText));
}
function calcRow(table, name, premium, sum) {
    table.appendChild(h('div', { class: 'calc-cell calc-cell-name' }, name));
    table.appendChild(h('div', { class: 'calc-cell calc-cell-num calc-cell-prem' }, money(premium)));
    table.appendChild(sum != null
        ? h('div', { class: 'calc-cell calc-cell-num calc-cell-sum' }, money(sum))
        : h('div', { class: 'calc-cell calc-cell-num calc-cell-dash' }, '—'));
}
function renderSenimResult(result) {
    senimBody.innerHTML = '';
    const tiles = h('div', { class: 'calc-tiles' },
        senimTile('Страховая сумма', Math.round(result.sumAssured), 'дожитие / уход из жизни', 'calc-tile-green'),
        senimTile('Страховой взнос (премия)', result.totalPremium, result.frequency.periodLabel, 'calc-tile-blue'));
    const table = h('div', { class: 'calc-table' },
        h('div', { class: 'calc-cell calc-cell-head' }, 'Покрытие'),
        h('div', { class: 'calc-cell calc-cell-head calc-cell-num' }, 'Премия'),
        h('div', { class: 'calc-cell calc-cell-head calc-cell-num' }, 'Страховая сумма'));
    calcRow(table, 'Основное покрытие — дожитие / уход из жизни', result.grossPremium, Math.round(result.sumAssured));
    result.riders.forEach(r => calcRow(table, r.rider.title, r.premium, r.sum != null ? Math.round(r.sum) : null));
    const total = h('div', { class: 'calc-total' },
        h('div', { class: 'calc-total-text' },
            h('span', { class: 'calc-total-label' }, 'Итого к оплате'),
            h('span', { class: 'calc-total-period' }, result.frequency.periodLabel)),
        h('span', { class: 'calc-total-value' }, money(result.totalPremium)));
    senimBody.append(tiles, table, total,
        h('span', { class: 'calc-note' }, 'Расчёт носит предварительный характер. Точные условия страхования определяются договором.'));
}
function storeSenim(result) {
    senimTotal = result ? result.totalPremium : null;
    updateNavTotal();
}
function updateNavTotal() {
    if (!navTotal) return;
    const show = currentStep === 2 && senimTotal != null;
    navTotal.hidden = !show;
    if (show) { navTotalValue.innerHTML = ''; navTotalValue.appendChild(money(senimTotal)); }
}

/* ============================================================
   Шаг 4 — Выгодоприобретатели
   ============================================================ */
const MODE_HEIRS = 'Наследники по закону или по завещанию';
const MODE_NAMED = 'Назначить конкретных лиц';
const SC = { SURVIVAL: 'survival', ACCUM_DEATH: 'accum_death', GUARANTEED: 'guaranteed' };
let beneficiaries = [];
let benefSeq = 0;
let benefMode = null;            // null — вариант ещё не выбран
let benefBody = null, benefModeTiles = {};

const BENEFICIARY_TERM = ['Выгодоприобретатель',
    'Выгодоприобретатель — лицо, которое получает страховую выплату при наступлении страхового случая '
    + 'в соответствии с договором страхования.'];

function buildBeneficiary() {
    const det = sectionEl('beneficiarySection', 'ВЫГОДОПРИОБРЕТАТЕЛИ', {});
    const wrap = h('div', { id: 'typeBlocksContainer' });
    benefBody = h('div', { class: 'benef-body' });
    wrap.append(benefHeader(), benefModeChoice(), benefBody);
    det._body.appendChild(wrap);
    rebuildBenefBody();
    return det;
}
function benefHeader() {
    const term = h('span', { class: 'consent-term', role: 'button', tabindex: '0', onclick: () => openTermDialog(...BENEFICIARY_TERM) }, 'выгодоприобретателей');
    return h('div', { class: 'benef-head' },
        h('div', { class: 'benef-head-icon' }),
        h('span', { class: 'benef-head-title' }, 'Укажите ', term, ' (получателей) страховых выплат по каждому виду выплаты'));
}
function openTermDialog(title, text) {
    const dlg = document.createElement('vaadin-dialog');
    dlg.classList.add('term-dialog');
    dlg.headerTitle = title;
    dlg.headerRenderer = root => { root.textContent = ''; root.appendChild(vbtn('', { iconName: 'close', cls: 'term-dialog-close', onClick: () => { dlg.opened = false; dlg.remove(); } })); };
    dlg.renderer = root => { root.textContent = ''; root.appendChild(h('div', { class: 'term-intro' }, h('span', {}, text))); };
    document.body.appendChild(dlg);
    dlg.opened = true;
}
function benefModeChoice() {
    const grid = h('div', { class: 'benef-mode' });
    benefModeTiles = {};
    [MODE_HEIRS, MODE_NAMED].forEach(mode => {
        const named = mode === MODE_NAMED;
        const text = h('span', { class: 'benef-mode-text' });
        if (named) {
            text.append('Назначить ', h('span', { class: 'benef-strong' }, 'конкретных выгодоприобретателей (получателей)'), ' по каждому виду выплаты');
        } else {
            text.append('Выгодоприобретателем по окончанию срока страхования является сам ',
                h('span', { class: 'benef-strong' }, 'Страхователь'),
                ', а в случае смерти застрахованного — его ',
                h('span', { class: 'benef-strong' }, 'законные наследники'), ' или ',
                h('span', { class: 'benef-strong' }, 'по завещанию'), '.');
        }
        const tile = h('div', { class: 'benef-mode-opt', onclick: () => onBenefModeClick(mode) },
            h('div', { class: 'benef-mode-icon ' + (named ? 'benef-mode-ico-named' : 'benef-mode-ico-heirs') }), text);
        benefModeTiles[mode] = tile;
        grid.appendChild(tile);
    });
    return h('div', { class: 'benef-default' }, grid);
}
function onBenefModeClick(mode) {
    if (mode === benefMode) return;
    benefMode = mode;
    Object.entries(benefModeTiles).forEach(([k, t]) => t.classList.toggle('selected', k === mode));
    if (mode === MODE_HEIRS) beneficiaries = [];
    rebuildBenefBody();
    if (mode === MODE_NAMED && beneficiaries.length === 0 && activeScenarios().length) addBeneficiary();
    updateWizardBar();
}
function annuity() { return R.protection.insurancePayments ? fval(R.protection.insurancePayments) === true : false; }
function hasGuaranteed() { const g = R.protection.guaranteedPeriod; const v = g ? parseInt(fval(g), 10) : NaN; return !isNaN(v) && v > 0; }
function activeScenarios() {
    if (!R.protection.premiumFrequency) return [];
    return annuity()
        ? (hasGuaranteed() ? [SC.SURVIVAL, SC.GUARANTEED, SC.ACCUM_DEATH] : [SC.SURVIVAL, SC.ACCUM_DEATH])
        : [SC.SURVIVAL, SC.ACCUM_DEATH];
}
function scenarioTitle(sc) {
    if (sc === SC.SURVIVAL) return annuity() ? 'Аннуитетная выплата по окончанию срока полиса' : 'Единовременная выплата по окончанию срока полиса';
    if (sc === SC.GUARANTEED) return 'Выплата в гарантированный период в случае смерти застрахованного';
    return 'Выплата в случае смерти застрахованного в период накопления';
}
function scenarioIcon(sc) { return sc === SC.SURVIVAL ? 'wallet' : sc === SC.GUARANTEED ? 'clock' : 'heart'; }
function scenarioTotal(sc) { return beneficiaries.reduce((sum, b) => sum + (b.shares[sc] || 0), 0); }

function rebuildBenefBody() {
    if (!benefBody) return;
    benefBody.innerHTML = '';
    if (benefMode !== MODE_NAMED) return;
    const scenarios = activeScenarios();
    if (!scenarios.length) {
        benefBody.appendChild(h('span', { class: 'benef-hint' }, 'Сначала выберите «Период страховых выплат» в разделе «Страховые покрытия».'));
        return;
    }
    const rows = h('div', { class: 'benef-rows' });
    beneficiaries.forEach((b, i) => rows.appendChild(buildBenefRow(b, i + 1, scenarios)));
    benefBody.appendChild(rows);
    const add = vbtn('Добавить выгодоприобретателя', { cls: 'add-btn', iconName: 'plus', onClick: () => addBeneficiary() });
    add.disabled = beneficiaries.length >= 10;
    benefBody.appendChild(add);
    if (beneficiaries.length > 1) benefBody.appendChild(buildBenefTotals(scenarios));
    refreshPersonChoices();
}
function buildBenefTotals(scenarios) {
    const box = h('div', { class: 'benef-totals' }, h('span', { class: 'benef-totals-head' }, 'Распределение долей'));
    scenarios.forEach(sc => {
        const chip = h('div', { class: 'benef-total-icon' }); chip.appendChild(icon(scenarioIcon(sc)));
        box.appendChild(h('div', { class: 'benef-total-row' }, chip,
            h('span', { class: 'benef-total-title' }, scenarioTitle(sc)),
            h('span', { class: 'benef-total-value' }, scenarioTotal(sc) + '%')));
    });
    return box;
}
function addBeneficiary() {
    beneficiaries.push({ id: ++benefSeq, shares: {} });
    rebuildBenefBody(); updateWizardBar();
}
function removeBeneficiary(b) { beneficiaries = beneficiaries.filter(x => x !== b); rebuildBenefBody(); updateWizardBar(); }
function onPaymentPeriodChanged() { rebuildBenefBody(); updateWizardBar(); }

/* строка получателя: свёрнутая сводка + форма внутри */
function buildBenefRow(b, number, scenarios) {
    const det = document.createElement('vaadin-details');
    det.classList.add('benef-row');
    b._cardEl = det;

    const name = h('span', { class: 'benef-row-name' }, 'Выгодоприобретатель №' + number);
    const meta = h('span', { class: 'benef-row-meta' });
    const shareVal = h('span', { class: 'benef-row-share-val' });
    const shareBox = h('div', { class: 'benef-row-share' }, h('span', { class: 'benef-row-share-label' }, 'Доли в выплате'), shareVal);
    const del = vbtn('', { theme: 'tertiary-inline', cls: 'benef-row-x', iconName: 'close', onClick: e => { e.stopPropagation(); removeBeneficiary(b); } });
    const summary = document.createElement('vaadin-details-summary');
    summary.setAttribute('slot', 'summary');
    summary.appendChild(h('div', { class: 'benef-row-summary' },
        h('div', { class: 'benef-row-avatar' }, h('div', { class: 'benef-row-avatar-icon' })),
        h('div', { class: 'benef-row-main' }, name, meta), shareBox, del));
    det.appendChild(summary);
    b._refreshRow = () => {
        const fio = b._fio ? (fval(b._fio) || '').trim() : '';
        meta.textContent = fio;
        meta.hidden = !fio;
        const parts = scenarios.filter(sc => b.shares[sc] != null).map(sc => shortScenario(sc) + ' ' + b.shares[sc] + '%');
        shareVal.textContent = parts.join(' · ');
        shareBox.hidden = parts.length === 0;
    };

    const personChoice = field({ kind: 'select', label: 'Выбрать выгодоприобретателя', col2: true, placeholder: 'Выберите из заполненных ранее' });
    b._person = personChoice;
    const F = {};
    const fio = field({ kind: 'text', label: 'ФИО', col2: true, required: true, prop: 'fio' });
    b._fio = fio;
    fio.addEventListener('value-changed', () => { b._refreshRow(); refreshPersonChoices(); });
    const relationship = field({ kind: 'select', label: 'Степень родства', options: RELATIONSHIP, col2: true });
    const birthday = field({ kind: 'date', label: 'Дата рождения', required: true, placeholder: 'дд.мм.гггг' });
    const gender = field({ kind: 'radio', label: 'Пол', required: true, options: O.gender });
    const iin = field({ kind: 'text', label: 'ИИН', required: true });
    const idDoc = field({ kind: 'select', label: 'Тип документа', required: true, options: O.idDocument });
    const docNo = field({ kind: 'text', label: 'Номер документа', required: true });
    const authority = field({ kind: 'select', label: 'Кем выдан', required: true, options: O.authority });
    const issueDate = field({ kind: 'date', label: 'Дата выдачи', required: true, placeholder: 'дд.мм.гггг' });
    const authorityOther = field({ kind: 'text', label: 'Укажите, кем выдан', col2: true, hidden: true });
    const address = field({ kind: 'textarea', label: 'Адрес местожительства', col2: true, required: true });
    const phone = field({ kind: 'text', label: 'Мобильный телефон', required: true, placeholder: '+7 (___) ___-__-__' });
    const email = field({ kind: 'email', label: 'E-mail' });
    onFchange(authority, v => reveal(authorityOther, v === 'Иное', { require: true }));

    const minor = field({ kind: 'radio', col2: true, hidden: true, required: true,
        label: 'Выгодоприобретатель несовершеннолетний — как выплачивать?',
        options: ['Выплата по достижении 18 лет', 'Выплату получает опекун'] });
    onFchange(birthday, v => {
        const d = v ? new Date(v) : null;
        const age = d ? (Date.now() - d.getTime()) / (365.2425 * 24 * 3600 * 1000) : null;
        reveal(minor, age != null && age < 18, { require: true });
    });

    const dataFields = [personChoice, fio, relationship, birthday, gender, iin, idDoc, docNo, authority, issueDate, authorityOther, address, phone, email];
    dataFields.slice(1).forEach(f => { f.hidden = true; });
    personChoice.addEventListener('value-changed', () => {
        const on = !!personChoice.value;
        dataFields.slice(1).forEach(f => { if (f !== authorityOther && f !== minor) f.hidden = !on; });
        applyPersonChoice(b, personChoice.value);
        b._refreshRow();
    });

    const body = formLayout(2);
    dataFields.forEach(f => body.appendChild(f));
    body.appendChild(buildSharesBox(b, scenarios));
    body.appendChild(minor);
    det.appendChild(body);
    b._refreshRow();
    return det;
}
const RELATIONSHIP = ['Супруг / Супруга', 'Сын / Дочь (Ребенок)', 'Отец / Мать (Родитель)', 'Брат / Сестра', 'Иное'];
function shortScenario(sc) { return sc === SC.SURVIVAL ? 'Дожитие' : sc === SC.GUARANTEED ? 'Гарант. период' : 'Смерть'; }

/* блок долей: переключатель вида выплаты + ползунок и поле под ним */
function buildSharesBox(b, scenarios) {
    const box = h('div', { class: 'benef-shares', colspan: '2' }, h('span', { class: 'benef-shares-head' }, 'Доли в выплате'));
    const grid = h('div', { class: 'benef-share-grid' });
    scenarios.forEach(sc => {
        const toggle = document.createElement('vaadin-checkbox');
        toggle.classList.add('toggle-switch', 'benef-share-toggle');
        const label = h('span', { class: 'benef-share-label' }, 'Является выгодоприобретателем ' + scenarioTitle(sc).toLowerCase());
        const slider = h('input', { type: 'range', class: 'benef-share-slider', min: '0', max: '100', step: '1', value: '100' });
        slider.style.setProperty('--acc-fill', '100%');
        const input = field({ kind: 'integer', cls: 'benef-share-field', suffix: '%' });
        const control = h('div', { class: 'benef-share-row' }, slider, input);
        control.hidden = true;
        const sync = v => {
            b.shares[sc] = v;
            slider.value = String(v == null ? 0 : v);
            slider.style.setProperty('--acc-fill', (v == null ? 0 : v) + '%');
            b._refreshRow();
            if (benefBody && beneficiaries.length > 1) refreshTotals();
            updateWizardBar();
        };
        slider.addEventListener('input', () => { input.value = slider.value; sync(parseInt(slider.value, 10)); });
        input.addEventListener('value-changed', () => {
            const v = input.value === '' ? null : parseInt(input.value, 10);
            sync(isNaN(v) ? null : v);
        });
        toggle.addEventListener('checked-changed', () => {
            control.hidden = !toggle.checked;
            if (toggle.checked) { if (!input.value || input.value === '0') input.value = '100'; sync(parseInt(input.value, 10)); }
            else { input.value = ''; sync(null); }
        });
        grid.appendChild(h('div', { class: 'benef-share-col' },
            h('div', { class: 'benef-share-toggle-item' }, toggle, label), control));
    });
    box.appendChild(grid);
    return box;
}
function refreshTotals() {
    const box = $('.benef-totals', benefBody); if (!box) return;
    const scenarios = activeScenarios();
    $$('.benef-total-value', box).forEach((el, i) => { el.textContent = scenarioTotal(scenarios[i]) + '%'; });
}

/* «Выбрать выгодоприобретателя»: страхователь · застрахованный · доп. застрахованный · другой */
function collectPeople() {
    const people = [];
    const ins = insurerFio(); if (ins) people.push({ label: `Страхователь (${ins})`, src: '#insurerSection' });
    const insd = R.insured.fio ? (fval(R.insured.fio) || '').trim() : ''; if (insd) people.push({ label: `Застрахованный (${insd})`, src: '#insuredSection' });
    if (additionalInsured) {
        const w = $('[data-prop="fio"]', additionalInsured);
        const f = w ? (fval(w) || '').trim() : '';
        if (f) people.push({ label: `Доп. застрахованный (${f})`, srcEl: additionalInsured });
    }
    return people;
}
function refreshPersonChoices() {
    const people = collectPeople();
    beneficiaries.forEach(b => {
        if (!b._person) return;
        const cur = b._person.value;
        const items = people.map((p, i) => ({ label: p.label, value: 'P' + i }));
        items.push({ label: 'Другой', value: 'OTHER' });
        b._person.items = items;
        b._peopleCache = people;
        if (cur && items.some(i => i.value === cur)) b._person.value = cur;
    });
}
function applyPersonChoice(b, val) {
    if (!val) return;
    if (val === 'OTHER') { if (b._fio) fclear(b._fio); return; }
    let root = null;
    if (val[0] === 'P') { const p = (b._peopleCache || [])[+val.slice(1)]; if (p) root = p.srcEl || (p.src ? $(p.src) : null); }
    if (root && b._fio) { const s = $('[data-prop="fio"]', root); if (s) copyVal(s, b._fio); }
    refreshPersonChoices();
}

/* ============================================================
   Шаг 5 — Опросник
   ============================================================ */
function buildQuestionnaire() {
    const det = sectionEl('questionnaireSection', 'БЛАНК-ОПРОСНИК ЗАСТРАХОВАННОГО', {});
    const refs = R.quest;
    det._body.appendChild(formNote());

    det._body.appendChild(metricsRow(refs));

    const diseasesHeader = h('span', { class: 'q-label mt-m', colspan: '2', style: 'display:block' }, 'Укажите имеющиеся у вас заболевания');
    const otherDiseases = field({ kind: 'textarea', label: 'Укажите другое', id: 'otherDiseases', col2: true, hidden: true });
    det._body.appendChild(diseasesHeader);
    const dGrid = h('div', { class: 'disease-grid' });
    const dAnketas = h('div', { class: 'disease-anketas' });
    buildDiseaseChecklist(dGrid, dAnketas, otherDiseases);
    det._body.appendChild(dGrid);
    det._body.appendChild(dAnketas);
    det._body.appendChild(grid(otherDiseases));

    // Беременность — после заболеваний, перед вопросом об инвалидности
    const pregnant = field({ kind: 'radio', id: 'pregnant', required: true, options: O.yesno, cls: 'qa-answer' });
    const gestational = field({ kind: 'integer', label: 'Срок беременности', id: 'gestationalAge', col2: true, hidden: true });
    refs.pregnant = pregnant; refs.gestational = gestational;
    onFchange(pregnant, v => reveal(gestational, v === 'Да', { require: true }));
    const pregnantRow = qaRow('Беременны ли вы?', 'qa-pregnant', pregnant);
    pregnantRow.hidden = true;
    refs.pregnantRow = pregnantRow;
    det._body.appendChild(pregnantRow);
    det._body.appendChild(grid(gestational));

    const notDisability = field({ kind: 'checkbox', label: 'Застрахованный не является инвалидом I или II группы', col2: true, cls: 'consent-toggle' });
    det._body.appendChild(grid(notDisability));

    const disabled = field({ kind: 'radio', id: 'disabled', required: true, options: O.yesno, cls: 'qa-answer' });
    const disabilityGroup = field({ kind: 'select', label: 'Группа инвалидности', id: 'disabilityGroup', col2: true, hidden: true, options: O.disabilityGroup });
    onFchange(disabled, v => reveal(disabilityGroup, v === 'Да', { require: true }));
    det._body.appendChild(qaRow('Имеется ли у Вас инвалидность?', 'qa-disability', disabled));
    det._body.appendChild(grid(disabilityGroup));

    const medications = field({ kind: 'radio', id: 'medications', required: true, options: O.yesno, cls: 'qa-answer' });
    const medicationsList = field({ kind: 'textarea', label: 'Перечислите названия препаратов, которые Вы принимаете в настоящее время', col2: true, hidden: true });
    onFchange(medications, v => reveal(medicationsList, v === 'Да', { require: true }));
    det._body.appendChild(qaRow('Принимаете ли Вы медицинские препараты в настоящее время?', 'qa-drugs', medications));
    det._body.appendChild(grid(medicationsList));

    const upcomingSurgery = field({ kind: 'radio', id: 'upcomingSurgery', required: true, options: O.yesno, cls: 'qa-answer' });
    const surgeryDesc = field({ kind: 'textarea', label: 'Укажите хирургическую операцию', id: 'surgeryDescription', col2: true, hidden: true });
    onFchange(upcomingSurgery, v => reveal(surgeryDesc, v === 'Да', { require: true }));
    det._body.appendChild(qaRow('Предстоит ли вам хирургическая операция?', 'qa-operation', upcomingSurgery));
    det._body.appendChild(grid(surgeryDesc));

    const dangerousSports = field({ kind: 'radio', id: 'dangerousSports', required: true, options: O.yesno, cls: 'qa-answer' });
    const sportsDesc = field({ kind: 'textarea', label: 'Укажите виды', id: 'sportsDescription', col2: true, hidden: true });
    const sportBox = h('div', { class: 'bordered-box', colspan: '2' });
    onFchange(dangerousSports, v => { const on = v === 'Да'; reveal(sportsDesc, on, { require: true }); sportBox.classList.toggle('on', on); sportBox.innerHTML = ''; if (on) sportBox.appendChild(buildSportFragment()); });
    det._body.appendChild(qaRow('Занимаетесь/собираетесь заниматься опасными видами спорта?', 'qa-sport', dangerousSports));
    det._body.appendChild(grid(sportsDesc, sportBox));

    const hazardous = field({ kind: 'radio', id: 'hazardousOccupation', required: true, options: O.yesno, cls: 'qa-answer' });
    const occBox = h('div', { class: 'bordered-box', colspan: '2' });
    onFchange(hazardous, v => { const on = v === 'Да'; occBox.classList.toggle('on', on); occBox.innerHTML = ''; if (on) occBox.appendChild(buildOccupationFragment()); });
    det._body.appendChild(qaRow('Связана ли ваша профессия с трудовой деятельностью, которую можно назвать опасной?', 'qa-work', hazardous));
    det._body.appendChild(grid(occBox));

    det._body.appendChild(buildAgentBlock());
    return det;
}

/* примечание над опросником: ключевые обороты жирным (components/formNote) */
const NOTE_ACCENTS = ['оценки страхового риска', 'достоверные', 'исчерпывающие ответы', 'принятие решения Страховщиком'];
function formNote(text) {
    const full = text || 'Ваши ответы на предлагаемые ниже вопросы являются основным критерием для оценки страхового риска, '
        + 'поэтому просим вас предоставить на них достоверные и исчерпывающие ответы, а также всю дополнительную информацию, '
        + 'которая могла бы повлиять на принятие решения Страховщиком';
    const note = h('h5', { class: 'form-note', colspan: '2' });
    let rest = full;
    NOTE_ACCENTS.forEach(a => {
        const at = rest.indexOf(a);
        if (at < 0) return;
        note.append(document.createTextNode(rest.slice(0, at)), h('span', { class: 'form-note-strong' }, a));
        rest = rest.slice(at + a.length);
    });
    note.append(document.createTextNode(rest));
    return note;
}

/* строка вопроса «Да/Нет»: текст со значком слева, ответы справа */
function qaRow(question, iconCls, answer) {
    return h('div', { class: 'qa-row', colspan: '2' },
        h('span', { class: 'qa-question ' + iconCls }, question), answer);
}

/* рост · вес · давление — одной строкой карточек */
const METRIC_GROUPS = [
    {
        title: 'Антропометрические данные', sub: 'Основные физические параметры',
        cards: [
            { cap: 'Рост', req: true, icon: 'fld-ico-height', unit: 'см', foot: 'Сантиметры', kind: 'number', key: 'height' },
            { cap: 'Вес', req: true, icon: 'fld-ico-weight', unit: 'кг', foot: 'Килограммы', kind: 'number', key: 'weight' },
        ],
    },
    {
        title: 'Рабочее артериальное давление', sub: 'Обычные показатели давления',
        cards: [
            { cap: 'Верхнее (SYS)', icon: 'fld-ico-bp-up', unit: 'мм рт. ст.', foot: 'Систолическое', kind: 'bp', key: 'bpWorkUpper' },
            { cap: 'Нижнее (DIA)', icon: 'fld-ico-bp-down', unit: 'мм рт. ст.', foot: 'Диастолическое', kind: 'bp', key: 'bpWorkLower' },
        ],
    },
    {
        title: 'Макс. артериальное давление', sub: 'Максимально повышенные показатели',
        cards: [
            { cap: 'Верхнее (SYS)', max: true, icon: 'fld-ico-bp-up-max', unit: 'мм рт. ст.', foot: 'Систолическое (макс.)', kind: 'bp', key: 'bpMaxUpper' },
            { cap: 'Нижнее (DIA)', max: true, icon: 'fld-ico-bp-down-max', unit: 'мм рт. ст.', foot: 'Диастолическое (макс.)', kind: 'bp', key: 'bpMaxLower' },
        ],
    },
];
function metricsRow(refs) {
    const row = h('div', { class: 'metrics-row', colspan: '2' });
    METRIC_GROUPS.forEach(g => {
        const body = h('div', { class: 'metric-group-body' });
        g.cards.forEach(c => body.appendChild(metricCard(c, refs)));
        row.appendChild(h('div', { class: 'metric-group' },
            h('span', { class: 'metric-group-title' }, g.title),
            h('span', { class: 'metric-group-sub' }, g.sub),
            body));
    });
    return row;
}
function metricCard(cfg, refs) {
    const input = field({ kind: cfg.kind === 'bp' ? 'text' : 'number', id: cfg.key, required: cfg.req, placeholder: '_ _ _' });
    input.style.width = '100%';
    if (cfg.kind === 'bp') { input.maxlength = 3; input.allowedCharPattern = '[0-9]'; }
    input.setAttribute('aria-label', cfg.cap);
    if (refs) refs[cfg.key] = input;
    const cap = h('div', { class: 'metric-cap' }, h('span', { class: 'metric-cap-text' }, cfg.cap));
    if (cfg.req) cap.appendChild(h('span', { class: 'metric-req' }, '•'));
    if (cfg.max) cap.appendChild(h('span', { class: 'metric-badge' }, 'MAX'));
    return h('div', { class: 'metric' }, cap,
        h('div', { class: 'metric-pic ' + cfg.icon }),
        input,
        h('span', { class: 'metric-unit' }, cfg.unit),
        h('div', { class: 'metric-foot' }, h('span', {}, cfg.foot)));
}

function bindPregnantToGender() {
    const g = R.insured.gender;
    if (g) onFchange(g, v => { const on = v === 'Женский'; R.quest.pregnantRow.hidden = !on; reveal(R.quest.pregnant, on, { require: true }); });
}
function buildAgentBlock() {
    const wrap = h('div', { id: 'agentInfoForm' });
    wrap.appendChild(h('h5', { class: 'mt-l' }, 'ИНФОРМАЦИЯ ОБ АГЕНТЕ'));
    const helped = field({ kind: 'radio', label: 'Помог ли вам агент заполнить заявление?', id: 'agentHelped', col2: true, options: O.yesno });
    const code = field({ kind: 'integer', label: 'Код сотрудника', id: 'employeeCode', col2: true, hidden: true });
    onFchange(helped, v => reveal(code, v === 'Да', { require: true }));
    wrap.appendChild(grid(helped, code));
    return wrap;
}

/* плитки заболеваний */
function buildDiseaseChecklist(gridEl, anketasEl, otherField) {
    const state = { anketas: {} };
    DISEASES.forEach(name => {
        const tile = h('div', { class: 'disease-tile' }, h('div', { class: 'disease-icon ' + (DISEASE_ICONS[name] || 'icon-placeholder') }), h('span', { class: 'disease-name' }, name));
        tile.addEventListener('click', () => toggleDisease(name, tile, state, gridEl, anketasEl, otherField));
        gridEl.appendChild(tile);
    });
}
function toggleDisease(name, tile, state, gridEl, anketasEl, otherField) {
    if (name === 'Нет') {
        const sel = !tile.classList.contains('selected');
        if (sel) {
            $$('.disease-tile', gridEl).forEach(t => { if (t !== tile) { t.classList.remove('selected'); t.classList.add('disabled'); } });
            Object.keys(state.anketas).forEach(k => { state.anketas[k].remove(); delete state.anketas[k]; });
            reveal(otherField, false, {}); tile.classList.add('selected');
        } else { $$('.disease-tile', gridEl).forEach(t => t.classList.remove('disabled')); tile.classList.remove('selected'); }
        updateWizardBar(); return;
    }
    const sel = !tile.classList.contains('selected');
    tile.classList.toggle('selected', sel);
    if (sel) {
        if (name === 'Другое') reveal(otherField, true, { require: true, clear: false });
        const a = buildDiseaseAnketa(name); state.anketas[name] = a; anketasEl.appendChild(a);
    } else {
        if (name === 'Другое') reveal(otherField, false, {});
        if (state.anketas[name]) { state.anketas[name].remove(); delete state.anketas[name]; }
    }
    updateWizardBar();
}
function buildDiseaseAnketa(name) {
    const det = sectionEl(null, 'АНКЕТА ПО ЗАБОЛЕВАНИЮ' + (name ? ' (' + name + ')' : ''), { extraCard: true });
    det._body.appendChild(h('span', { class: 'anketa-intro' }, 'Заполнение данной анкеты необходимо по каждому заболеванию в отдельности. Пожалуйста, ответьте на каждый вопрос и подробно изложите все необходимые сведения.'));
    let n = 0; const num = () => (++n) + '. ';
    const SEV = ['Лёгкий дискомфорт', 'Мешает нормальной жизнедеятельности', 'Временная нетрудоспособность', 'Полная нетрудоспособность', 'Требуется госпитализация'];
    const sufferingNow = field({ kind: 'radio', options: O.yesno });
    const severity = field({ kind: 'select', options: SEV });
    onFchange(sufferingNow, v => { severity.items = (v === 'Нет' ? ['Нет', ...SEV] : SEV).map(o => ({ label: o, value: o })); });
    const colLeft = h('div', { class: 'anketa-col' });
    const flL = formLayout(1);
    sufferingNow.label = num() + 'Вы страдаете данным заболеванием в настоящее время?';
    flL.appendChild(sufferingNow);
    flL.appendChild(field({ kind: 'textarea', label: num() + 'Когда вы почувствовали первые признаки данного заболевания?' }));
    flL.appendChild(field({ kind: 'textarea', label: num() + 'Как часто вас беспокоит данное состояние?' }));
    severity.label = num() + 'Степень тяжести';
    flL.appendChild(severity);
    flL.appendChild(field({ kind: 'textarea', label: num() + 'Опишите симптомы' }));
    flL.appendChild(field({ kind: 'date', label: num() + 'Укажите дату последнего обострения / когда в последний раз ощущали симптомы', placeholder: 'дд.мм.гггг' }));
    flL.appendChild(field({ kind: 'radio', label: num() + 'Вы обращались к врачу по поводу данного состояния?', options: O.yesno }));
    colLeft.appendChild(flL);

    const surgeryOffered = field({ kind: 'radio', options: O.yesno });
    const surgResult = field({ kind: 'textarea', label: 'Когда она была проведена и ее результат', hidden: true, helper: 'Пожалуйста, подробно укажите детали.' });
    const surgDescr = field({ kind: 'textarea', label: 'Укажите описание операции', hidden: true, helper: 'По возможности' });
    const underSpec = field({ kind: 'radio', label: 'Находитесь ли вы под наблюдением специалиста в настоящее время?', options: O.yesno, hidden: true });
    const recommend = field({ kind: 'textarea', label: 'Его рекомендации', hidden: true });
    const disabilityBenefit = field({ kind: 'radio', options: O.yesno });
    const benefitDetails = field({ kind: 'textarea', label: 'Укажите подробные сведения, включая причину выплаты данного пособия', hidden: true });
    const colRight = h('div', { class: 'anketa-col' });
    const flR = formLayout(1);
    [field({ kind: 'radio', label: num() + 'Было ли вам проведено какое-либо обследование?', options: O.yesno }),
        field({ kind: 'textarea', label: num() + 'Каковы его результаты?', helper: 'Полный диагноз и наименование медицинского учреждения' }),
        field({ kind: 'textarea', label: num() + 'Вы проходили или все еще проходите какое-нибудь лечение?' }),
        field({ kind: 'select', label: num() + 'Укажите степень вашего выздоровления', options: ['Выздоровление', 'Требуется профилактическое лечение', 'Требуется операция', 'Хроническое заболевание'] }),
        field({ kind: 'textarea', label: num() + 'Вы испытываете какие-нибудь признаки данного заболевания или осложнения', helper: 'Опишите их, а также частоту и тяжесть' })].forEach(c => flR.appendChild(c));
    surgeryOffered.label = num() + 'Предлагалась ли вам операция?';
    [surgeryOffered, surgResult, surgDescr, underSpec, recommend].forEach(c => flR.appendChild(c));
    disabilityBenefit.label = num() + 'Вы получали когда-либо или получаете сейчас какое-нибудь пособие по нетрудоспособности?';
    flR.appendChild(disabilityBenefit); flR.appendChild(benefitDetails);
    if (name === 'Артериальная гипертония') flR.appendChild(field({ kind: 'textarea', label: 'Частота кризов' }));
    colRight.appendChild(flR);
    onFchange(surgeryOffered, v => { const on = v === 'Да';[surgResult, surgDescr, underSpec, recommend].forEach(w => reveal(w, on, {})); });
    onFchange(disabilityBenefit, v => reveal(benefitDetails, v === 'Да', {}));
    det._body.appendChild(h('div', { class: 'anketa-columns' }, colLeft, colRight));
    return det;
}
function buildSportFragment() {
    const det = sectionEl(null, 'ДОПОЛНИТЕЛЬНАЯ АНКЕТА: СПОРТ', { extraCard: true });
    det._body.appendChild(h('span', { class: 'q-label', style: 'display:block;margin-bottom:.6rem' }, 'Пожалуйста, ответьте на каждый вопрос и подробно изложите все необходимые сведения.'));
    det._body.appendChild(grid(
        field({ kind: 'textarea', label: 'Каким видом спорта вы занимаетесь или увлекаетесь?', col2: true }),
        field({ kind: 'radio', label: 'Укажите, кем вы являетесь в данной сфере:', col2: true, options: ['Профессионалом', 'Любителем', 'Преподавателем/Тренером', 'Инструктором'] }),
        field({ kind: 'radio', label: 'Принимаете ли вы участие в соревнованиях?', col2: true, options: O.yesno })));
    det._body.appendChild(h('span', { class: 'q-label mt-m', style: 'display:block' }, 'Тип спорта (нужное отметить):'));
    det._body.appendChild(grid(field({ kind: 'checkbox', label: 'Бесконтактный' }), field({ kind: 'checkbox', label: 'Частичный или полный контакт' }), field({ kind: 'checkbox', label: 'С использованием оружия' })));
    return det;
}
function buildOccupationFragment() {
    const det = sectionEl(null, 'ДОПОЛНИТЕЛЬНАЯ АНКЕТА: ПО РОДУ ДЕЯТЕЛЬНОСТИ', { extraCard: true });
    det._body.appendChild(h('span', { class: 'q-label', style: 'display:block;margin-bottom:.6rem' }, 'Пожалуйста, ответьте на каждый вопрос и подробно изложите все необходимые сведения.'));
    const dangerDetails = field({ kind: 'textarea', label: 'Пожалуйста, укажите детали (характер, частоту или специфику выбранных условий)', col2: true, hidden: true });
    const dangers = ['a) Поднятие или перемещение тяжелых грузов (товаров)', 'b) Работа под землей или на высоте 15 метров и более', 'c) Работа с химикатами и газами', 'd) Работа с радиоактивными веществами', 'e) Имеют место регулярные командировки', 'f) Регулярная смена или плавающий рабочий график', 'g) Ненормированный рабочий день', 'h) Использование взрывчатых веществ', 'i) Работа с высоким напряжением', 'j) Имеется ли разрешение на ношение оружия'];
    const checks = dangers.map(d => field({ kind: 'checkbox', label: d, col2: true }));
    const upd = () => reveal(dangerDetails, checks.some(w => w.checked), {});
    checks.forEach(w => w.addEventListener('checked-changed', upd));
    det._body.appendChild(grid(field({ kind: 'radio', label: '1. Вы', col2: true, options: ['Работаете постоянно', 'Работаете временно', 'Частично заняты'] }), field({ kind: 'textarea', label: '2. Пожалуйста, опишите ваши профессиональные обязанности', col2: true })));
    det._body.appendChild(h('span', { class: 'q-label mt-m', colspan: '2', style: 'display:block' }, '3. Подвергаетесь ли вы какой-либо ниже перечисленной опасности во время выполнения ваших профессиональных обязанностей либо ваша работа включает:'));
    det._body.appendChild(grid(...checks, dangerDetails, field({ kind: 'textarea', label: '4. Пожалуйста, опишите какое-либо полученное вами производственное заболевание или травму', col2: true })));
    return det;
}

/* анкета доп. застрахованного */
let additionalQuestionnaire = null;
function addAdditionalQuestionnaire() {
    if (additionalQuestionnaire) return;
    const det = sectionEl(null, 'БЛАНК-ОПРОСНИК ДОП. ЗАСТРАХОВАННОГО', { extraCard: true });
    det._body.appendChild(h('h5', { class: 'mt-l mb-l' }, 'Ваши ответы на предлагаемые ниже вопросы являются основным критерием для оценки страхового риска, поэтому просим вас предоставить на них достоверные и исчерпывающие ответы, а также всю дополнительную информацию, которая могла бы повлиять на принятие решения Страховщиком'));
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
    det._body.appendChild(grid(treatment, reason, height, weight, disabled, disabilityGroup, upcoming, surgeryD));
    $('#questionnaireSection').after(det);
    additionalQuestionnaire = det;
    registerInStep(4, det);
}
function removeAdditionalQuestionnaire() { if (additionalQuestionnaire) { unregisterFromStep(4, additionalQuestionnaire); additionalQuestionnaire.remove(); additionalQuestionnaire = null; } }

/* ============================================================
   Экран ознакомления с документами (до мастера)
   ============================================================ */
const DOCS = [
    {
        key: 'kid', pages: 3, icon: 'docs-ico-kid', file: './docs/kid-nsj.pdf',
        title: 'Ключевой информационный документ',
        sub: 'Основная информация о продукте, условиях и возможных рисках.',
        agree: ['Я ознакомлен и согласен с условиями ', 'Ключевого информационного документа'],
    },
    {
        key: 'rules', pages: 8, icon: 'docs-ico-rules', file: './docs/pravila-strahovaniya.pdf',
        title: 'Правила страхования',
        sub: 'Полные условия страхования, права и обязанности сторон.',
        agree: ['Я ознакомлен с ', 'Правилами страхования'],
    },
];
const PAGE_ASPECT = '595 / 842';
let docsGate = null, docsContinueBtn = null;
const docAgrees = [];

function docPages(doc) {
    const box = h('div', {});
    for (let p = 1; p <= doc.pages; p++) {
        const img = h('img', { class: 'doc-preview-page', loading: 'lazy', src: `./docs/${doc.key}-${p}.png`, alt: `${doc.title}, страница ${p}` });
        img.style.aspectRatio = PAGE_ASPECT;
        box.appendChild(img);
    }
    return box;
}
function openDocDialog(doc) {
    const dlg = document.createElement('vaadin-dialog');
    dlg.classList.add('doc-dialog');
    dlg.headerTitle = doc.title;
    dlg.width = 'min(1080px, 94vw)';
    dlg.height = '94vh';
    dlg.headerRenderer = (root) => {
        root.textContent = '';
        root.appendChild(vbtn('', { iconName: 'close', cls: 'doc-dialog-close', onClick: () => { dlg.opened = false; dlg.remove(); } }));
    };
    dlg.renderer = (root) => {
        root.textContent = '';
        const pages = docPages(doc);
        pages.classList.add('doc-dialog-pages');
        root.appendChild(pages);
    };
    dlg.footerRenderer = (root) => {
        root.textContent = '';
        root.appendChild(h('a', { class: 'doc-action', href: doc.file, download: true }, icon('download'), h('span', {}, 'Скачать (PDF)')));
    };
    document.body.appendChild(dlg);
    dlg.opened = true;
}
function buildDocCard(doc) {
    const preview = docPages(doc);
    preview.classList.add('doc-preview');
    const download = h('a', { class: 'doc-action', href: doc.file, download: true }, icon('download'), h('span', {}, 'Скачать (PDF)'));
    download.addEventListener('click', e => e.stopPropagation());
    const card = h('div', { class: 'doc-card', onclick: () => openDocDialog(doc) },
        h('div', { class: 'doc-card-head' },
            h('div', { class: 'doc-card-icon' }, h('div', { class: `doc-ico ${doc.icon}` })),
            h('div', { class: 'doc-card-text' },
                h('span', { class: 'doc-card-title' }, doc.title),
                h('span', { class: 'doc-card-sub' }, doc.sub))),
        preview,
        h('div', { class: 'doc-card-foot' },
            h('span', { class: 'doc-action' }, icon('eye'), h('span', {}, 'Просмотреть документ')),
            download));
    // щелчок по полосе прокрутки не должен открывать окно
    preview.addEventListener('click', e => { if (e.offsetX > preview.clientWidth) e.stopPropagation(); });
    return card;
}
function buildDocAgree(doc) {
    const link = h('a', { class: 'doc-link', href: doc.file, target: '_blank' }, doc.agree[1]);
    link.addEventListener('click', e => e.stopPropagation());
    const label = h('div', { class: 'doc-agree-label' }, doc.agree[0], link, '.');
    const cb = document.createElement('vaadin-checkbox');
    cb.classList.add('toggle-switch');
    cb.appendChild(h('label', { slot: 'label' }, label));
    cb.addEventListener('checked-changed', updateDocsContinue);
    docAgrees.push(cb);
    const ic = icon('doc'); ic.classList.add('doc-icon');
    return h('div', { class: 'doc-agree' }, ic, cb);
}
function updateDocsContinue() {
    docsContinueBtn.disabled = !docAgrees.every(cb => cb.checked);
}
function buildDocsGate() {
    docsContinueBtn = vbtn('Продолжить', { theme: 'primary', iconName: 'arrowRight', iconAfter: true, onClick: acceptDocs });
    docsContinueBtn.disabled = true;
    docsGate = h('div', { class: 'docs-gate', id: 'docsGate' },
        h('div', { class: 'docs-head' },
            h('div', { class: 'docs-head-icon' }, h('div', { class: 'doc-ico docs-ico-docs' })),
            h('div', { class: 'docs-head-text' },
                h('span', { class: 'docs-gate-title' }, 'Ознакомление с документами'),
                h('span', { class: 'docs-head-sub' }, 'Перед продолжением ознакомьтесь с ключевыми документами.'))),
        h('div', { class: 'doc-cards' }, DOCS.map(buildDocCard)),
        h('div', { class: 'docs-gate-foot' },
            h('div', { class: 'doc-agrees' }, DOCS.map(buildDocAgree)),
            docsContinueBtn));
    return docsGate;
}
function showDocsGate(on) {
    docsGate.classList.toggle('step-off', !on);
    wizardBar.classList.toggle('step-off', on);
    $('.wizard-nav').classList.toggle('step-off', on);
    steps.forEach(secs => secs.forEach(sec => sec.classList.toggle('step-off', on)));
    if (!on) goToStep(0);
}
function acceptDocs() { showDocsGate(false); }

/* ============================================================
   Мастер
   ============================================================ */
let steps = [], currentStep = 0;
let wizardBar, backBtn, nextBtn, signBtn, stepIndicator;
function registerInStep(i, el) { if (!steps[i].includes(el)) steps[i].push(el); el.classList.add('wiz-anim'); el.classList.toggle('step-off', i !== currentStep); }
function unregisterFromStep(i, el) { steps[i] = steps[i].filter(x => x !== el); }
function buildWizardBar() {
    const bar = h('div', { class: 'wizard-bar' });
    STEP_TITLES.forEach((title, i) => {
        if (i > 0) bar.appendChild(h('div', { class: 'wizard-connector', 'data-conn': String(i) }));
        bar.appendChild(h('div', { class: 'wizard-step', 'data-step': String(i), onclick: () => goToStep(i) }, h('div', { class: 'wizard-dot' }, String(i + 1)), h('div', { class: 'wizard-label' }, title)));
    });
    wizardBar = bar; return bar;
}
function buildWizardNav() {
    navTotalValue = h('span', { class: 'nav-total-value' });
    navTotal = h('div', { class: 'nav-total' }, h('span', { class: 'nav-total-label' }, 'Общая премия к оплате'), navTotalValue);
    navTotal.hidden = true;
    backBtn = vbtn('Назад', { theme: 'tertiary', iconName: 'arrowLeft', onClick: () => goToStep(currentStep - 1) });
    nextBtn = vbtn('Далее', { theme: 'primary', iconName: 'arrowRight', iconAfter: true, onClick: () => goToStep(currentStep + 1) });
    signBtn = vbtn('Подтвердить', { theme: 'primary', iconName: 'checkCircle', onClick: () => toast('Демо-режим: данные никуда не отправляются') });
    stepIndicator = h('span', { class: 'wizard-progress-text' });
    return h('div', { class: 'wizard-nav' }, backBtn, stepIndicator, navTotal, h('div', { class: 'wizard-nav-right' }, nextBtn, signBtn));
}
function goToStep(index) {
    if (index < 0 || index >= steps.length) return;
    currentStep = index;
    steps.forEach((secs, i) => secs.forEach(sec => { sec.classList.toggle('step-off', i !== index); if (i === index && sec.localName === 'vaadin-details') sec.opened = true; }));
    if (index === 1) refreshInsuredChoiceLabel();
    if (index === 3) refreshPersonChoices();
    backBtn.hidden = index === 0;
    nextBtn.hidden = index === steps.length - 1;
    signBtn.hidden = index !== steps.length - 1;
    stepIndicator.textContent = 'Шаг ' + (index + 1) + ' из ' + steps.length;
    updateNavTotal();
    updateWizardBar();
    const c = $('#app'); if (c) c.scrollIntoView({ block: 'start' });
}
function updateWizardBar() {
    if (!wizardBar || steps.length === 0) return;
    $$('.wizard-step', wizardBar).forEach(step => {
        const i = +step.dataset.step;
        const filled = i !== currentStep && isStepFilled(i);
        step.classList.toggle('active', i === currentStep);
        step.classList.toggle('done', filled);
        $('.wizard-dot', step).textContent = filled ? '✓' : String(i + 1);
    });
    $$('.wizard-connector', wizardBar).forEach(conn => conn.classList.toggle('done', +conn.dataset.conn <= currentStep));
}
function isStepFilled(step) {
    if (!steps[step]) return false;
    if (step === 1 && (!R.insured.insuredChoice || !fval(R.insured.insuredChoice))) return false;
    if (step === 3) {
        if (!benefMode) return false;                                  // способ назначения не выбран
        if (benefMode === MODE_NAMED && beneficiaries.length === 0) return false;
    }
    return !steps[step].some(sec => hasEmptyRequired(sec));
}
function hasEmptyRequired(root) {
    return $$('[data-field]', root).some(c => {
        if (!c.required) return false;
        if (c.hidden || c.closest('[hidden]')) return false;
        const v = fval(c);
        if (c.localName === 'vaadin-checkbox-group') return !v || v.length === 0;
        if (c.localName === 'vaadin-checkbox') return false;
        return v == null || v === '';
    });
}

let toastTimer = null;
function toast(msg) {
    let t = $('#toast');
    if (!t) { t = h('div', { id: 'toast', class: 'toast' }); document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ============================================================
   Инициализация
   ============================================================ */
function init() {
    const app = $('#app');
    app.appendChild(h('h1', { class: 'header' }, 'ЗАЯВЛЕНИЕ НА НАКОПИТЕЛЬНОЕ СТРАХОВАНИЕ ЖИЗНИ С УЧАСТИЕМ В ПРИБЫЛИ'));
    app.appendChild(h('div', { class: 'line mt-m mb-m' }));
    app.appendChild(buildWizardBar());
    const insurer = buildInsurer(), insured = buildInsured(), protection = buildProtection(), beneficiary = buildBeneficiary(), questionnaire = buildQuestionnaire();
    app.appendChild(insurer); app.appendChild(insured); app.appendChild(protection); app.appendChild(beneficiary); app.appendChild(questionnaire);
    app.appendChild(buildWizardNav());
    steps = [[insurer], [insured], [protection], [beneficiary], [questionnaire]];
    bindPregnantToGender();
    goToStep(0);
    // ознакомление с документами идёт до мастера
    recalcSenim();
    wizardBar.after(buildDocsGate());
    showDocsGate(true);
}
init();
