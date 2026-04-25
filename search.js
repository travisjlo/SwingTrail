const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.event-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const styles = card.getAttribute('data-style');

        if (filter === 'all' || styles.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  const searchInput = document.querySelector('.search-input');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const isVisible = card.style.display !== 'none';

      if (text.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });