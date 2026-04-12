import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Zap, Shield, Coffee } from 'lucide-react';
import { AREAS } from '@/constants';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-neutral-900 px-6 py-20 text-white md:px-12 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=2000" 
            alt="Coworking space background" 
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl text-center space-y-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            東京で、最高の作業場所を。
          </h1>
          <p className="text-lg text-neutral-300 md:text-xl">
            静かさ、通話のしやすさ、設備。あなたの「こだわり」で選べるコワーキングスペース口コミサイト。
          </p>
          <div className="mx-auto flex max-w-xl items-center gap-2 rounded-full bg-white p-2 shadow-2xl">
            <div className="flex flex-1 items-center gap-2 px-4">
              <Search className="text-neutral-400" size={20} />
              <Input 
                placeholder="エリア、駅名で検索..." 
                className="border-none bg-transparent text-neutral-900 focus-visible:ring-0"
              />
            </div>
            <Button className="rounded-full px-8">検索</Button>
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">人気のエリアから探す</h2>
          <Link to="/search" className="text-sm font-semibold text-primary hover:underline">
            すべて見る
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {AREAS.slice(0, 5).map((area) => (
            <Link 
              key={area} 
              to={`/search?area=${area}`}
              className="group relative h-32 overflow-hidden rounded-2xl bg-neutral-200"
            >
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{area}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Zap size={32} />
          </div>
          <h3 className="text-xl font-bold">ドロップイン対応</h3>
          <p className="text-sm text-neutral-500">
            予約なしで1時間から利用可能な施設を多数掲載。急な作業にも対応。
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Shield size={32} />
          </div>
          <h3 className="text-xl font-bold">リアルな口コミ</h3>
          <p className="text-sm text-neutral-500">
            「実際に行ってみたらうるさかった」を防ぐ、作業者目線の詳細レビュー。
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Coffee size={32} />
          </div>
          <h3 className="text-xl font-bold">設備で絞り込み</h3>
          <p className="text-sm text-neutral-500">
            Wi-Fi、電源はもちろん、個室やモニター貸出、通話可否で検索可能。
          </p>
        </div>
      </section>
    </div>
  );
}
