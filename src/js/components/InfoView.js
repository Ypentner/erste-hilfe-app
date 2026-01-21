import { escapeHtml } from '../utils/helpers.js';
import { QUICK_QUESTIONS, OFFLINE_ANSWERS } from '../data/emergencySteps.js';
import geminiService from '../services/GeminiService.js';

// State für Info-View
let messages = [];
let inputValue = '';

export function renderInfoView() {
  const geminiStatus = geminiService.getStatus();
  
  const emptyState = messages.length === 0 
    ? `<div class="text-center py-8">
         <p class="text-slate-500 dark:text-slate-400 mb-6">Wobei kann ich dir helfen? Wähle eine Frage oder schreibe selbst.</p>
         
         ${!geminiStatus.configured ? `
           <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 text-sm text-amber-800 dark:text-amber-300">
             <p class="font-medium mb-1">⚠️ KI-Feature nicht aktiviert</p>
             <p class="text-xs">${geminiStatus.message}</p>
           </div>
         ` : `
           <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6 text-sm text-green-800 dark:text-green-300">
             <p class="font-medium">✅ KI-Assistent aktiv - Stelle beliebige Erste-Hilfe-Fragen!</p>
           </div>
         `}
         
         <div class="flex flex-wrap gap-2 justify-center">
           ${QUICK_QUESTIONS.map((q, i) => `
             <button class="quick-question-btn bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 px-4 py-2 rounded-full text-sm font-medium transition-colors" 
                     data-question="${escapeHtml(q)}">
               ${escapeHtml(q)}
             </button>
           `).join('')}
         </div>
       </div>`
    : '';

  const messagesHtml = messages.map(msg => {
    const alignClass = msg.role === 'user' ? 'justify-end' : 'justify-start';
    const bubbleClass = msg.role === 'user'
      ? 'bg-blue-600 dark:bg-blue-700 text-white rounded-tr-none'
      : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none';
    
    return `
      <div class="flex ${alignClass}">
        <div class="max-w-[85%] px-4 py-3 rounded-2xl ${bubbleClass} transition-colors">
          <p class="text-sm leading-relaxed whitespace-pre-wrap">${escapeHtml(msg.content)}</p>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="flex flex-col h-[calc(100vh-140px)] bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 view-transition transition-colors">
      <div class="bg-slate-50 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 transition-colors">
        <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h3 class="font-bold text-slate-900 dark:text-slate-100">Schnellhilfe Assistent</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            ${geminiStatus.configured ? '🤖 KI-gestützt mit Google Gemini' : 'Offline-Modus'}
          </p>
        </div>
      </div>

      <div id="infoScroll" class="flex-1 overflow-y-auto p-4 space-y-4">
        ${emptyState}
        ${messagesHtml}
      </div>

      <form id="infoForm" class="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div class="relative">
          <input id="infoInput"
                 type="text"
                 value="${escapeHtml(inputValue)}"
                 placeholder="${geminiStatus.configured ? 'Frage stellen (KI-gestützt)...' : 'Frage stellen (offline)...'}"
                 class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors" />
          <button type="submit"
                  class="absolute right-2 top-2 w-9 h-9 bg-blue-600 dark:bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  `;
}

export function attachInfoListeners() {
  const form = document.getElementById('infoForm');
  const input = document.getElementById('infoInput');
  const quickBtns = document.querySelectorAll('.quick-question-btn');

  if (input) {
    input.addEventListener('input', (e) => {
      inputValue = e.target.value;
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = inputValue.trim();
      if (text) {
        sendMessage(text);
      }
    });
  }

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.dataset.question;
      sendMessage(question);
    });
  });
}

async function sendMessage(text) {
  // User-Message hinzufügen
  messages.push({ role: 'user', content: text });
  inputValue = '';
  
  // Re-render mit User-Message
  const content = document.getElementById('content');
  content.innerHTML = renderInfoView();
  attachInfoListeners();
  
  // Prüfe zuerst Offline-Antworten
  const offlineAnswer = getOfflineAnswerIfExists(text);
  
  if (offlineAnswer) {
    // Offline-Antwort gefunden - sofort anzeigen
    messages.push({ 
      role: 'assistant', 
      content: '📚 ' + offlineAnswer 
    });
  } else if (geminiService.isConfigured()) {
    // Keine Offline-Antwort → Gemini fragen
    
    // Lade-Nachricht anzeigen
    messages.push({ 
      role: 'assistant', 
      content: '🤔 Einen Moment, ich überlege...' 
    });
    
    // Re-render mit Lade-Nachricht
    content.innerHTML = renderInfoView();
    attachInfoListeners();
    
    // Gemini API fragen
    const geminiAnswer = await geminiService.askQuestion(text);
    
    // Lade-Nachricht durch echte Antwort ersetzen
    messages[messages.length - 1] = { 
      role: 'assistant', 
      content: '🤖 ' + geminiAnswer 
    };
  } else {
    // Gemini nicht konfiguriert
    messages.push({ 
      role: 'assistant', 
      content: '⚠️ Für diese Frage benötige ich die KI-Funktion. Bitte füge einen kostenlosen Gemini API-Key hinzu (siehe Hinweis oben) oder wähle eine der Schnellfragen.\n\nBei Notfällen immer sofort 112 anrufen!' 
    });
  }
  
  // Finale Antwort anzeigen
  content.innerHTML = renderInfoView();
  attachInfoListeners();
  
  // Auto-scroll nach unten
  setTimeout(() => {
    const scrollArea = document.getElementById('infoScroll');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, 100);
}

/**
 * Prüfe ob es eine Offline-Antwort gibt
 */
function getOfflineAnswerIfExists(text) {
  const lowered = text.toLowerCase();
  const match = OFFLINE_ANSWERS.find(entry => lowered.includes(entry.key));
  return match?.answer || null;
}

export function resetInfoView() {
  messages = [];
  inputValue = '';
}