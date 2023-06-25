browser.runtime.onMessage.addListener((message) => {
    if (message.command === 'openLinks') {
      openLinks();
    }
  });
  
  function openLinks() {
    const selector = '.puz-history__round__puzzle';
    const url = browser.tabs.query({ active: true, currentWindow: true })
      .then((tabs) => {
        const activeTab = tabs[0];
        if (!activeTab || !activeTab.url) {
          console.error('Unable to fetch URL.');
          return;
        }
        const url = activeTab.url;
        fetchLinks(url, selector);
      })
      .catch((error) => {
        console.error('Error fetching active tab:', error.message);
      });
  }
  
  function fetchLinks(url, selector) {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const links = Array.from(doc.querySelectorAll(selector)).map((link) => link.href);
        if (links.length === 0) {
          console.log('No links found matching the selector.');
          return;
        }
        console.log(`Found ${links.length} links matching the selector.`);
        openAllLinks(links);
      })
      .catch((error) => {
        console.error('Error fetching URL:', error.message);
      });
  }
  
  function openAllLinks(links) {
    links.forEach((link) => {
      browser.tabs.create({ url: link });
    });
  }
  