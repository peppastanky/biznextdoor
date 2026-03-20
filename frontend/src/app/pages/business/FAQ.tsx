import { Card } from "../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";

export default function BusinessFAQ() {
  const faqs = [
    {
      question: "How do I create my business account?",
      answer:
        "Click 'Get Started' on the homepage, select 'I'm a Business', and fill in your business details including business name, address, contact information, and upload verification documents to get verified status.",
    },
    {
      question: "How do I create a new listing?",
      answer:
        "Navigate to 'Create Listing' in the navigation bar, select whether it's a product or service, upload images, fill in details like name, description, category, price, and available timeslots. Click 'Create Listing' to publish.",
    },
    {
      question: "How does the bank system work?",
      answer:
        "Your bank account holds all revenue from sales. When customers make purchases, funds are automatically added to your bank. You can withdraw funds to your connected bank account at any time.",
    },
    {
      question: "How do I manage my inventory?",
      answer:
        "Go to the Inventory page to view all your listings. You can edit details, adjust quantities, change timeslots, rearrange the order of listings, or remove items that are no longer available.",
    },
    {
      question: "What happens when I receive an order?",
      answer:
        "You'll receive a notification when a customer places an order. The order appears in your Orders page with customer details and the scheduled timeslot. After fulfilling the order, click 'Fulfill' to mark it complete.",
    },
    {
      question: "How do I track my business performance?",
      answer:
        "Visit the Insights page to view comprehensive metrics including revenue trends, customer acquisition, conversion rates, and product performance. Our AI assistant can help you analyze this data and provide recommendations.",
    },
    {
      question: "What is the AI Business Assistant?",
      answer:
        "The AI assistant in the Insights page analyzes your business data and provides personalized recommendations. Ask it questions about your revenue, best-selling products, customer trends, or how to improve your business.",
    },
    {
      question: "How do I get verified status?",
      answer:
        "Upload your business registration documents or ID during signup or in your profile settings. Our team will review your documents within 48 hours. Verified businesses get a blue checkmark and increased visibility.",
    },
    {
      question: "Can I offer both products and services?",
      answer:
        "Yes! You can create unlimited listings for both products and services. Each type has its own section in your inventory and they're displayed separately to customers.",
    },
    {
      question: "How do I handle customer reviews?",
      answer:
        "Customers can leave reviews after purchasing or using your services. Reviews appear on your business profile and individual listings. You'll be notified of new reviews. Maintain good service to build a strong reputation.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl tracking-tight mb-4">Business FAQ</h1>
      <p className="text-gray-600 mb-12">
        Find answers to common questions about managing your business on BizNextDoor
      </p>

      <Card className="p-8">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <Card className="p-8 mt-8 bg-gray-50">
        <h2 className="text-xl mb-3">Need more help?</h2>
        <p className="text-gray-600 mb-4">
          Can't find the answer you're looking for? Our business support team is here to help.
        </p>
        <a href="mailto:business@biznextdoor.com" className="text-blue-600 hover:underline">
          business@biznextdoor.com
        </a>
      </Card>
    </div>
  );
}
