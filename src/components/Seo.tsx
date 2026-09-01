import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://nicksvendingnola.com'

type Props = {
  title: string
  description: string
  path: string
  image: string
}

export default function Seo({ title, description, path, image }: Props) {
  const url = `${SITE_URL}${path}`
  const imageUrl = `${SITE_URL}${image}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Nick's Vending" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  )
}
