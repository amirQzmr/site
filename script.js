document.addEventListener('DOMContentLoaded', () => {

    // 1. Управление фоновой музыкой
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicStatus = document.getElementById('musicStatus');
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicStatus.textContent = 'Өлеңді қосу';
            musicToggle.querySelector('i').className = 'fas fa-music';
        } else {
            bgMusic.play().then(() => {
                musicStatus.textContent = 'Өлеңді өшіру';
                musicToggle.querySelector('i').className = 'fas fa-pause';
            }).catch(error => {
                console.log("Воспроизведение заблокировано браузером:", error);
            });
        }
        isPlaying = !isPlaying;
    });

    // === ЛОГИКА ТАЙМЕРА ОБРАТНОГО ОТСЧЕТА ===
// Укажите дату и время дня рождения Алии (Год-Месяц-ДеньTЧасы:Минуты:Секунды)
const targetDate = new Date('2026-10-14T00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    // Элементы
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl) return;

    if (difference > 0) {
        // До дня рождения (обратный отсчёт)
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    } else {
        // День рождения наступил / идёт прямо сейчас!
        const elapsed = Math.abs(difference);
        const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
        const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');

        const titleEl = document.querySelector('.countdown-title');
        if (titleEl) {
            titleEl.textContent = '🎉 18-ге толғанына:';
        }
    }
}

// Обновляем таймер каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown();

    // 2. Управление кастомным видеоплеером
    const videoWrapper = document.querySelector('.custom-video-wrapper');
    const video = document.getElementById('birthdayVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const bigPlayBtn = document.getElementById('bigPlayBtn');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const videoTime = document.getElementById('videoTime');
    const muteBtn = document.getElementById('muteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    if (video) {
        function togglePlay() {
            if (video.paused) {
                video.play();
                playPauseBtn.querySelector('i').className = 'fas fa-pause';
                bigPlayBtn.classList.add('hidden');
                videoWrapper.classList.remove('paused');
            } else {
                video.pause();
                playPauseBtn.querySelector('i').className = 'fas fa-play';
                bigPlayBtn.classList.remove('hidden');
                videoWrapper.classList.add('paused');
            }
        }

        playPauseBtn.addEventListener('click', togglePlay);
        bigPlayBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);

        // Обновление прогресс-бара и времени
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;

            const currentMin = Math.floor(video.currentTime / 60);
            const currentSec = Math.floor(video.currentTime % 60);
            const durationMin = Math.floor((video.duration || 0) / 60);
            const durationSec = Math.floor((video.duration || 0) % 60);

            videoTime.textContent = 
                `${currentMin}:${currentSec < 10 ? '0' : ''}${currentSec} / ${durationMin}:${durationSec < 10 ? '0' : ''}${durationSec}`;
        });

        // Перемотка по клику на шкалу
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });

        // Включение / Выключение звука
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            if (video.muted) {
                muteBtn.querySelector('i').className = 'fas fa-volume-mute';
            } else {
                muteBtn.querySelector('i').className = 'fas fa-volume-up';
            }
        });

        // Полноэкранный режим
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                if (videoWrapper.requestFullscreen) {
                    videoWrapper.requestFullscreen();
                } else if (videoWrapper.webkitRequestFullscreen) {
                    videoWrapper.webkitRequestFullscreen();
                }
                fullscreenBtn.querySelector('i').className = 'fas fa-compress';
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                fullscreenBtn.querySelector('i').className = 'fas fa-expand';
            }
        });
    }

    // 3. Переворот карточек по клику
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });


    // 5. Анимированные плавающие сердечки
    const heartsContainer = document.getElementById('heartsContainer');
    const heartIcons = ['💖', '🌸', '✨', '💕', '☕'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        heart.style.fontSize = Math.random() * 15 + 15 + 'px';
        
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 7000);
    }

    setInterval(createHeart, 800);
});

// Функция лайка для комментариев
function toggleLike(btn) {
    const countSpan = btn.querySelector('span');
    let currentLikes = parseInt(countSpan.textContent);
    
    if (btn.classList.contains('liked')) {
        btn.classList.remove('liked');
        btn.querySelector('i').className = 'far fa-thumbs-up';
        countSpan.textContent = currentLikes - 1;
    } else {
        btn.classList.add('liked');
        btn.querySelector('i').className = 'fas fa-thumbs-up';
        countSpan.textContent = currentLikes + 1;
    }
}

// Защита от XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// === ИНИЦИАЛИЗАЦИЯ FIREBASE ===
// Замените данные ниже на ваши из консоли Firebase (Project Settings)
const firebaseConfig = {
    apiKey: "AIzaSyDy60bQqQPLcWUap7QQI6P1HdTgn7S-tVM",
    authDomain: "aliya-birthday.firebaseapp.com",
    databaseURL: "https://aliya-birthday-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "aliya-birthday",
    storageBucket: "aliya-birthday.firebasestorage.app",
    messagingSenderId: "486922102220",
    appId: "1:486922102220:web:4418d9187e4643bbb7e969",
    measurementId: "G-X3GVWBWC32"
};

// Инициализируем Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();
const commentsRef = database.ref('comments');

// Функция получения списков лайкнутых комментариев из localStorage
function getLikedComments() {
    return JSON.parse(localStorage.getItem('liked_comments') || '[]');
}

function setLikedComment(commentId, isLiked) {
    let liked = getLikedComments();
    if (isLiked) {
        if (!liked.includes(commentId)) liked.push(commentId);
    } else {
        liked = liked.filter(id => id !== commentId);
    }
    localStorage.setItem('liked_comments', JSON.stringify(liked));
}

document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const userNameInput = document.getElementById('userName');
    const userCommentInput = document.getElementById('userComment');
    const commentsList = document.getElementById('commentsList');

    const avatarColors = ['#DDBEA9', '#FFB5A7', '#F28482', '#6F5E53', '#A5A58D', '#B5838D'];

    // 1. Отправка основного комментария
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = userNameInput.value.trim();
            const text = userCommentInput.value.trim();

            if (name && text) {
                const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
                
                commentsRef.push({
                    name: name,
                    text: text,
                    color: randomColor,
                    likes: 0,
                    timestamp: Date.now()
                });

                userNameInput.value = '';
                userCommentInput.value = '';
            }
        });
    }

    // 2. Отображение комментариев в реальном времени
    commentsRef.on('child_added', (snapshot) => {
        const commentId = snapshot.key;
        const data = snapshot.val();

        const firstLetter = data.name.charAt(0).toUpperCase();
        const timeFormatted = formatTime(data.timestamp);
        const likedList = getLikedComments();
        const isLiked = likedList.includes(commentId);

        const commentElement = document.createElement('div');
        commentElement.classList.add('yt-comment');
        commentElement.setAttribute('id', `comment-${commentId}`);

        commentElement.innerHTML = `
            <div class="comment-avatar" style="background-color: ${data.color};">${firstLetter}</div>
            <div class="comment-content">
                <div class="comment-author">${escapeHtml(data.name)} <span class="comment-time">${timeFormatted}</span></div>
                <div class="comment-text">${escapeHtml(data.text)}</div>
                <div class="comment-actions">
                    <button class="like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${commentId}')">
                        <i class="${isLiked ? 'fas' : 'far'} fa-thumbs-up"></i> 
                        <span id="like-count-${commentId}">${data.likes || 0}</span>
                    </button>
                    <span class="reply-text" onclick="toggleReplyForm('${commentId}')">Ответить</span>
                </div>

                <!-- Форма ответа (скрыта по умолчанию) -->
                <div id="reply-form-${commentId}" class="reply-form" style="display: none; margin-top: 10px;">
                    <div style="display: flex; gap: 8px;">
                        <input type="text" id="reply-name-${commentId}" placeholder="Ваше имя..." style="width: 35%; font-size: 0.85rem; border-bottom: 1px solid var(--coffee-light); border-top:none; border-left:none; border-right:none; background:transparent; outline:none;">
                        <input type="text" id="reply-text-${commentId}" placeholder="Написать ответ..." style="width: 65%; font-size: 0.85rem; border-bottom: 1px solid var(--coffee-light); border-top:none; border-left:none; border-right:none; background:transparent; outline:none;">
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px;">
                        <button onclick="toggleReplyForm('${commentId}')" style="background:none; border:none; font-size:0.8rem; cursor:pointer; color:var(--coffee-medium);">Отмена</button>
                        <button onclick="sendReply('${commentId}')" class="btn-submit" style="padding: 4px 12px; font-size:0.8rem;">Ответить</button>
                    </div>
                </div>

                <!-- Контейнер для ответов -->
                <div id="replies-list-${commentId}" class="replies-list" style="margin-top: 10px; padding-left: 15px; border-left: 2px solid var(--pink-soft);"></div>
            </div>
        `;

        commentsList.prepend(commentElement);

        // Слушаем появление ответов на этот комментарий
        database.ref(`comments/${commentId}/replies`).on('child_added', (replySnapshot) => {
            const reply = replySnapshot.val();
            const replyLetter = reply.name.charAt(0).toUpperCase();
            const repliesContainer = document.getElementById(`replies-list-${commentId}`);

            if (repliesContainer) {
                const replyEl = document.createElement('div');
                replyEl.style.cssText = "display: flex; gap: 10px; margin-top: 10px;";
                replyEl.innerHTML = `
                    <div class="comment-avatar" style="background-color: ${reply.color}; width: 28px; height: 28px; font-size: 0.75rem;">${replyLetter}</div>
                    <div>
                        <div class="comment-author" style="font-size: 0.8rem;">${escapeHtml(reply.name)} <span class="comment-time">${formatTime(reply.timestamp)}</span></div>
                        <div class="comment-text" style="font-size: 0.85rem;">${escapeHtml(reply.text)}</div>
                    </div>
                `;
                repliesContainer.appendChild(replyEl);
            }
        });
    });

    // 3. Синхронизация количества лайков
    commentsRef.on('child_changed', (snapshot) => {
        const commentId = snapshot.key;
        const data = snapshot.val();
        const likeCountEl = document.getElementById(`like-count-${commentId}`);
        if (likeCountEl) {
            likeCountEl.textContent = data.likes || 0;
        }
    });
});

// === ЛОГИКА 1 ЛАЙКА НА ПОЛЬЗОВАТЕЛЯ ===
function toggleLike(commentId) {
    const likedList = getLikedComments();
    const isLiked = likedList.includes(commentId);
    const commentBtn = document.querySelector(`#comment-${commentId} .like-btn`);
    const icon = commentBtn ? commentBtn.querySelector('i') : null;

    const likeRef = database.ref(`comments/${commentId}/likes`);

    likeRef.transaction((currentLikes) => {
        if (isLiked) {
            return (currentLikes || 1) - 1; // Убираем лайк
        } else {
            return (currentLikes || 0) + 1; // Ставим лайк
        }
    }, (error, committed) => {
        if (committed) {
            setLikedComment(commentId, !isLiked);
            if (commentBtn && icon) {
                if (!isLiked) {
                    commentBtn.classList.add('liked');
                    icon.className = 'fas fa-thumbs-up';
                } else {
                    commentBtn.classList.remove('liked');
                    icon.className = 'far fa-thumbs-up';
                }
            }
        }
    });
}

// === ЛОГИКА ОТВЕТОВ ===
function toggleReplyForm(commentId) {
    const form = document.getElementById(`reply-form-${commentId}`);
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
}

function sendReply(commentId) {
    const nameInput = document.getElementById(`reply-name-${commentId}`);
    const textInput = document.getElementById(`reply-text-${commentId}`);

    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (name && text) {
        const avatarColors = ['#DDBEA9', '#FFB5A7', '#F28482', '#6F5E53', '#A5A58D', '#B5838D'];
        const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

        database.ref(`comments/${commentId}/replies`).push({
            name: name,
            text: text,
            color: randomColor,
            timestamp: Date.now()
        });

        nameInput.value = '';
        textInput.value = '';
        toggleReplyForm(commentId);
    }
}

// Вспомогательные функции
function formatTime(timestamp) {
    if (!timestamp) return 'Только что';
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return 'Только что';
    if (diff < 3600) return `${Math.floor(diff / 60)} мин. назад`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ч. назад`;
    return `${Math.floor(diff / 86400)} дн. назад`;
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}
