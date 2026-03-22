import { Card } from "../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

export default function BusinessFAQ() {
  const faqs = [
    { question: "How do I create my business account?", answer: "Click 'Get Started' on the homepage, select 'I'm a Business', and fill in your business details including business name, address, contact information, and upload verification documents to get verified status." },
    { question: "How do I create a new listing?", answer: "Navigate to 'Create Listing' in the navigation bar, select whether it's a product or service, upload images, fill in details like name, description, category, price, and available timeslots. Click 'Create Listing' to publish." },
    { question: "How does the bank system work?", answer: "Your bank account holds all revenue from sales. When customers make purchases, funds are automatically added to your bank. You can withdraw funds to your connected bank account at any time." },
    { question: "How do I manage my inventory?", answer: "Go to the Inventory page to view all your listings. You can edit details, adjust quantities, change timeslots, rearrange the order of listings, or remove items that are no longer available." },
    { question: "What happens when I receive an order?", answer: "You'll receive a notification when a customer places an order. The order appears in your Orders page with customer details and the scheduled timeslot. After fulfilling the order, click 'Fulfill' to mark it complete." },
    { question: "How do I track my business performance?", answer: "Visit the Insights page to view comprehensive metrics including revenue trends, customer acquisition, conversion rates, and product performance. Our AI assistant can help you analyze this data and provide recommendations." },
    { question: "What is the AI Business Assistant?", answer: "The AI assistant in the Insights page analyzes your business data and provides personalized recommendations. Ask it questions about your revenue, best-selling products, customer trends, or how to improve your business." },
    { question: "How do I get verified status?", answer: "Upload your business registration documents or ID during signup or in your profile settings. Our team will review your documents within 48 hours. Verified businesses get a blue checkmark and increased visibility." },
    { question: "Can I offer both products and services?", answer: "Yes! You can create unlimited listings for both products and services. Each type has its own section in your inventory and they're displayed separately to customers." },
    { question: "How do I handle customer reviews?", answer: "Customers can leave reviews after purchasing or using your services. Reviews appear on your business profile and individual listings. You'll be notified of new reviews. Maintain good service to build a strong reputation." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Support</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Business FAQ</h1>
        <p className="text-black/60 mt-4">Find answers to common questions about managing your business on BizNextDoor</p>
      </div>

      <Card className="p-8 border border-black/5 rounded-3xl shadow-sm">
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-black/5">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-black/60 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <Card className="p-8 mt-6 border border-black/5 rounded-3xl shadow-sm">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-3">Still need help?</p>
        <h2 className="text-2xl font-bold tracking-tighter mb-2">Contact Support</h2>
        <p className="text-black/60 mb-4">Can't find the answer you're looking for? Our business support team is here to help.</p>
        <a href="mailto:business@biznextdoor.com" className="text-sm font-bold underline hover:no-underline transition-all duration-300">
          business@biznextdoor.com
        </a>
      </Card>
    </div>
  );
}
