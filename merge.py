import re

with open('index.html', 'r', encoding='utf-8') as f:
    login = f.read()

with open('dashboard.html', 'r', encoding='utf-8') as f:
    dash = f.read()

# 1. Add dashboard.css to head
login = login.replace('<link rel="stylesheet" href="css/login.css" />', 
    '<link rel="stylesheet" href="css/login.css" />\n    <link rel="stylesheet" href="css/dashboard.css" />')

# 2. Extract bodies
body_start = login.find('<body>') + len('<body>')
body_end = login.find('<!-- Supabase -->')

login_body = login[body_start:body_end]

dash_body_start = dash.find('<!-- SIDEBAR -->')
dash_body_end = dash.find('<!-- Supabase -->')

dash_body = dash[dash_body_start:dash_body_end]

# 3. Extract Disclaimer Modal (only use one, let's use the one from login)
disc_modal_start = login.find('<!-- ============ DISCLAIMER MODAL ============ -->')
disc_modal_end = login.find('</body>')

disclaimer_and_scripts = login[disc_modal_start:disc_modal_end]

# 4. Clean up the script section
# We will just write a new unified scripts section
unified_scripts = """
    <!-- Unified Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="js/supabase-config.js"></script>
    <script src="js/i18n.js"></script>
    <script src="js/auth.js"></script>
    <script src="js/diseases.js"></script>
    <script src="js/food.js"></script>
    <script src="js/gradcam.js"></script>
    <script src="js/app.js"></script>
"""

# 5. Extract inline scripts from login body
login_scripts_start = login.find('<script>', login.find('<!-- Supabase -->'))
login_scripts_end = login.find('<!-- ============ DISCLAIMER MODAL ============ -->')
login_scripts = login[login_scripts_start:login_scripts_end]

# 6. Extract inline scripts from dashboard body
dash_scripts_start = dash.find('<script>', dash.find('<!-- Supabase -->'))
dash_scripts_end = dash.find('<!-- ============ DISCLAIMER MODAL ============ -->')
dash_scripts = dash[dash_scripts_start:dash_scripts_end]

# Some scripts from dashboard might overlap, e.g. toggleDashLang
# They are independent functions so we can just append them.

new_body = f"""
    <div id="login-view">
{login_body}
    </div>

    <div id="dashboard-view" style="display:none;">
{dash_body}
    </div>

{unified_scripts}

{login_scripts}

{dash_scripts}

{disclaimer_and_scripts}
"""

final_html = login[:body_start] + new_body + "</body>\n</html>"

# backup original
import shutil
shutil.copyfile('index.html', 'index_backup.html')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

print("Merged successfully.")
