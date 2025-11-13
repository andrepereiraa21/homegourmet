'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/custom/navigation';

interface FAQItem {
  question: string;
  answer: string;
}

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Como digitalizar ingredientes?',
      answer: 'Clique no botão de câmera na tela inicial, tire uma foto dos seus ingredientes e nossa IA irá identificá-los automaticamente. Você pode editar, adicionar ou remover ingredientes após a digitalização.'
    },
    {
      question: 'Como funcionam as receitas personalizadas?',
      answer: 'Baseado nos ingredientes que você digitalizou, nossa IA sugere receitas que você pode fazer. O percentual de match indica quantos dos ingredientes necessários você já possui.'
    },
    {
      question: 'Posso adicionar ingredientes manualmente?',
      answer: 'Sim! Na página de inventário, você pode adicionar ingredientes manualmente clicando no botão "Adicionar Ingrediente" e preenchendo as informações.'
    },
    {
      question: 'Como funciona a lista de compras?',
      answer: 'Ao visualizar uma receita, você pode adicionar os ingredientes que faltam diretamente à lista de compras. Acesse a lista pelo menu inferior para gerenciar seus itens.'
    },
    {
      question: 'Meus dados são salvos?',
      answer: 'Sim, todos os seus dados são salvos localmente no seu navegador. Nenhuma informação é enviada para servidores externos, garantindo sua privacidade.'
    },
    {
      question: 'Como configurar restrições alimentares?',
      answer: 'Vá em Perfil > Preferências e selecione suas restrições alimentares, alergias e cozinhas favoritas. Isso ajudará a personalizar as receitas sugeridas.'
    },
    {
      question: 'Posso exportar meus dados?',
      answer: 'Sim! Vá em Perfil > Privacidade e clique em "Exportar Meus Dados" para baixar uma cópia de todas as suas informações em formato JSON.'
    },
    {
      question: 'Como funciona o histórico de receitas?',
      answer: 'Todas as receitas que você visualiza são automaticamente salvas no histórico. Acesse em Perfil > Histórico para ver suas receitas recentes.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/20 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/profile">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Ajuda
          </h1>
          <div className="w-10" />
        </div>

        {/* Help Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Como Podemos Ajudar?
              </h3>
              <p className="text-white/90 text-sm">
                Encontre respostas para as perguntas mais frequentes ou entre em contato conosco.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <a
            href="mailto:suporte@chefemcasa.com"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              Email
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              suporte@chefemcasa.com
            </p>
          </a>

          <button className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all text-left">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              Chat ao Vivo
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Em breve disponível
            </p>
          </button>

          <button className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all text-left">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
              <Book className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              Guia Completo
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Documentação detalhada
            </p>
          </button>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Perguntas Frequentes
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Help */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
            Não encontrou o que procura?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Nossa equipe está pronta para ajudar! Entre em contato através do email ou aguarde a disponibilidade do chat ao vivo.
          </p>
          <a href="mailto:suporte@chefemcasa.com">
            <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl">
              Enviar Email
            </Button>
          </a>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
