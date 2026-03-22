import { Card } from "../../components/ui/card";
import { Shield, CheckCircle2, AlertTriangle, Users, Lock, FileText } from "lucide-react";

export default function BusinessSafety() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <Shield className="w-16 h-16 mx-auto mb-6 text-black/20" strokeWidth={1.5} />
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Guidelines</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight mb-4">Business Safety Guidelines</h1>
        <p className="text-black/60">Best practices for running a safe and successful business on our platform</p>
      </div>

      <div className="space-y-8">
        {/* Safe Business Practices */}
        <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
          <div className="flex gap-4 mb-4">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold tracking-tighter mb-3">Safe Business Practices</h2>
              <ul className="space-y-3 text-black/60">
                <li>• Provide accurate and honest product/service descriptions</li>
                <li>• Keep your business address and contact information up to date</li>
                <li>• Respond to customer inquiries promptly and professionally</li>
                <li>• Honor your listed prices and timeslots</li>
                <li>• Maintain proper hygiene and safety standards for your business</li>
                <li>• Report any suspicious customer activity immediately</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Customer Interactions */}
        <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
          <div className="flex gap-4 mb-4">
            <Users className="w-6 h-6 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold tracking-tighter mb-3">Customer Interactions</h2>
              <ul className="space-y-3 text-black/60">
                <li>• Always meet customers at your registered business address</li>
                <li>• Verify customer identity before providing products or services</li>
                <li>• Keep communication professional and respectful</li>
                <li>• Document all transactions through the platform</li>
                <li>• Have another person present for first-time customer meetings if possible</li>
                <li>• Trust your instincts - if something feels wrong, contact support</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Data Protection */}
        <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
          <div className="flex gap-4 mb-4">
            <Lock className="w-6 h-6 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold tracking-tighter mb-3">Data & Privacy Protection</h2>
              <ul className="space-y-3 text-black/60">
                <li>• Never share your password or account credentials</li>
                <li>• Protect customer information and respect their privacy</li>
                <li>• Use strong, unique passwords for your account</li>
                <li>• Enable two-factor authentication when available</li>
                <li>• Don't store customer payment information</li>
                <li>• Regularly review your account activity</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Financial Security */}
        <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
          <div className="flex gap-4 mb-4">
            <FileText className="w-6 h-6 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold tracking-tighter mb-3">Financial Security</h2>
              <ul className="space-y-3 text-black/60">
                <li>• All transactions must go through the platform</li>
                <li>• Never accept cash or external payments</li>
                <li>• Monitor your bank balance regularly</li>
                <li>• Report any unauthorized transactions immediately</li>
                <li>• Keep accurate records of all sales</li>
                <li>• Understand and comply with local tax requirements</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Red Flags */}
        <Card className="p-8 bg-red-50 border border-red-200 rounded-3xl shadow-sm">
          <div className="flex gap-4 mb-4">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 text-red-600" />
            <div>
              <h2 className="text-2xl font-bold tracking-tighter mb-3">Red Flags to Watch For</h2>
              <ul className="space-y-3 text-black/60">
                <li>• Customers requesting off-platform communication or payment</li>
                <li>• Unusual or suspicious customer behavior</li>
                <li>• Requests for personal information beyond what's necessary</li>
                <li>• Customers who refuse to meet at your business address</li>
                <li>• Pressure to provide services outside your normal offerings</li>
                <li>• Threats or harassment from customers</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quality Standards */}
        <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold tracking-tighter mb-4">Quality Standards</h2>
          <p className="text-black/60 mb-4">
            To maintain a high-quality marketplace, all businesses must adhere to these standards:
          </p>
          <ul className="space-y-2 text-black/60">
            <li>• Deliver products and services as described</li>
            <li>• Maintain cleanliness and proper safety measures</li>
            <li>• Respect appointment times and commitments</li>
            <li>• Provide excellent customer service</li>
            <li>• Address customer concerns promptly and fairly</li>
            <li>• Follow all applicable health and safety regulations</li>
            <li>• Maintain proper business licenses and permits</li>
          </ul>
        </Card>

        {/* Verification Benefits */}
        <Card className="p-8 bg-blue-50 border border-blue-200 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold tracking-tighter mb-4">Verification Benefits</h2>
          <p className="text-black/60 mb-4">
            Verified businesses receive:
          </p>
          <ul className="space-y-2 text-black/60">
            <li>• Blue checkmark badge on your profile</li>
            <li>• Higher visibility in search results</li>
            <li>• Increased customer trust and credibility</li>
            <li>• Priority customer support</li>
            <li>• Access to advanced business features</li>
          </ul>
        </Card>

        {/* Reporting */}
        <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold tracking-tighter mb-4">Report Issues</h2>
          <p className="text-black/60 mb-4">
            If you encounter any safety issues, suspicious behavior, or need assistance:
          </p>
          <div className="space-y-2 text-black/60">
            <p>Emergency: Contact local authorities first</p>
            <p>Platform Issues: business-safety@biznextdoor.com</p>
            <p>Response time: Within 24 hours</p>
          </div>
        </Card>

        {/* Legal Compliance */}
        <Card className="p-8 bg-black/5 border border-black/5 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold tracking-tighter mb-4">Legal Compliance</h2>
          <p className="text-black/60">
            As a business on BizNextDoor, you are responsible for:
          </p>
          <ul className="space-y-2 text-black/60 mt-4">
            <li>• Obtaining necessary business licenses and permits</li>
            <li>• Complying with local, state, and federal regulations</li>
            <li>• Paying applicable taxes on your income</li>
            <li>• Maintaining appropriate insurance coverage</li>
            <li>• Following health and safety codes</li>
            <li>• Respecting intellectual property rights</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
