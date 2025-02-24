"use client";

import { ArticleLayout } from "@/components/tailwindui/ArticleLayout";
import Image from "next/image";
import doorbellFire from "~/public/images/doorbell-fire.png";

interface Article {
  author: string;
  date: string;
  title: string;
  description: string;
}

const article: Article = {
  author: "Duncan Grimes",
  date: "2025-02-01",
  title: "ML Fire Detection",
  description:
    "Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.",
};


const ArticlePage: React.FC = () => {
  return (
    <ArticleLayout article={{...article, href: '/articles/fire-detection'}}>
      <div className="space-y-8">
      <p>
        At the beginning of 2025, wildfires destroyed approximately $31 billion in Los Angeles property value and leveled my hometown of Pacific Palisades.
        For my senior design project, I set out to build a machine learning model that could identify
        a fire from any home camera system, with the potential to save homes and lives.
      </p>

      <Image src={doorbellFire} alt="Doorbell Fire" width={600} height={400} className="rounded-2xl"/>

      <p>
        This is a screenshot of doorbell camera footage from my childhood home, taken at 10:30 PM
        as the house across the street was engulfed in flames.

      </p>
      <p>
        Watching this scene live made me question why home security companies don&apos;t
        offer fire detection services to their customers, particularly in California. The only reason I could come up with was
        that such a feature was too expensive to implement at scale.
      </p>

      <p>
        At that moment, I knew what I wanted to do for my senior design project. I wanted to design a lightweight
        system to detect fire and notify a homewoner in real time, while using
        as little processing power as possible&mdash;so home security companies could actually afford to implement
        this technology.
      </p>

      <h2>Where to Start</h2>
      <ul>
        <li>Captus inpleverunt collo</li>
        <li>Nec nam placebant</li>
        <li>Siquos vulgus</li>
        <li>Dictis carissime fugae</li>
        <li>A tacitos nulla viginti</li>
      </ul>

      <pre>
        
      </pre>
      </div>
      
      
    </ArticleLayout>
  );
};

export default ArticlePage;
