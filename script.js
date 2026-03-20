// calculate countdown until December 12, 2026 (11 months from January 12, 2026)
// Using explicit date construction for reliable parsing (month is 0-indexed)
const releaseDate = new Date(2026, 11, 12, 0, 0, 0).getTime();  // Month 11 = December
const startDate = new Date(2026, 0, 12, 0, 0, 0).getTime();     // Month 0 = January

// milestones array - key dates between now and release
const milestones = [
    { date: new Date(2026, 2, 12).getTime(), name: 'Project Started', icon: '🚀' },
    { date: new Date(2026, 3, 12).getTime(), name: 'First Quarter', icon: '📊' },
    { date: new Date(2026, 5, 12).getTime(), name: 'Halfway Point', icon: '⚡' },
    { date: new Date(2026, 7, 12).getTime(), name: 'Summer Milestone', icon: '☀️' },
    { date: new Date(2026, 8, 12).getTime(), name: 'Final Stretch', icon: '🎯' },
    { date: new Date(2026, 10, 12).getTime(), name: 'Almost There', icon: '🔥' },
    { date: releaseDate, name: 'Freedom Day', icon: '🎉' }
];

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
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.error('Countdown elements not found');
        return;
    }
    
    daysElement.innerText = days.toString().padStart(2, '0');
    hoursElement.innerText = hours.toString().padStart(2, '0');
    minutesElement.innerText = minutes.toString().padStart(2, '0');
    secondsElement.innerText = seconds.toString().padStart(2, '0');
    
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
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (!progressBar || !progressText) return;
    
    const totalServiceTime = releaseDate - startDate;
    const timeElapsed = now - startDate;
    const percentage = Math.min(100, Math.max(0, (timeElapsed / totalServiceTime) * 100));
    
    progressBar.style.width = percentage + '%';
    progressText.innerText = percentage.toFixed(1) + '% completed';
}

function updateStats(days) {
    const weeksDaysElement = document.getElementById('weeksDays');
    if (!weeksDaysElement) return;
    
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    weeksDaysElement.innerText = `${weeks} weeks, ${remainingDays} days`;
}

function updateQuote() {
    const quoteText = document.getElementById('quoteText');
    if (!quoteText) return;
    
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;
    quoteText.innerText = `"${quotes[quoteIndex]}"`;
}

function checkHoliday(now) {
    const holidayDisplay = document.getElementById('holidayDisplay');
    if (!holidayDisplay) return;
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    
    const today = new Date(currentYear, currentMonth, currentDay);
    const holiday = holidays.find(h => 
        h.date.getDate() === currentDay && 
        h.date.getMonth() === currentMonth
    );
    
    if (holiday) {
        holidayDisplay.innerHTML = `🎉 <strong>${holiday.name}</strong>`;
        holidayDisplay.style.display = 'block';
    } else {
        holidayDisplay.style.display = 'none';
    }
}

// particle system
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.3
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(233, 69, 96, ${p.alpha})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// render milestones
function renderMilestones() {
    const now = new Date().getTime();
    const grid = document.getElementById('milestonesGrid');
    
    if (!grid) return;
    
    grid.innerHTML = milestones.map(m => {
        const isPassed = now >= m.date;
        const daysUntil = Math.floor((m.date - now) / (1000 * 60 * 60 * 24));
        const statusClass = isPassed ? 'passed' : 'upcoming';
        const statusText = isPassed ? 'Completed' : `${daysUntil} days`;
        
        return `
            <div class="milestone-item ${isPassed ? 'completed' : ''}">
                <div class="milestone-date">${new Date(m.date).toLocaleDateString()}</div>
                <div class="milestone-name">${m.icon} ${m.name}</div>
                <div class="milestone-status ${statusClass}">${statusText}</div>
            </div>
        `;
    }).join('');
}

// share button functionality
function initShare() {
    const btn = document.getElementById('shareBtn');
    const status = document.getElementById('shareStatus');
    
    if (!btn || !status) {
        console.error('Share button elements not found');
        return;
    }
    
    btn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            status.textContent = 'Copied!';
            status.classList.add('visible');
            setTimeout(() => status.classList.remove('visible'), 2000);
        } catch (err) {
            status.textContent = 'Failed to copy';
            status.classList.add('visible');
            setTimeout(() => status.classList.remove('visible'), 2000);
        }
    });
}

// initialize everything
initParticles();
renderMilestones();
initShare();

// update immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);
