import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      let errorMessage = "申し訳ありません。エラーが発生しました。";
      
      try {
        // Check if it's a Firestore JSON error
        const firestoreError = JSON.parse(error?.message || "");
        if (firestoreError.error) {
          errorMessage = `データベースエラー: ${firestoreError.operationType} 操作中に問題が発生しました。権限が不足している可能性があります。`;
        }
      } catch (e) {
        // Not a JSON error, use default or specific message
        if (error?.message.includes("permission-denied")) {
          errorMessage = "アクセス権限がありません。ログイン状態を確認してください。";
        }
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">エラーが発生しました</h2>
          <p className="text-neutral-600 max-w-md">{errorMessage}</p>
          <button 
            onClick={() => window.location.reload()}
            className="rounded-full bg-primary px-6 py-2 text-white font-bold"
          >
            再読み込み
          </button>
        </div>
      );
    }

    return children;
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: any, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: (window as any).firebaseAuth?.currentUser?.uid,
      email: (window as any).firebaseAuth?.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
