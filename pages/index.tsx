import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import client from '../client'
import { Post } from '../types'
import Link from 'next/link'
import { urlFor } from '../util/index'

type Props = {
	posts: Array<Post>
}

const Home: NextPage<Props> = ({ posts }: Props) => {
	console.log(posts)
	return (
		<Layout>
			<Head>
				<title>Medium</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<Hero />
			<div className='grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3'>
				{posts.map((post) => (
					<Link key={post._id} href={`post/${post.slug.current}`}>
						{post.mainImage && (
							<div className='group cursor-pointer overflow-hidden rounded-lg border'>
								<img
									src={urlFor(post.mainImage).url()}
									alt='post image'
									className='h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105'
								/>
								<div className='flex justify-between bg-white p-5'>
									<div>
										<p className='text-lg font-bold'>{post.title}</p>
										<p className='text-xs'>
											{post.description} by {post.author.name}
										</p>
										<p></p>
									</div>
									<img
										src={urlFor(post.author.image).url()}
										alt='author image'
										className='h-12 w-12 rounded-full'
									/>
								</div>
							</div>
						)}
					</Link>
				))}
			</div>
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
