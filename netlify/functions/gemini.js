exports.handler = async (event, context) => {
  // Nur POST-Requests erlauben
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { question } = JSON.parse(event.body);

    // API-Key als Environment Variable (GEHEIM!)
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Du bist ein hilfreicher Erste-Hilfe-Informations-Assistent für allgemeine Ratschläge.

WICHTIG: Dies ist nur zur Information. Bei echten Notfällen immer sofort 112 anrufen!

Beantworte diese Frage zu allgemeinen Erste-Hilfe-Maßnahmen:
"${question}"

Gib eine kurze, informative Antwort (3-4 Sätze) auf Deutsch. 
Fokussiere dich auf sichere, allgemein empfohlene Erste-Hilfe-Schritte.
Erwähne am Ende: "Im Zweifel oder bei ernsten Symptomen sofort 112 rufen."`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        }
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          answer: data.candidates[0].content.parts[0].text.trim() 
        })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Keine Antwort von Gemini' 
        })
      };
    }

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Interner Serverfehler' 
      })
    };
  }
};