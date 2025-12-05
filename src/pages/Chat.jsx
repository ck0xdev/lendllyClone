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

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  // Mock Messages
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
    // Fixed Height Container (Calc 100vh - Navbar Height)
    <div className="h-[calc(100vh-80px)] bg-white flex overflow-hidden font-sans">
      
      {/* --- LEFT SIDEBAR (List) --- */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-100 flex flex-col h-full bg-white z-10">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Messages</h2>
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-cyan-600">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pb-2">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-transparent focus:bg-white focus:border-cyan-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-cyan-500/10 transition-all"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {[1, 2, 3].map((id) => (
            <div 
              key={id}
              onClick={() => setActiveChat(id)}
              className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                activeChat === id 
                  ? 'bg-cyan-50 border-l-4 border-[#06b6d4]' 
                  : 'hover:bg-slate-50 border-l-4 border-transparent'
              }`}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm ${activeChat === id ? 'bg-gradient-to-br from-cyan-400 to-teal-500' : 'bg-slate-200 text-slate-500'}`}>
                  {id === 1 ? 'H' : id === 2 ? 'R' : 'A'}
                </div>
                {/* Online Dot */}
                {id === 1 && <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className={`font-bold truncate ${activeChat === id ? 'text-slate-900' : 'text-slate-700'}`}>
                    {id === 1 ? 'Hibah Hanif' : id === 2 ? 'Rahul Varma' : 'Amit Patel'}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">10:35 AM</span>
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
        
        {/* Chat Header */}
        <div className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 shadow-sm z-20">
          <div className="flex items-center gap-4">
            <div className="relative">
               <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                 H
               </div>
               <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Hibah Hanif</h3>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                ● Online now
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-slate-400 hover:text-[#06b6d4] hover:bg-cyan-50 rounded-full transition-all"><Phone size={20} /></button>
            <button className="p-2.5 text-slate-400 hover:text-[#06b6d4] hover:bg-cyan-50 rounded-full transition-all"><Video size={20} /></button>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <button onClick={() => setShowDetails(!showDetails)} className={`p-2.5 rounded-full transition-all ${showDetails ? 'text-[#06b6d4] bg-cyan-50' : 'text-slate-400 hover:text-[#06b6d4]'}`}>
              <Info size={20} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            >
              <div className={`max-w-[70%] flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`px-5 py-3.5 text-sm font-medium leading-relaxed shadow-sm ${
                    msg.sender === 'me' 
                      ? 'bg-gradient-to-br from-[#06b6d4] to-[#0891b2] text-white rounded-[20px] rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-[20px] rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                   <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                   {msg.sender === 'me' && (
                     msg.status === 'read' ? <CheckCheck size={12} className="text-[#06b6d4]" /> : <Check size={12} className="text-slate-400" />
                   )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area (Floating) */}
        <div className="p-6">
          <form 
            onSubmit={handleSend}
            className="bg-white p-2 pr-2 pl-4 rounded-full border border-slate-200 shadow-lg shadow-slate-200/50 flex items-center gap-3 transition-all focus-within:ring-2 focus-within:ring-cyan-500/20 focus-within:border-cyan-400"
          >
            <div className="flex gap-2 text-slate-400">
              <button type="button" className="p-2 hover:bg-slate-50 rounded-full hover:text-[#06b6d4] transition-colors"><Paperclip size={20} /></button>
              <button type="button" className="p-2 hover:bg-slate-50 rounded-full hover:text-[#06b6d4] transition-colors"><ImageIcon size={20} /></button>
            </div>
            
            <input 
              type="text" 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 font-medium"
            />
            
            <button type="button" className="text-slate-400 hover:text-[#06b6d4] p-2 hover:bg-slate-50 rounded-full transition-colors mr-1">
               <Smile size={20} />
            </button>

            <button 
              type="submit"
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md ${
                messageInput.trim() 
                  ? 'bg-gradient-to-r from-[#06b6d4] to-[#0891b2] hover:scale-105 active:scale-95' 
                  : 'bg-slate-200 cursor-not-allowed'
              }`}
              disabled={!messageInput.trim()}
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </form>
        </div>
      </div>

      {/* --- RIGHT SIDEBAR (Details) --- */}
      {showDetails && (
        <div className="w-80 border-l border-slate-100 bg-white h-full overflow-y-auto hidden lg:block animate-in slide-in-from-right-10 duration-300">
          
          <div className="p-5 flex justify-between items-center border-b border-slate-50">
            <h3 className="font-bold text-slate-900">Chat details</h3>
            <button onClick={() => setShowDetails(false)} className="text-slate-400 hover:text-slate-600 bg-slate-50 p-1.5 rounded-full">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 text-center border-b border-slate-50">
             <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg mx-auto mb-3">
               H
             </div>
             <h3 className="font-bold text-slate-900 text-lg">Hibah Hanif</h3>
             <p className="text-sm text-slate-500">Member since 2024</p>
          </div>

          <div className="p-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Shared Media</h4>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[1,2,3].map((i) => (
                <div key={i} className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative cursor-pointer hover:opacity-80">
                   <img src={`https://source.unsplash.com/random/200x200?sig=${i}`} className="w-full h-full object-cover" alt="item" />
                </div>
              ))}
            </div>

            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Current Rental</h4>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex gap-3 items-center">
               <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-[#06b6d4]">
                  <FileText size={20} />
               </div>
               <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-700 truncate">Sony DSLR Kit</p>
                  <p className="text-xs text-[#06b6d4] font-medium">₹1500 / day</p>
               </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default Chat;