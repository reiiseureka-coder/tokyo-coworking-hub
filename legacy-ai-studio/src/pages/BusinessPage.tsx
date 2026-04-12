import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Building2, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/components/ErrorBoundary';

export default function BusinessPage() {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const inquiryData = {
        companyName,
        contactName,
        email,
        phoneNumber,
        content,
        createdAt: Date.now(),
        status: 'new'
      };

      await addDoc(collection(db, 'businessInquiries'), inquiryData);
      alert('お問い合わせを送信しました。担当者より折り返しご連絡いたします。');
      
      // Reset form
      setCompanyName('');
      setContactName('');
      setEmail('');
      setPhoneNumber('');
      setContent('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'businessInquiries');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20 bg-primary/5">
          FOR BUSINESS
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          法人利用・シェアオフィス契約を<br />もっとスムーズに。
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-neutral-500">
          従業員のテレワーク環境整備や、サテライトオフィスの開設を検討中の企業様へ。<br />
          Tokyo Coworking Hubが最適な施設選びと導入をサポートします。
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="rounded-full px-8">お問い合わせ</Button>
          <Button size="lg" variant="outline" className="rounded-full px-8">導入事例を見る</Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-none bg-neutral-100 shadow-none">
          <CardContent className="p-8 space-y-4">
            <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
              <Building2 size={24} />
            </div>
            <h3 className="text-xl font-bold">最適な施設をご提案</h3>
            <p className="text-sm text-neutral-600">
              エリア、人数、予算、セキュリティ要件に合わせて、都内数百の施設から最適なプランをご案内。
            </p>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100 shadow-none">
          <CardContent className="p-8 space-y-4">
            <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold">法人一括契約</h3>
            <p className="text-sm text-neutral-600">
              複数の施設を利用しても請求は一つに。従業員の利用状況もダッシュボードで一括管理可能です。
            </p>
          </CardContent>
        </Card>
        <Card className="border-none bg-neutral-100 shadow-none">
          <CardContent className="p-8 space-y-4">
            <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-bold">特別価格での提供</h3>
            <p className="text-sm text-neutral-600">
              Tokyo Coworking Hub限定の法人割引プランをご用意。コスト削減と利便性を両立します。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">法人向けお問い合わせ</h2>
          <p className="text-neutral-500">
            導入のご相談、資料請求などお気軽にお問い合わせください。
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">会社名</Label>
                  <Input 
                    id="company" 
                    placeholder="株式会社〇〇" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">担当者名</Label>
                  <Input 
                    id="name" 
                    placeholder="山田 太郎" 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="example@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="03-1234-5678" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">お問い合わせ内容</Label>
                <Textarea 
                  id="content" 
                  placeholder="導入検討中のエリアや人数など、詳細をご記入ください" 
                  className="min-h-[150px]" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full py-6 text-lg font-bold" disabled={submitting}>
                {submitting ? '送信中...' : '送信する'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Badge({ children, variant, className }: { children: React.ReactNode, variant?: string, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );
}
