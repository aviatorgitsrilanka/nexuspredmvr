const app = document.querySelector("#app");
const bootScreen = document.querySelector("#bootScreen");
const bootStatus = document.querySelector("#bootStatus");
const transitionLoader = document.querySelector("#transitionLoader");
const transitionMessage = transitionLoader.querySelector("p");
const stars = document.querySelector("#stars");

const screens = {
  auth: document.querySelector("#authScreen"),
  programs: document.querySelector("#programsScreen"),
  dashboard: document.querySelector("#dashboardScreen"),
  id: document.querySelector("#idScreen"),
  result: document.querySelector("#resultScreen"),
};

const authForm = document.querySelector("#authForm");
const codeInput = document.querySelector("#codeInput");
const codeField = document.querySelector("#codeField");
const codeError = document.querySelector("#codeError");
const selectedProgramName = document.querySelector("#selectedProgramName");
const signalButton = document.querySelector("#signalButton");

const idForm = document.querySelector("#idForm");
const idInput = document.querySelector("#idInput");
const idField = document.querySelector("#idField");
const idError = document.querySelector("#idError");
const idStatusPanel = document.querySelector("#idStatusPanel");
const savedIdValue = document.querySelector("#savedIdValue");

const copyPromoButton = document.querySelector("#copyPromoButton");
const toast = document.querySelector("#toast");
const toastTitle = document.querySelector("#toastTitle");
const toastMessage = document.querySelector("#toastMessage");
const closeToast = document.querySelector("#closeToast");
const liveChat = document.querySelector("#liveChat");
const chatLauncher = document.querySelector("#chatLauncher");
const chatClose = document.querySelector("#chatClose");
let isChatOpen = false;

function setChatOpen(open, restoreFocus = false) {
  isChatOpen = open;
  liveChat.classList.toggle("is-hidden", !open);
  chatLauncher.classList.toggle("is-hidden", open);
  chatLauncher.setAttribute("aria-expanded", String(open));
  app.classList.toggle("has-open-chat", open);
  updateLiveChatTimer(open);
  if (open) liveChatInput.focus({ preventScroll: true });
  else if (restoreFocus) chatLauncher.focus({ preventScroll: true });
}

const liveChatMessages = document.querySelector("#liveChatMessages");
const liveChatForm = document.querySelector("#liveChatForm");
const liveChatInput = document.querySelector("#liveChatInput");

const VALID_CODE = "7799";
const PROMO_CODE = "OUG22";
const STORAGE_KEY = "nexuspredsyr-interface-state";
const ACCESS_KEY = "nexuspredsyr-access-granted";
const VALID_SCREENS = new Set(["programs", "dashboard", "id", "result"]);
const simulatedChatMessages = [
  {
    sender: "user",
    author: "محمد — ID 1847623545",
    avatar: "م",
    text: "حصلت للتو على 8 إشارات ووضعت رهانات بقيمة 1 USD لكل منها. نتيجتي الآن ربح 344 USD!",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "محمد — ID 1847623545، نتيجة جيدة! استخدم الإشارات بحكمة، ولا تتسرع، وتذكّر أن النتيجة التالية قد تختلف.",
  },
  {
    sender: "user",
    author: "عيسى — ID 1845837364",
    avatar: "ع",
    text: "لم أفهم لماذا يجب أن أبدأ برهان 100 SYP. أليس المبلغ قليلًا جدًا؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "عيسى — ID 1845837364، هذا المبلغ يكفي لبداية حذرة وتجربة الاستراتيجية المختارة. زيادة الرهان لا تضمن نتيجة أعلى.",
  },
  {
    sender: "user",
    author: "أحمد — ID 1849062713",
    avatar: "أ",
    text: "كم إشارة يُفضّل استخدامها على التوالي؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "أحمد — ID 1849062713، تكفي إشارتان أو ثلاث للبدء. بعدها خذ استراحة قصيرة وقيّم النتيجة.",
  },
  {
    sender: "user",
    author: "عمر — ID 1843159076",
    avatar: "ع",
    text: "هل يمكنني البدء برهان 1 USD؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "عمر — ID 1843159076، نعم، إذا كان هذا المبلغ ضمن ميزانيتك المحددة مسبقًا. لا ترفعه بشكل مفاجئ.",
  },
  {
    sender: "user",
    author: "خالد — ID 1847281640",
    avatar: "خ",
    text: "أي عملة يُفضّل استخدامها: USD أم SYP؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "خالد — ID 1847281640، استخدم العملة المحددة في حسابك. تحقّق من المبلغ والعملة قبل كل رهان.",
  },
  {
    sender: "user",
    author: "يوسف — ID 1844509327",
    avatar: "ي",
    text: "هل يمكنني البدء بمبلغ 500 SYP فقط؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "يوسف — ID 1844509327، نعم، المبلغ الصغير مناسب للتعرّف إلى الواجهة وتجربتها بحذر.",
  },
  {
    sender: "user",
    author: "علي — ID 1848712659",
    avatar: "ع",
    text: "لماذا يُنصح بأخذ استراحة بين الإشارات؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "علي — ID 1848712659، تساعد الاستراحة على تقييم النتيجة بهدوء وتجنّب القرارات المتسرعة.",
  },
  {
    sender: "user",
    author: "حمزة — ID 1842094831",
    avatar: "ح",
    text: "استخدمت ثلاث إشارات وحققت نتيجة جيدة. هل أتابع؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "حمزة — ID 1842094831، إذا وصلت إلى هدفك المحدد فمن الأفضل التوقف والحفاظ على النتيجة.",
  },
  {
    sender: "user",
    author: "مصطفى — ID 1846371208",
    avatar: "م",
    text: "هل يمكن استخدام إشارات برامج مختلفة في الوقت نفسه؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "مصطفى — ID 1846371208، الأفضل اختيار برنامج واحد واستخدامه بالتسلسل لتجنّب الالتباس.",
  },
  {
    sender: "user",
    author: "عمار — ID 1841598042",
    avatar: "ع",
    text: "هل يمكنني زيادة الرهان بعد إشارة ناجحة؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "عمار — ID 1841598042، فقط إذا كانت الزيادة ضمن ميزانيتك المحددة مسبقًا. لا ترفع الرهان بدافع الانفعال.",
  },
  {
    sender: "user",
    author: "سامر — ID 1847803461",
    avatar: "س",
    text: "كيف أعرف أن إشارة جديدة أصبحت متاحة؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "سامر — ID 1847803461، انتظر ظهور إشعار جديد في الواجهة ولا تستخدم الإشارة نفسها مرتين.",
  },
  {
    sender: "user",
    author: "كريم — ID 1843927158",
    avatar: "ك",
    text: "هل يمكن استخدام الإشارات مساءً وليلًا؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "كريم — ID 1843927158، الواجهة متاحة في أوقات مختلفة، لكن وقت الاستخدام وحده لا يضمن نتيجة محددة.",
  },
  {
    sender: "user",
    author: "زيد — ID 1848640932",
    avatar: "ز",
    text: "حددت ميزانية يومية قدرها 10 USD. هل هذا مناسب للبدء؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "زيد — ID 1848640932، يساعد الحد المحدد مسبقًا على ضبط الإنفاق. المهم ألا تتجاوزه مهما كانت النتيجة.",
  },
  {
    sender: "user",
    author: "طارق — ID 1842468705",
    avatar: "ط",
    text: "وضعت خمسة رهانات بقيمة 200 SYP وربحت 1800 SYP!",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "طارق — ID 1842468705، نتيجة جيدة! لا تتسرع في زيادة المبلغ وفكّر في إنهاء الجلسة الحالية.",
  },
  {
    sender: "user",
    author: "بلال — ID 1845137690",
    avatar: "ب",
    text: "كم إشارة أستخدم في اليوم الأول؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "بلال — ID 1845137690، ابدأ بإشارتين أو ثلاث وبأقل مبلغ مناسب لك. هذا يكفي لفهم العملية.",
  },
  {
    sender: "user",
    author: "رامي — ID 1849753206",
    avatar: "ر",
    text: "هل يمكن الانتقال من الرهان بـ SYP إلى USD؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "رامي — ID 1849753206، تحقّق أولًا من إعدادات عملة حسابك. لا يمكن اعتبار مبالغ USD وSYP متساوية.",
  },
  {
    sender: "user",
    author: "فراس — ID 1843086521",
    avatar: "ف",
    text: "لماذا يُفضّل تحديد مبلغ ثابت للرهان مسبقًا؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "فراس — ID 1843086521، المبلغ الثابت يسهّل ضبط الميزانية ويساعد على تجنّب القرارات العاطفية.",
  },
  {
    sender: "user",
    author: "نبيل — ID 1846914372",
    avatar: "ن",
    text: "هل يجب استخدام كل إشارة تصلني؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "نبيل — ID 1846914372، لا. يمكنك تجاوز أي إشارة إذا أردت التوقف أو وصلت إلى حدك المحدد.",
  },
  {
    sender: "user",
    author: "حسن — ID 1841279864",
    avatar: "ح",
    text: "أين أجد المعرّف المطلوب إدخاله في النظام؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "حسن — ID 1841279864، يوجد المعرّف عادةً في الملف الشخصي للحساب. راجع الأرقام قبل إرسال النموذج.",
  },
  {
    sender: "user",
    author: "وليد — ID 1845423019",
    avatar: "و",
    text: "هل يمكنني التوقف لبضع ساعات ثم المتابعة لاحقًا؟",
  },
  {
    sender: "system",
    author: "NEXUS",
    avatar: "N",
    text: "وليد — ID 1845423019، بالطبع. التوقف لا يؤثر في الواجهة ويساعدك على الحفاظ على نهج هادئ.",
  },
];
let toastTimer;
let chatTimer;
let autoReplyTimer;
let nextChatMessage = 0;

function getDefaultState() {
  return {
    program: "",
    userId: "",
    lastScreen: "programs",
  };
}

function loadState() {
  try {
    const storedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...getDefaultState(), ...(storedState || {}) };
  } catch {
    return getDefaultState();
  }
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The interface remains functional when browser storage is unavailable.
  }
}

function hasSessionAccess() {
  try {
    return sessionStorage.getItem(ACCESS_KEY) === "true";
  } catch {
    return false;
  }
}

function setSessionAccess(value) {
  try {
    if (value) {
      sessionStorage.setItem(ACCESS_KEY, "true");
    } else {
      sessionStorage.removeItem(ACCESS_KEY);
    }
  } catch {
    // A private browser session can still continue without persistence.
  }
}

function makeStars() {
  const fragment = document.createDocumentFragment();
  const starCount = window.innerWidth < 500 ? 22 : 34;

  for (let index = 0; index < starCount; index += 1) {
    const star = document.createElement("i");
    star.className = "star";
    star.style.setProperty("--x", `${Math.random() * 100}%`);
    star.style.setProperty("--y", `${Math.random() * 100}%`);
    star.style.setProperty("--size", `${Math.random() * 1.8 + 0.7}px`);
    star.style.setProperty("--duration", `${Math.random() * 3 + 2.4}s`);
    star.style.setProperty("--delay", `${Math.random() * -5}s`);
    fragment.appendChild(star);
  }

  stars.replaceChildren(fragment);
}

function updateIdStatus(target) {
  const shouldShow = Boolean(state.userId) && ["dashboard", "id", "result"].includes(target);
  idStatusPanel.classList.toggle("is-hidden", !shouldShow);
  app.classList.toggle("has-id-status", shouldShow);

  if (shouldShow) {
    savedIdValue.textContent = state.userId;
  }
}

function showScreen(target, options = {}) {
  Object.entries(screens).forEach(([name, element]) => {
    element.classList.toggle("is-hidden", name !== target);
  });

  updateIdStatus(target);
  const shouldShowLiveUi = target !== "auth";
  if (!shouldShowLiveUi) isChatOpen = false;
  liveChat.classList.toggle("is-hidden", !shouldShowLiveUi || !isChatOpen);
  chatLauncher.classList.toggle("is-hidden", !shouldShowLiveUi || isChatOpen);
  chatLauncher.setAttribute("aria-expanded", String(isChatOpen));
  app.classList.toggle("has-open-chat", shouldShowLiveUi && isChatOpen);
  app.classList.toggle("has-live-ui", shouldShowLiveUi);
  updateLiveChatTimer(shouldShowLiveUi && isChatOpen);

  window.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });

  if (target !== "auth") {
    state.lastScreen = target;
    saveState();
  }

  if (target === "auth") {
    requestAnimationFrame(() => codeInput.focus({ preventScroll: true }));
  }

  if (target === "dashboard") {
    selectedProgramName.textContent = state.program || "لم يتم الاختيار";
  }

  if (target === "id" && state.userId) {
    idInput.value = state.userId;
  }
}

function clearFieldError(field, input, error) {
  field.classList.remove("has-error");
  input.removeAttribute("aria-invalid");
  error.textContent = "";
}

function showFieldError(field, input, error, message) {
  field.classList.remove("has-error");
  void field.offsetWidth;
  field.classList.add("has-error");
  input.setAttribute("aria-invalid", "true");
  error.textContent = message;
  input.focus();
}

function withLoader(message, callback, duration = 760) {
  transitionMessage.textContent = message;
  transitionLoader.classList.remove("is-hidden");

  window.setTimeout(() => {
    callback();
    transitionLoader.classList.add("is-hidden");
  }, duration);
}

function showToast(message, title = "NEXUS") {
  window.clearTimeout(toastTimer);
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toast.classList.add("is-visible");
  toast.setAttribute("aria-hidden", "false");
  toastTimer = window.setTimeout(hideToast, 3600);
}

function hideToast() {
  toast.classList.remove("is-visible");
  toast.setAttribute("aria-hidden", "true");
}

function appendLiveMessage(message) {
  const item = document.createElement("article");
  item.className = `live-message live-message--${message.sender}`;

  const avatar = document.createElement("span");
  avatar.className = "message-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = message.avatar;

  const copy = document.createElement("p");
  const author = document.createElement("strong");
  const text = document.createElement("span");
  author.textContent = message.author;
  text.textContent = message.text;
  copy.append(author, text);

  item.append(avatar, copy);
  liveChatMessages.appendChild(item);

  while (liveChatMessages.children.length > 6) {
    liveChatMessages.firstElementChild.remove();
  }

  requestAnimationFrame(() => {
    liveChatMessages.scrollTo({ top: liveChatMessages.scrollHeight, behavior: "smooth" });
  });
}

function initializeLiveChat() {
  liveChatMessages.replaceChildren();
  appendLiveMessage(simulatedChatMessages[0]);
  appendLiveMessage(simulatedChatMessages[1]);
  nextChatMessage = 2;
}

function getAutoReply(message) {
  const normalized = message.toLowerCase();

  if (/تفعيل|برنامج|إشارة|اشارة/.test(normalized)) {
    return {
      sender: "system",
      author: "NEXUS تلقائي",
      avatar: "N",
      text: `اختر البرنامج، واضغط «تفعيل»، ثم أدخل معرّفًا من 10 أرقام. تعرض الخطوة التالية مثالًا تدريبيًا للرمز ${PROMO_CODE}.`,
    };
  }

  if (/حساب|تسجيل|قديم|غير صحيح|خاطئ/.test(normalized)) {
    return {
      sender: "system",
      author: "NEXUS تلقائي",
      avatar: "N",
      text: `يعرض القسم التالي نموذجًا تدريبيًا لإنشاء حساب، ويتضمن الرمز التوضيحي ${PROMO_CODE}. لا يتم فتح تسجيل خارجي.`,
    };
  }

  if (/برومو|ترويجي|رمز/.test(normalized)) {
    return {
      sender: "system",
      author: "NEXUS تلقائي",
      avatar: "N",
      text: `الرمز الترويجي المعروض في المحاكاة هو ${PROMO_CODE}.`,
    };
  }

  if (/دعم|تلغرام|تيليغرام|telegram|موظف/.test(normalized)) {
    return {
      sender: "system",
      author: "NEXUS تلقائي",
      avatar: "N",
      text: "حساب الدعم الظاهر داخل السيناريو هو @mavritbot. لا يتم فتح محادثة أو إرسال بيانات من هذه النسخة.",
    };
  }

  if (/\bid\b|معرّف|معرف|رقم الحساب/.test(normalized)) {
    return {
      sender: "system",
      author: "NEXUS تلقائي",
      avatar: "N",
      text: "يوجد المعرّف في الملف الشخصي لحسابك. أدخل 10 أرقام بالضبط وتحقّق من الرقم قبل المتابعة.",
    };
  }

  if (/رهان|syp|usd|مبلغ|ميزانية/.test(normalized)) {
    return {
      sender: "system",
      author: "NEXUS تلقائي",
      avatar: "N",
      text: "ابدأ بمبلغ صغير بعملة الحساب وحدد حدًا مسبقًا. لا ترفع الرهان بدافع الانفعال.",
    };
  }

  return {
    sender: "system",
    author: "NEXUS تلقائي",
    avatar: "N",
    text: "يمكنني شرح تفعيل البرنامج أو المعرّف أو الرمز الترويجي أو قسم الدعم داخل هذا السيناريو التدريبي.",
  };
}

function handleLiveChatSubmit(event) {
  event.preventDefault();
  const message = liveChatInput.value.trim();
  if (!message) return;

  window.clearTimeout(autoReplyTimer);
  updateLiveChatTimer(false);
  appendLiveMessage({ sender: "user", author: "أنت", avatar: "أ", text: message });
  liveChatInput.value = "";

  autoReplyTimer = window.setTimeout(() => {
    appendLiveMessage(getAutoReply(message));
    updateLiveChatTimer(isChatOpen && !liveChat.classList.contains("is-hidden"));
  }, 720);
}

function scheduleNextChatMessage() {
  window.clearTimeout(chatTimer);
  const delay = 3000 + Math.floor(Math.random() * 2001);

  chatTimer = window.setTimeout(() => {
    if (!liveChat.classList.contains("is-hidden")) {
      appendLiveMessage(simulatedChatMessages[nextChatMessage]);
      nextChatMessage = (nextChatMessage + 1) % simulatedChatMessages.length;
    }
    scheduleNextChatMessage();
  }, delay);
}

function updateLiveChatTimer(shouldRun) {
  window.clearTimeout(chatTimer);
  if (shouldRun) scheduleNextChatMessage();
}

function resetInterface(event) {
  event.preventDefault();
  hideToast();
  window.clearTimeout(autoReplyTimer);
  setSessionAccess(false);
  state = getDefaultState();
  saveState();
  codeInput.value = "";
  idInput.value = "";
  liveChatInput.value = "";
  clearFieldError(codeField, codeInput, codeError);
  clearFieldError(idField, idInput, idError);
  showScreen("auth");
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

async function copyPromoCode() {
  let copied = false;

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      copied = true;
    } catch {
      copied = fallbackCopy(PROMO_CODE);
    }
  } else {
    copied = fallbackCopy(PROMO_CODE);
  }

  showToast(
    copied ? `تم نسخ الرمز الترويجي ${PROMO_CODE}.` : `الرمز الترويجي: ${PROMO_CODE}`,
    copied ? "تم" : "انسخه يدويًا",
  );
}

function finishBoot() {
  bootStatus.textContent = "الواجهة جاهزة";

  window.setTimeout(() => {
    bootScreen.classList.add("is-hidden");

    if (!hasSessionAccess()) {
      showScreen("auth", { instant: true });
      return;
    }

    const restoredScreen = VALID_SCREENS.has(state.lastScreen) ? state.lastScreen : "programs";
    const target = state.program || restoredScreen === "programs" ? restoredScreen : "programs";
    showScreen(target, { instant: true });
  }, 220);
}

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = codeInput.value.trim();

  if (code.length !== 4) {
    showFieldError(codeField, codeInput, codeError, "أدخل 4 أرقام بالضبط.");
    return;
  }

  if (code !== VALID_CODE) {
    showFieldError(codeField, codeInput, codeError, "رمز الدخول غير صحيح.");
    return;
  }

  clearFieldError(codeField, codeInput, codeError);
  setSessionAccess(true);
  withLoader("جارٍ فتح الواجهة…", () => showScreen(state.program ? "dashboard" : "programs"));
});

codeInput.addEventListener("input", () => {
  const numericValue = codeInput.value.replace(/\D/g, "").slice(0, 4);
  if (numericValue !== codeInput.value) codeInput.value = numericValue;
  clearFieldError(codeField, codeInput, codeError);
});

document.querySelectorAll(".activate-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.program = button.dataset.program;
    state.lastScreen = "dashboard";
    saveState();
    withLoader("جارٍ تفعيل الواجهة…", () => showScreen("dashboard"), 880);
  });
});

signalButton.addEventListener("click", () => showScreen("id"));

idInput.addEventListener("input", () => {
  const numericValue = idInput.value.replace(/\D/g, "").slice(0, 10);
  if (numericValue !== idInput.value) idInput.value = numericValue;
  clearFieldError(idField, idInput, idError);
});

idForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const userId = idInput.value.trim();

  if (!/^\d{10}$/.test(userId)) {
    showFieldError(idField, idInput, idError, "يجب أن يتكوّن المعرّف من 10 أرقام بالضبط.");
    return;
  }

  clearFieldError(idField, idInput, idError);
  state.userId = userId;
  state.lastScreen = "dashboard";
  saveState();
  withLoader("جارٍ فتح بوابة VIP…", () => {
    window.location.href = "vip.html";
  }, 980);
});

document.querySelectorAll("[data-reset], #resetLink").forEach((link) => {
  link.addEventListener("click", resetInterface);
});

document.querySelectorAll("[data-demo-action]").forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("هذه محاكاة تعليمية؛ لم يتم فتح رابط خارجي أو إرسال أي بيانات.");
  });
});

copyPromoButton.addEventListener("click", copyPromoCode);
closeToast.addEventListener("click", hideToast);
chatLauncher.addEventListener("click", () => setChatOpen(true));
chatClose.addEventListener("click", () => setChatOpen(false, true));
liveChat.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setChatOpen(false, true);
});
liveChatForm.addEventListener("submit", handleLiveChatSubmit);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideToast();
  }
});

initializeLiveChat();
makeStars();
window.setTimeout(finishBoot, 1180);
