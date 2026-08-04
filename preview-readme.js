(function () {
  // README 预览壳：fetch README.md → marked 渲染 // 中文注释：本地 HTTP 预览入口逻辑
  const cfg = window.__PREVIEW_README__ || {
    readmeFile: 'README.md', // 中文注释：仓库根 README 相对路径
    pageLang: 'zh-CN',
    title: 'README Preview',
    toolbarTitle: 'README Preview',
    hint: 'Preview README.md locally',
    reloadLabel: 'Reload README',
    openLabel: 'Open README.md',
    loading: 'Loading README…',
    loadedPrefix: 'Loaded',
    fileProtocolError:
      'Open via local HTTP server (file:// cannot fetch README). From repo root: python -m http.server 8090',
    fetchError: 'Failed to load README.',
    footerNote: 'Preview: preview-readme.html · Assets: assets/images/readme/',
    activeLang: 'zh',
    zhPage: 'preview-readme.html',
    enPage: 'preview-readme.html',
  };

  document.documentElement.lang = cfg.pageLang; // 中文注释：同步 html lang
  document.title = cfg.title;

  const contentEl = document.getElementById('content'); // 中文注释：Markdown 渲染容器
  const statusEl = document.getElementById('status'); // 中文注释：加载状态条
  const reloadBtn = document.getElementById('reload-btn');
  const toolbarTitle = document.getElementById('toolbar-title');
  const toolbarHint = document.getElementById('toolbar-hint');
  const openLink = document.getElementById('open-readme-link');
  const footerNote = document.getElementById('footer-note');

  if (toolbarTitle) toolbarTitle.textContent = cfg.toolbarTitle;
  if (toolbarHint) toolbarHint.innerHTML = cfg.hint;
  if (reloadBtn) reloadBtn.textContent = cfg.reloadLabel;
  if (openLink) {
    openLink.href = './' + cfg.readmeFile;
    openLink.textContent = cfg.openLabel;
  }
  if (footerNote) footerNote.textContent = cfg.footerNote;

  marked.setOptions({ gfm: true, breaks: false }); // 中文注释：GFM 解析选项

  function setStatus(type, message) {
    // 中文注释：更新状态条样式与文案
    statusEl.className = 'status ' + type;
    statusEl.textContent = message;
  }

  async function loadReadme() {
    // 中文注释：禁止 file://（fetch 会失败）
    if (location.protocol === 'file:') {
      setStatus('error', cfg.fileProtocolError);
      contentEl.innerHTML =
        '<p>Cannot load README under <code>file://</code>. Start a local HTTP server first.</p>';
      return;
    }

    setStatus('ok', cfg.loading);
    if (reloadBtn) reloadBtn.disabled = true;

    try {
      // 中文注释：加时间戳避免浏览器强缓存旧 README
      const res = await fetch('./' + cfg.readmeFile + '?ts=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const md = await res.text();
      contentEl.innerHTML = marked.parse(md);
      const locale = cfg.pageLang.startsWith('zh') ? 'zh-CN' : 'en-US';
      setStatus('ok', cfg.loadedPrefix + ' ' + cfg.readmeFile + ' · ' + new Date().toLocaleString(locale));
    } catch (err) {
      setStatus('error', cfg.fetchError + ' ' + err.message);
      contentEl.innerHTML =
        '<p>Could not read <code>' + cfg.readmeFile + '</code>. Serve from repo root via HTTP.</p>';
    } finally {
      if (reloadBtn) reloadBtn.disabled = false;
    }
  }

  if (reloadBtn) reloadBtn.addEventListener('click', loadReadme); // 中文注释：手动重新加载
  loadReadme(); // 中文注释：首屏自动加载
})();
