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
   * 🎥 CONFIGURACIÓN DE DEMO
   **************************************************/
  const DEMO_MODE = true; // false cuando ya no quieras auto-login
  const DEMO_SESSION_KEY = "demo_autologin_done"; 
  // ↑ Vive solo mientras la pestaña esté abierta

  /**************************************************
   * 🔁 RESET CONTROLADO (solo para pruebas internas)
   **************************************************/
  const RESET_DEMO = false;

  if (RESET_DEMO) {
    localStorage.removeItem("usuario");
    sessionStorage.removeItem(DEMO_SESSION_KEY);
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
   * 🔥 AUTO LOGIN DEMO (estable)
   **************************************************/
  if (DEMO_MODE && !sessionStorage.getItem(DEMO_SESSION_KEY)) {

    // Marca que en esta pestaña ya se ejecutó la demo
    sessionStorage.setItem(DEMO_SESSION_KEY, "true");

    // ⏳ 1) Tiempo para que se vea el login
    setTimeout(() => {

      // 🔄 2) Muestra loader ("Iniciando sesión...")
      mostrarLoader();

      // ⏳ 3) Simula procesamiento de login
      setTimeout(() => {

        usuarioGuardado.login = true; // marca sesión iniciada
        localStorage.setItem("usuario", JSON.stringify(usuarioGuardado));
        location.href = "panel.html"; // redirige al panel

      }, 1200); // tiempo mostrando loader

    }, 1500); // tiempo mostrando login

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
