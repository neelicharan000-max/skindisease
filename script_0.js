
        // Language switcher for login page
        function toggleLangMenu() {
            const m = document.getElementById('langMenu');
            m.style.display = m.style.display === 'none' ? 'flex' : 'none';
        }
        function selectLang(lang, label) {
            document.getElementById('currentLangLabel').textContent = label;
            document.getElementById('langMenu').style.display = 'none';
            setLanguage(lang);
        }
        document.addEventListener('click', (e) => {
            if (!document.getElementById('langSwitcher').contains(e.target)) {
                document.getElementById('langMenu').style.display = 'none';
            }
        });
        // Init language
        window.addEventListener('DOMContentLoaded', () => {
            const saved = localStorage.getItem('skinai_lang') || 'en';
            const labels = { en: 'EN', te: 'తె', ta: 'த', hi: 'हि' };
            document.getElementById('currentLangLabel').textContent = labels[saved] || 'EN';
            document.querySelectorAll('.lang-option').forEach(el => {
                el.classList.toggle('active', el.dataset.lang === saved);
            });
            applyTranslations();
        });
    