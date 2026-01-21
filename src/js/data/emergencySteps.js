export const EMERGENCY_STEPS = {
  START: {
    id: 'START',
    question: 'Ist die Situation sicher?',
    description: 'Achte auf Eigenschutz (Verkehr, Strom, Feuer). Erst helfen, wenn keine Gefahr für dich besteht!',
    imageUrl: 'src/assets/images/step-scene-safety.png',
    options: [
      { label: 'Ja, Situation ist sicher', nextStepId: 'CONSCIOUS', style: 'primary' },
      { label: 'Nein, Gefahr!', nextStepId: 'DANGER', style: 'danger' }
    ]
  },
  DANGER: {
    id: 'DANGER',
    question: 'Gefahr im Verzug!',
    description: 'Bringe dich in Sicherheit. Rufe sofort 112. Versuche die Person aus der Gefahrenzone zu retten, NUR wenn du dich nicht selbst gefährdest.',
    imageUrl: 'src/assets/images/step-emergency-call.png',
    options: [
      { label: 'Zurück', nextStepId: 'START' },
      { label: 'Notruf 112 wählen', nextStepId: 'FINISH', style: 'danger' }
    ]
  },
  CONSCIOUS: {
    id: 'CONSCIOUS',
    question: 'Ist die Person ansprechbar?',
    description: 'Laut ansprechen und vorsichtig an den Schultern rütteln: "Hallo, hören Sie mich? Was ist passiert?"',
    imageUrl: 'src/assets/images/step-consciousness.png',
    options: [
      { label: 'Ja, reagiert', nextStepId: 'BREATHING_CHECK_CONSCIOUS', style: 'primary' },
      { label: 'Nein, keine Reaktion', nextStepId: 'BREATHING_CHECK_UNCONSCIOUS', style: 'danger' }
    ]
  },
  BREATHING_CHECK_UNCONSCIOUS: {
    id: 'BREATHING_CHECK_UNCONSCIOUS',
    question: 'Atmet die Person normal?',
    description: 'Kopf nackenwärts beugen, Kinn anheben. 10 Sekunden lang: Sehen (Brustkorb), Hören (Atemgeräusche), Fühlen (Luftstrom).',
    imageUrl: 'src/assets/images/step-breathing-check.png',
    options: [
      { label: 'Ja, normale Atmung', nextStepId: 'STABLE_SIDE', style: 'primary' },
      { label: 'Nein oder unsicher', nextStepId: 'CPR', style: 'danger' }
    ]
  },
  BREATHING_CHECK_CONSCIOUS: {
    id: 'BREATHING_CHECK_CONSCIOUS',
    question: 'Gibt es akute Beschwerden?',
    description: 'Frage nach Schmerzen in der Brust, Atemnot oder Lähmungserscheinungen.',
    options: [
      { label: 'Brustschmerz / Atemnot', nextStepId: 'HEART_ATTACK', style: 'danger' },
      { label: 'Lähmung / Sprachstörung', nextStepId: 'STROKE', style: 'danger' },
      { label: 'Starke Blutung', nextStepId: 'BLEEDING', style: 'danger' },
      { label: 'Sonstiges / Hilfe benötigt', nextStepId: 'GENERAL_HELP', style: 'primary' }
    ]
  },
  STABLE_SIDE: {
    id: 'STABLE_SIDE',
    question: 'Stabile Seitenlage durchführen',
    description: '1. Arm rechtwinklig hochlegen. 2. Anderen Arm über Brust legen. 3. Fernes Bein anwinkeln und Person zu sich rüberziehen. 4. Kopf nackenwärts beugen. 112 rufen!',
    imageUrl: 'src/assets/images/step-recovery-position.png',
    options: [
      { label: 'Erledigt, warte auf Notruf', nextStepId: 'FINISH', style: 'primary' }
    ]
  },
  CPR: {
    id: 'CPR',
    question: 'Wiederbelebung starten!',
    description: 'Sofort 112 rufen! 30x Herzdruckmassage (Mitte Brustkorb, 5-6cm tief), dann 2x Beatmen. Rhythmus: 100-120/Min.',
    imageUrl: 'src/assets/images/step-cpr-compressions.png',
    options: [
      { label: 'Taktgeber starten', nextStepId: 'CPR_RUNNING', style: 'danger' }
    ]
  },
  HEART_ATTACK: {
    id: 'HEART_ATTACK',
    question: 'Verdacht auf Herzinfarkt',
    description: 'Oberkörper hochlagern. Enge Kleidung öffnen. Ruhe bewahren. Sofort 112!',
    imageUrl: 'src/assets/images/step-heart-attack.png',
    options: [
      { label: 'Hilfe geleistet', nextStepId: 'FINISH' }
    ]
  },
  STROKE: {
    id: 'STROKE',
    question: 'Verdacht auf Schlaganfall',
    description: 'FAST-Test: Face (Lächeln?), Arms (Heben?), Speech (Nachsprechen?), Time (Sofort 112!). Keine Zeit verlieren!',
    imageUrl: 'src/assets/images/step-stroke.png',
    options: [
      { label: 'Hilfe geleistet', nextStepId: 'FINISH' }
    ]
  },
  BLEEDING: {
    id: 'BLEEDING',
    question: 'Starke Blutung stoppen',
    description: 'Druckverband anlegen. Betroffenes Körperteil hochhalten. Falls nötig: Abbinden (Tourniquet). Sofort 112!',
    imageUrl: 'src/assets/images/step-bleeding.png',
    options: [
      { label: 'Hilfe geleistet', nextStepId: 'FINISH' }
    ]
  },
  GENERAL_HELP: {
    id: 'GENERAL_HELP',
    question: 'Erste Hilfe leisten',
    description: 'Beruhige die Person. Schütze sie vor Kälte (Rettungsdecke). Bleib bei ihr bis der Rettungsdienst eintrifft.',
    imageUrl: 'src/assets/images/step-general-help.png',
    options: [
      { label: 'Fertig', nextStepId: 'FINISH' }
    ]
  }
};

export const QUICK_QUESTIONS = [
  'Verbrennung behandeln?',
  'Verschlucken: Heimlich-Griff?',
  'Vergiftung: Was tun?',
  'Schnittwunde versorgen?'
];

export const OFFLINE_ANSWERS = [
  {
    key: 'verbrenn',
    answer: 'Kühlen mit handwarmem Wasser (10-20 Minuten). Kleidung entfernen, wenn sie nicht festklebt. Steril abdecken. Bei größeren Verbrennungen: 112.'
  },
  {
    key: 'verschluck',
    answer: 'Wenn kein effektiver Husten: 5 Schläge zwischen die Schulterblätter, dann 5 Bauchstöße. Abwechseln. Bei Schwangeren: Bruststöße. 112 bei Verschlechterung.'
  },
  {
    key: 'vergift',
    answer: 'Person beruhigen, Giftquelle entfernen. Verpackung sichern. 112 oder Giftnotruf anrufen. Nichts essen oder trinken geben ohne Anweisung.'
  },
  {
    key: 'schnitt',
    answer: 'Blutung mit Druck stoppen, Wunde reinigen, steril abdecken. Hochlagern. Bei starker Blutung oder tiefer Wunde: 112.'
  },
  {
    key: 'blut',
    answer: 'Direkten Druck auf die Wunde, Druckverband anlegen, hochlagern. Bei starker Blutung oder Schockzeichen sofort 112.'
  },
  {
    key: 'sturz',
    answer: 'Bewegung vermeiden bei Verdacht auf Wirbelsäule. Blutungen stoppen, warm halten, beruhigen. Bei Bewusstseinsstörung oder starken Schmerzen: 112.'
  }
];