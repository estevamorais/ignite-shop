import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import {
  ImageContainer,
  SuccessContainer,
  SuccessLink,
} from '../styles/pages/success'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Purchase Made With Success!</h1>

      <ImageContainer>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={120}
          height={110}
        />
      </ImageContainer>

      <p>
        Wow <strong>{customerName}</strong>, your{' '}
        <strong>{product.name}</strong> is already on its way to your address.
      </p>

      <SuccessLink href="/">Return to Shop</SuccessLink>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name
  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
