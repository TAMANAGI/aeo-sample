import { notFound } from "next/navigation";

export const dynamicParams = false;

const articles = {
  "1": {
    title: "にゃんこ大戦争とは？",
    content: "こたえはJSON-LDに・・・",
    question: "にゃんこ大戦争とは？",
    answer: "にゃんこ大戦争とはにゃんこのゲームです",
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((id) => ({ id }));
}

// ❌ 型注釈なし！
export function generateMetadata({ params }) {
  const article = articles[params.id];
  return {
    title: article.title,
    description: article.content,
  };
}

// ❌ 型注釈なし！
export default function ArticlePage({ params }) {
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
    <main>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
