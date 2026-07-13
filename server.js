const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Path to JSON Database
const dbPath = path.join(__dirname, 'database.json');

// Initialize JSON database if it doesn't exist
if (!fs.existsSync(dbPath)) {
    const initialData = {
        videos: [
            { id: 1, youtube_id: 'W3uKTGUFn_E', category: '9x16', order_index: 0 },
            { id: 2, youtube_id: '8N2MNjHSI5o', category: '9x16', order_index: 1 },
            { id: 3, youtube_id: 'N9nt0eF1980', category: '9x16', order_index: 2 },
            { id: 4, youtube_id: 'ROxO4EkXnsY', category: '9x16', order_index: 3 },
            { id: 5, youtube_id: 'q2fJNLUzT80', category: '9x16', order_index: 4 },
            { id: 6, youtube_id: 'IFETNgQ-lH4', category: '9x16', order_index: 5 },
            { id: 7, youtube_id: 's96PKfsESsM', category: '9x16', order_index: 6 },
            { id: 8, youtube_id: 'oE4w-ftwdKk', category: '9x16', order_index: 7 },
            { id: 9, youtube_id: 'jUfMBDo65jI', category: '9x16', order_index: 8 },
            { id: 10, youtube_id: 'lzQp7hNEem4', category: '9x16', order_index: 9 },
            { id: 11, youtube_id: '1gKldQ13Cw8', category: '16x9', order_index: 10 },
            { id: 12, youtube_id: 'RX_zFTfgTFQ', category: '16x9', order_index: 11 },
            { id: 13, youtube_id: 'mx5utJA77Ok', category: '16x9', order_index: 12 },
            { id: 14, youtube_id: '81pB01k9y_g', category: '16x9', order_index: 13 },
            { id: 15, youtube_id: '5SG-inQw4fY', category: '16x9', order_index: 14 }
        ],
        texts: [
            { lang: 'en', key_name: 'role', content: '2D & 3D Motion Designer · Video Editor · AI Content Creator' },
            { lang: 'ua', key_name: 'role', content: '2D & 3D Моушн-дизайнер · Відеомонтажер · AI Контент-мейкер' },
            { lang: 'en', key_name: 'bio', content: "Motion designer and video editor with 3+ years of experience in 2D and 3D animation, visual effects, and AI production.<br>I work in Adobe Premiere Pro, After Effects, and DaVinci Resolve.<br>I combine classic motion design with modern AI tools to create visuals that don't just look good - they tell stories.<br>I approach every project with attention to detail and a deep understanding of the client's goals. I handle the full production cycle - from concept to final result." },
            { lang: 'ua', key_name: 'bio', content: "Моушн-дизайнер та відеомонтажер з 3+ роками досвіду у 2D та 3D анімації, візуальних ефектах та AI-продакшні.<br>Працюю в Adobe Premiere Pro, After Effects та DaVinci Resolve.<br>Поєдную класичний моушн-дизайн із сучасними AI-інструментами, щоб створювати візуали, які не просто виглядають добре - вони розповідають історії.<br>До кожного проєкту підходжу з увагою до деталей та глибоким розумінням цілей клієнта. Веду повний цикл виробництва - від концепції до фінального результату." },
            { lang: 'en', key_name: 'contact_form_title', content: "LET'S WORK TOGETHER" },
            { lang: 'ua', key_name: 'contact_form_title', content: "ДАВАЙТЕ ПРАЦЮВАТИ РАЗОМ" },
            { lang: 'en', key_name: 'contact_label', content: 'Contact' },
            { lang: 'ua', key_name: 'contact_label', content: 'Контакт' },
            { lang: 'en', key_name: 'cta_subtitle', content: "Shot it but don't know how to put it together? Leave a message." },
            { lang: 'ua', key_name: 'cta_subtitle', content: 'Зняли, але не знаєте як зібрати? Залиште повідомлення.' },
            { lang: 'en', key_name: 'contact_name_label', content: 'Name' },
            { lang: 'ua', key_name: 'contact_name_label', content: "Ім'я" },
            { lang: 'en', key_name: 'contact_name_placeholder', content: 'Your name' },
            { lang: 'ua', key_name: 'contact_name_placeholder', content: 'Ваше ім\'я' },
            { lang: 'en', key_name: 'contact_info_label', content: 'Telegram / Email' },
            { lang: 'ua', key_name: 'contact_info_label', content: 'Telegram / Email' },
            { lang: 'en', key_name: 'contact_msg_label', content: 'About your project' },
            { lang: 'ua', key_name: 'contact_msg_label', content: 'Про ваш проєкт' },
            { lang: 'en', key_name: 'contact_msg_placeholder', content: "Tell me about your project — what you shot, what you need, what's the deadline..." },
            { lang: 'ua', key_name: 'contact_msg_placeholder', content: 'Розкажіть про проєкт — що знімали, що потрібно, який дедлайн...' },
            { lang: 'en', key_name: 'contact_btn', content: 'SEND MESSAGE' },
            { lang: 'ua', key_name: 'contact_btn', content: 'НАДІСЛАТИ' }
        ],
        socials: [
            { id: 1, name: 'Instagram', url: 'https://www.instagram.com/bezlad.cg' },
            { id: 2, name: 'TikTok', url: 'https://www.tiktok.com/@bezlad.cg' },
            { id: 3, name: 'YouTube', url: 'https://www.youtube.com/@bezlad13' },
            { id: 4, name: 'Telegram', url: 'https://t.me/bezlad13' },
            { id: 5, name: 'LinkedIn', url: 'https://www.linkedin.com/in/bezlad' }
        ],
        analytics: []
    };
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 4));
}

// Helpers to read/write JSON DB
function readDB() {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading JSON DB, returning empty", e);
        return { videos: [], texts: [], analytics: [] };
    }
}

function writeDB(data) {
    const tempPath = dbPath + '.tmp';
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 4));
    fs.renameSync(tempPath, dbPath);
}

// Middleware for auth
function requireAuth(req, res, next) {
    const { password } = req.body;
    if (password !== (process.env.ADMIN_PASSWORD || 'admin123')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

// ----------------------
// API: VIDEOS
// ----------------------
app.get('/api/videos', (req, res) => {
    const db = readDB();
    // Sort by order_index ASC, then id DESC
    const sorted = [...db.videos].sort((a, b) => {
        if (a.order_index !== b.order_index) {
            return a.order_index - b.order_index;
        }
        return b.id - a.id;
    });
    res.json(sorted);
});

app.post('/api/videos', requireAuth, (req, res) => {
    const { youtube_id, category } = req.body;
    if (!youtube_id || !category) return res.status(400).json({ error: 'Missing data' });

    const db = readDB();
    const nextId = db.videos.length > 0 ? Math.max(...db.videos.map(v => v.id)) + 1 : 1;
    const nextOrder = db.videos.length > 0 ? Math.max(...db.videos.map(v => v.order_index)) + 1 : 0;
    
    const newVideo = { id: nextId, youtube_id, category, order_index: nextOrder };
    db.videos.push(newVideo);
    writeDB(db);

    res.json(newVideo);
});

app.delete('/api/videos/:id', (req, res) => {
    const { password } = req.body;
    if (password !== (process.env.ADMIN_PASSWORD || 'admin123')) return res.status(401).json({ error: 'Unauthorized' });

    const id = parseInt(req.params.id);
    const db = readDB();
    const initialLength = db.videos.length;
    db.videos = db.videos.filter(v => v.id !== id);
    writeDB(db);

    res.json({ deleted: initialLength - db.videos.length });
});

app.post('/api/videos/reorder', requireAuth, (req, res) => {
    const { order } = req.body; // array of { id, order_index }
    if (!Array.isArray(order)) return res.status(400).json({ error: 'Invalid format' });

    const db = readDB();
    order.forEach(item => {
        const video = db.videos.find(v => v.id === parseInt(item.id));
        if (video) {
            video.order_index = parseInt(item.order_index);
        }
    });
    writeDB(db);
    res.json({ success: true });
});

// ----------------------
// API: TEXTS (CMS)
// ----------------------
app.get('/api/texts', (req, res) => {
    const db = readDB();
    const result = { en: {}, ua: {} };
    db.texts.forEach(r => {
        if (result[r.lang]) result[r.lang][r.key_name] = r.content;
    });
    res.json(result);
});

app.post('/api/texts', requireAuth, (req, res) => {
    const { lang, key_name, content } = req.body;
    if (!lang || !key_name || !content) return res.status(400).json({ error: 'Missing data' });

    // Basic XSS Protection: Strip all HTML tags except <br>
    const safeContent = content.toString().replace(/<(?!br\s*\/?)[^>]+>/gi, '');

    const db = readDB();
    const existing = db.texts.find(t => t.lang === lang && t.key_name === key_name);
    if (existing) {
        existing.content = safeContent;
    } else {
        db.texts.push({ id: Date.now(), lang, key_name, content: safeContent });
    }
    writeDB(db);
    res.json({ success: true });
});

// ----------------------
// API: TELEGRAM CONTACT
// ----------------------
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 requests per windowMs
    message: { error: 'Забагато запитів з вашої IP-адреси. Спробуйте пізніше.' }
});

app.post('/api/contact', contactLimiter, async (req, res) => {
    const { name, contact, message } = req.body;
    if (!name || !contact || !message) return res.status(400).json({ error: 'Missing fields' });

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        return res.status(500).json({ error: 'Telegram bot not configured' });
    }

    const text = `🔥 <b>Нова заявка з Портфоліо!</b>\n\n👤 <b>Ім'я:</b> ${name}\n📞 <b>Контакт:</b> ${contact}\n💬 <b>Повідомлення:</b>\n${message}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });
        const data = await response.json();
        if (data.ok) {
            res.json({ success: true });
        } else {
            console.error('Telegram API Error:', data);
            res.status(500).json({ error: 'Failed to send message' });
        }
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).json({ error: 'Failed to connect to Telegram API' });
    }
});

// ----------------------
// API: ANALYTICS
// ----------------------
app.post('/api/track', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const db = readDB();
    if (!db.analytics) db.analytics = [];
    
    const existing = db.analytics.find(a => a.date === today);
    if (existing) {
        existing.views = (existing.views || 0) + 1;
    } else {
        db.analytics.push({ date: today, views: 1 });
    }
    writeDB(db);
    res.json({ success: true });
});

app.post('/api/analytics', requireAuth, (req, res) => {
    const db = readDB();
    const stats = (db.analytics || []).slice(-30).reverse();
    res.json(stats);
});

// ----------------------
// API: SOCIALS
// ----------------------
app.get('/api/socials', (req, res) => {
    const db = readDB();
    if (!db.socials) {
        db.socials = [
            { id: 1, name: 'Instagram', url: 'https://www.instagram.com/bezlad.cg' },
            { id: 2, name: 'TikTok', url: 'https://www.tiktok.com/@bezlad.cg' },
            { id: 3, name: 'YouTube', url: 'https://www.youtube.com/@bezlad13' },
            { id: 4, name: 'Telegram', url: 'https://t.me/bezlad13' },
            { id: 5, name: 'LinkedIn', url: 'https://www.linkedin.com/in/bezlad' }
        ];
        writeDB(db);
    }
    res.json(db.socials);
});

app.post('/api/socials', requireAuth, (req, res) => {
    const { id, url } = req.body;
    if (!id || !url) return res.status(400).json({ error: 'Missing data' });

    const db = readDB();
    if (!db.socials) db.socials = [];
    const social = db.socials.find(s => s.id === parseInt(id));
    if (!social) return res.status(404).json({ error: 'Social not found' });

    // Basic URL validation
    try { new URL(url); } catch { return res.status(400).json({ error: 'Invalid URL' }); }

    social.url = url;
    writeDB(db);
    res.json({ success: true });
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
