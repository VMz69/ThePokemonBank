/**************************************************
 * FUNCIÓN: Muestra el loader en pantalla
 **************************************************/
function mostrarLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.remove("hidden");
  }
}

/**************************************************
 * CUANDO EL HTML YA CARGÓ
 **************************************************/
document.addEventListener("DOMContentLoaded", function () {

  /**************************************************
   * 🔁 RESET CONTROLADO (solo para pruebas/demo)
   * Poner en true si quieres forzar que el usuario
   * vuelva a estar "deslogueado"
   **************************************************/
  const RESET_DEMO = false;

  if (RESET_DEMO) {
    localStorage.removeItem("usuario"); 
  }

  /**************************************************
   * 👤 USUARIO BASE (se crea solo si no existe)
   **************************************************/
  let usuario = {
    cuenta: "0987654321",
    nombre: "Ash Ketchum",
    pin: 1234,
    saldo: 500.0,
    login: false,
  };

  // Si no existe "usuario" en localStorage, lo crea
  if (!localStorage.getItem("usuario")) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }

  // Obtiene el usuario guardado
  const datos = localStorage.getItem("usuario");
  const usuarioGuardado = JSON.parse(datos);

  /**************************************************
   * 🔥 AUTO LOGIN DEMO
   **************************************************/
  const DEMO_MODE = true; // ← false cuando ya no quieras demo

  if (DEMO_MODE && !usuarioGuardado.login) {

    // ⏳ 1) Deja visible el login unos segundos
    setTimeout(() => {

      // 🔄 2) Muestra loader ("Iniciando sesión...")
      mostrarLoader();

      // ⏳ 3) Simula procesamiento de login
      setTimeout(() => {

        usuarioGuardado.login = true; // marca sesión iniciada
        localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));
        location.href = "panel.html"; // redirige al panel

      }, 1200); // tiempo mostrando loader

    }, 1600); // tiempo mostrando login

    return; // ⛔ evita que se active el login manual
  }

  /**************************************************
   * 🔐 LOGIN NORMAL (manual)
   **************************************************/
  let inputPin = document.getElementById("pin");
  let inputUsuario = document.getElementById("usuario");
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // ❌ Si hay campos vacíos
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
    }

    // ❌ Si usuario o pin son incorrectos
    else if (
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

    // ✅ Login correcto
    usuarioGuardado.login = true;
    localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));
    location.href = "panel.html";
  });
});
