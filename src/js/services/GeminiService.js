/**
 * Google Gemini Service - Sichere API-Nutzung über Netlify Functions
 */
class GeminiService {
  constructor() {
    // Keine API-Keys mehr im Frontend!
    this.apiUrl = '/.netlify/functions/gemini';
  }

  async askQuestion(question) {
    try {
      console.log('🚀 Sende Anfrage an Netlify Function...');
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question })
      });

      console.log('📡 Response Status:', response.status);

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Gemini Antwort erhalten');
      
      return data.answer || 'Keine Antwort erhalten.';
      
    } catch (error) {
      console.error('❌ Gemini API Error:', error);
      return 'Entschuldigung, ich konnte keine Antwort generieren. Bei Notfällen bitte sofort 112 anrufen!';
    }
  }

  isConfigured() {
    return true; // Immer true, da Key serverseitig ist
  }

  getStatus() {
    return { 
      configured: true, 
      message: 'Gemini API bereit (sicher über Netlify)' 
    };
  }
}

export default new GeminiService();