  var WHATSAPP_DA_LOJA = "5511940423083";

  var form = document.getElementById("form");

  function mascaraTelefone(v) {
    v = v.replace(/\D/g, "").slice(0, 11);
    if (v.length > 10) return v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    if (v.length > 6) return v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    if (v.length > 2) return v.replace(/^(\d{2})(\d*)/, "($1) $2");
    return v;
  }
  form.whatsapp.addEventListener("input", function (e) {
    e.target.value = mascaraTelefone(e.target.value);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    ["nome", "endereco", "whatsapp", "problema"].forEach(function (id) {
      var el = form[id];
      var valor = el.value.trim();
      var valido = id === "whatsapp" ? valor.replace(/\D/g, "").length >= 10 : valor.length > 1;
      el.parentElement.classList.toggle("invalid", !valido);
      if (!valido) ok = false;
    });
    if (!ok) { form.querySelector(".invalid input, .invalid textarea").focus(); return; }

    var texto =
      "Olá, GTEC Info Cell! Quero um atendimento.\n\n" +
      "*Nome:* " + form.nome.value.trim() + "\n" +
      "*Endereço:* " + form.endereco.value.trim() + "\n" +
      "*WhatsApp:* " + form.whatsapp.value.trim() + "\n" +
      "*Problema do celular:* " + form.problema.value.trim();

    document.getElementById("ok").classList.add("show");
    window.open("https://wa.me/" + WHATSAPP_DA_LOJA + "?text=" + encodeURIComponent(texto), "_blank");
  });