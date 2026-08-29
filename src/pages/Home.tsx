/**
 * @file Home.tsx
 * @description Single-page Moon Place contact screen with messenger shortcuts in Moon2-inspired style. Mobile-first responsive layout with prefilled messages.
 */

import React from 'react'
import { MessageCircle, Send, Smartphone } from 'lucide-react'

/**
 * Props for a single messenger button.
 */
interface MessengerButtonProps {
  /** Visible messenger name. */
  label: string
  /** Short helper text under the label. */
  description: string
  /** Target URL or deep link. */
  href: string
  /** Icon element to render on the left side. */
  icon: React.ReactNode
  /** Visual accent type for color styling. */
  accent: 'whatsapp' | 'telegram' | 'max'
}

/**
 * MessengerButton renders a stylized CTA button that links to a messenger app.
 */
const MessengerButton: React.FC<MessengerButtonProps> = ({
  label,
  description,
  href,
  icon,
  accent,
}) => {
  /**
   * Returns accent-specific Tailwind classes for the glowing indicator.
   */
  const accentClasses = (() => {
    switch (accent) {
      case 'whatsapp':
        return 'from-emerald-400 to-emerald-500 shadow-emerald-500/40'
      case 'telegram':
        return 'from-sky-400 to-sky-500 shadow-sky-500/40'
      case 'max':
      default:
        return 'from-violet-400 to-fuchsia-500 shadow-violet-500/40'
    }
  })()

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between gap-4 rounded-full border border-slate-600/60 bg-slate-900/60 px-5 py-3 text-sm text-slate-50 shadow-[0_20px_60px_rgba(0,0,0,0.75)] backdrop-blur-md transition hover:border-slate-200/80 hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      {/* Accent glow dot */}
      <div
        className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr ${accentClasses} shadow-lg transition-transform duration-300 group-hover:scale-110`}
      >
        <span className="text-slate-950">{icon}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-100">
          {label}
        </span>
        <span className="mt-0.5 truncate text-[11px] text-slate-300">
          {description}
        </span>
      </div>

      <div className="ml-2 flex h-6 w-6 items-center justify-center rounded-full border border-slate-500/80 text-[10px] text-slate-200 transition group-hover:border-slate-50 group-hover:bg-slate-50 group-hover:text-slate-950">
        ↗
      </div>
    </a>
  )
}

/**
 * HomePage is the main single-page layout that showcases the Moon Place logo and messenger buttons.
 * Mobile-first: text and actions appear before the logo on small screens.
 */
const HomePage: React.FC = () => {
  const phoneDisplay = '+7 (960) 066-71-24'
  const phoneRaw = '79600667124'

  /** Default prefilled message that will be sent in messengers. */
  const defaultMessage = 'Moon2Hotel'
  const encodedMessage = encodeURIComponent(defaultMessage)

  return (
    <div className="min-h-screen bg-[#050609] text-slate-50">
      {/* Background glow & subtle noise layer */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-slate-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-[-120px] h-96 w-96 rounded-full bg-slate-700/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),transparent_55%),radial-gradient(circle_at_bottom,_rgba(148,163,184,0.18),transparent_55%)] opacity-80" />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-stretch gap-8 md:flex-row md:items-center md:gap-16">
          {/* Content / actions column - first on mobile */}
          <section className="order-1 w-full max-w-xl md:order-1">
            <header className="space-y-4 text-left sm:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                Moon Place · Moon2 Hotel
              </p>
              <h1 className="text-2xl font-light tracking-[0.28em] text-slate-50 sm:text-3xl md:text-4xl">
                STAY IN TOUCH
              </h1>
              <p className="max-w-md text-sm text-slate-300">
                Напишите нам в удобном мессенджере, чтобы забронировать номер,
                уточнить детали размещения или задать любые вопросы о Moon2.
              </p>
            </header>

            {/* Phone info */}
            <div className="mt-5 inline-flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-700/80 bg-slate-900/60 px-4 py-3 text-[11px] text-slate-200 backdrop-blur sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
                <span className="uppercase tracking-[0.18em] text-slate-400">
                  Single contact
                </span>
              </div>
              <a
                href={`tel:+${phoneRaw}`}
                className="text-xs font-medium text-slate-50 underline-offset-4 hover:underline"
              >
                {phoneDisplay}
              </a>
            </div>

            {/* Messenger buttons */}
            <div className="mt-7 flex flex-col gap-3">
              <MessengerButton
                label="Max"
                description="Открыть стандартное приложение сообщений с готовым текстом"
                href={`sms:+${phoneRaw}&body=${encodedMessage}`}
                icon={<Smartphone className="h-4 w-4" />}
                accent="max"
              />
              <MessengerButton
                label="WhatsApp"
                description="Сообщение в WhatsApp с уже заполненным текстом"
                href={`https://wa.me/${phoneRaw}?text=${encodedMessage}`}
                icon={<MessageCircle className="h-4 w-4" />}
                accent="whatsapp"
              />
              <MessengerButton
                label="Telegram"
                description="Открыть Telegram с подготовленным текстом для отправки"
                href={`https://t.me/share/url?url=+${phoneRaw}&text=${encodedMessage}`}
                icon={<Send className="h-4 w-4" />}
                accent="telegram"
              />
            </div>

            {/* Footer note */}
            <footer className="mt-6 text-[11px] leading-relaxed text-slate-400">
              Все мессенджеры привязаны к одному номеру. Если ссылка не
              открылась автоматически, добавьте номер в контакты и найдите нас
              в выбранном приложении.
            </footer>
          </section>

          {/* Logo / visual column - moves below on mobile */}
          <section className="order-2 w-full max-w-sm self-center md:order-2 md:self-auto">
            <div className="relative mt-4 md:mt-0">
              <div className="absolute -inset-10 -z-10 rounded-[38px] bg-gradient-to-br from-slate-50/5 via-slate-50/0 to-slate-50/10 opacity-80 blur-xl" />
              <div className="relative overflow-hidden rounded-[34px] border border-slate-700/70 bg-[#050609]/80 shadow-[0_35px_120px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                <div className="relative aspect-square bg-[#15161b]">
                  <img
                    src="https://pub-cdn.sider.ai/u/U0GVH81A93/web-coder/6a4aa10a52b1a035472e3394/resource/79e1e4b3-9447-4ffb-b6a9-0796da4b4cce.jpg"
                    alt="Moon Place logo"
                    className="h-full w-full object-contain"
                  />
                  {/* Soft vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(0,0,0,0.9)_100%)]" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default HomePage
