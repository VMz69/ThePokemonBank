document.addEventListener("DOMContentLoaded", function () {
  let usuario = {
    cuenta: "0987654321",
    nombre: "Ash Ketchum",
    pin: 1234,
    saldo: 500.0,
    login: false,
  };

  if (!localStorage.getItem("usuario")) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }

  const datos = localStorage.getItem("usuario");
  const usuarioGuardado = JSON.parse(datos);

  // ======================
  // 🔥 AUTO LOGIN DEMO
  // ======================

  const DEMO_MODE = true; // ← cuando no quieras demo lo pones en false

  if (DEMO_MODE && !usuarioGuardado.login) {
    // 1️⃣ Tiempo para que se vea el login
    setTimeout(() => {
      mostrarLoader(); // aparece loader

      // 2️⃣ Tiempo de "procesando login"
      setTimeout(() => {
        usuarioGuardado.login = true;
        localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));
        location.href = "panel.html";
      }, 1200);
    }, 1600); // ← tiempo mostrando login

    return;
  }

  // ======================
  // LOGIN NORMAL
  // ======================

  let inputPin = document.getElementById("pin");
  let inputUsuario = document.getElementById("usuario");
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      inputPin.value.trim().length == 0 ||
      inputUsuario.value.trim().length == 0
    ) {
      Swal.fire({
        title: "Rellena los campos",
        text: "Debes ingresar tu usuario y pin para acceder",
        icon: "warning",
      });
      return;
    } else if (
      inputUsuario.value.trim() !== usuarioGuardado.nombre ||
      parseInt(inputPin.value.trim()) !== usuarioGuardado.pin
    ) {
      Swal.fire({
        title: "Usuario o pin no valido",
        text: "Verifica haber ingresado el usuario o pin correcto",
        icon: "warning",
      });
      return;
    }

    usuarioGuardado.login = true;
    localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));
    location.href = "panel.html";
  });
});

function mostrarLoader() {
  document.getElementById("loader").classList.remove("hidden");
}
