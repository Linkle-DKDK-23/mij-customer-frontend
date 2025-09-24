import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle, CreditCard, Loader2 } from 'lucide-react';
export default function PaymentLoading({ onComplete, autoComplete = true, duration = 5000 }) {
    const [status, setStatus] = useState('loading');
    const [progress, setProgress] = useState(0);
    const hasCompleted = useRef(false);
    const timerRef = useRef(null);
    const processingTimeoutRef = useRef(null);
    const completedTimeoutRef = useRef(null);
    // onCompleteをuseCallbackでメモ化
    const handleComplete = useCallback(() => {
        if (!hasCompleted.current) {
            hasCompleted.current = true;
            onComplete?.();
        }
    }, [onComplete]);
    useEffect(() => {
        // 既に実行中または完了済みの場合は何もしない
        if (!autoComplete || hasCompleted.current || timerRef.current)
            return;
        // タイマーをクリアする関数
        const clearAllTimers = () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            if (processingTimeoutRef.current) {
                clearTimeout(processingTimeoutRef.current);
                processingTimeoutRef.current = null;
            }
            if (completedTimeoutRef.current) {
                clearTimeout(completedTimeoutRef.current);
                completedTimeoutRef.current = null;
            }
        };
        timerRef.current = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearAllTimers();
                    setStatus('processing');
                    processingTimeoutRef.current = setTimeout(() => {
                        setStatus('completed');
                        completedTimeoutRef.current = setTimeout(() => {
                            handleComplete();
                        }, 2000);
                    }, 1000);
                    return 100;
                }
                return prev + 2;
            });
        }, duration / 50);
        return clearAllTimers;
    }, [autoComplete, duration, handleComplete]);
    // コンポーネントがアンマウントされた時にリセット
    useEffect(() => {
        return () => {
            hasCompleted.current = false;
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            if (processingTimeoutRef.current) {
                clearTimeout(processingTimeoutRef.current);
                processingTimeoutRef.current = null;
            }
            if (completedTimeoutRef.current) {
                clearTimeout(completedTimeoutRef.current);
                completedTimeoutRef.current = null;
            }
        };
    }, []);
    const getStatusMessage = () => {
        switch (status) {
            case 'loading':
                return '決済情報を確認中...';
            case 'processing':
                return '決済を処理中...';
            case 'completed':
                return '決済が完了しました！';
            case 'error':
                return '決済に失敗しました';
            default:
                return '';
        }
    };
    const getStatusIcon = () => {
        switch (status) {
            case 'loading':
            case 'processing':
                return _jsx(Loader2, { className: "h-16 w-16 text-primary animate-spin" });
            case 'completed':
                return _jsx(CheckCircle, { className: "h-16 w-16 text-green-500" });
            case 'error':
                return _jsx(CreditCard, { className: "h-16 w-16 text-red-500" });
            default:
                return null;
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]", children: _jsx("div", { className: "bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl", children: _jsxs("div", { className: "flex flex-col items-center space-y-6", children: [_jsx("div", { className: "flex items-center justify-center", children: getStatusIcon() }), _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-2", children: getStatusMessage() }), _jsxs("p", { className: "text-sm text-gray-600", children: [status === 'loading' && 'しばらくお待ちください...', status === 'processing' && '決済処理を行っています', status === 'completed' && 'コンテンツがご利用いただけます', status === 'error' && 'もう一度お試しください'] })] }), (status === 'loading' || status === 'processing') && (_jsxs("div", { className: "w-full space-y-2", children: [_jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-primary h-2 rounded-full transition-all duration-300 ease-out", style: { width: `${progress}%` } }) }), _jsx("div", { className: "text-center", children: _jsxs("span", { className: "text-xs text-gray-500", children: [progress, "%"] }) })] })), status === 'completed' && (_jsx("div", { className: "bg-green-50 rounded-lg p-4 w-full", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-green-800 font-medium", children: "\u6C7A\u6E08\u304C\u6B63\u5E38\u306B\u5B8C\u4E86\u3057\u307E\u3057\u305F" }), _jsx("p", { className: "text-xs text-green-600 mt-1", children: "\u30B3\u30F3\u30C6\u30F3\u30C4\u304C\u3054\u5229\u7528\u3044\u305F\u3060\u3051\u307E\u3059" })] }) })), status === 'error' && (_jsxs("div", { className: "w-full space-y-3", children: [_jsx("button", { onClick: () => {
                                    setStatus('loading');
                                    setProgress(0);
                                    hasCompleted.current = false;
                                }, className: "w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/80 transition-colors", children: "\u518D\u8A66\u884C" }), _jsx("button", { onClick: handleComplete, className: "w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors", children: "\u30AD\u30E3\u30F3\u30BB\u30EB" })] }))] }) }) }));
}
