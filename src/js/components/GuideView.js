import { escapeHtml, getButtonClass } from '../utils/helpers.js';
import { EMERGENCY_STEPS } from '../data/emergencySteps.js';
import navigationService from '../services/NavigationService.js';

export function renderGuideView() {
  const { stepId } = navigationService.getState();
  const step = EMERGENCY_STEPS[stepId];

  if (!step) {
    return '<div class="text-center text-red-600 dark:text-red-400">Schritt nicht gefunden!</div>';
  }

  // Icon-Map für jeden Step
const iconMap = {
  'START': '⚠️',
  'DANGER': '🚨',
  'CONSCIOUS': '👤',
  'BREATHING_CHECK_UNCONSCIOUS': '💨',
  'BREATHING_CHECK_CONSCIOUS': '🩺',
  'STABLE_SIDE': '🛏️',
  'CPR': '❤️',
  'HEART_ATTACK': '💔',
  'STROKE': '🧠',
  'BLEEDING': '🩹',
  'GENERAL_HELP': '🆘'
};

const icon = iconMap[step.id] || '🏥';

const imageHtml = `
  <div class="mb-6 flex justify-center">
    <div class="w-32 h-32 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-6xl">
      ${icon}
    </div>
  </div>
`;

  const optionsHtml = step.options.map((option, index) => `
    <button data-next-step="${option.nextStepId}" 
            class="${getButtonClass(option.style)} step-option-btn">
      ${escapeHtml(option.label)}
    </button>
  `).join('');

  return `
    <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 view-transition transition-colors">
      ${imageHtml}
      
      <h2 class="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
        ${escapeHtml(step.question)}
      </h2>
      
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
        ${escapeHtml(step.description)}
      </p>

      <div class="space-y-3">
        ${optionsHtml}
      </div>
    </div>
  `;
}

export function attachGuideListeners() {
  const optionButtons = document.querySelectorAll('.step-option-btn');
  
  optionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const nextStepId = button.dataset.nextStep;
      navigationService.nextStep(nextStepId);
    });
  });
}