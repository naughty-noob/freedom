// calculate countdown until September 12, 2026 (11 months from January 12, 2026)
const releaseDate = new Date('September 12, 2026 00:00:00').getTime();
const startDate = new Date('January 12, 2026 00:00:00').getTime();

// holidays array (month is 0-indexed)
const holidays = [
    { date: new Date(2026, 3, 4), name: 'Easter Sunday' },
    { date: new Date(2026, 4, 1), name: 'May Day' },
    { date: new Date(2026, 5, 14), name: 'Father\'s Day' },
    { date: new Date(2026, 10, 11), name: 'Veterans Day' },
    { date: new Date(2026, 11, 25), name: 'Christmas Day' },
    { date: new Date(2026, 0, 1), name: 'New Year\'s Day' },
    { date: new Date(2026, 1, 14), name: 'Valentine\'s Day' },
    { date: new Date(2026, 6, 4), name: 'Independence Day' },
    { date: new Date(2026, 9, 31), name: 'Halloween' }
];

// quotes array
const quotes = [
    "The will of God is your freedom.",
    "Strength does not come from winning. Your struggles develop your strengths.",
    "Freedom is not worth having if it does not include the freedom to make mistakes.",
    "The only way to deal with an unfree world is to become absolutely free.",
    "Liberty, when it begins to take root, is a plant of rapid growth.",
    "Freedom is what you do with what's been done to you.",
    "The price of freedom is eternal vigilance.",
    "No man is free who is not master of himself."
];

function updateCountdown() {
    const now = new Date().getTime();
    const distance = releaseDate - now;
    
    if (distance < 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        document.querySelector('.subtitle').innerText = 'Freedom achieved!';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // update main countdown
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    
    // update progress bar
    updateProgress(now);
    
    // update weeks and days stats
    updateStats(days);
    
    // update quote of the day
    updateQuote();
    
    // check for holidays
    checkHoliday(now);
}

function updateProgress(now) {
    const totalServiceTime = releaseDate - startDate;
    const timeElapsed = now - startDate;
    const percentage = Math.min(100, Math.max(0, (timeElapsed / totalServiceTime) * 100));
    
    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressText').innerText = percentage.toFixed(1) + '% completed';
}

function updateStats(days) {
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    document.getElementById('weeksDays').innerText = `${weeks} weeks, ${remainingDays} days`;
}

function updateQuote() {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;
    document.getElementById('quoteText').innerText = `"${quotes[quoteIndex]}"`;
}

function checkHoliday(now) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    
    const today = new Date(currentYear, currentMonth, currentDay);
    const holiday = holidays.find(h => 
        h.date.getDate() === currentDay && 
        h.date.getMonth() === currentMonth
    );
    
    if (holiday) {
        document.getElementById('holidayDisplay').innerHTML = `🎉 <strong>${holiday.name}</strong>`;
        document.getElementById('holidayDisplay').style.display = 'block';
    } else {
        document.getElementById('holidayDisplay').style.display = 'none';
    }
}

// update immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);
