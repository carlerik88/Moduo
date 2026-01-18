import type { FAQItem } from '../types';

export const faqItems: FAQItem[] = [
  // Ordering
  {
    id: 'faq-order-1',
    question: 'How do I create a custom shelf configuration?',
    questionNo: 'Hvordan lager jeg en tilpasset hyllekonfigurasjon?',
    answer: 'Use our interactive shelf builder to select components and see your design in real-time. You can save configurations and add them directly to your cart when ready.',
    answerNo: 'Bruk vårt interaktive hyllebyggeverktøy for å velge komponenter og se designet ditt i sanntid. Du kan lagre konfigurasjoner og legge dem direkte i handlekurven når du er klar.',
    category: 'ordering',
  },
  {
    id: 'faq-order-2',
    question: 'Can I order individual components?',
    questionNo: 'Kan jeg bestille individuelle komponenter?',
    answer: 'Yes! All components can be purchased individually. This is perfect for expanding your existing Moduo system or replacing specific parts.',
    answerNo: 'Ja! Alle komponenter kan kjøpes individuelt. Dette er perfekt for å utvide ditt eksisterende Moduo-system eller erstatte bestemte deler.',
    category: 'ordering',
  },
  {
    id: 'faq-order-3',
    question: 'What payment methods do you accept?',
    questionNo: 'Hvilke betalingsmetoder aksepterer dere?',
    answer: 'We accept all major credit cards, Vipps, and invoice payment for orders over 2000 NOK. All transactions are secure and encrypted.',
    answerNo: 'Vi aksepterer alle store kredittkort, Vipps og fakturabetaling for ordre over 2000 kr. Alle transaksjoner er sikre og krypterte.',
    category: 'ordering',
  },

  // Shipping
  {
    id: 'faq-ship-1',
    question: 'How long does shipping take?',
    questionNo: 'Hvor lang tid tar leveringen?',
    answer: 'Standard shipping takes 3-5 business days within Norway. Express shipping (1-2 days) is available for an additional fee. Delivery to remote areas may take slightly longer.',
    answerNo: 'Standard levering tar 3-5 virkedager i Norge. Ekspress levering (1-2 dager) er tilgjengelig mot et tillegg. Levering til avsidesliggende områder kan ta litt lenger tid.',
    category: 'shipping',
  },
  {
    id: 'faq-ship-2',
    question: 'Do you ship internationally?',
    questionNo: 'Sender dere internasjonalt?',
    answer: 'Currently, we ship to Norway, Sweden, and Denmark. We are working on expanding to more countries. Contact us for special arrangements.',
    answerNo: 'For tiden sender vi til Norge, Sverige og Danmark. Vi jobber med å utvide til flere land. Kontakt oss for spesielle ordninger.',
    category: 'shipping',
  },
  {
    id: 'faq-ship-3',
    question: 'Is shipping free?',
    questionNo: 'Er frakten gratis?',
    answer: 'We offer free standard shipping on orders over 5000 NOK. For smaller orders, shipping costs are calculated based on weight and destination.',
    answerNo: 'Vi tilbyr gratis standardfrakt på ordre over 5000 kr. For mindre ordre beregnes fraktkostnader basert på vekt og destinasjon.',
    category: 'shipping',
  },

  // Assembly
  {
    id: 'faq-assembly-1',
    question: 'Is assembly difficult?',
    questionNo: 'Er monteringen vanskelig?',
    answer: 'Our modular system is designed for easy assembly with no special tools required. Each order includes detailed instructions with illustrations. Most configurations can be assembled in 30-60 minutes.',
    answerNo: 'Vårt modulære system er designet for enkel montering uten spesialverktøy. Hver ordre inkluderer detaljerte instruksjoner med illustrasjoner. De fleste konfigurasjoner kan monteres på 30-60 minutter.',
    category: 'assembly',
  },
  {
    id: 'faq-assembly-2',
    question: 'Do I need to anchor the shelf to the wall?',
    questionNo: 'Må jeg feste hyllen til veggen?',
    answer: 'For safety, we recommend anchoring tall configurations (over 120cm) to the wall. Wall anchors and instructions are included with all uprights. Freestanding configurations under 80cm typically do not require wall mounting.',
    answerNo: 'Av sikkerhetshensyn anbefaler vi å forankre høye konfigurasjoner (over 120cm) til veggen. Veggankere og instruksjoner er inkludert med alle stolper. Frittstående konfigurasjoner under 80cm trenger vanligvis ikke veggfeste.',
    category: 'assembly',
  },
  {
    id: 'faq-assembly-3',
    question: 'Can I reconfigure my shelf after assembly?',
    questionNo: 'Kan jeg rekonfigurere hyllen etter montering?',
    answer: "Absolutely! That's the beauty of our modular system. Shelves can be repositioned on the uprights at any time, and new components can be added to expand your system.",
    answerNo: 'Absolutt! Det er det fine med vårt modulære system. Hyller kan flyttes på stolpene når som helst, og nye komponenter kan legges til for å utvide systemet.',
    category: 'assembly',
  },

  // Care
  {
    id: 'faq-care-1',
    question: 'How do I care for my wooden shelves?',
    questionNo: 'Hvordan pleier jeg trehyllene mine?',
    answer: 'Dust regularly with a soft, dry cloth. For deeper cleaning, use a slightly damp cloth and dry immediately. Avoid harsh chemicals. For oiled finishes, we recommend re-oiling annually with wood oil.',
    answerNo: 'Støv regelmessig med en myk, tørr klut. For dypere rengjøring, bruk en lett fuktet klut og tørk umiddelbart. Unngå sterke kjemikalier. For oljede overflater anbefaler vi årlig re-olje med treolje.',
    category: 'care',
  },
  {
    id: 'faq-care-2',
    question: 'What is the maximum weight capacity?',
    questionNo: 'Hva er maksimal vektkapasitet?',
    answer: 'Standard shelves support up to 30-40kg depending on width. The weight capacity is specified for each shelf in our product catalog. For heavy items, we recommend shorter shelf spans.',
    answerNo: 'Standard hyller støtter opptil 30-40kg avhengig av bredde. Bæreevnen er spesifisert for hver hylle i produktkatalogen vår. For tunge gjenstander anbefaler vi kortere hyllespenn.',
    category: 'care',
  },

  // Returns
  {
    id: 'faq-return-1',
    question: 'What is your return policy?',
    questionNo: 'Hva er returpolicyen deres?',
    answer: 'We offer a 30-day return policy for unused items in original packaging. Custom or modified items cannot be returned. Contact customer service to initiate a return.',
    answerNo: 'Vi tilbyr 30 dagers returrett for ubrukte varer i original emballasje. Tilpassede eller modifiserte varer kan ikke returneres. Kontakt kundeservice for å starte en retur.',
    category: 'returns',
  },
  {
    id: 'faq-return-2',
    question: 'What if my item arrives damaged?',
    questionNo: 'Hva om varen min kommer skadet?',
    answer: 'We carefully package all items, but if something arrives damaged, please contact us within 48 hours with photos. We will arrange a free replacement or full refund.',
    answerNo: 'Vi pakker alle varer forsiktig, men hvis noe ankommer skadet, vennligst kontakt oss innen 48 timer med bilder. Vi vil ordne gratis erstatning eller full refusjon.',
    category: 'returns',
  },
  {
    id: 'faq-return-3',
    question: 'Do you offer a warranty?',
    questionNo: 'Tilbyr dere garanti?',
    answer: 'Yes, all Moduo products come with a 5-year warranty against manufacturing defects. This covers the structural integrity of the wood and all hardware. Normal wear and tear is not covered.',
    answerNo: 'Ja, alle Moduo-produkter kommer med 5 års garanti mot produksjonsfeil. Dette dekker den strukturelle integriteten til treverket og all maskinvare. Normal slitasje er ikke dekket.',
    category: 'returns',
  },
];

export const getFAQByCategory = (category: string): FAQItem[] => {
  return faqItems.filter((item) => item.category === category);
};
