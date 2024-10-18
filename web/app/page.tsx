import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const whatWeDo: { title: string; description: string }[] = [
  {
    title: "Create post/request",
    description: `Easily post listings for items you want to sell or submit requests for items you need. CollegeBay provides a simple and intuitive platform for college students to connect over essential goods like textbooks, electronics, and more. Whether you're selling or requesting, posting is quick and seamless, giving you access to the right audience.
`,
  },
  {
    title: "Message seller",
    description: `Chat directly with sellers or buyers in real-time to negotiate deals, finalize delivery options, and discuss payment methods. With built-in messaging, you can confidently communicate with others without needing external platforms.`,
  },
  {
    title: "Admin Moderation",
    description: `Our dedicated admin team ensures that all listings meet terms and community guidelines. By reviewing and moderating posts, CollegeBay guarantees a safe and reliable marketplace, keeping the platform free from inappropriate content or fraudulent listings.`,
  },
];

const faqs: { title: string; description: string }[] = [
  {
    title: "What does CollegeBay offer to students?",
    description:
      "CollegeBay provides a dedicated online marketplace where students can buy and sell used college essentials like textbooks, dorm supplies, stationery, and more. This platform helps students save money while promoting the reuse of valuable resources.",
  },
  {
    title: "How does CollegeBay promote sustainability?",
    description: `By encouraging students to buy and sell used items, CollegeBay helps reduce waste and the demand for new products. This promotes a culture of recycling and sustainability, contributing to a greener college experience.`,
  },
  {
    title: "How can students list their items for sale?",
    description: `Students can easily list items for sale by creating an account, uploading item details (title, description, price, images), and marking the item’s availability. The platform’s user-friendly interface ensures a smooth listing process.`,
  },
  {
    title: "Can students make requests for items they need?",
    description: `Yes, students can post requests for specific items they need. Then other students can upvote to the request showing that this number of students need this item, making it easier for seller to reach out to the student for providing an offer for that item.`,
  },
  {
    title: "What types of college essentials can students find?",
    description: `Students can find a wide variety of college essentials, including textbooks, electronics, furniture, stationery, and other necessities for their studies and campus life.`,
  },
  {
    title: "How does CollegeBay ensure moderation for listings?",
    description: `CollegeBay employs admin moderation to review and approve listings before they go live. This process ensures that items meet the platform’s guidelines.`,
  },
  {
    title: "Can admin remove inappropriate listings or content?",
    description: `Yes, admins have the authority to remove any listings or content that violate CollegeBay’s terms of service. This includes items that are inappropriate, prohibited, or misrepresent their condition.`,
  },
  {
    title: "Does CollegeBay offer real-time chat for buyers and sellers?",
    description: `Yes, CollegeBay provides a built-in real-time chat feature that allows buyers and sellers to communicate directly. This enables quick negotiations and inquiries.`,
  },
  {
    title: "Can users receive notifications for new messages?",
    description: `Yes, users can receive real-time notifications for new messages through the platform’s messaging system. This ensures they stay updated on inquiries or offers.`,
  },
  {
    title: "How are delivery details arranged on CollegeBay?",
    description: `Delivery details are arranged through the real-time chat between the buyer and seller. Both parties can discuss and decide the preferred mode of delivery, whether it's meeting in person, shipping the item, or using other delivery methods.`,
  },
  {
    title: "Does CollegeBay provide any delivery services?",
    description: `No, CollegeBay does not offer delivery services. The buyer and seller must discuss and agree on the mode of delivery via the platform’s real-time chat feature, ensuring flexibility based on their preferences.`,
  },
];

export default function Landing() {
  return (
    <>
      <main className="min-h-screen">
        <header className="w-full text-wrap py-32 text-center space-y-2">
          <h1 className="text-3xl md:text-7xl bg-gradient-to-r from-black to-neutral-500 text-transparent bg-clip-text dark:from-white dark:to-neutral-500 p-5 font-extrabold">
            CollegeBay
          </h1>
          <p className="max-w-2xl mx-auto p-5">
            An online marketplace for college students to buy and sell
            college-related materials. The platform is designed to make it easy
            for students to find what they need, sell what they don{`'`}t, and
            connect with other students in the same college or university.
          </p>
          <div className="">
            <Link href={"/signup"}>
              <Button>Get started</Button>
            </Link>
          </div>
        </header>

        <section className="text-center text-wrap my-10 py-10">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-black to-neutral-500 text-transparent bg-clip-text dark:from-white dark:to-neutral-500 pb-5 font-extrabold">
            What we do?
          </h1>

          <div className="text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-5">
            {whatWeDo.map((item, idx) => (
              <Card
                key={idx}
                className="dark:bg-inherit dark:border-neutral-200"
              >
                <CardHeader>
                  <CardTitle className="text-center dark:text-neutral-300">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="dark:text-neutral-100">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-wrap my-24 py-10 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-black to-neutral-500 text-transparent bg-clip-text dark:from-white dark:to-neutral-500 font-extrabold text-center">
            FAQ{`'`}s
          </h1>

          <div className="p-5">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item, idx) => (
                <AccordionItem value={`item-${idx + 1}`} key={idx}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
    </>
  );
}
