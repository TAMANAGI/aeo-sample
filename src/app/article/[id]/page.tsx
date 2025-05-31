// app/article/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Article = {
  title: string;
  content: string;
  question: string;
  answer: string;
};

const articles: Record<string, Article> = {
  "1": {
    title: "VSOとは？音声検索時代のSEO戦略",
    content:
      "VSO（Voice Search Optimization）は、音声検索でヒットしやすくするための施策。自然な会話文の使用、FAQ構造、モバイル対応などが重要です。",
    question: "VSOとは？",
    answer:
      "VSOはVoice Search Optimizationの略で、音声検索に最適化されたSEO手法のことです。",
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const article = articles[params.id];
  if (!article) return {};

  return {
    title: article.title,
    description: article.content.slice(0, 60),
  };
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles[params.id];
  if (!article) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: article.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: article.answer,
        },
      },
    ],
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <p>{article.content}</p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
