import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found</title>
        <meta name="description" content="The page you are looking for does not exist" />
        <link rel="canonical" href="/notfound" />
      </Helmet>
      <div>NotFound</div>
    </>
  )
}
