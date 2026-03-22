import { Card } from "../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

export default function FAQ() {
  const faqs = [
    { question: "How do I create an account?", answer: "Click on 'Get Started' on the homepage, select 'I'm a Customer', and fill in your details including username, email, and password. You'll be ready to start shopping immediately!" },
    { question: "How do I search for products or services?", answer: "Use the search bar at the top of the page to search for specific products, services, or businesses. You can also browse by category in the Discover page and use filters to refine your results." },
    { question: "How does the wallet system work?", answer: "Your wallet is your payment method on BizNextDoor. You can top up your wallet balance and use it to pay for products and services. All transactions are secure and instant." },
    { question: "Can I cancel or modify my order?", answer: "For products, you can cancel before the collection time. For services, cancellations must be made at least 24 hours before the scheduled appointment. Contact the business directly for modifications." },
    { question: "How do I collect my purchased products?", answer: "When purchasing a product, you'll select a collection timeslot. Visit the business address during your selected time to collect your order. Bring your order confirmation." },
    { question: "What if I'm not satisfied with a product or service?", answer: "Contact the business directly first to resolve any issues. You can also leave a review to share your experience. For serious concerns, refer to our Safety Guidelines." },
    { question: "How do I add items to my wishlist?", answer: "Click the heart icon on any product or service detail page to add it to your wishlist. You can view all your saved items in the Wishlist page." },
    { question: "Can I book multiple services at once?", answer: "Yes! Add multiple services to your cart and complete them all in one checkout. Make sure to select appropriate timeslots for each service." },
    { question: "How do notifications work?", answer: "You'll receive notifications for order confirmations, payment success, service reminders, and other important updates. Manage your notification preferences in Settings." },
    { question: "Is my personal information secure?", answer: "Yes, we take data security seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your consent." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-2">Support</p>
        <h1 className="text-5xl font-bold tracking-tighter leading-tight">Frequently Asked Questions</h1>
        <p className="text-black/60 mt-4">Find answers to common questions about using BizNextDoor</p>
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
        <p className="text-black/60 mb-4">Can't find the answer you're looking for? Please contact our customer support team.</p>
        <a href="mailto:support@biznextdoor.com" className="text-sm font-bold underline hover:no-underline transition-all duration-300">
          support@biznextdoor.com
        </a>
      </Card>
    </div>
  );
}
