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
import {
  Banknote,
  Users,
  PlusIcon,
  Scale,
  ShieldCheck,
  RefreshCcw,
  Clock5,
  Clipboard,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features: {
  icon: React.ReactNode;
  title: string;
  description: string;
}[] = [
  {
    icon: <Banknote />,
    title: "Save Money",
    description:
      "Get your academic materials at significantly lower prices compared to retail stores.",
  },
  {
    icon: <Users />,
    title: "Campus Community",
    description:
      "Connect directly with students from your campus for easy exchanges and transactions.",
  },
  {
    icon: <ShieldCheck />,
    title: "Verified Users",
    description:
      "Trade with confidence knowing all users are verified by admin and are members of your college community.",
  },
  {
    icon: <RefreshCcw />,
    title: "Sustainable Practice",
    description:
      "Contribute to environmental sustainability by reusing and recycling academic materials.",
  },
  {
    icon: <Clock5 />,
    title: "Quick & Easy",
    description:
      "List or find resources within minutes with our user-friendly interface.",
  },
  {
    icon: <Clipboard />,
    title: "Wide Selection",
    description:
      "Access a diverse range of academic materials from textbooks to study guides.",
  },
];

const howWorks: { title: string; description: string }[] = [
  {
    title: "Create Account",
    description:
      "Sign up using your college email to join your campus marketplace. Admin Verification ensures a trusted community.",
  },
  {
    title: "List or Browse",
    description:
      "List your unused academic materials or browse through available resources in your campus marketplace.",
  },
  {
    title: "Connect & Chat",
    description:
      "Use our built-in messaging system to discuss details and arrange meet-ups with fellow students.",
  },
  {
    title: "Exchange & Review",
    description:
      "Meet on campus for safe exchanges and leave reviews to build community trust.",
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
    description:
      "By encouraging students to buy and sell used items, CollegeBay helps reduce waste and the demand for new products. This promotes a culture of recycling and sustainability, contributing to a greener college experience.",
  },
  {
    title: "How can students list their items for sale?",
    description:
      "Students can easily list items for sale by creating an account, uploading item details (title, description, price, images), and marking the item’s availability. The platform’s user-friendly interface ensures a smooth listing process.",
  },
  {
    title: "Can students make requests for items they need?",
    description:
      "Yes, students can post requests for specific items they need. Then other students can upvote to the request showing that this number of students need this item, making it easier for seller to reach out to the student for providing an offer for that item.",
  },
  {
    title: "What types of college essentials can students find?",
    description:
      "Students can find a wide variety of college essentials, including textbooks, electronics, furniture, stationery, and other necessities for their studies and campus life.",
  },
  {
    title: "How does CollegeBay ensure moderation for listings?",
    description:
      "CollegeBay employs admin moderation to review and approve listings before they go live. This process ensures that items meet the platform’s guidelines.",
  },
  {
    title: "Can admin remove inappropriate listings or content?",
    description:
      "Yes, admins have the authority to remove any listings or content that violate CollegeBay’s terms of service. This includes items that are inappropriate, prohibited, or misrepresent their condition.",
  },
  {
    title: "Does CollegeBay offer real-time chat for buyers and sellers?",
    description:
      "Yes, CollegeBay provides a built-in real-time chat feature that allows buyers and sellers to communicate directly. This enables quick negotiations and inquiries.",
  },
  {
    title: "Can users receive notifications for new messages?",
    description:
      "Yes, users can receive real-time notifications for new messages through the platform’s messaging system. This ensures they stay updated on inquiries or offers.",
  },
  {
    title: "How are delivery details arranged on CollegeBay?",
    description:
      "Delivery details are arranged through the real-time chat between the buyer and seller. Both parties can discuss and decide the preferred mode of delivery, whether it's meeting in person, shipping the item, or using other delivery methods.",
  },
  {
    title: "Does CollegeBay provide any delivery services?",
    description:
      "No, CollegeBay does not offer delivery services. The buyer and seller must discuss and agree on the mode of delivery via the platform’s real-time chat feature, ensuring flexibility based on their preferences.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col justify-between tracking-wide">
      <Navbar />
      <main className="flex-1">
        <div className="bg-light w-full text-wrap min-h-[80vh] flex flex-col justify-center items-center">
          <div className="p-5 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3">
              <h1 className="text-6xl font-extrabold">
                <span className="text-primary">Buy & Sell</span> Academic
                Resources Within Your Campus
              </h1>
              <p className="text-lg">
                An online marketplace for college students to buy and sell
                college-related materials. Connect with fellow students, save
                money, and contribute to a greener campus environment.
              </p>
              <div className="">
                <Link href={"/signup"}>
                  <Button className="bg-primary hover:bg-secondary text-lg text-white font-normal py-6 px-8">
                    Start selling
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:grid gap-5 place-content-center hidden">
              <div className="hover:-translate-y-2 transition-all duration-300 flex items-center gap-2 py-5 bg-primary text-white rounded-md p-5">
                <div className="rounded-full p-2 bg-accent">
                  <PlusIcon />
                </div>
                <p className="text-lg">Quick Listing</p>
              </div>
              <div className="hover:-translate-y-2 transition-all duration-300 flex items-center gap-2 py-5 bg-primary text-white rounded-md p-5">
                <div className="rounded-full p-2 bg-accent">
                  <Banknote />
                </div>
                <p className="text-lg">Save money</p>
              </div>
              <div className="hover:-translate-y-2 transition-all duration-300 flex items-center gap-2 py-5 bg-primary text-white rounded-md p-5">
                <div className="rounded-full p-2 bg-accent">
                  <Scale />
                </div>
                <p className="text-lg">Promote sustainability</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="curve bg-light">
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>

        <section id="features" className="text-center text-wrap pt-24">
          <div className="max-w-5xl mx-auto flex flex-col min-h-screen justify-center items-center">
            <div className="space-y-5 mb-10">
              <h1 className="text-4xl text-primary font-bold">
                Why choose CollegeBay?
              </h1>
              <p className="text-lg text-center max-w-lg mx-auto text-neutral-700">
                Your one-stop platform for affordable academic resources,
                promoting sustainability within your campus community.
              </p>
            </div>

            <div className="text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-10">
              {features.map((item, idx) => (
                <Card
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={idx}
                  className="bg-neutral-100 border-none hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader className="space-y-5">
                    <div className="rounded-md p-5 bg-primary w-fit text-white">
                      {item.icon}
                    </div>
                    <CardTitle className="dark:text-neutral-300">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="dark:text-neutral-100 text-md">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="working"
          className="text-center text-wrap mt-20 min-h-screen bg-light p-5 py-12"
        >
          <div className="max-w-5xl mx-auto space-y-5">
            <h1 className="text-4xl font-bold mt-10 text-primary">
              How CollegeBay works?
            </h1>
            <p className="text-lg max-w-md mx-auto">
              Get started with these simple steps to buy or sell academic
              resources on campus.
            </p>
          </div>

          <div className="text-left max-w-5xl mx-auto my-10 p-5">
            <ul
              aria-label="How it works"
              role="feed"
              className="relative flex flex-col gap-12 py-12 pl-6 text-sm before:absolute before:top-0 before:left-6 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-primary after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-primary"
            >
              {howWorks.map((item, idx) => (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={idx}
                  className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-5 before:w-5 before:-translate-x-1/2 before:rounded-full before:bg-primary before:ring-2 before:ring-white"
                >
                  <Card className="flex flex-col flex-1 gap-2 bg-neutral-200 hover:shadow-xl transition-all duration-300 border-none">
                    <CardHeader className="space-y-3">
                      <p className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-light font-bold">
                        {idx + 1}.
                      </p>
                      <CardTitle className="text-2xl text-secondary font-semibold leading-7">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-5">
              <Link href={"/signup"}>
                <Button className="bg-primary hover:bg-secondary text-lg text-white font-normal py-6 px-8">
                  Start selling now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="relative">
          <div className="curve2">
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>

        <section
          id="faqs"
          className="text-wrap mt-20 pt-24 min-h-screen flex flex-col justify-center items-center"
        >
          <h1 className="text-3xl md:text-5xl text-primary font-bold text-center">
            FAQ{`'`}s
          </h1>

          <div className="my-10 w-full max-w-5xl mx-auto p-5">
            <Accordion type="single" collapsible className="w-full space-y-5">
              {faqs.map((item, idx) => (
                <AccordionItem
                  value={`item-${idx + 1}`}
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={idx}
                  className="py-2 px-5 bg-light rounded-md"
                >
                  <AccordionTrigger className="font-semibold text-xl text-primary">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg">
                    {item.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
