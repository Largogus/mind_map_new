const svg = document.getElementById("lines");

const infoMap = {
  1: {
    title: "Заряд Q",
    text: `
Электрический заряд — физическая величина, показывающая способность тела взаимодействовать с электрическим полем.<br>
<br>
Физический смысл:
Определяет количество «электричества» в системе.<br>
<br>
Единица измерения: кулон (Кл)<br>
<br>
Связь с конденсатором:
Q = C · U<br>
<br>
Где применяется:<br>
• расчёты электрических цепей<br>
• накопление энергии в конденсаторах<br>
`
  },

  2: {
    title: "Ёмкость C",
    text: `
Ёмкость — способность конденсатора накапливать электрический заряд.<br>
<br>
Физический смысл:<br>
Чем больше ёмкость, тем больше заряд при одинаковом напряжении.<br>
<br>
Формула:<br>
C = Q / U<br>
<br>
Зависит от:<br>
• площади пластин<br>
• расстояния между ними<br>
• диэлектрика<br>
<br>
Применение:<br>
• фильтры в электронике<br>
• накопители энергии<br>
`
  },

  3: {
    title: "Энергия W",
    text: `
Энергия электрического поля — это энергия, запасённая в конденсаторе.<br>
<br>
Формулы:<br>
W = (C · U²) / 2<br>
W = (Q²) / (2C)<br>
<br>
Физический смысл:<br>
Это энергия, которую можно “отдать” в цепь при разрядке.<br>
<br>
Применение:<br>
• вспышки фотоаппаратов<br>
• импульсные устройства<br>
`
  },

  6: {
    title: "Обкладки (пластины)",
    text: `
Обкладки — это проводящие поверхности конденсатора.<br>
<br>
Функция:<br>
• создают электрическое поле<br>
• накапливают заряд<br>
<br>
Материалы:<br>
• алюминий<br>
• медь<br>
<br>
Важно:<br>
Чем больше площадь — тем выше ёмкость<br>
`
  },

  5: {
    title: "Диэлектрик",
    text: `
Диэлектрик — изолятор между обкладками.<br>
<br>
Роль:<br>
• предотвращает пробой<br>
• увеличивает ёмкость<br>
<br>
Примеры:<br>
• воздух<br>
• керамика<br>
• пластик<br>
<br>
Физика:<br>
Диэлектрик уменьшает эффективное поле внутри конденсатора<br>
`
  },

  4: {
    title: "Напряжение U",
    text: `
Напряжение — разность потенциалов между обкладками.<br>
<br>
Формула:<br>
U = A / q<br>
<br>
Связь:<br>
Q = C · U<br>
<br>
Смысл:<br>
Чем больше напряжение — тем сильнее поле между пластинами<br>
`
  },

  7: {
    title: "Электрическое поле E",
    text: `
Электрическое поле внутри конденсатора создаётся зарядами на обкладках.<br>
<br>
Формула:<br>
E = U / d<br>
<br>
d — расстояние между пластинами<br>
<br>
Смысл:<br>
Определяет силу, действующую на заряд внутри конденсатора<br>
`
  },

  8: {
    title: "Система соединения",
    text: `
Система соединения определяет поведение группы конденсаторов.<br>
<br>
Типы:<br>
• параллельное (C увеличивается)<br>
• последовательное (C уменьшается)<br>
<br>
Зачем нужно:<br>
• управление ёмкостью в цепях<br>
• настройка фильтров и энергии<br>
`
  }
};

let mode = "parallel";

function createLine({ x1, y1, x2, y2 }) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);

  line.setAttribute("stroke", "cyan");
  line.setAttribute("stroke-width", "2");

  line.classList.add("wire-flow");

  svg.appendChild(line);
}

function getCenter(el) {
  const r = el.getBoundingClientRect();
  return {
    x: r.left + r.width / 2,
    y: r.top + r.height / 2
  };
}

function drawParallel() {
  svg.innerHTML = "";

  const blocks = document.querySelectorAll('[data-type="parallel"]');
  if (!blocks.length) return;

  const first = blocks[0].getBoundingClientRect();
  const last = blocks[blocks.length - 1].getBoundingClientRect();

  const minOffset = 80;

  const groupLeft = first.left;
  const groupRight = last.right;

  const center = (groupLeft + groupRight) / 2;

  const spread = Math.max(200, (groupRight - groupLeft) / 2 + 120);

  const leftX = Math.max(minOffset, center - spread);
  const rightX = Math.min(window.innerWidth - minOffset, center + spread);

  const top = first.top - 110;
  const bottom = last.bottom + 20;

  createLine({ x1: leftX, y1: top, x2: leftX, y2: bottom });
  createLine({ x1: rightX, y1: top, x2: rightX, y2: bottom });

  blocks.forEach(block => {
    const r = block.getBoundingClientRect();
    const y = r.top + r.height / 2;

    const pad = 20;

    createLine({ x1: leftX, y1: y, x2: r.left - pad, y2: y });
    createLine({ x1: rightX, y1: y, x2: r.right + pad, y2: y });
  });
}

function drawSeries() {
  svg.innerHTML = "";

  const blocks = document.querySelectorAll('[data-type="series"]');
  if (!blocks.length) return;

  const first = blocks[0].getBoundingClientRect();
  const last = blocks[blocks.length - 1].getBoundingClientRect();

  const x = first.left + first.width / 2;

  const top = first.top - 140;
  const bottom = last.bottom + 120;

  createLine({
    x1: x - 40,
    y1: top,
    x2: x + 40,
    y2: top
  });

  createLine({
    x1: x,
    y1: top,
    x2: x,
    y2: bottom
  });

  createLine({
    x1: x - 40,
    y1: bottom,
    x2: x + 40,
    y2: bottom
  });

  blocks.forEach(block => {
    const r = block.getBoundingClientRect();
    const y = r.top + r.height / 2;

    createLine({
      x1: x,
      y1: y,
      x2: x,
      y2: y
    });
  });
}

function safeDraw(drawFn) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      drawFn();
    });
  });
}

function setMode(newMode) {
  mode = newMode;

  const parallelBlocks = document.querySelectorAll('[data-type="parallel"]');
  const seriesBlocks = document.querySelectorAll('[data-type="series"]');
  const allBlocks = document.querySelectorAll(".block");

  allBlocks.forEach(b => b.classList.remove("active"));

  if (mode === "parallel") {
    parallelBlocks.forEach(b => {
      b.classList.remove("hidden");
      b.classList.add("active");
    });

    seriesBlocks.forEach(b => b.classList.add("hidden"));
  }

  if (mode === "series") {
    seriesBlocks.forEach(b => {
      b.classList.remove("hidden");
      b.classList.add("active");
    });

    parallelBlocks.forEach(b => b.classList.add("hidden"));
  }

  safeDraw(() => {
    if (mode === "parallel") drawParallel();
    if (mode === "series") drawSeries();
  });
}

function toggleMode() {
  const btn = document.getElementById("modeBtn");

  if (mode === "parallel") {
    setMode("series");
    btn.textContent = "Последовательное";
    btn.style.backgroundPosition = "100% 0%";
  } else {
    setMode("parallel");
    btn.textContent = "Параллельное";
    btn.style.backgroundPosition = "0% 0%";
  }
}

window.toggleMode = toggleMode;

window.onload = () => {
  setTimeout(() => setMode("parallel"), 50);
};

function showInfo(id) {
  const panel = document.getElementById("panel");
  const data = infoMap[id];

  if (!data) return;

  panel.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.text}</p>
  `;

  panel.classList.remove("hidden");
}

function showMainInfo() {
  const panel = document.getElementById("panel");

  panel.innerHTML = `
    <h2>Конденсаторы</h2>
    <p>
      Конденсатор — это устройство для накопления электрического заряда
      и энергии электрического поля.
    </p>

    <p>
      Он состоит из двух проводящих обкладок,
      разделённых диэлектриком.
    </p>

    <p>
      Используется в электронике для:
      фильтрации, накопления энергии и сглаживания сигналов.
    </p>
  `;

  panel.classList.remove("hidden");
}

document.addEventListener("click", (e) => {
  const panel = document.getElementById("panel");
  const isBlock = e.target.closest(".block");
  const isPanel = e.target.closest(".panel");

  if (!isBlock && !isPanel) {
    panel.classList.add("hidden");
  }
});

window.addEventListener("resize", () => setMode(mode));