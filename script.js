// Date validation functions
function validateYear(input) {
    // Allow empty input for editing
    if (input.value === '') {
        return;
    }
    
    let value = parseInt(input.value);
    
    // Only update day limit if we have a valid number
    if (value && !isNaN(value)) {
        updateDayLimit();
    }
}

function validateDay(input) {
    const maxDays = getDaysInMonth();
    let value = parseInt(input.value);
    
    if (value < 1) {
        input.value = 1;
    } else if (value > maxDays) {
        input.value = maxDays;
    }
}

function getDaysInMonth() {
    const year = document.getElementById('birthYear').value || new Date().getFullYear();
    const month = document.getElementById('birthMonth').value;
    
    if (month === '') return 31; // Default max days
    
    // Create a date object for the next month's 0th day (last day of current month)
    return new Date(year, parseInt(month) + 1, 0).getDate();
}

function updateDayLimit() {
    const dayInput = document.getElementById('birthDay');
    const currentValue = parseInt(dayInput.value);
    const maxDays = getDaysInMonth();
    
    dayInput.max = maxDays;
    
    // Adjust the day if it exceeds the new maximum
    if (currentValue > maxDays) {
        dayInput.value = maxDays;
    }
}

function getZodiacSign(month, day) {
    const zodiacDates = [
        { sign: "Capricorn", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
        { sign: "Aquarius", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
        { sign: "Pisces", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
        { sign: "Aries", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
        { sign: "Taurus", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
        { sign: "Gemini", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
        { sign: "Cancer", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
        { sign: "Leo", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
        { sign: "Virgo", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
        { sign: "Libra", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
        { sign: "Scorpio", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
        { sign: "Sagittarius", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 }
    ];

    // Adjust month by 1 since our input is 0-based
    month = parseInt(month) + 1;
    day = parseInt(day);

    for (let zodiac of zodiacDates) {
        if ((month === zodiac.startMonth && day >= zodiac.startDay) ||
            (month === zodiac.endMonth && day <= zodiac.endDay)) {
            return zodiac.sign;
        }
    }
    return "Capricorn"; // Default for December 22-31
}

function getZodiacEmoji(sign) {
    const zodiacEmojis = {
        "Capricorn": "♑",
        "Aquarius": "♒",
        "Pisces": "♓",
        "Aries": "♈",
        "Taurus": "♉",
        "Gemini": "♊",
        "Cancer": "♋",
        "Leo": "♌",
        "Virgo": "♍",
        "Libra": "♎",
        "Scorpio": "♏",
        "Sagittarius": "♐"
    };
    return zodiacEmojis[sign];
}

function getZodiacSleepTrait(sign) {
    const zodiacTraits = {
        "Capricorn": "As a practical Capricorn, you thrive on routine. A consistent 10 PM bedtime would suit your disciplined nature perfectly.",
        "Aquarius": "Your innovative Aquarius mind often races at night. Try meditation apps or white noise to help calm your thoughts before sleep.",
        "Pisces": "Dreamy Pisces needs a serene sleep environment. Consider adding calming aromatherapy to your bedroom.",
        "Aries": "Energetic Aries should avoid intense exercise right before bed. Wind down with gentle stretching instead.",
        "Taurus": "Comfort-loving Taurus needs a cozy, luxurious bed setup for the best sleep. Invest in quality bedding.",
        "Gemini": "Your active Gemini mind benefits from journaling before bed to clear thoughts and prepare for rest.",
        "Cancer": "Sensitive Cancer needs a secure, comfortable sleep environment. Consider using weighted blankets.",
        "Leo": "Proud Leo should create a sleep sanctuary worthy of royalty. High-quality mattress and silk pillowcases are your friends.",
        "Virgo": "Detail-oriented Virgo should maintain a precise sleep schedule and evening routine.",
        "Libra": "Balance-seeking Libra needs a harmonious bedroom environment with soft, matching colors.",
        "Scorpio": "Intense Scorpio benefits from complete darkness and silence for optimal sleep.",
        "Sagittarius": "Adventure-loving Sagittarius should try sleep stories or guided imagery for better rest."
    };
    return zodiacTraits[sign];
}

function calculateLifetimeSleep(age) {
    const averageSleepHours = 8;
    const daysLived = age * 365;
    const hoursSlept = daysLived * averageSleepHours;
    const yearsSlept = (hoursSlept / 24 / 365).toFixed(1);
    return { hoursSlept, yearsSlept };
}

function getSleepRecommendation(age) {
    if (age < 1) return "14-17 hours";
    if (age <= 2) return "11-14 hours";
    if (age <= 5) return "10-13 hours";
    if (age <= 13) return "9-11 hours";
    if (age <= 17) return "8-10 hours";
    if (age <= 25) return "7-9 hours";
    if (age <= 64) return "7-9 hours";
    return "7-8 hours";
}

function calculateAge() {
    const yearInput = document.getElementById('birthYear');
    const monthInput = document.getElementById('birthMonth');
    const dayInput = document.getElementById('birthDay');

    if (!yearInput.value || monthInput.value === '' || !dayInput.value) {
        alert('Please fill in all fields');
        return;
    }

    const birthDate = new Date(
        parseInt(yearInput.value), 
        parseInt(monthInput.value), 
        parseInt(dayInput.value)
    );

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    const resultSection = document.getElementById('result');
    resultSection.style.display = 'block';

    const zodiacSign = getZodiacSign(monthInput.value, dayInput.value);
    const zodiacEmoji = getZodiacEmoji(zodiacSign);
    
    const ageDisplay = document.getElementById('ageDisplay');
    ageDisplay.innerHTML = `
        <div class="age-display-wrapper">
            <span class="age-text-prefix">You are</span>
            <span class="age-number">${age}</span>
            <span class="age-text-suffix">years old</span>
        </div>
        <div class="zodiac-sign">${zodiacEmoji} ${zodiacSign}</div>
    `;

    const healthInsights = document.getElementById('healthInsights');
    healthInsights.innerHTML = generateHealthInsights(age, zodiacSign);
}

function generateHealthInsights(age, zodiacSign) {
    const sleepStats = calculateLifetimeSleep(age);
    const recommendedSleep = getSleepRecommendation(age);
    const zodiacTrait = getZodiacSleepTrait(zodiacSign);
    
    // Calculate age-related statistics
    const daysOld = Math.floor(age * 365);
    const monthsOld = Math.floor(age * 12);
    const hoursOld = Math.floor(age * 365 * 24);
    
    // Get age milestone message
    let milestoneMsg = '';
    if (age < 13) {
        milestoneMsg = `You're in your wonderful childhood years! 🎈`;
    } else if (age < 20) {
        milestoneMsg = `Welcome to your teenage adventure! 🚀`;
    } else if (age < 30) {
        milestoneMsg = `Enjoying your vibrant twenties! ✨`;
    } else if (age < 40) {
        milestoneMsg = `Thriving in your dynamic thirties! 💫`;
    } else if (age < 50) {
        milestoneMsg = `Rocking your fabulous forties! 🌟`;
    } else if (age < 60) {
        milestoneMsg = `Celebrating your golden fifties! 🎯`;
    } else {
        milestoneMsg = `Embracing your wisdom years! 👑`;
    }

    // Calculate fun statistics
    const netflixBinges = Math.floor(sleepStats.hoursSlept/24/7);
    const dreamCount = Math.floor(sleepStats.hoursSlept * 5).toLocaleString();
    const booksRead = Math.floor(sleepStats.hoursSlept/4);
    
    // Get age-appropriate fun facts
    let funFact = '';
    if (age < 12) {
        funFact = `You've had about ${Math.floor(age * 365 * 2)} bedtime stories! 📚`;
    } else if (age < 20) {
        funFact = `You've spent roughly ${Math.floor(age * 180)} hours playing video games! 🎮`;
    } else if (age < 30) {
        funFact = `You could have watched ${Math.floor(age * 100)} seasons of your favorite shows! 📺`;
    } else {
        funFact = `You've had approximately ${Math.floor(age * 365 * 2)} cups of coffee! ☕`;
    }

    const insights = `
        <div class="insight-card main-insight">
            <div class="age-milestone">
                <h2 class="milestone-text">${milestoneMsg}</h2>
                <div class="age-details">
                    <span class="detail-item">🎂 ${daysOld.toLocaleString()} days</span>
                    <span class="detail-item">📅 ${monthsOld.toLocaleString()} months</span>
                    <span class="detail-item">⏰ ${hoursOld.toLocaleString()} hours</span>
                </div>
            </div>
            
            <div class="stat-grid">
                <div class="stat-item">
                    <div class="stat-value">${sleepStats.yearsSlept}</div>
                    <div class="stat-label">Years in Dreamland</div>
                </div>
                <div class="stat-item highlight">
                    <div class="stat-value">${recommendedSleep}</div>
                    <div class="stat-label">Perfect Sleep Hours</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${dreamCount}</div>
                    <div class="stat-label">Dreams Had</div>
                </div>
            </div>
            <div class="dream-cta">
                <p class="dream-insight">Discover patterns in your ${dreamCount} dreams and unlock insights about your sleep journey.</p>
                <a href="#" class="dream-button">Try Dream Analyze Free on Shuteye</a>
            </div>
            <p class="fun-fact">${funFact}</p>
        </div>

        <div class="insight-card personality-card">
            <h3>✨ Your ${zodiacSign} Sleep Profile</h3>
            <p class="zodiac-insight">${zodiacTrait}</p>
            <div class="sleep-fact">
                <span class="age-highlight">At ${age}</span>, your sleep cycles are 
                ${age < 25 ? 'deeper and more restorative' : 'naturally adapting to your life rhythm'}.
                ${age < 18 ? 'Your growing body needs extra rest!' : 
                  age < 30 ? 'Your peak physical years demand quality sleep!' : 
                  age < 50 ? 'Maintaining good sleep habits is crucial now!' :
                  'Quality sleep helps keep you young at heart!'}
            </div>
        </div>

        <div class="insight-card recommendations">
            <h3>🌙 Your Age-Perfect Sleep Guide</h3>
            <div class="age-specific">
                <span class="age-highlight">At ${age} years young</span>, enhance your sleep quality with Shuteye:
            </div>
            <ul class="sleep-tips">
                ${generateAgeSleepChallenges(age)}
            </ul>
            <div class="app-features">
                <div class="feature-item">
                    <span class="feature-icon">🎯</span>
                    <span class="feature-text">Monitor sleep quality with advanced tracking</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🎤</span>
                    <span class="feature-text">Record and analyze sleep sounds</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🎵</span>
                    <span class="feature-text">Access a library of soothing sleep sounds</span>
                </div>
            </div>
            <div class="cta-container">
                <a href="#" class="cta-button">Try on Shuteye</a>
                <p class="cta-subtext">Join thousands who've improved their sleep quality with Shuteye</p>
            </div>
        </div>

        <div class="insight-card achievement">
            <h3>🏆 Your Life in Numbers</h3>
            <div class="achievements-grid">
                <div class="achievement-item">
                    <span class="achievement-icon">📺</span>
                    <span class="achievement-text">${netflixBinges} Netflix binges worth of sleep</span>
                </div>
                <div class="achievement-item">
                    <span class="achievement-icon">📚</span>
                    <span class="achievement-text">${booksRead} books' worth of rest</span>
                </div>
                <div class="achievement-item">
                    <span class="achievement-icon">🌟</span>
                    <span class="achievement-text">${Math.floor(age * 365)} nights of dreams</span>
                </div>
            </div>
            <p class="age-journey">Your journey of ${age} years has been filled with countless moments of rest and renewal! 🌈</p>
        </div>

        <div class="insight-card answer-card">
            <h3>Your Age Calculation Results</h3>
            <div class="date-comparison">
                <div class="date-item">
                    <span class="date-label">Born on:</span>
                    <span class="date-value">Thursday November 23, 1111</span>
                </div>
                <div class="date-item">
                    <span class="date-label">Age on:</span>
                    <span class="date-value">Wednesday November 27, 2024</span>
                </div>
            </div>
            
            <div class="time-units">
                <h4>Exact age in different time units:</h4>
                <div class="time-grid">
                    <div class="time-item">
                        <span class="time-value">913</span>
                        <span class="time-label">years</span>
                    </div>
                    <div class="time-item">
                        <span class="time-value">0</span>
                        <span class="time-label">months</span>
                    </div>
                    <div class="time-item">
                        <span class="time-value">4</span>
                        <span class="time-label">days</span>
                    </div>
                </div>
                
                <div class="detailed-units">
                    <div class="unit-row">
                        <span class="unit-label">Total Months:</span>
                        <span class="unit-value">10,956 months 4 days</span>
                    </div>
                    <div class="unit-row">
                        <span class="unit-label">Total Weeks:</span>
                        <span class="unit-value">47,638 weeks 6 days</span>
                    </div>
                    <div class="unit-row">
                        <span class="unit-label">Total Days:</span>
                        <span class="unit-value">333,472 days</span>
                    </div>
                    <div class="unit-row">
                        <span class="unit-label">Total Hours:</span>
                        <span class="unit-value">≈ 8,003,328 hours</span>
                    </div>
                    <div class="unit-row">
                        <span class="unit-label">Total Minutes:</span>
                        <span class="unit-value">≈ 480,199,680 minutes</span>
                    </div>
                    <div class="unit-row">
                        <span class="unit-label">Total Seconds:</span>
                        <span class="unit-value">≈ 28,811,980,800 seconds</span>
                    </div>
                </div>
            </div>
            
            <div class="next-birthday">
                <div class="birthday-countdown">
                    <span class="countdown-value">360</span>
                    <span class="countdown-label">days till next birthday</span>
                </div>
                <span class="birthday-date">Sunday November 23, 2025</span>
            </div>
        </div>
    `;

    return insights;
}

function generateAgeSleepChallenges(age) {
    const challenges = {
        young: [
            "🎯 Track sleep patterns for optimal growth and development",
            "🎵 Use calming bedtime music for better sleep quality",
            "📱 Monitor nighttime breathing patterns"
        ],
        adult: [
            "🎯 Record and analyze sleep cycles for better rest",
            "🎵 Access personalized sleep soundscapes",
            "📱 Track sleep disruptions and get insights"
        ],
        senior: [
            "🎯 Monitor sleep quality for healthy aging",
            "🎵 Use custom ambient sounds for peaceful rest",
            "📱 Track sleep patterns and get personalized advice"
        ]
    };

    let selectedChallenges = [];
    if (age < 18) {
        selectedChallenges = challenges.young;
    } else if (age < 50) {
        selectedChallenges = challenges.adult;
    } else {
        selectedChallenges = challenges.senior;
    }

    return selectedChallenges.map(challenge => 
        `<li class="challenge-item">${challenge}</li>`
    ).join('');
}

function resetInputs() {
    document.getElementById('birthYear').value = '';
    document.getElementById('birthMonth').value = '';
    document.getElementById('birthDay').value = '';
    
    const resultSection = document.getElementById('result');
    resultSection.style.display = 'none';
    
    document.getElementById('ageDisplay').textContent = '';
    document.getElementById('healthInsights').innerHTML = '';
}

// Add event listeners for enter key
document.getElementById('birthYear').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateAge();
    }
});

document.getElementById('birthMonth').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateAge();
    }
});

document.getElementById('birthDay').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateAge();
    }
});

document.getElementById('resetButton').addEventListener('click', resetInputs);

document.getElementById('birthYear').addEventListener('input', validateYear);
document.getElementById('birthDay').addEventListener('input', validateDay);

// Add event listener for example section toggle
document.addEventListener('DOMContentLoaded', function() {
    const exampleHeader = document.querySelector('.example-header');
    const exampleContent = document.querySelector('.example-content');
    const exampleToggle = document.querySelector('.example-toggle');
    
    exampleHeader.addEventListener('click', function() {
        exampleContent.classList.toggle('show');
        exampleToggle.textContent = exampleContent.classList.contains('show') ? 'Hide Example ↑' : 'Show Example ↓';
    });
});
