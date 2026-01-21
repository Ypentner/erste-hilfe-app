import cprService from '../services/CprService.js';
import navigationService from '../services/NavigationService.js';

export function renderCprView() {
  const { isActive, count } = cprService.getState();
  const displayCount = count === 0 ? 'GO' : count;
  const ringClass = isActive 
    ? 'border-red-500 scale-110' 
    : 'border-slate-700 dark:border-slate-500';
  const toggleBtnClass = isActive
    ? 'bg-slate-700 hover:bg-slate-600 text-white'
    : 'bg-red-600 hover:bg-red-700 text-white shadow-lg';
  const toggleBtnText = isActive ? 'Taktgeber STOPPEN' : 'Taktgeber STARTEN';
  const statusText = isActive ? 'Herzdruckmassage' : 'Bereit';
  
  const breathHtml = count >= 30 
    ? `<div class="bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-600 rounded-2xl p-6 text-center animate-pulse transition-colors">
         <div class="text-blue-900 dark:text-blue-300 font-bold text-xl mb-2">Jetzt beatmen!</div>
         <div class="text-blue-700 dark:text-blue-400 text-sm">2x Mund-zu-Mund Beatmung</div>
       </div>`
    : '';

  return `
    <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 view-transition transition-colors">
      <h2 class="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 text-center">CPR Taktgeber</h2>

      <div class="flex flex-col items-center space-y-8">
        <div class="relative">
          <div class="w-64 h-64 rounded-full border-8 ${ringClass} flex items-center justify-center transition-all duration-200">
            <div class="text-center">
              <div class="text-7xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
                ${displayCount}
              </div>
              <div class="text-sm text-slate-500 dark:text-slate-400 font-medium">
                ${statusText}
              </div>
            </div>
          </div>
        </div>

        ${breathHtml}

        <div class="w-full space-y-3">
          <button id="cprToggleBtn"
                  class="${toggleBtnClass} w-full py-5 rounded-2xl font-bold text-xl transition-all active:scale-95">
            ${toggleBtnText}
          </button>

          <button id="cprBackBtn"
                  class="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 py-4 rounded-2xl font-bold transition-all active:scale-95">
            Zurück zum Guide
          </button>
        </div>

        <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300 transition-colors">
          <p class="font-medium mb-2">💡 Anleitung:</p>
          <ul class="space-y-1 text-xs">
            <li>• Drücke 5-6cm tief in die Mitte des Brustkorbs</li>
            <li>• Lasse den Brustkorb nach jeder Kompression vollständig zurückfedern</li>
            <li>• Nach 30 Kompressionen → 2x beatmen</li>
            <li>• Rhythmus: ~110 Schläge pro Minute</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

export function attachCprListeners() {
  const toggleBtn = document.getElementById('cprToggleBtn');
  const backBtn = document.getElementById('cprBackBtn');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      cprService.toggle();
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      cprService.stop();
      navigationService.navigateTo('GUIDE');
    });
  }
}