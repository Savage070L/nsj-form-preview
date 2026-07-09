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
import '@vaadin/button';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/form-layout';
import '@vaadin/vaadin-lumo-styles/all-imports.js';
import './Document.css';
import './theme-extra.css';

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
};
const rng = (a, b, s) => { const o = []; for (let v = a; v <= b; v += s) o.push(String(v)); return o; };
const BP_UP = rng(90, 200, 5), BP_LOW = rng(50, 140, 5);

const DISEASES = ['Нарушение слуха', 'Сахарный диабет', 'ИБС (стенокардия, инфаркт миокарда), другие болезни сердца',
    'Последствия травм', 'Болезни глаз', 'Болезни легких', 'Нет', 'Артериальная гипертония', 'Болезни почек',
    'Нарушения мозгового кровообращения и их последствия, эпилепсия', 'Онкологические заболевания', 'Болезни печени', 'Другое'];
const DISEASE_ICONS = {
    'Нет': 'icon-none', 'Сахарный диабет': 'icon-diabetes', 'ИБС (стенокардия, инфаркт миокарда), другие болезни сердца': 'icon-heart',
    'Последствия травм': 'icon-trauma', 'Болезни глаз': 'icon-eyes', 'Болезни легких': 'icon-lungs',
    'Артериальная гипертония': 'icon-hypertension', 'Болезни почек': 'icon-kidneys',
    'Нарушения мозгового кровообращения и их последствия, эпилепсия': 'icon-brain', 'Болезни печени': 'icon-liver',
    'Нарушение слуха': 'icon-hearing', 'Онкологические заболевания': 'icon-oncology', 'Другое': 'icon-other',
};
const STEP_TITLES = ['Страхователь', 'Застрахованный', 'Страховая защита', 'Выгодоприобретатели', 'Опросник'];
const BT = {
    LUMP_END: 'Для получения единовременной выплаты по окончанию срока полиса',
    LUMP_ACCUM_DEATH: 'Единовременная выплата в случае смерти застрахованного в период накопления',
    ANNUITY_END: 'Для получения аннуитетной выплаты по окончанию срока полиса',
    ANNUITY_GUARANTEED: 'Для получения аннуитетной выплаты в гарантированный период в случае смерти застрахованного по окончанию срока полиса',
    ANNUITY_ACCUM_DEATH: 'Аннуитетная выплата в случае смерти застрахованного в период накопления',
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
        (cfg.options || []).forEach(o => { const b = document.createElement('vaadin-radio-button'); b.value = o; b.label = o; c.appendChild(b); });
    } else if (k === 'checkboxgroup') {
        c = document.createElement('vaadin-checkbox-group');
        if (cfg.label) c.label = cfg.label;
        if (cfg.horizontal) c.setAttribute('theme', 'horizontal');
        (cfg.options || []).forEach(o => { const b = document.createElement('vaadin-checkbox'); b.value = o; b.label = o; c.appendChild(b); });
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
    add('gender', { kind: 'radio', label: 'Пол', id: 'gender', prop: 'gender', required: true, options: O.gender });
    add('idDocument', { kind: 'select', label: 'Документ, удостоверяющий личность', id: 'idDocument', prop: 'idDocument', required: true, options: O.idDocument, placeholder: opts.icons ? 'Выберите документ' : null, iconName: opts.icons ? 'doc' : null });
    add('no', { kind: 'text', label: opts.docNoLabel || '№', prop: 'no', required: true, iconName: opts.icons ? 'hash' : null });
    add('authority', { kind: 'select', label: 'Выдан', id: 'authority', prop: 'authority', required: true, options: O.authority, placeholder: opts.icons ? 'Выберите орган выдачи' : null, iconName: opts.icons ? 'institution' : null });
    add('authorityOther', { kind: 'text', label: 'Укажите, кем выдан', id: 'authorityOther', prop: 'authorityOther', col2: true, hidden: true, iconName: opts.icons ? 'pencil' : null });
    add('iin', { kind: 'text', label: 'ИИН', id: 'iin', prop: 'iin', hidden: !opts.icons, iconName: opts.icons ? 'card' : null });
    add('series', { kind: 'text', label: 'Серия', id: 'series', prop: 'series', hidden: true, iconName: opts.icons ? 'barcode' : null });
    add('issueDate', { kind: 'date', label: 'Дата выдачи', prop: 'issueDate', required: true, placeholder: 'дд.мм.гггг', iconName: opts.icons ? 'calendarO' : null });
    add('kzResident', { kind: 'checkbox', label: 'Не резидент РК', id: 'kzResident', prop: 'kzResident' });
    add('citizenship', { kind: 'text', label: 'Гражданство', id: 'citizenship', prop: 'citizenship', hidden: true, iconName: opts.icons ? 'globe' : null });
    if (opts.icons) F.iin.hidden = false;
    onFchange(F.authority, v => reveal(F.authorityOther, v === 'Иное', { require: true }));
    onFchange(F.kzResident, v => reveal(F.citizenship, v === true, {}));
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
    const g = grid(F.fio, F.birthday, F.gender, F.idDocument, F.no, F.authority, F.authorityOther, F.iin, F.series, F.issueDate,
        F.kzResident, F.citizenship, extra.taxResident, extra.birthplace, extra.address, extra.isOfficial,
        extra.workPlace, extra.position, extra.jobDescr, extra.phone, extra.email, extra.secondPhone, extra.infoChannels);
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
    const addBtn = vbtn('+ Добавить дополнительного застрахованного', { theme: 'primary', onClick: addAdditionalInsured });
    addBtn.setAttribute('colspan', '2');
    refs.addBtn = addBtn;

    const g = grid(choice, F.fio, F.birthday, F.gender, F.idDocument, F.no, F.authority, F.authorityOther, F.iin, F.series, F.issueDate,
        F.kzResident, F.citizenship, extra.taxResident, extra.birthplace, extra.address, extra.isOfficial,
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
   Шаг 3 — Страховая защита
   ============================================================ */
function buildProtection() {
    const det = sectionEl('protectionSection', 'СТРАХОВАЯ ЗАЩИТА', {});
    const refs = R.protection;
    const accLabel = h('span', {}, 'ПЕРИОД НАКОПЛЕНИЯ (в годах): 1');
    accLabel.style.cssText = 'color:var(--brand-blue);font-weight:700;display:block';
    const accSlider = h('input', { type: 'range', min: '1', max: '30', step: '1', value: '1' });
    accSlider.style.cssText = 'width:100%;max-width:520px;accent-color:var(--brand-green);margin-top:.4rem';
    accSlider.addEventListener('input', () => accLabel.textContent = 'ПЕРИОД НАКОПЛЕНИЯ (в годах): ' + accSlider.value);
    const accWrap = h('div', {}, accLabel, accSlider); accWrap.setAttribute('colspan', '2');

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
    det._body.appendChild(grid(accWrap, premium, freq, payments, annuityTerm, guaranteed, annuityPay, indexing));

    const cov = formLayout(2);
    cov.appendChild(h('h5', { colspan: '2', class: 'mt-l mb-l' }, 'ДОПОЛНИТЕЛЬНЫЕ СТРАХОВЫЕ ПОКРЫТИЯ'));
    const items = [
        ['1. Выплата дополнительной страховой суммы в случае смерти Застрахованного в результате несчастного случая', null],
        ['2. Страхование на случай утраты трудоспособности с установлением инвалидности 1, 2 группы в результате насчастного случая', { label: 'Выберите вариант', options: O.disabilityInsuranceAccident }],
        ['3. Выплаты в соответствии с Таблицей выплат по телесным травмам в случае получения Застрахованным травмы в результате несчастного случая', { label: 'Выберите страховую сумму, тенге', options: O.injurySums }],
        ['4. Выплаты в соответствии с Таблицей выплат по телесным травмам в случае получения Доп.Застрахованным травмы в результате несчастного случая', { label: 'Выберите страховую сумму, тенге', options: O.injurySums }],
        ['5. Выплаты в случае госпитализации Застрахованного в результате несчастного случая', { label: 'Выберите страховую сумму, тенге', options: O.coverageSums }],
        ['6. Выплаты в случае временной нетрудоспособности Застрахованным в результате несчастного случая', { label: 'Выберите страховую сумму, тенге', options: O.coverageSums }],
        ['7. Страхование на случай критической болезни Застрахованного', { label: 'Выберите страховую сумму, тенге', options: O.coverageSums }],
    ];
    items.forEach(([label, sel]) => cov.appendChild(coverageItem(label, sel)));
    det._body.appendChild(cov);
    return det;
}
function coverageItem(label, sel) {
    const box = h('div', { class: 'coverage-box', colspan: '2' });
    const cb = field({ kind: 'checkbox', label });
    cb.classList.add('large-helper');
    box.appendChild(cb);
    let sum = null;
    if (sel) { sum = field({ kind: 'select', label: sel.label, options: sel.options, hidden: true, cls: 'coverage-sum' }); box.appendChild(sum); }
    cb.addEventListener('checked-changed', () => { box.classList.toggle('coverage-active', cb.checked); if (sum) reveal(sum, cb.checked, {}); });
    return box;
}

/* ============================================================
   Шаг 4 — Выгодоприобретатели
   ============================================================ */
let beneficiaries = [];
let benefSeq = 0;
function buildBeneficiary() {
    const det = sectionEl('beneficiarySection', 'ВЫГОДОПРИОБРЕТАТЕЛИ', {});
    const mode = field({ kind: 'radio', label: 'Кто является выгодоприобретателем?', id: 'beneficiaryMode', col2: true, options: ['Законный(е) наследник(и)', 'Назначить выгодоприобретателя(ей)'] });
    R.benefMode = mode;
    const typeWrap = h('div', { id: 'typeBlocksContainer', class: 'hidden' });
    const cardsWrap = h('div', { id: 'contentWrapper', class: 'hidden' });
    R.benefTypeWrap = typeWrap; R.benefCards = cardsWrap;
    onFchange(mode, v => {
        beneficiaries = [];
        typeWrap.classList.toggle('hidden', !v);
        cardsWrap.classList.toggle('hidden', !v);
        rebuildTypeBlocks(); renderBenefCards(); updateWizardBar();
    });
    det._body.appendChild(grid(mode));
    det._body.appendChild(typeWrap);
    det._body.appendChild(cardsWrap);
    return det;
}
function beneficiaryTypeOptions() {
    const period = R.protection.insurancePayments ? fval(R.protection.insurancePayments) : null;
    const mode = fval(R.benefMode);
    let base;
    if (period === 'Аннуитетные выплаты') base = [BT.ANNUITY_END, BT.ANNUITY_GUARANTEED, BT.ANNUITY_ACCUM_DEATH];
    else if (period === 'Единовременно') base = [BT.LUMP_END, BT.LUMP_ACCUM_DEATH];
    else return { types: [], noPeriod: true };
    if (mode === 'Законный(е) наследник(и)') base = base.slice(0, 1);
    return { types: base, noPeriod: false };
}
function benefTypeIcon(t) { return t.includes('гарантированный период') ? 'clock' : t.includes('в период накопления') ? 'heart' : 'wallet'; }
function themeClass(i) { return ['benef-theme-green', 'benef-theme-teal', 'benef-theme-blue'][((i % 3) + 3) % 3]; }
function rebuildTypeBlocks() {
    const wrap = R.benefTypeWrap; if (!wrap) return;
    wrap.innerHTML = '';
    if (fval(R.benefMode) == null || fval(R.benefMode) === '') return;
    const { types, noPeriod } = beneficiaryTypeOptions();
    if (noPeriod) { wrap.appendChild(h('div', { class: 'benef-hint' }, 'Сначала выберите «ПЕРИОД СТРАХОВЫХ ВЫПЛАТ» в разделе «Страховая защита».')); return; }
    const g = h('div', { class: 'benef-cards-grid' });
    g.style.setProperty('--benef-cols', types.length);
    g.style.setProperty('--benef-share-font', types.length <= 1 ? '1rem' : types.length === 2 ? '.92rem' : '.86rem');
    types.forEach((t, i) => g.appendChild(buildTypeBlock(t, i)));
    wrap.appendChild(g);
}
function buildTypeBlock(type, index) {
    const card = h('div', { class: 'benef-card ' + themeClass(index) });
    const ic = h('div', { class: 'benef-card-icon' }); ic.appendChild(icon(benefTypeIcon(type)));
    card.appendChild(ic);
    card.appendChild(h('div', { class: 'benef-card-header' }, type));
    const rows = h('div', { class: 'benef-card-rows' });
    const mine = beneficiaries.filter(b => b.type === type);
    let total = 0;
    mine.forEach((b, n) => { total += b.payPercent || 0; rows.appendChild(buildShareRow(b, n + 1, type)); });
    card.appendChild(rows);
    const footer = h('div', { class: 'benef-card-footer' });
    if (mine.length) {
        const totalRow = h('div', { class: 'benef-total-row' }); totalRow.appendChild(icon('checkCircle'));
        totalRow.appendChild(h('span', {}, total >= 100 ? '100% распределено' : 'осталось ' + (100 - total) + '%'));
        footer.appendChild(totalRow);
        const fill = h('div', { class: 'benef-progress-fill' }); fill.style.width = Math.max(0, Math.min(100, total)) + '%';
        footer.appendChild(h('div', { class: 'benef-progress' }, fill));
        footer.appendChild(h('div', { class: 'benef-scale' }, h('span', {}, '0%'), h('span', {}, '100%')));
    }
    footer.appendChild(vbtn('Добавить выгодоприобретателя', { cls: 'benef-add', iconName: 'plus', onClick: () => addBeneficiary(type) }));
    card.appendChild(footer);
    return card;
}
function buildShareRow(b, number, type) {
    const row = h('div', { class: 'benef-share-row' });
    row.appendChild(h('span', { class: 'benef-share-name' }, 'Выгодоприобретатель №' + number));
    const f = field({ kind: 'integer', cls: 'benef-share-field', suffix: '%', value: b.payPercent != null ? b.payPercent : '' });
    f.placeholder = '0';
    f.addEventListener('change', () => onShareChange(b, f, type));
    f.addEventListener('value-changed', () => {});
    row.appendChild(f);
    row.appendChild(vbtn('', { theme: 'tertiary-inline', cls: 'benef-del', iconName: 'close', onClick: () => removeBeneficiary(b) }));
    return row;
}
function onShareChange(b, f, type) {
    let v = parseInt(f.value, 10); if (isNaN(v)) v = 0; v = Math.max(0, v);
    const others = beneficiaries.filter(x => x.type === type && x !== b).reduce((s, x) => s + (x.payPercent || 0), 0);
    if (others + v > 100) { v = Math.max(0, 100 - others); toast('Сумма долей по этому типу выплаты не может превышать 100%'); }
    b.payPercent = v;
    rebuildTypeBlocks(); syncCardShares();
}
function addBeneficiary(type) { beneficiaries.push({ id: ++benefSeq, type, payPercent: null }); rebuildTypeBlocks(); renderBenefCards(); updateWizardBar(); }
function removeBeneficiary(b) { beneficiaries = beneficiaries.filter(x => x !== b); rebuildTypeBlocks(); renderBenefCards(); updateWizardBar(); }
function onPaymentPeriodChanged() { const { types } = beneficiaryTypeOptions(); beneficiaries = beneficiaries.filter(b => types.includes(b.type)); rebuildTypeBlocks(); renderBenefCards(); updateWizardBar(); }
function syncCardShares() { beneficiaries.forEach(b => { if (b._share) b._share.value = b.payPercent != null ? String(b.payPercent) : ''; }); }

function renderBenefCards() {
    const wrap = R.benefCards; if (!wrap) return;
    wrap.innerHTML = '';
    const types = beneficiaryTypeOptions().types;
    const counters = {};
    beneficiaries.forEach(b => { counters[b.type] = (counters[b.type] || 0) + 1; wrap.appendChild(buildBenefCard(b, counters[b.type], types.indexOf(b.type))); });
    refreshPersonChoices();
}
function buildBenefCard(b, number, themeIndex) {
    const det = sectionEl(null, 'Выгодоприобретатель №' + number + (b.type ? ' — ' + b.type.charAt(0).toLowerCase() + b.type.slice(1) : ''), { cardX: () => removeBeneficiary(b) });
    det.classList.add('benef-data-card', themeClass(Math.max(0, themeIndex)));
    b._cardEl = det;

    const personChoice = field({ kind: 'select', label: 'Выбрать выгодоприобретателя', colspan: 24, placeholder: 'Выберите из заполненных ранее', iconName: 'users' });
    b._person = personChoice;
    const share = field({ kind: 'integer', label: 'Доля в выплате', colspan: 4, readonly: true, iconName: 'pie', suffix: '%', value: b.payPercent != null ? b.payPercent : '' });
    b._share = share;
    const fio = field({ kind: 'text', label: 'ФИО', colspan: 20, prop: 'fio', required: true, placeholder: 'Введите ФИО', iconName: 'user' });
    b._fio = fio;
    const birthday = field({ kind: 'date', label: 'Дата рождения', colspan: 4, required: true, placeholder: 'дд.мм.гггг', iconName: 'calendar' });
    const gender = field({ kind: 'radio', label: 'Пол', colspan: 6, required: true, options: O.gender });
    const idDoc = field({ kind: 'select', label: 'Документ, удостоверяющий личность', colspan: 14, required: true, options: O.idDocument, placeholder: 'Выберите документ', iconName: 'doc' });
    const iin = field({ kind: 'text', label: 'ИИН', colspan: 12, placeholder: 'Введите ИИН', iconName: 'card' });
    const docNo = field({ kind: 'text', label: 'Номер документа', colspan: 12, required: true, placeholder: 'Введите номер документа', iconName: 'hash' });
    const series = field({ kind: 'text', label: 'Серия', colspan: 12, hidden: true, placeholder: 'Введите серию', iconName: 'barcode' });
    const authority = field({ kind: 'select', label: 'Выдан', colspan: 9, required: true, options: O.authority, placeholder: 'Выберите орган выдачи', iconName: 'institution' });
    const issueDate = field({ kind: 'date', label: 'Дата выдачи', colspan: 4, required: true, placeholder: 'дд.мм.гггг', iconName: 'calendarO' });
    const authorityOther = field({ kind: 'text', label: 'Укажите, кем выдан', colspan: 24, hidden: true, placeholder: 'Укажите орган выдачи', iconName: 'pencil' });
    const citizenship = field({ kind: 'text', label: 'Гражданство', colspan: 6, hidden: true, placeholder: 'Введите гражданство', iconName: 'globe' });
    const birthplace = field({ kind: 'textarea', label: 'Юридический адрес', colspan: 12, placeholder: 'Введите адрес', iconName: 'home', helper: '(Почтовый индекс, название области, города, села, улицы, микрорайона, номер дома, квартиры)' });
    const address = field({ kind: 'textarea', label: 'Фактический адрес', colspan: 12, required: true, placeholder: 'Введите адрес', iconName: 'marker', helper: '(Почтовый индекс, название области, города, села, улицы, микрорайона, номер дома, квартиры)' });
    const phone = field({ kind: 'text', label: 'Мобильный телефон', colspan: 12, required: true, placeholder: '+7 (___) ___-__-__', iconName: 'phone' });
    const email = field({ kind: 'email', label: 'E-mail', colspan: 12, placeholder: 'Введите e-mail', iconName: 'envelope' });

    const kz = document.createElement('vaadin-checkbox');
    kz.classList.add('benef-kz'); kz.setAttribute('colspan', '11'); kz.dataset.field = '1';
    const kzIcon = h('span', { class: 'kz-icon' }); kzIcon.appendChild(icon('user')); kzIcon.appendChild(icon('ban'));
    const kzLabel = h('span', { class: 'kz-label', slot: 'label' }, kzIcon, h('span', {}, 'Не резидент РК'));
    kz.appendChild(kzLabel);

    onFchange(authority, v => reveal(authorityOther, v === 'Иное', { require: true }));
    kz.addEventListener('checked-changed', () => { reveal(citizenship, kz.checked, {}); kz.setAttribute('colspan', kz.checked ? '5' : '11'); });
    onFchange(idDoc, v => {
        let iinOn, seriesOn;
        switch (v) { case 'Загранпаспорт': iinOn = false; seriesOn = true; break; case 'Национальный паспорт': iinOn = true; seriesOn = true; break; default: iinOn = true; seriesOn = false; }
        reveal(iin, iinOn, {}); reveal(series, seriesOn, { require: true });
    });
    personChoice.addEventListener('value-changed', () => applyPersonChoice(b, personChoice.value));
    b._fio.addEventListener('value-changed', () => refreshPersonChoices());

    const fl = formLayout(24, 'benef-form');
    [personChoice, share, fio, birthday, gender, idDoc, iin, docNo, series, authority, issueDate, kz, citizenship, authorityOther, birthplace, address, phone, email].forEach(c => fl.appendChild(c));
    det._body.appendChild(fl);
    return det;
}
function collectPeople() {
    const people = [];
    const ins = insurerFio(); if (ins) people.push({ label: `Страхователь (${ins})`, src: '#insurerSection' });
    const insd = R.insured.fio ? (fval(R.insured.fio) || '').trim() : ''; if (insd) people.push({ label: `Застрахованный (${insd})`, src: '#insuredSection' });
    if (additionalInsured) { const w = $('[data-prop="fio"]', additionalInsured); const f = w ? (fval(w) || '').trim() : ''; if (f) people.push({ label: `Доп. застрахованный (${f})`, srcEl: additionalInsured }); }
    return people;
}
function refreshPersonChoices() {
    if (!R.benefCards) return;
    const people = collectPeople();
    beneficiaries.forEach(b => {
        if (!b._person) return;
        const cur = b._person.value;
        const items = [];
        people.forEach((p, i) => items.push({ label: p.label, value: 'P' + i }));
        beneficiaries.forEach(o => { if (o === b) return; const f = o._fio ? (fval(o._fio) || '').trim() : ''; if (f) items.push({ label: `Выгодоприобретатель (${f})`, value: 'B' + o.id }); });
        items.push({ label: 'Выбрать другого', value: 'OTHER' });
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
    else if (val[0] === 'B') { const o = beneficiaries.find(x => 'B' + x.id === val); if (o) root = o._cardEl; }
    if (root && b._fio) { const s = $('[data-prop="fio"]', root); if (s) copyVal(s, b._fio); }
    refreshPersonChoices();
}

/* ============================================================
   Шаг 5 — Опросник
   ============================================================ */
function buildQuestionnaire() {
    const det = sectionEl('questionnaireSection', 'БЛАНК-ОПРОСНИК ЗАСТРАХОВАННОГО', {});
    const refs = R.quest;
    det._body.appendChild(h('h5', { class: 'mt-l mb-l', colspan: '2' }, 'Ваши ответы на предлагаемые ниже вопросы являются основным критерием для оценки страхового риска, поэтому просим вас предоставить на них достоверные и исчерпывающие ответы, а также всю дополнительную информацию, которая могла бы повлиять на принятие решения Страховщиком'));

    const height = field({ kind: 'number', label: 'Рост', required: true, helper: 'в сантиметрах' });
    const weight = field({ kind: 'number', label: 'Вес', required: true, helper: 'в килограммах' });
    const bpU1 = field({ kind: 'select', options: BP_UP, placeholder: 'Верхнее (SYS)' });
    const bpL1 = field({ kind: 'select', options: BP_LOW, placeholder: 'Нижнее (DIA)' });
    const bpU2 = field({ kind: 'select', options: BP_UP, placeholder: 'Верхнее (SYS)' });
    const bpL2 = field({ kind: 'select', options: BP_LOW, placeholder: 'Нижнее (DIA)' });
    const bpBlock = h('div', { colspan: '2' },
        h('span', { class: 'bp-label mt-m', style: 'display:block' }, 'Укажите верхнее и нижнее рабочее артериальное давление'),
        grid(bpU1, bpL1),
        h('span', { class: 'bp-label mt-m', style: 'display:block' }, 'Укажите верхнее и нижнее максимально повышенное артериальное давление'),
        grid(bpU2, bpL2));

    const pregnant = field({ kind: 'radio', label: 'Беременны ли вы?', id: 'pregnant', required: true, hidden: true, options: O.yesno });
    const gestational = field({ kind: 'integer', label: 'Срок беременности', id: 'gestationalAge', hidden: true });
    const disabled = field({ kind: 'radio', label: 'Являетесь ли вы инвалидом?', id: 'disabled', required: true, options: O.yesno });
    const disabilityGroup = field({ kind: 'select', label: 'Группа инвалидности', id: 'disabilityGroup', hidden: true, options: O.disabilityGroup });
    refs.pregnant = pregnant; refs.gestational = gestational;
    onFchange(pregnant, v => reveal(gestational, v === 'Да', { require: true }));
    onFchange(disabled, v => reveal(disabilityGroup, v === 'Да', { require: true }));

    const diseasesHeader = h('span', { class: 'q-label mt-m', colspan: '2', style: 'display:block' }, 'Укажите имеющиеся у вас заболевания');
    const otherDiseases = field({ kind: 'textarea', label: 'Укажите другое', id: 'otherDiseases', col2: true, hidden: true });
    const upcomingSurgery = field({ kind: 'radio', label: 'Предстоит ли вам хирургическая операция?', id: 'upcomingSurgery', col2: true, required: true, options: O.yesno });
    const surgeryDesc = field({ kind: 'textarea', label: 'Укажите хирургическую операцию', id: 'surgeryDescription', col2: true, hidden: true });
    onFchange(upcomingSurgery, v => reveal(surgeryDesc, v === 'Да', { require: true }));
    const dangerousSports = field({ kind: 'radio', label: 'Занимаетесь/собираетесь заниматься опасными видами спорта?', id: 'dangerousSports', col2: true, required: true, options: O.yesno });
    const sportsDesc = field({ kind: 'textarea', label: 'Укажите виды', id: 'sportsDescription', col2: true, hidden: true });
    const sportBox = h('div', { class: 'bordered-box', colspan: '2' });
    onFchange(dangerousSports, v => { const on = v === 'Да'; reveal(sportsDesc, on, { require: true }); sportBox.classList.toggle('on', on); sportBox.innerHTML = ''; if (on) sportBox.appendChild(buildSportFragment()); });
    const hazardous = field({ kind: 'radio', label: 'Связана ли ваша профессия с трудовой деятельностью, которую можно назвать опасной?', id: 'hazardousOccupation', col2: true, required: true, options: O.yesno });
    const occBox = h('div', { class: 'bordered-box', colspan: '2' });
    onFchange(hazardous, v => { const on = v === 'Да'; occBox.classList.toggle('on', on); occBox.innerHTML = ''; if (on) occBox.appendChild(buildOccupationFragment()); });

    det._body.appendChild(grid(height, weight, bpBlock, pregnant, gestational, disabled, disabilityGroup));
    det._body.appendChild(diseasesHeader);
    const dGrid = h('div', { class: 'disease-grid' });
    const dAnketas = h('div', { class: 'disease-anketas' });
    buildDiseaseChecklist(dGrid, dAnketas, otherDiseases);
    det._body.appendChild(dGrid);
    det._body.appendChild(dAnketas);
    det._body.appendChild(grid(otherDiseases, upcomingSurgery, surgeryDesc, dangerousSports, sportsDesc, sportBox, hazardous, occBox));
    det._body.appendChild(buildAgentBlock());
    return det;
}
function bindPregnantToGender() { const g = R.insured.gender; if (g) onFchange(g, v => reveal(R.quest.pregnant, v === 'Женский', { require: true })); }
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
    backBtn = vbtn('Назад', { theme: 'tertiary', iconName: 'arrowLeft', onClick: () => goToStep(currentStep - 1) });
    nextBtn = vbtn('Далее', { theme: 'primary', iconName: 'arrowRight', iconAfter: true, onClick: () => goToStep(currentStep + 1) });
    signBtn = vbtn('Подтвердить', { theme: 'primary', iconName: 'checkCircle', onClick: () => toast('Демо-режим: данные никуда не отправляются') });
    stepIndicator = h('span', { class: 'wizard-progress-text' });
    return h('div', { class: 'wizard-nav' }, backBtn, stepIndicator, h('div', { class: 'wizard-nav-right' }, nextBtn, signBtn));
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
    if (step === 3) { const m = fval(R.benefMode); if (!m) return false; if (beneficiaries.length === 0) return false; }
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
}
init();
