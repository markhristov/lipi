import { CheckIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { PRICING_CARDS, PRICING_PLANS } from "@/lib/constants";
import { cn, formatCurrency } from "@/lib/utils";
import { Diamond } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <section className="container flex flex-col gap-6 py-8 md:max-w-[64rem] md:gap-10 md:py-12 lg:py-24">
      <div className="mx-auto flex flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl drop-shadow-xl dark:bg-gradient-to-br dark:from-foreground dark:to-gray-500 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="text-center leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Unlock all features including unlimited posts for your blog.
        </p>
      </div>

      <div className="mx-auto flex flex-col gap-4 md:flex-row md:gap-10">
        {PRICING_CARDS.map(
          ({ planType, price, description, highlightFeature, features }) => {
            const isProPlan = planType === PRICING_PLANS.proplan;

            return (
              <Card
                key={planType}
                className={cn(
                  "w-80 rounded-2xl py-6 transition-shadow ease-in-out hover:shadow-xl",
                  isProPlan &&
                    "ring-4 ring-ring ring-offset-4 ring-offset-background hover:shadow-2xl"
                )}
              >
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    {planType}

                    {isProPlan && <Diamond size={32} />}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <span className="text-3xl font-semibold">
                    {formatCurrency(+price, "INR")}
                  </span>

                  {+price > 0 && (
                    <span className="ml-1 dark:text-muted-foreground">/mo</span>
                  )}

                  <p className="text-muted-foreground">{description}</p>

                  <Button
                    variant={isProPlan ? "default" : "secondary"}
                    className="w-full whitespace-nowrap font-semibold"
                  >
                    {isProPlan ? "Go Pro" : "Get Started"}
                  </Button>

                  <ul className="flex flex-col gap-2">
                    <small className="mb-4 text-center text-muted-foreground">
                      {highlightFeature}
                    </small>

                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>

      <div className="mx-auto max-w-[58rem] text-muted-foreground">
        <span className="font-handwriting font-semibold lowercase text-foreground">
          {siteConfig.name}
        </span>{" "}
        is a demo app.{" "}
        <strong>You can test the upgrade and won&apos;t be charged.</strong>
      </div>
    </section>
  );
}
