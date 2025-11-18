'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { X, Send, Bot } from 'lucide-react'

// Componentes personalizados para ReactMarkdown
const MarkdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-2 last:mb-0">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside mb-2">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside mb-2">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="mb-1">{children}</li>
  )
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { 
      text: '¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte?', 
      sender: 'bot' 
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = async () => {
    if (input.trim() === '') return

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { text: input, sender: 'user' }])
    const userMessage = input
    setInput('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })

      const data = await res.json()

      if (data.error) {
        setMessages(prev => [
          ...prev,
          { text: 'Hubo un problema al obtener la respuesta de la IA.', sender: 'bot' }
        ])
        return
      }

      // Agregar respuesta real de Gemini
      setMessages(prev => [...prev, { text: data.text, sender: 'bot' }])

    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: 'Error de conexión con el servidor.', sender: 'bot' }
      ])
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-80 h-96 mb-4"
          >
            <Card className="h-full flex flex-col shadow-xl mb-0 mt-0 py-0">
              <CardHeader className="bg-primary text-primary-foreground flex flex-row items-center justify-between space-y-0 rounded-t-xl">
                <h3 className="font-semibold">Asistente Virtual</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X />
                </Button>
              </CardHeader>

              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4 text-sm h-full">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <ReactMarkdown components={MarkdownComponents}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-4 border-t">
                <div className="flex w-full space-x-2">
                  <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="w-10 h-10 rounded-full shadow-lg"
        >
          <Bot color="black"/>
        </Button>
      </motion.div>
    </div>
  )
}