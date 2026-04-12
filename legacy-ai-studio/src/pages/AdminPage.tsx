import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { AREAS } from '@/constants';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/components/ErrorBoundary';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminPage() {
  const { profile } = useAuth();
  const [name, setName] = useState('');
  const [area, setArea] = useState(AREAS[0]);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [nearestStation, setNearestStation] = useState('');
  const [walkMinutes, setWalkMinutes] = useState('');
  const [priceInfo, setPriceInfo] = useState('');
  const [hasWifi, setHasWifi] = useState(true);
  const [hasPower, setHasPower] = useState(true);
  const [canCall, setCanCall] = useState(false);
  const [hasPrivateRoom, setHasPrivateRoom] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Admin check
  const isAdmin = profile?.role === 'admin' || profile?.email === 'hamazaki.reiki@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('管理者権限が必要です。');
      return;
    }

    setSubmitting(true);
    try {
      const facilityData = {
        name,
        area,
        description,
        address,
        nearestStation,
        walkMinutes: parseInt(walkMinutes) || 0,
        priceInfo,
        hasWifi,
        hasPower,
        canCall,
        hasPrivateRoom,
        images: ['https://picsum.photos/seed/coworking/800/600'],
        status: 'published',
        averageRating: 0,
        reviewCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await addDoc(collection(db, 'facilities'), facilityData);
      alert('施設を登録しました。');
      
      // Reset form
      setName('');
      setDescription('');
      setAddress('');
      setNearestStation('');
      setWalkMinutes('');
      setPriceInfo('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'facilities');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-neutral-500">管理者権限がありません。</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">管理画面 - 施設登録</h1>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">施設名</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">エリア</Label>
                <select 
                  className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明文</Label>
              <Textarea 
                id="description" 
                className="min-h-[100px]" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="station">最寄駅</Label>
                  <Input id="station" value={nearestStation} onChange={(e) => setNearestStation(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="walk">徒歩(分)</Label>
                  <Input id="walk" type="number" value={walkMinutes} onChange={(e) => setWalkMinutes(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">料金目安</Label>
              <Input id="price" value={priceInfo} onChange={(e) => setPriceInfo(e.target.value)} placeholder="例: 500円/時" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="wifi" checked={hasWifi} onCheckedChange={(c) => setHasWifi(c === true)} />
                <label htmlFor="wifi" className="text-sm font-medium">Wi-Fiあり</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="power" checked={hasPower} onCheckedChange={(c) => setHasPower(c === true)} />
                <label htmlFor="power" className="text-sm font-medium">電源あり</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="call" checked={canCall} onCheckedChange={(c) => setCanCall(c === true)} />
                <label htmlFor="call" className="text-sm font-medium">通話可能</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="private" checked={hasPrivateRoom} onCheckedChange={(c) => setHasPrivateRoom(c === true)} />
                <label htmlFor="private" className="text-sm font-medium">個室あり</label>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? '登録中...' : '登録する'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
