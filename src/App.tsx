import React, { useState } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'أهلاً بك! أنا مساعدك الذكي OmniAI، كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      // استبدل النص التالي بمفتاح الـ API الخاص بك مباشرة
      const apiKey = 'AQ.Ab8RN6KWvCIf7DWFXB1sJZYAluWdTbrXlXAUcdRhRRpoc_XnYw';
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }]
        })
      });

      const data = await response.json();
      const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'عذراً، لم أستطع توليد رد.';
      
      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'حدث خطأ في الشبكة، تحقق من الاتصال ومفتاح الـ API.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: '#fff' }}>
      {/* رأس التطبيق */}
      <header style={{ backgroundColor: '#1e293b', padding: '15px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #334155' }}>
        OmniAI Studio - AI Chat
      </header>

      {/* منطقة عرض الرسائل */}
      <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.sender === 'user' ? '#2563eb' : '#1e293b',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '12px',
            maxWidth: '80%',
            wordBreak: 'break-word',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            {msg.text}
          </div>
        ))}
        {loading && <div style={{ alignSelf: 'flex-start', color: '#94a3b8', padding: '8px' }}>جاري الكتابة...</div>}
      </div>

      {/* شريط الإدخال */}
      <div style={{ display: 'flex', padding: '12px', backgroundColor: '#1e293b', borderTop: '1px solid #334155' }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="اكتب رسالتك أو استفسارك البرمجي هنا..." 
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', outline: 'none' }}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend} 
          style={{ marginRight: '8px', padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          إرسال
        </button>
      </div>
    </div>
  );
}
