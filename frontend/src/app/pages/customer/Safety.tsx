import { Card } from "../../components/ui/card";
import { Shield, CheckCircle2, AlertTriangle, Users, Lock, FileText } from "lucide-react";

export default function Safety() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <Shield className="w-16 h-16 mx-auto mb-4 text-gray-800" />
        <h1 className="text-4xl tracking-tight mb-4">Safety Guidelines</h1>
        <p className="text-gray-600">
          Your safety and security are our top priorities
        </p>
      </div>

      <div className="space-y-8">
        {/* Safe Shopping */}
        <Card className="p-8">
          <div className="flex gap-4 mb-4">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            <div>
              <h2 className="text-2xl mb-3">Safe Shopping Practices</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Always verify business details before making a purchase</li>
                <li>• Look for the verified badge on business profiles</li>
                <li>• Read reviews and ratings from other customers</li>
                <li>• Use the in-app wallet for secure payments</li>
                <li>• Keep records of your transactions and communications</li>
                <li>• Report any suspicious activity immediately</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Meeting Safely */}
        <Card className="p-8">
          <div className="flex gap-4 mb-4">
            <Users className="w-6 h-6 flex-shrink-0" />
            <div>
              <h2 className="text-2xl mb-3">Meeting Safely</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Collect products during daylight hours when possible</li>
                <li>• Inform a friend or family member of your plans</li>
                <li>• Meet at the registered business address only</li>
                <li>• Verify the business identity upon arrival</li>
                <li>• Trust your instincts - if something feels wrong, leave</li>
                <li>• For service appointments, consider bringing a companion</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Privacy & Data */}
        <Card className="p-8">
          <div className="flex gap-4 mb-4">
            <Lock className="w-6 h-6 flex-shrink-0" />
            <div>
              <h2 className="text-2xl mb-3">Privacy & Data Protection</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Never share your password with anyone</li>
                <li>• Keep your personal information private</li>
                <li>• Only communicate through the platform</li>
                <li>• Be cautious about sharing sensitive details</li>
                <li>• Review your privacy settings regularly</li>
                <li>• Enable two-factor authentication when available</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Payment Security */}
        <Card className="p-8">
          <div className="flex gap-4 mb-4">
            <FileText className="w-6 h-6 flex-shrink-0" />
            <div>
              <h2 className="text-2xl mb-3">Payment Security</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Always use the in-app wallet for payments</li>
                <li>• Never make payments outside the platform</li>
                <li>• Monitor your wallet transactions regularly</li>
                <li>• Report unauthorized transactions immediately</li>
                <li>• Keep your payment information secure</li>
                <li>• Be wary of deals that seem too good to be true</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Red Flags */}
        <Card className="p-8 bg-red-50 border-red-200">
          <div className="flex gap-4 mb-4">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 text-red-600" />
            <div>
              <h2 className="text-2xl mb-3">Red Flags to Watch For</h2>
              <ul className="space-y-3 text-gray-600">
                <li>• Requests for payment outside the platform</li>
                <li>• Businesses with no reviews or verification</li>
                <li>• Pressure to make immediate decisions</li>
                <li>• Requests for excessive personal information</li>
                <li>• Offers that seem unrealistic or too cheap</li>
                <li>• Communication that moves off-platform quickly</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Reporting */}
        <Card className="p-8">
          <h2 className="text-2xl mb-4">Report Concerns</h2>
          <p className="text-gray-600 mb-4">
            If you encounter any safety issues, suspicious behavior, or violations of our
            guidelines, please report them immediately:
          </p>
          <div className="space-y-2 text-gray-600">
            <p>Email: safety@biznextdoor.com</p>
            <p>Response time: Within 24 hours</p>
          </div>
        </Card>

        {/* Community Standards */}
        <Card className="p-8 bg-gray-50">
          <h2 className="text-2xl mb-4">Community Standards</h2>
          <p className="text-gray-600">
            BizNextDoor is built on trust and respect. We expect all users to:
          </p>
          <ul className="space-y-2 text-gray-600 mt-4">
            <li>• Treat others with respect and courtesy</li>
            <li>• Provide accurate information</li>
            <li>• Honor commitments and agreements</li>
            <li>• Communicate honestly and transparently</li>
            <li>• Follow all applicable laws and regulations</li>
            <li>• Respect intellectual property rights</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
