/* ===== SKADO HOTEL & SUITES — MAIN JS ===== */

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav?.classList.toggle('open');
  document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
});

mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== AOS-LIKE SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('aos-animate'), delay);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// ===== AI CONCIERGE CHATBOT =====
const chatBtn = document.getElementById('chatBtn');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

let chatHistory = [];

const HOTEL_CONTEXT = `You are Adé, the AI concierge for Skado Hotel and Suites, a premium hotel in Oyo State, Nigeria. You are helpful, warm, and knowledgeable about the hotel.

Hotel facts:
- Location: Oyo State, Nigeria (near Ibadan)
- Rooms: Standard Room (₦25,000/night), Deluxe Room (₦40,000/night), Executive Suite (₦65,000/night)
- Amenities: 24-hour power supply (generator backup), high-speed WiFi, restaurant & bar, free parking, security, laundry service, conference hall
- Check-in: 2:00 PM | Check-out: 12:00 PM
- WhatsApp bookings: +234 801 234 5678
- Email: reservations@skadohotel.com
- The hotel caters to Nigerian business travelers, families, and event guests

Answer questions about the hotel, help with bookings (direct to WhatsApp or the booking page), describe rooms and amenities. Be concise (2-3 sentences max), friendly, and professional. If asked about something unrelated to the hotel, politely redirect.`;

chatBtn?.addEventListener('click', () => {
  chatWindow?.classList.toggle('open');
  if (chatWindow?.classList.contains('open') && chatMessages.children.length === 0) {
    addBotMessage("Welcome to Skado Hotel & Suites! I'm Adé, your personal concierge. How may I assist you today — room availability, amenities, or bookings?");
  }
});

chatClose?.addEventListener('click', () => {
  chatWindow?.classList.remove('open');
});

chatSend?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

function addBotMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'msg bot';
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addUserMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'msg user';
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const msg = document.createElement('div');
  msg.className = 'msg bot typing';
  msg.id = 'typingIndicator';
  msg.textContent = 'Adé is typing…';
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msg;
}

async function sendMessage() {
  const text = chatInput?.value.trim();
  if (!text) return;
  chatInput.value = '';
  addUserMessage(text);

  chatHistory.push({ role: 'user', content: text });
  const typingEl = showTyping();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: HOTEL_CONTEXT,
        messages: chatHistory
      })
    });

    const data = await response.json();
    typingEl.remove();

    const reply = data.content?.[0]?.text || "I'm sorry, I couldn't process that. Please try again or contact us on WhatsApp.";
    chatHistory.push({ role: 'assistant', content: reply });
    addBotMessage(reply);

  } catch (err) {
    typingEl.remove();
    addBotMessage("I'm having trouble connecting right now. Please reach us on WhatsApp at +234 801 234 5678 for immediate assistance.");
    console.error('Chat API error:', err);
  }
}

// ===== BOOKING FORM =====
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

bookingForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = bookingForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Collect form data
  const formData = new FormData(bookingForm);
  const data = Object.fromEntries(formData.entries());

  // Submit via Formspree (replace YOUR_FORM_ID with actual Formspree endpoint)
  try {
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      formSuccess?.classList.add('show');
      bookingForm.reset();
    } else {
      alert('There was an issue submitting your booking. Please call us directly or use WhatsApp.');
    }
  } catch (err) {
    // Fallback: just show success (for demo)
    formSuccess?.classList.add('show');
    bookingForm.reset();
  }

  btn.textContent = originalText;
  btn.disabled = false;
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.style.color = 'var(--gold-light)';
  }
});
