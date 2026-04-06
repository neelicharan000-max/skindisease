
        // ---- Theme Toggle (Minimalistic/Light Mode) ----
        const TH_KEY = 'skinai_theme';
        function applyTheme(theme) {
            const isLight = theme === 'minimal';
            if (isLight) {
                document.documentElement.setAttribute('data-theme', 'minimal');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }

            const btn = document.getElementById('themeToggleBtn');
            if (btn) {
                btn.querySelector('.icon-dark').style.display = isLight ? 'none' : 'block';
                btn.querySelector('.icon-light').style.display = isLight ? 'block' : 'none';
            }
        }

        function toggleTheme() {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'minimal' ? 'dark' : 'minimal';
            localStorage.setItem(TH_KEY, newTheme);
            applyTheme(newTheme);
        }

        // Init Theme
        window.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem(TH_KEY) || 'dark';
            applyTheme(savedTheme);
        });

        // ---- Splash Screen ----
        window.addEventListener('DOMContentLoaded', () => {
            const splash = document.getElementById('splashScreen');
            const titleEl = document.getElementById('typewriterTitle');
            const text = "WELCOME TO SKIN AI";
            let i = 0;

            function typeWriter() {
                if (i < text.length) {
                    titleEl.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 70); // 70ms per char
                }
            }

            // Start typing after a short delay
            setTimeout(typeWriter, 300);

            setTimeout(() => {
                splash.classList.add('hide');
                setTimeout(() => splash.style.display = 'none', 650);
            }, 3000); // Wait 3 seconds before hiding
        });
        // ---- Disclaimer ----
        function showDisclaimer() {
            const modal = document.getElementById('disclaimerModal');
            if (modal) { modal.style.display = 'flex'; }
        }
        function acceptDisclaimer() {
            sessionStorage.setItem('skinai_disclaimer_seen', '1');
            const modal = document.getElementById('disclaimerModal');
            if (modal) modal.style.display = 'none';
        }
    