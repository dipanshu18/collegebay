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
import Footer from "@/components/Footer";

const whatWeDo: { title: string; description: string }[] = [
  {
    title: "Create post/request",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  accusantium quae placeat tempore iste dolorem, error
                  temporibus cum delectus nesciunt sequi qui in blanditiis dicta
                  fugit incidunt ex aliquid quam provident dolore eum magni
                  autem vero laborum. Enim tempore facilis consequatur
                  aspernatur consequuntur aliquam iusto obcaecati, ipsa hic,
                  fuga nesciunt.`,
  },
  {
    title: "Message seller",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  accusantium quae placeat tempore iste dolorem, error
                  temporibus cum delectus nesciunt sequi qui in blanditiis dicta
                  fugit incidunt ex aliquid quam provident dolore eum magni
                  autem vero laborum. Enim tempore facilis consequatur
                  aspernatur consequuntur aliquam iusto obcaecati, ipsa hic,
                  fuga nesciunt.`,
  },
  {
    title: "Admin Moderation",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  accusantium quae placeat tempore iste dolorem, error
                  temporibus cum delectus nesciunt sequi qui in blanditiis dicta
                  fugit incidunt ex aliquid quam provident dolore eum magni
                  autem vero laborum. Enim tempore facilis consequatur
                  aspernatur consequuntur aliquam iusto obcaecati, ipsa hic,
                  fuga nesciunt.`,
  },
];

const faqs: { title: string; description: string }[] = [
  {
    title: "Is it accessible?",
    description: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    title: "Is it styled?",
    description: `Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.`,
  },
  {
    title: "Is it animated?",
    description: `Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.`,
  },
];

export default function Landing() {
  return (
    <>
      <main className="min-h-screen">
        <header className="w-full text-wrap py-32 text-center space-y-2">
          <h1 className="text-3xl md:text-7xl bg-gradient-to-r from-black to-slate-500 text-transparent bg-clip-text dark:from-white dark:to-slate-500 p-10 font-extrabold">
            CollegeBay
          </h1>
          <p className="max-w-xl mx-auto ">
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
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-black to-slate-500 text-transparent bg-clip-text dark:from-white dark:to-slate-500 pb-5 font-extrabold">
            What we do?
          </h1>

          <div className="text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-5">
            {whatWeDo.map((item, idx) => (
              <Card key={idx} className="dark:bg-inherit dark:border-slate-200">
                <CardHeader>
                  <CardTitle className="text-center dark:text-slate-300">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="dark:text-slate-100">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-wrap my-24 py-10 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-black to-slate-500 text-transparent bg-clip-text dark:from-white dark:to-slate-500 font-extrabold text-center">
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
