/* GAMMA — Propuesta Megatienda Luis Marhe
   Lo único que hace: que las secciones aparezcan al scrollear.
   Sin librerías: se muestra desde una notebook, tiene que abrir aunque no haya internet. */

/* ── PANTALLA COMPLETA ──
   Para mostrarla sin la barra del navegador: el blanco de arriba arruina el diseño.
   Solo se muestra el botón si el navegador lo soporta — en iPad/iPhone la API no
   existe, y un botón que no hace nada es peor que no tenerlo. */
(function () {
  'use strict';

  var btn = document.getElementById('fs');
  if (!btn) return;

  var raiz = document.documentElement;
  var puede = !!(raiz.requestFullscreen || raiz.webkitRequestFullscreen);
  if (!puede) return;               // queda hidden: iOS Safari cae acá

  btn.hidden = false;

  btn.addEventListener('click', function () {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      (raiz.requestFullscreen || raiz.webkitRequestFullscreen).call(raiz)
        ['catch'](function () { btn.hidden = true; });   // si el navegador lo niega, no insistir
    }
  });
})();

(function () {
  'use strict';

  var bloques = document.querySelectorAll('.card, .case, .price, .reco, .clientes');

  // Si el navegador no lo soporta, se ve todo de una: nunca queda contenido invisible.
  if (!('IntersectionObserver' in window)) return;

  Array.prototype.forEach.call(bloques, function (el) {
    el.classList.add('reveal');
  });

  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('on');
      obs.unobserve(e.target);          // una sola vez por bloque
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  Array.prototype.forEach.call(bloques, function (el) { obs.observe(el); });

  // Red de seguridad: si algo falla, a los 3 segundos se muestra todo igual.
  setTimeout(function () {
    Array.prototype.forEach.call(bloques, function (el) { el.classList.add('on'); });
  }, 3000);
})();
