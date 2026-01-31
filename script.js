// Chart.js Configuration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Analytics Chart
    initializeAnalyticsChart();
    
    // Setup Event Listeners
    setupEventListeners();
});

function initializeAnalyticsChart() {
    const ctx = document.getElementById('analyticsChart');
    
    if (!ctx) return;
    
    const chartData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [{
            label: 'Visitors',
            data: [170, 390, 150, 200, 290, 160, 180, 220, 150, 760, 280, 100, 130, 200, 255, 180, 300, 105, 95, 370, 150, 220, 280],
            backgroundColor: 'rgba(91, 33, 182, 0.7)',
            borderColor: 'rgba(91, 33, 182, 1)',
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: 'rgba(91, 33, 182, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            hoverBackgroundColor: 'rgba(91, 33, 182, 0.9)'
        }]
    };

    const chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 13,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 12
                    },
                    cornerRadius: 6,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return 'Visitors: ' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 400,
                    ticks: {
                        stepSize: 100,
                        font: {
                            size: 12,
                            weight: 500
                        },
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: 'rgba(156, 163, 175, 0.1)',
                        drawBorder: false,
                        lineWidth: 1
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 12,
                            weight: 500
                        },
                        color: '#9CA3AF'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    };

    // Create the chart
    window.analyticsChart = new Chart(ctx, chartConfig);
}

function setupEventListeners() {
    // Sidebar Toggle for Mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.sidebar') && 
            !event.target.closest('.sidebar-toggle') &&
            !event.target.closest('.menu-toggle')) {
            sidebar.classList.remove('active');
        }
    });

    // Navigation Menu Items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', function(e) {
                // Remove active class from all items
                navItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');
            });
        }
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            // Change icon
            if (isDarkMode) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // Load saved theme preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Notification Button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            alert('You have 1 new notification!');
        });
    }

    // Filter Buttons for Chart
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateChartData(this.textContent.trim());
        });
    });

    // User Profile
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            alert('User profile clicked! Redirect to profile page.');
        });
    }
}

function updateChartData(period) {
    if (!window.analyticsChart) return;

    let newData;

    switch(period) {
        case '24 hours':
            newData = [45, 52, 48, 61, 55, 67, 58, 72, 65, 78, 88, 76, 92, 85, 78, 91, 88, 95, 101, 98, 105, 110, 108];
            break;
        case '7 days':
            newData = [160, 290, 180, 240, 320, 220, 280];
            window.analyticsChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            break;
        case '30 days':
            newData = [170, 180, 160, 190, 220, 200, 210, 190, 230, 250, 240, 260, 280, 270, 290, 310, 300, 320, 340, 330, 350, 370, 360];
            window.analyticsChart.data.labels = Array.from({length: 23}, (_, i) => String(i + 1));
            break;
        case '12 months':
            newData = [280, 350, 310, 380, 420, 390, 450, 480, 520, 490, 550, 600];
            window.analyticsChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            break;
        default:
            return;
    }

    window.analyticsChart.data.datasets[0].data = newData;
    window.analyticsChart.update();
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.5s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card, .chart-card, .stat-box').forEach(element => {
    observer.observe(element);
});
