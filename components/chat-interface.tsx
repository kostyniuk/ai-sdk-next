'use client';

import { UIMessage, useChat } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function ChatInterface() {
    const { messages, sendMessage } = useChat();
    const [input, setInput] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage({ text: input });
        setInput('');
    };

    return (
        <div className="flex flex-col h-full relative">
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-8 relative z-10 h-full">
                {/* Header Section */}
                <header className="text-center mb-12 space-y-4">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                        AI Assistant
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                        Your intelligent companion for code, design, and answers. Always here to help.
                    </p>
                </header>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col min-h-0">
                    <ScrollArea ref={scrollAreaRef} className="flex-1">
                        <div className="space-y-6 pb-8">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-16 text-center space-y-8">
                                    <div className="p-6 rounded-2xl bg-secondary/30 backdrop-blur-md border border-border/50 shadow-sm">
                                        <Bot className="w-12 h-12 text-primary" />
                                    </div>
                                    <div className="space-y-3 max-w-md">
                                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                                            How can I help you today?
                                        </h2>
                                        <p className="text-muted-foreground font-light">
                                            I can help you write code, design interfaces, or answer any questions you might have.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md mt-4">
                                        {['Explain quantum computing', 'Write a Python script', 'Design a logo concept', 'Debug my code'].map((suggestion) => (
                                            <button
                                                key={suggestion}
                                                onClick={() => {
                                                    setInput(suggestion);
                                                }}
                                                className="p-4 text-sm text-left transition-all border border-border rounded-xl hover:bg-card/80 hover:border-primary/30 bg-card/30 backdrop-blur-sm font-light"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {messages.map((message: UIMessage) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.role !== 'user' && (
                                        <Avatar className="w-8 h-8 border border-border mt-1">
                                            <AvatarFallback className="bg-secondary text-primary font-medium text-xs">
                                                AI
                                            </AvatarFallback>
                                        </Avatar>
                                    )}

                                    <div
                                        className={`relative px-5 py-3 text-sm rounded-xl max-w-[85%] md:max-w-[70%] leading-relaxed ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-pink-500/20 border border-pink-500/30 backdrop-blur-md text-foreground shadow-sm'
                                            }`}
                                    >
                                        {message.parts.map((part, i) => {
                                            switch (part.type) {
                                                case 'text':
                                                    return (
                                                        <div key={`${message.id}-${i}`} className="whitespace-pre-wrap font-light">
                                                            {part.text}
                                                        </div>
                                                    );
                                                default:
                                                    return null;
                                            }
                                        })}
                                    </div>

                                    {message.role === 'user' && (
                                        <Avatar className="w-8 h-8 border border-border mt-1">
                                            <AvatarFallback className="bg-card text-foreground font-medium text-xs">
                                                ME
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="pt-6 border-t border-border">
                        <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Type your message..."
                                className="flex-1 py-6 pl-5 pr-14 text-base rounded-xl border-border bg-card/50 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-primary/30 font-light shadow-sm"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!input.trim()}
                                className="absolute right-2 w-10 h-10 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                        <div className="mt-4 text-center">
                            <p className="text-xs text-muted-foreground font-light">
                                AI can make mistakes. Please check important information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
