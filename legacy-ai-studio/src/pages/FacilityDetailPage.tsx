import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Clock, Wifi, Zap, Phone, DoorOpen, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { Facility, Review } from '@/types';
import { handleFirestoreError, OperationType } from '@/components/ErrorBoundary';
import { useAuth } from '@/contexts/AuthContext';

export default function FacilityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [facility, setFacility] = useState<Facility | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthReady } = useAuth();

  useEffect(() => {
    if (!id || !isAuthReady) return;

    // Fetch facility detail
    const unsubFacility = onSnapshot(doc(db, 'facilities', id), (docSnap) => {
      if (docSnap.exists()) {
        setFacility({ id: docSnap.id, ...docSnap.data() } as Facility);
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `facilities/${id}`);
    });

    // Fetch reviews
    const reviewsQuery = query(
      collection(db, 'facilities', id, 'reviews'),
      orderBy('createdAt', 'desc')
    );
    const unsubReviews = onSnapshot(reviewsQuery, (snapshot) => {
      const reviewData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(reviewData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `facilities/${id}/reviews`);
    });

    return () => {
      unsubFacility();
      unsubReviews();
    };
  }, [id, isAuthReady]);

  if (loading) {
    return <div className="text-center py-20">読み込み中...</div>;
  }

  if (!facility) {
    return <div className="text-center py-20">施設が見つかりませんでした。</div>;
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-neutral-500">
        <Link to="/" className="hover:text-primary">ホーム</Link>
        <ChevronRight size={14} />
        <Link to="/search" className="hover:text-primary">施設一覧</Link>
        <ChevronRight size={14} />
        <span className="text-neutral-900 font-medium">{facility.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Image */}
          <div className="aspect-video overflow-hidden rounded-3xl bg-neutral-200">
            <img 
              src={facility.images[0]} 
              alt={facility.name} 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{facility.area}</Badge>
              {facility.isFeatured && <Badge className="bg-amber-500">おすすめ</Badge>}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl font-extrabold tracking-tight">{facility.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-2xl font-bold text-amber-500">
                  <Star size={24} fill="currentColor" />
                  {facility.averageRating}
                </div>
                <span className="text-neutral-500">({facility.reviewCount}件の口コミ)</span>
              </div>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              {facility.description}
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">基本情報・設備</TabsTrigger>
              <TabsTrigger value="reviews">口コミ ({reviews.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-8 pt-6">
              <section className="space-y-4">
                <h3 className="text-xl font-bold">設備・サービス</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className={`flex flex-col items-center p-4 rounded-2xl border ${facility.hasWifi ? 'border-primary/20 bg-primary/5' : 'opacity-40'}`}>
                    <Wifi className={facility.hasWifi ? 'text-primary' : ''} />
                    <span className="mt-2 text-xs font-bold">Wi-Fi</span>
                  </div>
                  <div className={`flex flex-col items-center p-4 rounded-2xl border ${facility.hasPower ? 'border-primary/20 bg-primary/5' : 'opacity-40'}`}>
                    <Zap className={facility.hasPower ? 'text-primary' : ''} />
                    <span className="mt-2 text-xs font-bold">電源</span>
                  </div>
                  <div className={`flex flex-col items-center p-4 rounded-2xl border ${facility.canCall ? 'border-primary/20 bg-primary/5' : 'opacity-40'}`}>
                    <Phone className={facility.canCall ? 'text-primary' : ''} />
                    <span className="mt-2 text-xs font-bold">通話可能</span>
                  </div>
                  <div className={`flex flex-col items-center p-4 rounded-2xl border ${facility.hasPrivateRoom ? 'border-primary/20 bg-primary/5' : 'opacity-40'}`}>
                    <DoorOpen className={facility.hasPrivateRoom ? 'text-primary' : ''} />
                    <span className="mt-2 text-xs font-bold">個室あり</span>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold">アクセス・営業時間</h3>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-neutral-400 mt-1" size={18} />
                      <div>
                        <p className="font-medium">{facility.address}</p>
                        <p className="text-sm text-neutral-500">{facility.nearestStation} 徒歩{facility.walkMinutes}分</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="text-neutral-400 mt-1" size={18} />
                      <div>
                        <p className="font-medium">{facility.businessHours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">口コミ一覧</h3>
                <Link to={`/facility/${facility.id}/review`}>
                  <Button size="sm">口コミを投稿する</Button>
                </Link>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.userPhotoURL} />
                            <AvatarFallback>{review.userName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold">{review.userName}</p>
                            <p className="text-xs text-neutral-500">
                              {review.userRole === 'worker' ? '社会人' : '学生'} • {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star size={16} fill="currentColor" />
                          {review.rating}
                        </div>
                      </div>
                      <p className="text-neutral-700 leading-relaxed">
                        {review.comment}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs">
                        <div className="flex flex-col">
                          <span className="text-neutral-400">静かさ</span>
                          <span className="font-bold">{review.quietnessRating}/5</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-neutral-400">通話しやすさ</span>
                          <span className="font-bold">{review.callEaseRating}/5</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-neutral-400">設備満足度</span>
                          <span className="font-bold">{review.facilitySatisfactionRating}/5</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">利用料金</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-3xl font-bold text-primary">
                {facility.priceInfo}
              </div>
              <div className="space-y-2">
                <Button className="w-full" size="lg">公式サイトで予約</Button>
                <p className="text-[10px] text-center text-neutral-400">
                  ※外部サイトへ遷移します
                </p>
              </div>
              
              {facility.isBusinessInquiryAvailable && (
                <div className="pt-6 border-t space-y-4">
                  <div className="text-sm font-bold">法人利用・シェアオフィス検討</div>
                  <Link to={`/business/contact?facilityId=${facility.id}`}>
                    <Button variant="outline" className="w-full">法人向け問い合わせ</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
