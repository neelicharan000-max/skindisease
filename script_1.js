
        // Dashboard language switcher
        function toggleDashLang() {
            const m = document.getElementById('dashLangMenu');
            m.style.display = m.style.display === 'none' ? 'flex' : 'none';
        }
        function selectDashLang(lang, label) {
            document.getElementById('dashLangLabel').textContent = label;
            document.getElementById('dashLangMenu').style.display = 'none';
            document.querySelectorAll('#dashLangSwitcher .lang-option').forEach(el => {
                el.classList.toggle('active', el.dataset.lang === lang);
            });
            setLanguage(lang);
            // Re-render food section if active
            if (document.getElementById('section-food').classList.contains('active')) {
                renderFoodSection();
            }
        }
        document.addEventListener('click', (e) => {
            const sw = document.getElementById('dashLangSwitcher');
            if (sw && !sw.contains(e.target)) {
                document.getElementById('dashLangMenu').style.display = 'none';
            }
        });
    