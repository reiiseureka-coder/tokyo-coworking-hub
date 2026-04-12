import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { signInWithGoogle, logout } from '@/lib/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <MapPin size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">Tokyo Coworking Hub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/search" className="text-sm font-medium hover:text-primary transition-colors">
              施設を探す
            </Link>
            <Link to="/reviews" className="text-sm font-medium hover:text-primary transition-colors">
              新着口コミ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/business" className="hidden sm:block">
              <Button variant="outline" size="sm" className="text-xs font-semibold">
                法人の方はこちら
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || undefined} />
                  <AvatarFallback>{user.displayName?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" onClick={logout} title="ログアウト">
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={signInWithGoogle} className="gap-2">
                <User size={18} />
                <span>ログイン</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Tokyo Coworking Hub</h3>
              <p className="text-sm text-neutral-500">
                東京のコワーキングスペースを、もっと探しやすく。
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">探す</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/search?area=shinjuku" className="hover:text-primary">新宿エリア</Link></li>
                <li><Link to="/search?area=shibuya" className="hover:text-primary">渋谷エリア</Link></li>
                <li><Link to="/search?area=ikebukuro" className="hover:text-primary">池袋エリア</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">サービス</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/business" className="hover:text-primary">法人向け案内</Link></li>
                <li><Link to="/terms" className="hover:text-primary">利用規約</Link></li>
                <li><Link to="/privacy" className="hover:text-primary">プライバシーポリシー</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">お問い合わせ</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/contact" className="hover:text-primary">個人の方</Link></li>
                <li><Link to="/business/contact" className="hover:text-primary">法人の方</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-xs text-neutral-400">
            © 2026 Tokyo Coworking Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
