// Reading list, quotes, and tweets snapshot.

export interface Book {
  title: string;
  author: string;
  coverImage: string;
  link?: string;
  status: string;
}

export const reading: Book[] = [
  {
    title: 'Notes from the Underground',
    author: 'Fyodor Dostoevsky',
    coverImage: 'https://almabooks.com/wp-content/uploads/2016/10/9781847493743.jpg',
    status: 'Reading',
  },
  {
    title: 'No Rules Rules',
    author: 'Reed Hastings & Erin Meyer',
    coverImage: '/books/no-rules-rules.jpg',
    status: 'Reading',
  },
  {
    title: 'Ulysses',
    author: 'James Joyce',
    coverImage: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/JoyceUlysses2.jpg',
    status: 'Reading',
  },
];

export interface Quote {
  text: string;
  author: string;
}

export const featuredQuote: Quote = {
  text: 'It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood; who strives valiantly; who errs, who comes short again and again, because there is no effort without error and shortcoming; but who does actually strive to do the deeds; who knows great enthusiasms, the great devotions; who spends himself in a worthy cause; who at the best knows in the end the triumph of high achievement, and who at the worst, if he fails, at least fails while daring greatly, so that his place shall never be with those cold and timid souls who neither know victory nor defeat.',
  author: 'Theodore Roosevelt',
};

export interface Tweet {
  content: string;
  tweetUrl: string;
  tweetId: string;
  date: string;
}

export const tweets: Tweet[] = [
  {
    content:
      "OAI has a reputation problem — GPT-5 triggered a hate storm; people love 4o (can't imagine why frankly); SamA continues to come off as inauthentic; CC hype kills any hype from minor improvements to Codex; hate on IP theft in new Prism.",
    tweetUrl: 'https://x.com/maxwellsmoroz/status/2016562277990764651',
    tweetId: '2016562277990764651',
    date: '2026-01-28',
  },
  {
    content:
      "People are drastically underhyping what can be done with @miramurati's tinker api — got beta access last year and I continue to use it.",
    tweetUrl: 'https://x.com/maxwellsmoroz/status/2016542292547424476',
    tweetId: '2016542292547424476',
    date: '2026-01-28',
  },
];
