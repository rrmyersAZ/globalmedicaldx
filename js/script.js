(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var form = document.getElementById("referral-form");
  if (!form) return;

  var errorEl = document.getElementById("form-error");
  var successEl = document.getElementById("form-success");
  var submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (errorEl) errorEl.classList.remove("visible");
    if (successEl) successEl.classList.remove("visible");

    var name = ((form.elements.namedItem("name") || {}).value || "").trim();
    var phone = ((form.elements.namedItem("phone") || {}).value || "").trim();
    var email = ((form.elements.namedItem("email") || {}).value || "").trim();
    var indication = ((form.elements.namedItem("indication") || {}).value || "").trim();
    var payment = ((form.elements.namedItem("payment") || {}).value || "").trim();
    var demographics = ((form.elements.namedItem("demographics") || {}).value || "").trim();
    var history = ((form.elements.namedItem("history") || {}).value || "").trim();

    if (!name || !phone || !indication || !payment) {
      if (errorEl) {
        errorEl.textContent =
          "Please complete name, phone, clinical indication, and payment preference.";
        errorEl.classList.add("visible");
      }
      return;
    }

    if (submitBtn) submitBtn.disabled = true;

    fetch("/api/referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        indication: indication,
        payment: payment,
        demographics: demographics,
        history: history,
      }),
    })
      .then(function (response) {
        if (!response.ok) throw new Error("send_failed");
        if (successEl) successEl.classList.add("visible");
        form.reset();
      })
      .catch(function () {
        if (errorEl) {
          errorEl.textContent =
            "We could not send the referral. Please call (480) 806-9044 or email info@globalmedicaldx.com.";
          errorEl.classList.add("visible");
        }
      })
      .then(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
})();
