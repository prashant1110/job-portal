import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import companies from "./../data/companies.json";
import faqs from "./../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUser } from "@clerk/clerk-react";

const LandingPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.unsafeMetadata?.role === "candidate") {
      navigate("/jobs");
    } else if (user && user.unsafeMetadata?.role === "recruiter") {
      navigate("/my-jobs");
    }
  }, [user]);

  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tight py-4">
          Find your Dream job
          <span className="flex items-center gap-2 sm:gap-6">and get logo</span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>

      <Carousel
        className="w-full py-10 px-5 sm:px-0"
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, path, id }) => {
            return (
              <CarouselItem className="basis-1/3 lg:basis-1/6" key={id}>
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <img src="banner.jpeg" alt="" className="w-full px-5 sm:px-0" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 sm:px-0">
        <Card>
          <CardHeader className="text-2xl">
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-2xl">
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs , manage applications and find the best candidates.
          </CardContent>
        </Card>
      </section>

      <Accordion type="single" collapsible className="px-5 sm:px-0">
        {faqs.map((faq, i) => {
          return (
            <AccordionItem value={`item-${i}`} key={i}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
};

export default LandingPage;
