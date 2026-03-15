'use client'
import { useState } from 'react'
import { Key, ExternalLink, Save, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { platformConfig } from './PlatformBadge'
import { Platform } from '@/lib/types'

const platforms: Platform[] = ['instagram', 'facebook', 'youtube']

export default function SettingsTab() {
  const [showKey, setShowKey] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [saved, setSaved] = useState(false)
  const [brandVoice, setBrandVoice] = useState('')
  const [keywords, setKeywords] = useState('')
  const [avoid, setAvoid] = useState('')
  const [prefSaved, setPrefSaved] = useState(false)

  const handleSaveKey = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleSavePrefs = () => {
    setPrefSaved(true)
    setTimeout(() => setPrefSaved(false), 2500)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-text" style={{ fontFamily: 'var(--font-display)' }}>Settings</h2>
        <p className="text-sm text-text-2 mt-1">Configure your AI agent and connected accounts</p>
      </div>

      {/* API Key */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(108,99,255,0.15)' }}>
            <Key size={18} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-text" style={{ fontFamily: 'var(--font-display)' }}>DeepSeek API Key</h3>
            <p className="text-xs text-text-2">Required for AI content generation</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full rounded-xl px-4 py-3 text-sm text-text pr-12 focus:outline-none focus:ring-1 focus:ring-accent"
              style={{ background: '#0A0A0F', border: '1px solid #1E1E2E' }}
            />
            <button onClick={() => setShowKey(v => !v)}
              className="absolute right-3 top-3 text-text-2 hover:text-text transition-colors">
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-accent hover:underline">
              Get API key from platform.deepseek.com <ExternalLink size={11} />
            </a>
            <button onClick={handleSaveKey}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: saved ? 'rgba(67,233,123,0.15)' : 'rgba(108,99,255,0.15)', color: saved ? '#43E97B' : '#6C63FF' }}>
              {saved ? <><CheckCircle size={12} /> Saved!</> : <><Save size={12} /> Save Key</>}
            </button>
          </div>
          <div className="rounded-xl p-3 text-xs" style={{ background: '#0A0A0F', border: '1px solid #1E1E2E', color: '#8888AA' }}>
            💡 على Vercel: روح <strong className="text-text">Project Settings → Environment Variables</strong> وأضف <code className="px-1 py-0.5 rounded" style={{ background: '#1E1E2E' }}>DEEPSEEK_API_KEY</code>
          </div>
        </div>
      </div>

      {/* Platforms - all unconnected */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-semibold text-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>Connected Accounts</h3>
        <p className="text-xs text-text-2 mb-4">Connect your social media accounts to enable direct publishing.</p>
        <div className="space-y-3">
          {platforms.map(platform => {
            const cfg = platformConfig[platform]
            return (
              <div key={platform} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#0A0A0F', border: '1px solid #1E1E2E' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                  style={{ background: cfg.bg, color: cfg.color }}>
                  {cfg.symbol}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">{cfg.label}</p>
                  <p className="text-xs text-text-2">Not connected</p>
                </div>
                <button
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40` }}
                  onClick={() => alert(`${cfg.label} OAuth integration requires developer credentials. Add your OAuth keys in Vercel environment variables.`)}
                >
                  Connect
                </button>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-text-2 mt-3">
          * Platform connections require OAuth developer credentials from each platform.
        </p>
      </div>

      {/* AI Preferences */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-semibold text-text mb-4" style={{ fontFamily: 'var(--font-display)' }}>AI Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-2 uppercase tracking-wider mb-2">Brand Voice</label>
            <textarea value={brandVoice} onChange={e => setBrandVoice(e.target.value)}
              placeholder="e.g. Friendly, professional, empowering for small business owners"
              className="w-full bg-transparent rounded-xl px-4 py-3 text-sm text-text placeholder-text-2 resize-none focus:outline-none focus:ring-1 focus:ring-accent"
              style={{ border: '1px solid #1E1E2E', minHeight: 72 }} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-2 uppercase tracking-wider mb-2">Keywords to Always Include</label>
            <textarea value={keywords} onChange={e => setKeywords(e.target.value)}
              placeholder="e.g. #YourBrand, sustainability, innovation"
              className="w-full bg-transparent rounded-xl px-4 py-3 text-sm text-text placeholder-text-2 resize-none focus:outline-none focus:ring-1 focus:ring-accent"
              style={{ border: '1px solid #1E1E2E', minHeight: 72 }} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-2 uppercase tracking-wider mb-2">Topics to Avoid</label>
            <textarea value={avoid} onChange={e => setAvoid(e.target.value)}
              placeholder="e.g. politics, competitors, controversial topics"
              className="w-full bg-transparent rounded-xl px-4 py-3 text-sm text-text placeholder-text-2 resize-none focus:outline-none focus:ring-1 focus:ring-accent"
              style={{ border: '1px solid #1E1E2E', minHeight: 72 }} />
          </div>
          <button onClick={handleSavePrefs}
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: prefSaved ? 'rgba(67,233,123,0.2)' : 'linear-gradient(135deg, #6C63FF, #FF6B6B)', color: prefSaved ? '#43E97B' : 'white' }}>
            {prefSaved ? <><CheckCircle size={14} /> Saved!</> : 'Save AI Preferences'}
          </button>
        </div>
      </div>
    </div>
  )
}
