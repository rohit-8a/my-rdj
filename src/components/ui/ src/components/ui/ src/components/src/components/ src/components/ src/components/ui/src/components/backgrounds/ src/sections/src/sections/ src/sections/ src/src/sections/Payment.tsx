import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Copy, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export function Payment() {
  const { selectedCourse, upiDetails, setCurrentView, showToast } = useAppStore();
  const [transactionId, setTransactionId] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  if (!selectedCourse) return null;

  const upiLink = `upi://pay?pa=${upiDetails.vpa}&pn=${encodeURIComponent(upiDetails.name)}&am=${selectedCourse.price}&cu=INR&tn=${encodeURIComponent(`Course: ${selectedCourse.title}`)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiDetails.vpa);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    showToast('UPI ID copied!', 'success');
  };

  const handleSubmitPayment = () => {
    if (!transactionId.trim()) {
      showToast('Please enter transaction ID', 'error');
      return;
    }
    showToast('Payment verification request submitted!', 'success');
    setTimeout(() => {
      setCurrentView('courses');
    }, 2000);
  };

  const handleBack = () => {
    setCurrentView('course-detail');
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={handleBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Course Info */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <img 
                src={selectedCourse.thumbnail} 
                alt={selectedCourse.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{selectedCourse.title}</h3>
                <p className="text-2xl font-bold text-primary">₹{selectedCourse.price}</p>
              </div>
            </div>

            {/* UPI Payment */}
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Scan QR code or use UPI ID</p>
              
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-xl">
                  <QRCodeSVG value={upiLink} size={200} />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-muted/50">
                <span className="font-mono font-medium">{upiDetails.vpa}</span>
                <Button size="sm" variant="ghost" onClick={handleCopyUpi}>
                  {isCopied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Pay to: {upiDetails.name}
              </p>
            </div>

            {/* Transaction ID */}
            <div className="space-y-2 pt-4 border-t border-border/50">
              <label className="text-sm font-medium">Enter Transaction ID / UTR Number</label>
              <Input 
                placeholder="e.g., 123456789012"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                You will receive course password after payment verification (usually within 1 hour)
              </p>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600" 
              size="lg"
              onClick={handleSubmitPayment}
            >
              Submit Payment Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
