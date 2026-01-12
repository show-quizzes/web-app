import Link from 'next/link';
import Head from 'next/head';

export default ({ children, title = 'Show Quizzes' }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="//fonts.googleapis.com/css?family=Heebo:800"
        rel="stylesheet"
      />
    </Head>
    <nav className="navigation">
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      |{' '}
      <Link href="/the-office">
        <a>The Office</a>
      </Link>
    </nav>

    <main id="content-wrapper">{children}</main>
  </>
);
