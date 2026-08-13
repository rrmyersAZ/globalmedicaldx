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

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (errorEl) errorEl.classList.remove("visible");
    if (successEl) successEl.classList.remove("visible");

    var name = (form.elements.namedItem("name") || {}).value || "";
    var phone = (form.elements.namedItem("phone") || {}).value || "";
    var email = (form.elements.namedItem("email") || {}).value || "";
    var indication = (form.elements.namedItem("indication") || {}).value || "";
    var payment = (form.elements.namedItem("payment") || {}).value || "";
    var demographics = (form.elements.namedItem("demographics") || {}).value || "";
    var history = (form.elements.namedItem("history") || {}).value || "";

    name = name.trim();
    phone = phone.trim();
    email = email.trim();
    indication = indication.trim();
    payment = payment.trim();
    demographics = demographics.trim();
    history = history.trim();

    if (!name || !phone || !indication || !payment) {
      if (errorEl) {
        errorEl.textContent =
          "Please complete name, phone, clinical indication, and payment preference.";
        errorEl.classList.add("visible");
      }
      return;
    }

    var body = [
      "Referral / appointment request from the Global Medical Diagnostics website.",
      "",
      "Name: " + name,
      "Phone: " + phone,
      "Email: " + (email || "Not provided"),
      "Clinical indication: " + indication,
      "Payment preference: " + payment,
      "Demographics / patient notes: " + (demographics || "Not provided"),
      "Relevant history: " + (history || "Not provided"),
    ].join("\n");

    var subject = encodeURIComponent("CPET referral — " + name);
    var mailtoBody = encodeURIComponent(body);
    var mailto =
      "mailto:info@globalmedicaldx.com?subject=" +
      subject +
      "&body=" +
      mailtoBody;

    window.location.href = mailto;

    if (successEl) {
      successEl.classList.add("visible");
    }
  });
})();
