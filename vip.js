const toast = document.querySelector("#toast");
const timer = document.querySelector("#slotTimer");
let toastTimer;
let remainingSeconds = 15 * 60;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

async function copyValue(id) {
  const input = document.getElementById(id);
  try {
    await navigator.clipboard.writeText(input.value);
    showToast(id === "promoCode" ? "تم نسخ الرمز الترويجي OUG22." : "تم نسخ رقم المحفظة التجريبي.");
  } catch {
    input.select();
    document.execCommand("copy");
    showToast("تم النسخ.");
  }
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => copyValue(button.dataset.copy));
});

document.querySelectorAll(".tier").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tier").forEach((tier) => tier.classList.remove("is-selected"));
    button.classList.add("is-selected");
  });
});

document.querySelectorAll(".demo-action").forEach((button) => {
  button.addEventListener("click", () => {
    showToast("هذه محاكاة تعليمية؛ لم يتم فتح رابط أو إرسال بيانات أو تنفيذ دفعة.");
  });
});

window.setInterval(() => {
  if (remainingSeconds <= 0) remainingSeconds = 15 * 60;
  remainingSeconds -= 1;
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");
  timer.textContent = `${minutes}:${seconds}`;
}, 1000);
