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

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages: Message[] = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // محاكاة رد الذكاء الاصطناعي مؤقتاً
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: 'لقد استلمت رسالتك بنجاح، جاري ربط واجهة البرمجة (API).' }]);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
      {/* رأس التطبيق */}
      <header style={{ backgroundColor: '#007bff', color: '#fff', padding: '15px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
        مساعد الذكاء الاصطناعي - OmniAI
      </header>

      {/* منطقة عرض الرسائل */}
      <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.sender === 'user' ? '#007bff' : '#e4e6eb',
            color: msg.sender === 'user' ? '#fff' : '#000',
            padding: '10px 15px',
            borderRadius: '15px',
            maxWidth: '75%',
            wordBreak: 'break-word'
          }}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* شريط الإدخال */}
      <div style={{ display: 'flex', padding: '10px', backgroundColor: '#fff', borderTop: '1px solid #ddd' }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="اكتب رسالتك هنا..." 
          style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ccc', outline: 'none' }}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend} 
          style={{ marginRight: '8px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>
          إرسال
        </button>
      </div>
    </div>
  );
}
