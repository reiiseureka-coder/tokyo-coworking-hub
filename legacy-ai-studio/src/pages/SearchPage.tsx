import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Star, Wifi, Zap, Phone, DoorOpen } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Facility } from '@/types';
import { Link } from 'react-router-dom';
import { handleFirestoreError, OperationType } from '@/components/ErrorBoundary';
import { useAuth } from '@/contexts/AuthContext';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthReady } = useAuth();

  useEffect(() => {
    if (!isAuthReady) return;

    const q = query(collection(db, 'facilities'), where('status', '==', 'published'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const facilityData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Facility[];
      setFacilities(facilityData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'facilities');
    });

    return () => unsubscribe();
  }, [isAuthReady]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full md:w-64 space-y-8">
        <div className="space-y-4">
          <h3 className="font-bold">絞り込み条件</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>設備・サービス</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="dropin" />
                  <label htmlFor="dropin" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    ドロップイン可能
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="call" />
                  <label htmlFor="call" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    通話可能
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="private" />
                  <label htmlFor="private" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    個室あり
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wifi" />
                  <label htmlFor="wifi" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Wi-Fiあり
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>エリア</Label>
              <select className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm">
                <option>すべてのエリア</option>
                <option>新宿</option>
                <option>渋谷</option>
                <option>池袋</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* Results Section */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <Input 
              placeholder="施設名、駅名などで検索..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>検索</Button>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            <span className="font-bold text-neutral-900">{facilities.length}</span> 件の施設が見つかりました
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span>並び替え:</span>
            <select className="bg-transparent font-bold">
              <option>おすすめ順</option>
              <option>評価の高い順</option>
              <option>新着順</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-neutral-400">読み込み中...</div>
        ) : facilities.length === 0 ? (
          <div className="py-20 text-center text-neutral-400">施設が見つかりませんでした。</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {facilities.map((facility) => (
              <Link key={facility.id} to={`/facility/${facility.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0 flex flex-col sm:flex-row h-full sm:h-48">
                    <div className="w-full sm:w-64 h-48 sm:h-auto overflow-hidden">
                      <img 
                        src={facility.images[0]} 
                        alt={facility.name} 
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                            {facility.area}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                            <Star size={14} fill="currentColor" />
                            {facility.averageRating}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold">{facility.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-neutral-500">
                          <MapPin size={14} />
                          {facility.nearestStation} 徒歩{facility.walkMinutes}分
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 pt-4 border-t mt-4">
                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                          <Wifi size={14} className={facility.hasWifi ? 'text-primary' : 'text-neutral-300'} />
                          Wi-Fi
                        </div>
                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                          <Zap size={14} className={facility.hasPower ? 'text-primary' : 'text-neutral-300'} />
                          電源
                        </div>
                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                          <Phone size={14} className={facility.canCall ? 'text-primary' : 'text-neutral-300'} />
                          通話
                        </div>
                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                          <DoorOpen size={14} className={facility.hasPrivateRoom ? 'text-primary' : 'text-neutral-300'} />
                          個室
                        </div>
                        <div className="ml-auto font-bold text-primary">
                          {facility.priceInfo}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
