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

export default function Landing() {
  return (
    <>
      <main className="min-h-screen">
        <header className="w-full text-wrap py-32 text-center space-y-2">
          <h1 className="text-3xl md:text-7xl bg-gradient-to-r from-black to-slate-500 text-transparent bg-clip-text p-10 font-extrabold">
            CollegeBay
          </h1>
          <p className="max-w-xl mx-auto ">
            An online marketplace for college students to buy and sell
            college-related materials. The platform is designed to make it easy
            for students to find what they need, sell what they don't, and
            connect with other students in the same college or university.
          </p>
          <div className="">
            <Link href={"/signup"}>
              <Button>Get started</Button>
            </Link>
          </div>
        </header>

        <section className="text-center text-wrap my-10 py-10">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-black to-slate-500 text-transparent bg-clip-text pb-5 font-extrabold">
            What we do?
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-5">
            <Card>
              <CardHeader>
                <CardTitle>Create post/request</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  accusantium quae placeat tempore iste dolorem, error
                  temporibus cum delectus nesciunt sequi qui in blanditiis dicta
                  fugit incidunt ex aliquid quam provident dolore eum magni
                  autem vero laborum. Enim tempore facilis consequatur
                  aspernatur consequuntur aliquam iusto obcaecati, ipsa hic,
                  fuga nesciunt.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Message seller</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  accusantium quae placeat tempore iste dolorem, error
                  temporibus cum delectus nesciunt sequi qui in blanditiis dicta
                  fugit incidunt ex aliquid quam provident dolore eum magni
                  autem vero laborum. Enim tempore facilis consequatur
                  aspernatur consequuntur aliquam iusto obcaecati, ipsa hic,
                  fuga nesciunt.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admin Moderation</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  accusantium quae placeat tempore iste dolorem, error
                  temporibus cum delectus nesciunt sequi qui in blanditiis dicta
                  fugit incidunt ex aliquid quam provident dolore eum magni
                  autem vero laborum. Enim tempore facilis consequatur
                  aspernatur consequuntur aliquam iusto obcaecati, ipsa hic,
                  fuga nesciunt.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="text-wrap my-24 py-10 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-black to-slate-500 text-transparent bg-clip-text font-extrabold text-center">
            FAQ's
          </h1>

          <div className="p-5">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
