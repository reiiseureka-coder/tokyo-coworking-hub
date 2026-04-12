import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { USER_ROLES, GENDERS, AGE_GROUPS } from '@/constants';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { Facility, Review } from '@/types';
import { handleFirestoreError, OperationType } from '@/components/ErrorBoundary';

export default function ReviewPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile, isAuthReady } = useAuth();
  
  const [facility, setFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [rating, setRating] = useState(0);
  const [quietnessRating, setQuietnessRating] = useState(0);
  const [callEaseRating, setCallEaseRating] = useState(0);
  const [facilitySatisfactionRating, setFacilitySatisfactionRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id || !isAuthReady) return;
    
    const fetchFacility = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'facilities', id));
        if (docSnap.exists()) {
          setFacility({ id: docSnap.id, ...docSnap.data() } as Facility);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `facilities/${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [id, isAuthReady]);

  if (loading) {
    return <div className="text-center py-20">読み込み中...</div>;
  }

  if (!facility) {
    return <div className="text-center py-20">施設が見つかりませんでした。</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id) {
      alert('ログインが必要です。');
      return;
    }
    if (rating === 0) {
      alert('総合評価を選択してください。');
      return;
    }

    setSubmitting(true);
    try {
      const reviewData = {
        facilityId: id,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userPhotoURL: user.photoURL || null,
        userRole: profile?.role || null,
        userGender: profile?.gender || null,
        userAgeGroup: profile?.ageGroup || null,
        rating,
        quietnessRating,
        callEaseRating,
        facilitySatisfactionRating,
        comment,
        createdAt: Date.now(),
      };

      await addDoc(collection(db, 'facilities', id, 'reviews'), reviewData);
      
      alert('口コミを投稿しました！');
      navigate(`/facility/${id}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `facilities/${id}/reviews`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">口コミを投稿する</h1>
        <p className="text-neutral-500">{facility.name}</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Ratings */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base">総合評価</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`p-1 transition-colors ${rating >= s ? 'text-amber-500' : 'text-neutral-200'}`}
                    >
                      <Star size={32} fill={rating >= s ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label>静かさ</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuietnessRating(s)}
                        className={`p-1 transition-colors ${quietnessRating >= s ? 'text-amber-500' : 'text-neutral-200'}`}
                      >
                        <Star size={20} fill={quietnessRating >= s ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>通話しやすさ</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setCallEaseRating(s)}
                        className={`p-1 transition-colors ${callEaseRating >= s ? 'text-amber-500' : 'text-neutral-200'}`}
                      >
                        <Star size={20} fill={callEaseRating >= s ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>設備満足度</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFacilitySatisfactionRating(s)}
                        className={`p-1 transition-colors ${facilitySatisfactionRating >= s ? 'text-amber-500' : 'text-neutral-200'}`}
                      >
                        <Star size={20} fill={facilitySatisfactionRating >= s ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-3">
              <Label htmlFor="comment">口コミの内容</Label>
              <Textarea 
                id="comment" 
                placeholder="作業のしやすさ、雰囲気、おすすめの席など、あなたの体験を教えてください" 
                className="min-h-[150px]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            {/* User Attributes */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-bold">あなたの属性（任意）</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>職業・属性</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {USER_ROLES.map(role => (
                        <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>性別</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENDERS.map(gender => (
                        <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>年齢層</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGE_GROUPS.map(age => (
                        <SelectItem key={age.value} value={age.value}>{age.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)} disabled={submitting}>キャンセル</Button>
              <Button type="submit" className="flex-1" disabled={submitting}>
                {submitting ? '投稿中...' : '投稿する'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
