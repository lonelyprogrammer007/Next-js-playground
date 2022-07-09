import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import client from '../client'
import { Post } from '../types'
import Link from 'next/link'

type Props = {
	posts: Array<Post>
}

const Home: NextPage<Props> = ({ posts }: Props) => {
	return (
		<Layout>
			<Head>
				<title>Medium</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<Hero />
			{posts.map(({ _id, slug: { current } }) => (
				<Link key={_id} href={`posts/${current}`}>
					<a>hola</a>
				</Link>
			))}
		</Layout>
	)
}

export const getServerSideProps = async () => {
	const query = `*[_type == "post"]{
		_id,
		title,
		author -> {
		 name,
		 image
		},
	   description,
	   mainImage,
	   slug
	  }`

	const posts = await client.fetch(query)

	return {
		props: { posts },
	}
}

export default Home
