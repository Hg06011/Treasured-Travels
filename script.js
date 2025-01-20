const calendar = document.getElementById('calendar');
const monthName = document.getElementById('month-name');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();

function formatDate(date) {
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

// Function to load and display events from an API
async function loadEvents(date) {
  const formattedDate = formatDate(date);
  
  try {
    // Replace this URL with the API you are using for events (use a real endpoint)
    const response = await fetch(`https://your-api-url.com/events?date=${formattedDate}`);
    const events = await response.json();
    
    // Log events (optional, for debugging purposes)
    console.log(events);
    
    // Display events in the calendar
    renderCalendar(date, events);
  } catch (error) {
    console.error('Error loading events:', error);
  }
}

// Function to render the calendar for the given month
function renderCalendar(date, events = []) {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Update the month name in the header
  monthName.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Get the first day of the month and the number of days in the month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Number of days in the month
  const totalDays = lastDay.getDate();

  // Clear the calendar
  calendar.innerHTML = '';

  // Add empty slots for days before the first day of the month
  const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    calendar.appendChild(emptyCell);
  }

  // Add days and check for events
  for (let i = 1; i <= totalDays; i++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day');
    dayCell.textContent = i;
    
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === i && eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    // If there are events, mark the day
    if (dayEvents.length > 0) {
      dayCell.classList.add('event');
    }

    calendar.appendChild(dayCell);
  }
}

// Event listeners for navigating between months
prevMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  loadEvents(currentDate);
});

nextMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  loadEvents(currentDate);
});

// Initial load
loadEvents(currentDate);
