let eventsData = [];
  let activeFilter = 'all';

  const list = document.getElementById('list');
  const searchInput = document.querySelector('.search-input');
  const buttons = document.querySelectorAll('.filter-btn');

  async function loadEvents() {
    try {
      const res = await fetch('events.json');
      eventsData = await res.json();
      renderEvents();
    } catch (err) {
      console.error('Failed to load events.json', err);
    }
  }

  function renderEvents() {
    const query = searchInput.value.toLowerCase();

    list.innerHTML = '';

    const filtered = eventsData.filter(event => {
      const matchesFilter = activeFilter === 'all' || event.style.includes(activeFilter);
      const searchText = (
        event.title + ' ' + event.date + ' ' + event.location + ' ' + event.tags.join(' ')
      ).toLowerCase();
      const words = query.trim().split(/\s+/).filter(Boolean);
      const matchesSearch =
  words.length === 0 ||
  words.every(word => searchText.includes(word));


      return matchesFilter && matchesSearch;
    });

    filtered.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';

      card.innerHTML = `
        <a href="${event.link}">
          <img src="${event.image}" alt="${event.title}">
          <div class="event-content">
            <div class="event-title">${event.title}</div>
            <div class="event-date">${event.date} 
            <div class="event-tags">
              ${event.tags.map(t => `<div class="tag">${t}</div>`).join('')}
            </div>
          </div>
        </a>
      `;

      list.appendChild(card);
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');

      activeFilter = btn.getAttribute('data-filter');
      renderEvents();
    });
  });

  searchInput.addEventListener('input', renderEvents);

  loadEvents();