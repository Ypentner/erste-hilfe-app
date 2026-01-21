import { escapeHtml } from '../utils/helpers.js';
import geoService from '../services/GeolocationService.js';
import navigationService from '../services/NavigationService.js';

export function renderHomeView() {
  const position = geoService.getPosition();
  const locationText = position 
    ? `${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`
    : 'Wird ermittelt...';

  return `
    <div class="space-y-6 view-transition">
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center transition-colors">
        <div class="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
          <svg class="w-10 h-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">Notfall-Assistent</h1>
        <p class="text-slate-500 dark:text-slate-400 max-w-xs mb-8">Bereit für den Ernstfall. Wähle eine Option, um Hilfe zu erhalten.</p>

        <button id="startGuideBtn" 
                class="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-bold text-xl shadow-lg transition-all active:scale-95 mb-4">
          Notfall-Guide starten
        </button>

        <button id="openQuickHelpBtn" 
                class="w-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg transition-all active:scale-95">
          Schnellhilfe öffnen
        </button>
      </div>

      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 transition-colors">
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div class="flex-1">
            <h3 class="font-bold text-blue-900 dark:text-blue-300 mb-1">Dein Standort</h3>
            <p class="text-sm text-blue-700 dark:text-blue-400">${escapeHtml(locationText)}</p>
          </div>
        </div>
      </div>

      <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 transition-colors">
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div class="flex-1">
            <h3 class="font-bold text-amber-900 dark:text-amber-300 mb-1">Wichtiger Hinweis</h3>
            <p class="text-sm text-amber-700 dark:text-amber-400">Diese App ersetzt keinen professionellen Notruf. Im Zweifel immer 112 wählen!</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachHomeListeners() {
  const startGuideBtn = document.getElementById('startGuideBtn');
  const openQuickHelpBtn = document.getElementById('openQuickHelpBtn');

  if (startGuideBtn) {
    startGuideBtn.addEventListener('click', () => {
      navigationService.navigateTo('GUIDE', 'START');
    });
  }

  if (openQuickHelpBtn) {
    openQuickHelpBtn.addEventListener('click', () => {
      navigationService.navigateTo('INFO');
    });
  }
}