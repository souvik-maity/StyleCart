document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.filter-btn');
  const catalogue = document.querySelector('.catalogue');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      const selectedSection = document.querySelector(
        `.category[data-category="${category}"]`
      );

      if (category === 'all') {
        resetOrder();
        return;
      }

      if (selectedSection) {
        catalogue.prepend(selectedSection); // Move selected section to the top
        window.scrollTo({
          top: selectedSection.offsetTop - 50,
          behavior: 'smooth',
        }); // Smooth scroll

        // Add animation effect
        selectedSection.style.transform = 'scale(1.05)';
        setTimeout(() => (selectedSection.style.transform = 'scale(1)'), 300);
      }
    });
  });

  function resetOrder() {
    const allSections = document.querySelectorAll('.category');
    allSections.forEach((section) => catalogue.appendChild(section));
  }
});
