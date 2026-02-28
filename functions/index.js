const { onRequest } = require('firebase-functions/v2/https');

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

const REDIRECT_SIGNAL = 'REDIRECT_TO_WHATSAPP';

const FAQ_ITEMS = [
  {
    question: 'What are the school hours?',
    answer:
      'Sandpiper Middle School runs from 8:00 AM to 3:05 PM, Monday through Friday. Minimum days end at 12:35 PM. Check the school calendar for scheduled minimum days.',
  },
  {
    question: 'What are the teacher student ratio?',
    answer:
      'Sandpiper maintains a low teacher-student ratio of approximately 1:15 to ensure personalized attention and support for each student. This allows our teachers to effectively address individual learning needs and foster a collaborative classroom environment.',
  },
  {
    question: "How do I report my child's absence?",
    answer:
      'Call the school attendance line at 650.631.5510 before 8:30 AM on the day of the absence. You can also use the online absence reporting form on the school website at sandpiper.brssd.org.',
  },
  {
    question: 'Where can I find the lunch menu?',
    answer:
      'The monthly lunch menu is posted on the school website at sandpiper.brssd.org. Students can also order hot lunch in advance through the parent portal.',
  },
  {
    question: 'Where can I find the school calendar?',
    answer:
      "The full school year calendar — including holidays, minimum days, and key events — is available on sandpiper.brssd.org under the 'Calendar' section.",
  },
  {
    question: 'What clubs are available at Sandpiper?',
    answer:
      'Sandpiper offers 10+ clubs including Science Club, Math Olympiad, Debate, Art Club, Coding Club, Drama Club, and Environmental Club. The full list and sign-up details are shared at the start of each school year.',
  },
  {
    question: 'What sports teams does Sandpiper have?',
    answer:
      'Sandpiper has 6 sport teams: soccer, basketball, track & field, volleyball, and more. Season schedules and tryout dates are posted on the school website. Our academic teams in Math Olympiad and Debate also compete at the state level.',
  },
  {
    question: 'How do I contact the school?',
    answer:
      'You can reach the school by phone at 650.631.5510 or visit us at 801 Redwood Shores Parkway, Redwood City, CA 94065. The front office is open 7:30 AM to 4:00 PM on school days.',
  },
  {
    question: 'Where can I find the student handbook?',
    answer:
      'The Student Handbook is available on sandpiper.brssd.org and covers school rules, policies, dress code, and behavioral expectations. A printed copy is also distributed at the start of the school year.',
  },
  {
    question: 'How does enrollment or registration work?',
    answer:
      'New student enrollment is managed through the BRSSD district office. Visit brssd.org for enrollment forms, required documents, and deadlines. Current students are automatically re-enrolled each year.',
  },
  {
    question: 'How can I volunteer at the school?',
    answer:
      'We welcome parent volunteers! All volunteers must complete a BRSSD volunteer application and pass a background check before coming on campus. Contact the front office at 650.631.5510 to get started.',
  },
  {
    question: 'Is there a dress code or uniform policy?',
    answer:
      'Sandpiper does not require uniforms. However, there is a dress code to ensure clothing is appropriate and does not disrupt the learning environment. Full details are in the Student Handbook.',
  },
  {
    question: 'What technology or devices do students need?',
    answer:
      'Students are issued a school Chromebook for learning. They should also bring basic supplies: a binder, pencils, and folders. Specific supply lists are shared by teachers at the start of each school year.',
  },
  {
    question: 'When are report cards or grades issued?',
    answer:
      'Report cards are issued at the end of each trimester — typically in November, March, and June. Parents can also monitor grades at any time through the Aeries parent portal at aeries.net.',
  },
  {
    question: 'How do I access the parent portal?',
    answer:
      "The Aeries Parent Portal lets you view your child's grades, attendance, and teacher contact info. Access it at aeries.net or through sandpiper.brssd.org. If you need login help, contact the front office.",
  },
  {
    question: 'What is the homework policy?',
    answer:
      "Teachers assign homework to reinforce classroom learning. Students can typically expect 30–60 minutes of homework per night. For subject-specific questions, contact your child's teacher directly through the Aeries portal.",
  },
  {
    question: 'Who are the Parent Ambassadors?',
    answer:
      'Parent Ambassadors are experienced Sandpiper parents who volunteer to support and welcome new families. They can help you navigate school life, answer questions, and connect you with resources. Reach them via WhatsApp for a quick chat.',
  },
  {
    question: "How do I update my child's emergency contact information?",
    answer:
      "Emergency contact information can be updated through the Aeries Parent Portal or by contacting the front office directly at 650.631.5510. Keeping this information current is important for your child's safety.",
  },
  {
    question: 'Is there before or after school care?',
    answer:
      "Sandpiper does not operate its own before/after school program. Check with the BRSSD district office or local community resources for childcare options. Contact the front office at 650.631.5510 for guidance.",
  },
];

const SYSTEM_PROMPT = `You are a friendly and helpful assistant for Sandpiper Middle School in Redwood City, CA. You help parents find quick answers about the school.

Here is the school FAQ you should draw from:

${FAQ_ITEMS.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n')}

Rules:
1. Answer questions using the FAQ above, well-known facts about the school (address, phone), or information from the Belmont-Redwood Shores School District website at https://www.brssd.org/. You may use Google Search to look up current information from brssd.org when the FAQ does not cover the topic.
2. If you cannot find a relevant answer even after considering brssd.org, respond with exactly the word: ${REDIRECT_SIGNAL}
3. If the parent asks to speak to a person, a parent ambassador, or a human, please softly respond with ${REDIRECT_SIGNAL}
4. Visitors can ask about anything in any language, you can reply in the same language.
5. Otherwise, keep answers concise, warm, and helpful. Do not invent information not found in the FAQ, https://sandpipermiddle.org, or https://www.brssd.org/`;

exports.chat = onRequest(
  {
    region: 'us-west1',
    secrets: ['GEMINI_API_KEY'],
    cors: true,
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      res.status(500).json({ error: 'API key not configured' });
      return;
    }

    // Only accept conversation history from the client.
    // All other parameters (system prompt, tools, config) are server-controlled
    // to prevent API key abuse.
    const { contents } = req.body;
    if (!Array.isArray(contents)) {
      res.status(400).json({ error: 'Invalid request: contents must be an array' });
      return;
    }

    try {
      const geminiRes = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: contents,
          tools: [{ googleSearch: {} }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 512 },
        }),
      });

      const data = await geminiRes.json();
      if (!geminiRes.ok) {
        res.status(geminiRes.status).json(data);
        return;
      }

      const candidate = data.candidates?.[0];
      const finishReason = candidate?.finishReason;
      
      let responseText = '';

      // 检查停止原因
      if (!candidate) {
        // 如果根本没有候选答案（极少数情况，通常与安全过滤有关）
        responseText = REDIRECT_SIGNAL;
      } else if (finishReason === 'SAFETY' || finishReason === 'RECITATION') {
        // 如果是因为安全或版权原因被拦截，返回重定向信号
        responseText = REDIRECT_SIGNAL;
      } else {
        // 正常尝试提取文本：拼接所有 part，并去除首尾空白
        const textContent = candidate.content?.parts?.map(p => p.text || '').join('').trim();
        responseText = textContent || REDIRECT_SIGNAL;
      }

      res.json({ text: responseText });
    } catch (err) {
      res.status(500).json({ error: String(err) });
    }
  },
);
