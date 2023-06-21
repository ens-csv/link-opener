document.getElementById('openLinksButton').addEventListener('click', () => {
    browser.runtime.sendMessage({ command: 'openLinks' });
  });
  