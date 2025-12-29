// ============================================
// 网站主JavaScript文件
// 包含所有页面的交互功能
// ============================================

// 配置信息
const CONFIG = {
    username: '土鸡蛋',
    startDate: '2023-01-01', // 相识日期
    musicEnabled: true,
    currentTheme: localStorage.getItem('theme') || 'pink'
};

// 祝福语库
const WISHES = [
    "愿新年的第一缕阳光，带去我最诚挚的祝福。元旦快乐，土鸡蛋！",
    "新的一年，愿你的每一天都充满阳光，每个梦想都能实现。",
    "元旦的钟声敲响，祝你平安喜乐，万事如意！",
    "愿这个元旦，成为我们美好回忆的起点。",
    "新的一年，新的开始，愿所有的美好都如期而至。",
    "祝你元旦快乐，心想事成，笑口常开！",
    "愿新年的每一天都充满欢笑，每一刻都充满温馨。",
    "元旦快乐！愿幸福永远陪伴你左右。",
    "新的一年，愿你身体健康，工作顺利，天天开心！",
    "元旦的祝福，送给最特别的你，愿我们的友谊长存！"
];

// 心情描述
const MOODS = {
    happy: {
        emoji: '😊',
        text: '今天是个开心的日子！愿你一直保持这份好心情。',
        color: '#FFD166'
    },
    excited: {
        emoji: '😆',
        text: '哇！充满活力的一天！让这份兴奋感染每一天。',
        color: '#EF476F'
    },
    peaceful: {
        emoji: '😌',
        text: '平静而美好的一天。享受这份宁静的时光吧。',
        color: '#06D6A0'
    },
    curious: {
        emoji: '🤔',
        text: '好奇宝宝模式启动！探索新的一天吧！',
        color: '#118AB2'
    }
};

// ============================================
// DOM加载完成后执行
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化...');
    
    // 初始化所有模块
    initNavigation();
    initFloatingHearts();
    initTheme();
    initStats();
    initNewYearCountdown();
    initMusicPlayer();
    initWishGenerator();
    initMoodSelector();
    initQuotesCarousel();
    initBackToTop();
    initPageVisits();
    
    // 更新页面信息
    updatePageInfo();
    
    console.log('网站初始化完成！');
});

// ============================================
// 导航栏功能
// ============================================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (!hamburger || !navMenu || !navbar) return;
    
    // 汉堡菜单点击事件
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 点击导航链接时关闭菜单
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ============================================
// 浮动爱心背景
// ============================================
function initFloatingHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;
    
    // 创建爱心
    const heartCount = 15;
    for (let i = 0; i < heartCount; i++) {
        createFloatingHeart(heartsContainer);
    }
    
    // 点击页面添加爱心
    document.addEventListener('click', function(e) {
        if (Math.random() > 0.3) return; // 30%几率触发
        
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.color = getRandomColor();
        heart.style.animationDuration = (Math.random() * 10 + 5) + 's';
        
        heartsContainer.appendChild(heart);
        
        // 动画结束后移除
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 15000);
    });
}

function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.color = getRandomColor();
    heart.style.animationDuration = (Math.random() * 10 + 5) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(heart);
}

function getRandomColor() {
    const colors = [
        '#FF6B8B', '#FF8E53', '#4ECDC4', '#9C88FF', 
        '#3498DB', '#2ECC71', '#F1C40F', '#E74C3C'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ============================================
// 主题切换功能
// ============================================
function initTheme() {
    // 应用保存的主题
    document.documentElement.setAttribute('data-theme', CONFIG.currentTheme);
    
    // 设置主题按钮状态
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.getAttribute('data-theme') === CONFIG.currentTheme) {
            btn.classList.add('active');
        }
        
        // 主题切换事件
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            switchTheme(theme);
        });
    });
}

function switchTheme(theme) {
    // 更新配置
    CONFIG.currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    // 应用主题
    document.documentElement.setAttribute('data-theme', theme);
    
    // 更新按钮状态
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === theme) {
            btn.classList.add('active');
        }
    });
    
    // 显示通知
    showNotification(`已切换到${getThemeName(theme)}主题`);
}

function getThemeName(theme) {
    const names = {
        pink: '粉色',
        purple: '紫色',
        blue: '蓝色',
        green: '绿色'
    };
    return names[theme] || theme;
}

// ============================================
// 统计功能
// ============================================
function initStats() {
    // 初始化统计数据
    let stats = JSON.parse(localStorage.getItem('pageStats')) || {
        visits: 1,
        clicks: 0,
        wishes: 0,
        timeSpent: 0,
        startTime: Date.now()
    };
    
    // 更新访问次数
    stats.visits = (stats.visits || 0) + 1;
    
    // 保存到localStorage
    localStorage.setItem('pageStats', JSON.stringify(stats));
    
    // 更新显示
    updateStatsDisplay(stats);
    
    // 点击统计
    document.addEventListener('click', function() {
        stats.clicks = (stats.clicks || 0) + 1;
        localStorage.setItem('pageStats', JSON.stringify(stats));
        document.getElementById('clickCount').textContent = stats.clicks;
    });
    
    // 时间统计
    setInterval(function() {
        stats.timeSpent = (stats.timeSpent || 0) + 1;
        localStorage.setItem('pageStats', JSON.stringify(stats));
        
        const minutes = Math.floor(stats.timeSpent / 60);
        document.getElementById('timeSpent').textContent = minutes;
    }, 60000); // 每分钟更新一次
}

function updateStatsDisplay(stats) {
    const visitCount = document.getElementById('visitCount');
    const clickCount = document.getElementById('clickCount');
    const wishCount = document.getElementById('wishCount');
    
    if (visitCount) visitCount.textContent = stats.visits || 1;
    if (clickCount) clickCount.textContent = stats.clicks || 0;
    if (wishCount) wishCount.textContent = stats.wishes || 0;
    
    const minutes = Math.floor((stats.timeSpent || 0) / 60);
    const timeSpent = document.getElementById('timeSpent');
    if (timeSpent) timeSpent.textContent = minutes;
}

function resetStats() {
    if (confirm('确定要重置所有统计吗？')) {
        const resetStats = {
            visits: 1,
            clicks: 0,
            wishes: 0,
            timeSpent: 0,
            startTime: Date.now()
        };
        
        localStorage.setItem('pageStats', JSON.stringify(resetStats));
        updateStatsDisplay(resetStats);
        showNotification('统计已重置');
    }
}

// ============================================
// 新年倒计时
// ============================================
function initNewYearCountdown() {
    const daysElement = document.getElementById('days-until-ny');
    if (!daysElement) return;
    
    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const nextYear = currentYear + 1;
        const newYear = new Date(nextYear, 0, 1, 0, 0, 0);
        
        const diff = newYear - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        daysElement.textContent = days;
        
        // 添加动画效果
        if (days <= 10) {
            daysElement.style.color = '#EF476F';
            daysElement.style.animation = 'pulse 1s infinite';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // 每分钟更新一次
}

// ============================================
// 音乐播放器
// ============================================
function initMusicPlayer() {
    const music = document.getElementById('backgroundMusic');
    if (!music) return;
    
    const musicBtn = document.querySelector('.music-btn');
    const musicSelect = document.getElementById('musicSelect');
    
    if (!musicBtn) return;
    
    // 设置音量
    music.volume = 0.5;
    
    // 音乐按钮点击事件
    musicBtn.addEventListener('click', function() {
        toggleMusic();
    });
    
    // 音乐选择
    if (musicSelect) {
        musicSelect.addEventListener('change', function() {
            const musicUrls = [
                'https://assets.codepen.io/1468070/Spring.mp3',
                'https://assets.codepen.io/1468070/Happy.mp3',
                'https://assets.codepen.io/1468070/Love.mp3'
            ];
            
            const selectedIndex = parseInt(this.value) - 1;
            if (musicUrls[selectedIndex]) {
                music.src = musicUrls[selectedIndex];
                music.load();
                
                if (!music.paused) {
                    music.play().catch(e => console.log('播放失败:', e));
                }
                
                showNotification(`已切换到${this.options[this.selectedIndex].text}`);
            }
        });
    }
}

function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicBtn = document.querySelector('.music-btn');
    
    if (!music || !musicBtn) return;
    
    if (music.paused) {
        music.play().then(() => {
            musicBtn.innerHTML = '<i class="fas fa-pause"></i> 暂停音乐';
            showNotification('音乐已开始播放');
        }).catch(e => {
            console.log('播放失败:', e);
            showNotification('音乐播放失败，请检查浏览器设置');
        });
    } else {
        music.pause();
        musicBtn.innerHTML = '<i class="fas fa-play"></i> 播放音乐';
        showNotification('音乐已暂停');
    }
}

// ============================================
// 祝福生成器
// ============================================
function initWishGenerator() {
    const wishBtn = document.getElementById('generateWish');
    const wishDisplay = document.getElementById('wishDisplay');
    
    if (!wishBtn || !wishDisplay) return;
    
    wishBtn.addEventListener('click', generateBlessing);
    
    // 页面加载时生成一个祝福
    setTimeout(() => {
        generateBlessing();
    }, 1000);
}

function generateBlessing() {
    const wishDisplay = document.getElementById('wishDisplay');
    if (!wishDisplay) return;
    
    // 随机选择祝福语
    const randomWish = WISHES[Math.floor(Math.random() * WISHES.length)];
    
    // 更新显示
    wishDisplay.innerHTML = `
        <div class="fade-in">
            <i class="fas fa-quote-left" style="color: var(--primary-color); margin-right: 10px;"></i>
            ${randomWish}
            <i class="fas fa-quote-right" style="color: var(--primary-color); margin-left: 10px;"></i>
        </div>
    `;
    
    // 添加动画效果
    wishDisplay.style.animation = 'none';
    setTimeout(() => {
        wishDisplay.style.animation = 'fadeIn 0.5s ease';
    }, 10);
    
    // 更新统计
    let stats = JSON.parse(localStorage.getItem('pageStats')) || {};
    stats.wishes = (stats.wishes || 0) + 1;
    localStorage.setItem('pageStats', JSON.stringify(stats));
    
    const wishCount = document.getElementById('wishCount');
    if (wishCount) wishCount.textContent = stats.wishes;
    
    // 显示通知
    showNotification('已生成新的祝福语！');
}

// ============================================
// 心情记录
// ============================================
function initMoodSelector() {
    const moodBtns = document.querySelectorAll('.mood-btn');
    const moodDisplay = document.getElementById('moodDisplay');
    
    if (!moodBtns.length || !moodDisplay) return;
    
    // 加载保存的心情
    const savedMood = localStorage.getItem('todayMood');
    if (savedMood) {
        setMoodDisplay(savedMood, moodDisplay);
    }
    
    // 心情按钮点击事件
    moodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            setMood(mood, moodDisplay);
            
            // 更新按钮状态
            moodBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function setMood(mood, moodDisplay) {
    const moodData = MOODS[mood];
    if (!moodData) return;
    
    // 保存心情
    localStorage.setItem('todayMood', mood);
    localStorage.setItem('moodTime', Date.now());
    
    // 更新显示
    setMoodDisplay(mood, moodDisplay);
    
    // 显示通知
    showNotification(`已记录心情：${moodData.emoji} ${mood}`);
}

function setMoodDisplay(mood, moodDisplay) {
    const moodData = MOODS[mood];
    if (!moodData || !moodDisplay) return;
    
    moodDisplay.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <span style="font-size: 2rem;">${moodData.emoji}</span>
            <div>
                <strong style="color: var(--text-color);">当前心情：${mood}</strong>
                <p style="color: var(--text-light); margin-top: 5px;">${moodData.text}</p>
            </div>
        </div>
    `;
    
    moodDisplay.style.borderColor = moodData.color;
}

// ============================================
// 祝福语轮播
// ============================================
function initQuotesCarousel() {
    const slides = document.querySelectorAll('.quote-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length || !dots.length) return;
    
    let currentSlide = 0;
    
    // 自动轮播
    setInterval(() => {
        goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.quote-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (index < 0 || index >= slides.length) return;
    
    // 隐藏所有幻灯片
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // 更新所有点
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // 显示当前幻灯片
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // 更新当前索引
    window.currentQuoteSlide = index;
}

function nextQuote() {
    const slides = document.querySelectorAll('.quote-slide');
    const nextIndex = (window.currentQuoteSlide || 0) + 1;
    goToSlide(nextIndex >= slides.length ? 0 : nextIndex);
}

function prevQuote() {
    const slides = document.querySelectorAll('.quote-slide');
    const prevIndex = (window.currentQuoteSlide || 0) - 1;
    goToSlide(prevIndex < 0 ? slides.length - 1 : prevIndex);
}

function goToQuote(index) {
    goToSlide(index);
}

// ============================================
// 回到顶部按钮
// ============================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // 点击回到顶部
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 页面访问统计
// ============================================
function initPageVisits() {
    const today = new Date().toDateString();
    let pageVisits = JSON.parse(localStorage.getItem('pageVisits')) || {};
    
    if (pageVisits.date !== today) {
        pageVisits = {
            date: today,
            count: 1
        };
    } else {
        pageVisits.count = (pageVisits.count || 0) + 1;
    }
    
    localStorage.setItem('pageVisits', JSON.stringify(pageVisits));
    
    // 显示访问次数（可选）
    const visitCount = pageVisits.count;
    console.log(`今天是第${visitCount}次访问本页面`);
}

// ============================================
// 更新页面信息
// ============================================
function updatePageInfo() {
    // 更新最后更新时间
    const lastUpdate = document.getElementById('lastUpdate');
    if (lastUpdate) {
        const now = new Date();
        lastUpdate.textContent = now.toLocaleDateString('zh-CN') + ' ' + now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    }
    
    // 更新相识天数
    const startDate = new Date(CONFIG.startDate);
    const today = new Date();
    const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    
    // 可以在这里显示相识天数
    console.log(`与${CONFIG.username}相识已 ${daysDiff} 天`);
}

// ============================================
// 工具函数
// ============================================
function showNotification(message, duration = 3000) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;
    
    // 样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-color);
        padding: 15px 25px;
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-heavy);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease ${duration}ms forwards;
        border-left: 4px solid var(--primary-color);
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, duration + 300);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .notification i {
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);