import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MoreVertical, Phone, Video, Info, 
  Paperclip, Image as ImageIcon, Smile, Send, 
  X, FileText, Check, CheckCheck 
} from 'lucide-react';

const Chat = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [showDetails, setShowDetails] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hi! Is the DSLR camera still available for this weekend?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Yes, it is available!', time: '10:32 AM', status: 'read' },
    { id: 3, sender: 'me', text: 'It comes with the 18-55mm lens kit. Do you need a tripod as well?', time: '10:32 AM', status: 'read' },
    { id: 4, sender: 'them', text: 'That would be great. How much for the combo?', time: '10:35 AM' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    setMessages([...messages, newMsg]);
    setMessageInput("");
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-white flex overflow-hidden font-sans">
      
      {/* --- LEFT SIDEBAR (Glassy) --- */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-100 flex flex-col h-full bg-white z-20">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Messages</h2>
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-cyan-600">
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="relative group">
            <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-[#06b6d4] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
          {[1, 2, 3].map((id) => (
            <div 
              key={id}
              onClick={() => setActiveChat(id)}
              className={`flex items-center gap-4 p-4 rounded-3xl cursor-pointer transition-all duration-300 ${
                activeChat === id 
                  ? 'bg-cyan-50 shadow-md shadow-cyan-500/10' 
                  : 'hover:bg-slate-50'
              }`}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm ${activeChat === id ? 'bg-gradient-to-br from-cyan-400 to-teal-500' : 'bg-slate-200 text-slate-500'}`}>
                  {id === 1 ? 'H' : id === 2 ? 'R' : 'A'}
                </div>
                {id === 1 && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-[3px] border-white rounded-full"></div>}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className={`font-bold truncate ${activeChat === id ? 'text-slate-900' : 'text-slate-700'}`}>
                    {id === 1 ? 'Hibah Hanif' : id === 2 ? 'Rahul Varma' : 'Amit Patel'}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold">10:35 AM</span>
                </div>
                <p className={`text-xs truncate ${activeChat === id ? 'text-cyan-700 font-medium' : 'text-slate-500'}`}>
                  {id === 1 ? 'That would be great. How much...' : 'Is this still available?'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MIDDLE (Chat Window) --- */}
      <div className="flex-1 flex flex-col h-full bg-[#f8f9fa] relative">
        
        {/* Header */}
        <div className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-8 shadow-sm z-20">
          <div className="flex items-center gap-4">
            <div className="relative">
               <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">
                 H
               </div>
               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-[3px] border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Hibah Hanif</h3>
              <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                Online now
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 text-slate-400 hover:text-[#06b6d4] hover:bg-cyan-50 rounded-2xl transition-all"><Phone size={20} /></button>
            <button className="p-3 text-slate-400 hover:text-[#06b6d4] hover:bg-cyan-50 rounded-2xl transition-all"><Video size={20} /></button>
            <div className="w-px h-8 bg-slate-200 mx-2"></div>
            <button onClick={() => setShowDetails(!showDetails)} className={`p-3 rounded-2xl transition-all ${showDetails ? 'text-[#06b6d4] bg-cyan-50' : 'text-slate-400 hover:text-[#06b6d4]'}`}>
              <Info size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
            >
              <div className={`max-w-[70%] flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`px-6 py-4 text-sm font-medium leading-relaxed shadow-sm ${
                    msg.sender === 'me' 
                      ? 'bg-gradient-to-br from-[#06b6d4] to-[#0891b2] text-white rounded-[24px] rounded-tr-none shadow-cyan-500/20' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-[24px] rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 px-2 opacity-70">
                   <span className="text-[10px] text-slate-400 font-bold">{msg.time}</span>
                   {msg.sender === 'me' && (
                     msg.status === 'read' ? <CheckCheck size={14} className="text-[#06b6d4]" /> : <Check size={14} className="text-slate-400" />
                   )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 bg-white border-t border-slate-100">
          <form 
            onSubmit={handleSend}
            className="bg-slate-50 p-2 pr-2 pl-4 rounded-[24px] border border-slate-200 focus-within:bg-white focus-within:shadow-xl focus-within:shadow-cyan-500/5 focus-within:border-cyan-200 flex items-center gap-3 transition-all duration-300"
          >
            <div className="flex gap-1 text-slate-400">
              <button type="button" className="p-2.5 hover:bg-slate-100 rounded-xl hover:text-[#06b6d4] transition-colors"><Paperclip size={20} /></button>
              <button type="button" className="p-2.5 hover:bg-slate-100 rounded-xl hover:text-[#06b6d4] transition-colors"><ImageIcon size={20} /></button>
            </div>
            
            <input 
              type="text" 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 font-medium h-10"
            />
            
            <button 
              type="submit"
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all shadow-md ${
                messageInput.trim() 
                  ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] hover:scale-105 active:scale-95 shadow-cyan-500/30' 
                  : 'bg-slate-200 cursor-not-allowed'
              }`}
              disabled={!messageInput.trim()}
            >
              <Send size={20} className="ml-0.5" />
            </button>
          </form>
        </div>
      </div>

      {/* --- RIGHT SIDEBAR (Animated) --- */}
      {showDetails && (
        <div className="w-80 border-l border-slate-100 bg-white h-full overflow-y-auto hidden lg:block animate-in slide-in-from-right-10 duration-500">
          <div className="p-6 flex justify-between items-center border-b border-slate-50">
            <h3 className="font-extrabold text-slate-900 text-lg">Details</h3>
            <button onClick={() => setShowDetails(false)} className="text-slate-400 hover:text-slate-600 bg-slate-50 p-2 rounded-full hover:bg-slate-100 transition-all">
              <X size={18} />
            </button>
          </div>

          <div className="p-8 text-center border-b border-slate-50">
             <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-cyan-500/30 mx-auto mb-4 border-4 border-white ring-1 ring-slate-100">
               H
             </div>
             <h3 className="font-extrabold text-slate-900 text-xl">Hibah Hanif</h3>
             <p className="text-sm text-slate-500 mt-1 font-medium">Verified Member</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Shared Media</h4>
              <div className="grid grid-cols-3 gap-3">
                {[1,2,3].map((i) => (
                  <div key={i} className="aspect-square bg-slate-100 rounded-2xl overflow-hidden relative cursor-pointer hover:opacity-80 hover:scale-105 transition-all">
                     <img src={`https://source.unsplash.com/random/200x200?sig=${i}`} className="w-full h-full object-cover" alt="item" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Current Rental</h4>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-4 items-center group cursor-pointer hover:border-cyan-200 transition-colors">
                 <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-[#06b6d4] shadow-sm">
                    <FileText size={20} />
                 </div>
                 <div className="overflow-hidden">
                    <p className="text-sm font-bold text-slate-900 truncate group-hover:text-[#06b6d4] transition-colors">Sony DSLR Kit</p>
                    <p className="text-xs text-slate-500 font-bold">₹1500 / day</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;