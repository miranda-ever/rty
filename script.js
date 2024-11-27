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
    
    // Calculate fun statistics
    const netflixBinges = Math.floor(sleepStats.hoursSlept/24/7);
    const dreamCount = Math.floor(sleepStats.hoursSlept * 5).toLocaleString();
    const booksRead = Math.floor(sleepStats.hoursSlept/4); // Assuming 4 hours per book
    
    // Get age-appropriate fun facts
    let funFact = '';
    if (age < 12) {
        funFact = `That's like having ${Math.floor(sleepStats.hoursSlept/2)} super fun naps with your favorite teddy bear! 🧸`;
    } else if (age < 20) {
        funFact = `You could have played ${Math.floor(sleepStats.hoursSlept/3)} video games in that time! 🎮`;
    } else if (age < 30) {
        funFact = `You could have scrolled through ${Math.floor(sleepStats.hoursSlept * 100)} TikToks in that time! 📱`;
    } else {
        funFact = `That's equivalent to ${Math.floor(sleepStats.hoursSlept/2)} cups of coffee! ☕`;
    }

    const insights = `
        <div class="insight-card main-insight">
            <h3>💫 Your Sleep Story</h3>
            <div class="stat-grid">
                <div class="stat-item">
                    <div class="stat-value">${sleepStats.yearsSlept}</div>
                    <div class="stat-label">Years Spent Sleeping</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${recommendedSleep}</div>
                    <div class="stat-label">Recommended Daily Sleep</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${dreamCount}</div>
                    <div class="stat-label">Estimated Dreams</div>
                </div>
            </div>
            <p class="fun-fact">${funFact}</p>
        </div>

        <div class="insight-card personality-card">
            <h3>✨ ${zodiacSign}'s Sleep Profile</h3>
            <p class="zodiac-insight">${zodiacTrait}</p>
            <div class="sleep-fact">Did you know? At ${age}, your sleep cycles are typically ${age < 25 ? 'longer and deeper' : 'lighter but more consistent'}.</div>
        </div>

        <div class="insight-card recommendations">
            <h3>🌙 Your Sleep Blueprint</h3>
            <div class="age-specific">Based on your age (${age}), here's what you need to know:</div>
            <ul class="sleep-tips">
                ${generateAgeSleepChallenges(age)}
            </ul>
        </div>

        <div class="insight-card achievement">
            <h3>🏆 Sleep Achievements</h3>
            <div class="achievements-grid">
                <div class="achievement-item">
                    <span class="achievement-icon">📺</span>
                    <span class="achievement-text">Equivalent to ${netflixBinges} Netflix binges</span>
                </div>
                <div class="achievement-item">
                    <span class="achievement-icon">📚</span>
                    <span class="achievement-text">Could have read ${booksRead} books</span>
                </div>
                <div class="achievement-item">
                    <span class="achievement-icon">🌟</span>
                    <span class="achievement-text">${Math.floor(age * 365)} nights of rest</span>
                </div>
            </div>
        </div>
    `;

    return insights;
}

function generateAgeSleepChallenges(age) {
    const challenges = {
        young: [
            "Digital device exposure before bedtime",
            "Irregular sleep schedule",
            "Caffeine sensitivity",
            "Social media anxiety affecting sleep"
        ],
        adult: [
            "Work-related stress affecting sleep quality",
            "Blue light exposure from devices",
            "Inconsistent sleep schedule",
            "Environmental disturbances"
        ],
        mature: [
            "Changes in natural sleep patterns",
            "Environmental sensitivity",
            "Sleep cycle interruptions",
            "Temperature regulation during sleep"
        ]
    };

    const selectedChallenges = age < 25 ? challenges.young : 
                             age < 50 ? challenges.adult : 
                             challenges.mature;

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
