// JS para funcionalidades: Smooth scroll en navbar, formulario contacto, y animaciones sutiles.
// Estructura: Event listeners para interacciones. Compatible con Bootstrap.

// Espera a que cargue el DOM
document.addEventListener('DOMContentLoaded', function () {
	// Smooth scroll para links con #anchor
	document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
		anchor.addEventListener('click', function (e) {
			var targetId = this.getAttribute('href').slice(1);
			var target = document.getElementById(targetId);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				// actualizar hash sin hacer jump instantáneo
				history.pushState(null, '', '#' + targetId);
			}
		});
	});

	// Manejo simple de formulario (ej. contacto)
		// Soporta ambos: form[data-js="contact-form"] y #contactForm (HTML existente)
		var form = document.querySelector('form[data-js="contact-form"]') || document.getElementById('contactForm');
		if (form) {
			form.addEventListener('submit', function (e) {
				e.preventDefault();
				// Si el form usa ids en inputs, recolectar manualmente
				var name = (form.querySelector('[name="name"]') || document.getElementById('name'))?.value || '';
				var email = (form.querySelector('[name="email"]') || document.getElementById('email'))?.value || '';
				if (!name.trim() || !email.trim()) {
					alert('Por favor completa tu nombre y correo.');
					return;
				}
				var submitBtn = form.querySelector('button[type="submit"]');
				if (submitBtn) {
					submitBtn.disabled = true;
					var originalText = submitBtn.textContent;
					submitBtn.textContent = 'Enviando...';
				}
				// Simular envío asíncrono
				setTimeout(function () {
					if (submitBtn) {
						submitBtn.disabled = false;
						submitBtn.textContent = originalText || 'Enviar';
					}
					alert('Gracias, tu mensaje fue recibido (simulado).');
					if (typeof form.reset === 'function') form.reset();
				}, 900);
			});
		}

	// Clase para animar elementos al entrar en viewport (opcional)
	var observer = null;
	if ('IntersectionObserver' in window) {
		observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('in-view');
					observer.unobserve(entry.target);
				}
			});

				// Helper global para enlaces que llamen scrollToSection desde inline onclick
				function scrollToSection(id) {
					var el = document.getElementById(id);
					if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
		}, { threshold: 0.1 });
		document.querySelectorAll('[data-animate="true"]').forEach(function (el) {
			observer.observe(el);
		});
	}
});