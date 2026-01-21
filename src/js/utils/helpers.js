/**
 * HTML-Escape für sichere Text-Ausgabe
 */
export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Button-Klassen basierend auf Style
 */
export function getButtonClass(style) {
  const baseClass = 'w-full py-4 rounded-2xl font-bold text-lg shadow-md transition-all active:scale-95';
  
  switch (style) {
    case 'danger':
      return `${baseClass} bg-red-600 hover:bg-red-700 text-white`;
    case 'primary':
      return `${baseClass} bg-emerald-600 hover:bg-emerald-700 text-white`;
    default:
      return `${baseClass} bg-slate-700 hover:bg-slate-600 text-white`;
  }
}

/**
 * Event-Listener mit automatischer Cleanup
 */
export class EventManager {
  constructor() {
    this.listeners = [];
  }

  add(element, event, handler) {
    element.addEventListener(event, handler);
    this.listeners.push({ element, event, handler });
  }

  removeAll() {
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.listeners = [];
  }
}